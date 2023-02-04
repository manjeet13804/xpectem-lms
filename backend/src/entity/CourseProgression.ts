import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Course } from './Course';
import { User } from './User';

@Entity()
export class CourseProgression {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'json', nullable: true })
  public progression: string;

  @ManyToOne(
    type => Course,
    course => course.courseProgression,
    { nullable: false },
  )
  public course: Course;

  @ManyToOne(
    type => User,
    user => user.courseProgression,
    { nullable: false },
  )
  public user: User;
}
