import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { FaqRepository } from './faq.repository';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { FaqTypeEnum } from './faq-type.enum';
import { Connection } from 'typeorm';
import { FaqTopic } from './faq-topic.entity';
import { CreateQuestionDto, QuestionAnswerDto } from './dto/question.dto';
import { FaqQuestion } from './faq-question.entity';
import { Course } from '../../entity/Course';
import { Faq } from './faq.entity';
import * as _ from 'lodash';

@Injectable()
export class FaqService {
  private entityManager = this.connection.createEntityManager();

  public constructor(
    public readonly faqRepository: FaqRepository,
    public readonly connection: Connection,
  ) {}

  public async deleteTopic(topicId: number): Promise<HttpStatus.OK> {
    await this.entityManager.transaction(async entityManager => {
      const questions = await entityManager
        .getRepository(FaqQuestion)
        .createQueryBuilder('questions')
        .where('questions.topic = :topicId', { topicId })
        .getMany();

      await Promise.all(
        questions.map(async ({ id }) => {
          await this.connection.manager.delete(FaqQuestion, id);
        }),
      );

      await this.connection.manager.delete(FaqTopic, topicId);
    });

    return HttpStatus.OK;
  }

  public getStudentsFaq = async (): Promise<FaqTopic[]> => {
    try {
      const faq = await this.faqRepository.getStudentsFaq();

      return faq ? faq.topics : [];
    } catch (e) {
      throw new EntityNotFoundError('Faq', {type: FaqTypeEnum.Admin});
    }
  };

  public getAdminsFaq = async (): Promise<FaqTopic[]> => {
    try {
      const faq = await this.faqRepository.getAdminsFaq();

      return faq ? faq.topics : [];
    } catch (e) {
      throw new EntityNotFoundError('Faq', {type: FaqTypeEnum.Admin});
    }
  };

  public getCoursesFaq = async (courseId: number): Promise<FaqTopic[]> => {
    const faq = await this.faqRepository.getCourseFaq(courseId);

    if (!faq) {
      return [];
    }

    return faq.topics;
  };

  public async addNewTopic(
    title: string,
    type?: FaqTypeEnum,
    courseId?: number,
  ): Promise<FaqTopic> {
    const topic = await this.entityManager.findOne(FaqTopic, { title });

    if (topic) {
      throw new BadRequestException('Subject exists');
    }

    let faq: Faq;

    if (courseId) {
      faq = await this.connection
        .getRepository(Faq)
        .createQueryBuilder('faq')
        .leftJoinAndSelect('faq.topics', 'topics')
        .leftJoinAndSelect('faq.course', 'course')
        .where('course.id = :id', { id: courseId })
        .getOne();

      if (!faq) {
        const newFaq = new Faq({
          type: FaqTypeEnum.Course,
          course: new Course({ id: courseId }),
          topics: [],
        });
        faq = await this.entityManager.save(newFaq);
      }
    } else {
      faq = await this.connection
        .getRepository(Faq)
        .createQueryBuilder('faq')
        .leftJoinAndSelect('faq.topics', 'topics')
        .where('faq.type = :type', { type })
        .getOne();
      if (!faq) {
        const newFaq = new Faq({
          type,
          topics: [],
        });
        faq = await this.entityManager.save(newFaq);
      }
    }

    const topicEntity = new FaqTopic({ title });

    await this.entityManager.save(topicEntity);

    if (faq) {
      faq.topics = [...faq.topics, topicEntity];
      await this.entityManager.save(faq);
    }

    return topicEntity;
  }

  public async createQuestion(questionAnswer: CreateQuestionDto): Promise<FaqTopic[]> {
    const { 
      courseId, 
      topics, 
      question, 
      answer, 
      faqType 
    } = questionAnswer;

    const topicsEntity = await this.entityManager.findByIds(FaqTopic, topics);

    if (!topicsEntity.length) {
      throw new NotFoundException('Topics was not found');
    }

    if (courseId) {
      const coursesEntity = await this.entityManager.findOne(Course, { id: courseId });

      if (!coursesEntity) {
        throw new NotFoundException('Courses was not found');
      }

      await this.entityManager.transaction(async entityManager => {
        const faq = await entityManager
          .getRepository(Faq)
          .createQueryBuilder('faq')
          .where('faq.course = :courseId', { courseId })
          .leftJoinAndSelect('faq.topics', 'topics')
          .getOne();

        const topics = _.unionBy([...topicsEntity, ..._.get(faq, 'topics', [])], 'id');

        const faqForSave = new Faq({
          ...faq,
          topics,
          type: FaqTypeEnum.Course,
          course: coursesEntity,
        });

        const topicsForSave = topicsEntity.map(
          item =>
            new FaqQuestion({
              answer,
              question,
              topic: item,
            }),
        );

        await entityManager.save(topicsForSave);

        await entityManager.save(faqForSave).catch(e => {
          throw new BadRequestException({ error: 'Error save faq' });
        });
      });

      return this.getCoursesFaq(courseId);
    }

    await this.entityManager.transaction(async entityManager => {
      const faq = await entityManager
        .getRepository(Faq)
        .createQueryBuilder('faq')
        .leftJoinAndSelect('faq.topics', 'topics')
        .where('faq.type = :type', { type: faqType })
        .getOne();

      const topics = _.unionBy([...topicsEntity, ..._.get(faq, 'topics', [])], 'id');

      const faqForSave = new Faq({
        ...faq,
        topics,
        type: faqType,
      });

      const topicsForSave = topicsEntity.map(
        item =>
          new FaqQuestion({
            answer,
            question,
            topic: item,
          }),
      );

      await entityManager.save(topicsForSave);

      await entityManager.save(faqForSave).catch(e => {
        throw new BadRequestException({ error: 'Error save faq' });
      });
    });

    if (faqType === FaqTypeEnum.Admin) {
      return this.getAdminsFaq();
    }

    if (faqType === FaqTypeEnum.Student) {
      return this.getStudentsFaq();
    }
  }

  public async editQuestion(
    questionAnswer: QuestionAnswerDto,
    questionId: number,
  ): Promise<HttpStatus> {
    const question = await this.entityManager.findOne(FaqQuestion, { id: questionId });

    if (!question) {
      throw new NotFoundException('Question was not found');
    }

    const dataToSave = {
      ...question,
      ...questionAnswer,
    };

    await this.entityManager.save(FaqQuestion, dataToSave);

    return HttpStatus.ACCEPTED;
  }

  public async deleteQuestion(questionId: number): Promise<HttpStatus> {
    await this.entityManager.delete(FaqQuestion, { id: questionId });

    return HttpStatus.OK;
  }

  public getAllForCourse = async (courseId: number, userId: number): Promise<FaqTopic[]> => {
    const faq = await this.faqRepository.getCourseFaqByParams(courseId, userId);

    if (!faq) {
      return [];
    }

    return faq.topics;
  };

  public search = async (query: string): Promise<FaqQuestion[]> => {
    const faq = await this.faqRepository.getStudentsFaq(query);

    if (!faq) {
      throw new EntityNotFoundError('Faq', { type: FaqTypeEnum.Student });
    }

    const questions: FaqQuestion[] = faq.topics.reduce((acc, item) => [...acc, ...item.questions], []);

    return questions;
  };

  public searchForCourse = async (
    courseId: number,
    userId: number,
    query: string,
  ): Promise<FaqQuestion[]> => {
    const faq = await this.faqRepository.getCourseFaqByParams(courseId, userId, query);

    if (!faq) {
      throw new EntityNotFoundError('Faq', { courseId, type: FaqTypeEnum.Course });
    }
    
    const questions: FaqQuestion[] = faq.topics.reduce((acc, item) => [...acc, ...item.questions], []);
    
    return questions;
  };

  public async searchTopicsByCourseStudent(title: string = ''): Promise<FaqTopic[]> {
    return this.connection
      .getRepository(FaqTopic)
      .createQueryBuilder('faqTopic')
      .leftJoin('faqTopic.faqs', 'faq')
      .leftJoin('faq.course', 'course')
      .leftJoin('course.students', 'students')
      .andWhere('faqTopic.title LIKE :title', { title: `%${title}%` })
      .getMany();
  }
}
