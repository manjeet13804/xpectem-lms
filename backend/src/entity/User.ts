import { ApiModelProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ContactUs } from '../modules/contact-us/contact-us.entity';
import { ICreateUser } from '../modules/user/interfaces/user.interface';
import { CommunicationMessage } from './../modules/communication/communication-message.entity';
import { Communication } from './../modules/communication/communication.entity';
import { Group } from './Group';
import { Language } from './Language';
import { LmsGroup } from './LmsGroup';
import { Organisation } from './Organisation';
import { UserEmail } from './UserEmail';
import { UserLog } from './UserLog';
import { UserPhone } from './UserPhone';
import { CourseProgression } from './CourseProgression';
import { ExamResults } from './ExamResults';
import { AssignmentResults } from './AssignmentResults';
import { LearnAttemptsLogs } from './LearnAttemptsLogs';
import { CourseLog } from './CourseLog';
import { CommunicationDialog } from '../modules/communication/communication-dialog.entity';
import { Course } from './Course';
import { UserNotification } from '../modules/notification/user.notification.entity';
import { NotificationTriggers } from '../modules/admin-notification/entity/notification-triggers.entity';
import { CourseStudent } from '../modules/course/course-student.entity';
import { NotificationSchedule } from '../modules/admin-notification/entity/notification-schedule.entity';
import { TutorFile } from './TutorFile';
import { StudentTaxonomy } from './StudentTaxonomy';
import { CourseTutorsUser } from "./CourseTutorsUser";
import {NotesUsers} from "./NotesUsers";

export enum UserRole {
  XPECTUM_ADMIN = 'xpectum',
  COURSE_CREATOR = 'course_creator',
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  ADMIN_LMS = 'admin_lms',
  ADMIN_ORGANISATION = 'admin_organisation',
  ADMIN_GROUP = 'admin_group',
  TUTOR = 'tutor',
  EDITOR = 'editor',
  USER = 'user',
  OUTER_API = 'outer_api',
}

@Expose()
@Entity()
@Index(['firstName', 'lastName'], { fulltext: true })
export class User {
  @PrimaryGeneratedColumn()
  @ApiModelProperty()
  public id: number;

  @Column()
  @ApiModelProperty()
  public firstName: string;

  @Column()
  @ApiModelProperty()
  public lastName: string;

  @Column({ nullable: true })
  public avatar: string;

  @Expose({ groups: ['profile'] })
  @Column({ nullable: true })
  public background: string;

  @Exclude()
  @Column()
  public password: string;

  @Column({
    nullable: true,
  })
  public personNumber: string;

  @Column({
    nullable: true,
  })
  public employeeNumber: string;

  @ManyToOne(type => Language, language => language.id)
  language: Language;

  @ManyToOne(type => NotesUsers, notesUsers => notesUsers.id)
  @Index({ unique: true })
  @JoinColumn()
  public noteUser: NotesUsers;

  @ManyToMany(type => CourseTutorsUser, courseTutorsUser => courseTutorsUser.user)
  courseTutorsUser: CourseTutorsUser[];

  @Expose({ groups: ['profile'] })
  @Column({
    nullable: true,
  })
  public postalCode: string;

  @Expose({ groups: ['profile'] })
  @Column({
    nullable: true,
  })
  public postalAddress: string;

  @Column({
    nullable: true,
  })
  public streetAddress: string;

  @Expose()
  @Column({
    default: UserRole.USER,
    nullable: false,
    type: 'set',
  })
  public roles: UserRole[];

  @Expose({ groups: ['profile'] })
  @Column({
    nullable: true,
  })
  public identifierId: string;

  @Column({
    default: true,
  })
  public notifyEmail: boolean;

  @Column({
    default: false,
  })
  public notifySms: boolean;

  @Exclude()
  @Column({ default: false })
  public isClose: boolean;

  @Column({ default: false })
  public isDeactivated: boolean;

  @Exclude()
  @Column({
    nullable: true,
    type: 'timestamp',
  })
  public closedAt: Date;

  @Column({
    nullable: true
  })
  public note: string;

  @JoinTable()
  @ManyToMany(
    () => Group,
    group => group.users,
  )
  public groups: Group[];

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date;

  @Expose({ groups: ['profile', 'admin-profile', 'admin-student', 'admin-tutor'] })
  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt: Date;

  @OneToMany(() => UserEmail, userEmail => userEmail.user)
  public userEmail: UserEmail[];

  @OneToMany(() => UserPhone, userPhone => userPhone.user)
  public userPhone: UserPhone[];

  @OneToMany(type => Communication, communication => communication.user)
  public communication: Communication[];

  @OneToMany(type => CommunicationMessage, communicationMessage => communicationMessage.author)
  public communicationMessage: CommunicationMessage[];

  @OneToMany(type => CommunicationDialog, communicationDialog => communicationDialog.author)
  public communicationDialog: CommunicationDialog[];

  @OneToMany(type => ContactUs, contactUs => contactUs.user)
  public contactUs: ContactUs[];

  @OneToMany(type => LmsGroup, lmsGroup => lmsGroup.createdBy)
  public lmsGroupCreatedBy: LmsGroup[];

  @OneToMany(type => LmsGroup, lmsGroup => lmsGroup.changedBy)
  public lmsGroupChangedBy: LmsGroup[];

  @OneToMany(type => Organisation, organisation => organisation.createdBy)
  public organisationCreatedBy: Organisation[];

  @OneToMany(type => Organisation, organisation => organisation.changedBy)
  public organisationChangedBy: Organisation[];

  @OneToMany(type => Group, group => group.createdBy)
  public groupCreatedBy: Group[];

  @OneToMany(type => Group, group => group.changedBy)
  public groupChangedBy: Group[];

  @OneToMany(type => UserLog, userLog => userLog.createdBy)
  public userCreatedBy: UserLog[];

  @OneToMany(type => UserLog, userLog => userLog.changedBy)
  public userChangedBy: UserLog[];

  @OneToMany(type => CourseLog, courseLog => courseLog.createdBy)
  public courseCreatedBy: CourseLog[];

  @OneToMany(type => CourseLog, courseLog => courseLog.changedBy)
  public courseChangedBy: CourseLog[];

  @OneToMany(type => CourseProgression, courseProgression => courseProgression.user)
  public courseProgression: CourseProgression[];

  @OneToMany(type => ExamResults, examResults => examResults.user)
  public examResults: ExamResults[];

  @OneToMany(type => AssignmentResults, assignmentResults => assignmentResults.user)
  public assignmentResults: AssignmentResults[];

  @OneToMany(type => LearnAttemptsLogs, learnTokens => learnTokens.user)
  public learnTokens: LearnAttemptsLogs[];

  @OneToMany(type => UserNotification, userNotification => userNotification.user)
  public userNotification: UserNotification[];

  @OneToMany(type => UserNotification, userNotification => userNotification.initializerAdmin)
  public adminNotifications: UserNotification[];

  @OneToMany(type => NotificationTriggers, notificationTriggers => notificationTriggers.admin)
  public notificationTriggers: UserNotification[];

  @OneToMany(type => CourseStudent, courseStudent => courseStudent.user)
  public courseStudent: CourseStudent[];

  @OneToMany(type => NotificationSchedule, notificationSchedule => notificationSchedule.admin)
  public notificationScheduleAdmin: NotificationSchedule[];

  @OneToMany(type => NotificationSchedule, notificationSchedule => notificationSchedule.user)
  public notificationScheduleUser: NotificationSchedule[];

  @OneToMany(() => TutorFile, tutorFile => tutorFile.tutor, { cascade: true })
  public tutorFiles: TutorFile[];

  @OneToOne(type => UserLog, userLog => userLog.user)
  @Index({ unique: true })
  @JoinColumn()
  public userLog: UserLog;

  @JoinTable()
  @ManyToMany(
    () => Organisation,
    organisation => organisation.users,
  )
  public organisations: Organisation[];

  @JoinTable()
  @ManyToMany(
    () => LmsGroup,
    lmsGroup => lmsGroup.users,
  )
  public lmsGroups: LmsGroup[];

  @Expose({ groups: ['admin-tutor'] })
  @JoinTable({ name: 'course_tutors_user' })
  @ManyToMany(
    () => Course,
  )
  public tutoringCourses: Course[];
  user: StudentTaxonomy[];

  create(data: ICreateUser) {
    return new User(data);
  }

  @OneToMany(() => StudentTaxonomy, studentTaxonomy => studentTaxonomy.user)
  public studentTaxonomy: StudentTaxonomy[];

  constructor(user: Partial<User>) {
    !!user && Object.assign(this, user);
  }
}
