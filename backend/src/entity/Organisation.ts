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

import { Group } from './Group';
import { LmsGroup } from './LmsGroup';
import { OrganisationTranslation } from './OrganisationTranslation';
import { User } from './User';
import { differenceInCalendarDays } from 'date-fns/fp';
import { Expose } from 'class-transformer';
import {OrganisationCoursePermissions} from "./OrganisationCoursePermissions";

@Entity()
export class Organisation {
  constructor(data?: Partial<Organisation>) {
    if (data) {
      Object.assign(this, data);
    }
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  logoImageUri: string;

  @OneToMany(type => OrganisationTranslation, organisationTranslation => organisationTranslation.organisation)
  translations: OrganisationTranslation[];

  @OneToMany(type => Group, group => group.organisation)
  groups: Group[];

  @ManyToOne(type => LmsGroup, lmsGroup => lmsGroup.organisations, { onDelete: 'CASCADE' })
  lmsGroup: LmsGroup;

  @Column({ default: true })
  isActive: boolean;
  
  @Column({ default: false })
  adminFullAccess: boolean;

  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updatedAt: Date;

  @ManyToMany(() => User, user => user.organisations)
  public users: User[];

  @ManyToOne(type => User, user => user.organisationCreatedBy)
  public createdBy:User;

  @ManyToOne(type => User, user => user.organisationChangedBy)
  public changedBy:User;

  @OneToMany(type => OrganisationCoursePermissions, organisationCoursePermissions => organisationCoursePermissions.course)
  organisationCoursePermissions: OrganisationCoursePermissions[];

  @Expose()
  get currentNumberOfAdmins(): number {

    if (!this.users) {
      return 0
    }

    return this.users.length;
  }
}
