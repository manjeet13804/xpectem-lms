import {
  BadRequestException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ContentState, convertToRaw } from 'draft-js';
import { InjectRepository } from '@nestjs/typeorm';
import * as toStream from 'buffer-to-stream';
import * as csv from 'csvtojson/v2';
import * as joi from 'joi';
import {
  always,
  applySpec,
  cond,
  equals,
  head,
  isEmpty,
  isNil,
  last,
  map,
  omit,
  pick,
  pipe,
  prop,
  split,
  T,
  toPairs,
} from 'ramda';
import { Connection, Repository } from 'typeorm';

import { Group } from '../../entity/Group';
import { Organisation } from '../../entity/Organisation';
import { GroupTranslation } from './../../entity/GroupTranslation';
import { User, UserRole } from './../../entity/User';
import { AdminCreateGroupDto, AdminUpdateGroupDto, ImportGroupDto } from './dto/admin.group.dto';
import { Language } from '../../entity/Language';
import { Tools } from '../../common/tools/tools'
import { csvToJson } from "../../common/csv-to-json/csv-to-json";

const importGroupValidation = joi.array().items(joi.object().keys({
  name: joi.string().required(),
  translations: joi.array().items(joi.object().keys({
    language: joi.number().min(1).integer().required(),
    description: joi.string().trim(),
  })).required(),
})).min(1).unique().required();


@Injectable()
export class GroupService {

  constructor(
    public connection: Connection,
    public readonly tools: Tools,
    @InjectRepository(Group) private groupsRepository: Repository<Group>,
    @InjectRepository(GroupTranslation) private groupTranslationRepository: Repository<GroupTranslation>,
    @InjectRepository(Organisation) private organisationsRepository: Repository<Organisation>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Language) private languageRepository: Repository<Language>,
  ) { }

  public async update(
    id: number,
    name: string,
    organisationId: number,
    userData,
  ) {
    const user = await this.userRepository.findOne(userData.id);
    const existedGroup = await this.groupsRepository.findOne({ name });

    if (existedGroup) {
      throw new BadRequestException('Sorry, already exists an group registered with the same name.');
    }

    let organisation: Organisation;
    const group = await this.groupsRepository.findOne({ id });

    if (!group) {
      throw new NotFoundException('The group was not found');
    }

    group.name = name || group.name;

    if (organisationId) {
      organisation = await this.organisationsRepository.findOne({ id: organisationId });

      if (!organisation) {
        throw new NotFoundException('The organisation was not found.');
      }

      group.organisation = organisation;
    }
    group.changedBy = user;
    const updatedGroup: Group = await this.groupsRepository.save(group);

    return Promise.resolve(updatedGroup);
  }

  public async getOneById(id: number): Promise<Group> {
    return this.groupsRepository
      .createQueryBuilder()
      .where({ id })
      .getOne();
  }

  public async getAll(): Promise<Group[]> {
    return this.groupsRepository
      .createQueryBuilder()
      .getMany();
  }

  public async create(name: string, organisationId: number, userData): Promise<Group> {
    const user = await this.userRepository.findOne(userData.id);
    const existedGroup = await this.groupsRepository.findOne({ name });

    if (existedGroup) {
      throw new BadRequestException('Sorry, already exists an group registered with the same name.');
    }

    let organisation: Organisation;
    const group = new Group({});
    group.name = name;
    group.createdBy = user;

    if (organisationId) {
      organisation = await this.organisationsRepository.findOne({ id: organisationId });

      if (!organisation) {
        throw new NotFoundException('The organisation was not found.');
      }

      group.organisation = organisation;
    }

    const createdGroup: Group = await this.groupsRepository.save(group);

    return Promise.resolve(createdGroup);
  }

  public async delete(id: number) {
    return this.groupsRepository
      .createQueryBuilder()
      .delete()
      .where({ id })
      .execute();
  }

  async getOneByName(name: string): Promise<Group> {
    return this.groupsRepository.findOne({ name });
  }

  public async adminCreate(group: AdminCreateGroupDto, userData): Promise<Group> {
    const user = await this.userRepository.findOne(userData.id);
    const { organisation } = group;
    await this.tools.checkAdminAccess(userData, {
      organisationIds: [organisation]
    })

    const organisationAdmins = await this.connection
      .getRepository(User)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.organisations', 'organisations')
      .where('organisations.id = :id', { id: organisation })
      .andWhere('FIND_IN_SET(:adminRole,user.roles)>0', { adminRole: UserRole.ADMIN_ORGANISATION })
      .getMany()

    const lmsAdmins = await this.connection
      .getRepository(User)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.lmsGroups', 'lmsGroups')
      .leftJoinAndSelect('lmsGroups.organisations', 'organisations')
      .where('organisations.id = :id', { id: organisation })
      .andWhere('FIND_IN_SET(:lmsRole,user.roles)>0', { lmsRole: UserRole.ADMIN_LMS })
      .getMany()

    const usersToSave = [...organisationAdmins, ...lmsAdmins];

    const createdGroup: Group = await this.groupsRepository.save({
      ...group,
      createdBy: user,
      users: usersToSave,
    } as any);

    if (group.translations) {
      await Promise.all(group.translations.map(translation =>
        this.groupTranslationRepository.save({
          ...translation,
          group: createdGroup,
        })));
    }

    return this.groupsRepository.findOne({
      where: {
        id: createdGroup.id,
      },
      relations: [
        'translations',
        'translations.language',
      ],
    });
  }

  public async adminUpdate(id: number, group: AdminUpdateGroupDto, userData): Promise<Group> {
    const user = await this.userRepository.findOne(userData.id);
    await this.tools.checkAdminAccess(userData, {
      groupsIds: [id]
    })
    await this.groupsRepository
      .createQueryBuilder()
      .update()
      .set({
        ...omit(['translations'], group),
        changedBy: user,
      })
      .where({ id })
      .execute();

    const updatedGroup = await this.groupsRepository.findOne({ id });

    if (group.translations) {
      await this.groupTranslationRepository.delete({ group: updatedGroup });
      await Promise.all(group.translations.map(translation =>
        this.groupTranslationRepository.save({
          ...translation,
          group: updatedGroup,
        })));
    }

    return this.getFull(id, userData);
  }

  public async findAll(findData, roles: string[], admin: User): Promise<Group[]> {
    const {
      createdAt,
      organisation,
      name,
      lmsGroup,
      onlyActive,
    } = findData;
    const query = await this.groupsRepository
      .createQueryBuilder('group')
      .leftJoinAndSelect('group.translations', 'gt')
      // .limit(10);
    if (!isNil(createdAt)) {
      query.andWhere('group.createdAt >= :createdAt', { createdAt });
    }

    if (!isNil(name)) {
      query.andWhere('LOWER(group.name) like :name', { name: `%${name.toLowerCase()}%` });
    }

    if (!isNil(organisation)) {
      query.andWhere('group.organisation = :organisation', { organisation });
    }

    if (onlyActive) {
      query.andWhere('group.isActive = :isActive', { isActive: onlyActive });
    }

    if (roles.includes(UserRole.XPECTUM_ADMIN) && !isNil(lmsGroup)) {
      query
        .leftJoin('group.organisation', 'o')
        .andWhere('o.lmsGroup = :lmsGroup', { lmsGroup });
    }

    const result = await query.getMany();

    return this.tools.getGroupsByAdminGroups(admin, result);
  }

  public async getFull(id: number, admin: User): Promise<Group> {
    await this.tools.checkAdminAccess(admin, {
      groupsIds: [id]
    })
    const dataForm = this.groupsRepository
      .createQueryBuilder('group')
      .leftJoin('group.translations', 'translations')
      .leftJoin('translations.language', 'language')
      .leftJoinAndSelect('group.createdBy', 'createdBy')
      .leftJoinAndSelect('createdBy.userEmail', 'createdBy.email')
      .leftJoinAndSelect('group.changedBy', 'changedBy')
      .leftJoinAndSelect('changedBy.userEmail', 'changedBy.email')
      .where({ id });

    const dataGroup = await dataForm
      .getOne();

    if (!dataGroup) {
      throw new NotFoundException('Group is not found');
    }

    const translations = await dataForm
      .select('translations.language_id as language, translations.description as description')
      .andWhere('translations.language_id IS NOT NULL')
      .getRawMany();

    const group = {
      ...dataGroup,
      translations,
    };

    return group;
  }

  public async adminDelete(id: number, admin: User): Promise<HttpStatus> {
    try {
      await this.tools.checkAdminAccess(admin, {
        groupsIds: [id]
      })
      await this.groupsRepository.delete({ id });

      return HttpStatus.OK;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  public rebuildDataForImportGroup(data: any[]): {
    name: string,
    translations: { language: number, description: string }[],
  }[] {
    return map(applySpec({
      name: prop<string, string>('name'),
      translations: pipe(
        pick(['description_eng', 'description_swe', 'description_nor']),
        toPairs,
        map(applySpec({
          language: pipe(
            head,
            pipe(split('_'), last),
            cond([
              [equals('eng'), always(1)],
              [equals('swe'), always(2)],
              [equals('nor'), always(3)],
              [T, always(1)],
            ]),
          ),
          description: last,
        })),
      ),
    }))(data) as any;
  }

  public async importGroups(file: any, importData: ImportGroupDto, admin: User) {
    try {
      const {
        headers,
        organisation,
      } = importData;
      await this.tools.checkAdminAccess(admin, {
        organisationIds: [organisation]
      })

      const jsonArray = await csvToJson(file, headers)

      if (isEmpty(jsonArray)) {
        throw new BadRequestException('File is empty');
      }

      const rebuildedData = this.rebuildDataForImportGroup(jsonArray);
      const { value: validatedData } = joi.validate(rebuildedData, importGroupValidation);

      if (!validatedData) {
        throw new BadRequestException('Invalid value');
      }

      const organisationEntity = await this.organisationsRepository.findOne({ id: organisation });

      if (!organisationEntity) {
        throw new NotFoundException({ error: 'Organisation is not found' });
      }

      const organisationAdmins = await this.connection
        .getRepository(User)
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.organisations', 'organisations')
        .where('organisations.id = :id', { id: organisation })
        .andWhere('FIND_IN_SET(:adminRole,user.roles)>0', { adminRole: UserRole.ADMIN_ORGANISATION })
        .getMany()

      const lmsAdmins = await this.connection
        .getRepository(User)
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.lmsGroups', 'lmsGroups')
        .leftJoinAndSelect('lmsGroups.organisations', 'organisations')
        .where('organisations.id = :id', { id: organisation })
        .andWhere('FIND_IN_SET(:lmsRole,user.roles)>0', { lmsRole: UserRole.ADMIN_LMS })
        .getMany()

      const usersToSave = [...organisationAdmins, ...lmsAdmins];

      const groupNames = validatedData.map(item => item.name);
      const existedGroups = await this.connection
        .getRepository(Group)
        .createQueryBuilder('group')
        .select('group.name as name')
        .where('group.name IN (:...groupNames)', { groupNames })
        .getRawMany()

      if (existedGroups.length) {
        const errors = existedGroups.map(item => `Group with name ${item.name} is already exist`);
        throw new BadRequestException({ errors, error: 'Groups already exists' });
      }
      try {
        await Promise.all(validatedData.map(async ({ name, translations }) => {
          const group = new Group({});
          group.name = name;
          const organisationIns = new Organisation();
          organisationIns.id = organisation;
          group.organisation = organisationIns;
          group.users = usersToSave;
          group.isActive = true;
          const createdGroup: Group = await this.groupsRepository.save(group);
          await Promise.all(translations.map(async ({ language: languageId, description }) => {
            const groupTranslation = new GroupTranslation();
            groupTranslation.group = createdGroup;
            groupTranslation.description = JSON.stringify(convertToRaw(ContentState.createFromText(description)));
            const language = await this.languageRepository.findOne(languageId);
            groupTranslation.language = language;
            await this.groupTranslationRepository.save(groupTranslation);
          }));
        }));
      } catch (e) {
        Logger.error(e);
        throw new BadRequestException({ error: 'Error while saving group' });
      }

      return HttpStatus.OK;
    } catch (e) {
      Logger.error(e);

      throw new BadRequestException({ error: e.message, errors: e.errors || [] });
    }
  }
}
