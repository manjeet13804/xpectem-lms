import {
  BadRequestException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import * as moment from 'moment';
import {
  isEmpty,
  isNil,
  differenceWith,
  path,
  pluck,
  pipe,
  map,
  flatten,
  head,
  useWith,
  prop,
  equals,
} from 'ramda';
import { Connection, QueryFailedError } from 'typeorm';

import { Tools } from '../../../common/tools/tools';
import { Group } from '../../../entity/Group';
import { User, UserRole } from '../../../entity/User';
import { UserEmail } from '../../../entity/UserEmail';
import { UserPhone } from '../../../entity/UserPhone';
import { UserService } from '../user.service';
import { Language } from '../../../entity/Language';
import { UserLog } from '../../../entity/UserLog';
import { LmsGroup } from '../../../entity/LmsGroup';
import { AuthService } from '../../auth/auth.service';
import { UserProfileService } from '../user-profile.service';
import { AdminService } from '../admin/admin.service';
import { CreateTutorDto } from './dto/create-tutor.dto';
import { Course } from '../../../entity/Course';
import { SearchTutorDto } from './dto/search-tutor.dto';

const createUserEmail = (user: User) => (email: string) =>
  new UserEmail({ user, email, welcomeEmailSent: moment().toDate() });
const createUserPhone = (user: User) => (phone: string) =>
  new UserPhone({ user, phone });
const propLmsGroupsFromCourses = pipe<Course[], Group[][], LmsGroup[][], LmsGroup[]>(
  pluck('groups'),
  map(map(path(['organisation', 'lmsGroup']))),
  flatten,
);
const differenceCourses = differenceWith(useWith(equals, [prop('id'), prop('id')]));

@Injectable()
export class AdminTutorService {

  private entityManager = this.connection.createEntityManager();

  constructor(
    public readonly connection: Connection,
    public readonly userService: UserService,
    public readonly tools: Tools,
    public readonly authService: AuthService,
    public readonly userProfileService: UserProfileService,
    public readonly adminService: AdminService,
  ) { }

  public async create(currentUser: User, body: CreateTutorDto, avatar?: string): Promise<User> {
    const { email, phone, coursesIds, language, ...userData  } = body;
    console.log('---111', 111)
    const { courses, lmsGroup } = await this.getAndValidateCoursesEntities(coursesIds);

    const existedAdmin = await this.connection
      .getRepository(User)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.userEmail', 'userEmail')
      .where(`(FIND_IN_SET(:orgAdmin,user.roles)>0 
        OR FIND_IN_SET(:groupAdmin,user.roles)>0) 
        AND FIND_IN_SET(:tutor,user.roles)=0`, {
        orgAdmin: UserRole.ADMIN_ORGANISATION,
        groupAdmin: UserRole.ADMIN_GROUP,
        tutor: UserRole.TUTOR
      })
      .andWhere('userEmail.email IN (:...email)', { email } )
      .getOne()
    if (existedAdmin) {
      const { roles } = existedAdmin;
      const newRoles = [...roles, UserRole.COURSE_CREATOR];
      const newDataTutor = new User({
        ...existedAdmin,
        roles: newRoles,
      })
      const updatedCourses = courses.map(item => new Course({
        ...item,
        tutors: [...item.tutors, newDataTutor]
      }))
      await this.connection.manager.save([...updatedCourses, newDataTutor]);

      return existedAdmin;
    }

    const existingEmails = await this.tools.getExistingEmails(email);

    if (!isEmpty(existingEmails)) {
      throw new BadRequestException(`A user with "${existingEmails}" emails already exists`);
    }
    const userLogEntity = new UserLog({ createdBy: currentUser });

    const password = this.tools.generatePassword();
    const encryptedPassword = this.authService.encryptPassword(password);
    const languageEntity = await this.entityManager.findOne(Language, language);

    const newUser = new User({
      ...userData,
      avatar,
      userLog: userLogEntity,
      language: languageEntity,
      password: encryptedPassword,
      roles: [UserRole.TUTOR],
      lmsGroups: [lmsGroup],
    });

    const user = await this.connection.manager.save(newUser)
    console.log('---user id', user.id)
    const userEmails = email.map(createUserEmail(user));
    const userPhones = phone.map(createUserPhone(user));
    
    // course definitely cannot have a similar user as a tutor
    for (const course of courses) {
      AdminTutorService.addTutorToCourse(course, user);
    }
    console.log('---course id', courses[0].id)
console.log('---course tutors', courses[0].tutors)
    await this.connection.transaction(async (transactionalEntityManager) => {
      console.log('---333', 333)
      await transactionalEntityManager.save(userLogEntity);
      console.log('---444', 444)
      await transactionalEntityManager.save([
        user,
        ...userEmails,
        ...userPhones,
        // ...courses,
      ]);
      console.log('---6666', 6666)

      await transactionalEntityManager.save(courses);
console.log('---7777', 7777)
      await transactionalEntityManager.save(user);
      console.log('---888', 888)
    });

    this.tools.sendEmailConfirmation(email, password).catch((err) => {
      const error = new Error(`Failed to send email confirmation to "${email}" emails`);
      Logger.error(err, error.stack);
    });

    return user;
  }

  private async getAndValidateCoursesEntities(coursesIds: number[]): Promise<{
    courses: Course[],
    lmsGroup: LmsGroup,
  }> {
    const courses = await this.entityManager.findByIds(Course, coursesIds, {
      relations: [
        'tutors',
        'groups',
        'groups.organisation',
        'groups.organisation.lmsGroup',
      ],
    });

    if (courses.length !== coursesIds.length) {
      const diff = differenceWith(
        (targetId: number, { id }: Course) => targetId === id,
        coursesIds,
        courses,
      );

      throw new BadRequestException(`Not found courses for "${diff}" ids`);
    }

    const lmsGroups = propLmsGroupsFromCourses(courses);
    const lmsGroupSample = head(lmsGroups);

    const allLmsGroupsIsEquals = lmsGroups.every(
      (lmsGroup: LmsGroup) => lmsGroup.id === lmsGroupSample.id,
    );

    if (!allLmsGroupsIsEquals) {
      throw new BadRequestException('Not all courses belong to one lms group');
    }

    return {
      courses,
      lmsGroup: lmsGroupSample,
    };
  }

  public async search(searchParams: SearchTutorDto) {
    try {
      const {
        firstName,
        lastName,
        email,
        phone,
        personNumber,
        employeeNumber,
        isDeactivated,
      } = searchParams;

      const query = this.connection
        .getRepository(User)
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.userEmail', 'userEmail')
        .leftJoinAndSelect('user.lmsGroups', 'lmsGroups')
        .leftJoin('user.userPhone', 'userPhone')
        .where('FIND_IN_SET(:roles,user.roles)>0', { roles: UserRole.TUTOR });

      if (!isDeactivated) {
        query.andWhere('user.isDeactivated = false');
      }

      if (firstName) {
        query.andWhere('LOWER(user.firstName) like :firstName', { firstName: `%${firstName.toLowerCase()}%` });
      }

      if (lastName) {
        query.andWhere('LOWER(user.lastName) like :lastName', { lastName: `%${lastName.toLowerCase()}%` });
      }

      if (email) {
        query.andWhere('LOWER(userEmail.email) like :email', { email: `%${email.toLowerCase()}%` });
      }

      if (phone) {
        query.andWhere('userPhone.phone like :phone', { phone: `%${phone}%` });
      }

      if (personNumber) {
        query.andWhere('user.personNumber = :personNumber', { personNumber });
      }

      if (employeeNumber) {
        query.andWhere('user.employeeNumber = :employeeNumber', { employeeNumber });
      }

      return query.getMany();
    } catch (err) {
      Logger.error(err, err.stack);

      if (err instanceof QueryFailedError) {
        throw new BadRequestException('Search tutor error');
      }

      throw new BadRequestException(err.message || 'Search tutor error');
    }
  }

  public async get(id: number) {
    try {
      return this.getTutorById(id);
    } catch (err) {
      Logger.error(err, err.stack);

      if (err instanceof QueryFailedError) {
        throw new BadRequestException('Get tutor error');
      }

      throw new BadRequestException(err.message || 'Get tutor error');
    }
  }

  private async getTutorById(id: number) {
    const user = await this.connection
      .getRepository(User)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.userEmail', 'userEmail')
      .leftJoinAndSelect('user.userPhone', 'userPhone')
      .leftJoinAndSelect('user.language', 'language')
      .leftJoinAndSelect('user.lmsGroups', 'lmsGroups')
      .leftJoinAndSelect('user.tutoringCourses', 'tutoringCourses')
      .leftJoinAndSelect('tutoringCourses.tutors', 'tutors')
      .leftJoinAndSelect('user.userLog', 'userLog')
      .leftJoinAndSelect('userLog.createdBy', 'createdBy')
      .leftJoinAndSelect('createdBy.userEmail', 'createdBy.email')
      .leftJoinAndSelect('userLog.changedBy', 'changedBy')
      .leftJoinAndSelect('changedBy.userEmail', 'changedBy.email')
      .where({ id })
      .andWhere('FIND_IN_SET(:role,user.roles)>0', { role: UserRole.TUTOR })
      .getOne();

    if (isNil(user)) {
      throw new BadRequestException(`The tutor with id ${id} was not found`);
    }

    return user;
  }

  public async update(currentUser: User, id: number, body: Partial<CreateTutorDto>, avatar?: string) {
    const { email, phone, language, coursesIds, ...updatedFields } = body;

    const tutor = await this.getTutorById(id);

    tutor.language = language
      ? await this.entityManager.findOne(Language, language)
      : tutor.language;

    const emailToAdd = email
      ? await this.userProfileService.getEmailToAdd(tutor, email)
      : [];

    const emailToDelete = email
      ? await this.userProfileService.getEmailIdsForDelete(tutor, email)
      : [];

    const { phoneToAdd, phoneToDelete } = phone
      ? await this.userProfileService.getPhoneToSave(tutor, phone)
      : { phoneToAdd: [], phoneToDelete: [] };

    const { courses, lmsGroup } = await this.getAndValidateCoursesEntities(coursesIds);

    const currentTutorLmsGroup = head(tutor.lmsGroups);

    // TODO: think about it
    // if all courses have been deleted, you may need
    // to give the opportunity to change lms group
    if (currentTutorLmsGroup && lmsGroup && currentTutorLmsGroup.id !== lmsGroup.id) {
      throw new BadRequestException(
          `lms group of added courses doesn't equal the already established group ${currentTutorLmsGroup.id}`,
      );
    }

    const addedCourses = differenceCourses(courses, tutor.tutoringCourses);
    const removedCourses = differenceCourses(tutor.tutoringCourses, courses);

    for (const course of addedCourses) {
      AdminTutorService.addTutorToCourse(course, tutor);
    }

    for (const course of removedCourses) {
      AdminTutorService.removeTutorFromCourse(course, tutor);
    }

    const tutorToSave = new User({
      ...tutor,
      ...updatedFields,
      avatar: avatar || '',
      lmsGroups: [lmsGroup],
    });

    await this.connection.transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.save([
        tutorToSave,
        ...emailToAdd,
        ...phoneToAdd,
        ...addedCourses,
        ...removedCourses,
      ]);

      if (!isEmpty(emailToDelete)) {
        await transactionalEntityManager.delete(UserEmail, emailToDelete);
      }

      if (!isEmpty(phoneToDelete)) {
        await transactionalEntityManager.delete(UserPhone, phoneToDelete);
      }

    });

    await this.adminService.updateUserLog(tutor.id, currentUser);

    return this.getTutorById(id);
  }

  public async remove(id: number) {
    const tutorEntity = await this.getTutorById(id);
    const { roles } = tutorEntity;
    if (roles.includes(UserRole.ADMIN_ORGANISATION) || roles.includes(UserRole.ADMIN_GROUP)) {
      const newRoles = roles.filter(item => item !== UserRole.TUTOR);
      const newDataTutor = new User({
        ...tutorEntity,
        roles: newRoles,
      })
      await this.entityManager.save(newDataTutor);

      return HttpStatus.OK;
    }
    await this.entityManager.remove(tutorEntity);

    return HttpStatus.OK;
  }

  private static addTutorToCourse(course: Course, tutor: User) {
    course.tutors.push(tutor);
  }

  private static removeTutorFromCourse(course: Course, tutor: User) {
    const tutorIndex = course.tutors.findIndex(({ id }: User) => id === tutor.id);

    if (tutorIndex === -1) {
      Logger.warn(`Removable tutor not found in course tutorId: ${tutor.id} courseId: ${course.id}`);
    }

    course.tutors.splice(tutorIndex, 1);
  }
}
