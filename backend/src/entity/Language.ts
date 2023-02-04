import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { GroupTranslation } from './GroupTranslation';
import { LmsGroupTranslation } from './LmsGroupTranslation';
import { OrganisationTranslation } from './OrganisationTranslation';
import { User } from './User';
import { Course } from './Course';
import { Notification } from "../modules/notification/notification.entity";
import { NotificationTranslation } from "../modules/notification/NotificationTranslation.entity";

@Entity()
export class Language {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public name: string;

  @OneToMany(type => LmsGroupTranslation, lmsGroupTranslation => lmsGroupTranslation.language)
  public lmsGroupTranslation: LmsGroupTranslation[];

  @OneToMany(type => User, user => user.language)
  public user: User[];

  @OneToMany(type => OrganisationTranslation, organisationTranslation => organisationTranslation.language)
  public organisationTranslation: OrganisationTranslation[];

  @OneToMany(type => GroupTranslation, groupTranslation => groupTranslation.language)
  public groupTranslation: GroupTranslation[];

  @OneToMany(type => NotificationTranslation, notificationTranslation => notificationTranslation.language)
  public notificationTranslation: NotificationTranslation[];

  @OneToMany(type => Course, course => course.language)
  public course: Course[];
}
