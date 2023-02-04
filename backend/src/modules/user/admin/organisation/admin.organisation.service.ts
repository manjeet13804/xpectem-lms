import { BadRequestException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import * as toStream from 'buffer-to-stream';
import * as csv from 'csvtojson/v2';
import * as moment from 'moment';
import { filter, isEmpty, isNil, omit } from 'ramda';
import { Connection } from 'typeorm';

import { Tools } from '../../../../common/tools/tools';
import { User, UserRole } from '../../../../entity/User';
import { UserEmail } from '../../../../entity/UserEmail';
import { UserPhone } from '../../../../entity/UserPhone';
import { SearchAdminDto } from '../../dto/admin.dto';
import { ICreateAdmin } from '../../interfaces/admin.interface';
import { UserService } from '../../user.service';
import { Language } from './../../../../entity/Language';
import { Organisation } from './../../../../entity/Organisation';
import { UserLog } from './../../../../entity/UserLog';
import { AuthService } from './../../../auth/auth.service';
import { LmsGroupService } from './../../../lms-group/lms-group.service';
import { ImportAdminDto } from './../../dto/admin.dto';
import { IUpdateAdmin } from './../../interfaces/admin.interface';
import { UserProfileService } from './../../user-profile.service';
import { AdminService } from './../admin.service';

@Injectable()
export class AdminOrganisationService {

  private entityManager = this.connection.createEntityManager();

  constructor(
    public readonly connection: Connection,
    public readonly userService: UserService,
    public readonly tools: Tools,
    public readonly authService: AuthService,
    public readonly userProfileService: UserProfileService,
    public readonly lmsGroupService: LmsGroupService,
    public readonly adminService: AdminService,
  ) { }

  public async createAdmin(createData: ICreateAdmin): Promise<HttpStatus> {
    try {
      const {
        email,
        phone,
        organisations: organisationsIds,
        user: currentUser,
      } = createData;

      await this.tools.checkOrganisationAdminAccess(currentUser, {
        organisationIds: organisationsIds,
      })
      const emailExists = await this.tools.getExistingEmails(email);

      if (!isEmpty(emailExists)) {
        throw new BadRequestException({ error: `A organisation administrator with "${emailExists[0]}" email already exist in this LMS group` });
      }

      const organisations = await this.connection
        .getRepository(Organisation)
        .createQueryBuilder('organisations')
        .leftJoinAndSelect('organisations.groups', 'groups')
        .leftJoinAndSelect('organisations.lmsGroup','lmsGroup')
        .leftJoinAndSelect('organisations.users', 'admins')
        .where('organisations.id IN (:...organisationsIds)', { organisationsIds })
        .getMany();

      if (!organisations.length) {
        throw new BadRequestException({ error: 'Organisations not found' });
      }

      const rebuildedOrganisations = organisations.reduce((acc, item) => {
        const maxOrgAdmins = item?.lmsGroup?.maxOrganisationAdmins
        const currentNumberOfAdmins = item.currentNumberOfAdmins

        if ((currentNumberOfAdmins + 1) > maxOrgAdmins) {
          return [...acc]
        }

        return [...acc, item]
      },[])

      if (!rebuildedOrganisations.length) {
        throw new BadRequestException({ error: 'Organisations admins limit is over'})
      }

      const groupsEntity = rebuildedOrganisations.reduce((prev, cur) => prev.concat(cur.groups), []);
      const password = this.tools.generatePassword();
      const encryptedPassword = this.authService.encryptPassword(password);
      // TODO: fix types
      const userData = omit(['email', 'phone', 'organisations'], createData);
      const userLog = new UserLog({
        createdBy: currentUser,
      });
      const user = new User({
        ...userData,
        password: encryptedPassword,
        roles: [UserRole.ADMIN_ORGANISATION, UserRole.COURSE_CREATOR, UserRole.TUTOR],
        organisations: [...rebuildedOrganisations],
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
      Logger.error(e);
      throw new BadRequestException(e.message);
    }
  }

  public async checkOrganisationAdminCount(organisations: number[], maxAdminCount: number, adminCount: number) {
    return Promise.all(organisations.map(async (item) => {
      const count = await this.connection
        .getRepository(User)
        .createQueryBuilder('u')
        .leftJoinAndSelect('u.organisations', 'o')
        .where('o.id = :organisationId', { organisationId: item })
        .andWhere('FIND_IN_SET(:adminOrganisation,u.roles)>0', { adminOrganisation: UserRole.ADMIN_ORGANISATION })
        .getCount();

      if ((count + adminCount) > maxAdminCount) {
        throw new BadRequestException({ error: 'Limit reached' });
      }
    }));
  }

  public async searchAdmin(searchParams: SearchAdminDto, user: User): Promise<User[]> {
    try {
      const {
        firstName,
        lastName,
        email,
        phone,
        isDeactivated,
        lmsGroup,
        organisation,
      } = searchParams;

      const query = await this.connection
        .getRepository(User)
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.userEmail', 'userEmail')
        .leftJoin('user.userPhone', 'userPhone')
        .leftJoinAndSelect('user.organisations', 'organisation')
        .leftJoinAndSelect('organisation.lmsGroup', 'lmsGroup')
        .where('FIND_IN_SET(:roles,user.roles)>0', { roles: UserRole.ADMIN_ORGANISATION })
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

      const result = await query.getMany();

      return this.tools.getOrganisationAdmins(user, result);
    } catch (e) {
      Logger.error(e);
      throw new BadRequestException(e.message);
    }
  }

  public async getAdminById(id: number, admin: User) {
    try {
      const user = await this.connection
        .getRepository(User)
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.userEmail', 'userEmail')
        .leftJoinAndSelect('user.userPhone', 'userPhone')
        .leftJoinAndSelect('user.language', 'language')
        .leftJoinAndSelect('user.organisations', 'organisation')
        .leftJoinAndSelect('organisation.lmsGroup', 'lmsGroup')
        .leftJoinAndSelect('user.userLog', 'userLog')
        .leftJoinAndSelect('userLog.createdBy', 'createdBy')
        .leftJoinAndSelect('createdBy.userEmail', 'createdBy.email')
        .leftJoinAndSelect('userLog.changedBy', 'changedBy')
        .leftJoinAndSelect('changedBy.userEmail', 'changedBy.email')
        .where({ id })
        .andWhere('FIND_IN_SET(:role,user.roles)>0', { role: UserRole.ADMIN_ORGANISATION })
        .getOne();

      if (isNil(user)) {
        throw new NotFoundException('The admin was not found');
      }

      await this.tools.checkOrganisationAdminAccess(admin, {
        organisationIds: user.organisations.map(item => item.id)
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
        organisations,
        user: currentUserData,
      } = updateData;

      await this.tools.checkOrganisationAdminAccess(currentUserData, {
        organisationIds: organisations
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

      const emailToAdd = email
        ? await this.userProfileService.getEmailToAdd(user, email)
        : [];

      const emailToDelete = email
        ? await this.userProfileService.getEmailIdsForDelete(user, email)
        : [];

      const phoneToSave = phone
        ? await this.userProfileService.getPhoneToSave(user, phone)
        : { phoneToAdd: [], phoneToDelete: [] };

      const organisationToSave = organisations
        ? await this.getOrganisationToSave(user, organisations)
        : [];

      const groupsToSave = organisationToSave
        .map(item => item.groups)
        .reduce((prev, cur) => prev.concat(cur), [])
        .map((item) => {
          item.users = [user];

          return item;
        });

      const {
        phoneToAdd,
        phoneToDelete,
      } = phoneToSave;

      const userToSave = Object.assign(
        user,
        omit(['email', 'phone', 'organisations'], updateData),
        { organisations: organisationToSave },
        { groups: groupsToSave },
      );

      await this.connection.transaction(async (transactionalEntityManager) => {

        try {
          await transactionalEntityManager.save([
            userToSave,
            ...emailToAdd,
            ...phoneToAdd,
          ]);

        } catch (e) { Logger.error(e); }

        if (!isEmpty(emailToDelete)) {
          await transactionalEntityManager.delete(UserEmail, emailToDelete);
        }

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

  public async getOrganisationToSave(user: User, organisationsId: number[]): Promise<Organisation[]> {

    const organisationsEntity = await this.connection
      .getRepository(Organisation)
      .createQueryBuilder('o')
      .leftJoinAndSelect('o.groups', 'g')
      .where('o.id IN (:...organisationsId)', { organisationsId })
      .getMany();

    if (isEmpty(organisationsEntity)) {
      throw new NotFoundException('Organisations was not found');
    }

    return organisationsEntity.map((item) => {
      item.users = [user];

      return item;
    });
  }

  public async importAdmin(file: any, importData: ImportAdminDto, userData) {

    try {
      const {
        headers,
        organisations: organisationIDs,
      } = importData;

      await this.tools.checkOrganisationAdminAccess(userData, {
        organisationIds: organisationIDs
      })

      const currentUser = await this.userService.getOneById(userData.id);

      const jsonArray = await csv({
        headers,
        noheader: false,
        ignoreColumns: /(null)/,
        delimiter: [",", ";"],
      }).fromStream(toStream(file.buffer));

      if (isEmpty(jsonArray)) {
        throw new BadRequestException('File be empty');
      }

      const rebuildData: any[] = this.tools.rebuildDataForImportAdmin(jsonArray);
      const errorsList = this.tools.checkImportAdminDataInvalid(rebuildData);
      if (!isNil(errorsList)) {
        throw new BadRequestException({ error: 'File validation error', errors: errorsList });
      }

      const organisations = await this.connection
        .getRepository(Organisation)
        .createQueryBuilder('organisations')
        .leftJoinAndSelect('organisations.groups', 'groups')
        .leftJoinAndSelect('organisations.lmsGroup','lmsGroup')
        .leftJoinAndSelect('organisations.users', 'admins')
        .where('organisations.id IN (:...organisationsIds)', { organisationsIds: organisationIDs })
        .getMany();

      if (!organisations.length) {
        throw new BadRequestException({ error: 'Organisations not found' });
      }

      const rebuildedOrganisations = organisations.reduce((acc, item) => {
        const maxOrgAdmins = item?.lmsGroup?.maxOrganisationAdmins
        const currentNumberOfAdmins = item.currentNumberOfAdmins

        if ((currentNumberOfAdmins + jsonArray.length) > maxOrgAdmins) {
          return [...acc]
        }

        return [...acc, item]
      },[])

      if (!rebuildedOrganisations.length) {
        throw new BadRequestException({ error: 'Organisations admins limit is over'})
      }

      const checkToEmailExists = await Promise.all((rebuildData.map(async (item) => {
        const emailExists = await this.tools.getExistingEmails(item.email);
        if (!isEmpty(emailExists)) {
          return item.email;
        }
      }))).then(filter(Boolean));

      if (!isEmpty(checkToEmailExists)) {
        const errors = checkToEmailExists.map(item => `Organisation admin with the email: ${item} is already exist`)
        throw new BadRequestException({ errors, error: 'Email is already exist' });
      }

      const organisationsForSave = rebuildedOrganisations.map(item => item.id)
      const adminData: any[] = await Promise.all((rebuildData.map((item) => (this.getEntityToSave({
        ...item,
        organisations: organisationsForSave,
      })))));

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
        throw new BadRequestException({ error: 'Error saving administrators' });
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
        organisations,
      } = createData;

      const organisationsEntity = await this.connection
        .getRepository(Organisation)
        .createQueryBuilder('organisations')
        .leftJoinAndSelect('organisations.groups', 'groups')
        .leftJoinAndSelect('organisations.lmsGroup','lmsGroup')
        .leftJoinAndSelect('organisations.users', 'admins')
        .where('organisations.id IN (:...organisationsIds)', { organisationsIds: organisations })
        .getMany();

      const groupsEntity = organisationsEntity.reduce((prev, cur) => prev.concat(cur.groups), []);
      const password = this.tools.generatePassword();
      const encryptedPassword = await this.authService.encryptPassword(password);
      // TODO: fix types
      const userData = omit(['email', 'phone', 'organisations'], createData);
      const user = new User({
        ...userData,
        password: encryptedPassword,
        roles: [UserRole.ADMIN_ORGANISATION, UserRole.COURSE_CREATOR, UserRole.TUTOR],
        organisations: [...organisationsEntity],
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
