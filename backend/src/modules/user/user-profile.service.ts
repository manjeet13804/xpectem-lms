import { MailerService } from '@nest-modules/mailer';
import { BadRequestException, HttpException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import * as config from 'config';
import * as moment from 'moment';
import * as PDFDocument from 'pdfkit';
import { filter, omit } from 'ramda';
import * as RandExp from 'randexp';
import { generate as randomString } from 'randomstring';
import { Connection, UpdateResult } from 'typeorm';

import { User } from '../../entity/User';
import { REGEXP } from './../../common/regexp/regexp';
import { AddEmail } from './../../entity/AddEmail';
import { ForgotPassword } from './../../entity/ForgotPassword';
import { UserEmail } from './../../entity/UserEmail';
import { UserPhone } from './../../entity/UserPhone';
import { UserProfileUpdateDto } from './dto/user.dto';
import { IPhoneToSave } from './interfaces/user-profile.interface';
import { UserService } from './user.service';

const MAX_EMAIL_COUNT: number = config.get('user.account.maxEmailCount');
const MAX_PHONE_COUNT: number = config.get('user.account.maxPhoneCount');
const FRONTEND_HOST = config.get('frontendHost');

@Injectable()
export class UserProfileService {
  private entityManager = this.connection.createEntityManager();

  constructor(
    private readonly connection: Connection,
    private readonly mailerService: MailerService,
    private readonly userService: UserService,
  ) { }

  public async getUserProfile(id: number): Promise<User> {
    try {
      return this.connection
        .getRepository(User)
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.userEmail', 'userEmail')
        .leftJoinAndSelect('user.userPhone', 'userPhone')
        .where('user.id = :id', { id })
        .getOne();
    } catch (e) {
      throw new HttpException({ error: 'Error retrieving user profile data' }, HttpStatus.BAD_REQUEST);
    }
  }

  public async updateProfile(userId: number, userProfile: UserProfileUpdateDto): Promise<User> {
    try {
      const { phone, email } = userProfile;

      if (email && email.length > MAX_EMAIL_COUNT) {
        throw new HttpException({ error: 'Maximum number of emails exceeded' }, HttpStatus.BAD_REQUEST);
      }

      if (phone && phone.length > MAX_PHONE_COUNT) {
        throw new HttpException({ error: 'Maximum number of phones exceeded' }, HttpStatus.BAD_REQUEST);
      }

      const emailExists = await Promise.all(email.map(async (item) => {
        const lowerCasedEmail = item.toLowerCase();
        const isExist = await this.isEmailExists(userId, lowerCasedEmail);
        if (isExist) { return item; }
      }))
        .then(filter(Boolean));

      if (emailExists.length) {
        throw new HttpException({ error: `Email ${emailExists[0]} already exists` }, HttpStatus.BAD_REQUEST);
      }

      const user = await this.entityManager.findOne(User, {
        join: {
          alias: 'user',
          leftJoinAndSelect: {
            profile: 'user.userEmail',
            photo: 'user.userPhone',
          },
        },
        where: { id: userId },
      });

      const emailToAdd = await this.getEmailToAdd(user, email);
      const emailToDelete = await this.getEmailIdsForDelete(user, email);
      const phoneToSave = await this.getPhoneToSave(user, phone);

      const {
        phoneToAdd,
        phoneToDelete,
      } = phoneToSave;

      const userToSave = Object.assign(user, omit(['email', 'phone'], userProfile));

      await this.connection.transaction(async (transactionalEntityManager) => {

        await transactionalEntityManager.save([
          userToSave,
          ...emailToAdd,
          ...phoneToAdd,
        ]);

        if (emailToDelete.length) {
          await transactionalEntityManager.delete(UserEmail, emailToDelete);
        }

        if (phoneToDelete.length) {
          await transactionalEntityManager.delete(UserPhone, phoneToDelete);
        }

      });

      const updatedUser = await this.entityManager.findOne(User, {
        join: {
          alias: 'user',
          leftJoinAndSelect: {
            profile: 'user.userEmail',
            photo: 'user.userPhone',
          },
        },
        where: { id: userId },
      });

      if (!updatedUser) {
        throw new NotFoundException('The user was not found');
      }

      return updatedUser;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  public async deleteAddEmailToken(userId: number) {
    return this.connection
      .createQueryBuilder()
      .delete()
      .from(AddEmail)
      .where({ userId })
      .execute();
  }

  public async getAddEmailToken(token: string) {
    return this.connection
      .getRepository(AddEmail)
      .createQueryBuilder('addEmail')
      .where('addEmail.token = :token', { token })
      .getOne();
  }

  public async sendMessageToAddEmail(userId: number, email: string): Promise<AddEmail> {
    const token = randomString(64);

    const addEmail = new AddEmail();
    addEmail.token = token;
    addEmail.userId = userId;
    addEmail.email = email;

    try {
      await this.mailerService.sendMail({
        template: 'add-email',
        subject: 'Add email',
        to: email,
        context: {
          link: `${FRONTEND_HOST}/email?token=${token}`,
        },
      });
    } catch (e) {
      Logger.error(e);
    }

    return addEmail;
  }

  public async deleteEmail(userId: number, email: string[]) {
    return this.connection
      .createQueryBuilder()
      .delete()
      .from(UserEmail)
      .where('userEmail.email IN (:...email)', { email })
      .andWhere('user.id = :userId', { userId })
      .execute();
  }

  public async isEmailExists(userId: number, email: string): Promise<boolean> {
    return Boolean(await this.connection
      .getRepository('user')
      .createQueryBuilder('user')
      .leftJoin('user.userEmail', 'userEmail')
      .where('userEmail.email = :email', { email })
      .andWhere('user.id != :userId', { userId })
      .getOne());
  }

  public async getEmailIdsForDelete(user: User, email: string[]): Promise<number[]> {
    const { userEmail: userEmails } = user;

    const allUserEmails = userEmails.map((item) => {
      return item.email;
    });

    const emailsToDelete = await Promise.all(allUserEmails.map(async (item) => {
      if (!email.includes(item)) {
        const userEmail = await this.connection
          .getRepository(UserEmail)
          .createQueryBuilder('userEmail')
          .where('userEmail.email = :email', { email: item })
          .getOne();

        return userEmail
          ? userEmail.id
          : null;
      }
    }))
      .then(filter(Boolean));

    if (allUserEmails.length === emailsToDelete.length) {
      throw new BadRequestException({ error: 'You can\'t delete all confirmed email' });
    }

    return emailsToDelete;
  }

  public async getPhoneToSave(user: User, phones: string[]): Promise<IPhoneToSave> {
    const { userPhone } = user;

    const allUserPhone = userPhone.map(item => item.phone).filter(Boolean);

    const phoneToAdd = phones
      ? phones.map((item) => {
        if (!allUserPhone.includes(item)) {
          const userPhone = new UserPhone({ user, phone: item });

          return userPhone;
        }
      }).filter(Boolean)
      : [];

    const phoneToDelete = await Promise.all(allUserPhone.map(async (phone) => {
      if (!phones || !phones.includes(phone)) {
        const userPhone = await this.connection
          .getRepository(UserPhone)
          .createQueryBuilder('userPhone')
          .leftJoin('userPhone.user', 'user')
          .where('userPhone.phone = :phone', { phone })
          .andWhere('user.id = :userId', { userId: user.id })
          .getOne();

        return userPhone
          ? userPhone.id
          : null;
      }
    }))
      .then(filter(Boolean));

    return {
      phoneToAdd,
      phoneToDelete,
    };

  }

  public async getEmailToAdd(user: User, email: string[]): Promise<AddEmail[]> {
    const {
      id,
      userEmail,
    } = user;

    const allUserEmail = userEmail.map((item) => {
      return item.email;
    }).filter(Boolean);

    const emailToAdd = email.map((item) => {
      if (!allUserEmail.includes(item)) { return item; }
    }).filter(Boolean);

    await this.deleteAddEmailToken(id);

    return Promise.all(emailToAdd.map((item) => {

      return this.sendMessageToAddEmail(id, item);
    }));

  }

  public async updateUserAvatar(userId: number, url: string): Promise<HttpStatus> {
    try {
      await this.connection
        .createQueryBuilder()
        .update(User)
        .set({
          avatar: url,
        })
        .where('id = :userId', { userId })
        .execute();

      const updatedUser = await this.entityManager.findOne(User, userId);

      if (!updatedUser) {
        throw new NotFoundException('The user was not found');
      }

      return HttpStatus.OK;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  public async updateUserBackground(userId: number, uri: string): Promise<HttpStatus> {
    try {
      const user = await this.entityManager.findOne(User, userId);
      if (!user) { throw new NotFoundException('The user was not found'); }
      user.background = uri;
      this.entityManager.save(user);

      return HttpStatus.OK;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  public async resetUserPassword(userId: number): Promise<HttpStatus> {
    try {
      const user = await this.userService.getOneById(userId);

      if (!user) {
        throw new NotFoundException('The user was not found');
      }

      return this.sendResetMessage(user);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  public async sendResetMessage(user: User): Promise<HttpStatus> {
    try {
      const {
        userEmail,
        firstName,
        lastName,
        id,
      } = user;

      const password = new RandExp(REGEXP.PASSWORD).gen();
      await this.userService.updatePassword(id, password);
      await Promise.all(userEmail.map(async ({ email }) => {
        await this.mailerService.sendMail({
          template: 'reset-password',
          subject: 'Reset password',
          to: email,
          context: {
            password,
            firstName,
            lastName,
          },
        });
      }));

      return (HttpStatus.OK);
    } catch (e) {
      throw new HttpException({ error: 'Email not verified' }, HttpStatus.BAD_REQUEST);
    }
  }

  public async closeUserAccount(userId: number): Promise<UpdateResult> {
    try {
      return this.connection
        .createQueryBuilder()
        .update(User)
        .set({
          isClose: true,
          closedAt: moment().toDate(),
        })
        .where('id = :userId', { userId })
        .execute();
    } catch (e) {
      throw new HttpException({ error: 'Error closing user account' }, HttpStatus.BAD_REQUEST);
    }
  }

  public async cancelCloseAccount(userId: number): Promise<UpdateResult> {
    try {
      return this.connection
        .createQueryBuilder()
        .update(User)
        .set({
          isClose: false,
          closedAt: null,
        })
        .where('id = :userId', { userId })
        .execute();
    } catch (e) {
      throw new HttpException({ error: 'Error cancel closing user account' }, HttpStatus.BAD_REQUEST);
    }
  }

  public async createToken(userId: number, token: string) {
    return this.connection
      .createQueryBuilder()
      .insert()
      .into(ForgotPassword)
      .values([
        {
          token,
          userId,
        },
      ])
      .execute();
  }

  public async deleteUserTokens(userId: number) {
    return this.connection
      .createQueryBuilder()
      .delete()
      .from(ForgotPassword)
      .where({ userId })
      .execute();
  }

  public async exportProfile(userId: number): Promise<any> {
    try {
      const user = await this.connection
      .getRepository(User)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.language', 'lang')
      .leftJoinAndSelect('user.userEmail', 'emails')
      .leftJoinAndSelect('user.userPhone', 'phones')
      .where({id: userId})
      .getOne();

      return this.generateExportData(user);
    } catch (e) {
      throw new HttpException({ error: 'Error export user profile data' }, HttpStatus.BAD_REQUEST);
    }
  }

  public async generateExportData(user: User): Promise<PDFKit.PDFDocument> {
    const {
      firstName,
      lastName,
      userEmail,
      userPhone,
      streetAddress,
      postalAddress,
      postalCode,
      identifierId,
      language,
      notifyEmail,
      notifySms,
      avatar,
      background,
    } = user;
    const emails = userEmail.map(item => item.email);
    const phones = userPhone.map(item => item.phone);
    const doc = new PDFDocument();
    doc
      .text('Export profile data:')
      .text(`First name: ${firstName}`)
      .text(`Last name: ${lastName}`)
      .text(`Email(s): ${emails}`)
      .text(`Phone(s): ${phones}`)
      .text(`Street address: ${streetAddress}`)
      .text(`ZIP Code: ${postalCode}`)
      .text(`City: ${postalAddress}`)
      .text(`Identifier ID: ${identifierId}`)
      .text(`Language: ${language.name}`)
      .text(`Notification email: ${notifyEmail}`)
      .text(`Notification sms: ${notifySms}`)
      .text(`Avatar uri: ${avatar}`)
      .text(`Background uri: ${background}`);

    return doc;
  }
}
