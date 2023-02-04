import { ApiModelProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserNotification } from './user.notification.entity';
import {AdminNotificationNormalTypeEnum} from "../admin-notification/enum/admin-notification-normal-type.enum";
import {NotificationTranslation} from "./NotificationTranslation.entity";

export enum NotificationType {
  SYSTEM_INFORMATION = 'system_information',
  NEWS = 'news',
  EVENT = 'event',
  INFORMATION = 'information',
  IMPORTANT_INFORMATION = 'important_information',
  REMINDER = 'reminder',
}

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  @ApiModelProperty()
  public id: number;

  @Column()
  public heading: string;

  @Column({
    enum: AdminNotificationNormalTypeEnum,
    default: AdminNotificationNormalTypeEnum.INFORMATION,
    nullable: false,
    type: 'enum',
  })
  public type: AdminNotificationNormalTypeEnum;

  @OneToMany(type => UserNotification, userNotification => userNotification.notification)
  public userNotification: UserNotification[];

  @OneToMany(type => NotificationTranslation, notificationTranslation => notificationTranslation.notification)
  public translations: NotificationTranslation[];

  public static create(
    heading: string,
  ) {
    return new Notification({
      heading,
    });
  }

  constructor(notification: Partial<Notification>) {
    !!notification && Object.assign(
      this,
      notification,
    );
  }

}
