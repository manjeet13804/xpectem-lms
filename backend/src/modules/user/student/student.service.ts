import {
  BadRequestException,
  HttpException,
  HttpService,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { isNil } from '@nestjs/common/utils/shared.utils';
import * as toStream from 'buffer-to-stream';
import * as config from 'config';
import * as csv from 'csvtojson/v2';
import * as fast_csv from 'fast-csv';
import * as _ from 'lodash';
import * as moment from 'moment';
import { assoc, curry, equals, filter, isEmpty, keys, omit, pipe, reduce, toLower } from 'ramda';
import { Connection, EntityManager } from 'typeorm';

import { Tools } from '../../../common/tools/tools';
import { Group } from '../../../entity/Group';
import { NotesUsers } from '../../../entity/NotesUsers';
import { User, UserRole } from '../../../entity/User';
import { UserEmail } from '../../../entity/UserEmail';
import { UserLog } from '../../../entity/UserLog';
import { UserPhone } from '../../../entity/UserPhone';
import { AdminNotificationTriggersService } from '../../admin-notification/admin-notification-triggers.service';
import { NotificationTriggerType } from '../../admin-notification/entity/notification-triggers.entity';
import { AuthService } from '../../auth/auth.service';
import { CourseStudentStudyPlan } from '../../course/course-student-study-plan.embedded';
import { CourseStudent } from '../../../entity/CourseStudent';
import { Course } from '../../../entity/Course';
import { AdminService } from '../admin/admin.service';
import { MAX_EMAIL_COUNT, MAX_PHONE_COUNT } from '../admin/joi/joi.validation';
import { UserProfileService } from '../user-profile.service';
import { UserService } from '../user.service';
import {
  AddCoursesForStudents,
  AddStudentDto,
  AddStudentsDto,
  ImportStudentDto,
  SearchStudentsDto,
  StudentDto,
  StudentToUpdate,
  UpdateStudentsDto,
  AddStudentTaxonomyDto,
  GetExampleFileDto, CoursesInfoForEmailDto,
} from './dto/studentDto';
import { CourseTopic } from '../../course/course-topic.entity';
import { DATE_FORMATS } from '../../../common/enums/dateFormats';
import { StudentTaxonomy } from '../../../entity/StudentTaxonomy';
import { Taxonomy } from '../../../entity/Taxonomy';
import { Response } from 'express';
import * as joi from 'joi';
import { v4 as uuid } from 'uuid';
import { file } from 'tmp-promise';
import { LmsGroup } from '../../../entity/LmsGroup';
import { Assignment } from '../../../entity/Assignment';
import { StudentAssignmentLog } from '../../../entity/StudentAssignmentLog';
import { csvToJson } from "../../../common/csv-to-json/csv-to-json";
import {ICourseInfo, IImportUser} from "../../../common/interfaces/globalInterfaces";

const renameKeys = curry((keysMap, obj) =>
  reduce((acc, key) => assoc(keysMap[key] || key, obj[key], acc), {}, keys(obj)),
);
const DAYS_TO_CLOSE: number = config.get('user.account.daysToClose');
const DB_DUPLICATE_ERROR = 'ER_DUP_ENTRY';

const {
  allowedMimeTypes: ALLOWED_MIME_TYPES_STUDENT_IMPORT,
  allowedMaxSize: ALLOWED_MAX_SIZE_STUDENT_IMPORT,
  exampleFileData: EXAMPLE_FILE_DATA,
} = config.get('student.import');

@Injectable()
export class StudentService {
  private entityManager = this.connection.createEntityManager();

  constructor(
    private readonly userProfileService: UserProfileService,
    private readonly authService: AuthService,
    private readonly connection: Connection,
    private readonly tools: Tools,
    private readonly adminService: AdminService,
    private readonly userService: UserService,
    private readonly notificationTriggersService: AdminNotificationTriggersService,
    private readonly httpService: HttpService,
  ) {}

  public async createStudents(studentsData: AddStudentsDto, currentUser:User): Promise<AddStudentDto> {
    try {
      // const { students: requestStudents, courses, groups } = studentsData;
      // const groupsEntity = await this.entityManager.findByIds(Group, groups);
      const { students: requestStudents, courses, groups } = studentsData;
      const groupsEntity = await this.entityManager.findByIds(Group, groups, {
        join: {
          alias: 'group',
          leftJoinAndSelect: {
            organisation: 'group.organisation',
            lmsGroup: 'organisation.lmsGroup',
          },
        },
      });

      const lmsGroup = _.get(groupsEntity, '0.organisation.lmsGroup', new LmsGroup({}));
      const coursesIds = courses.map(item => item.courseId);
      const coursesSearch = await this.connection
        .getRepository(Course)
        .createQueryBuilder('course')
        .leftJoinAndSelect('course.courseLog', 'courseLog')
        .leftJoinAndSelect('courseLog.createdBy', 'creator')
        .leftJoinAndSelect('creator.userEmail', 'creatorEmails')
        .leftJoinAndSelect('creator.groups', 'groups')
        .leftJoinAndSelect('creator.organisations', 'organisations')
        .leftJoinAndSelect('creator.lmsGroups', 'lmsGroups')
        .leftJoinAndSelect(
          'course.translations',
          'translations',
          'translations.language = course.language',
        )
        .where('course.id IN (:...ids)', { ids: coursesIds })
        .getMany();

      const coursesInfoForEmail = coursesSearch.map(item => {
        const startDate = moment(
          courses.find(course => course.courseId === item.id).dateBegin,
        ).format(DATE_FORMATS.orderEmailDateFormat);
        const createdDate = moment(item.courseLog.createdAt).format(DATE_FORMATS.certificateDate);
        const createdBy = {
          name: `${item.courseLog.createdBy.firstName} ${item.courseLog.createdBy.lastName}`,
          emails: item.courseLog.createdBy.userEmail.map(item => item.email),
        };
        const groupsChain = item.courseLog.createdBy.groups.map(group => group.name);
        const organisationsChain = item.courseLog.createdBy.organisations.map(org => org.name);
        const lmsGroupsChain = item.courseLog.createdBy.lmsGroups.map(lmsGr => lmsGr.name);
        const creatorAffilation = [...lmsGroupsChain, ...organisationsChain, ...groupsChain].join(
          '-',
        );

        return {
          startDate,
          createdDate,
          creatorAffilation,
          creatorName: createdBy.name,
          creatorEmails: createdBy.emails,
          courseName: item.title,
        };
      });
      const studentsAffilations = groupsEntity.map(
        item => `${item.name} - ${item.organisation.name} - ${item.organisation.lmsGroup.name}`,
      );

      const { studentTaxonomy } = requestStudents[0];
      const taxonomiesIds = studentTaxonomy ? studentTaxonomy.map(item => item.taxonomy.id) : [];
      const taxonomies = await this.connection.manager.findByIds(Taxonomy, taxonomiesIds);
      const taxonomiesIdToTitleHash = taxonomies.reduce((acc, item) => {
        return {
          ...acc,
          [item.id]: item.title,
        };
      }, {});

      const studentsInfoForEmail = requestStudents.map(requestStudent => {
        const studentTaxonomies = requestStudent.studentTaxonomy
          ? requestStudent.studentTaxonomy.map(taxonomy => {
            return {
              key: taxonomiesIdToTitleHash[taxonomy.taxonomy.id],
              value: taxonomy.value,
            };
          })
          : [];

        return {
          studentsAffilations,
          firstName: requestStudent.firstName,
          lastName: requestStudent.lastName,
          emails: requestStudent.emails,
          phones: requestStudent.phones,
          address: requestStudent.streetAddress,
          isPhones: Boolean(requestStudent.phones),
          isAddress: Boolean(requestStudent.streetAddress),
          isTaxonomy: Boolean(requestStudent.studentTaxonomy),
          taxonomies: studentTaxonomies,
        };
      });

      await this.tools.checkAdminAccess(currentUser, {
        groupsIds: groups,
      });

      const studentsEmails = requestStudents.reduce((acc, item) => {
        return [...acc, ...item.emails];
      }, []);
      const existedStudents = await this.connection
        .getRepository(User)
        .createQueryBuilder('student')
        .leftJoinAndSelect('student.userEmail', 'studentEmails')
        .leftJoinAndSelect('student.courseStudent', 'courseStudent')
        .leftJoinAndSelect('courseStudent.course', 'course')
        .where('studentEmails.email IN (:...studentsEmails)', { studentsEmails })
        .getMany();

      const allExistedEmails = existedStudents.reduce((acc, item) => {
        return [...acc, ...item.userEmail.map(item => item.email)];
      }, []);
      const students = requestStudents.filter(
        item =>
          !allExistedEmails.includes(item.emails[0]) && !allExistedEmails.includes(item.emails[1]),
      );
      const studentsToUpdate = existedStudents.map(item => {
        const studentCourses = item.courseStudent.map(c => c.course.id);

        return {
          email: item.userEmail[0].email,
          courses: courses.filter(course => !studentCourses.includes(course.courseId)),
        };
      }) as StudentToUpdate[];

      await this.connection
        .transaction(async transactionalEntityManager => {
          for (const student of students) {
            const { studentTaxonomy } = student;
            const [groupId] = groups;

            const group = await this.connection
              .getRepository(Group)
              .createQueryBuilder('groups')
              .innerJoinAndSelect('groups.organisation', 'organisation')
              .innerJoinAndSelect('organisation.lmsGroup', 'lmsGroup')
              .where('groups.id = :id', { id: groupId })
              .getOne();

            const { lmsGroup } = group.organisation;
            const { id: lmsGroupId } = lmsGroup;

            const invalidFields = await this.checkRequiredTaxonomyFields(
              lmsGroupId,
              studentTaxonomy,
            );

            if (invalidFields.length > 0) {
              throw new BadRequestException({
                error: `${invalidFields[0].title} field is required`,
              });
            }

            const userLog = new UserLog({ createdBy: currentUser });
            const existingEmails = await this.tools.getExistingEmails(student.emails);

            if (!isEmpty(existingEmails)) {
              throw new BadRequestException({
                error: `A student with "${existingEmails[0]}" email already exist`,
              });
            }

            const password = this.tools.generatePassword();
            const encryptedPassword = this.authService.encryptPassword(password);
            // TODO: fix types
            const userData = omit(['email', 'phone', 'groups'], student);
            const user = new User({
              ...userData,
              userLog,
              groups: [...groupsEntity],
              password: encryptedPassword,
              roles: [UserRole.USER],
              streetAddress: userData.streetAddress,
            } as any);

            const userEmails = student.emails.map(email => {
              return new UserEmail({
                user,
                email,
                welcomeEmailSent: moment().toDate(),
              });
            });
            const userPhones = student.phones
              ? student.phones.map(
                item =>
                  new UserPhone({
                    user,
                    phone: item,
                  }),
              )
              : [];
            await transactionalEntityManager.save([user, ...userEmails, ...userPhones]);
            await transactionalEntityManager.save(userLog);
            user.userLog = userLog;
            const createdUser = await transactionalEntityManager.save(user);

            Promise.all(
              groupsEntity.map(async item => {
                const newGroup = new Group({
                  ...item,
                  courses: courses.map(
                    course => new Course({ ..._.omit(course, ['courseId', 'dateBegin']) }),
                  ),
                });
                await transactionalEntityManager.save(newGroup);
              }),
            );

            const newStudentTaxonomies =
              student.studentTaxonomy &&
              student.studentTaxonomy.map(item => {
                const taxonomy = new Taxonomy({ id: item.taxonomy.id });
                const newStudentTaxonomy = new StudentTaxonomy({
                  ...item,
                  taxonomy,
                  user: createdUser,
                });
                if (item.value) {
                  return newStudentTaxonomy;
                }

                return null;
              });

            if (newStudentTaxonomies) {
              const taxonomyEntityts = newStudentTaxonomies.filter(item => item);
              await transactionalEntityManager.save(taxonomyEntityts);
            }

            for (const dataCourse of courses) {
              const startAt = dataCourse.dateBegin || moment().toDate();

              const course = await transactionalEntityManager
                .getRepository(Course)
                .createQueryBuilder('course')
                .leftJoinAndSelect(
                  'course.translations',
                  'translations',
                  'translations.language = course.language',
                )
                .where('course.id = :id', { id: dataCourse.courseId })
                .getOne();

              const courseTopics = await transactionalEntityManager
                .getRepository(CourseTopic)
                .createQueryBuilder('courseTopic')
                .leftJoinAndSelect('courseTopic.topic', 'topics')
                .leftJoinAndSelect('topics.assignments', 'assignments')
                .where('courseTopic.course = :id', { id: dataCourse.courseId })
                .getMany();

              const newCourse = new Course({
                ..._.omit(course, ['courseId', 'dateBegin']),
                groups: [...groupsEntity],
              });

              await transactionalEntityManager.save(newCourse);

              const {
                welcomeEmailTemplate,
                welcomeLetterTemplate,
                translations,
                title,
                senderName,
                senderEmail,
              } = course;

              const courseTranslation = translations[0];
              if (courseTranslation) {
                const { welcomeLetter, welcomeEmail } = courseTranslation;
                await this.tools.sendHtmlToEmail(
                  student.emails,
                  welcomeLetter,
                  'welcome letter',
                  senderName,
                  senderEmail,
                );
                await this.tools.sendHtmlToEmail(
                  student.emails,
                  welcomeEmail,
                  'welcome email',
                  senderName,
                  senderEmail,
                );
              }

              const { firstName, lastName, phones, emails } = student;
              const dateEnd = moment(startAt)
                .add(course.time.complete, 'days')
                .toDate();

              const context = {
                password,
                studentFirstName: firstName,
                studentLastName: lastName,
                courseName: title,
                courseDescription: this.tools.getCourseDescription(courseTranslation),
                courseDateEnd: moment(dateEnd).format(DATE_FORMATS.dateEnd),
                studentEmail: emails[0],
                studentPhone: phones ? phones[0] : '',
                courseLink: '',
                adminFirstName: currentUser.firstName,
                adminLastName: currentUser.lastName,
                adminRole: currentUser.roles,
                adminEmail: currentUser.userEmail[0].email,
                // studentAddress непонятно, нигде нет формы добавления адреса студента
                // systemRequirements нигде нету
                contentList: courseTopics.map(item => item.topic.name),
                lengthOfCourse: course.time.complete,
              };

              await this.tools.sendCourseEmailTemplate(
                welcomeEmailTemplate,
                context,
                student.emails,
                'welcomeEmail',
                senderName,
                senderEmail,
              );
              await this.tools.sendCourseEmailTemplate(
                welcomeLetterTemplate,
                context,
                student.emails,
                'welcomeLetter',
                senderName,
                senderEmail,
              );

              const studyPlan = new CourseStudentStudyPlan({ wishedDoneDate: dateEnd });

              await transactionalEntityManager
                .getRepository(CourseStudent)
                .createQueryBuilder()
                .insert()
                .into(CourseStudent)
                .values({
                  course,
                  studyPlan,
                  startAt,
                  user: createdUser,
                })
                .execute();
            }
            // it brokens "create student", need fix in the feature
            // await this.notificationTriggersService.checkEvent({
            //   student: createdUser,
            //   user: currentUser,
            //   event: NotificationTriggerType.ASSIGNMENT_NEW_COURSE,
            // });

            await this.tools.sendEmailConfirmation(student.emails, password, false).catch(e => {
              Logger.error(e);
            });
          }
        })
        .catch(e => {
          const codeError = _.get(e, 'code');
          if (codeError === DB_DUPLICATE_ERROR) {
            throw new BadRequestException({
              error: 'User with this employe number or person number already exist',
            });
          } else {
            const { error } = _.get(e, 'response', 'Create user error');
            throw new BadRequestException({ error });
          }
        });

      if (lmsGroup && lmsGroup.orderEmails) {
        const data = {
          studentsInfoForEmail,
          subject: `New course order - ${moment().format(DATE_FORMATS.orderEmailDateFormat)}`,
          numberOfCourses: coursesSearch.length,
          coursesInformation: coursesInfoForEmail,
        };

        const emails = lmsGroup.orderEmails.split(',');
        await this.tools.sendOrderEmails(emails, data).catch(e => Logger.error(e));
      }

      return {
        studentsToUpdate,
      };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  public async updateProfile(
    studentId: number,
    studentData: UpdateStudentsDto,
    urlAvatar: string,
    user: User,
  ): Promise<HttpStatus> {
    try {
      const { studentTaxonomy, lmsGroupId } = studentData.student;

      const invalidFields = await this.checkRequiredTaxonomyFields(lmsGroupId, studentTaxonomy);

      if (invalidFields.length > 0) {
        throw new BadRequestException({ error: `${invalidFields[0].title} field is required` });
      }

      const {
        student: { emails, phones, avatar },
        student,
        courses,
        newCourses,
      } = studentData;
      const foundStudent = await this.entityManager.findOne(User, {
        join: {
          alias: 'user',
          leftJoinAndSelect: {
            profile: 'user.userEmail',
            phone: 'user.userPhone',
            groups: 'user.groups',
          },
        },
        where: { id: studentId },
      });

      if (!foundStudent) {
        throw new BadRequestException({ error: "A student isn't found" });
      }

      await this.tools.checkAdminAccess(user, {
        groupsIds: foundStudent.groups.map(item => item.id),
      });

      const existingEmails = await Promise.all(
        emails.map(async email => {
          const lowerCasedEmail = email.toLowerCase();
          const isEmailExist = await this.userProfileService.isEmailExists(
            studentId,
            lowerCasedEmail,
          );

          if (isEmailExist) {
            return email;
          }
        }),
      ).then(filter(Boolean));

      if (!isEmpty(existingEmails)) {
        throw new BadRequestException({
          error: `A student with "${existingEmails}" email already exist`,
        });
      }

      const emailToAdd = await this.userProfileService.getEmailToAdd(foundStudent, emails);
      const emailToDelete = await this.userProfileService.getEmailIdsForDelete(
        foundStudent,
        emails,
      );
      const phoneToSave = await this.userProfileService.getPhoneToSave(foundStudent, phones);
      const { phoneToAdd, phoneToDelete } = phoneToSave;

      // TODO: fix types
      const userToSave = new User({
        ...foundStudent,
        ...student,
        ...omit(['email', 'phone']),
        updatedAt: moment().toDate(),
      } as any);
      userToSave.avatar = urlAvatar || avatar;

      await this.connection.transaction(async transactionalEntityManager => {
        await this.addStudentToCourse(transactionalEntityManager, newCourses, {
          ...userToSave,
          email: userToSave.userEmail[0].email,
        });

        await transactionalEntityManager.save([userToSave, ...emailToAdd, ...phoneToAdd]);
        const newStudentTaxonomies = student.studentTaxonomy
          ? student.studentTaxonomy.map(item => {
            const taxonomy = new Taxonomy({ id: item.taxonomy.id });
            const newStudentTaxonomy = new StudentTaxonomy({
              ...item,
              taxonomy,
              user: userToSave,
            });
            if (item.value) {
              return newStudentTaxonomy;
            }

            return null;
          })
          : [];

        const taxonomyEntityts = newStudentTaxonomies.filter(item => item);
        await transactionalEntityManager.save(taxonomyEntityts);

        if (emailToDelete.length) {
          await transactionalEntityManager.delete(UserEmail, emailToDelete);
        }

        if (phoneToDelete.length) {
          await transactionalEntityManager.delete(UserPhone, phoneToDelete);
        }

        const currentUser = await this.userService.getOneById(user.id);
        await this.adminService.updateUserLog(studentId, currentUser);

        if (courses.length) {
          for (const course of courses) {
            const { dateBegin, dateEnd } = course;

            const courseStudent = await transactionalEntityManager
              .getRepository(CourseStudent)
              .createQueryBuilder('courseStudent')
              .leftJoinAndSelect('courseStudent.user', 'user')
              .leftJoinAndSelect('courseStudent.course', 'course')
              .where('user.id = :studentId', { studentId })
              .andWhere('course.id = :courseId', { courseId: course.courseId })
              .getOne();

            const newStartAtDoneAtInvalid = dateBegin >= dateEnd;
            const newDoneAtInvalid = !dateBegin && courseStudent.startAt >= dateEnd;
            const newStartAtInvalid =
              !dateEnd && courseStudent.studyPlan.wishedDoneDate <= dateBegin;

            if (newStartAtDoneAtInvalid || newDoneAtInvalid || newStartAtInvalid) {
              throw new BadRequestException({ error: 'Error set date' });
            }

            const studyPlan = course.dateEnd ? { wishedDoneDate: course.dateEnd } : {};
            const startAt = course.dateBegin || {};
            const doneAt = await this.checkPassedCourse(
              studentId,
              course.courseId,
              course.coursePassed,
            );

            await transactionalEntityManager
              .getRepository(CourseStudent)
              .createQueryBuilder('courseStudent')
              .leftJoinAndSelect('courseStudent.user', 'user')
              .leftJoinAndSelect('courseStudent.course', 'course')
              .update(CourseStudent)
              .where('user.id = :studentId', { studentId })
              .andWhere('course.id = :courseId', { courseId: course.courseId })
              .set({
                studyPlan,
                doneAt,
                startAt,
              })
              .execute();
          }
        }
      });

      return HttpStatus.ACCEPTED;
    } catch (e) {
      const codeError = _.get(e, 'code');
      if (codeError === DB_DUPLICATE_ERROR) {
        throw new BadRequestException({
          error: 'User with this employe number or person number already exist',
        });
      } else {
        throw new BadRequestException(e.message);
      }
    }
  }

  public async getStudents(query: SearchStudentsDto, admin: User): Promise<User[]> {
    try {
      const {
        firstName,
        lastName,
        email,
        phone,
        personNumber,
        employeeNumber,
        isDeactivated,
      } = query;
      const users = await this.connection
        .getRepository(User)
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.userEmail', 'userEmail')
        .leftJoinAndSelect('user.userPhone', 'userPhone')
        .leftJoinAndSelect('user.lmsGroups', 'lmsGroups')
        .leftJoinAndSelect('user.groups', 'groups')
        .where('user.roles = :roles', { roles: UserRole.USER })
        .andWhere('user.is_close = false');

      if (email) {
        users.andWhere(qb => {
          const subQuery = qb
            .subQuery()
            .select('userEmail.user_id as id')
            .from(UserEmail, 'userEmail')
            .where('userEmail.email LIKE :email', { email: `%${email}%` })
            .getQuery();

          return `user.id IN ${subQuery}`;
        });
      }

      if (phone) {
        users.andWhere(qb => {
          const subQuery = qb
            .subQuery()
            .select('userPhone.user_id as id')
            .from(UserPhone, 'userPhone')
            .where('userPhone.phone LIKE :phone', { phone: `%${phone}%` })
            .getQuery();

          return `user.id IN ${subQuery}`;
        });
      }

      if (isDeactivated) {
        users.andWhere('user.isDeactivated = :isDeactivated', { isDeactivated });
      }

      if (firstName) {
        users.andWhere('user.firstName LIKE :firstName', { firstName: `%${firstName}%` });
      }

      if (lastName) {
        users.andWhere('user.lastName LIKE :lastName', { lastName: `%${lastName}%` });
      }

      if (personNumber) {
        users.andWhere('user.personNumber LIKE :personNumber', {
          personNumber: `%${personNumber}%`,
        });
      }

      if (employeeNumber) {
        users.andWhere('user.employeeNumber LIKE :employeeNumber', {
          employeeNumber: `%${employeeNumber}%`,
        });
      }

      const students = await users.getMany();

      return this.tools.getStudentsByGroups(admin, students);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  public async getOneStudent(id: number, admin: User): Promise<User> {
    try {
      const fieldsForHide = ['password', 'identifierId', 'postalAddress', 'roles'];
      const userLogFieldsForHide = ['password', 'identifierId', 'postalAddress', 'streetAddress'];
      const userEntity = await this.connection
        .getRepository(User)
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.userLog', 'userLog')
        .leftJoinAndSelect('user.language', 'language')
        .leftJoinAndSelect('userLog.createdBy', 'userCreatedBy')
        .leftJoinAndSelect('userLog.changedBy', 'userChangedBy')
        .leftJoinAndSelect('userCreatedBy.userEmail', 'userCreatedByEmails')
        .leftJoinAndSelect('userChangedBy.userEmail', 'userChangedByEmails')
        .leftJoinAndSelect('user.groups', 'groups')
        .leftJoinAndSelect('user.userEmail', 'userEmail')
        .leftJoinAndSelect('user.userPhone', 'userPhone')
        .leftJoinAndSelect('user.lmsGroups', 'lmsGroups')
        .leftJoinAndSelect('user.studentTaxonomy', 'studentTaxonomy')
        .leftJoinAndSelect('studentTaxonomy.taxonomy', 'taxonomy')
        .where({ id })
        .andWhere('user.roles = :roles', { roles: UserRole.USER })
        .getOne();

      const [mainGroup] = userEntity.groups;

      const group = await this.connection
        .getRepository(Group)
        .createQueryBuilder('groups')
        .innerJoinAndSelect('groups.organisation', 'organisation')
        .innerJoinAndSelect('organisation.lmsGroup', 'lmsGroup')
        .where('groups.id = :id', { id: mainGroup.id })
        .getOne();

      const { lmsGroup } = group.organisation;

      await this.tools.checkAdminAccess(admin, {
        groupsIds: userEntity.groups.map(item => item.id),
      });
      const userCourseRelationEntity = await this.connection
        .getRepository(CourseStudent)
        .createQueryBuilder('courseStudent')
        .leftJoinAndSelect('courseStudent.course', 'course')
        .where('courseStudent.user = :id', { id })
        .getMany();

      const userGroupsInfo = await this.connection
        .createQueryBuilder()
        .select("lg.name as 'lmsName', GROUP_CONCAT(g.name) as `groups`")
        .from(User, 'user')
        .leftJoin('user.lmsGroups', 'lg')
        .leftJoin('user.groups', 'g')
        .where('user.id = :id', { id })
        .getRawOne();

      const userCourseRelation = userCourseRelationEntity.map(relation => {
        // TODO: fix types
        const modifyKeys: any = renameKeys({
          startAt: 'dateBegin',
          doneAt: 'coursePassed',
          studyPlan: 'dateEnd',
        })(relation);
        modifyKeys.coursePassed = Boolean(modifyKeys.coursePassed);
        modifyKeys.dateEnd = modifyKeys.dateEnd.wishedDoneDate;

        return modifyKeys;
      });

      return omit(fieldsForHide, {
        ...userEntity,
        userCourseRelation,
        userGroupsInfo,
        lmsGroup,
        userLog: {
          id: userEntity.userLog.id,
          latestLogin: userEntity.userLog.latestLogin,
          browser: userEntity.userLog.browser,
          operatingSystem: userEntity.userLog.operatingSystem,
          createdBy: omit(userLogFieldsForHide, userEntity.userLog.createdBy),
          changedBy: omit(userLogFieldsForHide, userEntity.userLog.changedBy),
        },
      }) as any;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  public async checkPassedCourse(
    studentId: number,
    courseId: number,
    coursePassed: boolean,
  ): Promise<Date> {
    // TODO: remove unncessary code
    const { doneAt } = await this.connection
      .getRepository(CourseStudent)
      .createQueryBuilder('courseStudent')
      .leftJoinAndSelect('courseStudent.user', 'user')
      .leftJoinAndSelect('courseStudent.course', 'course')
      .select('courseStudent.doneAt as doneAt')
      .where('user.id = :studentId', { studentId })
      .andWhere('course.id = :courseId', { courseId })
      .getRawOne();

    if (doneAt && coursePassed) {
      return doneAt;
    }

    if (!doneAt && coursePassed) {
      return moment().toDate();
    }

    return null;
  }

  public async checkImportFile(file, importData): Promise<HttpStatus> {
    try {
      this.tools.checkFileValid(
        file,
        ALLOWED_MIME_TYPES_STUDENT_IMPORT,
        ALLOWED_MAX_SIZE_STUDENT_IMPORT,
      );

      const { headers } = importData;
      const jsonArrayStudents = await csv({
        headers,
        noheader: false,
        eol: '\n',
        ignoreColumns: /(null)/,
        ignoreEmpty: true,
        delimiter: [',', ';'],
      }).fromStream(toStream(file.buffer));

      if (isEmpty(jsonArrayStudents)) {
        throw new BadRequestException('File is empty');
      }

      return HttpStatus.ACCEPTED;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  private async getLmsGroupId(groups: number[]): Promise<LmsGroup> {
    const [mainGroupId] = groups;

    const group = await this.connection
      .getRepository(Group)
      .createQueryBuilder('groups')
      .innerJoinAndSelect('groups.organisation', 'organisation')
      .innerJoinAndSelect('organisation.lmsGroup', 'lmsGroup')
      .where('groups.id = :id', { id: mainGroupId })
      .getOne();

    const { lmsGroup } = group.organisation;

    return lmsGroup;
  }

  private async getExistedStudents(arrayStudents: IImportUser[], courses: ICourseInfo[]): Promise<{
    rebuildArrayStudents: any[],
    studentsToUpdate: StudentToUpdate[],
  }> {
    const studentsEmails = arrayStudents.reduce((acc, item) => {
      return [...acc, ...item.email];
    }, []);

    const existedStudents = await this.connection
      .getRepository(User)
      .createQueryBuilder('student')
      .leftJoinAndSelect('student.userEmail', 'studentEmails')
      .leftJoinAndSelect('student.courseStudent', 'courseStudent')
      .leftJoinAndSelect('courseStudent.course', 'course')
      .where('studentEmails.email IN (:...studentsEmails)', { studentsEmails })
      .getMany();

    const allExistedEmails = existedStudents.reduce((acc, item) => {
      return [...acc, ...item.userEmail.map(item => item.email)];
    }, []);
    const rebuildArrayStudents = arrayStudents.filter(
      item =>
        !allExistedEmails.includes(item.email[0]) && !allExistedEmails.includes(item.email[1]),
    );
    const studentsToUpdate = existedStudents.map(item => {
      const studentCourses = item.courseStudent.map(c => c.course.id);

      return {
        email: item.userEmail[0].email,
        courses: courses.reduce((acc, course) => {
          const isGood = !studentCourses.includes(course.id);
          if (isGood) {
            return [...acc, {
              courseId: course.id,
              dateBegin: course.dateBegin
            }]
          }

          return acc;
        }, []),
      };
    }) as StudentToUpdate[];

    return { rebuildArrayStudents, studentsToUpdate }
  }

  private async getCoursesInfoForEmail(courses): Promise<{
    coursesSearchLength: number,
    coursesInfoForEmail: CoursesInfoForEmailDto[],
  }> {
    const coursesSearch = await this.connection
      .getRepository(Course)
      .createQueryBuilder('course')
      .leftJoinAndSelect('course.courseLog', 'courseLog')
      .leftJoinAndSelect('courseLog.createdBy', 'creator')
      .leftJoinAndSelect('creator.userEmail', 'creatorEmails')
      .leftJoinAndSelect('creator.groups', 'groups')
      .leftJoinAndSelect('creator.organisations', 'organisations')
      .leftJoinAndSelect('creator.lmsGroups', 'lmsGroups')
      .leftJoinAndSelect(
        'course.translations',
        'translations',
        'translations.language = course.language',
      )
      .where('course.id IN (:...ids)', { ids: courses })
      .getMany();

    const coursesInfoForEmail: CoursesInfoForEmailDto[] = coursesSearch.map(item => {
      const startDate = moment()
        .add(1, 'day')
        .format(DATE_FORMATS.orderEmailDateFormat);
      const createdDate = moment(item.courseLog.createdAt).format(DATE_FORMATS.certificateDate);
      const createdBy = {
        name: `${item.courseLog.createdBy.firstName} ${item.courseLog.createdBy.lastName}`,
        emails: item.courseLog.createdBy.userEmail.map(item => item.email),
      };
      const groupsChain = item.courseLog.createdBy.groups.map(group => group.name);
      const organisationsChain = item.courseLog.createdBy.organisations.map(org => org.name);
      const lmsGroupsChain = item.courseLog.createdBy.lmsGroups.map(lmsGr => lmsGr.name);
      const creatorAffilation = [...lmsGroupsChain, ...organisationsChain, ...groupsChain].join(
        '-',
      );

      return {
        startDate,
        createdDate,
        creatorAffilation,
        creatorName: createdBy.name,
        creatorEmails: createdBy.emails,
        courseName: item.title,
      };
    });

    return {coursesInfoForEmail, coursesSearchLength: coursesSearch.length};
  }

  private async getStudentsInfoForEmail(
    lmsGroup: LmsGroup,
    rebuildArrayStudents,
    coursesSearchLength: number,
    coursesInfoForEmail: CoursesInfoForEmailDto[],
    studentsAffilations: string[],
    ) {
    const studentsInfoForEmail = rebuildArrayStudents.map(item => {
      const studentTaxonomies = item.studentTaxonomy
        ? item.studentTaxonomy.map(item => {
          return {
            key: item.taxonomy.title,
            value: item.value,
          };
        })
        : [];

      return {
        studentsAffilations,
        firstName: item.firstName,
        lastName: item.lastName,
        emails: item.emails,
        phones: item.phones,
        address: item.streetAddress,
        isPhones: Boolean(item.phones),
        isAddress: Boolean(item.streetAddress),
        isTaxonomy: Boolean(item.studentTaxonomy),
        taxonomies: studentTaxonomies,
      };
    });
    const data = {
      studentsInfoForEmail,
      subject: `New course order - ${moment().format(DATE_FORMATS.orderEmailDateFormat)}`,
      numberOfCourses: coursesSearchLength,
      coursesInformation: coursesInfoForEmail,
    };

    const emails = lmsGroup.orderEmails.split(',');

    return {data, emails};
  }

  private async checkPersonNumberExists(rebuildArrayStudents){
    return Promise.all(
      rebuildArrayStudents.map(async item => {
        if (item.personNumber && item.personNumber[0]) {
          const isExist = await this.tools.getExistingUserWithPersonNumber(item.personNumber[0]);

          if (isExist) {
            return item.personNumber[0];
          }
        }
      }),
    ).then(filter(Boolean));
  }

  private async checkEmployeeNumberExists(rebuildArrayStudents){
    return Promise.all(
      rebuildArrayStudents.map(async item => {
        if (item.employeeNumber && item.employeeNumber[0]) {
          const isExist = await this.tools.getExistingUserWithEmployeeNumber(
            item.employeeNumber[0],
          );

          if (isExist) {
            return item.employeeNumber[0];
          }
        }
      }),
    ).then(filter(Boolean));
  }

  private async checkToEmailExists(rebuildArrayStudents){
    return Promise.all(
      rebuildArrayStudents.map(async item => {
        const emailExists = await this.tools.getExistingEmails(item.email);
        if (!isEmpty(emailExists)) {
          return emailExists;
        }
      }),
    ).then(filter(Boolean))
  }

  private async addAdminData(rebuildArrayStudents, taxonomies, groups){
    return Promise.all(
      rebuildArrayStudents.map(async item => {
        const taxonomyData = taxonomies.reduce((acc, tax) => {
          if (!_.isNil(item[tax.title])) {
            return [...acc, { taxonomy: { id: tax.id }, value: item[tax.title] }];
          }

          return [...acc];
        }, []);

        const createData = {
          firstName: item.firstName,
          lastName: item.lastName,
          emails: item.email,
          phones: item.phone,
          language: item.language,
          notifyEmail: item.notifyEmail,
          notifySms: item.notifySms,
          streetAddress: '',
          studentTaxonomy: taxonomyData,
          note: item.note,
        };

        return this.getEntityToSaveUsers(createData, groups);
      }),
    );
  }

  private async saveUser(transactionalEntityManager, user, currentUser) {
    const userLog = new UserLog({
      createdBy: currentUser,
      changedBy: currentUser,
    });
    user.userLog = userLog;
    await transactionalEntityManager.save([userLog, user]);
  }

  private async studentTaxonomies(transactionalEntityManager, studentTaxonomy, user) {
    const newStudentTaxonomies = studentTaxonomy
      ? studentTaxonomy.map(item => {
        const taxonomy = new Taxonomy({ id: item.taxonomy.id });
        const newStudentTaxonomy = new StudentTaxonomy({ ...item, taxonomy, user });
        if (item.value) return newStudentTaxonomy;

        return null;
      })
      : [];

    const taxonomyEntityts = newStudentTaxonomies.filter(item => item);
    await transactionalEntityManager.save(taxonomyEntityts);
  }

  private async saveAll (adminData, currentUser: User, courses: ICourseInfo[]){
    await this.connection
      .transaction(async transactionalEntityManager => {
        for await (const { entityToSave, groups } of adminData) {
          await transactionalEntityManager.save(entityToSave);

          const user = entityToSave[0];
          const { studentTaxonomy } = user;
          await this.saveUser(transactionalEntityManager, user, currentUser);

          await this.studentTaxonomies(transactionalEntityManager, studentTaxonomy, user)

          for await (const reqCourse of courses) {
            const startAt = reqCourse.dateBegin;
            const course = await transactionalEntityManager
              .getRepository(Course)
              .createQueryBuilder('course')
              .leftJoinAndSelect('course.translations', 'translations', 'translations.language = course.language')
              .leftJoinAndSelect('course.groups', 'groups')
              .where('course.id = :id', { id: reqCourse.id })
              .getOne();

            const courseTopics = await transactionalEntityManager
              .getRepository(CourseTopic)
              .createQueryBuilder('courseTopic')
              .leftJoinAndSelect('courseTopic.topic', 'topics')
              .where('courseTopic.course = :id', { id: reqCourse.id })
              .getMany();

            const existedGroupsHash = course.groups.reduce((acc, item) => {
              return {
                ...acc,
                [item.id]: true,
              };
            }, new Map);

            const filteredGroups = groups
              .filter(item => !existedGroupsHash[String(item.id)])
              .map(item => ({
                'course_id': course.id,
                'group_id': item.id,
              }));

            if (filteredGroups.length) {
              await transactionalEntityManager
                .createQueryBuilder()
                .insert()
                .into('group_course')
                .values(filteredGroups)
                .execute();
            }

            const {
              welcomeEmailTemplate,
              welcomeLetterTemplate,
              translations,
              title,
              senderEmail,
              senderName,
            } = course;

            const courseTranslation = translations[0];
            if (courseTranslation) {
              const { welcomeLetter, welcomeEmail } = courseTranslation;
              await this.tools.sendHtmlToEmail(
                user.emails,
                welcomeLetter,
                'welcome letter',
                senderName,
                senderEmail,
              );
              await this.tools.sendHtmlToEmail(
                user.emails,
                welcomeEmail,
                'welcome email',
                senderName,
                senderEmail,
              );
            }

            const { firstName, lastName, phones, emails, password } = user;
            const dateEnd = moment(startAt)
              .add(course.time.complete, 'days')
              .toDate();

            const context = {
              password,
              studentFirstName: firstName,
              studentLastName: lastName,
              courseName: title,
              courseDescription: this.tools.getCourseDescription(courseTranslation),
              courseDateEnd: moment(dateEnd).format(DATE_FORMATS.dateEnd),
              studentEmail: emails[0],
              studentPhone: phones ? phones[0] : '',
              courseLink: '',
              adminFirstName: currentUser.firstName,
              adminLastName: currentUser.lastName,
              adminRole: currentUser.roles,
              adminEmail: currentUser.userEmail[0].email,
              contentList: courseTopics.map(item => item.topic.name),
              lengthOfCourse: course.time.complete,
            };

            await this.tools.sendCourseEmailTemplate(
              welcomeEmailTemplate,
              context,
              user.emails,
              'welcomeEmail',
              senderName,
              senderEmail,
            );
            await this.tools.sendCourseEmailTemplate(
              welcomeLetterTemplate,
              context,
              user.emails,
              'welcomeLetter',
              senderName,
              senderEmail,
            );

            const studyPlan = new CourseStudentStudyPlan({ wishedDoneDate: dateEnd });

            await transactionalEntityManager
              .getRepository(CourseStudent)
              .createQueryBuilder()
              .insert()
              .into(CourseStudent)
              .values({
                course,
                studyPlan,
                startAt,
                user,
              })
              .execute();
          }
        }
      })
      .catch(e => {
        throw new BadRequestException({ error: 'Error saving students' });
      });
  }

  public async importStudents(
    file,
    loginUser,
    importData: ImportStudentDto,
  ): Promise<AddStudentDto> {
    try {
      this.tools.checkFileValid(
        file,
        ALLOWED_MIME_TYPES_STUDENT_IMPORT,
        ALLOWED_MAX_SIZE_STUDENT_IMPORT,
      );

      const { headers, groups, courses } = importData;

      const lmsGroup = await this.getLmsGroupId(groups);

      const importStudent = await this.generateValidSchemaWithTaxonomy(lmsGroup.id);

      const currentUser = await this.userService.getOneById(loginUser.id);

      await this.tools.checkAdminAccess(currentUser, {
        groupsIds: groups,
      });

      const jsonArrayStudents = await csvToJson(file, headers)

      if (isEmpty(jsonArrayStudents)) {
        throw new BadRequestException('File is empty');
      }

      const arrayStudents = this.rebuildDataForImportStudents(jsonArrayStudents);

      const errorsList = this.tools.checkImportStudentDataInvalid(arrayStudents);
      if (!isNil(errorsList)) {
        throw new BadRequestException({ error: 'File validation error', errors: errorsList });
      }

      const { rebuildArrayStudents, studentsToUpdate } = await this.getExistedStudents(arrayStudents, courses);

      const importStudentDataInvalid =
        rebuildArrayStudents.length && !isNil(importStudent.validate(rebuildArrayStudents).error)
          ? importStudent.validate(rebuildArrayStudents).error
          : [];

      if (!isEmpty(importStudentDataInvalid)) {
        throw new BadRequestException({ error: `${importStudentDataInvalid}` });
      }

      const {coursesSearchLength, coursesInfoForEmail} = await this.getCoursesInfoForEmail(courses);

      const groupsEntity = await this.entityManager.findByIds(Group, groups, {
        join: {
          alias: 'group',
          leftJoinAndSelect: {
            organisation: 'group.organisation',
            lmsGroup: 'organisation.lmsGroup',
          },
        },
      });

      const studentsAffilations = groupsEntity.map(
        item => `${item.name} - ${item.organisation.name} - ${item.organisation.lmsGroup.name}`,
      );

      const personNumberExists = await this.checkPersonNumberExists(rebuildArrayStudents);
      if (!isEmpty(personNumberExists)) {
        throw new BadRequestException({
          error: `A student with ${personNumberExists} person number already exist`,
        });
      }

      const employeeNumberExists = await this.checkEmployeeNumberExists(rebuildArrayStudents);
      if (!isEmpty(employeeNumberExists)) {
        throw new BadRequestException({
          error: `A student with ${employeeNumberExists} employee number already exist`,
        });
      }

      const emailExists = await this.checkToEmailExists(rebuildArrayStudents);
      if (!isEmpty(emailExists)) {
        throw new BadRequestException({
          error: `A student with ${emailExists} email already exist`,
        });
      }

      const taxonomies = await this.connection
        .getRepository(Taxonomy)
        .createQueryBuilder('taxonomy')
        .where('taxonomy.lms_group_id = :id', { id: lmsGroup.id })
        .getMany();

      const adminData: any[] = await this.addAdminData(rebuildArrayStudents, taxonomies, groups);

      await this.saveAll(adminData, currentUser, courses);

      if (lmsGroup && lmsGroup.orderEmails) {
        const {emails, data} = await this.
          getStudentsInfoForEmail(lmsGroup, rebuildArrayStudents, coursesSearchLength, coursesInfoForEmail, studentsAffilations);

        await this.tools.sendOrderEmails(emails, data).catch(e => Logger.error(e));
      }

      await Promise.all(
        adminData.map(async ({ sendEmailData: { originalPassword, emailsToSendMassage } }) => {
          await this.tools.sendEmailConfirmation(emailsToSendMassage, originalPassword).catch(e => {
            console.error(e);
          });
        }),
      );

      return {
        studentsToUpdate,
      };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  public async getEntityToSaveUsers(createData: StudentDto, groups: number[]) {
    try {
      const { emails, phones } = createData;

      const groupsEntity = await this.entityManager.findByIds(Group, groups);

      if (isNil(groupsEntity)) {
        throw new BadRequestException({ error: 'Groups not found' });
      }

      const password = this.tools.generatePassword();
      const encryptedPassword = this.authService.encryptPassword(password);
      const userData = omit(['email', 'phone', 'groups'], createData);
      const user = new User({
        ...userData,
        password: encryptedPassword,
        roles: [UserRole.USER],
        groups: [...groupsEntity],
      } as any);
      const userEmails = emails.map(item => {
        return new UserEmail({ user, email: item, welcomeEmailSent: moment().toDate() });
      });

      const userPhones = phones ? phones.map(item => new UserPhone({ user, phone: item })) : [];

      return {
        entityToSave: [user, ...userEmails, ...userPhones],
        sendEmailData: {
          originalPassword: password,
          emailsToSendMassage: emails,
        },
        groups: groupsEntity,
      };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  public rebuildDataForImportStudents(data: any[]) {
    return this.tools.rebuildDataForImportAdmin(data);
  }

  public async createNoteStudent(
    studentId: number,
    text: string,
    admin: User,
  ): Promise<HttpStatus> {
    try {
      const foundStudent = await this.entityManager.findOne(User, studentId, {
        join: {
          alias: 'user',
          leftJoinAndSelect: {
            groups: 'user.groups',
          },
        },
      });

      if (!foundStudent || !foundStudent.roles.includes(UserRole.USER)) {
        throw new HttpException({ error: 'Student not found' }, HttpStatus.BAD_REQUEST);
      }

      await this.tools.checkAdminAccess(admin, {
        groupsIds: foundStudent.groups.map(item => item.id),
      });

      const noteUser = new NotesUsers();
      noteUser.text = text;

      await this.connection
        .transaction(async transactionalEntityManager => {
          await transactionalEntityManager.save(noteUser);
        })
        .catch(() => {
          throw new HttpException({ error: 'Error adding note' }, HttpStatus.BAD_REQUEST);
        });

      return HttpStatus.ACCEPTED;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  public async getNoteStudent(studentId: number, admin: User): Promise<NotesUsers> {
    try {
      const foundStudent = await this.entityManager.findOne(User, studentId, {
        join: {
          alias: 'user',
          leftJoinAndSelect: {
            groups: 'user.groups',
          },
        },
      });

      if (!foundStudent || !foundStudent.roles.includes(UserRole.USER)) {
        throw new HttpException({ error: 'Student not found' }, HttpStatus.BAD_REQUEST);
      }

      await this.tools.checkAdminAccess(admin, {
        groupsIds: foundStudent.groups.map(item => item.id),
      });

      const note = await this.connection
        .getRepository(User)
        .createQueryBuilder('user')
        .leftJoin('user.noteUser', 'noteUser')
        .select('noteUser.text as note')
        .where('user.id = :studentId', { studentId })
        .getRawOne()
        .catch(() => {
          throw new HttpException({ error: 'Error getting note' }, HttpStatus.BAD_REQUEST);
        });

      if (isNil(note)) {
        throw new HttpException({ error: 'Student not found' }, HttpStatus.BAD_REQUEST);
      }

      return note;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  public async deleteStudentFromCourse(
    userId: number,
    courseId: number,
    admin: User,
  ): Promise<number> {
    try {
      const foundStudent = await this.entityManager.findOne(User, userId, {
        join: {
          alias: 'user',
          leftJoinAndSelect: {
            groups: 'user.groups',
          },
        },
      });

      if (!foundStudent || !foundStudent.roles.includes(UserRole.USER)) {
        throw new HttpException({ error: 'Student not found' }, HttpStatus.BAD_REQUEST);
      }

      await this.tools.checkAdminAccess(admin, {
        groupsIds: foundStudent.groups.map(item => item.id),
      });

      await this.connection
        .createQueryBuilder()
        .delete()
        .from(CourseStudent)
        .where(`user = :userId`, { userId })
        .andWhere(`course = :courseId`, { courseId })
        .execute();

      return courseId;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  public async markUserToDelete(id: number, admin: User): Promise<HttpStatus> {
    const foundStudent = await this.entityManager.findOne(User, id, {
      join: {
        alias: 'user',
        leftJoinAndSelect: {
          groups: 'user.groups',
        },
      },
    });

    if (!foundStudent || !foundStudent.roles.includes(UserRole.USER)) {
      throw new HttpException({ error: 'Student not found' }, HttpStatus.BAD_REQUEST);
    }

    await this.tools.checkAdminAccess(admin, {
      groupsIds: foundStudent.groups.map(item => item.id),
    });

    await this.connection
      .getRepository(User)
      .createQueryBuilder('user')
      .update()
      .set({
        isClose: true,
        closedAt: moment()
          .add(DAYS_TO_CLOSE, 'days')
          .toDate(),
      })
      .where({ id })
      .andWhere('user.roles = :roles', { roles: UserRole.USER })
      .andWhere('user.is_close = false')
      .execute()
      .catch(error => {
        throw new BadRequestException(error.message);
      });

    return HttpStatus.OK;
  }
  async getStudentCourse(studentId: number, courseId: number, admin): Promise<CourseStudent> {
    const foundStudent = await this.entityManager.findOne(
      User,
      {
        id: studentId,
        roles: [UserRole.USER],
      },
      {
        join: {
          alias: 'user',
          leftJoinAndSelect: {
            groups: 'user.groups',
          },
        },
      },
    );

    if (!foundStudent) {
      throw new BadRequestException({ message: "A student isn't found" });
    }

    await this.tools.checkAdminAccess(admin, {
      groupsIds: foundStudent.groups.map(item => item.id),
    });

    return this.connection
      .getRepository(CourseStudent)
      .createQueryBuilder('courseStudent')
      .leftJoinAndSelect('courseStudent.course', 'course')
      .leftJoinAndSelect('course.translations', 'translations')
      .leftJoinAndSelect('course.courseTopics', 'courseTopics')
      .leftJoinAndSelect('courseTopics.topic', 'topic')
      .leftJoinAndSelect('topic.exams', 'exams', 'exams.lesson IS NULL')
      .leftJoinAndSelect('exams.studentLogs', 'examLogs', 'examLogs.student_id = :studentId', {
        studentId,
      })
      .leftJoinAndSelect('topic.assignments', 'assignments')
      .leftJoinAndSelect(
        'assignments.studentLogs',
        'assignmentLogs',
        'assignmentLogs.student_id = :studentId',
        { studentId },
      )
      .leftJoinAndSelect('topic.lessons', 'lessons')
      .leftJoinAndSelect('lessons.exams', 'lessonsExams')
      .leftJoinAndSelect(
        'lessonsExams.studentLogs',
        'lessonExamLogs',
        'lessonExamLogs.student_id = :studentId',
        {
          studentId,
        },
      )
      .leftJoinAndSelect(
        'lessons.studentLogs',
        'lessonLogs',
        'lessonLogs.student_id = :studentId',
        { studentId },
      )
      .where('courseStudent.user = :studentId', { studentId })
      .andWhere('courseStudent.course = :courseId', { courseId })
      .orderBy(
        'courseTopics.order, lessons.order, lessonsExams.order, assignments.order, exams.order',
      )
      .getOne()
      .catch(() => {
        throw new BadRequestException({ error: 'Get course error' });
      });
  }

  public async downloadExampleFile(res: Response, query: GetExampleFileDto): Promise<void> {
    try {
      const { groupId } = query;

      const group = await this.connection
        .getRepository(Group)
        .createQueryBuilder('groups')
        .innerJoinAndSelect('groups.organisation', 'organisation')
        .innerJoinAndSelect('organisation.lmsGroup', 'lmsGroup')
        .where('groups.id = :id', { id: groupId })
        .getOne();

      const { lmsGroup } = group.organisation;
      const { id: lmsGroupId } = lmsGroup;

      const taxonomies = await this.connection
        .getRepository(Taxonomy)
        .createQueryBuilder('taxonomy')
        .where('taxonomy.lmsGroup.id = :id', { id: lmsGroupId })
        .getMany();

      const taxonomyForCSV = taxonomies.reduce((acc, item) => {
        return { ...acc, [` ${item.title}`]: item.format };
      }, {});

      const csvFields = EXAMPLE_FILE_DATA.map(item => {
        return { ...item, ...taxonomyForCSV };
      });

      const fileUUID = uuid();
      const fileName = `import_students_template_${fileUUID}.csv`;

      (async () => {
        const { path, cleanup } = await file({ name: fileName });
        fast_csv
          .writeToPath(path, csvFields, {
            headers: true,
            quoteColumns: true,
            quoteHeaders: true,
          })
          .on('finish', () => {
            res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');
            res.download(path, e => {
              if (e) {
                Logger.error(e);
                res.status(500).send(e);
              }
              cleanup();
            });
          });
      })();
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async checkRequiredTaxonomyFields(
    lmsGroupId: number,
    studentTaxonomy: AddStudentTaxonomyDto[] = [],
  ): Promise<Taxonomy[]> {
    const invalidFields = await this.connection.transaction(async transactionalEntityManager => {
      try {
        const taxonomiesByLms = await transactionalEntityManager
          .getRepository(Taxonomy)
          .createQueryBuilder('taxonomy')
          .where('taxonomy.lmsGroup.id = :id', { id: lmsGroupId })
          .getMany();

        const requiredTaxonomies = taxonomiesByLms.filter(item => item.mandatory);

        const requiredErrors = requiredTaxonomies.reduce((acc: Taxonomy[], item: Taxonomy) => {
          const checkReq =
            !studentTaxonomy.find(studTax => Number(studTax.taxonomy.id) === item.id) ||
            studentTaxonomy.find(
              studTax => Number(studTax.taxonomy.id) === item.id && !studTax.value,
            );
          if (checkReq) return [...acc, item];

          return acc;
        }, []);

        return requiredErrors;
      } catch (err) {
        Logger.error(err);
      }
    });

    return invalidFields;
  }

  async generateValidSchemaWithTaxonomy(lmsGroupId: number): Promise<joi.ArraySchema> {
    try {
      const taxonomies = await this.entityManager.find(Taxonomy, {
        where: {
          lmsGroup: {
            id: lmsGroupId,
          },
        },
        relations: ['lmsGroup'],
      });

      const taxonomyFields = taxonomies.reduce((acc, item) => {
        if (item.mandatory) {
          return {
            ...acc,
            [item.title]: joi
              .string()
              .lowercase()
              .required(),
          };
        }

        return {
          ...acc,
          [item.title]: joi
            .string()
            .lowercase()
            .allow(''),
        };
      }, {});

      const importStudent = joi
        .array()
        .items(
          joi
            .object()
            .keys({
              firstName: joi.string().required(),
              lastName: joi.string().required(),
              email: joi
                .array()
                .items(joi.string().email())
                .min(1)
                .max(MAX_EMAIL_COUNT)
                .unique()
                .required(),
              phone: joi
                .array()
                .items(joi.string())
                .max(MAX_PHONE_COUNT)
                .unique(),
              language: joi
                .number()
                .min(1)
                .integer()
                .required(),
              notifyEmail: joi.boolean(),
              notifySms: joi.boolean(),
              note: joi.string().allow(''),
            })
            .concat(joi.object().keys(taxonomyFields)),
        )
        .min(1)
        .unique()
        .required();

      return importStudent;
    } catch (err) {
      Logger.error(err);
    }
  }

  public async addExistingStudentsToCourses(body: AddStudentDto): Promise<HttpStatus> {
    const { studentsToUpdate } = body;

    await this.connection.transaction(async transactionalEntityManager => {
      await Promise.all(
        studentsToUpdate.map(async user => {
          const { courses: newCourses } = user;
          await this.addStudentToCourse(transactionalEntityManager, newCourses, user);
        }),
      );
    });

    return HttpStatus.OK;
  }

  private async addStudentToCourse(
    transactionalEntityManager: EntityManager,
    newCourses: AddCoursesForStudents[],
    user,
  ) {
    const student = await this.connection
      .getRepository(User)
      .createQueryBuilder('student')
      .leftJoinAndSelect('student.userEmail', 'emails')
      .where('emails.email = :email', { email: user.email })
      .getOne();

    if (!newCourses) {
      return [];
    }
    await Promise.all(
      newCourses.map(async dataCourse => {
        const startAt = dataCourse.dateBegin || moment().toDate();
        const course = await transactionalEntityManager
          .getRepository(Course)
          .createQueryBuilder('course')
          .leftJoinAndSelect(
            'course.translations',
            'translations',
            'translations.language = course.language',
          )
          .where('course.id = :id', { id: dataCourse.courseId })
          .getOne();

        // const newCourse = new Course({
        //   ..._.omit(course, ['courseId', 'dateBegin']),
        //   groups: [...groupsEntity],
        // });

        CourseStudent.create(student, course, dataCourse.dateBegin);


        const { translations, senderName, senderEmail } = course;

        const courseTranslation = translations[0];
        const emails = student.userEmail.map(item => item.email);
        if (courseTranslation) {
          const { welcomeLetter, welcomeEmail } = courseTranslation;
          await this.tools.sendHtmlToEmail(
            emails,
            welcomeLetter,
            'welcome letter',
            senderName,
            senderEmail,
          );
          await this.tools.sendHtmlToEmail(
            emails,
            welcomeEmail,
            'welcome email',
            senderName,
            senderEmail,
          );
        }

        const dateEnd = moment(startAt)
          .add(course.time.complete, 'days')
          .toDate();

        const studyPlan = new CourseStudentStudyPlan({ wishedDoneDate: dateEnd });

        await transactionalEntityManager
          .getRepository(CourseStudent)
          .createQueryBuilder()
          .insert()
          .into(CourseStudent)
          .values({
            course,
            studyPlan,
            startAt,
            user: student,
          })
          .execute();
      }),
    );
  }
}
