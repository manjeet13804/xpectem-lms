import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../../entity/User';
import { Lesson } from './lesson.entity';

@Entity()
export class StudentLessonLog {
  @PrimaryGeneratedColumn()
  public readonly id: number;

  @ManyToOne(() => User)
  public student: User;

  @ManyToOne(() => Lesson, lesson => lesson.studentLogs)
  public lesson: Lesson;

  @Column()
  public viewedAt: Date;
}
