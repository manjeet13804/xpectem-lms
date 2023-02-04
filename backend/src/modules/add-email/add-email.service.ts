import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { Connection } from 'typeorm';

import { User } from '../../entity/User';
import { AddEmail } from './../../entity/AddEmail';
import { UserEmail } from './../../entity/UserEmail';

@Injectable()
export class AddEmailService {

  private entityManager = this.connection.createEntityManager();

  constructor(
    private readonly connection: Connection,
  ) { }

  public async checkAddEmailToken(token: string): Promise<HttpStatus> {
    try {
      const tokenData = await this.getToken(token);

      if (!tokenData) {
        throw new HttpException({ error: 'Token is not found' }, HttpStatus.BAD_REQUEST);
      }

      await Promise.all([
        this.addEmail(tokenData),
        this.deleteTokenById(tokenData.id),
      ]);

      return (HttpStatus.OK);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  public async addEmail(tokenData: AddEmail) {
    const {
      userId,
      email,
    } = tokenData;

    const user = await this.entityManager.findOne(User, userId);

    if (!user) {
      throw new HttpException({ error: 'User is not found' }, HttpStatus.BAD_REQUEST);
    }

    const userEmail = new UserEmail({ user, email, welcomeEmailSent: moment().toDate() });

    return this.entityManager.save(userEmail);
  }

  public async getToken(token: string): Promise<AddEmail> {
    return this.connection
      .getRepository(AddEmail)
      .createQueryBuilder('addEmail')
      .where('addEmail.token = :token', { token })
      .getOne();
  }

  public async deleteTokenById(id: number) {
    return this.connection
      .createQueryBuilder()
      .delete()
      .from(AddEmail)
      .where({ id })
      .execute();
  }
}
