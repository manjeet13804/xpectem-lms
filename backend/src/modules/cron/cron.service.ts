import { MailerService } from '@nest-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import * as config from 'config';
import * as CronJob from 'cron';
import * as moment from 'moment';
import { Connection } from 'typeorm';
import { User } from '../../entity/User';
import { AdminNotificationService } from '../admin-notification/admin-notification.service';

const daysToClose = config.get('user.account.daysToClose');

@Injectable()
export class CronService {
  constructor(
    private readonly connection: Connection,
    private readonly mailerService: MailerService,
    private readonly adminNotificationService: AdminNotificationService,
  ) { }

  public async checkClosedAccounts() {
    try {
      const checkDate = moment()
        .add(-daysToClose, 'day')
        .toDate();

      const work = () =>
        this.deleteClosedAccounts(checkDate).catch(err =>
          Logger.error(
            `DELETE_CLOSED_ACCOUNTS ERROR: ${err.message}`,
            err.stack,
          ),
        );

      const job = new CronJob.CronJob('00 00 00 * * *', work, null, true);
      job.start();
    } catch (err) {
      Logger.error(`DELETE_CLOSED_ACCOUNTS ERROR: ${err.message}`, err.stack);
    }
  }

  // Todo test time
  public async checkNotification() {
    const job = new CronJob.CronJob(
      '0 8 * * *',
      () => this.adminNotificationService.checkDaysBeforeReminderNotification(), null, true);
    job.start();
  }

  public async updateNotification() {
    const job = new CronJob.CronJob(
      '0 7 * * *',
      () => this.adminNotificationService.checkReminderNotification(), null, true);
    job.start();
  }

  public async deleteClosedAccounts(checkDate: Date) {
    return this.connection
      .createQueryBuilder()
      .delete()
      .from(User)
      .where('isClose = true')
      .andWhere('closedAt < :checkDate', { checkDate })
      .execute();
  }

  public async sendUnreadNotifications() {
    try {
      const work = () =>
        this.sendMessage().catch(err =>
          Logger.error(
            `SEND_UNREAD_NOTIFICATIONS ERROR: ${err.message}`,
            err.stack,
          ),
        );
      const job = new CronJob.CronJob('00 00 00 * * *', work, null, true);
      job.start();
    } catch (err) {
      Logger.error(`Failed to start "SEND_UNREAD_NOTIFICATIONS" cron job ${err.message}`, err.stack);
    }
  }

  public async sendMessage() {
    const user = await this.connection
      .getRepository(User)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.userNotification', 'userNotification')
      .leftJoinAndSelect('userNotification.notification', 'notification')
      .leftJoinAndSelect('user.userEmail', 'email')
      .where('user.notifyEmail = true')
      .getMany();

    // TODO: check empty notification case
    const promises = user.map(async ({ userEmail, userNotification }) => {
      const notification = userNotification.map((item) => item.notification);

      return Promise.all((userEmail.map(({ email }) =>
        this.mailerService.sendMail({
          template: 'notification-email',
          subject: 'Notification',
          to: email,
          context: {
            notification,
          },
        }),
      )));
    });
    await Promise.all(promises);
  }

}
