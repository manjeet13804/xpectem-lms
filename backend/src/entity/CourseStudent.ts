import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { addDays, differenceInCalendarDays } from 'date-fns/fp';
import { Exclude, Expose, Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';
import { User } from './User';
import { Course } from './Course';
import { CourseStudentStudyPlan } from '../modules/course/course-student-study-plan.embedded';
import { CertificationExamLog } from './CertificationExamLog';

const ZERO_VALUE = 0;

@Expose()
@Entity()
export class CourseStudent {
  @PrimaryGeneratedColumn()
  public readonly id: number;
  public readonly courseId: number;

  @Exclude()
  @ManyToOne(
    () => User,
    user => user.courseStudent,
    { nullable: false },
  )
  public user: User;

  @Expose({ groups: ['admin-student'] })
  @ManyToOne(
    () => Course,
    course => course.students,
    {
      onDelete: 'CASCADE',
      nullable: false,
    })
  public course: Course;

  @Column()
  @ApiModelProperty()
  public startAt: Date;

  @Column({ nullable: true })
  @ApiModelProperty()
  public doneAt?: Date|null;

  @Type(() => CourseStudentStudyPlan)
  @Column(
    () => CourseStudentStudyPlan,
    { prefix: 'study_plan_' },
  )
  @ApiModelProperty()
  public studyPlan: CourseStudentStudyPlan;

  @Column({ default: ZERO_VALUE })
  @ApiModelProperty()
  public points: number;

  @Column({ nullable: true })
  @ApiModelProperty()
  public certificateUrl?: string | null;

  @OneToMany(type => CertificationExamLog, certificationExamLog => certificationExamLog.courseStudent, { onDelete: 'CASCADE' })
  public certificationExamLogs: CertificationExamLog[];

  public static create(
    user: User,
    course: Course,
    startAt: Date,
  ) {
    const {
      studyPlan: {
        approximatelyDays,
      },
    } = course;

    return new CourseStudent({
      user,
      course,
      startAt,
      studyPlan: approximatelyDays > ZERO_VALUE
        ? CourseStudentStudyPlan.fromApproximatelyDays(
          approximatelyDays,
          startAt,
        )
        : null,
    });
  }

  constructor(student: Partial<CourseStudent>) {
    if (student) {
      Object.assign(this, student);
    }
  }

  @Expose()
  @ApiModelProperty()
  get doneUntil() {
    if (!this.course) {
      return;
    }
    const {
      time: {
        complete,
      },
    } = this.course;

    return addDays(
      complete,
      this.startAt,
    );
  }

  @Expose()
  @ApiModelProperty()
  get canDoneCourse() {
    const canDoneCourseLeftDays = differenceInCalendarDays(
      Date.now(),
      this.doneUntil,
    );

    return canDoneCourseLeftDays > ZERO_VALUE;
  }

  @Expose()
  @ApiModelProperty()
  get hasInfinityAccess() {
    if (!this.course) {
      return;
    }
    const {
      time: {
        access,
      },
    } = this.course;

    return !access;
  }

  @Expose()
  @ApiModelProperty()
  get accessUntil() {
    if (!this.course) {
      return;
    }
    const {
      time: {
        access,
      },
    } = this.course;

    if (this.hasInfinityAccess) {
      return null;
    }

    return addDays(
      access,
      this.startAt,
    );
  }

  @Expose()
  @ApiModelProperty()
  get hasAccess() {
    if (!this.accessUntil) {
      return true;
    }

    const daysWhenUserHasAccess = differenceInCalendarDays(
      Date.now(),
      this.accessUntil,
    );

    return daysWhenUserHasAccess > ZERO_VALUE;
  }

  @Expose()
  @ApiModelProperty()
  get leftDays() {
    const leftDays = differenceInCalendarDays(
      Date.now(),
      this.accessUntil,
    );

    if (leftDays < ZERO_VALUE) {
      return null;
    }

    return leftDays;
  }

  @Exclude()
  public selectStudyHours = (hoursPerWeek: number): void => {
    const {
      studyPlan: {
        approximatelyDays,
      },
    } = this.course;

    this.studyPlan = this.studyPlan.selectHoursPerWeek(
      hoursPerWeek,
      approximatelyDays,
      this.startAt,
    );
  }

  @Exclude()
  public selectStudyDoneDate = (wishedDoneDate: Date): void => {
    const {
      studyPlan: {
        approximatelyDays,
      },
    } = this.course;

    this.studyPlan = this.studyPlan.selectWishedDoneDate(
      wishedDoneDate,
      approximatelyDays,
      this.startAt,
    );
  }
}
