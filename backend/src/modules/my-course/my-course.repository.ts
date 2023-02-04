import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Course } from '../../entity/Course';
import { CourseStatus } from '../course/course-status.enum';
import {PERMISSION_STATUS} from "../../common/enums/constants";

@Injectable()
@EntityRepository(Course)
export class MyCourseRepository extends Repository<Course> {
  getAllCoursesFor(userId: number): Promise<Course[]> {
    return this.createQueryBuilder('c')
      .leftJoinAndSelect('c.categories', 'cc')
      .innerJoinAndSelect('c.permissions', 'permissions')
      .innerJoinAndSelect('permissions.groups', 'g')
      .innerJoin('g.users', 'u', 'u.id = :userId')
      .leftJoinAndSelect(
        'c.students',
        'css',
        'css.user.id = :userId',
      )
      .leftJoinAndSelect('css.course', 'cssc')
      .leftJoinAndSelect('css.user', 'cssu')
      .where('c.status = :status')
      .andWhere('cssu.id = :userId')
      .andWhere('(permissions.id = 2 OR permissions.id = 3)')
      .setParameter('userId', userId)
      .setParameter('status', CourseStatus.Published)
      .getMany();
  }

  getDoneCoursesFor(userId: number): Promise<Course[]> {
    return this.createQueryBuilder('c')
      .leftJoinAndSelect('c.categories', 'cc')
      .innerJoinAndSelect('c.courseCertificate', 'courseCertificate')
      .innerJoinAndSelect('c.permissions', 'permissions')
      .innerJoinAndSelect('permissions.groups', 'g')
      .innerJoin('g.users', 'u', 'u.id = :userId')
      .leftJoinAndSelect(
        'c.students',
        'css',
        'css.user.id = :userId',
      )
      .leftJoinAndSelect('css.course', 'cssc')
      .leftJoinAndSelect('css.user', 'cssu')
      .where('c.status = :status')
      .andWhere('css.doneAt IS NOT NULL')
      .andWhere('(permissions.id = 2 OR permissions.id = 3)')
      .setParameter('userId', userId)
      .setParameter('status', CourseStatus.Published)
      .getMany();
  }

  public async getFullCourseFor(id: number, userId: number): Promise<Course | undefined> {
    return this.createQueryBuilder('c')
      .innerJoinAndSelect('c.permissions', 'permissions')
      .innerJoinAndSelect('permissions.groups', 'g')
      .leftJoin('c.groupCoursePermissions', 'groupCoursePermissions')
      .innerJoin('g.users', 'u', 'u.id = :userId')
      .leftJoinAndSelect('c.translations', 'translations')
      .leftJoinAndSelect('c.courseCertificate', 'certificate')
      .leftJoinAndSelect('c.categories', 'cc')
      .leftJoinAndSelect('c.links', 'cl')
      .leftJoinAndSelect('c.tutors', 'ct')
      .leftJoinAndSelect(
        'c.certificationBookings',
        'ccb',
        'ccb.user.id = :userId',
      )
      .leftJoinAndSelect('ccb.certification', 'ccbc')
      .leftJoinAndSelect('ccb.course', 'ccbco')
      .leftJoinAndSelect('ccb.user', 'ccbu')
      .leftJoinAndSelect('c.courseTopics', 'cs')
      .leftJoinAndSelect('cs.course', 'csc')
      .leftJoinAndSelect('cs.topic', 't')
      .leftJoinAndSelect('t.lessons', 'l')
      .leftJoinAndSelect(
        'l.studentLogs',
        'ls',
        'ls.student.id = :userId',
      )
      .leftJoinAndSelect('ls.student', 'lss')
      .leftJoinAndSelect('t.assignments', 'a')
      .leftJoinAndSelect(
        'a.studentLogs',
        'als',
        'als.student.id = :userId',
      )
      .leftJoinAndSelect('als.student', 'alss')
      .leftJoinAndSelect('t.exams', 'e')
      .leftJoinAndSelect(
        'e.studentLogs',
        'els',
        'els.student.id = :userId',
      )
      .leftJoinAndSelect('els.student', 'elss')
      .leftJoinAndSelect(
        'c.students',
        'css',
        'css.user.id = :userId',
      )
      .leftJoinAndSelect('css.course', 'cssc')
      .leftJoinAndSelect('css.user', 'cssu')
      .where('c.id = :id', {id})
      .andWhere(
        'c.status = :status',
        {status: CourseStatus.Published},
      )
      .andWhere('(groupCoursePermissions.permission = :access OR groupCoursePermissions.permission = :accessEdit)',
        {
          access: PERMISSION_STATUS.Access,
          accessEdit: PERMISSION_STATUS["Access & Edit"]
        })
      .orderBy({
        'cl.order': 'ASC',
        'cs.order': 'ASC',
        'l.order': 'ASC',
        'a.order': 'ASC',
        'e.order': 'ASC',
      })
      .setParameter('userId', userId)
      .getOne();
  }

  public getStudentPlanFor(id: number, userId: number): Promise<Course | undefined> {
    return this.createQueryBuilder('c')
      .leftJoinAndSelect('c.groupCoursePermissions', 'permissions')
      .leftJoinAndSelect('permissions.group', 'g')
      .setParameter('userId', userId)
      .leftJoin('g.users', 'u', 'u.id = :userId')
      .leftJoinAndSelect(
        'c.students',
        'css',
        'css.user.id = :userId',
      )
      .leftJoinAndSelect('css.course', 'cssc')
      .leftJoinAndSelect('css.user', 'cssu')
      .where('c.id = :id', { id })
      .andWhere(
        'c.status = :status',
        { status: CourseStatus.Published },
      )
      // .andWhere('c.studyPlan.studentAccess IS TRUE')
      .andWhere('(permissions.permission = :access OR permissions.permission = :accessEdit)',
        {
          access: PERMISSION_STATUS.Access,
          accessEdit: PERMISSION_STATUS["Access & Edit"]
        })
      .getOne();
  }
}
