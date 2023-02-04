import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';
import { Exam } from './Exam';

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

  @ManyToOne(() => Exam, exam => exam.studentLogs, { 
    onDelete: 'CASCADE'
  })
  public exam: Exam;

  @Column()
  public startedAt: Date;

  @Column({ nullable: true })
  public completedAt?: Date|null;
}
