import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { head, isEmpty, isNil, omit, propOr } from 'ramda';
import { Repository } from 'typeorm';

import { Organisation } from '../../entity/Organisation';
import { LmsGroup } from './../../entity/LmsGroup';
import { OrganisationTranslation } from './../../entity/OrganisationTranslation';
import { User, UserRole } from './../../entity/User';
import { AdminCreateOrganisationDto, AdminUpdateOrganisationDto } from './dto/organisation.dto';
import { IOrganisation } from './interfaces/organisation.interface';
import { Tools } from '../../common/tools/tools'
import {checkFileRestrictions} from "../../../lib/tools";
import {UploadService} from "../upload/upload.service";
import * as config from "config";

const {
  logotypeMaxSize: ALLOWED_LOGO_MAX_SIZE,
  logotypeMimetypes: ALLOWED_LOGO_MIMETYPES,
} = config.get('organisation.restrictions');

@Injectable()
export class OrganisationService {

  constructor(
    public readonly tools: Tools,
    @InjectRepository(LmsGroup) private lmsGroupsRepository: Repository<LmsGroup>,
    @InjectRepository(Organisation) private organisationsRepository: Repository<Organisation>,
    @InjectRepository(OrganisationTranslation) private organisationTranslationRepository: Repository<OrganisationTranslation>,
    @InjectRepository(User) private userRepository: Repository<User>,
    private uploadService: UploadService,
  ) { }

  async update(id: number, organisation: IOrganisation, userData): Promise<Organisation> {
    const user = await this.userRepository.findOne(userData.id);
    await this.organisationsRepository
      .createQueryBuilder()
      .update()
      .set({
        ...omit(['groups'], organisation),
        changedBy: user,
      })
      .where({ id })
      .execute();

    const updatedOrganisation = await this.organisationsRepository.findOne({ id });

    if (!updatedOrganisation) {
      throw new NotFoundException('The organisation was not found');
    }

    const currentGroups = await this.organisationsRepository
      .createQueryBuilder()
      .relation(Organisation, 'groups')
      .of(organisation)
      .loadMany();

    if (organisation.groups && isEmpty(organisation.groups)) {
      await this.organisationsRepository
        .createQueryBuilder()
        .relation(Organisation, 'groups')
        .of(organisation)
        .remove(currentGroups);
    }

    if (organisation.groups && !isEmpty(organisation.groups)) {
      await Promise.all([
        this.organisationsRepository
          .createQueryBuilder()
          .relation(Organisation, 'groups')
          .of(organisation)
          .remove(currentGroups),
        this.organisationsRepository
          .createQueryBuilder()
          .relation(Organisation, 'groups')
          .of(organisation)
          .add(organisation.groups),
      ]);
    }

    return this.organisationsRepository.findOne({ id });
  }

  async getOneById(id: number): Promise<Organisation | null> {
    const organisation = await this.organisationsRepository
      .findOne({ id }, { relations: ['groups'] });

    if (!organisation) {
      throw new NotFoundException('The organisation was not found');
    }

    return organisation;
  }

  async getOneByName(name: string): Promise<Organisation> {
    return this.organisationsRepository.findOne({ name });
  }

  async getAll(): Promise<Organisation[]> {
    return this.organisationsRepository
      .createQueryBuilder('organisation')
      .getMany();
  }

  async create(organisation: IOrganisation, userData): Promise<Organisation> {
    try {
      const user = await this.userRepository.findOne(userData.id);
      const organisationEntity = new Organisation();
      organisationEntity.name = organisation.name;
      organisationEntity.createdBy = user;
      const o: Organisation = await this.organisationsRepository.save(organisationEntity);

      if (organisation.groups && !isEmpty(organisation.groups)) {
        await this.organisationsRepository
          .createQueryBuilder()
          .relation(Organisation, 'groups')
          .of(o.id)
          .add(organisation.groups);
      }

      return Promise.resolve(o);
    } catch (e) {
      if (e.code) {
        if (e.code === 'ER_DUP_ENTRY') {
          throw new BadRequestException('Sorry, already exists an organisation registered with the same name.');
        }
      }
      throw new InternalServerErrorException('An unexpected error has occurred trying to create the organisation.');
    }
  }

  async delete(id: number) {
    return this.organisationsRepository
      .createQueryBuilder()
      .delete()
      .where({ id })
      .execute();
  }

  public async checkOrganisationsCount(lmsGroupId) {
    const lmsGroup = await this.lmsGroupsRepository.findOne({ id: lmsGroupId });

    if (!lmsGroup) {
      throw new BadRequestException('LMS group is not found');
    }

    const organisationsCount = await this.organisationsRepository
      .createQueryBuilder('o')
      .leftJoinAndSelect('o.lmsGroup', 'lg')
      .where('lg.id = :lmsGroupId', { lmsGroupId })
      .getCount();

    if (organisationsCount >= lmsGroup.maxOrganisations) {
      throw new BadRequestException({ error: 'Max organisations limit reached' });
    }
  }

  public async adminCreate(organisation: AdminCreateOrganisationDto, userData): Promise<Organisation> {
    await this.tools.checkAdminAccess(userData, {
      lmsIds: [organisation.lmsGroup]
    })
    const lmsAdmins = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.lmsGroups', 'lmsGroups')
      .where('lmsGroups.id = :id', { id: organisation.lmsGroup })
      .andWhere('FIND_IN_SET(:lmsRole,user.roles)>0', { lmsRole: UserRole.ADMIN_LMS })
      .getMany()
    const user = await this.userRepository.findOne(userData.id);
    const createdOrganisation: Organisation = await this.organisationsRepository.save({
      ...organisation,
      createdBy: user,
      users: lmsAdmins,
      lmsGroup: new LmsGroup({ id: organisation.lmsGroup })
    });

    if (organisation.translations) {
      await Promise.all(organisation.translations.map(translation =>
        this.organisationTranslationRepository.save({
          ...translation,
          organisation: createdOrganisation,
        })));
    }

    return this.organisationsRepository.findOne({
      where: { id: createdOrganisation.id },
      relations: [
        'translations',
        'translations.language',
      ],
    });
  }

  public async adminUpdate(id: number, organisation: AdminUpdateOrganisationDto, userData): Promise<Organisation> {
    const user = await this.userRepository.findOne(userData.id);
    await this.tools.checkAdminAccess(userData, {
      organisationIds: [id]
    })
    await this.organisationsRepository
      .createQueryBuilder()
      .update()
      .set({
        ...omit(['translations'], organisation),
        changedBy: user,
      })
      .where({ id })
      .execute();

    const updatedOrganisation = await this.organisationsRepository.findOne({ id });

    if (organisation.translations) {
      await this.organisationTranslationRepository.delete({ organisation: updatedOrganisation });
      await Promise.all(organisation.translations.map(translation =>
        this.organisationTranslationRepository.save({
          ...translation,
          organisation: updatedOrganisation,
        })));
    }

    return this.organisationsRepository
      .createQueryBuilder('organisation')
      .leftJoinAndSelect('organisation.translations', 'translations')
      .leftJoinAndSelect('organisation.createdBy', 'createdBy')
      .leftJoinAndSelect('createdBy.userEmail', 'createdBy.email')
      .leftJoinAndSelect('organisation.changedBy', 'changedBy')
      .leftJoinAndSelect('changedBy.userEmail', 'changedBy.email')
      .leftJoinAndSelect('organisation.lmsGroup', 'lmsGroup')
      .where({ id })
      .getOne();
  }

  public async getFull(id: number, admin: User): Promise<Organisation> {
    const organisation = await this.organisationsRepository
      .createQueryBuilder('organisation')
      .leftJoinAndSelect('organisation.translations', 'translations')
      .leftJoinAndSelect('organisation.createdBy', 'createdBy')
      .leftJoinAndSelect('createdBy.userEmail', 'createdBy.email')
      .leftJoinAndSelect('organisation.changedBy', 'changedBy')
      .leftJoinAndSelect('changedBy.userEmail', 'changedBy.email')
      .leftJoinAndSelect('organisation.lmsGroup', 'lmsGroup')
      .where({ id })
      .getOne();

    if (!organisation) {
      throw new NotFoundException('Organisation is not found');
    }

    await this.tools.checkAdminAccess(admin, {
      organisationIds: [organisation.id]
    })

    return organisation;
  }

  public async getWelcome(id: number): Promise<{
    id: number,
    logoImageUri: string,
    adminWelcomeText: string,
  }> {
    const organisation = await this.organisationsRepository
      .createQueryBuilder('organisation')
      .leftJoinAndSelect('organisation.translations', 'translations')
      .leftJoin('organisation.users', 'user')
      .where({ id })
      .andWhere('translations.language = user.language')
      .getOne();

    if (!organisation) {
      throw new NotFoundException('Organisation is not found');
    }

    const { logoImageUri, translations } = organisation;
    const adminWelcomeText = propOr<string, OrganisationTranslation, string>(
      '',
      'adminWelcomeText',
      head(translations),
     );

    return {
      id,
      logoImageUri,
      adminWelcomeText,
    };
  }

  public async findAll({
    createdAt,
    lmsGroup,
    name,
    onlyActive,
  }, admin: User): Promise<Organisation[]> {
    const query = this.organisationsRepository
      .createQueryBuilder('organisation')
      .leftJoinAndSelect('organisation.translations', 'translations')
      .leftJoinAndSelect('organisation.lmsGroup','lmsGroup')
      .leftJoinAndSelect('organisation.users', 'admins')

    if (!isNil(createdAt)) {
      query.andWhere('organisation.createdAt >= :createdAt', { createdAt });
    }

    if (!isNil(name)) {
      query.andWhere('LOWER(organisation.name) like :name', { name: `%${name.toLowerCase()}%` });
    }

    if (!isNil(lmsGroup)) {
      query.andWhere('organisation.lmsGroup = :lmsGroup', { lmsGroup });
    }

    if (onlyActive) {
      query.andWhere('organisation.isActive = :isActive', { isActive: onlyActive });
    }

    const result = await query.getMany();

    return this.tools.getOrganisationByAdminRole(admin, result);
  }

  public async adminDelete(id: number, admin: User): Promise<HttpStatus> {
    try {
      await this.tools.checkAdminAccess(admin, {
        organisationIds: [id]
      })

      await this.organisationsRepository.delete({ id });

      return HttpStatus.OK;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  public async getUsersByUserId(userId) {
    const organisations = await this.userRepository
      .createQueryBuilder('user')
      .innerJoin('user.organisations', 'organisations')
      .innerJoin('organisations.users', 'organisationsUsers')
      .select('organisationsUsers.id as id')
      .where('user.id = :userId', { userId })
      .getRawMany();

    return organisations.map(item => item.id);
  }

  public async updateOrganisation(file, organisationData, id, req ) {
    try {
      if (file) {
        await checkFileRestrictions(file, {maxSize: ALLOWED_LOGO_MAX_SIZE, mimetypes: ALLOWED_LOGO_MIMETYPES});
      }

      if (organisationData.name) {
        const existedOrganisation = await this.getOneByName(organisationData.name);

        if (existedOrganisation && existedOrganisation.id !== id) {
          throw new BadRequestException('Sorry, already exists an organisation registered with the same name.');
        }
      }

      const uploadResult = file
        ? await this.uploadService.upload(file, 'logotypes/organisation')
        : null;
      const logoImageUri = uploadResult?.url || organisationData.logoImageUri;

      const fullOrganisationData = {
        ...organisationData,
        logoImageUri,
      };

      return this.adminUpdate(id, fullOrganisationData, req.user);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

}
