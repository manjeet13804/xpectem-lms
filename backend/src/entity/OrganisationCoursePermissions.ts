import {
  Entity,
  ManyToOne, PrimaryGeneratedColumn,
} from "typeorm";
import {Course} from "./Course";
import { Permission } from './Permission';
import {Organisation} from "./Organisation";

@Entity()
export class OrganisationCoursePermissions {
  constructor(data: Partial<OrganisationCoursePermissions>) {
    if (data) {
      Object.assign(this, data)
    }
  }

  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToOne(() => Course, course => course.organisationCoursePermissions)
  public course: Course;

  @ManyToOne(() => Organisation, organisation => organisation.organisationCoursePermissions)
  public organisation: Organisation;

  @ManyToOne(() => Permission, permission => permission.organisationCoursePermissions)
  public permission: Permission;
}
