import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Course } from './Course';
import { Permission } from './Permission';
import { GroupTranslation } from './GroupTranslation';
import { Organisation } from './Organisation';
import { User } from './User';
import { RegistrationLink } from './RegistrationLink';
import {GroupCoursePermissions} from "./GroupCoursePermissions";

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public name: string;

  @ManyToOne(type => Organisation, organisation => organisation.groups, { onDelete: 'CASCADE' })
  organisation: Organisation;

  @ManyToMany(() => User, user => user.groups)
  public users: User[];

  @ManyToMany(() => RegistrationLink, registrationLink => registrationLink.groups)
  public registrationLinks: RegistrationLink[];

  @Column({ type: 'boolean', default: false })
  public isActive: boolean;

  @JoinTable({
    name: 'group_course',
  })
  @ManyToMany(() => Course)
  public courses: Course[];

  @OneToMany(type => GroupTranslation, groupTranslation => groupTranslation.group)
  translations: GroupTranslation[];

  @CreateDateColumn({
    type: 'timestamp',
  })
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  public updatedAt: Date;
  @JoinTable({
    name: 'group_course_permissions'
  })

  @ManyToMany(
    () => Permission,
    permission => permission.groups,
  )
  public permissions: Permission[];

  @ManyToOne(type => User, user => user.groupCreatedBy)
  public createdBy:User;

  @ManyToOne(type => User, user => user.groupChangedBy)
  public changedBy:User;

  @OneToMany(type => GroupCoursePermissions, groupCoursePermissions => groupCoursePermissions.course)
  groupCoursePermissions: GroupCoursePermissions[];

  constructor(group: Partial<Group>) {
    if (group) {
      Object.assign(this, group);
    }
  }
}
