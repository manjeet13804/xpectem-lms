import { Connection } from 'typeorm';
import { SearchLessonsByNameDto } from '../dto/admin.course.dto';
import {
  CreateLessonDto,
  UpdateLessonDto,
  UpdateLessonOrderDto,
} from './../dto/admin.lesson.dto';
import {
  NotFoundException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Lesson } from '../../../entity/Lesson';
import { Topic } from '../../../entity/Topics';

@Injectable()
export class AdminLessonService {
  private entityManager = this.connection.createEntityManager();

  public constructor(
    private readonly connection: Connection,
  ) {
  }

  public async getAllLessons({ name = '' }: SearchLessonsByNameDto): Promise<Lesson[]> {
    return this.connection
      .getRepository(Lesson)
      .createQueryBuilder('lesson')
      .leftJoinAndSelect('lesson.exams', 'exams')
      .leftJoinAndSelect('lesson.files', 'files')
      .where('LOWER(lesson.name) LIKE :name', { name: `%${name.toLowerCase()}%` })
      .orderBy('lesson.name', 'ASC')
      .getMany();
  }

  public async createLesson(dataLesson: CreateLessonDto): Promise<Lesson> {
    try {
      const {
        name,
        description,
        url,
        topicId,
      } = dataLesson;

      const currentTopic = await this.entityManager.findOne(Topic, { id: topicId });

      if (!currentTopic) {
        throw new NotFoundException({
          error: 'Topic not found',
          isCustomError: true,
        });
      }

      const existsLesson = await this.connection
        .getRepository(Lesson)
        .createQueryBuilder('lesson')
        .leftJoinAndSelect('lesson.topic', 'topic')
        .andWhere('topic.id = :id', { id: topicId })
        .andWhere('lesson.name = :name', { name: name.toLowerCase() })
        .getOne();

      if (existsLesson) {
        throw new NotFoundException({
          error: 'This lesson is exists',
          isCustomError: true,
        });
      }

      const lastLesson = await this.connection
        .getRepository(Lesson)
        .createQueryBuilder('lesson')
        .leftJoinAndSelect('lesson.topic', 'topic')
        .where('topic.id = :id', { id: topicId })
        .orderBy('lesson.order', 'DESC')
        .limit(1)
        .getOne();

      const lessonEntity = new Lesson({
        name,
        description,
        url,
        order: lastLesson ? (lastLesson.order + 1) : 1,
        topic: currentTopic,
      });

      const savedLesson = await this.entityManager.save(lessonEntity);

      const lesson = await this.entityManager
        .getRepository(Lesson)
        .createQueryBuilder('lesson')
        .leftJoinAndSelect('lesson.exams', 'exams')
        .leftJoinAndSelect('lesson.files', 'files')
        .where('lesson.id = :id ', { id: savedLesson.id })
        .getOne();

      return lesson;
    } catch (e) {
      throw new HttpException(
        e.message.isCustomError
          ? { error: e.message.error }
          : { error: 'Error create lesson' }
        , e.status || HttpStatus.BAD_REQUEST);
    }
  }

  public async editLessonOrders(dataLesson: UpdateLessonOrderDto, topicId: number): Promise<HttpStatus> {
    try {
      const { lessonsOrdersArray } = dataLesson;
      const topic = await this.connection
        .getRepository(Topic)
        .createQueryBuilder('topic')
        .leftJoinAndSelect('topic.lessons', 'lessons')
        .where('topic.id = :id', { id: topicId })
        .getOne();

      if (!topic.lessons.length) {
        throw new NotFoundException({
          error: 'Not found lesson by this topic id',
          isCustomError: true,
        });
      }

      const nullAllOrderLesson = topic.lessons.map((lesson) => {
        lesson.order = null;

        return lesson;
      });

      await this.entityManager.save(nullAllOrderLesson);

      const resultLessons = topic.lessons
        .map((lesson) => {
          lessonsOrdersArray
            .forEach((item) => {
              if (lesson.id === item.id) {
                lesson.order = Number(item.order);
              }
            });

          return lesson;
        })
        .map(item => new Lesson(item));

      await this.entityManager.save(resultLessons);

      return HttpStatus.OK;
    } catch (e) {
      throw new HttpException(
        e.message.isCustomError
          ? { error: e.message.error }
          : { error: 'Error edit order for lessons' }
        , e.status || HttpStatus.BAD_REQUEST);
    }
  }

  public async editLesson(dataLesson: UpdateLessonDto, lessonId: number): Promise<Lesson> {
    try {
      const lessonEntity = await this.connection
        .getRepository(Lesson)
        .createQueryBuilder('lesson')
        .leftJoinAndSelect('lesson.topic', 'topic')
        .where('lesson.id = :id', { id: lessonId })
        .getOne();

      if (!lessonEntity) {
        throw new NotFoundException({
          error: 'Not found lesson by this id',
          isCustomError: true,
        });
      }

      const saveData = {
        ...lessonEntity,
        ...dataLesson,
      } as any;

      const saveLessonData = new Lesson(saveData);

      await this.connection.manager.save(saveLessonData);

      const lesson = await this.entityManager
        .getRepository(Lesson)
        .createQueryBuilder('lesson')
        .where('lesson.id = :id ', { id: lessonId })
        .getOne();

      return lesson;
    } catch (e) {
      throw new HttpException(
        e.message.isCustomError
          ? { error: e.message.error }
          : { error: 'Error edit lesson' }
        , e.status || HttpStatus.BAD_REQUEST);
    }
  }

  public async deleteLesson(lessonId: number): Promise<HttpStatus> {
    try {
      await this.entityManager.delete(Lesson, lessonId);

      return HttpStatus.OK;
    } catch (e) {
      throw new HttpException(
        e.message.isCustomError
          ? { error: e.message.error }
          : { error: 'Error delete lesson' }
        , e.status || HttpStatus.BAD_REQUEST);
    }
  }
}
