import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from '../../entity/User';
import { Notification } from './notification.entity';
import { NotificationTriggers } from "../admin-notification/entity/notification-triggers.entity";
import { AutomaticReminderNotification } from "../../entity/AutomaticReminderNotifications";
import { Course } from "../../entity/Course";

@Entity()
export class UserNotification {
  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToOne(type => User, user => user.userNotification)
  public user: User;

  @ManyToOne(type => Notification, notification => notification.userNotification)
  public notification: Notification;

  @ManyToOne(type => NotificationTriggers, notificationTriggers => notificationTriggers.userNotificationTriggers)
  public notificationTrigger: NotificationTriggers;

  @ManyToOne(
    type => AutomaticReminderNotification,
    automaticReminderNotification => automaticReminderNotification.userAutomaticReminderNotification,
  )
  public automaticReminderNotification: AutomaticReminderNotification;

  @ManyToOne(type => Course, course => course.userNotification)
  public course: Course;

  @Column({
    default: false,
    type: 'boolean',
  })
  public isRead: boolean;

  @CreateDateColumn()
  public createdAt: Date;

  @ManyToOne(
    type => User,
      user => user.adminNotifications, {
  })
  public initializerAdmin: User;

  constructor(userNotification: Partial<UserNotification>) {
    !!userNotification && Object.assign(
      this,
      userNotification,
    );
  }
}
