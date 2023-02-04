import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';
import { isToday } from 'date-fns';
import { Topic } from '../../../entity/Topics';
import { StudentAssignmentLog } from './student-assignment-log.entity';
import { AssignmentType } from './assignment-type.enum';
import { User } from '../../../entity/User';
import { AssignmentAlreadyPassedException } from './assignment-already-passed.exception';
import { AssignmentActiveAttemptNotFoundException } from './assignment-active-attempt-not-found.exception';
import { AssignmentPreviousAttemptNotApprovedYetException } from './assignment-previous-attempt-not-approved-yet.exception';
import { AssignmentsAttemptsLimitReachedException } from './assignments-attempts-limit-reached.exception';
import { AssignmentResults } from '../../../entity/AssignmentResults';
import { Course } from '../../../entity/Course';

@Expose()
@Entity()
export class Assignment {
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
  public description: string;

  @Column()
  @ApiModelProperty()
  public url: string;

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

  @Column({ default: false })
  public isManually: boolean;

  @Column({ nullable: true })
  @ApiModelProperty()
  public maxPoints: number;

  @Column({ nullable: true })
  @ApiModelProperty()
  public order: number;

  @Column({ type: 'enum', enum: AssignmentType })
  @ApiModelProperty()
  public type: AssignmentType;

  @OneToMany(
    () => StudentAssignmentLog,
    assignmentLog => assignmentLog.assignment,
    { cascade: true },
  )
  public studentLogs: StudentAssignmentLog[];

  @Exclude()
  @ManyToOne(() => Topic, topic => topic.assignments)
  public topic: Topic;

  @Exclude()
  @OneToMany(type => AssignmentResults, assignmentResults => assignmentResults.assignment)
  public assignmentResults: AssignmentResults[];

  @Exclude()
  @ManyToMany(type => Course, course => course.assignment, { nullable: true })
  public course: Course[];

  @Exclude()
  public getStudentLogsFor = (user: User): StudentAssignmentLog[] => {
    return this.studentLogs.filter(
      (
        { student }: StudentAssignmentLog,
      ) => student && student.id === user.id,
    );
  }

  @Exclude()
  public getTodayStudentLogsFor = (user: User): StudentAssignmentLog[] => {
    return this.getStudentLogsFor(user).filter(
      (
        { startedAt }: StudentAssignmentLog,
      ) => isToday(startedAt),
    );
  }

  @Exclude()
  public getLastStudentLogFor = (user: User): StudentAssignmentLog|null => {
    const studentLogsForUser = this.getStudentLogsFor(user);

    return studentLogsForUser[studentLogsForUser.length - 1];
  }

  @Exclude()
  public getActiveStudentLogFor = (user: User): StudentAssignmentLog|null => {
    const lastStudentLog = this.getLastStudentLogFor(user);

    if (lastStudentLog && lastStudentLog.isNotApproved) {
      return lastStudentLog;
    }

    return null;
  }

  @Exclude()
  public getTodayTriesFor = (user: User): number => {
    return this.getTodayStudentLogsFor(user).length;
  }

  @Exclude()
  public getTotalTriesFor = (user: User): number => {
    return this.getStudentLogsFor(user).length;
  }

  @Exclude()
  public isUserHasTry = (user: User): boolean => {
    const todayTries = this.getTodayTriesFor(user);

    return todayTries < this.maxTries;
  }

  @Exclude()
  public isUserDoesntHaveTry = (user: User): boolean => {
    const todayTries = this.getTodayTriesFor(user);

    return todayTries >= this.maxTries;
  }

  @Exclude()
  public start = (user: User): void => {
    const {
      isPassed = false,
    } = this.getLastStudentLogFor(user) || {};

    if (isPassed) {
      throw AssignmentAlreadyPassedException.for(this);
    }

    if (this.isUserDoesntHaveTry(user)) {
      throw AssignmentsAttemptsLimitReachedException.for(this);
    }

    const lastActiveStudentLog = this.getActiveStudentLogFor(user);

    if (!!lastActiveStudentLog) {
      throw AssignmentPreviousAttemptNotApprovedYetException.for(this);
    }

    const studentLog = StudentAssignmentLog.create(user, this);

    this.studentLogs.push(studentLog);
  }

  @Exclude()
  public complete = (user: User): void => {
    const {
      isPassed = false,
    } = this.getLastStudentLogFor(user) || {};

    if (isPassed) {
      throw AssignmentAlreadyPassedException.for(this);
    }

    const studentLog = this.getActiveStudentLogFor(user);

    if (!studentLog) {
      throw AssignmentActiveAttemptNotFoundException.for(this);
    }

    studentLog.complete();

    const studentLogIndex = this.studentLogs.findIndex(
      ({ id }) => id === studentLog.id,
    );

    this.studentLogs[studentLogIndex] = studentLog;
  }

  constructor(assignment: Partial<Assignment>) {
    !!assignment && Object.assign(this, assignment);
  }
}
