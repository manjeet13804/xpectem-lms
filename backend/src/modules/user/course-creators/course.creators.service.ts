import { BadRequestException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Connection } from 'typeorm';
import { User, UserRole } from '../../../entity/User';
import { RequestSearchCourseCreatorsDto } from './dto/requestSearchCourseCreators.dto';
import { ICreateAdmin } from '../interfaces/admin.interface';
import { filter, isEmpty, isNil, omit } from 'ramda';
import { Group } from '../../../entity/Group';
import { UserLog } from '../../../entity/UserLog';
import { UserEmail } from '../../../entity/UserEmail';
import * as moment from 'moment';
import { UserPhone } from '../../../entity/UserPhone';
import { Tools } from '../../../common/tools/tools';
import { AuthService } from '../../auth/auth.service';
import * as config from 'config';
import { UploadService } from '../../upload/upload.service';
import { CourseCreatorDto, UpdateCourseCreatorDto, UpdateCourseCreatorResponse } from './dto/CourseCreator.dto';
import * as _ from 'lodash';
import { UserProfileService } from '../user-profile.service';
import { AdminService } from '../admin/admin.service';
import { UserService } from '../user.service';
import { CourseLog } from '../../../entity/CourseLog';
import { Course } from '../../../entity/Course';
import { FileTemplateDto } from '../dto/admin.dto';

const DB_DUPLICATE_ERROR = 'ER_DUP_ENTRY';
const ALLOWED_AVATAR_MIMETYPES: string[] = config.get('user.account.avatarMimetype');
const ALLOWED_AVATAR_MAX_SIZE: number = config.get('user.account.avatarMaxSize');
const DAYS_TO_CLOSE: number = config.get('user.account.daysToClose');

@Injectable()
export class CourseCreatorsService {
  private readonly entityManager = this.connection.createEntityManager();

  constructor(
    private readonly connection: Connection,
    public readonly tools: Tools,
    private readonly authService: AuthService,
    private readonly uploadService: UploadService,
    private readonly userProfileService: UserProfileService,
    private readonly adminService: AdminService,
    private readonly userService: UserService,
  ) { }

  public async get(searchParams: RequestSearchCourseCreatorsDto, admin: User): Promise<User[]> {
    try {
      const {
        firstName,
        lastName,
        email,
        employeeNumber,
        phone,
        isDeactivated,
        personNumber,
        lmsGroup,
        organisation,
        group,
      } = searchParams;

      const users = this.connection
        .getRepository(User)
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.userEmail', 'userEmail')
        .leftJoinAndSelect('user.userPhone', 'userPhones')
        .leftJoinAndSelect('user.groups', 'groups')
        .leftJoinAndSelect('groups.organisation', 'organisations')
        .leftJoinAndSelect('organisations.lmsGroup', 'lmsGroups')
        .where('FIND_IN_SET(:role,user.roles)>0', { role: UserRole.COURSE_CREATOR })

      if (!isDeactivated) {
        users.andWhere('user.isDeactivated = :isDeactivated', { isDeactivated: false });
      }

      if (firstName) {
        users.andWhere('LOWER(user.firstName) like :firstName', { firstName: `%${firstName.toLowerCase()}%` });
      }

      if (lastName) {
        users.andWhere('LOWER(user.lastName) like :lastName', { lastName: `%${lastName.toLowerCase()}%` });
      }

      if (email) {
        users.andWhere('LOWER(userEmail.email) like :email', { email: `%${email.toLowerCase()}%` });
      }

      if (phone) {
        users.andWhere('userPhones.phone like :phone', { phone: `%${phone}%` });
      }

      if (lmsGroup) {
        users.andWhere('lmsGroups.id = :lmsGroupId', { lmsGroupId: lmsGroup });
      }

      if (organisation) {
        users.andWhere('organisations.id = :organisationId', { organisationId: organisation });
      }

      if (group) {
        users.andWhere('groups.id = :groupId', { groupId: group });
      }

      if (employeeNumber) {
        users.andWhere('user.employeeNumber like :employeeNumber', { employeeNumber: `%${employeeNumber}%` })
      }

      if (personNumber) {
        users.andWhere('user.personNumber like :personNumber', { personNumber: `%${personNumber}%` })
      }

      const results = await users.getMany();

      return this.tools.getCourseCreatorsByGroups(admin, results)
    } catch (e) {
      Logger.error(e);
      throw new BadRequestException(e.message);
    }
  }

  public async getById(id: number, admin: User) {
    try {
      const user = await this.connection
        .getRepository(User)
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.userEmail', 'userEmail')
        .leftJoinAndSelect('user.userPhone', 'userPhone')
        .leftJoinAndSelect('user.language', 'language')
        .leftJoinAndSelect('user.groups', 'group')
        .leftJoinAndSelect('group.organisation', 'organisation')
        .leftJoinAndSelect('organisation.lmsGroup', 'lmsGroup')
        .leftJoinAndSelect('user.userLog', 'userLog')
        .leftJoinAndSelect('userLog.createdBy', 'createdBy')
        .leftJoinAndSelect('createdBy.userEmail', 'createdBy.email')
        .leftJoinAndSelect('userLog.changedBy', 'changedBy')
        .leftJoinAndSelect('changedBy.userEmail', 'changedBy.email')
        .leftJoinAndSelect('user.courseCreatedBy', 'createdCourses')
        .leftJoinAndSelect('createdCourses.course', 'course')
        .where({ id })
        .andWhere('FIND_IN_SET(:role,user.roles)>0', { role: UserRole.COURSE_CREATOR })
        .getOne();

      if (isNil(user)) {
        throw new NotFoundException('The admin was not found');
      }

      await this.tools.checkAdminAccess(admin, {
        groupsIds: user.groups.map(item => item.id)
      })

      return user;

    } catch (e) {
      Logger.error(e);
      throw new BadRequestException(e.message);
    }
  }

  public async create(createData: CourseCreatorDto, file: FileTemplateDto, currentUser: User): Promise<HttpStatus> {
    try {
      await this.tools.checkAdminAccess(currentUser, {
        groupsIds: createData.groups,
      })
      if (file) {
        this.tools.checkFileValid(file, ALLOWED_AVATAR_MIMETYPES, ALLOWED_AVATAR_MAX_SIZE);
      }

      const uploadResult = file ? await this.uploadService.upload(file, 'avatars') : null;
      const urlAvatar = uploadResult ? uploadResult.url : undefined;

      const {
        emails,
        phones,
        groups,
      } = createData;

      const existedAdmin = await this.connection
        .getRepository(User)
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.userEmail', 'userEmail')
        .where(`(FIND_IN_SET(:orgAdmin,user.roles)>0 
        OR FIND_IN_SET(:groupAdmin,user.roles)>0) 
        AND FIND_IN_SET(:courseCreator,user.roles)=0`, {
          orgAdmin: UserRole.ADMIN_ORGANISATION,
          groupAdmin: UserRole.ADMIN_GROUP,
          courseCreator: UserRole.COURSE_CREATOR
        })
        .andWhere('userEmail.email IN (:...emails)', { emails } )
        .getOne()

      if (existedAdmin) {
        const { roles } = existedAdmin;
        const newRoles = [...roles, UserRole.COURSE_CREATOR];
        const newDataCourseCreator = new User({
          ...existedAdmin,
          roles: newRoles,
        })
        await this.connection.manager.save(newDataCourseCreator);

        return HttpStatus.CREATED;
      }
      const emailExists = await this.tools.getExistingEmails(emails);

      if (!isEmpty(emailExists)) {
        throw new BadRequestException({ error: `A course creators with "${emailExists[0]}" email already exist in this LMS group` });
      }

      const groupsEntity = await this.entityManager.findByIds(Group, groups);

      if (isNil(groupsEntity)) {
        throw new BadRequestException({ error: 'Groups not found' });
      }

      const userLog = new UserLog({ createdBy: currentUser });
      const password = this.tools.generatePassword();
      const encryptedPassword = await this.authService.encryptPassword(password);
      const userData = omit(['email', 'phone', 'groups'], createData);
      const user = new User({
        ...userData,
        userLog,
        password: encryptedPassword,
        roles: [UserRole.COURSE_CREATOR],
        groups: [...groupsEntity],
        avatar: urlAvatar
      } as any);

      const userEmails = emails.map((item) => {
        return new UserEmail({ user, email: item, welcomeEmailSent: moment().toDate() });
      });

      const userPhones = phones
        ? phones.map(item => new UserPhone({ user, phone: item }))
        : [];

      try {
        await this.connection.transaction(async (transactionalEntityManager) => {
          await transactionalEntityManager.save([
            user,
            ...userEmails,
            ...userPhones,
          ]);
          await transactionalEntityManager.save(userLog);
          user.userLog = userLog;
          await transactionalEntityManager.save(user);
        });

        this.tools.sendEmailConfirmation(emails, password).catch(e => {
          Logger.error(e);
        });

      } catch (e) {
        Logger.error(e);
        const codeError = _.get(e, 'code');
        if (codeError === DB_DUPLICATE_ERROR) {
          throw new BadRequestException({ error: 'User with this employe number or person number already exist' });
        }
        throw new BadRequestException({ error: 'Create admin error' });
      }

      return HttpStatus.CREATED;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  public async update(
    creatorId: number,
    creatorData: UpdateCourseCreatorDto,
    file: FileTemplateDto,
    currentUser: User
  ): Promise<UpdateCourseCreatorResponse> {
    try {
      if (file) {
        this.tools.checkFileValid(file, ALLOWED_AVATAR_MIMETYPES, ALLOWED_AVATAR_MAX_SIZE);
      }

      const uploadResult = file ? await this.uploadService.upload(file, 'avatars') : null;
      const urlAvatar = uploadResult ? uploadResult.url : creatorData.avatar;
      const foundCourseCreator = await this.entityManager.findOne(User, {
        join: {
          alias: 'user',
          leftJoinAndSelect: {
            email: 'user.userEmail',
            phone: 'user.userPhone',
            groups: 'user.groups'
          },
        },
        where: { id: creatorId },
      })

      await this.tools.checkAdminAccess(currentUser, {
        groupsIds: foundCourseCreator.groups.map(item => item.id),
      })

      if (!foundCourseCreator) {
        throw new BadRequestException({ error: "A course creators isn't found"})
      }

      const { emails, phones } = creatorData
      const existingEmails = await Promise.all(
        emails.map(async email => {
          const lowerCasedEmail = email.toLowerCase();
          const isEmailExist = await this.userProfileService.isEmailExists(
            creatorId,
            lowerCasedEmail,
          );

          if (isEmailExist) {
            return email;
          }
        }),
      ).then(filter(Boolean));

      if (!isEmpty(existingEmails)) {
        throw new BadRequestException({
          error: `A course creator with "${existingEmails}" email already exist`,
        });
      }
      const emailToAdd = await this.userProfileService.getEmailToAdd(foundCourseCreator, emails);
      const emailToDelete = await this.userProfileService.getEmailIdsForDelete(
        foundCourseCreator,
        emails,
      );
      const phoneToSave = await this.userProfileService.getPhoneToSave(foundCourseCreator, phones);
      const { phoneToAdd, phoneToDelete } = phoneToSave;
      const userToSave = new User({
        ...foundCourseCreator,
        ...creatorData,
        ...omit(['email', 'phone']),
        updatedAt: moment().toDate(),
      } as any);
      userToSave.avatar = urlAvatar;

      await this.connection.transaction(async transactionalEntityManager => {
        await transactionalEntityManager.save([userToSave, ...emailToAdd, ...phoneToAdd]);

        if (emailToDelete.length) {
          await transactionalEntityManager.delete(UserEmail, emailToDelete);
        }

        if (phoneToDelete.length) {
          await transactionalEntityManager.delete(UserPhone, phoneToDelete);
        }

        const userChanger = await this.userService.getOneById(currentUser.id);
        await this.adminService.updateUserLog(creatorId, userChanger);
      })

      return await this.entityManager
        .getRepository(User)
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.userEmail', 'userEmail')
        .leftJoinAndSelect('user.userPhone', 'userPhone')
        .leftJoinAndSelect('user.language', 'language')
        .leftJoinAndSelect('user.groups', 'group')
        .leftJoinAndSelect('group.organisation', 'organisation')
        .leftJoinAndSelect('organisation.lmsGroup', 'lmsGroup')
        .leftJoinAndSelect('user.userLog', 'userLog')
        .leftJoinAndSelect('userLog.createdBy', 'createdBy')
        .leftJoinAndSelect('createdBy.userEmail', 'createdBy.email')
        .leftJoinAndSelect('userLog.changedBy', 'changedBy')
        .leftJoinAndSelect('changedBy.userEmail', 'changedBy.email')
        .leftJoinAndSelect('user.courseCreatedBy', 'createdCourses')
        .leftJoinAndSelect('createdCourses.course', 'course')
        .where('user.id = :id', { id: creatorId })
        .getOne()
    } catch (e) {
      const codeError = _.get(e, 'code');
      if (codeError === DB_DUPLICATE_ERROR) {
        throw new BadRequestException({ error: 'User with this employe number or person number already exist' });
      } else {
        throw new BadRequestException(e.message);
      }
    }
  }

  public async markUserToDelete(id: number, admin: User): Promise<Number> {
    const user = await this.connection
      .getRepository(User)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.groups', 'groups')
      .where('user.id = :id', { id })
      .getOne()

    await this.tools.checkAdminAccess(admin, {
      groupsIds: user.groups.map(item => item.id)
    })

    const { roles } = user;

    if (roles.includes(UserRole.ADMIN_GROUP) || roles.includes(UserRole.ADMIN_ORGANISATION)) {
      const newRoles = roles.filter(item => item !== UserRole.COURSE_CREATOR);
      const newDataCourseCreator = new User({
        ...user,
        roles: newRoles,
      })
      await this.connection.manager.save(newDataCourseCreator);

      return user.id;
    }

    await this.connection
      .getRepository(User)
      .createQueryBuilder('user')
      .update()
      .set({
        isClose: true,
        closedAt: moment()
          .add(DAYS_TO_CLOSE, 'days')
          .toDate(),
      })
      .where({ id })
      .andWhere('FIND_IN_SET(:roles,user.roles)>0', { roles: UserRole.COURSE_CREATOR })
      .andWhere('user.is_close = false')
      .execute()
      .catch(error => {
        throw new BadRequestException(error.message);
      });

    return id;
  }

  public async deleteCourseFromCreator(creatorId: number, courseId: number, admin: User): Promise<HttpStatus> {
    const user = await this.connection
      .getRepository(User)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.groups', 'groups')
      .where('user.id = :id', { id: creatorId })
      .getOne()

    await this.tools.checkAdminAccess(admin, {
      groupsIds: user.groups.map(item => item.id)
    })

    await this.connection
      .getRepository(CourseLog)
      .createQueryBuilder()
      .update()
      .set({
        createdBy: null,
      })
      .where({
        createdBy: new User({ id: creatorId }),
        course: new Course({ id: courseId }),
      })
      .execute()
      .catch(error => {
        throw new BadRequestException(error.message);
      });

    return HttpStatus.OK;
  }
}
