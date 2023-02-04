import { Connection } from 'typeorm';
import {
  SearchAssignmentByNameDto,
  CreateAssignmentDto,
  UpdateAssignmentDto,
  UpdateAssignmentOrderDto,
} from './../dto/admin.assignment.dto';
import { Assignment } from './../../topic/assignment/assignment.entity';
import {
  NotFoundException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Topic } from '../../../entity/Topics';
import { AdminNotificationTriggersService } from '../../admin-notification/admin-notification-triggers.service';
import { NotificationTriggerType } from '../../admin-notification/entity/notification-triggers.entity';

@Injectable()
export class AdminAssignmentService {
  private entityManager = this.connection.createEntityManager();

  public constructor(
    private readonly connection: Connection,
    private readonly adminNotificationTriggersService: AdminNotificationTriggersService,
  ) {}

  public async getAllAssignments({ name = '' }: SearchAssignmentByNameDto): Promise<Assignment[]> {
    return this.connection
      .getRepository(Assignment)
      .createQueryBuilder('assignment')
      .where('LOWER(assignment.name) LIKE :name', { name: `%${name.toLowerCase()}%` })
      .getMany();
  }

  public async createAssignment(dataAssignment: CreateAssignmentDto): Promise<Assignment> {
    try {
      const {
        name,
        url,
        topicId,
        gradeA,
        gradeC,
        isManually,
        maxPoints,
        maxTries,
      } = dataAssignment;

      const currentTopic = await this.entityManager.findOne(Topic, { id: topicId });

      if (!currentTopic) {
        throw new NotFoundException({
          error: 'Topic not found',
          isCustomError: true,
        });
      }

      const existAssignment = await this.connection
        .getRepository(Assignment)
        .createQueryBuilder('assignment')
        .leftJoinAndSelect('assignment.topic', 'topic')
        .andWhere('topic.id = :id', { id: topicId })
        .andWhere('LOWER(assignment.name) = :name', { name: name.toLowerCase() })
        .getOne();

      if (existAssignment) {
        throw new NotFoundException({
          error: 'This assignment is exists',
          isCustomError: true,
        });
      }

      const lastAssignment = await this.connection
        .getRepository(Assignment)
        .createQueryBuilder('assignment')
        .leftJoinAndSelect('assignment.topic', 'topic')
        .where('topic.id = :id', { id: topicId })
        .orderBy('assignment.order', 'DESC')
        .limit(1)
        .getOne();

      const assignmentEntity = new Assignment({
        name,
        url,
        maxTries,
        gradeA,
        gradeC,
        isManually,
        maxPoints,
        order: lastAssignment ? (lastAssignment.order + 1) : 1,
        topic: currentTopic,
      });

      const saveEntity = await this.entityManager.save(assignmentEntity);
      this.adminNotificationTriggersService.checkEventByTopic(topicId, NotificationTriggerType.APPROVED_ASSIGNMENT);

      return saveEntity;
    } catch (e) {
      throw new HttpException(
        e.message.isCustomError
          ? { error: e.message.error }
          : { error: 'Error create assignment' }
      , e.status || HttpStatus.BAD_REQUEST);
    }
  }

  public async editAssignmentOrders(dataAssignment: UpdateAssignmentOrderDto, topicId: number): Promise<HttpStatus> {
    try {
      const { assignmentsOrdersArray } = dataAssignment;
      const topic = await this.connection
        .getRepository(Topic)
        .createQueryBuilder('topic')
        .leftJoinAndSelect('topic.assignments', 'assignments')
        .where('topic.id = :id', { id: topicId })
        .getOne();

      if (!topic.assignments.length) {
        throw new NotFoundException({
          error: 'Not found assignment by this topic id',
          isCustomError: true,
        });
      }

      const nullAllOrderAssignment = topic.assignments.map((assignment) => {
        assignment.order = null;

        return assignment;
      });
      await this.entityManager.save(nullAllOrderAssignment);

      const resultAssignments = topic.assignments
        .map((assignment) => {
          assignmentsOrdersArray
            .forEach((item) => {
              if (assignment.id === item.id) {
                assignment.order = Number(item.order);
              }
            });

          return assignment;
        })
        .map(item => new Assignment(item));

      await this.entityManager.save(resultAssignments);

      return HttpStatus.OK;
    } catch (e) {
      throw new HttpException(
        e.message.isCustomError
          ? { error: e.message.error }
          : { error: 'Error edit order for assignments' }
      , e.status || HttpStatus.BAD_REQUEST);
    }
  }

  public async editAssignment(dataAssignment: UpdateAssignmentDto, assignmentId: number): Promise<Assignment> {
    try {
      const assignmentEntity = await this.connection
        .getRepository(Assignment)
        .createQueryBuilder('assignment')
        .leftJoinAndSelect('assignment.topic', 'topic')
        .where('assignment.id = :id', { id: assignmentId })
        .getOne();

      if (!assignmentEntity) {
        throw new NotFoundException({
          error: 'Not found assignment by this id',
          isCustomError: true,
        });
      }

      const existAssignment = await this.connection
        .getRepository(Assignment)
        .createQueryBuilder('assignment')
        .leftJoinAndSelect('assignment.topic', 'topic')
        .where('assignment.id != :id ', { id: assignmentId })
        .andWhere('topic.id = :topicId', { topicId: assignmentEntity.topic.id })
        .andWhere('LOWER(assignment.name) = :name', { name: dataAssignment.name.toLowerCase() })
        .getOne();

      if (existAssignment) {
        throw new NotFoundException({
          error: 'This assignment is exists, please enter other name',
          isCustomError: true,
        });
      }

      const saveAssignmentData = new Assignment({
        ...assignmentEntity,
        ...dataAssignment,
      });

      await this.entityManager.save(saveAssignmentData);

      return saveAssignmentData
    } catch (e) {
      throw new HttpException(
        e.message.isCustomError
          ? { error: e.message.error }
          : { error: 'Error edit assignment' }
      , e.status || HttpStatus.BAD_REQUEST);
    }
  }

  public async deleteAssignment (assignmentId: number): Promise<HttpStatus> {
    try {
      await this.entityManager.delete(Assignment, assignmentId);

      return HttpStatus.OK;
    } catch (e) {
      throw new HttpException(
        e.message.isCustomError
          ? { error: e.message.error }
          : { error: 'Error delete assignment' }
      , e.status || HttpStatus.BAD_REQUEST);
    }
  }
}
