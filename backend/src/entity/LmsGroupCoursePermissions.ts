import {
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import {Course} from "./Course";
import {LmsGroup} from "./LmsGroup";
import { Permission } from './Permission';

@Entity()
export class LmsGroupCoursePermissions {
  constructor(data: Partial<LmsGroupCoursePermissions>) {
    if (data) {
      Object.assign(this, data)
    }
  }

  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToOne(() => Course, course => course.lmsGroupCoursePermissions)
  public course: Course;

  @ManyToOne(() => LmsGroup, lmsGroup => lmsGroup.lmsGroupCoursePermissions)
  public lmsGroup: LmsGroup;

  @ManyToOne(() => Permission, permission => permission.lmsGroupCoursePermissions)
  public permission: Permission;
}
