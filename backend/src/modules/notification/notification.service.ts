import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import * as config from 'config';
import * as jwt from 'jsonwebtoken';
import { Connection } from 'typeorm';
import { UserNotification } from './user.notification.entity';
import { AdminNotificationNormalTypeEnum } from "../admin-notification/enum/admin-notification-normal-type.enum";

const JWT_SECRET: string = config.get('jwt.jwtSecret');

@Injectable()
export class NotificationService {

  constructor(
    private readonly connection: Connection,
  ) {}

  public async deleteNotification(userId: number, notificationId: number) {
    try {
      await this.connection
        .createQueryBuilder()
        .update(UserNotification)
        .set({ isRead: true })
        .where('id = :notificationId', { notificationId })
        .andWhere('user = :userId', { userId })
        .execute();

      return {};
    } catch (e) {
      throw new InternalServerErrorException('Error deleting messages')
    }
  }

  public async getNotification(userId: number) {
    const notifications = await this.connection
      .getRepository(UserNotification)
      .createQueryBuilder('userNotification')
      .leftJoinAndSelect('userNotification.notification', 'notification')
      .leftJoinAndSelect('userNotification.automaticReminderNotification', 'automaticReminderNotification')
      .leftJoinAndSelect('userNotification.notificationTrigger', 'notificationTrigger')
      .leftJoinAndSelect('notification.translations', 'translations')
      .leftJoinAndSelect('automaticReminderNotification.translations', 'automaticReminderTranslations')
      .leftJoinAndSelect('notificationTrigger.translations', 'notificationTriggerTranslations')
      .leftJoinAndSelect('userNotification.user', 'user')
      .where('user.id = :userId', { userId })
      .andWhere('(translations.language = user.language ' +
        'OR automaticReminderTranslations.language = user.language ' +
        'OR notificationTriggerTranslations.language = user.language)'
      )
      .andWhere('userNotification.isRead is FALSE')
      .getMany();

    return notifications.map(notification => {
      if (notification.notificationTrigger) {
        return ({
          heading: notification.notificationTrigger.heading,
          type: AdminNotificationNormalTypeEnum.INFORMATION,
          id: notification.id,
          message: notification.notificationTrigger.translations[0].message,
        })
      }

      if (notification.automaticReminderNotification) {
        return ({
          heading: notification.automaticReminderNotification.header,
          type: AdminNotificationNormalTypeEnum.INFORMATION,
          id: notification.id,
          message: notification.automaticReminderNotification.translations[0].message,
        })
      }

      return ({
        heading: notification.notification.heading,
        type: notification.notification.type,
        id: notification.id,
        message: notification.notification.translations[0].message,
      })
    });
  }

  public async checkToken(token: string): Promise<any> {
    try {
      const user = await jwt.verify(token, JWT_SECRET, (err: any, payload: any) => {
        if (!err) { return payload; }
        Logger.error('Token validate error');
      });

      return user;
    } catch (e) {
      Logger.error(e);
    }
  }

}
