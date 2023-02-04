import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../../entity/User';
import { Exam } from '../../../entity/Exam';

@Entity()
export class StudentExamLog {
  @PrimaryGeneratedColumn()
  public readonly id: number;

  @Column({ type: 'text' })
  public answers: string;

  @Column()
  public points: number;

  @Column()
  public grade: string;

  @ManyToOne(() => User)
  public student: User;

  @ManyToOne(
    () => Exam,
    exam => exam.studentLogs,
  )
  public exam: Exam;

  @Column()
  public startedAt: Date;

  @Column({ nullable: true })
  public completedAt?: Date | null;

  constructor(studentLog: Partial<StudentExamLog>) {
    !!studentLog && Object.assign(this, studentLog);
  }
}
