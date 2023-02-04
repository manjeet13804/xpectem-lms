import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { User } from '../../../entity/User';
import { Assignment } from './assignment.entity';
import { AssignmentAttemptAlreadyCompleteException } from './assignment-attempt-already-complete.exception';
import { StudentAssignmentLogStatusEnum } from './student-assignment-log-status.enum';

@Expose()
@Entity()
export class StudentAssignmentLog {
  @PrimaryGeneratedColumn()
  public readonly id: number;

  @Exclude()
  @Column({ type: 'text', nullable: true })
  public answers: string;

  @Column({ default: 0 })
  public points: number;

  @Exclude()
  @ManyToOne(() => User)
  public student: User;

  @Exclude()
  @ManyToOne(() => Assignment, assignment => assignment.studentLogs)
  public assignment: Assignment;

  @Column('enum', {
    enum: StudentAssignmentLogStatusEnum,
    default: StudentAssignmentLogStatusEnum.Started,
  })
  public status: StudentAssignmentLogStatusEnum;

  @Column()
  public startedAt: Date;

  @Column({ nullable: true })
  public completedAt?: Date|null;

  @Column({ nullable: true })
  public approvedAt?: Date|null;

  public static create = (
    student: User,
    assignment: Assignment,
  ): StudentAssignmentLog => {
    const startedAt = new Date();

    return new StudentAssignmentLog({
      student,
      assignment,
      startedAt,
    });
  }

  constructor(log?: Partial<StudentAssignmentLog>) {
    !!log && Object.assign(this, log);
  }

  @Exclude()
  get isPassed() {
    return this.status === StudentAssignmentLogStatusEnum.Passed;
  }

  @Exclude()
  get isFailed() {
    return this.status === StudentAssignmentLogStatusEnum.Failed;
  }

  @Exclude()
  get isNotPassed() {
    return !this.isPassed;
  }

  @Exclude()
  get isCompleted() {
    return this.status === StudentAssignmentLogStatusEnum.Completed;
  }

  @Exclude()
  get isApproved() {
    return [
      StudentAssignmentLogStatusEnum.Passed,
      StudentAssignmentLogStatusEnum.Failed,
    ].includes(this.status);
  }

  @Exclude()
  get isNotApproved() {
    return !this.isApproved;
  }

  @Exclude()
  public complete = (): void => {
    if (this.isCompleted) {
      throw AssignmentAttemptAlreadyCompleteException.for(this.assignment);
    }

    this.status = StudentAssignmentLogStatusEnum.Completed;
    this.completedAt = new Date();
  }
}
