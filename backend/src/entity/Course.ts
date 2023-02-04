import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    CreateDateColumn,
  } from 'typeorm';
  import { Group } from './Group';
  import { User } from './User';
  import { Permission } from './Permission';
  import { Communication } from '../modules/communication/communication.entity';
  import { ContactUs } from '../modules/contact-us/contact-us.entity';
  import { CourseCategory } from '../modules/course-category/course-category.entity';
  import { CourseCertificate } from '../modules/course/course-certificate.entity';
  import { CertificationBooking } from '../modules/course/certification/certification-booking.entity';
  import { CourseLink } from '../modules/course/course-link.entity';
  import { CourseMedia } from '../modules/course/course-media.embedded';
  import { CourseStatus } from '../modules/course/course-status.enum';
  import { CourseStudent } from '../modules/course/course-student.entity';
  import { CourseStudyPlan } from '../modules/course/course-study-plan.embedded';
  import { CourseTime } from '../modules/course/course-time.embedded';
  import { CourseTopic } from '../modules/course/course-topic.entity';
  import { CourseProgression } from './CourseProgression';
  import { Exclude } from 'class-transformer';
  import { Assignment } from '../modules/topic/assignment/assignment.entity';
  import { Exam } from './Exam';
  import { isNil } from '@nestjs/common/utils/shared.utils';
  import { Language } from './Language';
  import { CourseAttachment } from './CourseAttachment';
  import { CourseLog } from './CourseLog';
  import { CourseTranslation } from './CourseTranslation';
  import { CommunicationDialog } from '../modules/communication/communication-dialog.entity';
  import { RegistrationLink } from './RegistrationLink';
  import { LmsGroupCoursePermissions } from "./LmsGroupCoursePermissions";
  import { OrganisationCoursePermissions } from "./OrganisationCoursePermissions";
  import { GroupCoursePermissions } from "./GroupCoursePermissions";
  import { UserNotification } from "../modules/notification/user.notification.entity";
  import { CourseTutorsUser } from './CourseTutorsUser';

  @Entity()
  export class Course {
    @PrimaryGeneratedColumn()
    public readonly id: number;

    @Column()
    public title: string;

    @CreateDateColumn({ type: 'timestamp' })
    public createdAt: Date;

    @Column({ nullable: true })
    public senderEmail: string;

    @Column({ nullable: true })
    public senderName: string;

    @Column({ nullable: true })
    public version: string;

    @Column({ nullable: true })
    public contentList: string;

    @Column({ nullable: true })
    public shortDescription: string;

    @Column({
      type: 'text',
      nullable: true,
    })
    public description: string;

    @Column({ nullable: true })
    public examination: string;

    @Column({ nullable: true })
    public imageUri: string;

    @OneToMany(type => CourseTranslation, courseTranslation => courseTranslation.course)
    translations: CourseTranslation[];

    @ManyToOne(type => Language, language => language.course)
    @JoinColumn({ name: 'language' })
    public language: Language;

    @ManyToMany(type => CourseTutorsUser, courseTutorsUser => courseTutorsUser.course)
    courseTutorsUser: CourseTutorsUser[];

    @ManyToOne(type => CourseCertificate, courseCertificate => courseCertificate.course)
    public courseCertificate: CourseCertificate;

    @OneToMany(type => UserNotification, userNotification => userNotification.course)
    public userNotification: UserNotification;

    @Column({ default: false })
    public isCertified: boolean;

    @Column({ default: true })
    public isOrderable: boolean;

    @Column({ nullable: true })
    public certifiedInfo: string;

    @Column({ nullable: true })
    public isLinear: boolean;

    @Column({ nullable: true })
    public isConsistently: boolean;

    @Column(
      () => CourseMedia,
      {
        prefix: 'media_',
      },
    )
    public media?: CourseMedia | null;

    @Column({
      type: 'text',
      nullable: true,
    })
    public otherInfo: string;

    @Column({ nullable: true })
    public previousKnowledge: string;

    @Column({ nullable: true })
    public price: number;

    @Column({ nullable: true })
    public resultUrl: string;

    @Column({ nullable: true })
    public url: string;

    @Column({
      type: 'text',
      nullable: true,
    })
    public targetGroup: string;

    @Column({
      type: 'text',
      nullable: true,
    })
    public length: string;

    @Column(
      () => CourseTime,
      { prefix: 'time_' },
    )
    public time: CourseTime | null;

    @Column(
      () => CourseStudyPlan,
      { prefix: 'study_plan_' },
    )
    public studyPlan?: CourseStudyPlan | null;

    @Column({ nullable: true })
    public welcomeFileUrl: string;

    @Column({ nullable: true })
    public welcomeEmail: string;

    @Column({ nullable: true })
    public welcomeLetter: string;

    @Column({ nullable: true })
    public welcomeLetterTemplate: string;

    @Column({ nullable: true })
    public welcomeEmailTemplate: string;

    @OneToMany(
      () => CourseLink,
      link => link.course,
    )
    public links: CourseLink[];

    @OneToMany(
      () => CourseTopic,
      courseTopic => courseTopic.course,
    )
    public courseTopics: CourseTopic[];

    @Exclude()
    @OneToMany(() => CourseProgression, courseProgression => courseProgression.course)
    public courseProgression: CourseProgression[];

    @OneToMany(
      () => CourseStudent,
      courseStudent => courseStudent.course,
      { cascade: true },
    )
    public students: CourseStudent[];

    @JoinTable({
      name: 'group_course',
    })
    @ManyToMany(
      () => Group,
      group => group.courses,
    )
    public groups: Group[];

    @ManyToMany(() => RegistrationLink, registrationLink => registrationLink.groups)
    public registrationLinks: RegistrationLink[];

    @OneToMany(type => LmsGroupCoursePermissions, lmsGroupCoursePermissions => lmsGroupCoursePermissions.course)
    lmsGroupCoursePermissions: LmsGroupCoursePermissions[];

    @OneToMany(type => GroupCoursePermissions, groupCoursePermissions => groupCoursePermissions.course)
    groupCoursePermissions: GroupCoursePermissions[];

    @OneToMany(type => OrganisationCoursePermissions, organisationCoursePermissions => organisationCoursePermissions.course)
    organisationCoursePermissions: OrganisationCoursePermissions[];


    @JoinTable({
      name: 'group_course_permissions'
    })
    @ManyToMany(
      () => Permission,
      permission => permission.courses,
    )
    public permissions: Permission[];

    @JoinTable({ name: 'course_tutors_user' })
    @ManyToMany(
      () => User,
    )
    public tutors: User[];

    @JoinTable()
    @ManyToMany(
      () => CourseCategory,
      category => category.courses,
    )
    public categories: CourseCategory[];

    @OneToMany(type => ContactUs, contactUs => contactUs.course)
    public contactUs: ContactUs[];

    @OneToMany(type => CommunicationDialog, communicationDialog => communicationDialog.course)
    public communicationDialog: CommunicationDialog[]

    @ManyToMany(type => Assignment, assignment => assignment.course)
    @JoinTable({ name: 'course-assignment' })
    public assignment: Assignment[];

    @ManyToMany(type => Exam, exam => exam.course)
    @JoinTable({ name: 'course-exam' })
    public exam: Exam[];

    @ManyToMany(type => CourseAttachment, courseAttachment => courseAttachment.courses)
    @JoinTable({ name: 'course-course_attachment' })
    public courseAttachment: CourseAttachment[];

    @OneToMany(
      () => CertificationBooking,
      student => student.course,
    )
    public certificationBookings: CertificationBooking[];

    @OneToMany(() => Communication, communication => communication.course)
    public communication: Communication[];

    @OneToOne(type => CourseLog, courseLog => courseLog.course)
    public courseLog: CourseLog;

    @Column({
      type: 'enum',
      enum: CourseStatus,
      default: CourseStatus.Unpublished,
    })
    public status: CourseStatus;

    @Column({ default: false })
    public isStepByStepTopics: Boolean;

    public getStudentFor = (user: User): CourseStudent | undefined => {
      if (isNil(this.students)) {
        return;
      }

      return this.students.find(
        ({ user: { id } }: CourseStudent): boolean => id === user.id,
      );
    }

    public addStudent = (user: User): CourseStudent => {
      if (isNil(this.students)) {
        return;
      }

      const student = CourseStudent.create(
        user,
        this,
        new Date(),
      );

      this.students.push(student);

      return student;
    }

    public getBookingFor = (userId: number): CertificationBooking | undefined => {
      if (isNil(this.certificationBookings)) {
        return;
      }

      return this.certificationBookings.find(
        ({ user }) => user.id === userId,
      );
    }

    public getIsCertificationBookedFor = (userId: number): boolean => {
      const booking = this.getBookingFor(userId);

      return booking && Boolean(booking.certification);
    }

    public selectStudyDoneDate = (user: User, wishedDoneDate: Date): void => {
      const student = this.getStudentFor(user);
      if (isNil(student)) {
        return;
      }

      student.selectStudyDoneDate(wishedDoneDate);
    }

    public selectStudyHours = (user: User, hoursPerWeek: number): void => {
      const student = this.getStudentFor(user);
      if (isNil(student)) {
        return;
      }

      student.selectStudyHours(hoursPerWeek);
    }

    constructor(course: Partial<Course>) {
      if (course) {
        Object.assign(this, course);
      }
    }
  }
