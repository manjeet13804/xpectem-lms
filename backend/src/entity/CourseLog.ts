import { Exclude, Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Course } from './Course';
import { User } from './User';

@Expose()
@Entity()
export class CourseLog {
  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToOne(
    type => User,
    user => user.courseCreatedBy,
  )
  public createdBy: User;

  @ManyToOne(
    type => User,
    user => user.courseChangedBy,
  )
  public changedBy: User;

  @OneToOne(
    type => Course,
    course => course.courseLog,
    {
      onDelete: 'CASCADE',
      nullable: false,
    },
  )
  @Index({ unique: true })
  @JoinColumn()
  public course: Course;

  @Exclude()
  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date;

  @Exclude()
  @Column({
    default: () => 'NOW()',
  })
  public updatedAt: Date;

  create(createdBy: User) {
    return new CourseLog({ createdBy });
  }

  constructor(courseLog: Partial<CourseLog>) {
    !!courseLog && Object.assign(this, courseLog);
  }
}
