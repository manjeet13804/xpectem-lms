import { Injectable, BadRequestException, Logger, HttpStatus } from '@nestjs/common';
import { EntityManager, Connection } from 'typeorm';
import { Group } from '../../../entity/Group';
import { RegistrationLinkDto } from './dto/registrationLinkDto';
import { Course } from '../../../entity/Course';
import { RegistrationLink } from '../../../entity/RegistrationLink';
import { v4 as uuidv4 } from 'uuid';
import { StudentDto } from '../student/dto/studentDto';
import { LmsGroup } from '../../../entity/LmsGroup';
import * as _ from 'lodash';
import * as moment from 'moment';
import { DATE_FORMATS } from '../../../common/enums/dateFormats';
import { Taxonomy } from '../../../entity/Taxonomy';
import { User, UserRole } from '../../../entity/User';
import { Tools } from '../../../common/tools/tools';
import { AuthService } from '../../../modules/auth/auth.service';
import { isEmpty } from '@nestjs/common/utils/shared.utils';
import { omit } from 'ramda';
import { UserEmail } from '../../../entity/UserEmail';
import { UserPhone } from '../../../entity/UserPhone';
import { StudentTaxonomy } from '../../../entity/StudentTaxonomy';
import { CourseTopic } from '../../../modules/course/course-topic.entity';
import { CourseStudentStudyPlan } from '../../../modules/course/course-student-study-plan.embedded';
import { CourseStudent } from '../../../modules/course/course-student.entity';
import { NotificationTriggerType } from '../../admin-notification/entity/notification-triggers.entity';
import { StudentService } from '../student/student.service';
import { AdminNotificationTriggersService } from '../../../modules/admin-notification/admin-notification-triggers.service';
import { RegistrationLinkMakeActiveDto } from './dto/registrationLinkMakeActiveDto';
import { LmsGroupLogoImageUrl } from './dto/lmsGroupLogoDto';
import { RegistrationLinkForStudentDto } from './dto/registrationLinkForStudentDto';
import { UserLog } from '../../../entity/UserLog';
import * as config from 'config';

const DB_DUPLICATE_ERROR = 'ER_DUP_ENTRY';

const {
    adminXpectrumId
  } = config.get('userIds');

@Injectable()
export class RegistrationLinksService {
    constructor(
        private readonly entityManager: EntityManager,
        private readonly connection: Connection,
        private readonly tools: Tools,
        private readonly studentService: StudentService,
        private readonly notificationTriggersService: AdminNotificationTriggersService,
        private readonly authService: AuthService,
    ) {}

    public async getAll(): Promise<RegistrationLink[]> {
        const registrationLinks = await this.connection
            .getRepository(RegistrationLink)
            .createQueryBuilder('registration_links')
            .leftJoinAndSelect('registration_links.courses', 'course')
            .leftJoinAndSelect('registration_links.groups', 'groups')
            .getMany();

        return registrationLinks;
    }

    public async create(registrationLinkData: RegistrationLinkDto): Promise<RegistrationLink> {
        const { groups, courses, active } = registrationLinkData;

        const groupsEntities = await this.entityManager.findByIds(Group, groups);

        const courseEntities = await this.entityManager.findByIds(Course, courses);

        const registrationLink = new RegistrationLink({
            active,
            groups: [...groupsEntities],
            courses: [...courseEntities],
            uid: uuidv4(),
        });

        await this.entityManager.save(registrationLink);

        return registrationLink;
    }

    public async getCurrentRegLink(uid: string): Promise<RegistrationLinkForStudentDto> {
        const registrationLinks = await this.connection
            .getRepository(RegistrationLink)
            .createQueryBuilder('registration_links')
            .leftJoinAndSelect('registration_links.courses', 'course')
            .leftJoinAndSelect('registration_links.groups', 'groups')
            .where('registration_links.uid = :uid', { uid })
            .getOne();

        const taxonomies = await this.getTaxonomiesByRegistrationLink(registrationLinks);

        if (taxonomies.length) {
            return {
                registrationLinks,
                taxonomies,
            };
        }

        return {
            registrationLinks,
        };
    }

    public async getLmsGroupLogoByGroupId(groupId: number): Promise<LmsGroupLogoImageUrl> {
        const group = await this.connection
            .getRepository(Group)
            .createQueryBuilder('groups')
            .innerJoinAndSelect('groups.organisation', 'organisation')
            .innerJoinAndSelect('organisation.lmsGroup', 'lmsGroup')
            .where('groups.id = :id', { id: groupId })
            .getOne();

        if (!group) {
            throw new BadRequestException({ error: `Group not found.` });
        }

        const {
            organisation: { lmsGroup },
        } = group;

        if (!lmsGroup) {
            throw new BadRequestException({ error: `LMS group not found.` });
        }

        return {
            logoImageUrl: lmsGroup.logoImageUri,
        };
    }

    public async registerStudent(uid: string, studentData: StudentDto): Promise<StudentDto> {
        try {
            const regLinks = await this.connection
                .getRepository(RegistrationLink)
                .createQueryBuilder('registration_links')
                .leftJoinAndSelect('registration_links.courses', 'course')
                .leftJoinAndSelect('course.courseLog', 'courseLog')
                .leftJoinAndSelect('courseLog.createdBy', 'creator')
                .leftJoinAndSelect('creator.groups', 'groups')
                .leftJoinAndSelect('creator.organisations', 'organisations')
                .leftJoinAndSelect('creator.lmsGroups', 'lmsGroups')
                .leftJoinAndSelect('creator.userEmail', 'creatorEmails')
                .leftJoinAndSelect(
                    'course.translations',
                    'translations',
                    'translations.language = course.language',
                )
                .leftJoinAndSelect('registration_links.groups', 'group')
                .leftJoinAndSelect('group.organisation', 'organisation')
                .leftJoinAndSelect('organisation.lmsGroup', 'lmsGroup')
                .where('registration_links.uid = :uid', { uid })
                .getOne();

            if (!regLinks.active) {
                throw new BadRequestException({
                    error: 'Link is not active',
                });
            }
            
            const { courses, groups } = regLinks;

            const lmsGroup = _.get(groups, '0.organisation.lmsGroup', new LmsGroup({}));

            const coursesInfoForEmail = courses.map(item => {
                const startDate = moment().toDate();
                const createdDate = moment(item.courseLog?.createdAt).format(
                    DATE_FORMATS.certificateDate,
                );
                const createdBy = {
                    name: `${item.courseLog?.createdBy.firstName} ${item.courseLog?.createdBy.lastName}`,
                    emails: item.courseLog?.createdBy.userEmail.map(item => item.email),
                };
                const groupsChain = item.courseLog?.createdBy.groups.map(group => group.name);
                const organisationsChain = item.courseLog?.createdBy.organisations.map(
                    org => org.name,
                );
                const lmsGroupsChain = item.courseLog?.createdBy.lmsGroups.map(lmsGr => lmsGr.name);
                const creatorAffilation = [
                    ...lmsGroupsChain,
                    ...organisationsChain,
                    ...groupsChain,
                ].join('-');

                return {
                    startDate,
                    createdDate,
                    creatorAffilation,
                    creatorName: createdBy.name,
                    creatorEmails: createdBy.emails,
                    courseName: item.title,
                };
            });
            const studentsAffilations = groups.map(
                item =>
                    `${item.name} - ${item.organisation.name} - ${item.organisation.lmsGroup.name}`,
            );

            const { studentTaxonomy } = studentData;
            const taxonomiesIds = studentTaxonomy
                ? studentTaxonomy.map(item => item.taxonomy.id)
                : [];
            const taxonomies = await this.connection.manager.findByIds(Taxonomy, taxonomiesIds);
            const taxonomiesIdToTitleHash = taxonomies.reduce((acc, item) => {
                return {
                    ...acc,
                    [item.id]: item.title,
                };
            }, {});

            const studentTaxonomies = studentData.studentTaxonomy
                ? studentData.studentTaxonomy.map(item => {
                      return {
                          key: taxonomiesIdToTitleHash[item.taxonomy.id],
                          value: item.value,
                      };
                  })
                : [];

            const studentInfoForEmail = {
                studentsAffilations,
                firstName: studentData.firstName,
                lastName: studentData.lastName,
                emails: studentData.emails,
                phones: studentData.phones,
                address: studentData.streetAddress,
                isPhones: Boolean(studentData.phones),
                isAddress: Boolean(studentData.streetAddress),
                isTaxonomy: Boolean(studentData.studentTaxonomy),
                taxonomies: studentTaxonomies,
            };

            const studentsEmails = studentData.emails;

            await this.connection
                .transaction(async transactionalEntityManager => {
                    const { studentTaxonomy } = studentData;
                    const groupId = groups[0].id;

                    const group = await this.connection
                        .getRepository(Group)
                        .createQueryBuilder('groups')
                        .innerJoinAndSelect('groups.organisation', 'organisation')
                        .innerJoinAndSelect('organisation.lmsGroup', 'lmsGroup')
                        .where('groups.id = :id', { id: groupId })
                        .getOne();

                    const { lmsGroup } = group.organisation;
                    const { id: lmsGroupId } = lmsGroup;

                    const invalidFields = await this.studentService.checkRequiredTaxonomyFields(
                        lmsGroupId,
                        studentTaxonomy,
                    );

                    if (invalidFields.length > 0) {
                        throw new BadRequestException({
                            error: `${invalidFields[0].title} field is required`,
                        });
                    }

                    const existingEmails = await this.tools.getExistingEmails(studentData.emails);

                    if (!isEmpty(existingEmails)) {
                        throw new BadRequestException({
                            error: `A student with "${existingEmails[0]}" email already exist`,
                        });
                    }

                    const password = this.tools.generatePassword();
                    const encryptedPassword = this.authService.encryptPassword(password);
                    // TODO: fix types
                    const userData = omit(['email', 'phone', 'groups'], studentData);
                    const user = new User({
                        ...userData,
                        groups: [...groups],
                        password: encryptedPassword,
                        roles: [UserRole.USER],
                        streetAddress: userData.streetAddress,
                    } as any);

                    const userEmails = studentData.emails.map(email => {
                        return new UserEmail({
                            user,
                            email,
                            welcomeEmailSent: moment().toDate(),
                        });
                    });
                    const userPhones = studentData.phones
                        ? studentData.phones.map(
                              item =>
                                  new UserPhone({
                                      user,
                                      phone: item,
                                  }),
                          )
                        : [];

                    const xpectrumAdmin = await this.connection
                        .getRepository(User)
                        .createQueryBuilder('user')
                        .where('user.id = :id', { id: adminXpectrumId })
                        .getOne();

                    const userLog = new UserLog({ createdBy: xpectrumAdmin });
                    user.userLog = userLog;
                    await transactionalEntityManager.save(userLog);
                    await transactionalEntityManager.save([user, ...userEmails, ...userPhones, userLog]);

                    const createdUser = await transactionalEntityManager.save(user);

                    Promise.all(
                        groups.map(async item => {
                            const newGroup = new Group({
                                ...item,
                                courses: courses.map(
                                    course =>
                                        new Course({
                                            ..._.omit(course, ['courseId', 'dateBegin']),
                                        }),
                                ),
                            });
                            await transactionalEntityManager.save(newGroup);
                        }),
                    );

                    const newStudentTaxonomies =
                        studentData.studentTaxonomy &&
                        studentData.studentTaxonomy.map(item => {
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
                        const startAt = moment().toDate();
                        const course = await transactionalEntityManager
                            .getRepository(Course)
                            .createQueryBuilder('course')
                            .leftJoinAndSelect(
                                'course.translations',
                                'translations',
                                'translations.language = course.language',
                            )
                            .where('course.id = :id', { id: dataCourse.id })
                            .getOne();

                        const courseTopics = await transactionalEntityManager
                            .getRepository(CourseTopic)
                            .createQueryBuilder('courseTopic')
                            .leftJoinAndSelect('courseTopic.topic', 'topics')
                            .where('courseTopic.course = :id', { id: dataCourse.id })
                            .getMany();

                        const newCourse = new Course({
                            ..._.omit(course, ['courseId', 'dateBegin']),
                            groups: [...groups],
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
                                studentData.emails,
                                welcomeLetter,
                                'welcome letter',
                                senderName,
                                senderEmail,
                            );
                            await this.tools.sendHtmlToEmail(
                                studentData.emails,
                                welcomeEmail,
                                'welcome email',
                                senderName,
                                senderEmail,
                            );
                        }

                        const { firstName, lastName, phones, emails } = studentData;
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
                            // studentAddress непонятно, нигде нет формы добавления адреса студента
                            // systemRequirements нигде нету
                            contentList: courseTopics.map(item => item.topic.name),
                            lengthOfCourse: course.time.complete,
                        };

                        await this.tools.sendCourseEmailTemplate(
                            welcomeEmailTemplate,
                            context,
                            studentData.emails,
                            'welcomeEmail',
                            senderName,
                            senderEmail,
                        );
                        await this.tools.sendCourseEmailTemplate(
                            welcomeLetterTemplate,
                            context,
                            studentData.emails,
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

                    await this.notificationTriggersService.checkEvent({
                        student: createdUser,
                        user: new User({ id: 1 }),
                        event: NotificationTriggerType.ASSIGNMENT_NEW_COURSE,
                    });

                    await this.tools
                        .sendEmailConfirmation(studentData.emails, password, false)
                        .catch(e => {
                            Logger.error(e);
                        });
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
                    studentInfoForEmail,
                    subject: `New course order - ${moment().format(
                        DATE_FORMATS.orderEmailDateFormat,
                    )}`,
                    numberOfCourses: courses.length,
                    coursesInformation: coursesInfoForEmail,
                };

                const emails = lmsGroup.orderEmails.split(',');
                await this.tools.sendOrderEmails(emails, data).catch(e => Logger.error(e));
            }

            return studentData;
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }

    public async makeActive(
        id: number,
        linkData: RegistrationLinkMakeActiveDto,
    ): Promise<HttpStatus> {
        try {
            await this.connection
                .getRepository(RegistrationLink)
                .createQueryBuilder('registration_link')
                .leftJoinAndSelect('registration_link.courses', 'course')
                .leftJoinAndSelect('registration_link.groups', 'groups')
                .update(RegistrationLink)
                .where('registration_link.id = :id', { id })
                .set({ active: linkData.active })
                .execute();

            return HttpStatus.OK;
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }

    public async delete(id: number): Promise<HttpStatus> {
        try {
            await this.connection
                .createQueryBuilder()
                .delete()
                .from(RegistrationLink)
                .where(`id = :id`, { id })
                .execute();

            return HttpStatus.OK;
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }

    public async getTaxonomiesByRegistrationLink(registrationLinks: RegistrationLink): Promise<Taxonomy[]> {
        const {
            groups: [group],
        } = registrationLinks;

        if (group.id) {
            const currentGroup = await this.connection
                .getRepository(Group)
                .createQueryBuilder('groups')
                .innerJoinAndSelect('groups.organisation', 'organisation')
                .innerJoinAndSelect('organisation.lmsGroup', 'lmsGroup')
                .where('groups.id = :id', { id: group.id })
                .getOne();

            const {
                organisation: { lmsGroup },
            } = currentGroup;

            const taxonomies = await this.connection
                .getRepository(Taxonomy)
                .createQueryBuilder('taxonomy')
                .leftJoin('taxonomy.lmsGroup', 'lmsGroup')
                .where('lmsGroup.id = :id', { id: lmsGroup.id })
                .getMany();

            return taxonomies;
        }
    }
}
