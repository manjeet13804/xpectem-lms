import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as config from 'config';
import * as _ from 'lodash';
import * as moment from 'moment';
import { concat, omit, path, pluck, zip } from 'ramda';
import { Connection, Repository  } from 'typeorm';
import { Response } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseTranslation } from '../../entity/CourseTranslation';
import { Tools } from '../../common/tools/tools';
import { CourseAttachment } from '../../entity/CourseAttachment';
import { CourseLog } from '../../entity/CourseLog';
import { FileTopics } from '../../entity/FileTopics';
import { Language } from '../../entity/Language';
import { User, UserRole } from '../../entity/User';
import { StudentTaxonomy } from '../../entity/StudentTaxonomy';
import { CourseCertificate } from '../course/course-certificate.entity';
import { CourseStudent } from '../../entity/CourseStudent';
import { CourseTopic } from '../course/course-topic.entity';
import { Course } from '../../entity/Course';
import { Assignment } from '../../entity/Assignment';
import { Exam } from '../../entity/Exam';
import { Lesson } from '../../entity/Lesson';
import { v4 as uuid } from 'uuid';
import { Topic } from '../../entity/Topics';
import { UploadService } from '../upload/upload.service';
import { PERMISSION_LEVELS, REPORT_TYPE } from '../../common/enums/constants';
import {
  ChangeCourseStatusDto,
  CourseTimeDto,
  CourseTopicsSearchDto,
  CreateCourseDto,
  CreateTopicDto,
  FilesSearchDto,
  FileTemplateDto,
  FileTopicsSearchDto,
  SearchCourseDto,
  UpdateCourseDto,
  UpdateCourseFilesDto,
  UpdateCourseTopicsDto,
  UpdateCourseTutorsDto,
  UploadFileDto,
  UpdateTopicInfoDto,
  CategoriesDto,
  IPermissionDto,
  PermissionDto,
  IPermission,
  IsPermissions,
} from './dto/admin.course.dto';
import { UserEmail } from '../../entity/UserEmail';
import { CourseCategory } from '../course-category/course-category.entity';
import { download } from '../../helpers/download'
import { Organisation } from '../../entity/Organisation';
import { Group } from '../../entity/Group';
import { CourseStatus } from '../course/course-status.enum';
import {LmsGroupCoursePermissions} from "../../entity/LmsGroupCoursePermissions";
import {LmsGroup} from "../../entity/LmsGroup";
import {Permission} from "../../entity/Permission";
import {OrganisationCoursePermissions} from "../../entity/OrganisationCoursePermissions";
import {GroupCoursePermissions} from "../../entity/GroupCoursePermissions";

const FILES_COURSE_TEMPLATE_MIMETYPES: string[] = config.get('course.filesCourseTemplateMimetypes');
const FILES_COURSE_MIMETYPES: string[] = config.get('course.filesCourseMimetypes');
const FILE_TEMPLATE: string = 'template_for_course';
const ALLOWED_AVATAR_MIMETYPES: string[] = config.get('course.imageFileMimetype');
const ALLOWED_AVATAR_MAX_SIZE: number = config.get('course.fileMaxSize');

const copyLesson = (topic: Topic) => (lesson: Lesson) =>
  new Lesson({ ...omit(['id'], lesson), topic });
const copyAssignment = (topic: Topic) => (assignment: Assignment) =>
  new Assignment({ ...omit(['id'], assignment), topic });
const copyExam = (topic: Topic) => (exam: Exam) => new Exam({ ...omit(['id'], exam), topic });
const PERMISSION_NO_ACCESS_ID = 1;
const PERMISSION_ACCESS_ID = 2;
const PERMISSION_FULL_ACCESS = 3;
const { CERTIFICATE_TEMPLATE, IMAGE_FILE } = config.get(
  'course.fieldName',
);

interface ToCopyTopic {
  id: number;
  order: number;
}

interface ToCreateTopic {
  name: string;
  order: number;
}

@Injectable()
export class AdminCourseService {
  private entityManager = this.connection.createEntityManager();

  public constructor(
    public readonly connection: Connection,
    private uploadService: UploadService,
    public readonly tools: Tools,
    @InjectRepository(CourseTranslation) private courseTranslationRepository: Repository<CourseTranslation>,
  ) { }

  public async updateCourseTopicInfo(topicId: number, updateTopicInfo: UpdateTopicInfoDto, user): Promise<HttpStatus> {
    try {
      const editTopic = new Topic({ id: topicId, name: updateTopicInfo.topicName, description: updateTopicInfo.topicDescription });

      await this.connection.transaction(async transactionEntityManager => {
        const topic = await transactionEntityManager.save(editTopic)

        const courseTopic = await transactionEntityManager
          .getRepository(CourseTopic)
          .createQueryBuilder('courseTopic')
          .leftJoinAndSelect('courseTopic.course', 'course')
          .where('courseTopic.topic = :topic', { topic: topic.id })
          .getOne()

        if (courseTopic) {
          const { course } = courseTopic;

          await this.tools.checkAccessToCourseCourseCreator(user, course.id);
        }
      })

      return HttpStatus.OK;
    } catch (e) {
      throw new BadRequestException({ error: 'Can\'t update lesson info' });
    }
  }


  public getFinishedCourses = (subQuery) => {
    return subQuery
      .select('count(*)')
      .from(CourseStudent, 'courseStudent')
      .where('courseStudent.doneAt is not null and course.id= course_id')
      .groupBy('course.id')
      .limit(1)
  };
  public getNotStartedCourses = (subQuery) => {
    return subQuery
      .select('count(*)')
      .from(CourseStudent, 'courseStudent')
      .where('courseStudent.startAt > CURDATE() and course.id = course_id')
      .groupBy('course.id')
      .limit(1)
  };
  public getStartedCourses = (subQuery) => {
    return subQuery
      .select('count(*)')
      .from(CourseStudent, 'courseStudent')
      .where('courseStudent.startAt < curdate() and (courseStudent.doneAt > curdate() or courseStudent.doneAt is null) and course.id = course_id')
      .groupBy('course.id')
      .limit(1)
  };

  public async getAllCertificates(): Promise<CourseCertificate[]> {
    return this.connection
      .getRepository(CourseCertificate)
      .createQueryBuilder('courseCertificate')
      .getMany();
  }


  public async downloadReportFile(res: Response, query): Promise<CourseStudent[]> {
    try{
      const { groupId, type, studentId, courseId} = query
      const newGroupsId =  JSON.parse(groupId)
      const newCourseId =  JSON.parse(courseId)
      switch (type){
        case REPORT_TYPE.total_report:
          return this.downloadTotalReport(res, {newGroupsId, studentId, newCourseId});
        case REPORT_TYPE.course_report:
          return this.downloadPerCourseReport(res, {newGroupsId, newCourseId});
        default:
          return [];
        }
      }  catch (e) {
        throw new BadRequestException({ error: 'Can\'t update lesson info' });
      }
  }
  public async downloadTotalReport(res: Response, query): Promise<any> {
    try {
      const { newGroupsId, studentId, newCourseId} = query;
      try{
        const queryCourse = this.connection
          .getRepository(CourseStudent)
          .createQueryBuilder('courseStudent')
          .leftJoinAndSelect('courseStudent.course', 'course')
          .leftJoinAndSelect('courseStudent.user', 'user')
          .leftJoinAndSelect('course.groups', 'groups')
          .leftJoinAndSelect('user.userEmail', 'userEmail')
          .select('course.title as Course, user.first_name as `First name`, user.last_name  as `Last name`, userEmail.email as `Email`')
          .addSelect(
            ' groups.name as Company, ' +
            'courseStudent.start_at as `Start date`, ' +
            'courseStudent.done_at as `End date`, ' +
            'courseStudent.points as Points, ' +
            'course.status as Status'
          )

        const queryTaxonomy = this.connection
          .getRepository(StudentTaxonomy)
          .createQueryBuilder('studentTaxonomy')
          .leftJoinAndSelect('studentTaxonomy.taxonomy','taxonomy')
          .where('studentTaxonomy.user_id = :user_id', { user_id: studentId })
          . select('title,format')
        const taxonomy = await queryTaxonomy.getRawMany()

        if (newGroupsId && newGroupsId.length) {
          queryCourse.andWhere('groups.id IN (:...id)', { id: newGroupsId });
        }
        if (studentId) {
          queryCourse.andWhere('user.id = :studentId', { studentId });
        }
        if(newCourseId && newCourseId.length){
          queryCourse.andWhere('course.id IN (:...course_id)', { course_id: newCourseId });
        }

        const csvFields =  await queryCourse.getRawMany()
        const taxonomyTest = taxonomy.map((i,index) => [` ${i.title}`,`${i.format}`])
        const newReport = csvFields.map(i=>{
          return {...i, ..._.fromPairs(taxonomyTest)}
        })
        const fileUUID = uuid();
        const fileName = `total_report_${fileUUID}.csv`;

          download(res, newReport, fileName)
        }  catch (e) {
          throw new BadRequestException({ error: 'Can\'t update lesson info' });
        }
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  public async downloadPerCourseReport(res: Response, query): Promise<any> {
    try {
      const { newGroupsId, newCourseId } = query;
      try{
        const queryCourse = this.connection
          .getRepository(CourseStudent)
          .createQueryBuilder('courseStudent')
          .leftJoinAndSelect('courseStudent.course', 'course')
          .leftJoinAndSelect('course.groups', 'groups')
          .select('course.title as `Course Name`, count(course.id) as `Number of students`')
          .addSelect(this.getNotStartedCourses, 'Number of not started')
          .addSelect(this.getStartedCourses, 'Number of started')
          .addSelect(this.getFinishedCourses, 'Number of finished')
          .groupBy('course.id')

        if (newGroupsId && newGroupsId.length) {
          queryCourse.andWhere('groups.id IN (:...id)', { id: newGroupsId });
        }
        if(newCourseId && newCourseId.length){
          queryCourse.andWhere('course.id IN (:...id)', { id: newCourseId });
        }
        const csvFields =  await queryCourse.getRawMany()

        const fileUUID = uuid();
        const fileName = `total_report_${fileUUID}.csv`;

          download(res, csvFields, fileName)
        }  catch (e) {
          throw new BadRequestException({ error: 'Can\'t update lesson info' });
        }
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  public async getGroupsForPerCourseReport(query): Promise<any> {
    try{
      const { newGroupsId, newCourseId } = query
      const queryCourse = this.connection
        .getRepository(CourseStudent)
        .createQueryBuilder('courseStudent')
        .leftJoinAndSelect('courseStudent.course', 'course')
        .leftJoinAndSelect('course.groups', 'groups')
        .select('course.title as `Course Name`, count(course.id) as `Number of students`')
        .addSelect(this.getNotStartedCourses, 'Number of not started')
        .addSelect(this.getStartedCourses, 'Number of started')
        .addSelect(this.getFinishedCourses, 'Number of finished')
        .groupBy('course.id')

      if (newGroupsId && newGroupsId.length) {
        queryCourse.andWhere('groups.id IN (:...id)', { id: newGroupsId });
      }
      if(newCourseId && newCourseId.length){
        queryCourse.andWhere('course.id IN (:...id)', { id: newCourseId });
      }
      const resultCourse= await queryCourse.getRawMany()

      return {resultCourse};
      }  catch (e) {
        throw new BadRequestException({ error: 'Can\'t update lesson info' });
      }
  }

  public async getGroupsForTotalReport(query): Promise<any> {
    try{
      const { newGroupsId, studentId, newCourseId } = query
      const queryCourse = this.connection
        .getRepository(CourseStudent)
        .createQueryBuilder('courseStudent')
        .leftJoinAndSelect('courseStudent.course', 'course')
        .leftJoinAndSelect('courseStudent.user', 'user')
        .leftJoinAndSelect('course.groups', 'groups')
        .leftJoinAndSelect('user.userEmail', 'userEmail')
        .select('course.title as `Label`, user.first_name as `First name`, user.last_name as `Last name`, userEmail.email as `Email`')
        .addSelect(' groups.name as company, courseStudent.start_at, courseStudent.points, courseStudent.done_at, course.status')


      const queryTaxonomy = this.connection
        .getRepository(StudentTaxonomy)
        .createQueryBuilder('studentTaxonomy')
        .leftJoinAndSelect('studentTaxonomy.taxonomy','taxonomy')
        .where('studentTaxonomy.user_id = :user_id', { user_id: studentId })
        .select('title,format')
      const taxonomy = await queryTaxonomy.getRawMany()


      if (newGroupsId && newGroupsId.length) {
        queryCourse.andWhere('groups.id IN (:...id)', { id: newGroupsId });
      }
      if (studentId) {
        queryCourse.orWhere('user.id = :studentId', { studentId });
      }
      if(newCourseId && newCourseId.length){
        queryCourse.andWhere('course.id IN (:...course_id)', { course_id: newCourseId });
      }
      const resultCourse = await queryCourse.getRawMany();

       return {resultCourse, taxonomy}
      }  catch (e) {
        throw new BadRequestException({ error: 'Can\'t update lessons info' });
      }
  }

  public async getGroupCoursies(query): Promise<CourseStudent[]> {
    try{
      const { studentId, groupId, type, courseId} = query
      const newGroupId =  groupId && JSON.parse(groupId)
      const newCourseId =  courseId && JSON.parse(courseId)
      switch (type){
        case REPORT_TYPE.total_report:
          return this.getGroupsForTotalReport({newGroupId, studentId,newCourseId});
        case REPORT_TYPE.course_report:
          return this.getGroupsForPerCourseReport({newGroupId,newCourseId});
        default:
          return [];
        }
      }  catch (e) {
        throw new BadRequestException({ error: 'Can\'t update lesson info' });
      }
  }

  public async getAllCourse(query: SearchCourseDto, admin: User): Promise<Course[]> {
    try {
      const {
        title,
        idLmsGroup,
        groupId,
        isEdit,
        isOnlyPublished,
        isOnlyOrderable,
        organisationIds,
      } = query;
      const queryCourse = await this.connection
        .getRepository(Course)
        .createQueryBuilder('course')
        .leftJoinAndSelect('course.groups', 'groups')
        .leftJoinAndSelect('course.language', 'language')
        .leftJoin('course.courseLog', 'courseLog')
        .leftJoinAndSelect('groups.organisation', 'organisation')
        .leftJoin('organisation.lmsGroup', 'lmsGroup')
        .leftJoin('course.categories', 'categories')
        .leftJoinAndSelect('course.permissions', 'permissions')
        .leftJoin('permissions.groups', 'g')

      if (organisationIds) {
        queryCourse.where((qb) => {
          const rawQuery = qb.subQuery()
          .select('orgs.course_id')
          .from('organisation_course_permissions', 'orgs')
          .where('orgs.organisation_id IN (:...organisationIds)', { organisationIds })

          const subQuery = rawQuery.getQuery();

          return `course.id IN ${subQuery}`;
        })
      }

      if (title) {
        queryCourse.andWhere('course.title LIKE :title', { title: `%${title.toLowerCase()}%` });
      }

      if (idLmsGroup) {
        queryCourse.where((qb) => {
          const rawQuery = qb.subQuery()
          .select('lmsGroupPermission.course_id')
          .from('lms_group_course_permissions', 'lmsGroupPermission')
          .where('lmsGroupPermission.lms_group_id = :idLmsGroup', { idLmsGroup })

          const subQuery = rawQuery.getQuery();

          return `course.id IN ${subQuery}`;
        })
      }

      if (admin.roles.includes(UserRole.COURSE_CREATOR) && admin.roles.length === 1) {
        queryCourse.andWhere('courseLog.createdBy = :adminId', { adminId: admin.id })
      }

      if (isOnlyOrderable) {
        queryCourse.andWhere('course.isOrderable = :isOnlyOrderable', { isOnlyOrderable })
      }

      if (isOnlyPublished) {
        const status = CourseStatus.Published;
        queryCourse.andWhere('course.status = :status', { status });
      }

      if (groupId) {
        queryCourse.andWhere('groups.id = :groupId', { groupId });
      }

      const courses = await queryCourse.getMany();
      const filteredCourses = await this.tools.getFilteredCoursesByPermission(admin, courses, isEdit);

      return filteredCourses;
    } catch (e) {
      throw new HttpException({ error: 'Error create assignment' }, HttpStatus.BAD_REQUEST);
    }
  }

  private async getLmsPermissions(courseIds: number[], ids: number[]): Promise<IPermission[]> {
    const queryCourse = await this.connection
      .getRepository(LmsGroupCoursePermissions)
      .createQueryBuilder('lms_group_course_permissions')
      .leftJoinAndSelect('lms_group_course_permissions.permission', 'permission')
      .leftJoinAndSelect('lms_group_course_permissions.course', 'course')
      .leftJoinAndSelect('lms_group_course_permissions.lmsGroup', 'lmsGroup')
      .where('course_id IN (:...courseIds)', { courseIds })
      .andWhere('lms_group_id IN (:...ids)', { ids })
      .getMany();

    return courseIds.map(courseId => {
      const permissionItems = ids.map(id => {
        const permissionItem: IsPermissions = {
          id,
          permissionId: null,
        }
        queryCourse.forEach(item => {
          if (item.course.id === courseId && item.lmsGroup.id === id) {
            permissionItem.permissionId = item.permission?.id;
          }
        })

        return permissionItem
      });

      return {
        permissionItems,
        id: courseId,
      };
    });
  }

  private async getOrganisationPermissions(courseIds: number[], ids: number[]): Promise<IPermission[]> {
    const queryCourse = await this.connection
      .getRepository(OrganisationCoursePermissions)
      .createQueryBuilder('organisation_course_permissions')
      .leftJoinAndSelect('organisation_course_permissions.permission', 'permission')
      .leftJoinAndSelect('organisation_course_permissions.course', 'course')
      .leftJoinAndSelect('organisation_course_permissions.organisation', 'organisation')
      .where('course_id IN (:...courseIds)', { courseIds })
      .andWhere('organisation_id IN (:...ids)', { ids })
      .getMany();

    return courseIds.map(courseId => {
      const permissionItems = ids.map(id => {
        const permissionItem: IsPermissions = {
          id,
          permissionId: null,
        }
        queryCourse.forEach(item => {
          if (item.course.id === courseId && item.organisation.id === id) {
            permissionItem.permissionId = item.permission?.id;
          }
        })

        return permissionItem
      });

      return {
        permissionItems,
        id: courseId,
      };
    });
  }

  private async getGroupsPermissions(courseIds: number[], ids: number[]): Promise<IPermission[]> {
    const queryCourse = await this.connection
      .getRepository(GroupCoursePermissions)
      .createQueryBuilder('group_course_permissions')
      .leftJoinAndSelect('group_course_permissions.permission', 'permission')
      .leftJoinAndSelect('group_course_permissions.course', 'course')
      .leftJoinAndSelect('group_course_permissions.group', 'group')
      .where('course_id IN (:...courseIds)', { courseIds })
      .andWhere('group_id IN (:...ids)', { ids })
      .getMany();

    return courseIds.map(courseId => {
      const permissionItems = ids.map(id => {
        const permissionItems: IsPermissions = {
          id,
          permissionId: null,
        }
        queryCourse.forEach(item => {
          if (item.course.id === courseId && item.group.id === id) {
            permissionItems.permissionId = item.permission?.id;
          }
        })

        return permissionItems
      });

      return {
        permissionItems,
        id: courseId,
      };
    });
  }

  public async getCoursePermission(query: PermissionDto): Promise<IPermission[]> {
    try {
      const {ids: lmsGroupIds, courseIds, permissionLevel} = query;
console.log('---courseIds', courseIds)
console.log('---permissionLevel', permissionLevel)
const ids = lmsGroupIds || []
      if (permissionLevel === PERMISSION_LEVELS.lms) {
        return await this.getLmsPermissions(courseIds, ids);
      }

      if (permissionLevel === PERMISSION_LEVELS.organisation) {
        return this.getOrganisationPermissions(courseIds, ids);
      }

      if (permissionLevel === PERMISSION_LEVELS.group) {
        return this.getGroupsPermissions(courseIds, ids);
      }
    } catch (e) {
      throw new BadRequestException({ error: 'Can\'t update lesson info' });
    }
  }

  private async setLmsCoursePermissions(
    id: number,
    lmsId: number,
    permissionId: number,
    transactionEntityManager,
  ) {
    const lmsGroupCoursePermission = await transactionEntityManager
      .findOne(LmsGroupCoursePermissions, {
        course: new Course({ id }),
        lmsGroup: new LmsGroup({ id: lmsId }),
      });
    const newLmsGroupCoursePermission = lmsGroupCoursePermission ||
      new LmsGroupCoursePermissions({
        course: new Course({ id }),
        lmsGroup: new LmsGroup({ id: lmsId }),
      });

    newLmsGroupCoursePermission.permission = new Permission({ id: permissionId });
    await transactionEntityManager.save(newLmsGroupCoursePermission)
  }

  private async setOrganisationCoursePermissions(
    id: number,
    organisationId: number,
    permissionId: number,
    transactionEntityManager,
    ) {
    const organisationCoursePermissions = await transactionEntityManager
      .findOne(OrganisationCoursePermissions, {
        course: new Course({ id }),
        organisation: new Organisation({ id: organisationId }),
      });
    const newOrganisationCoursePermissions = organisationCoursePermissions ||
      new OrganisationCoursePermissions({
        course: new Course({ id }),
        organisation: new Organisation({ id: organisationId }),
      });

    newOrganisationCoursePermissions.permission = new Permission({ id: permissionId });
    await transactionEntityManager.save(newOrganisationCoursePermissions)
  }

  private async setGroupCoursePermissions(
    id: number,
    groupId: number,
    permissionId: number,
    transactionEntityManager,
  ) {
    const groupCoursePermissions = await transactionEntityManager
      .findOne(GroupCoursePermissions, {
        course: new Course({ id }),
        group: new Group({ id: groupId }),
      });
    const newGroupCoursePermissions = groupCoursePermissions ||
      new GroupCoursePermissions({
        course: new Course({ id }),
        group: new Group({ id: groupId }),
      });

    newGroupCoursePermissions.permission = new Permission({ id: permissionId });
    await transactionEntityManager.save(newGroupCoursePermissions)
  }

  public async setLmsPermissions(body: IPermissionDto): Promise<HttpStatus> {
    const { courses, isRewrite } = body;
    try {
      await this.connection.transaction(async (transactionEntityManager) => {
        await Promise.all(courses.map(async (item) => {
          const { id, permissionItems: lmsGroups } = item;
          await Promise.all(lmsGroups.map(async (lmsGroup) => {
            const { id: lmsId, permissionId } = lmsGroup;
            await this.setLmsCoursePermissions(id, lmsId, permissionId, transactionEntityManager);

            const organisationEntities = await transactionEntityManager
              .getRepository(Organisation)
              .createQueryBuilder('org')
              .leftJoin('org.lmsGroup', 'lms')
              .leftJoinAndSelect('org.groups', 'groups')
              .where('lms.id = :id', { id: lmsId })
              .getMany();

            const organisationIds = organisationEntities.map(organisation => organisation.id);
            const groupsEntities = organisationEntities.reduce((acc, organisation) => {
              return [...acc, ...organisation.groups]
            }, [])
            const groupIds = groupsEntities.map(group => group.id);

            if (permissionId === PERMISSION_NO_ACCESS_ID) {
              if (organisationIds.length) {
                await Promise.all(organisationIds.map(organisationId => {
                  return this.setOrganisationCoursePermissions(id, organisationId, PERMISSION_NO_ACCESS_ID, transactionEntityManager);
                }))
              }

              if (groupIds.length) {
                await Promise.all(groupIds.map(groupId => {
                  return this.setGroupCoursePermissions(id, groupId, PERMISSION_NO_ACCESS_ID, transactionEntityManager);
                }))
              }
            }

            if (isRewrite && (permissionId === PERMISSION_ACCESS_ID || permissionId === PERMISSION_FULL_ACCESS)) {

              await Promise.all(organisationEntities.map(organisation => {
                return this.setOrganisationCoursePermissions(id, organisation.id, permissionId, transactionEntityManager);
              }))

              await Promise.all(groupsEntities.map(group => {
                return this.setGroupCoursePermissions(id, group.id, permissionId, transactionEntityManager);
              }))
            }
          }))
        }))
      });

      return HttpStatus.OK;
    } catch (e) {
      throw new HttpException({ error: 'Error saving lms permissions' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async setOrganisationPermissions(body: IPermissionDto): Promise<HttpStatus> {
    const { courses, isRewrite } = body;
    try {
      await this.connection.transaction(async (transactionEntityManager) => {
        await Promise.all(courses.map(async (item) => {
          const { id, permissionItems: organisations } = item;
          await Promise.all(organisations.map(async (organisation) => {
            const { id: organisationId, permissionId } = organisation;

            const organisationCoursePermissions = await transactionEntityManager
              .findOne(OrganisationCoursePermissions, {
                course: new Course({ id }),
                organisation: new Organisation({ id: organisationId }),
              });
            const newOrganisationCoursePermissions = organisationCoursePermissions ||
              new OrganisationCoursePermissions({
                course: new Course({ id }),
                organisation: new Organisation({ id: organisationId }),
              });

            newOrganisationCoursePermissions.permission = new Permission({ id: permissionId });
            await transactionEntityManager.save(newOrganisationCoursePermissions)

            const groupsEntities = await transactionEntityManager
              .getRepository(Group)
              .createQueryBuilder('group')
              .leftJoin('group.organisation', 'organisation')
              .where('organisation.id = :id', { id: organisationId })
              .getMany();

            const groupIds = groupsEntities.map(group => group.id);

            if (permissionId === PERMISSION_NO_ACCESS_ID) {
              if (groupIds.length) {
                await Promise.all(groupIds.map(groupId => {
                  return this.setGroupCoursePermissions(id, groupId, PERMISSION_NO_ACCESS_ID, transactionEntityManager);
                }))
              }
            }

            if (isRewrite && (permissionId === PERMISSION_ACCESS_ID || permissionId === PERMISSION_FULL_ACCESS)) {
              await Promise.all(groupsEntities.map(groupsEntitie => {
                return this.setGroupCoursePermissions(id, groupsEntitie.id, permissionId, transactionEntityManager);
              }))
            }
          }))
        }))
      });

      return HttpStatus.OK;
    } catch (e) {
      throw new HttpException({ error: 'Error saving lms permissions' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async setGroupsPermissions(body: IPermissionDto): Promise<HttpStatus> {
    const { courses } = body;
    try {
      await this.connection.transaction(async (transactionEntityManager) => {
        await Promise.all(courses.map(async (item) => {
          const { id, permissionItems: groups } = item;
          await Promise.all(groups.map(async (group) => {
            const { id: groupId, permissionId } = group;

            const groupCoursePermissions = await transactionEntityManager
              .findOne(GroupCoursePermissions, {
                course: new Course({ id }),
                group: new Group({ id: groupId }),
              });
            const newOrganisationCoursePermissions = groupCoursePermissions ||
              new GroupCoursePermissions({
                course: new Course({ id }),
                group: new Group({ id: groupId }),
              });

            newOrganisationCoursePermissions.permission = new Permission({ id: permissionId });
            await transactionEntityManager.save(newOrganisationCoursePermissions)
          }))
        }))
      });

      return HttpStatus.OK;
    } catch (e) {
      throw new HttpException({ error: 'Error saving lms permissions' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async setCoursePermission(body: IPermissionDto): Promise<HttpStatus> {
    const { permissionLevel } = body;

    if (permissionLevel === PERMISSION_LEVELS.lms) {
     return this.setLmsPermissions(body);
    }

    if (permissionLevel === PERMISSION_LEVELS.organisation) {
      return this.setOrganisationPermissions(body);
    }

    if (permissionLevel === PERMISSION_LEVELS.group) {
      return this.setGroupsPermissions(body);
    }

    throw new HttpException({ error: 'Invalid permission level' }, HttpStatus.BAD_REQUEST);
  }

  public async createCourse(dataCourse: CreateCourseDto, uploads, user: User): Promise<Course> {
    const handledUploads = _.flattenDeep(_.valuesIn(uploads));

    const courseExist = await this.entityManager.findOne(Course, { title: dataCourse.title });

    if (courseExist) {
      throw new BadRequestException({ error: 'Course already exist' });
    }

    const handledFile = handledUploads.reduce((previousValue, currentValue)  => {
      if (currentValue.fieldname === IMAGE_FILE) {
        return {
          ...previousValue,
          imageFile: currentValue,
        }
      }

      return {
        ...previousValue,
        noImageFile: [...previousValue.noImageFile, currentValue],
      }
    }, {imageFile: undefined, noImageFile: []});

    if (handledFile.imageFile) {
      this.tools.checkFileValid(handledFile.imageFile, ALLOWED_AVATAR_MIMETYPES, ALLOWED_AVATAR_MAX_SIZE);
    }

    if (handledFile.noImageFile && handledFile.noImageFile.length) {
      this.tools.checkFilesValidTypes(
        handledFile.noImageFile,
        FILES_COURSE_TEMPLATE_MIMETYPES,
      );
    }

    const uploadResults = await Promise.all(
      handledUploads.map(async (file: FileTemplateDto) => {
        const { url } = await this.uploadService.upload(file, FILE_TEMPLATE);

        return {
          url,
          name: file.fieldname,
          originalName: file.originalname,
        };
      }),
    );

    const {
      certificateTemplate,
      welcomeEmailTemplate,
      welcomeLetterTemplate,
      imageFile,
    } = uploadResults.reduce(
      (obj, { name, url, originalName }) => {
        obj[name] = name === CERTIFICATE_TEMPLATE ? { url, originalName } : url;

        return obj;
      },
      {
        certificateTemplate: {
          url: '',
          originalName: '',
        },
        welcomeEmailTemplate: '',
        welcomeLetterTemplate: '',
        imageFile: '',
      },
    );

    const language = await this.entityManager.findOne(Language, { id: dataCourse.language });
    const tutors = dataCourse.tutorIds
      ? await this.entityManager.findByIds(User, dataCourse.tutorIds)
      : [];

    const courseCertificateTemplate = dataCourse.certificate
      ? await this.entityManager.findOne(CourseCertificate, { id: dataCourse.certificate })
      : null;

    const courseCertificateEntity = new CourseCertificate({
      url: certificateTemplate.url,
      originalName: certificateTemplate.originalName,
      dontShowExams: false,
      signatures: '',
    });

    const courseCertificateUploadFile = certificateTemplate.url
      ? await this.entityManager.save(courseCertificateEntity)
      : null;

    const courseAttachment = dataCourse.fileIds
      ? await this.entityManager.findByIds(CourseAttachment, dataCourse.fileIds)
      : [];

    const creatorEmail = await this.connection
      .getRepository(UserEmail)
      .createQueryBuilder('emails')
      .where('emails.user = :adminId', { adminId: user.id })
      .getOne();

    const courseCategories = dataCourse.categoriesIds.map(item => new CourseCategory({ id: item }))
    const saveData = {
      ...omit(['tutorsId', 'fileId', 'certificate'], dataCourse),
      language,
      tutors,
      courseAttachment,
      title: dataCourse.title,
      time: {
        complete: dataCourse.timeToComplete,
        access: dataCourse.accessTime,
      },
      media: { hasPhysical: dataCourse.hasPhysical, info: null },
      courseCertificate: courseCertificateUploadFile || courseCertificateTemplate,
      senderEmail: dataCourse.senderEmail || creatorEmail.email,
      senderName: dataCourse.senderName || `${user.firstName} ${user.lastName}`,
      categories: courseCategories,
      imageUri: imageFile,
      ...{ welcomeEmailTemplate, welcomeLetterTemplate },
    };

    const course = new Course({
      ..._.omit(saveData, 'translations'),
    });

    const courseLog = new CourseLog({
      course,
      createdBy: user,
      changedBy: user,
    });

    const courseTranslations = this.tools.getArrayOfTranslations(dataCourse, course)

    await this.entityManager.save([
      course,
      courseLog,
      ...courseTranslations,
    ]);

    const dataForSavePermissions = this.getPermissionDataForCreatedCourse(user, course);

    if (dataForSavePermissions) {
      await this.setCoursePermission(dataForSavePermissions);
    }

    return this.getCourseById(course.id, user);
  }

  private getPermissionDataForCreatedCourse(user: User, course: Course) {
    const { roles, lmsGroups, organisations } = user;
    if (roles.includes(UserRole.ADMIN_LMS)) {
      return {
        permissionLevel: PERMISSION_LEVELS.lms,
        isRewrite: false,
        courses: [{
          id: course.id,
          permissionItems: lmsGroups.map(item => {
            return {
              id: item.id,
              permissionId: 3,
            }
          })
        }]
      }
    }

    if (roles.includes(UserRole.ADMIN_ORGANISATION)) {
      return {
        permissionLevel: PERMISSION_LEVELS.organisation,
        isRewrite: false,
        courses: [{
          id: course.id,
          permissionItems: organisations.map(item => {
            return {
              id: item.id,
              permissionId: 3,
            }
          })
        }]
      }
    }

    return null;
  }

  public async changeStatusCourse(dataStatus: ChangeCourseStatusDto, user): Promise<HttpStatus> {
    try {
      const { courseId, status } = dataStatus;
      const courseEntity = await this.entityManager.findOne(Course, { id: courseId });

      if (!courseEntity) {
        throw new NotFoundException({
          error: 'Course with that id not found',
          isCustomError: true,
        });
      }

      await this.tools.checkAccessToCourseCourseCreator(user, courseEntity.id);

      courseEntity.status = status;
      await this.entityManager.save(courseEntity);
      await this.connection
        .createQueryBuilder()
        .delete()
        .from(CourseStudent)
        .where('course = :courseId', { courseId })
        .execute()

      return HttpStatus.OK;
    } catch (e) {
      throw new HttpException(
        e.message.isCustomError
          ? { error: e.message.error }
          : { error: 'Error update status of course' },
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  public async changeTimeCourse(courseTime: CourseTimeDto): Promise<HttpStatus> {
    const { startAt, wishedDoneDate, courseStudentId } = courseTime;
    const courseStudent = await this.entityManager.findOne(CourseStudent, { id: courseStudentId });

    const newStartAtDoneAtInvalid = startAt >= wishedDoneDate;
    const newDoneAtInvalid = !startAt && courseStudent.startAt >= wishedDoneDate;
    const newStartAtInvalid = !wishedDoneDate && courseStudent.studyPlan.wishedDoneDate <= startAt;

    if (newStartAtDoneAtInvalid || newDoneAtInvalid || newStartAtInvalid) {
      throw new BadRequestException({ error: 'Error set date' });
    }

    courseStudent.startAt = startAt;
    courseStudent.studyPlan.wishedDoneDate =
      wishedDoneDate || courseStudent.studyPlan.wishedDoneDate;

    await this.entityManager.save(courseStudent).catch(() => {
      throw new BadRequestException({ error: 'Error to save date to database' });
    });

    return HttpStatus.OK;
  }

  public async searchCourseTopics({ name }: CourseTopicsSearchDto): Promise<any> {
    const topics = await this.connection
      .getRepository(CourseTopic)
      .createQueryBuilder('course_topic')
      .leftJoinAndSelect('course_topic.topic', 'topic')
      .leftJoinAndSelect('course_topic.course', 'course')
      .where('LOWER(topic.name) like :name', { name: `%${name.toLowerCase()}%` })
      .orderBy('topic.name', 'ASC')
      .getMany();
    const topicsWithId = topics.map((item, i) => {
      return {
        ...item,
        id: i
      }
    })

    return topicsWithId;
  }

  public async getCourseTopicById(id: number, user): Promise<Topic> {
    try {
      const topic = await this.connection
        .getRepository(Topic)
        .createQueryBuilder('topic')
        .leftJoinAndSelect('topic.lessons', 'lessons')
        .leftJoinAndSelect('topic.files', 'topicFiles')
        .leftJoinAndSelect('topicFiles.fileTopics', 'fileTopics')
        .leftJoinAndSelect('topic.exams', 'exams', 'exams.lesson IS NULL')
        .leftJoinAndSelect('topic.assignments', 'assignments')
        .orderBy('lessons.order, assignments.order, exams.order')
        .where({ id })
        .getOne();

      if (!topic) {
        throw new NotFoundException({
          error: 'Course lesson with that id not found',
          isCustomError: true,
        });
      }

      const courseTopic = await this.connection
        .getRepository(CourseTopic)
        .createQueryBuilder('courseTopic')
        .leftJoinAndSelect('courseTopic.course', 'course')
        .where('courseTopic.topic = :topic', { topic: topic.id })
        .getOne()

      if (courseTopic) {
        const { course } = courseTopic;

        await this.tools.checkAccessToCourseCourseCreator(user, course.id);
      }

      return topic;
    } catch (e) {
      throw new HttpException(
        e.message.isCustomError
          ? { error: e.message.error }
          : { error: 'Error getting course lessons' },
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  public async searchFileTopics(searchData: FileTopicsSearchDto): Promise<FileTopics[]> {
    const { header, createdAt } = searchData;

    const query = await this.connection.getRepository(FileTopics).createQueryBuilder('fileTopics');

    if (createdAt) {
      query.andWhere('fileTopics.createdAt >= :createdAt', { createdAt });
    }

    if (header) {
      query.andWhere('LOWER(fileTopics.header) LIKE :header', {
        header: `%${header.toLowerCase()}%`,
      });
    }

    return query.getMany();
  }

  public async searchFile(searchData: FilesSearchDto): Promise<CourseAttachment[]> {
    const { name, header, createdAt } = searchData;

    const query = this.connection
      .getRepository(CourseAttachment)
      .createQueryBuilder('courseAttachment')
      .leftJoinAndSelect('courseAttachment.fileTopics', 'fileTopics');

    if (header) {
      query.andWhere('LOWER(fileTopics.header) LIKE :header', {
        header: `%${header.toLowerCase()}%`,
      });
    }

    if (createdAt) {
      query.andWhere('courseAttachment.createdAt >= :createdAt', { createdAt });
    }

    if (name) {
      query.andWhere('LOWER(courseAttachment.name) LIKE :name', {
        name: `%${name.toLowerCase()}%`,
      });
    }

    return query.getMany();
  }

  public async getFilesByHeader(
    headerId: number,
    searchData: FilesSearchDto,
  ): Promise<CourseAttachment[]> {
    try {
      const { createdAt } = searchData;

      const query = await this.connection
        .getRepository(CourseAttachment)
        .createQueryBuilder('courseAttachment')
        .leftJoinAndSelect('courseAttachment.fileTopics', 'fileTopics')
        .andWhere('fileTopics.id = :id', { id: headerId });

      if (createdAt) {
        query.andWhere('courseAttachment.createdAt >= :createdAt', { createdAt });
      }

      return query.getMany();
    } catch (e) {
      throw new HttpException({ error: 'Error searching files' }, HttpStatus.BAD_REQUEST);
    }
  }

  public async uploadFile(
    uploadData: UploadFileDto,
    file: FileTemplateDto,
  ): Promise<CourseAttachment> {
    const { name, header, id, topicId } = uploadData;

    const fileTopic = await this.connection
      .getRepository(Topic)
      .createQueryBuilder('topic')
      .where('topic.id = :id', { id: topicId })
      .getOne();

    if (id) {
      const copyFile = await this.connection
        .getRepository(CourseAttachment)
        .createQueryBuilder('courseAttachment')
        .leftJoinAndSelect('courseAttachment.fileTopics', 'fileTopics')
        .leftJoinAndSelect('courseAttachment.lesson', 'lesson')
        .where('courseAttachment.id = :id', { id })
        .getOne();

      const newFile = _.omit(copyFile, 'id');
      const createdFile = new CourseAttachment({ ...newFile, topic: fileTopic, createdAt: new Date() });

      return this.entityManager.save(createdFile);
    }
    if (!file) {
      throw new BadRequestException({ error: 'File is not select' });
    }

    if (!FILES_COURSE_MIMETYPES.includes(file.mimetype)) {
      throw new BadRequestException({ error: 'Invalid file format' });
    }

    const fileExists = await this.connection
      .getRepository(CourseAttachment)
      .createQueryBuilder('courseAttachment')
      .leftJoin('courseAttachment.fileTopics', 'fileTopics')
      .andWhere('fileTopics.header = :header', { header })
      .andWhere('courseAttachment.name = :name', { name })
      .getOne();

    if (fileExists) {
      throw new BadRequestException({ error: 'File with that name is exists in this header' });
    }

    const saveTopics = new FileTopics({
      header,
      createdAt: new Date(),
    });
    const { url } = await this.uploadService.upload(file, 'attachment_for_course');
    const fileTopics =
      (await this.entityManager.findOne(FileTopics, { header })) ||
      (await this.entityManager.save(saveTopics));

    const fileSave = new CourseAttachment({
      name,
      fileTopics,
      url,
      createdAt: new Date(),
      topic: fileTopic,
    });

    return this.entityManager.save(fileSave);
  }

  public async editUploadFile(
    uploadData: UploadFileDto,
    file: FileTemplateDto,
    fileId: number,
  ): Promise<CourseAttachment> {
    const { name, header } = uploadData;

    if (file && !FILES_COURSE_MIMETYPES.includes(file.mimetype)) {
      throw new BadRequestException({ error: 'Invalid file format' });
    }

    const saveTopics = new FileTopics({
      header,
      createdAt: new Date(),
    });
    const fileTopics =
      (await this.entityManager.findOne(FileTopics, { header })) ||
      (await this.entityManager.save(saveTopics));

    const { url } = file
      ? await this.uploadService.upload(file, 'attachment_for_course')
      : await this.entityManager.findOne(CourseAttachment, { id: fileId });

    const dateSave = {
      name,
      fileTopics,
      url,
    };

    await this.entityManager.update(CourseAttachment, fileId, dateSave);

    const updateFile = await this.connection
      .getRepository(CourseAttachment)
      .createQueryBuilder('courseAttachment')
      .leftJoinAndSelect('courseAttachment.fileTopics', 'fileTopics')
      .andWhere('courseAttachment.name = :name', { name })
      .getOne();

    if (!updateFile) {
      throw new BadRequestException({ error: 'File not update' });
    }

    return updateFile;
  }

  public async deleteUploadFile(id: number): Promise<HttpStatus> {
    await this.entityManager.delete(CourseAttachment, { id });

    return HttpStatus.OK;
  }

  public async getCoursesByFile(fileId): Promise<Course[]> {
    return this.connection
      .getRepository(Course)
      .createQueryBuilder('course')
      .leftJoin('course.courseAttachment', 'courseAttachment')
      .select('course.id as id, course.title as title')
      .where('courseAttachment.id = :fileId', { fileId })
      .getRawMany();
  }

  public async getCourseById(courseId: number, user): Promise<Course> {
    await this.tools.checkAccessToCourseCourseCreator(user, courseId);
    try {
      const courseEntity = await this.connection
        .getRepository(Course)
        .createQueryBuilder('course')
        .leftJoinAndSelect('course.categories', 'categories')
        .leftJoinAndSelect('course.translations', 'translations')
        .leftJoinAndSelect('translations.language', 'translationsLanguage')
        .leftJoinAndSelect('course.language', 'language')
        .leftJoinAndSelect('course.tutors', 'tutors')
        .leftJoinAndSelect('course.courseTopics', 'courseTopics')
        .leftJoinAndSelect('course.courseCertificate', 'certificate')
        .leftJoinAndSelect('courseTopics.topic', 'topic')
        .leftJoinAndSelect('course.courseAttachment', 'courseAttachment', 'courseAttachment.lesson IS NULL')
        .leftJoinAndSelect('courseAttachment.fileTopics', 'fileTopics')
        .where({ id: courseId })
        .orderBy('courseTopics.order', 'ASC')
        .getOne();

      if (!courseEntity) {
        throw new NotFoundException({
          error: 'Course with that id not found',
          isCustomError: true,
        });
      }

      return courseEntity;
    } catch (e) {
      throw new HttpException(
        e.message.isCustomError
          ? { error: e.message.error }
          : { error: 'Error update status of course' },
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  public async updateCourse(dataCourse: UpdateCourseDto, uploads, user: User): Promise<Course> {
    const { topics, id, tutorIds } = dataCourse;
    await this.tools.checkAccessToCourseCourseCreator(user, id);
    const tutors = await this.entityManager.getRepository(User).findByIds(tutorIds)
    const handledUploads = _.flattenDeep(_.valuesIn(uploads));
    const handledFile = handledUploads.reduce((previousValue, currentValue)  => {
      if (currentValue.fieldname === IMAGE_FILE) {
        return {
          ...previousValue,
          imageFile: currentValue,
        }
      }

      return {
        ...previousValue,
        noImageFile: [...previousValue.noImageFile, currentValue],
      }
    }, {imageFile: undefined, noImageFile: []});

    if (handledFile.imageFile) {
      this.tools.checkFileValid(handledFile.imageFile, ALLOWED_AVATAR_MIMETYPES, ALLOWED_AVATAR_MAX_SIZE);
    }

    const courseExist = await this.entityManager.findOne(Course, { title: dataCourse.title });

    if (courseExist && courseExist.id !== id) {
      throw new BadRequestException({ error: 'Course already exist' });
    }

    if (handledFile.noImageFile && handledFile.noImageFile.length) {
      this.tools.checkFilesValidTypes(
        handledFile.noImageFile,
        FILES_COURSE_TEMPLATE_MIMETYPES,
      );
    }

    const uploadResultsPromise = handledUploads.map(async (file: FileTemplateDto) => {
      if (file) {
        const { url } = await this.uploadService.upload(file, FILE_TEMPLATE);

        return {
          url,
          name: file.fieldname,
          originalName: file.originalname,
        };
      }
    })

    const uploadResults = await Promise.all(uploadResultsPromise);

    const {
      certificateTemplate,
      welcomeEmailTemplate,
      welcomeLetterTemplate,
      imageFile,
    } = uploadResults.reduce(
      (obj, { name, url, originalName }) => {
        obj[name] = name === CERTIFICATE_TEMPLATE ? { url, originalName } : url; // TODO: add original file name

        return obj;
      },
      {
        certificateTemplate: {
          url: '',
          originalName: '',
        },
        imageFile: '',
        welcomeEmailTemplate: '',
        welcomeLetterTemplate: '',
      },
    );

    const welcomeEmailTemplateURL = dataCourse.welcomeEmailTemplateURL || '';
    const welcomeLetterTemplateURL = dataCourse.welcomeLetterTemplateURL || '';
    const imageFileURi = dataCourse.imageUri || '';

    const language = await this.entityManager.findOne(Language, { id: dataCourse.language });
    const courseCertificateTemplate = dataCourse.certificate
      ? await this.entityManager.findOne(CourseCertificate, { id: dataCourse.certificate })
      : null;

    const courseCertificateEntity = new CourseCertificate({
      url: certificateTemplate.url,
      originalName: certificateTemplate.originalName,
      dontShowExams: false,
      signatures: '',
    });

    const courseCertificateUploadFile = certificateTemplate.url
      ? await this.entityManager.save(courseCertificateEntity)
      : null;

    const courseAttachments = dataCourse.fileIds.map(item => {
      return new CourseAttachment({ id: item })
    })

    const creatorEmail = await this.connection
      .getRepository(UserEmail)
      .createQueryBuilder('emails')
      .where('emails.user = :adminId', { adminId: user.id })
      .getOne();

    const categories = dataCourse.categoriesIds.map(item => new CourseCategory({ id: item }));
    const saveData = {
      ...omit(['tutorId', 'fileId', 'certificate'], dataCourse),
      tutors,
      language,
      categories,
      welcomeEmailTemplate: welcomeEmailTemplate || welcomeEmailTemplateURL,
      welcomeLetterTemplate: welcomeLetterTemplate || welcomeLetterTemplateURL,
      imageUri: imageFile || imageFileURi,
      time: {
        complete: dataCourse.timeToComplete,
        access: dataCourse.accessTime,
      },
      courseCertificate: courseCertificateUploadFile || courseCertificateTemplate,
      courseAttachment: courseAttachments,
      media: { hasPhysical: dataCourse.hasPhysical, info: null },
      senderEmail: dataCourse.senderEmail || creatorEmail.email,
      senderName: dataCourse.senderName || `${user.firstName} ${user.lastName}`,
    };
    // TODO: fix types
    const course = new Course({ ...saveData } as any);
    const courseLog = await this.entityManager.findOne(CourseLog, { course });
    courseLog.changedBy = user;
    courseLog.updatedAt = moment().toDate();

    const courseTranslations = this.tools.getArrayOfTranslations(dataCourse, course)
    this.entityManager.transaction(async transactionEntityManager => {
      if (topics.length) {
        await transactionEntityManager
          .createQueryBuilder()
          .delete()
          .from(CourseTopic, 'ct')
          .where('course_id = :id', { id })
          .andWhere('topic_id NOT IN (:...topics)', { topics })
          .execute();
      }

      const courseTopics = await transactionEntityManager
        .getRepository(CourseTopic)
        .createQueryBuilder('ct')
        .leftJoinAndSelect('ct.course', 'course')
        .leftJoinAndSelect('ct.topic', 'topic')
        .where('course.id = :id', { id })
        .getMany()

      const checkTopics = topics || [];
      const newTopics = checkTopics.map((item, idx) => {
        const findExist = courseTopics.some(topic => topic.topic.id === item);
        if (!findExist) {
          const newTopic = new Topic({ id: item })
          const order = idx;

          return new CourseTopic({ course, order, topic: newTopic, });
        }

        return null;
      }).filter(Boolean);

      await transactionEntityManager.save([
        course,
        courseLog,
        ...courseTranslations,
        ...newTopics,
      ]);
    })

    const result = await this.getCourseById(course.id, user);

    return result;
  }

  public async updateCourseTopics(
    courseId: number,
    courseTopicsData: UpdateCourseTopicsDto,
    user: User,
  ): Promise<Course> {
    const course = await this.getCourseById(courseId, user);
    if (!course) {
      throw new NotFoundException({ error: 'Course is not found' });
    }

    await this.tools.checkAccessToCourseCourseCreator(user, course.id);

    const { toCopyOrCurrentTopics, toCreateTopics } = courseTopicsData.topics.reduce(
      (
        { toCopyOrCurrentTopics, toCreateTopics },
        topicIdOrTopicName: string | number,
        idx: number,
      ) => {
        if (typeof topicIdOrTopicName === 'string') {
          return {
            toCopyOrCurrentTopics,
            toCreateTopics: [...toCreateTopics, { order: idx, name: topicIdOrTopicName }],
          };
        }

        return {
          toCreateTopics,
          toCopyOrCurrentTopics: [...toCopyOrCurrentTopics, { order: idx, id: topicIdOrTopicName }],
        };
      },
      { toCopyOrCurrentTopics: [], toCreateTopics: [] } as {
        toCopyOrCurrentTopics: ToCopyTopic[];
        toCreateTopics: ToCreateTopic[];
      },
    );
    const currentCourseTopicIds = course.courseTopics.map<number>(path(['topic', 'id']));
    const toRemoveTopicIds = currentCourseTopicIds.filter(
      currentTopicId => !pluck('id', toCopyOrCurrentTopics).includes(currentTopicId),
    );
    const toRemoveTopics = await this.entityManager.findByIds(Topic, toRemoveTopicIds);
    const toCopyTopics = toCopyOrCurrentTopics.filter(
      topic => !currentCourseTopicIds.includes(topic.id),
    );

    const topics = await this.entityManager.findByIds(Topic, pluck('id', toCopyTopics), {
      relations: ['lessons', 'assignments', 'exams'],
    });

    if (topics.length !== toCopyTopics.length) {
      throw new BadRequestException('Not all copied topics are found');
    }

    const { copiedTopics, copiedLessons, copiedAssignments, copiedExams } = topics.reduce(
      (acc, topic: Topic) => {
        const newTopic = new Topic(omit(['id', 'lessons', 'assignments', 'exams'], topic));
        const newLessons = topic.lessons.map(copyLesson(newTopic));
        const newAssignments = topic.assignments.map(copyAssignment(newTopic));
        const newExams = topic.exams.map(copyExam(newTopic));

        return {
          copiedTopics: [...acc.copiedTopics, newTopic],
          copiedLessons: [...acc.copiedLessons, ...newLessons],
          copiedAssignments: [...acc.copiedAssignments, ...newAssignments],
          copiedExams: [...acc.copiedExams, ...newExams],
        };
      },
      {
        copiedTopics: [],
        copiedLessons: [],
        copiedAssignments: [],
        copiedExams: [],
      },
    );
    const createdTopics = toCreateTopics.map(({ name }: ToCreateTopic) => new Topic({ name }));
    const courseTopics = concat<[Topic, ToCopyTopic | ToCreateTopic]>(
      zip(copiedTopics, toCopyTopics),
      zip(createdTopics, toCreateTopics),
    ).map(
      ([topic, { order }]: [Topic, ToCopyTopic | ToCreateTopic]) =>
        new CourseTopic({ topic, order, course }),
    );
    const courseLog = await this.entityManager.findOne(CourseLog, { course });
    courseLog.changedBy = user;
    courseLog.updatedAt = moment().toDate();

    await this.entityManager.transaction(async transactionalEntityManager => {
      await Promise.all(
        toRemoveTopics.map(topic => transactionalEntityManager.delete(CourseTopic, { topic })),
      );
      await transactionalEntityManager.save([
        courseLog,
        ...copiedTopics,
        ...copiedLessons,
        ...copiedAssignments,
        ...copiedExams,
        ...createdTopics,
        ...courseTopics,
      ]);
    });

    return this.getCourseById(courseId, user);
  }

  public async updateCourseTutors(
    courseId: number,
    courseTutorsData: UpdateCourseTutorsDto,
    user: User,
  ): Promise<Course> {
    const course = await this.entityManager.findOne(Course, courseId);

    if (!course) {
      throw new NotFoundException({ error: 'Course is not found' });
    }

    await this.tools.checkAccessToCourseCourseCreator(user, course.id);

    const tutors = await this.entityManager.findByIds(User, courseTutorsData.tutorIds);

    if (tutors.length !== courseTutorsData.tutorIds.length) {
      throw new BadRequestException('Not all new tutors are found');
    }

    course.tutors = tutors;

    const courseLog = await this.entityManager.findOne(CourseLog, { course });
    courseLog.changedBy = user;
    courseLog.updatedAt = moment().toDate();

    await this.entityManager.transaction(async transactionalEntityManager => {
      await transactionalEntityManager.save([course, courseLog]);
    });

    return this.getCourseById(courseId, user);
  }

  public async updateCourseFiles(
    courseId: number,
    courseFilesData: UpdateCourseFilesDto,
    user: User,
  ): Promise<Course> {
    const course = await this.entityManager.findOne(Course, courseId);

    if (!course) {
      throw new NotFoundException({ error: 'Course is not found' });
    }

    await this.tools.checkAccessToCourseCourseCreator(user, course.id);

    const courseAttachment = await this.entityManager.findByIds(
      CourseAttachment,
      courseFilesData.fileIds,
    );

    if (courseAttachment.length !== courseFilesData.fileIds.length) {
      throw new BadRequestException('Not all new files are found');
    }

    course.courseAttachment = courseAttachment;

    const courseLog = await this.entityManager.findOne(CourseLog, { course });
    courseLog.changedBy = user;
    courseLog.updatedAt = moment().toDate();

    await this.entityManager.transaction(async transactionalEntityManager => {
      await transactionalEntityManager.save([course, courseLog]);
    });

    return this.getCourseById(courseId, user);
  }

  private async createCourseTopic(transactionEntityManager, courseId: number, topic: Topic) {
    const course = await transactionEntityManager
      .getRepository(Course)
      .createQueryBuilder('course')
      .where('course.id = :id', { id: courseId })
      .getOne();

    const courseTopic = new CourseTopic({ topic, course });
    await transactionEntityManager.getRepository(CourseTopic).save(courseTopic);
  }

  public async createTopic(topicData: CreateTopicDto, user) {
    try {
      const {courseId, name, id} = topicData;
      await this.tools.checkAccessToCourseCourseCreator(user, courseId);

      return await this.connection.transaction(async transactionEntityManager => {
        const isTopicExist = await transactionEntityManager
          .getRepository(Topic)
          .createQueryBuilder('topic')
          .leftJoin('topic.courseTopics', 'courseTopics')
          .leftJoin('courseTopics.course', 'course')
          .where('course.id = :id', { id: courseId })
          .andWhere('topic.name = :name ', { name })
          .getOne();

        if (id) {
          if (isTopicExist) {
            throw new BadRequestException({ error: 'Lesson with same name already added to the course lessons' });
          }
          const newTopic = await transactionEntityManager
            .getRepository(Topic)
            .createQueryBuilder('topic')
            .where('topic.id = :id', {id})
            .select([
              'topic.name',
              'topic.description',
            ])
            .getOne();

          await transactionEntityManager.getRepository(Topic).save(newTopic);

          await this.createCourseTopic(transactionEntityManager, courseId, newTopic);

          const copyTopic = await transactionEntityManager
            .getRepository(Topic)
            .createQueryBuilder('topic')
            .leftJoinAndSelect('topic.lessons', 'lessons')
            .leftJoinAndSelect('lessons.exams', 'lessonsExams')
            .leftJoinAndSelect('lessons.files', 'lessonsFiles')
            .leftJoinAndSelect('topic.assignments', 'assignments')
            .leftJoinAndSelect('topic.exams', 'exams', 'exams.lesson IS NULL')
            .where('topic.id = :id', {id})
            .getOne()
          const {exams, assignments, lessons: oldLessons} = copyTopic;

          const newExams = exams.map(({id, topic, ...rest}) => {
            return new Exam({...rest, topic: newTopic});
          })

          const newAssignments = assignments.map(({id, topic, ...rest}) => {
            return new Assignment({...rest, topic: newTopic});
          })

          const newLessons = oldLessons.map(({id, topic, exams, files, ...rest}) => {
            return new Lesson({...rest, topic: newTopic});
          })

          await transactionEntityManager.save(
            [
              ...newExams,
              ...newAssignments,
              ...newLessons,
            ])
          const newLessonsExams = newLessons.reduce((acc, item, i) => {
            const {exams} = oldLessons[i];

            const newExams = exams.map(({id, topic, ...rest}) => {
              return new Exam({...rest, topic: newTopic, lesson: new Lesson({id: item.id})});
            })

            return [...acc, ...newExams];
          }, [])

          const newLessonFiles = newLessons.reduce((acc, item, i) => {
            const {files} = oldLessons[i];

            const newFiles = files.map(({id, ...rest}) => {
              return new CourseAttachment({...rest, lesson: new Lesson({id: item.id})});
            })

            return [...acc, ...newFiles];
          }, [])

          await transactionEntityManager.save(
            [
              ...newLessonsExams,
              ...newLessonFiles,
            ])

          return newTopic;
        }

        if (isTopicExist) {
          throw new BadRequestException({ error: 'Lesson with same name already added to the course lessons' });
        }
        const newTopic = new Topic({ name });

        await transactionEntityManager.getRepository(Topic).save(newTopic);
        await this.createCourseTopic(transactionEntityManager,courseId, newTopic);

        return newTopic;
      })
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  public async deleteTopic(topicId: number, user): Promise<HttpStatus> {
    try {
      await this.entityManager.transaction(async transactionalEntityManager => {
        const courseTopic = await transactionalEntityManager
          .getRepository(CourseTopic)
          .createQueryBuilder('courseTopic')
          .leftJoinAndSelect('courseTopic.course', 'course')
          .where('courseTopic.topic_id = :topic', { topic: topicId })
          .getOne()

        if (courseTopic) {
          const { course } = courseTopic;
          await this.tools.checkAccessToCourseCourseCreator(user, course.id);
        }

        const {assignments, lessons, exams, files} = await transactionalEntityManager
          .getRepository(Topic)
          .createQueryBuilder('topic')
          .leftJoinAndSelect('topic.lessons', 'lessons')
          .leftJoinAndSelect('topic.exams', 'exams')
          .leftJoinAndSelect('topic.files', 'lessonsFiles')
          .leftJoinAndSelect('topic.assignments', 'assignments')
          .leftJoinAndSelect('topic.files', 'files')
          .where('topic.id = :id', { id: topicId })
          .getOne()

        if (assignments && assignments.length) {
          await Promise.all(
            assignments.map(assignment => transactionalEntityManager.delete(Assignment, assignment)),
          );
        }

        if (files && files.length) {
          await Promise.all(
            files.map(file => transactionalEntityManager.delete(CourseAttachment, file)),
          );
        }

        if (exams && exams.length) {
          await Promise.all(
            exams.map(exam => transactionalEntityManager.delete(Exam, exam)),
          );
        }

        if (lessons && lessons.length) {
          await Promise.all(
            lessons.map(lesson => transactionalEntityManager.delete(Lesson, lesson)),
          );
        }

        await transactionalEntityManager.delete(CourseTopic, { topic: topicId });

        await transactionalEntityManager.delete(Topic, { id: topicId });
      });

      return HttpStatus.OK;
    } catch (e) {
      throw new BadRequestException({ error: 'Can\'t delete lessons' })
    }
  }

  public async getListOfCategories(): Promise<CategoriesDto> {
    const categories = await this.connection
      .getRepository(CourseCategory)
      .createQueryBuilder('cc')
      .select('cc.id, cc.name')
      .getRawMany()

    return {
      categories
    }
  }
}
