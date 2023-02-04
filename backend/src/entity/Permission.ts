import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  ManyToMany,
  JoinTable,
  PrimaryGeneratedColumn,
  OneToMany
} from 'typeorm';
import { Course } from './Course';
import { Group } from './Group';
import { LmsGroupCoursePermissions } from './LmsGroupCoursePermissions';
import {OrganisationCoursePermissions} from "./OrganisationCoursePermissions";
import {GroupCoursePermissions} from "./GroupCoursePermissions";

@Entity()
export class Permission{
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ nullable: true })
  public type: string;

  @CreateDateColumn({
    type: 'timestamp',
  })
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  public updatedAt: Date;

  @JoinTable({
    name: 'group_course_permissions',
  })
  @ManyToMany(() => Course)
  public courses: Course[];
  @JoinTable({
    name: 'group_course_permissions',
  })
  @ManyToMany(() => Group)
  public groups: Group[];

  @OneToMany(() => LmsGroupCoursePermissions, lmsGroupCoursePermission => lmsGroupCoursePermission.permission)
  public lmsGroupCoursePermissions: LmsGroupCoursePermissions[];

  @OneToMany(type => OrganisationCoursePermissions, organisationCoursePermissions => organisationCoursePermissions.course)
  organisationCoursePermissions: OrganisationCoursePermissions[];

  @OneToMany(type => GroupCoursePermissions, groupCoursePermissions => groupCoursePermissions.course)
  groupCoursePermissions: GroupCoursePermissions[];

  constructor(permission: Partial<Permission>) {
    if (permission) {
      Object.assign(this, permission);
    }
  }
}
