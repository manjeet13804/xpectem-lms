import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Exam } from '../entity/Exam';
import { User } from './User';

@Entity()
export class ExamResults {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'json', nullable: true })
  public result: string;

  @ManyToOne(
    type => Exam,
    exam => exam.examResults,
    { nullable: false },
  )
  public exam: Exam;

  @ManyToOne(
    type => User,
    user => user.examResults,
    { nullable: false },
  )
  public user: User;
}
