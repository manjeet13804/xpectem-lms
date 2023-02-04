import { Injectable, NotFoundException, Logger, BadRequestException } from '@nestjs/common';
import { User } from '../../entity/User';
import { MyGroupedCourseDto } from './my-grouped-course.dto';
import { Course } from '../../entity/Course';
import { MyCourseRepository } from './my-course.repository';
import { MyCourseStudentPlanDto } from './my-course-student-plan.dto';
import { MyCourseUpdateStudentPlanDto } from './my-course-update-student-plan.dto';
import { Connection } from 'typeorm';
import { CourseStudent } from '../../entity/CourseStudent';
import { download } from '../../../lib/aws/s3';
import * as config from 'config';
import { stateToHTML } from 'draft-js-export-html';
import { convertFromRaw, EditorState } from 'draft-js';
import { S3 } from 'aws-sdk';

const {
  mediaBucket,
} = config.get('aws.s3');

@Injectable()
export class MyCourseService {
  constructor(
    private readonly connection: Connection,
    private readonly courses: MyCourseRepository
  ) {}

  public async getMyGroupedCourses(user: User): Promise<MyGroupedCourseDto[]> {
    const courses = await this.courses.getAllCoursesFor(user.id);

    const coursesByGroup = courses.reduce(
      (groups, course: Course) => {
        const [group] = course.permissions.reduce((acc, item) => {
          return [...acc, ...item.groups]
        }, []);

        const groupCourses = groups[group.id] || [];

        return {
          ...groups,
          [group.id]: groupCourses.concat([course]),
        };
      },
      {},
    );

    return Object.entries<Course[]>(coursesByGroup).map(([, courses]) => {
      const [
        {
          permissions
        },
      ] = courses;

      const [group] = permissions.reduce((acc, item) => {
        return [...acc, ...item.groups]
      }, []);

      return new MyGroupedCourseDto(
        group.id,
        group.name,
        courses,
        user,
      );
    });
  }

  public async htmlToPdf(url: string): Promise<{ htmlString: string, htmlBuffer: S3.GetObjectOutput }> {
    const path = new URL(url).pathname.substr(1);
    const htmlBuffer = await download(mediaBucket, path);
    const htmlString = htmlBuffer.Body.toString();

    return { htmlString, htmlBuffer };
  }

  public async richTextToPdf(richText: string): Promise<{ htmlString: string }> {
    const welcomeText = EditorState.
    createWithContent(convertFromRaw(JSON.parse(richText))).getCurrentContent();
    const htmlString = stateToHTML(welcomeText);

    return { htmlString };
  }

  public async createPdf(res, pdfFile: { htmlString: string }): Promise<void> {
    const pdf = require('html-pdf');
    pdf.create(pdfFile.htmlString).toStream((err, stream) => {
      if (err) {
        Logger.error(err)

        return
      }
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=invoice.pdf',
      });
      stream.pipe(res)

      stream.on('error', Logger.log)
    });
  }

  public async getMyCourse(user: User, id: number): Promise<Course> {
    const course = await this.courses.getFullCourseFor(id, user.id);

    if (!course) {
      throw new NotFoundException(
        'You dont have access to this course or this course doesnt exists.',
      );
    }

    return course;
  }

  public async getCourseStudentPlan(user: User, id: number): Promise<MyCourseStudentPlanDto> {
    const course = await this.courses.getStudentPlanFor(id, user.id);

    if (!course) {
      throw new NotFoundException(
        'You dont have access to this course or this course doesnt exists.',
      );
    }

    return new MyCourseStudentPlanDto(
      course.id,
      course.title,
      course.studyPlan,
      course.getStudentFor(user),
    );
  }

  public async updateCourseStudentPlan(
    user: User,
    id: number,
    dto: MyCourseUpdateStudentPlanDto,
  ): Promise<MyCourseStudentPlanDto> {
    const studentCourse = await this.connection
      .getRepository(CourseStudent)
      .createQueryBuilder('courseStudent')
      .leftJoinAndSelect('courseStudent.user', 'student')
      .leftJoinAndSelect('courseStudent.course', 'course')
      .where('course.id = :id', { id })
      .andWhere('student.id = :studentId', { studentId: user.id })
      .getOne()

    if (!studentCourse) {
      throw new NotFoundException(
        'You dont have access to this course or this course doesnt exists.',
      );
    }

    const entityToSave = new CourseStudent({
      ...studentCourse,
      studyPlan: {
        ...studentCourse.studyPlan,
        ...dto,
      }
    } as any)

    await this.connection.createEntityManager().save(entityToSave);

    const course = await this.courses.getStudentPlanFor(id, user.id);

    return new MyCourseStudentPlanDto(
      course.id,
      course.title,
      course.studyPlan,
      course.getStudentFor(user),
    );
  }
}
