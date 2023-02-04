import { StudentLessonLog } from '../modules/topic/lesson/student-lesson-log.entity';
import { Topic } from './Topics';
import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, Unique, OneToMany } from 'typeorm';
import { Exam } from './Exam';
import { CourseAttachment } from './CourseAttachment';

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

  @OneToMany(
    () => StudentLessonLog,
     lessonLog => lessonLog.lesson,
     { cascade: true }
    )
  public studentLogs: StudentLessonLog[];

  @OneToMany(() => Exam, exam => exam.lesson, { cascade: true })
  public exams: Exam[];

  @ManyToOne(() => Topic, topic => topic.lessons, { onDelete: 'CASCADE' })
  public topic: Topic;

  @OneToMany(() => CourseAttachment, courseAttachment => courseAttachment.lesson, { cascade: true })
  public files: CourseAttachment[];

  constructor(lesson: Partial<Lesson>) {
    if (lesson) {
      Object.assign(this, lesson);
    }
  }
}
