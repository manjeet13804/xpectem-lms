import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { getTypePassed } from '../../../helpers/getTypePassed';
import { Exam } from '../../../entity/Exam';
import { User } from '../../../entity/User';
import { AdminNotificationTriggersService } from '../../../../src/modules/admin-notification/admin-notification-triggers.service';
import { NotificationTriggerType } from '../../../../src/modules/admin-notification/entity/notification-triggers.entity';
import { ExamForEditPointsDto, ExamLogForAddDto, ExamLogsForEditPointsDto } from './dto/exam.dto';
import { StudentExamLog } from './student-exam-log.entity';

@Injectable()
export class ExamService {
  private entityManager = this.connection.createEntityManager();

  constructor(
    private readonly connection: Connection,
    private readonly adminNotificationTriggersService: AdminNotificationTriggersService,
  ) {}

  public async editExamPoints(exams: ExamForEditPointsDto[]): Promise<HttpStatus> {
    Promise.all(
      exams.map(async ({ id, gradeA, gradeB, gradeC, maxPoints }) => {
        const examEntity = await this.entityManager.findOne(Exam, { id });

        if (gradeA) {
          examEntity.gradeA = gradeA;
        }

        if (gradeB) {
          examEntity.gradeB = gradeB;
        }

        if (gradeC) {
          examEntity.gradeC = gradeC;
        }

        if (maxPoints) {
          examEntity.maxPoints = maxPoints;
        }

        return examEntity;
      }),
    )
      .then(async examsEntities => {
        await this.entityManager.save(examsEntities);
      })
      .catch(() => {
        throw new BadRequestException({ error: "Error to save exam's points to database" });
      });

    return HttpStatus.OK;
  }

  public async editExamLogPoints(studentLogs: ExamLogsForEditPointsDto[]): Promise<HttpStatus> {
    Promise.all(
      studentLogs.map(async ({ id, points, completedAt }) => {
        const examLogEntity = await this.entityManager.findOne(StudentExamLog, { id });
        examLogEntity.points = points;
        examLogEntity.completedAt = completedAt || new Date();

        return examLogEntity;
      }),
    )
      .then(async examLogsEntities => {
        await this.entityManager.save(examLogsEntities);
      })
      .catch(() => {
        throw new BadRequestException({ error: "Error to save exam's logs to database" });
      });

    return HttpStatus.OK;
  }

  public async addExamLog(examLog: ExamLogForAddDto, adminUser: User): Promise<StudentExamLog> {
    const { points, answers, studentId, examId, startedAt, completedAt } = examLog;
    try {
      const examEntity = await this.entityManager.findOne(Exam, { id: examId });
      const studentEntity = await this.entityManager.findOne(User, { id: studentId });

      if (!examEntity) {
        throw new BadRequestException({ error: "Error exam didn't find" });
      }

      if (!studentEntity) {
        throw new BadRequestException({ error: "Error student didn't find" });
      }

      const { gradeA, gradeC } = examEntity;

      const grade = getTypePassed(gradeA, gradeC, points);

      const newExamLog = new StudentExamLog({
        points,
        grade,
        exam: examEntity,
        student: studentEntity,
        answers: answers || '',
        startedAt: completedAt ? new Date(completedAt) : new Date(),
        completedAt: completedAt ? new Date(completedAt) : new Date(),
      });

      const savedExamLog = await this.entityManager.save(newExamLog);

      this.adminNotificationTriggersService.checkEvent({
        student: studentEntity,
        user: adminUser,
        event: NotificationTriggerType.APPROVED_EXAM,
      });

      return savedExamLog;
    } catch (error) {
      throw new BadRequestException({ error: 'Error to save exam log to database' });
    }
  }

  public async deleteExamLog(examLogId: number): Promise<HttpStatus> {
    try {
      await this.entityManager.delete(StudentExamLog, { id: examLogId });

      return HttpStatus.OK;
    } catch (error) {
      throw new BadRequestException({ error: 'Error to delete exam log into database' });
    }
  }
}
