import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';
import { ExamResults } from './ExamResults';
import { Topic } from './Topics';
import { Course } from './Course';
import { Lesson } from './Lesson';
import { StudentExamLog } from './StudentExamLog';
import { isToday } from 'date-fns';

@Expose()
@Entity()
@Unique(['topic', 'order', 'lesson'])
export class Exam {
  @PrimaryGeneratedColumn()
  @ApiModelProperty()
  public readonly id: number;

  @Column()
  @ApiModelProperty()
  public name: string;

  @Column({ nullable: true })
  @ApiModelProperty()
  public version: string;

  @Column({ nullable: true })
  @ApiModelProperty()
  public maxTries: number;

  @Column({ nullable: true })
  @ApiModelProperty()
  public gradeA: number;

  @Column({ nullable: true })
  @ApiModelProperty()
  public gradeB: number;

  @Column()
  @ApiModelProperty()
  public gradeC: number;

  @Column({ nullable: true })
  @ApiModelProperty()
  public maxPoints: number;

  @Column({ nullable: true })
  @ApiModelProperty()
  public url: string;

  @Column({ nullable: true })
  @ApiModelProperty()
  public timeToComplete: number;

  @Column({ nullable: true })
  @ApiModelProperty()
  public showReport: boolean;

  @Exclude()
  @OneToMany(() => ExamResults, examResults => examResults.exam)
  public examResults: ExamResults[];

  @Column({ nullable: true })
  public order: number;

  @Column({ default: false })
  public isManually: boolean;

  @OneToMany(
    () => StudentExamLog,
     examLog => examLog.exam,
     { cascade: true }
    )
  public studentLogs: StudentExamLog[];

  @Exclude()
  @ManyToOne(() => Topic, topic => topic.exams, { onDelete: 'CASCADE'})
  public topic: Topic;

  @Exclude()
  @ManyToOne(() => Lesson, lesson => lesson.exams, { onDelete: 'CASCADE' })
  public lesson: Lesson;

  @Exclude()
  @ManyToMany(type => Course, course => course.exam, { nullable: true })
  public course: Course[];

  @Exclude()
  get studentLog() {
    if (!this.studentLogs) {
      return;
    }

    return this.studentLogs[this.studentLogs.length - 1];
  }

  @Expose()
  @ApiModelProperty({ type: Boolean })
  get isStarted() {
    return Boolean(this.studentLog);
  }

  @Expose()
  @ApiModelProperty({ type: Boolean })
  get isCompleted() {
    const { points = 0 } = this.studentLog || {};

    return points >= this.gradeC;
  }

  @Expose()
  @ApiModelProperty({ type: Boolean })
  get isFailed() {
    if (this.isStarted) {
      const { points = 0 } = this.studentLog || {};

      return points < this.gradeC;
    }

    return false
  }

  @Expose()
  @ApiModelProperty()
  get todayTries() {
    if (!this.studentLogs) {
      return 0;
    }

    return this.studentLogs.filter(item => isToday(item.startedAt)).length;
  }

  @Expose()
  @ApiModelProperty({ type: 'string', format: 'date-time' })
  get completedAt() {
    const { completedAt = null } = this.studentLog || {};

    return completedAt;
  }

  constructor(exam: Partial<Exam>) {
    if (exam) {
      Object.assign(this, exam);
    }
  }
}
