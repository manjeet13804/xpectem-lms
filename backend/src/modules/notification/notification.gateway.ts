import { Logger } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { NotificationService } from './notification.service';
import {
  NotificationPayloadInterface,
  ReminderNotificationPayloadInterface,
} from './notification.payload.interface';
import { Connection } from 'typeorm';
import { Notification } from './notification.entity';
import { User } from '../../entity/User';
import { UserNotification } from './user.notification.entity';
import { NotificationTranslation } from "./NotificationTranslation.entity";
import { AdminNotificationNormalTypeEnum } from "../admin-notification/enum/admin-notification-normal-type.enum";

@WebSocketGateway({ origins: '*:*' })
export class NotificationGateway {
  @WebSocketServer()
  private server: Server;

  constructor(
    private readonly notificationService: NotificationService,
    private readonly connection: Connection,
  ) { }

  public async sendNotifications({
    transactionEntityManager,
    languageRepository,
    users,
    notificationType,
    header,
    translations,
    initializerAdminId
  }: NotificationPayloadInterface): Promise<void> {

    const notification = await transactionEntityManager.save(new Notification({
      heading: header,
      type: notificationType,
    }));

    await Promise.all(translations.map(async ({ language: languageId, message }) => {
      const notificationTranslation = new NotificationTranslation({});
      notificationTranslation.notification = notification;
      notificationTranslation.message = message;
      notificationTranslation.language = await languageRepository.findOne(languageId);
      await transactionEntityManager.save(notificationTranslation);
    }));

    const usersNotification = users.map((user) => {
      const translation = translations.find(item => item.language === user.language.id)
        || translations.find(item => item.language === 1) || translations[0];
      this.server.to(`user_${user.id}`).emit('notifications', {
        ...notification,
        message: translation.message,
        heading: header,
      });

      return new UserNotification({
        user: new User(user),
        notification: new Notification({id: notification.id}),
        initializerAdmin: new User({id: initializerAdminId}),
      })
    });

    await transactionEntityManager.save(usersNotification);
  }

  public async reminderNotification (notification: ReminderNotificationPayloadInterface[]) {
    notification.forEach(item => {
      if (item.userId) {
        this.server.to(`user_${item.userId}`).emit(
          'notifications',
          { ...item, type: AdminNotificationNormalTypeEnum.REMINDER },
        );
      }
    })
  }

  public async triggerNotification (notification: ReminderNotificationPayloadInterface[]): Promise<void> {
    notification.forEach(item => {
      if (item.userId) {
        this.server.to(`user_${item.userId}`).emit(
          'notifications',
          { ...item, type: AdminNotificationNormalTypeEnum.REMINDER },
        );
      }
    })
  }


  @SubscribeMessage('verify')
  public async userVerify(client: any, token: string) {
    const event = 'verify';
    try {
      const user = await this.notificationService.checkToken(token);

      if (user) {
        client.join(`user_${user.id}`);

        return { event, data: 'success' };
      }

      return { event, data: 'forbidden' };
    } catch (e) {
      Logger.error('Error verify socket');

      return { event, data: 'error' };
    }
  }
}
