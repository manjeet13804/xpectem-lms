import { BadRequestException, HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import * as moment from 'moment';
import { isNil } from 'ramda';
import { Connection, UpdateResult } from 'typeorm';

import { User, UserRole } from './../../../entity/User';
import { UserService } from './../user.service';
import { UserLog } from '../../../entity/UserLog';

@Injectable()
export class AdminService {

  private entityManager = this.connection.createEntityManager();

  constructor(
    private readonly connection: Connection,
    public readonly userService: UserService,
  ) { }

  public async closeUserAccount(userId: number, userRole: UserRole, user: User): Promise<UpdateResult> {
    try {
      return this.connection
        .createQueryBuilder()
        .update(User)
        .set({
          isClose: true,
          closedAt: moment().toDate(),
        })
        .where('id = :userId', { userId })
        .andWhere('FIND_IN_SET(:userRole,roles)>0', { userRole })
        .execute();
    } catch (e) {
      throw new HttpException({ error: 'Error closing user account' }, HttpStatus.BAD_REQUEST);
    }
  }

  public async updateUserLog(userId: number, changedByUser: User) {
    try {
      const userLog = await this.userService.getUserLogByUserId(userId);

      if (isNil(userLog)) {
        throw new BadRequestException('Log was not found');
      }

      await this.connection
        .manager
        .query('UPDATE user_log SET updated_at = now(), changed_by_id = ? WHERE id = ?', [changedByUser.id, userLog.id])

    } catch (e) {
      Logger.error(e);
      throw new BadRequestException(e.message);
    }
  }
}
