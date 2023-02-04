import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';
import { Lesson } from './Lesson';

@Entity()
export class StudentLessonLog {
  @PrimaryGeneratedColumn()
  public readonly id: number;

  @ManyToOne(() => User)
  public student: User;

  @ManyToOne(() => Lesson, lesson => lesson.studentLogs, { onDelete: 'CASCADE' })
  public lesson: Lesson;

  @Column()
  public viewedAt: Date;
}
