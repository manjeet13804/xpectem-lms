import { Connection } from 'typeorm';
import {
  SearchExamsByNameDto,
  CreateExamDto,
  UpdateExamDto,
  UpdateExamOrderDto,
} from './../dto/admin.exam.dto';
import { Exam } from '../../../entity/Exam';
import {
  NotFoundException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import * as _ from 'lodash';
import { Topic } from '../../../entity/Topics';
import { AdminNotificationTriggersService } from '../../admin-notification/admin-notification-triggers.service';
import { NotificationTriggerType } from '../../admin-notification/entity/notification-triggers.entity';

@Injectable()
export class AdminExamService {
  private entityManager = this.connection.createEntityManager();

  public constructor(
    private readonly connection: Connection,
    private readonly adminNotificationTriggersService: AdminNotificationTriggersService,
  ) {}

  public async getAllExams({ name = '' }: SearchExamsByNameDto): Promise<Exam[]> {
    return this.connection
      .getRepository(Exam)
      .createQueryBuilder('exam')
      .where('exam.name LIKE :name', { name: `%${name.toLowerCase()}%` })
      .getMany();
  }

  public async createExam(dataExam: CreateExamDto): Promise<Exam> {
    try {
      const {
        name,
        url,
        maxTries,
        gradeA,
        gradeC,
        topicId,
        isManually,
        maxPoints,
      } = dataExam;

      const currentTopic = await this.entityManager.findOne(Topic, { id: topicId });

      if (!currentTopic) {
        throw new NotFoundException({
          error: 'Topic not found',
          isCustomError: true,
        });
      }

      const existExam = await this.connection
        .getRepository(Exam)
        .createQueryBuilder('exam')
        .leftJoinAndSelect('exam.topic', 'topic')
        .andWhere('topic.id = :id', { id: topicId })
        .andWhere('LOWER(exam.name) = :name', { name: name.toLowerCase() })
        .getOne();

      if (existExam) {
        throw new NotFoundException({
          error: 'This exam is exists',
          isCustomError: true,
        });
      }

      const lastExam = await this.connection
        .getRepository(Exam)
        .createQueryBuilder('exam')
        .leftJoinAndSelect('exam.topic', 'topic')
        .where('topic.id = :id', { id: topicId })
        .orderBy('exam.order', 'DESC')
        .limit(1)
        .getOne();

      const examEntity = new Exam({
        name,
        url,
        maxTries,
        gradeA,
        gradeC,
        isManually,
        maxPoints,
        order: lastExam ? (lastExam.order + 1) : 1,
        topic: currentTopic,
      });

      const saveEntity = await this.entityManager.save(examEntity);

      return saveEntity;
    } catch (e) {
      throw new HttpException(
        e.message.isCustomError
          ? { error: e.message.error }
          : { error: 'Error create exam' }
      , e.status || HttpStatus.BAD_REQUEST);
    }
  }

  public async editExamOrders(dataExam: UpdateExamOrderDto, topicId: number): Promise<HttpStatus> {
    try {
      const { examsOrdersArray } = dataExam;
      const topic = await this.connection
        .getRepository(Topic)
        .createQueryBuilder('topic')
        .leftJoinAndSelect('topic.exams', 'exams')
        .where('topic.id = :id', { id: topicId })
        .getOne();

      if (!topic.exams.length) {
        throw new NotFoundException({
          error: 'Not found exam by this lesson id',
          isCustomError: true,
        });
      }

      const nullAllOrderExam = topic.exams.map((exam) => {
        exam.order = null;

        return exam;
      });

      await this.entityManager.save(nullAllOrderExam);

      const resultExams = topic.exams
        .map((exam) => {
          examsOrdersArray
            .forEach((item) => {
              if (exam.id === item.id) {
                exam.order = Number(item.order);
              }
            });

          return exam;
        })
        .map(item => new Exam(item));
      await this.entityManager.save(resultExams);

      return HttpStatus.OK;
    } catch (e) {
      throw new HttpException(
        e.message.isCustomError
          ? { error: e.message.error }
          : { error: 'Error edit order for exams' }
      , e.status || HttpStatus.BAD_REQUEST);
    }
  }

  public async editExam(dataExam: UpdateExamDto, examId: number): Promise<Exam> {
    try {
      const examEntity = await this.connection
        .getRepository(Exam)
        .createQueryBuilder('exam')
        .leftJoinAndSelect('exam.topic', 'topic')
        .where('exam.id = :id', { id: examId })
        .getOne();

      if (!examEntity) {
        throw new NotFoundException({
          error: 'Not found exam by this id',
          isCustomError: true,
        });
      }

      const existExam = await this.connection
        .getRepository(Exam)
        .createQueryBuilder('exam')
        .leftJoinAndSelect('exam.topic', 'topic')
        .where('exam.id != :id', { id: examId })
        .andWhere('topic.id = :topicId', { topicId: examEntity.topic.id })
        .andWhere('LOWER(exam.name) = :name', { name: dataExam.name.toLowerCase() })
        .getOne();

      if (existExam) {
        throw new NotFoundException({
          error: 'This exam is exists, please enter other name',
          isCustomError: true,
        });
      }

      const saveExamData = new Exam({
        ...examEntity,
        ...dataExam,
      });

      await this.entityManager.save(saveExamData);

      return saveExamData;
    } catch (e) {
      throw new HttpException(
        e.message.isCustomError
          ? { error: e.message.error }
          : { error: 'Error edit exam' }
      , e.status || HttpStatus.BAD_REQUEST);
    }
  }

  public async deleteExam (examId: number): Promise<HttpStatus> {
    try {
      await this.entityManager.delete(Exam, examId);

      return HttpStatus.OK;
    } catch (e) {
      throw new HttpException(
        e.message.isCustomError
          ? { error: e.message.error }
          : { error: 'Error delete exam' }
      , e.status || HttpStatus.BAD_REQUEST);
    }
  }
}
