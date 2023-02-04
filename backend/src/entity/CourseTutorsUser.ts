import {
  Entity, JoinColumn,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import {Course} from "./Course";
import {User} from "./User";

@Entity()
export class CourseTutorsUser {
  constructor(data: Partial<CourseTutorsUser>) {
    if (data) {
      Object.assign(this, data)
    }
  }

  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToMany(() => Course, course => course.courseTutorsUser)
  @JoinColumn({ name: 'course_id' })
  public course: Course[];


  @ManyToMany(() => User, user => user.courseTutorsUser)
  @JoinColumn({ name: 'user_id' })
  public user: User[];
}
