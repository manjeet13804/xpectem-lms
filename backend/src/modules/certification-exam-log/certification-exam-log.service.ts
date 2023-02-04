import { BadRequestException, HttpStatus, Injectable, HttpException } from '@nestjs/common';
import { Connection } from 'typeorm';
import * as moment from 'moment';
import { ICertificationExamLogs, ICreateCertificationExamLog, IGetCertificationExamLog } from './certification-exam-log.dto';
import { CourseStudent } from '../../entity/CourseStudent';
import { CertificationExamLog } from '../../entity/CertificationExamLog';
import { AdminNotificationService } from '../admin-notification/admin-notification.service';
import { IUser } from '../user/interfaces/user.interface';
import { AdminNotificationNormalTypeEnum } from '../admin-notification/enum/admin-notification-normal-type.enum';
import { MULTI_LANGUAGE_CERTIFICATION_EXAM_RESULT_MESSAGES } from '../../common/enums/constants';
import { DATE_FORMATS } from '../../common/enums/dateFormats';

@Injectable()
export class CertificationExamLogService {
  constructor(
    private readonly connection: Connection,
    private readonly adminNotificationService: AdminNotificationService,
  ) { }

  public async create(body: ICreateCertificationExamLog, admin: IUser): Promise<ICertificationExamLogs> {
    try {
      const {
        date,
        isPassed,
        results,
        sendNotifications,
        studentId,
        courseId,
      } = body;

      const courseStudent = await this.getCourseStudent(studentId, courseId);
      if (!courseStudent) {
        throw new BadRequestException('Course and student connect not found');
      }

      const certificationExamLog = new CertificationExamLog({
        results,
        isPassed,
        courseStudent,
        date: moment(date).toDate(),
      })

      await this.connection.manager.save(certificationExamLog);

      if (sendNotifications) {
        const dataForMessage = {
          date,
          results,
          courseName: courseStudent.course.title,
        };
        const message = isPassed
          ? MULTI_LANGUAGE_CERTIFICATION_EXAM_RESULT_MESSAGES.EN_PASSED(dataForMessage)
          : MULTI_LANGUAGE_CERTIFICATION_EXAM_RESULT_MESSAGES.EN_FAILED(dataForMessage)
        const notificationData = {
          studentId,
          message: JSON.stringify(message),
          lmsGroupId: null,
          header: '',
          // type: AdminNotificationNormalTypeEnum.STUDENT, TODO
          schedule: null,
        };
        // this.adminNotificationService.sendNotificationStudent(notificationData, admin); TODO
      }

      return this.getListOfLogs({ studentId, courseId });
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async deleteLog(id: number): Promise<HttpStatus> {
    await this.connection.manager.delete(CertificationExamLog, id);

    return HttpStatus.OK;
  }

  public async getListOfLogs(query: IGetCertificationExamLog): Promise<ICertificationExamLogs> {
    const {
      studentId,
      courseId,
    } = query;
    const courseStudent = await this.getCourseStudent(studentId, courseId);
    if (!courseStudent) {
      throw new BadRequestException('Course and student connect not found');
    }

    const logs = await this.connection
      .getRepository(CertificationExamLog)
      .createQueryBuilder('certificationExamLog')
      .where('certificationExamLog.courseStudent = :courseStudent', { courseStudent: courseStudent.id })
      .getMany();

    const certificationExamLogs = logs.map((
      {
        id,
        date,
        isPassed,
        results,
      }) => {
      return {
        id,
        isPassed,
        results,
        date: moment(date).format(DATE_FORMATS.simpleDate),
      }
    })

    return {
      certificationExamLogs,
    }
  }

  private async getCourseStudent(studentId: number, courseId: number): Promise<CourseStudent> {
    return this.connection
      .getRepository(CourseStudent)
      .createQueryBuilder('courseStudent')
      .leftJoin('courseStudent.user', 'student')
      .leftJoinAndSelect('courseStudent.course', 'course')
      .where('student.id = :studentId', { studentId })
      .andWhere('course.id = :courseId', { courseId })
      .getOne();
  }
}
