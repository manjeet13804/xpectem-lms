import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { curry, head, isNil, omit, prop, propOr } from 'ramda';
import { pipe } from 'rxjs';
import { Repository } from 'typeorm';

import { Tools } from '../../common/tools/tools';
import { LmsGroup } from '../../entity/LmsGroup';
import { LmsGroupTranslation } from '../../entity/LmsGroupTranslation';
import { Language } from './../../entity/Language';
import { User } from './../../entity/User';
import { UploadService } from '../upload/upload.service';
import { CreateLmsGroupDto, UpdateLmsGroupDto } from './dto/lms-group.dto';

const getTranslatedField = curry((fieldName, data) => pipe(
  prop('translations'),
  head,
  prop(fieldName),
)(data));

@Injectable()
export class LmsGroupService {

  constructor(
    public readonly tools: Tools,
    @InjectRepository(LmsGroup) private lmsGroupsRepository: Repository<LmsGroup>,
    @InjectRepository(LmsGroupTranslation) private lmsGroupTranslationRepository: Repository<LmsGroupTranslation>,
    @InjectRepository(Language) private languageRepository: Repository<Language>,
    @InjectRepository(User) private userRepository: Repository<User>,
    private uploadService: UploadService,
  ) { }

  public async getOneByName(name: string): Promise<LmsGroup> {
    return this.lmsGroupsRepository.findOne({ name });
  }

  public async getOneById(id: number): Promise<LmsGroup> {
    return this.lmsGroupsRepository.findOne({ id });
  }

  public async getUsersByUserId(userId: number) {
    const usersLmsGroup = await this.userRepository
      .createQueryBuilder('user')
      .innerJoin('user.lmsGroups', 'lmsGroups')
      .innerJoin('lmsGroups.users', 'users')
      .select('JSON_ARRAYAGG(users.id) as users')
      .where('user.id = :userId', { userId })
      .getRawOne();

    return JSON.parse(usersLmsGroup.users);
  }

  public async getFull(id: number, user: User): Promise<LmsGroup> {
    await this.tools.checkLmsAdminToUpdateLmsGroup(user, id);

    const lmsGroup = await this.lmsGroupsRepository
      .createQueryBuilder('lmsGroup')
      .leftJoinAndSelect('lmsGroup.translations', 'lgt')
      .leftJoinAndSelect('lgt.language', 'language')
      .leftJoinAndSelect('lmsGroup.createdBy', 'createdBy')
      .leftJoinAndSelect('createdBy.userEmail', 'createdBy.email')
      .leftJoinAndSelect('lmsGroup.changedBy', 'changedBy')
      .leftJoinAndSelect('changedBy.userEmail', 'changedBy.email')
      .where({ id })
      .getOne();

    if (!lmsGroup) {
      throw new NotFoundException('LMS group is not found');
    }

    return lmsGroup;
  }

  public async findAll({
    createdAt,
    name,
    onlyActive,
  }): Promise<LmsGroup[]> {
    const query = await this.lmsGroupsRepository
      .createQueryBuilder('lmsGroup')
      .leftJoinAndSelect('lmsGroup.translations', 'lgt');

    if (onlyActive) {
      query.andWhere('lmsGroup.isActive = :isActive', { isActive: onlyActive });
    }

    if (!isNil(createdAt)) {
      query.andWhere('lmsGroup.createdAt >= :createdAt', { createdAt });
    }

    if (!isNil(name)) {
      query.andWhere('LOWER(lmsGroup.name) like :name', { name: `%${name.toLowerCase()}%` });
    }

    return query.getMany();
  }

  public async getWelcome(id: number): Promise<{
    id: number,
    logoImageUri: string,
    adminWelcomeText: string,
  }> {
    const lmsGroup = await this.lmsGroupsRepository
      .createQueryBuilder('lmsGroup')
      .leftJoinAndSelect('lmsGroup.translations', 'lgt')
      .leftJoin('lmsGroup.users', 'user')
      .where({ id })
      .andWhere('lgt.language = user.language')
      .getOne();

    if (!lmsGroup) {
      throw new NotFoundException('LMS group is not found');
    }

    const { logoImageUri, translations } = lmsGroup;
    const adminWelcomeText = propOr<string, LmsGroupTranslation, string>(
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

  public async create(lmsGroup: CreateLmsGroupDto, userData): Promise<LmsGroup> {
    const user = await this.userRepository.findOne(userData.id);

    const { orderEmails } = lmsGroup;
    const emails = orderEmails ? orderEmails.join(',') : null;
    const createdLmsGroup: LmsGroup = await this.lmsGroupsRepository.save({
      ...lmsGroup,
      createdBy: user,
      orderEmails: emails,
    });

    if (lmsGroup.translations) {
      await Promise.all(lmsGroup.translations.map(translation =>
        this.lmsGroupTranslationRepository.save({
          ...translation,
          lmsGroup: createdLmsGroup,
        })));
    }

    return this.lmsGroupsRepository.findOne({
      where: { id: createdLmsGroup.id },
      relations: [
        'translations',
        'translations.language',
      ],
    });
  }

  public async update(id: number, userData, file, lmsGroupData: UpdateLmsGroupDto): Promise<LmsGroup> {
    const uploadResult = file
      ? await this.uploadService.upload(file, 'logotypes/lms-group')
      : null;

    const lmsGroup = {
      ...lmsGroupData,
      logoImageUri: uploadResult ? uploadResult.url : lmsGroupData.logoImageUri,
    }
    const user = await this.userRepository.findOne(userData.id);
    const { orderEmails } = lmsGroup;
    const emails = orderEmails ? orderEmails.join(',') : null;
    await this.tools.checkLmsAdminToUpdateLmsGroup(userData, id);
    await this.lmsGroupsRepository
      .createQueryBuilder()
      .update()
      .set({
        ...omit(['translations'], lmsGroup),
        changedBy: user,
        orderEmails: emails,
      })
      .where({ id })
      .execute();

    const updatedLmsGroup = await this.lmsGroupsRepository.findOne({ id });

    if (lmsGroup.translations) {
      await this.lmsGroupTranslationRepository.delete({ lmsGroup: updatedLmsGroup });
      await Promise.all(lmsGroup.translations.map(translation =>
        this.lmsGroupTranslationRepository.save({
          ...translation,
          lmsGroup: updatedLmsGroup,
        })));
    }

    return this.getFull(id, userData)
  }

  public async delete(id: number): Promise<HttpStatus> {
    try {
      await this.lmsGroupsRepository.delete({ id });

      return HttpStatus.OK;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  public async checkExistingLmsGroup(name: string, id?: number) {
    if (name) {
      const existingLmsGroup = await this.getOneByName(name);
      if (id) {
        if (existingLmsGroup && existingLmsGroup.id !== id) {
          throw new BadRequestException('Sorry, a registered LMS group with the same name already exists.');
        }
      }
    }
  }
}
