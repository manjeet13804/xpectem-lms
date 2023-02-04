import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Language } from "../../entity/Language";
import { Notification } from "./notification.entity";
import { NotificationTriggers } from "../admin-notification/entity/notification-triggers.entity";
import { AutomaticReminderNotification } from "../../entity/AutomaticReminderNotifications";

@Entity()
@Index(['notification', 'language'])
export class NotificationTranslation {
  constructor(data: Partial<NotificationTranslation>) {
    if (data) {
      Object.assign(this, data)
    }
  }

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Notification, notification => notification.id)
  public notification: Notification;

  @ManyToOne(type => NotificationTriggers, notificationTriggers => notificationTriggers.id)
  public notificationTriggers: NotificationTriggers;

  @ManyToOne(type => AutomaticReminderNotification, notificationTriggers => notificationTriggers.id)
  public automaticReminders: AutomaticReminderNotification;

  @ManyToOne(type => Language, language => language.id)
  public language: Language;

  @Column({ type: 'text' })
  public message: string;

}
