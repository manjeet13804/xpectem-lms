import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as config from 'config';
import * as crypto from 'crypto';
import { Connection, Repository } from 'typeorm';
import {
  isEmpty,
  omit,
} from 'ramda';
import { User } from '../../entity/User';
import { UserLog } from './../../entity/UserLog';
import { UserProfile } from './dto/admin.dto';
import { IUser } from './interfaces/user.interface';
import { UserEmail } from '../../entity/UserEmail';
import { UserPhone } from '../../entity/UserPhone';
import { Language } from '../../entity/Language';
import { Tools } from '../../common/tools/tools';
import { UploadService } from '../upload/upload.service';

const PASSWORD_SALT: string = config.get('password.passwordSalt');
const ALLOWED_AVATAR_MIMETYPES: string[] = config.get('user.account.avatarMimetype');
const ALLOWED_AVATAR_MAX_SIZE: number = config.get('user.account.avatarMaxSize');
const AVATARS_FOLDER: string = config.get('user.avatarsFolder');

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly connection: Connection,
    private readonly tools: Tools,
    private uploadService: UploadService,
  ) { }

  public async updateUserProfile(userDto: UserProfile, user: User, file): Promise<User> {
    if (file) {
      this.tools.checkFileValid(file, ALLOWED_AVATAR_MIMETYPES, ALLOWED_AVATAR_MAX_SIZE);
    }

    const uploadResult = file ? await this.uploadService.upload(file, AVATARS_FOLDER) : null;
    const urlAvatar = uploadResult ? uploadResult.url : userDto.avatar;
    const dto = {
      ...userDto,
      avatar: urlAvatar,
    } as UserProfile

    const {
      firstName,
      lastName,
      language,
      notifyEmail,
      notifySms,
      emails,
      phones,
      avatar,
     } = dto;
    const { id } = user;
    const existingEmails = await this.connection
      .getRepository(UserEmail)
      .createQueryBuilder('userEmail')
      .where('userEmail.email IN (:...emails)', { emails })
      .andWhere('userEmail.user != :id', { id })
      .getMany();

    if (!isEmpty(existingEmails)) {
      throw new BadRequestException({
        error: `A user with "${existingEmails[0].email}" email already exist`,
      });
    }

    const newEmails = emails.map(item => new UserEmail({ email: item }));
    const newPhones = phones ? phones.map(item => new UserPhone({ phone: item })) : [] ;
    const languageEntity = await this.connection.manager.findOne(Language, {
      where: { id: language },
    });

    const userToSave = new User({
      id,
      firstName,
      lastName,
      notifyEmail,
      notifySms,
      avatar,
      language: languageEntity,
      userEmail: newEmails,
      userPhone: newPhones,
    });

    await this.connection.transaction(async transactionEntityManager => {
      await transactionEntityManager.delete(UserEmail, { user: id });
      await transactionEntityManager.delete(UserPhone, { user: id });
      await transactionEntityManager.save([...newEmails, ...newPhones, userToSave]);
    })

    return userToSave;
  }

  public async getAdminInfo(user: User): Promise<User> {
    const { id } = user;
    
    return this.connection
      .getRepository(User)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.lmsGroups', 'lmsGroups')
      .leftJoinAndSelect('lmsGroups.translations', 'lmsGroupTranslations1')
      .leftJoinAndSelect('user.organisations', 'organisations')
      .leftJoinAndSelect('user.userEmail', 'email')
      .leftJoinAndSelect('user.userPhone', 'phone')
      .leftJoinAndSelect('user.language', 'language')
      .leftJoinAndSelect('organisations.translations', 'organisationTranslations')
      .leftJoinAndSelect('organisations.lmsGroup', 'lmsGroup')
      .leftJoinAndSelect('user.groups', 'groups')
      .leftJoinAndSelect('groups.organisation', 'organisation')
      .leftJoinAndSelect('organisation.lmsGroup', 'lmsGroup2')
      .leftJoinAndSelect('lmsGroup2.translations', 'lmsGroupTranslations')
      .where('user.id = :id', { id })
      .getOne();
  }

  public async create(user: IUser): Promise<User> {
    try {
      const u: User = await this.usersRepository.save(omit(['groups'], user));

      if (user.groups && !isEmpty(user.groups)) {
        await this.usersRepository
          .createQueryBuilder()
          .relation(User, 'groups')
          .of(u.id)
          .add(user.groups);
      }

      return Promise.resolve(u);
    } catch (e) {
      if (e.code) {
        if (e.code === 'ER_DUP_ENTRY') {
          throw new BadRequestException('Sorry, already exists an user registered with the same email.');
        }
      }
      throw new InternalServerErrorException('An unexpected error has occurred trying to create the user.');
    }
  }

  public async isUserExists(email: string): Promise<boolean> {
    return Boolean(await this.usersRepository
      .createQueryBuilder('user')
      .leftJoin('user.userEmail', 'userEmail')
      .where('userEmail.email = :email', { email })
      .getOne());
  }

  public async getOneByEmail(email: string): Promise<User> {
    try {
      const lowerCasedEmail = email.toLowerCase();

      return this.connection
        .getRepository(User)
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.userEmail', 'userEmail')
        .leftJoinAndSelect('user.userPhone', 'userPhone')
        .where('userEmail.email = :email', { email: lowerCasedEmail })
        .getOne();
    } catch (e) {
      throw new HttpException(e.massage, HttpStatus.BAD_REQUEST);
    }
  }

  public async update(id: number, user: IUser): Promise<User> {
    await this.usersRepository
      .createQueryBuilder()
      .update()
      .set(omit(
        [
          'email',
          'groups',
        ],
        user))
      .where({ id })
      .execute();

    const updatedUser = await this.usersRepository.findOne({ id });

    if (!updatedUser) {
      throw new NotFoundException('The user was not found');
    }

    const currentGroups = await this.usersRepository
      .createQueryBuilder()
      .relation(User, 'groups')
      .of(updatedUser)
      .loadMany();

    if (user.groups && isEmpty(user.groups)) {
      await this.usersRepository
        .createQueryBuilder()
        .relation(User, 'groups')
        .of(updatedUser)
        .remove(currentGroups);
    }
    if (user.groups && !isEmpty(user.groups)) {
      await Promise.all([
        this.usersRepository
          .createQueryBuilder()
          .relation(User, 'groups')
          .of(updatedUser)
          .remove(currentGroups),
        this.usersRepository
          .createQueryBuilder()
          .relation(User, 'groups')
          .of(updatedUser)
          .add(user.groups),
      ]);
    }

    return this.usersRepository.findOne({ id });
  }

  public async getOneById(id: number): Promise<User> {
    return this.connection
      .getRepository(User)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.userEmail', 'userEmail')
      .leftJoinAndSelect('user.userPhone', 'userPhone')
      .leftJoinAndSelect('user.lmsGroups', 'lmsGroups')
      .leftJoinAndSelect('user.organisations', 'organisations')
      .leftJoinAndSelect('user.groups', 'groups')
      .where('user.id = :id', { id })
      .getOne();
  }

  public async getAll(): Promise<User[]> {
    return this.usersRepository
      .createQueryBuilder()
      .getMany();
  }

  public async fts(query: string): Promise<User[]> {
    return this.usersRepository
      .createQueryBuilder()
      .where(`MATCH (email,first_name,last_name) AGAINST (\'${query.replace(/@/g, '')}*\' IN BOOLEAN MODE)`)
      .getMany();
  }

  public async updatePassword(userId: number, password: string): Promise<HttpStatus> {
    try {
      const encryptedPassword = await this.encryptPassword(password);

      await this.connection
        .getRepository(User)
        .createQueryBuilder('user')
        .update()
        .set({
          password: encryptedPassword,
        })
        .where('user.id = :userId', { userId })
        .execute();

      return (HttpStatus.OK);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  public encryptPassword(password: string): string {
    return crypto
      .createHmac('sha512', PASSWORD_SALT)
      .update(password)
      .digest('hex');
  }

  public async isUserPhoneExists(phone: string): Promise<boolean> {
    return Boolean(await this.usersRepository
      .createQueryBuilder('user')
      .leftJoin('user.userPhone', 'userPhone')
      .where('userPhone.phone = :phone', { phone })
      .getOne());
  }

  public async getUserLogByUserId(id: number): Promise<UserLog> {
    return this.connection
      .getRepository(UserLog)
      .createQueryBuilder('ul')
      .leftJoinAndSelect('ul.user', 'u')
      .where('u.id = :id', { id })
      .getOne();
  }
}
