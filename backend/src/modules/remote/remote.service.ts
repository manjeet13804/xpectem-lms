import { BadRequestException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import * as config from 'config';
import { always, cond, equals } from 'ramda';
import { generate as randomString } from 'randomstring';
import { Connection } from 'typeorm';

import { AssignmentResults } from '../../entity/AssignmentResults';
import { CourseProgression } from '../../entity/CourseProgression';
import { ExamResults } from '../../entity/ExamResults';
import { LearnAttemptsLogs } from '../../entity/LearnAttemptsLogs';
import { Course } from '../../entity/Course';
import { Assignment } from '../topic/assignment/assignment.entity';
import { Exam } from '../../entity/Exam';
import { ParamsCreateLearnLogsDto } from './dto/data-create-learn-logs.dto';
import { NotificationService } from '../notification/notification.service';
import { AdminNotificationService } from '../admin-notification/admin-notification.service';

const TOKEN_LENGTH: number = config.get('jwt.tokenLength');

const { exam, course, assignment } = config.get('formLearn');
const defineEntityFormLearn = cond([
  [equals(exam), always(Exam)],
  [equals(course), always(Course)],
  [equals(assignment), always(Assignment)],
]);

@Injectable()
export class RemoteService {
  constructor(
      private readonly connection: Connection,
      private readonly adminNotificationService: AdminNotificationService,
  ) { }

  public async saveCourseProgression(token: string, progression: string): Promise<HttpStatus> {
    try {
      const tokenData = await this.findToken(token);

      if (tokenData.type !== course) {
        throw new BadRequestException('Invalid data provided');
      }

      const results = await this.getDataFormLearn(tokenData, course);

      await this.connection
        .createQueryBuilder()
        .insert()
        .into(CourseProgression)
        .values({
          progression,
          course: results,
          user: tokenData.user,
        })
        .execute();

      if (parseInt(progression, 10) === 100) {
        this.adminNotificationService.setDateSchedule(tokenData.user.id)
      }

      this.adminNotificationService.checkSchedulePercent(tokenData.user.id, progression);

      return HttpStatus.OK;
    } catch (e) {
      Logger.error(e);
      throw new BadRequestException('Error saving course progression');
    }
  }

  public async saveExamResults(token: string, result: string): Promise<HttpStatus> {
    try {
      const tokenData = await this.findToken(token);

      if (tokenData.type !== exam) {
        throw new BadRequestException('Invalid data provided');
      }

      const results = await this.getDataFormLearn(tokenData, exam);

      await this.connection
        .createQueryBuilder()
        .insert()
        .into(ExamResults)
        .values({
          result,
          exam: results,
          user: tokenData.user,
        })
        .execute();

      return HttpStatus.OK;
    } catch (e) {
      Logger.error(e);
      throw new BadRequestException('Error saving exam results');
    }
  }

  public async saveAssignmentResults(token: string, result: string): Promise<HttpStatus> {
    try {
      const tokenData = await this.findToken(token);

      if (tokenData.type !== assignment) {
        throw new BadRequestException('Invalid data provided');
      }

      const results = await this.getDataFormLearn(tokenData, assignment);

      await this.connection
        .createQueryBuilder()
        .insert()
        .into(AssignmentResults)
        .values({
          result,
          assignment: results,
          user: tokenData.user,
        })
        .execute();

      return HttpStatus.OK;
    } catch (e) {
      Logger.error(e);
      throw new BadRequestException('Error saving assignment results');
    }
  }

  public async findToken(token: string): Promise<LearnAttemptsLogs> {
    return this.connection
      .getRepository(LearnAttemptsLogs)
      .createQueryBuilder('learnToken')
      .leftJoinAndSelect('learnToken.user', 'user')
      .where('learnToken.token = :token', { token })
      .getOne();
  }

  public async createLinkWithTokenForLearn(
    params: ParamsCreateLearnLogsDto,
  ): Promise<{ url: string }> {
    const { user, type, formLearnId } = params;
    const entityFormLearn = defineEntityFormLearn(type);
    const token = randomString({
      length: TOKEN_LENGTH,
      charset: 'alphanumeric',
    });
    const formLearn = await this.connection
      .getRepository(entityFormLearn)
      .createQueryBuilder(type)
      .where({ id: formLearnId })
      .getOne();
    await this.connection
      .createQueryBuilder()
      .insert()
      .into(LearnAttemptsLogs)
      .values({
        token,
        user,
        type,
        formLearnId,
      })
      .execute();

    return { url: `${formLearn['url']}?token=${token}` };
  }

  public async getDataFormLearn(tokenData: LearnAttemptsLogs, type: string): Promise<any> {
    const entity = defineEntityFormLearn(type);

    return this.connection
      .getRepository(entity)
      .createQueryBuilder(type)
      .where({ id: tokenData.formLearnId })
      .getOne();
  }
}
