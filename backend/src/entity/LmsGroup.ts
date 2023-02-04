import { Expose, Type } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { LmsGroupTranslation } from './LmsGroupTranslation';
import { Organisation } from './Organisation';
import { Taxonomy } from './Taxonomy';
import { User } from './User';
import { LmsGroupCoursePermissions } from "./LmsGroupCoursePermissions";
import { AutomaticReminderNotification } from "./AutomaticReminderNotifications";

@Entity()
export class LmsGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  public name: string;

  @Column({ nullable: true })
  public logoImageUri: string;

  @OneToMany(type => Organisation, organisation => organisation.lmsGroup)
  public organisations: Organisation[];

  @OneToMany(type => AutomaticReminderNotification, automaticReminderNotification => automaticReminderNotification.lmsGroup)
  public automaticReminderNotifications: AutomaticReminderNotification[];

  @Column({ nullable: true })
  public accessExpireAt: Date;

  @Column()
  public maxLmsGroupAdmins: number;

  @Column()
  public maxOrganisations: number;

  @Column()
  public maxOrganisationAdmins: number;

  @Column()
  public maxCourses: number;

  @Column()
  public maxStudents: number;

  @Column()
  public maxLmsGroupAdminsSetting: number;

  @Column()
  public maxOrganisationsSetting: number;

  @Column()
  public maxOrganisationAdminsSetting: number;

  @Column()
  public maxCoursesSetting: number;

  @Column()
  public maxStudentsSetting: number;

  @Column({
    default: false,
  })
  public isActive: boolean;

  @Column({
    default: false,
  })
  public notifySms: boolean;

  @Column({
    default: false,
  })
  public hasAccessToMmc: boolean;

  @Column({ nullable: true })
  public orderEmails: string;

  @OneToMany(type => LmsGroupTranslation, lmsGroupTranslation => lmsGroupTranslation.lmsGroup)
  public translations: LmsGroupTranslation[];

  @Expose({ groups: ['admin-lms-group'] })
  @CreateDateColumn({
    type: 'timestamp',
  })
  public createdAt: Date;

  @Expose({ groups: ['admin-lms-group'] })
  @UpdateDateColumn({
    type: 'timestamp',
  })
  public updatedAt: Date;

  @ManyToMany(() => User, user => user.lmsGroups)
  public users: User[];

  @ManyToOne(type => User, user => user.lmsGroupCreatedBy)
  public createdBy:User;

  @ManyToOne(type => User, user => user.lmsGroupChangedBy)
  public changedBy:User;

  @OneToMany(type => LmsGroupCoursePermissions, lmsGroupCoursePermissions => lmsGroupCoursePermissions.lmsGroup)
  lmsGroupCoursePermissions: LmsGroupCoursePermissions[];

  @Type(() => Taxonomy)
  @OneToMany(type => Taxonomy, taxonomy => taxonomy.lmsGroup)
  public taxonomy: Taxonomy[];

  constructor(lmsGroup: Partial<LmsGroup>) {
    if (lmsGroup) {
      Object.assign(this, lmsGroup);
    }
  }
}
