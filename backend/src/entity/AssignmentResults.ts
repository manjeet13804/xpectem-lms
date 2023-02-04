import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Assignment } from '../modules/topic/assignment/assignment.entity';
import { User } from './User';

@Entity()
export class AssignmentResults {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'json', nullable: true })
  public result: string;

  @ManyToOne(
    type => Assignment,
    assignment => assignment.assignmentResults,
    { nullable: false },
  )
  public assignment: Assignment;

  @ManyToOne(
    type => User,
    user => user.assignmentResults,
    { nullable: false },
  )
  public user: User;
}
