import {
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import {Course} from "./Course";
import { Permission } from './Permission';
import {Group} from "./Group";

@Entity()
export class GroupCoursePermissions {
  constructor(data: Partial<GroupCoursePermissions>) {
    if (data) {
      Object.assign(this, data)
    }
  }

  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToOne(() => Course, course => course.groupCoursePermissions)
  public course: Course;

  @ManyToOne(() => Group, group => group.groupCoursePermissions)
  public group: Group;

  @ManyToOne(() => Permission, permission => permission.groupCoursePermissions)
  public permission: Permission;
}
