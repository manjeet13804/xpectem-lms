import { Expose } from 'class-transformer';
import {
  Column, CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LmsGroup } from "./LmsGroup";
import { UserNotification } from "../modules/notification/user.notification.entity";
import {NotificationTranslation} from "../modules/notification/NotificationTranslation.entity";

@Expose()
@Entity()
export class AutomaticReminderNotification {
  constructor(data: Partial<AutomaticReminderNotification>) {
    if (data) {
      Object.assign(this, data)
    }
  }

  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public header: string;

  @Column()
  public percent: number;

  @Column({
    default: false,
  })
  public enable: boolean;

  @Column({
    default: false,
  })
  public isDelete: boolean;

  @ManyToOne(type => LmsGroup, lmsGroup => lmsGroup.automaticReminderNotifications)
  public lmsGroup: LmsGroup;

  @OneToMany(type => NotificationTranslation, notificationTranslation => notificationTranslation.automaticReminders)
  public translations: NotificationTranslation[];

  @OneToMany(type => UserNotification, userNotification => userNotification.automaticReminderNotification)
  public userAutomaticReminderNotification: UserNotification[];

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date;

}
