import { BadRequestException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import * as toStream from 'buffer-to-stream';
import * as csv from 'csvtojson/v2';
import * as moment from 'moment';
import { filter, isEmpty, isNil, omit } from 'ramda';
import { Connection } from 'typeorm';

import { Tools } from '../../../../common/tools/tools';
import { Group } from '../../../../entity/Group';
import { User, UserRole } from '../../../../entity/User';
import { UserEmail } from '../../../../entity/UserEmail';
import { UserPhone } from '../../../../entity/UserPhone';
import { ImportAdminDto, SearchAdminDto } from '../../dto/admin.dto';
import { ICreateAdmin } from '../../interfaces/admin.interface';
import { UserService } from '../../user.service';
import { Language } from './../../../../entity/Language';
import { UserLog } from './../../../../entity/UserLog';
import { AuthService } from './../../../auth/auth.service';
import { IUpdateAdmin } from './../../interfaces/admin.interface';
import { UserProfileService } from './../../user-profile.service';
import { AdminService } from './../admin.service';
import { IImportUser } from '../../../../common/interfaces/globalInterfaces';
import { csvToJson } from "../../../../common/csv-to-json/csv-to-json";

@Injectable()
export class AdminGroupService {

  private entityManager = this.connection.createEntityManager();

  constructor(
    public readonly connection: Connection,
    public readonly userService: UserService,
    public readonly tools: Tools,
    public readonly authService: AuthService,
    public readonly userProfileService: UserProfileService,
    public readonly adminService: AdminService,
  ) { }

  public async createAdmin(createData: ICreateAdmin): Promise<HttpStatus> {
    try {
      const {
        email,
        phone,
        groups,
        user: currentUser,
      } = createData;

      await this.tools.checkAdminAccess(currentUser, {
        groupsIds: groups
      })
      const emailExists = await this.tools.getExistingEmails(email);

      if (!isEmpty(emailExists)) {
        throw new BadRequestException({ error: `A group administrator with "${emailExists[0]}" email already exist in this LMS group` });
      }

      const groupsEntity = await this.entityManager.findByIds(Group, groups);

      if (isNil(groupsEntity)) {
        throw new BadRequestException({ error: 'Groups not found' });
      }

      const userLog = new UserLog({ createdBy: currentUser });
      const password = this.tools.generatePassword();
      const encryptedPassword = await this.authService.encryptPassword(password);
      const userData = omit(['email', 'phone', 'groups'], createData);
      // TODO: fix types
      const user = new User({
        ...userData,
        userLog,
        password: encryptedPassword,
        roles: [UserRole.ADMIN_GROUP],
        groups: [...groupsEntity],
      } as any);

      const userEmails = email.map((item) => {
        return new UserEmail({ user, email: item, welcomeEmailSent: moment().toDate() });
      });

      const userPhones = phone
        ? phone.map(item => new UserPhone({ user, phone: item }))
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
      } catch (e) {
        Logger.error(e);
        throw new BadRequestException({ error: 'Create admin error' });
      }

      try {
        await this.tools.sendEmailConfirmation(email, password);
      } catch (e) {
        Logger.error(e);
      }

      return HttpStatus.CREATED;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  public async searchAdmin(searchParams: SearchAdminDto, admin: User) {
    try {
      const {
        firstName,
        lastName,
        email,
        phone,
        isDeactivated,
        lmsGroup,
        organisation,
        group,
      } = searchParams;

      const query = await this.connection
        .getRepository(User)
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.userEmail', 'userEmail')
        .leftJoin('user.userPhone', 'userPhone')
        .leftJoinAndSelect('user.groups', 'group')
        .leftJoinAndSelect('group.organisation', 'organisation')
        .leftJoinAndSelect('organisation.lmsGroup', 'lmsGroup')
        .where('FIND_IN_SET(:roles,user.roles)>0', { roles: UserRole.ADMIN_GROUP })
        .andWhere('user.is_close = false');

      if (!isDeactivated) {
        query.andWhere('user.isDeactivated = :isDeactivated', { isDeactivated: false });
      }

      if (firstName) {
        query.andWhere('LOWER(user.firstName) like :firstName', { firstName: `%${firstName.toLowerCase()}%` });
      }

      if (lastName) {
        query.andWhere('LOWER(user.lastName) like :lastName', { lastName: `%${lastName.toLowerCase()}%` });
      }

      if (email) {
        query.andWhere('LOWER(userEmail.email) like :email', { email: `%${email.toLowerCase()}%` });
      }

      if (phone) {
        query.andWhere('userPhone.phone like :phone', { phone: `%${phone}%` });
      }

      if (lmsGroup) {
        query.andWhere('lmsGroup.id = :lmsGroupId', { lmsGroupId: lmsGroup });
      }

      if (organisation) {
        query.andWhere('organisation.id = :organisationId', { organisationId: organisation });
      }

      if (group) {
        query.andWhere('group.id = :groupId', { groupId: group });
      }

      const groupsAdmins = await query.getMany();

      return this.tools.getGroupAdminsByGroups(admin, groupsAdmins);
    } catch (e) {
      Logger.error(e);
      throw new BadRequestException(e.message);
    }
  }

  public async getAdminById(id: number, admin: User): Promise<User> {
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
        .where({ id })
        .andWhere('FIND_IN_SET(:role,user.roles)>0', { role: UserRole.ADMIN_GROUP })
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

  public async updateAdmin(id: number, updateData: IUpdateAdmin) {
    try {
      const {
        phone,
        email,
        language,
        groups,
        user: currentUserData,
      } = updateData;

      await this.tools.checkAdminAccess(currentUserData, {
        groupsIds: groups,
      })

      if (email) {
        const emailExists = await Promise.all(email.map(async (item) => {
          const lowerCasedEmail = item.toLowerCase();
          const isExist = await this.userProfileService.isEmailExists(id, lowerCasedEmail);

          if (isExist) {
            return item;
          }
        }))
          .then(filter(Boolean));

        if (!isEmpty(emailExists)) {
          throw new BadRequestException({ error: `Email ${emailExists[0]} already exists` });
        }
      }

      const user = await this.getAdminById(id, currentUserData);

      user.language = language
        ? await this.entityManager.findOne(Language, language)
        : user.language;

      const phoneToSave = phone
        ? await this.userProfileService.getPhoneToSave(user, phone)
        : { phoneToAdd: [], phoneToDelete: [] };

      const groupsToSave = groups
        ? await this.getGroupToSave(user, groups)
        : [];

      const {
        phoneToAdd,
        phoneToDelete,
      } = phoneToSave;

      const userToSave = Object.assign(user, omit(['email', 'phone', 'organisations'], updateData), { groups: groupsToSave });
      await this.connection.transaction(async (transactionalEntityManager) => {
        try {
          await transactionalEntityManager
            .createQueryBuilder()
            .delete()
            .from(UserEmail)
            .where('user_email.user_id = :user', { user: user.id })
            .execute();

          const emailToAdd = email.map(item => new UserEmail({ user, email: item}))
          await transactionalEntityManager.save([
            userToSave,
            ...emailToAdd,
            ...phoneToAdd,
          ]);

        } catch (e) { Logger.error(e); }

        if (!isEmpty(phoneToDelete)) {
          await transactionalEntityManager.delete(UserPhone, phoneToDelete);
        }

      });

      const currentUser = await this.userService.getOneById(currentUserData.id);
      await this.adminService.updateUserLog(user.id, currentUser);

      return this.getAdminById(id, currentUserData);
    } catch (e) {
      Logger.error(e);
      throw new BadRequestException(e.message);
    }
  }

  public async getGroupToSave(user: User, groupsIds: number[]): Promise<Group[]> {

    const groupsEntity = await this.connection
      .getRepository(Group)
      .createQueryBuilder('g')
      .where('g.id IN (:...groupsIds)', { groupsIds })
      .getMany();

    if (isEmpty(groupsEntity)) {
      throw new NotFoundException('Groups was not found');
    }

    return groupsEntity.map((item) => {
      item.users = [user];

      return item;
    });
  }

  public async importAdmin(file: any, importData: ImportAdminDto, userData) {

    try {
      const {
        headers,
        groups,
      } = importData;

      await this.tools.checkAdminAccess(userData, {
        groupsIds: groups,
      })

      const currentUser = await this.userService.getOneById(userData.id);

      const jsonArray = await csvToJson(file, headers)

      if (isEmpty(jsonArray)) {
        throw new BadRequestException('File be empty');
      }

      const rebuildData: IImportUser[] = this.tools.rebuildDataForImportAdmin(jsonArray);

      const checkToEmailExists = await Promise.all((rebuildData.map(async (item) => {
        const emailExists = await this.tools.getExistingEmails(item.email);
        if (!isEmpty(emailExists)) {
          return item.email;
        }
      }))).then(filter(Boolean));

      if (!isEmpty(checkToEmailExists)) {
        throw new BadRequestException({ error: 'Email error',
          errors: [`Group admin with the emails: ${checkToEmailExists.join(',')} already exist`],
        });
      }
      const errorsList = this.tools.checkImportAdminDataInvalid(rebuildData);

      if (!isNil(errorsList)) {
        throw new BadRequestException({
          error: 'File validation error',
          errors: errorsList,
        });
      }

      const adminData: any[] = await Promise.all((rebuildData.map(async (item) => {

        const createData = {
          ...item,
          groups,
        };

        return this.getEntityToSave(createData);

      })));

      try {
        await this.connection.transaction(async (transactionalEntityManager) => {
          await Promise.all(adminData.map(async (item) => {
            const { entityToSave } = item;
            const user = entityToSave[0];
            await transactionalEntityManager.save(entityToSave);
            const userLog = new UserLog({ createdBy: currentUser });
            await transactionalEntityManager.save(userLog);
            user.userLog = userLog;
            await transactionalEntityManager.save(user);
          }));
        });
      } catch (e) {
        Logger.error(e);
        throw new BadRequestException({
          error: 'Error saving administrators',
          errors: ['Error saving administrators']
        });
      }

      await Promise.all((adminData.map(async (item) => {
        const {
          sendEmailData: {
            originalPassword,
            emailsToSendMassage,
          },
        } = item;
        try {
          await this.tools.sendEmailConfirmation(emailsToSendMassage, originalPassword);
        } catch (e) {
          Logger.error(e);
        }
      })));

      return HttpStatus.OK;

    } catch (e) {
      Logger.error(e);
      throw new BadRequestException(e.message);
    }
  }

  public async getEntityToSave(createData: ICreateAdmin) {
    try {
      const {
        email,
        phone,
        groups,
      } = createData;

      const groupsEntity = await this.entityManager.findByIds(Group, groups);

      if (isNil(groupsEntity)) {
        throw new BadRequestException({ error: 'Groups not found' });
      }

      const password = this.tools.generatePassword();
      const encryptedPassword = this.authService.encryptPassword(password);
      // TODO: fix types
      const userData = omit(['email', 'phone', 'organisations'], createData);
      const user = new User({
        ...userData,
        password: encryptedPassword,
        roles: [UserRole.ADMIN_GROUP, UserRole.TUTOR, UserRole.COURSE_CREATOR],
        groups: [...groupsEntity],
      } as any);

      const userEmails = email.map((item) => {
        return new UserEmail({ user, email: item, welcomeEmailSent: moment().toDate() });
      });

      const userPhones = phone
        ? phone.map(item => new UserPhone({ user, phone: item }))
        : [];

      return {
        entityToSave: [
          user,
          ...userEmails,
          ...userPhones,
        ],
        sendEmailData: {
          originalPassword: password,
          emailsToSendMassage: email,
        },
      };

    } catch (e) {
      Logger.error(e);
      throw new BadRequestException(e.message);
    }
  }

}
