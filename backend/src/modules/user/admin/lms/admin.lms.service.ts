import { BadRequestException, HttpStatus, Injectable, Logger, NotFoundException, HttpException } from '@nestjs/common';
import * as config from 'config';
import * as moment from 'moment';
import { filter, isEmpty, isNil, omit } from 'ramda';
import { Connection } from 'typeorm';

import { Tools } from '../../../../common/tools/tools';
import { User, UserRole } from '../../../../entity/User';
import { UserEmail } from '../../../../entity/UserEmail';
import { UserPhone } from '../../../../entity/UserPhone';
import { CreateAdminDto, FileTemplateDto, SearchAdminDto } from '../../dto/admin.dto';
import { ICreateAdmin } from '../../interfaces/admin.interface';
import { UserService } from '../../user.service';
import { Language } from './../../../../entity/Language';
import { LmsGroup } from './../../../../entity/LmsGroup';
import { UserLog } from './../../../../entity/UserLog';
import { AuthService } from './../../../auth/auth.service';
import { UploadService } from './../../../upload/upload.service';
import { UserProfileService } from './../../user-profile.service';
import { AdminService } from './../admin.service';

const ALLOWED_AVATAR_MIMETYPES: string[] = config.get('user.account.avatarMimetype');
const ALLOWED_AVATAR_MAX_SIZE: number = config.get('user.account.avatarMaxSize');
const SEARCH_ADMINS_ERROR: string = 'Search admins error';

@Injectable()
export class AdminLmsService {

  private entityManager = this.connection.createEntityManager();

  constructor(
    public readonly connection: Connection,
    public readonly userService: UserService,
    public readonly tools: Tools,
    public readonly authService: AuthService,
    public readonly userProfileService: UserProfileService,
    public readonly adminService: AdminService,
    private uploadService: UploadService,
  ) { }

  public async createAdmin(createData: ICreateAdmin): Promise<HttpStatus> {
    try {
      const {
        email,
        phone,
        lmsGroup,
        user: currentUser,
      } = createData;

      const emailExists = await this.tools.getExistingEmails(email);

      if (!isEmpty(emailExists)) {
        throw new HttpException({ error: `The LMS group administrator with "${emailExists[0]}" email already exist in this LMS group` }, 
        HttpStatus.INTERNAL_SERVER_ERROR);
      }

      const lmsGroupEntity = await this.connection
        .getRepository(LmsGroup)
        .createQueryBuilder('lg')
        .leftJoinAndSelect('lg.organisations', 'o')
        .leftJoinAndSelect('o.groups', 'g')
        .andWhere('lg.id = :lmsGroup', { lmsGroup })
        .getOne();

      if (isNil(lmsGroupEntity)) {
        throw new BadRequestException({ error: 'LMS group not found' });
      }

      const {
        maxLmsGroupAdmins,
        organisations: organisationsEntity,
      } = lmsGroupEntity;

      await this.checkLmsAdminCount(lmsGroup, maxLmsGroupAdmins);

      const userLog = new UserLog({ createdBy: currentUser });
      const groupsEntity = organisationsEntity.reduce((prev, cur) => prev.concat(cur.groups), []);
      const password = this.tools.generatePassword();
      const encryptedPassword = await this.authService.encryptPassword(password);
      // TODO: fix types
      const userData = omit(['email', 'phone', 'organisations'], createData);
      const user = new User({
        ...userData,
        userLog,
        password: encryptedPassword,
        roles: [UserRole.ADMIN_LMS],
        organisations: [...organisationsEntity],
        groups: [...groupsEntity],
        lmsGroups: [lmsGroupEntity],
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

  public async addExistingAdmin({ email, idLmsGroup }): Promise<HttpStatus> {
    try {
      const admin = await this.connection
        .getRepository(User)
        .createQueryBuilder('user')
        .select('user')
        .leftJoin('user.userEmail', 'userEmail')
        .leftJoinAndSelect('user.lmsGroups', 'lmsGroups')
        .andWhere('userEmail.email = :email', { email })
        .getOne()
      
      const lmsGroup = await this.connection
        .getRepository(LmsGroup)
        .createQueryBuilder('lmsGroup')
        .select('lmsGroup')
        .where('lmsGroup.id = :id', { id: idLmsGroup })
        .getOne()

      const isGroupExist = admin.lmsGroups.some(group => group.id === idLmsGroup)
      
      if (isGroupExist) {
        throw new HttpException({ error: `User with this email "${email[0]}" is already an administrator of this lms group.` },
        HttpStatus.INTERNAL_SERVER_ERROR)
      }

      const groups = [ ...admin.lmsGroups, lmsGroup ]
      const newAdmin = new User({ ...admin, lmsGroups: groups })
      await this.connection.manager.save(newAdmin)

      return HttpStatus.OK;
      
    } catch (e) {
      throw new BadRequestException(e.message);
      
    }
  }

  public async checkLmsAdminCount(lmsGroup: number, maxAdminCount: number) {
    const count = await this.connection
      .getRepository(User)
      .createQueryBuilder('u')
      .leftJoinAndSelect('u.lmsGroups', 'lg')
      .where('lg.id = :lmsGroupId', { lmsGroupId: lmsGroup })
      .andWhere('FIND_IN_SET(:adminOrganisation,u.roles)>0', { adminOrganisation: UserRole.ADMIN_LMS })
      .getCount();

    if (count >= maxAdminCount) {
      throw new BadRequestException({ error: 'Limit reached' });
    }
  }

  public async searchAdmin(searchParams: SearchAdminDto) {
    try {
      const {
        firstName,
        lastName,
        email,
        phone,
        isDeactivated,
        lmsGroup,
      } = searchParams;

      const query = this.connection
        .getRepository(User)
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.userEmail', 'userEmail')
        .leftJoin('user.userPhone', 'userPhone')
        .leftJoinAndSelect('user.lmsGroups', 'lmsGroup')
        .where('FIND_IN_SET(:roles,user.roles)>0', { roles: UserRole.ADMIN_LMS })
        .andWhere('user.isClose = false')

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
      const result = await query.getMany();

      return result;
    } catch (e) {
      throw new BadRequestException({ error: SEARCH_ADMINS_ERROR });
    }
  }

  public async getAdminById(id: number) {
    try {
      const user = await this.connection
        .getRepository(User)
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.userEmail', 'userEmail')
        .leftJoinAndSelect('user.userPhone', 'userPhone')
        .leftJoinAndSelect('user.lmsGroups', 'lmsGroup')
        .leftJoinAndSelect('user.language', 'language')
        .leftJoinAndSelect('user.userLog', 'userLog')
        .leftJoinAndSelect('userLog.createdBy', 'createdBy')
        .leftJoinAndSelect('createdBy.userEmail', 'createdBy.email')
        .leftJoinAndSelect('userLog.changedBy', 'changedBy')
        .leftJoinAndSelect('changedBy.userEmail', 'changedBy.email')
        .where({ id })
        .andWhere('FIND_IN_SET(:role,user.roles)>0', { role: UserRole.ADMIN_LMS })
        .getOne();

      if (isNil(user)) {
        throw new NotFoundException('The admin was not found');
      }

      return user;

    } catch (e) {
      Logger.error(e);
      throw new BadRequestException(e.message);
    }
  }

  public async updateAdmin(id: number, body: CreateAdminDto, file: FileTemplateDto, currentAdminUser: User) {
    try {
      if (file) {
        this.tools.checkFileValid(file, ALLOWED_AVATAR_MIMETYPES, ALLOWED_AVATAR_MAX_SIZE);
      }

      const uploadResult = file
        ? await this.uploadService.upload(file, 'avatars')
        : { url: body.avatar || null };

      const updateData = uploadResult
        ? {
          user: currentAdminUser,
          avatar: uploadResult.url,
          ...body,
        }
        : {
          user: currentAdminUser,
          ...body,
        };

      const {
        phone,
        email,
        language,
        user: currentUserData,
      } = updateData;

      if (email) {
        const emailExists = await Promise.all(email.map(async (item) => {
          const lowerCasedEmail = item.toLowerCase();
          const isExist = await this.userProfileService.isEmailExists(id, lowerCasedEmail);

          if (isExist) {
            return item;
          }
        }))
          .then(filter(Boolean));

        if (this.tools.isNotEmpty(emailExists)) {
          throw new BadRequestException({ error: `Email ${emailExists[0]} already exists` });
        }
      }

      const user = await this.getAdminById(id);

      user.language = language
        ? await this.entityManager.findOne(Language, language)
        : user.language;


      const phoneToSave = phone
        ? await this.userProfileService.getPhoneToSave(user, phone)
        : { phoneToAdd: [], phoneToDelete: [] };

      const {
        phoneToAdd,
        phoneToDelete,
      } = phoneToSave;

      const userToSave = Object.assign(user, omit(['email', 'phone'], updateData));

      await this.connection.transaction(async (transactionalEntityManager) => {
          await transactionalEntityManager.delete(UserEmail, { user: userToSave.id })
          const emails = email.map(item => new UserEmail({ email: item }))

          userToSave.userEmail = emails;
          await transactionalEntityManager.save([
              ...emails,
              ...phoneToAdd,
              userToSave,
          ]);

        if (phoneToDelete.length) {
          await transactionalEntityManager.delete(UserPhone, phoneToDelete);
        }

      });

      const currentUser = await this.userService.getOneById(currentUserData.id);
      await this.adminService.updateUserLog(user.id, currentUser);

      return this.getAdminById(id);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

}
