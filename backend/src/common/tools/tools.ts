import { MailerService } from '@nest-modules/mailer';
import {
  BadRequestException,
  ForbiddenException,
  HttpService,
  Injectable,
  Logger
} from '@nestjs/common';
import * as config from 'config';
import { convertFromRaw, EditorState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import * as fs from 'fs';
import * as Joi from 'joi';
import {
  complement,
  filter,
  isEmpty,
  map,
  toLower,
} from 'ramda';
import * as RandExp from 'randexp';
import { Connection } from 'typeorm';
import { Course } from '../../entity/Course';
import { CourseLog } from '../../entity/CourseLog';
import { CourseTranslation } from '../../entity/CourseTranslation';
import { Group } from '../../entity/Group';
import { Organisation } from '../../entity/Organisation';
import { User, UserRole } from '../../entity/User';
import { CreateCourseDto } from '../../modules/admin-course/dto/admin.course.dto';
import { importOrganisationAdmin } from '../../modules/user/admin/joi/joi.validation';
import { importStudent } from '../../modules/user/student/joi/joi.validation';
import { REGEXP } from '../regexp/regexp';
import { LANGUAGE_IDS } from '../enums/constants';
import { IImportUser } from '../interfaces/globalInterfaces';

interface IAdminAccessOptions {
  groupsIds?: number[],
  organisationIds?: number[],
  lmsIds?: number[],
}

const PERMISSION_ALLOW_ACCESS_IDS = [2, 3];

@Injectable()
export class Tools {
  public isNotEmpty = complement(isEmpty);

  constructor(
    public readonly connection: Connection,
    public readonly mailerService: MailerService,
    private readonly httpService: HttpService,
  ) {}

  private readonly KEY_NAMES_TO_SEPARATE = ['email', 'phone'];
  private readonly BOOL_KEYS = ['notifyEmail', 'notifySms'];
  private checkDataInvalid(error: Joi.ValidationResult<any[]>) {
    if (error?.error) {

      const formattedErrors = error.error.details.map(item => {
        return {
          row: item.path[0],
          field: item.path[1],
        }
      })

      const errorsList = formattedErrors.map(item => {
        return `Error in row ${item.row + 1} - ${item.field} is not valid`
      })

      return errorsList;
    }

    return null
  }
  private getPermissionsIdsAccess(isEdit): number[] {
    if (isEdit) {
      return [3];
    }

    return PERMISSION_ALLOW_ACCESS_IDS;
  }

  private async getCoursesByPermissions(user: User, isEdit?: boolean): Promise<{
    courseId: number
  }[]> {
    const {
      roles,
      lmsGroups,
      organisations,
      groups
    } = user;

    const permissionIds = this.getPermissionsIdsAccess(isEdit);
    if (roles.includes(UserRole.ADMIN_LMS)) {
      const lmsIds = lmsGroups.map(item => item.id);

      const allowedCourses = await this.connection
        .createQueryBuilder()
        .select('course_id', 'courseId')
        .from('lms_group_course_permissions', 'lgcp')
        .where('lms_group_id IN (:...lmsIds)', { lmsIds })
        .andWhere('permission_id IN (:...permissionIds)', { permissionIds })
        .getRawMany();

      return allowedCourses;
    }

    if (roles.includes(UserRole.ADMIN_ORGANISATION)) {
      const organisationIds = organisations.map(item => item.id);

      const allowedCourses = await this.connection
        .createQueryBuilder()
        .select('course_id', 'courseId')
        .from('organisation_course_permissions', 'orcp')
        .where('organisation_id IN (:...organisationIds)', { organisationIds })
        .andWhere('permission_id IN (:...permissionIds)', { permissionIds })
        .getRawMany();

      return allowedCourses;
    }

    if (roles.includes(UserRole.ADMIN_GROUP)) {
      const groupsIds = groups.map(item => item.id);

      const allowedCourses = await this.connection
        .createQueryBuilder()
        .select('course_id', 'courseId')
        .from('group_course_permissions', 'grcp')
        .where('group_id IN (:...groupsIds)', { groupsIds })
        .andWhere('permission_id IN (:...permissionIds)', { permissionIds })
        .getRawMany();

      return allowedCourses;
    }

    return [];
  }
  public async getFilteredCoursesByPermission(user: User, courses: Course[], isEdit?: boolean): Promise<Course[]> {
    const { roles } = user;

    if (roles.includes(UserRole.XPECTUM_ADMIN)) {
      return courses;
    }

    const allowedCourses = await this.getCoursesByPermissions(user, isEdit);

    const allowCoursesHashTable = allowedCourses.reduce((acc, item) => {
      return {
        ...acc,
        [item.courseId]: true,
      };
    }, {})

    const rebuildCourses = courses.reduce((acc, item) => {
      const isAllowed = allowCoursesHashTable[item.id];
      if (isAllowed) {
        return [...acc, item]
      }

      return acc;
    }, [])

    return rebuildCourses;

    return [];
  }

  public getCourseCreatorsByGroups(user: User, creators: User[]): User[] {
    const { roles, groups } = user;
    const allowedGroups = groups.map(item => item.id);

    if (!roles.includes(UserRole.XPECTUM_ADMIN)) {
      return creators.reduce((acc, creator) => {
        const { groups: creatorGroups } = creator;
        const groupsIds = creatorGroups.map(item => item.id);
        const isAllowed = this.checkArrays(allowedGroups, groupsIds);

        if (isAllowed && groupsIds.length && allowedGroups.length) {
          return [...acc, creator];
        }

        return acc;
      }, [])
    }

    return creators;
  }

  public getOrganisationByAdminRole(user: User, organisations: Organisation[]): Organisation[] {
    const { roles, organisations: adminOrgs} = user;
    const allowedOrgsds = adminOrgs.reduce((acc, org) => {
      return {
        ...acc,
        [org.id]: true
      }
    }, {});

    if (!roles.includes(UserRole.XPECTUM_ADMIN)) {
      return organisations.reduce((acc, org) => {
        const { id } = org;
        const isAllowed = allowedOrgsds[id];

        if (isAllowed) {
          return [...acc, org]
        }

        return acc;
      }, [])
    }

    return organisations;
  }

  public async checkLmsAdminToUpdateLmsGroup(user: User, lmsId: number) {
    const { roles, lmsGroups } = user;

    if (roles.includes(UserRole.ADMIN_LMS)) {
      const allowedTable = lmsGroups.reduce((acc, lms) => {
        return {
          ...acc,
          [lms.id]: true
        }
      }, {})

      const isAllowed = allowedTable[lmsId];

      if (!isAllowed) {
        throw new ForbiddenException('Forbidden resource')
      }
    }
  }

  public async checkAccessToCourseCourseCreator(user: User, courseId: number): Promise<void> {
    const { roles } = user;

    if (roles.includes(UserRole.COURSE_CREATOR)) {
      const course = await this.connection
        .getRepository(CourseLog)
        .createQueryBuilder('courseLog')
        .where('courseLog.course = :courseId', { courseId })
        .andWhere('courseLog.createdBy = :userId', { userId: user.id })
        .getOne()

      if (!course) {
        throw new ForbiddenException('Forbidden resource')
      }
    }

    if (roles.includes(UserRole.ADMIN_LMS)) {
      const allowedCourses = await this.getCoursesByPermissions(user, true);
      const isAllowed = allowedCourses.find(item => item.courseId === courseId);

      if (!isAllowed) {
        throw new ForbiddenException('Forbidden resource')
      }
    }
  }

  public checkArrays(allowedIds: number[], allIds: number[]): Boolean {

    const allowedTable = allowedIds.reduce((acc, item) => {
      return {
        ...acc,
        [item]: true
      }
    }, {})

    const result = allIds.every(id => allowedTable[id]);

    return result;
  }

  public getGroupsByAdminGroups(user: User, groups: Group[]): Group[] {
    const { roles, groups: adminGroups } = user;
    const allowedGroupIds = adminGroups.reduce((acc, group) => {
      return {
        ...acc,
        [group.id]: true
      }
    }, {});


    if (!roles.includes(UserRole.XPECTUM_ADMIN)) {
      return groups.reduce((acc, group) => {
        const { id } = group;
        const isAllowed = allowedGroupIds[id];

        if (isAllowed) {
          return [...acc, group]
        }

        return acc;
      }, [])
    }

    return groups;
  }

  public getOrganisationAdmins(user: User, organisationAdmins: User[]): User[] {
    const { roles, organisations } = user;
    const allowedOrganisations = organisations.map(item => item.id);

    if (!roles.includes(UserRole.XPECTUM_ADMIN)) {
      return organisationAdmins.reduce((acc, admin) => {
        const { organisations: adminOrganisation } = admin;
        const organisationIds = adminOrganisation.map(item => item.id);
        const isAllowed = this.checkArrays(allowedOrganisations, organisationIds);

        if (isAllowed && organisationIds.length && allowedOrganisations.length) {
          return [...acc, admin];
        }

        return acc;
      }, [])
    }

    return organisationAdmins;
  }

  public getGroupAdminsByGroups(user: User, groupAdmins: User[]): User[] {
    const { roles, groups: userGroups } = user;
    const allowedGroups = userGroups.map(item => item.id);

    if (!roles.includes(UserRole.XPECTUM_ADMIN)) {
      return groupAdmins.reduce((acc, admin) => {
        const { groups } = admin;
        const groupsIds = groups.map(item => item.id);
        const isAllowed = this.checkArrays(allowedGroups, groupsIds)
        if (isAllowed && groupsIds.length && allowedGroups.length) {
          return [...acc, admin]
        }

        return acc;
      }, [])
     }

    return groupAdmins;
  }

  public getStudentsByGroups(user: User, students: User[]): User[] {
    const { roles, groups } = user;
    const rebuildedGroups = groups.map(item => item.id)

    if (!roles.includes(UserRole.XPECTUM_ADMIN)) {
      return students.reduce((acc, student) => {
        const { groups: studentGroups } = student;
        const groupsIds = studentGroups.map(item => item.id);
        const isAllowed = this.checkArrays(rebuildedGroups, groupsIds)
        if (isAllowed && groupsIds.length && rebuildedGroups.length) {
          return [...acc, student]
        }

        return acc;
      }, [])
    }

    return students;
  }

  public async checkOrganisationAdminAccess(user: User, accessOptions: IAdminAccessOptions) {
    const { roles, organisations } = user;
    await this.checkAdminAccess(user, accessOptions);

    if (roles.includes(UserRole.ADMIN_ORGANISATION)) {
      const { organisationIds } = accessOptions;
      const rebuildedOrganisation = organisations.filter(organisation => organisationIds.find(item => item === organisation.id))
      const isNotAllowedToChange = rebuildedOrganisation.some(organisatiom => !organisatiom.adminFullAccess);

      if (isNotAllowedToChange) {
        throw new ForbiddenException('You cant add or update administrators')
      }
    }
  }

  public async checkAdminAccess(user: User, accessOptions: IAdminAccessOptions) {
    const { roles, groups, lmsGroups, organisations } = user;
    const { groupsIds, organisationIds, lmsIds } = accessOptions;
    const rebuildedGroups = groups.map(item => item.id)
    const rebuildedOrganisations = organisations.map(item => item.id)
    const rebuildedLms = lmsGroups.map(item => item.id);

    if (!roles.includes(UserRole.XPECTUM_ADMIN) && !roles.includes(UserRole.TUTOR)) {
      if (groupsIds) {
        const isAllowed = this.checkArrays(rebuildedGroups, groupsIds)
        if (!isAllowed) {
          throw new ForbiddenException('Forbidden resource')
        }
      }

      if (organisationIds) {
        const isAllowed = this.checkArrays(rebuildedOrganisations, organisationIds)

        if (!isAllowed) {
          throw new ForbiddenException('Forbidden resource')
        }
      }

      if (lmsIds) {
        const isAllowed = this.checkArrays(rebuildedLms, lmsIds)

        if (!isAllowed) {
          throw new ForbiddenException('Forbidden resource')
        }
      }
    }
  }

  public async isUserExists(email: string): Promise<boolean> {
    return Boolean(await this.connection
      .getRepository(User)
      .createQueryBuilder('user')
      .leftJoin('user.userEmail', 'userEmail')
      .where('userEmail.email = :email', { email })
      .getOne());
  }

  public async getExistingEmails(emails: string[]): Promise<string[]> {
    const promises = emails
        .map(toLower)
        .map(async (email: string) => {
          const isExists = await this.isUserExists(email);

          return [isExists, email] as const;
        });

    return Promise.all(promises)
      .then(filter(([isExists]) => Boolean(isExists)))
      .then(map(([_, email]) => email));
  }

  public async getExistingUserWithEmployeeNumber(
    employeeNumber: string,
  ): Promise<User> {
    return this.connection
      .getRepository(User)
      .createQueryBuilder('user')
      .where({ employeeNumber })
      .getOne();
  }

  public async getExistingUserWithPersonNumber(
    personNumber: string,
  ): Promise<User> {
    return this.connection
      .getRepository(User)
      .createQueryBuilder('user')
      .where({ personNumber })
      .getOne();
  }

  public async sendHtmlToEmail(emails: string[], letter: string, subject: string, senderName: string, senderEmail: string): Promise<void> {
    if (letter) {
      try {
        const welcomeText = EditorState.createWithContent(convertFromRaw(JSON.parse(letter))).getCurrentContent();
        const html = stateToHTML(welcomeText);
        await Promise.all(
          emails.map((email: string) =>
            this.mailerService.sendMail({
              html,
              subject,
              from: {
                name: senderName,
                address: senderEmail,
              },
              to: email,
            }),
          ),
        );
      } catch (e) {
        Logger.error(e)
      }
    }
  }

  public async sendOrderEmails(
    emails: string[],
    context: any
  ): Promise<void> {
    const { template, subject } = config.get('emailTemplates.orderEmail');

    await Promise.all(
      emails.map((email: string) =>
        this.mailerService.sendMail({
          template,
          subject,
          context,
          to: email,
        }),
      ),
    );
  }

  public async sendCourseEmailTemplate(
    template: string,
    context: object,
    emails: string[],
    subject: string,
    senderName: string,
    senderEmail: string,
  ): Promise<void> {
    if (template) {
      const emailForName = emails[0].split('.')
      const fileName = `${emailForName[0]}${subject}`;
      const filePath = `src/email-templates/${fileName}.hbs`
      try {
        const templateData = await this.httpService.get(template).toPromise();
        fs.writeFileSync(filePath, templateData.data)
        await Promise.all(
          emails.map((email: string) => {
            return this.mailerService.sendMail({
                context,
                subject,
                template: fileName,
                to: email,
                from: {
                  name: senderName,
                  address: senderEmail,
                },
              })
            }
          ),
        );
      } catch(e) {
        Logger.error(e)
      } finally {
        fs.unlink(filePath, (e) => {
          if (e) Logger.error(e)
        })
      }
    }
  }

  public async sendEmailConfirmation(
    emails: string[],
    password: string,
    isAdmin = true,
  ): Promise<void> {
    const { template, subject } = isAdmin
      ? config.get('emailTemplates.admin')
      : config.get('emailTemplates.user');

    await Promise.all(
      emails.map((email: string) =>
        this.mailerService.sendMail({
          template,
          subject,
          to: email,
          context: {
            password,
          },
        }),
      ),
    );
  }

  public checkFileValid(file, allowedMimetypes: string[], allowedSize: number) {
    const { mimetype, size } = file;

    if (size > allowedSize) {
      throw new BadRequestException({ error: 'Maximum file size exceeded' });
    }
    if (!allowedMimetypes.includes(mimetype)) {
      throw new BadRequestException({ error: 'Invalid file format' });
    }
  }

  public generatePassword() {
    return new RandExp(REGEXP.PASSWORD).gen();
  }

  public async isUserPhoneExists(phone: string): Promise<boolean> {
    return Boolean(await this.connection
      .getRepository(User)
      .createQueryBuilder('user')
      .leftJoin('user.userPhone', 'userPhone')
      .where('userPhone.phone = :phone', { phone })
      .getOne());
  }

  public async getExistingPhones(phones: string[]) {
    return Promise.all(
      phones.map(async (item) => {
        const isExist = await this.isUserPhoneExists(item);
        if (isExist) {
          return item;
        }
      }),
    ).then(filter(Boolean));
  }

  public getLanguageIdByName(lang: string): number {
    return LANGUAGE_IDS[lang]
  }

  public rebuildDataForImportAdmin(data: any[]): IImportUser[] {
    const rebuildedData = data.map(admin => {
      const splittedFields = Object.entries(admin);

      return splittedFields.reduce((acc, item: any[]) => {
        if (this.KEY_NAMES_TO_SEPARATE.includes(item[0])) {
          return {
            ...acc,
            [item[0]]: item[1].split(',')
          }
        }

        if (item[0] === 'language') {
          return {
            ...acc,
            [item[0]]: this.getLanguageIdByName(item[1])
          }
        }

        if (this.BOOL_KEYS.includes(item[0])) {
          return {
            ...acc,
            [item[0]]: item[1] === 'Yes'
          }
        }

        return {
          ...acc,
          [item[0]]: item[1]
        }
      }, {})
    }) as IImportUser[]

    return rebuildedData;
  }

  public checkImportAdminDataInvalid(data: any[]) {
    const error = Joi.validate(data, importOrganisationAdmin, { abortEarly: false })

    return this.checkDataInvalid(error);
  }

  public checkImportStudentDataInvalid(data: any[]) {
    const error = Joi.validate(data, importStudent, { abortEarly: false })

    return this.checkDataInvalid(error);
  }

  public checkFilesValidTypes(files, allowedMimetypes: string[]) {
    files.forEach((file) => {
      if (!allowedMimetypes.includes(file.mimetype)) {
        throw new BadRequestException({ error: 'Invalid files format' });
      }

      return false;
    });
  }

  public getArrayOfTranslations(dataCourse: CreateCourseDto, course: Course): CourseTranslation[] {
    if (dataCourse.translations) {
      return dataCourse.translations.map(translation => {
        return new CourseTranslation({
          ...translation,
          course
        })
      })
    }

    return []
  }

  public getCourseDescription(courseTranslation: CourseTranslation): string {
    if (courseTranslation && courseTranslation.description) {
      const { description } = courseTranslation;
      const welcomeText = EditorState.createWithContent(convertFromRaw(JSON.parse(description))).getCurrentContent();
      const html = stateToHTML(welcomeText);

      return html;
    }

    return '';
  }
}
