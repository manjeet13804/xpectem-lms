import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../entity/User';
import { AdminNotificationTriggersService } from '../../../modules/admin-notification/admin-notification-triggers.service';
import { NotificationTriggerType } from '../../../modules/admin-notification/entity/notification-triggers.entity';
import { AssignmentView } from './assignment.view';
import { AssignmentRepository } from './assignment.repository';
import { Connection } from 'typeorm';
import { StudentAssignmentLog } from './student-assignment-log.entity';
import { AssignmentLogsForEditDto, AssignmentLogsForAddDto } from './dto/assignmentLogsDto';
import { Assignment } from './assignment.entity';

@Injectable()
export class AssignmentService {
  private entityManager = this.connection.createEntityManager();

  constructor(
    private readonly connection: Connection,
    private readonly adminNotificationTriggersService: AdminNotificationTriggersService,
    @InjectRepository(AssignmentRepository) private readonly assignments: AssignmentRepository,
  ) {}

  public getAssignmentFor = async (user: User, id: number): Promise<AssignmentView> => {
    const assignment = await this.assignments.getAssignmentFor(user, id);

    return new AssignmentView(assignment, user);
  };

  public startAssignmentBy = async (user: User, id: number): Promise<AssignmentView> => {
    const assignment = await this.assignments.getAssignmentFor(user, id);

    assignment.start(user);

    await this.assignments.save(assignment);

    return new AssignmentView(assignment, user);
  };

  public completeAssignmentBy = async (user: User, id: number): Promise<AssignmentView> => {
    const assignment = await this.assignments.getAssignmentFor(user, id);

    assignment.complete(user);

    await this.assignments.save(assignment);

    return new AssignmentView(assignment, user);
  };

  public async editStatusAssignmentLogs(studentLogs: AssignmentLogsForEditDto[]): Promise<HttpStatus> {
    Promise.all(
      studentLogs.map(async ({ id, status, completedAt }) => {
        const assignmentLogEntity = await this.entityManager.findOne(StudentAssignmentLog, { id });
        assignmentLogEntity.status = status;
        assignmentLogEntity.completedAt = completedAt || new Date();

        return assignmentLogEntity;
      }),
    )
      .then(async assignmentLogsEntities => {
        await this.entityManager.save(assignmentLogsEntities);
      })
      .catch(() => {
        throw new BadRequestException({ error: "Error to save assignment's logs to database" });
      });

    return HttpStatus.OK;
  }

  public async addAssignmentLog(assignmentLog: AssignmentLogsForAddDto, adminUser: User): Promise<StudentAssignmentLog> {
    const {
      status,
      answers,
      studentId,
      assignmentId,
      startedAt,
      completedAt,
      approvedAt,
    } = assignmentLog;

    try {
      const assignmentEntity = await this.entityManager.findOne(Assignment, { id: assignmentId });
      const studentEntity = await this.entityManager.findOne(User, { id: studentId });

      if (!assignmentEntity) {
        throw new BadRequestException({ error: "Error: assignment not found" });
      }

      if (!studentEntity) {
        throw new BadRequestException({ error: "Error: student not found" });
      }

      const newAssignmentLog = new StudentAssignmentLog({
        answers,
        status,
        completedAt,
        approvedAt,
        student: studentEntity,
        assignment: assignmentEntity,
        startedAt: startedAt || new Date(),
      });

      const savedAssignmentLog = await this.entityManager.save(newAssignmentLog);

      this.adminNotificationTriggersService.checkEvent({
        student: studentEntity,
        user: adminUser,
        event: NotificationTriggerType.APPROVED_EXAM,
      });

      return savedAssignmentLog;
    } catch (error) {
      throw new BadRequestException({ error: "Error to save assignment's logs to database" });
    }
  }

  public async deleteAssignmentLog(assignmentLogId: number): Promise<HttpStatus> {
    try {
      await this.entityManager.delete(StudentAssignmentLog, { id: assignmentLogId });

      return HttpStatus.OK;
    } catch (error) {
      throw new BadRequestException({ error: 'Error to delete exam log into database' });
    }
  }
}
