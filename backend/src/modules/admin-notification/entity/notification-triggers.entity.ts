import { Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../../entity/User';
import { UserNotification } from "../../notification/user.notification.entity";
import { NotificationTranslation } from "../../notification/NotificationTranslation.entity";

export enum NotificationTriggerType {
  APPROVED_EXAM = 'approved_exam',
  APPROVED_COURSE = 'approved_course',
  APPROVED_ASSIGNMENT = 'approved_assignment',
  NEW_MESSAGE_TUTOR = 'new_message_tutor',
  ASSIGNMENT_NEW_COURSE = 'assignment_new_course',
}

@Expose()
@Entity()
export class NotificationTriggers {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public type: NotificationTriggerType;

  @Column()
  public heading: string;

  @Column({ nullable: true })
  public additionalData: string;

  @ManyToOne(type => User, user => user.notificationTriggers)
  public admin: User;

  @OneToMany(type => NotificationTranslation, notificationTranslation => notificationTranslation.notificationTriggers)
  public translations: NotificationTranslation[];

  @OneToMany(type => UserNotification, userNotification => userNotification.notificationTrigger)
  public userNotificationTriggers: UserNotification[];

  @CreateDateColumn()
  public createdAt: Date;

  constructor(notificationTriggers: Partial<NotificationTriggers>) {
    !!notificationTriggers && Object.assign(this, notificationTriggers);
  }
}
