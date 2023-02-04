import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, Unique, OneToMany } from 'typeorm';
import { Topic } from '../../../entity/Topics';
import { StudentLessonLog } from './student-lesson-log.entity';

@Entity()
@Unique(['topic', 'order'])
export class Lesson {
  @PrimaryGeneratedColumn()
  public readonly id: number;

  @Column()
  public name: string;

  @Column()
  public description: string;

  @Column()
  public url: string;

  @Column({ nullable: true })
  public order: number;

  @OneToMany(() => StudentLessonLog, lessonLog => lessonLog.lesson)
  public studentLogs: StudentLessonLog[];

  @ManyToOne(() => Topic, topic => topic.lessons)
  public topic: Topic;

  constructor(lesson: Partial<Lesson>) {
    !!lesson && Object.assign(this, lesson);
  }
}
