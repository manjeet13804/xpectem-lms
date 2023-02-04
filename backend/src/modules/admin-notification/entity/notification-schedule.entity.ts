import { Expose } from 'class-transformer';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../../entity/User';

@Expose()
@Entity()
export class NotificationSchedule {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public heading: string;

  @Column()
  public message: string;

  @Column({ nullable: true })
  public sendTime: Date;

  @Column({ nullable: true })
  public type: string;

  @Column({ nullable: true })
  public countDays: number;

  @Column({ nullable: true })
  public percent: number;

  @ManyToOne(type => User, user => user.notificationScheduleUser)
  public user: User;

  @ManyToOne(type => User, user => user.notificationScheduleAdmin)
  public admin: User;

  constructor(notificationSchedule: Partial<NotificationSchedule>) {
    !!notificationSchedule && Object.assign(this, notificationSchedule);
  }
}
