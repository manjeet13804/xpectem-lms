import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Faq } from './faq.entity';
import { FaqTypeEnum } from './faq-type.enum';

@Injectable()
@EntityRepository(Faq)
export class FaqRepository extends Repository<Faq> {
  public getStudentsFaq = (query?: string): Promise<Faq | undefined> => {
    return this.createQueryBuilder('faq')
      .leftJoinAndSelect('faq.topics', 'topics')
      .leftJoinAndSelect(
        'topics.questions',
        'topic_questions',
        !!query &&
          'MATCH (topic_questions.question,topic_questions.answer)' +
            ' AGAINST (:query IN BOOLEAN MODE)',
        !!query && { query: `${query}*` },
      )
      .where('faq.type = :type', { type: FaqTypeEnum.Student })
      .getOne();
  };

  public getAdminsFaq = (query?: string): Promise<Faq | undefined> => {
    return this.createQueryBuilder('faq')
      .leftJoinAndSelect('faq.topics', 'topics')
      .leftJoinAndSelect(
        'topics.questions',
        'topic_questions',
        !!query &&
          'MATCH (topic_questions.question,topic_questions.answer)' +
            ' AGAINST (:query IN BOOLEAN MODE)',
        !!query && { query: `${query}*` },
      )
      .where('faq.type = :type', { type: FaqTypeEnum.Admin })
      .getOne();
  };

  public getCourseFaq = (courseId: number, query?: string): Promise<Faq | undefined> => {
    return this.createQueryBuilder('faq')
      .innerJoin('faq.course', 'faq_course')
      .innerJoin('faq_course.students', 'students')
      .leftJoinAndSelect('faq.topics', 'topics')
      .leftJoinAndSelect(
        'topics.questions',
        'topic_questions',
        !!query &&
          'MATCH (topic_questions.question,topic_questions.answer)' +
            ' AGAINST (:query IN BOOLEAN MODE)',
        !!query && { query: `${query}*` },
      )
      .where('faq_course.id = :courseId')
      .andWhere('faq.type = :type')
      .setParameters({
        courseId,
        type: FaqTypeEnum.Course,
      })
      .getOne();
  };

  public getCourseFaqByParams = (
    courseId: number,
    userId: number,
    query?: string,
  ): Promise<Faq | undefined> => {
    return this.createQueryBuilder('faq')
      .innerJoin('faq.course', 'faq_course')
      .innerJoin('faq_course.students', 'students')
      .innerJoin('students.user', 'user', 'user.id = :userId')
      .leftJoinAndSelect('faq.topics', 'topics')
      .leftJoinAndSelect(
        'topics.questions',
        'topic_questions',
        !!query &&
          'MATCH (topic_questions.question,topic_questions.answer)' +
            ' AGAINST (:query IN BOOLEAN MODE)',
        !!query && { query: `${query}*` },
      )
      .where('faq_course.id = :courseId')
      .andWhere('faq.type = :type')
      .setParameters({
        userId,
        courseId,
        type: FaqTypeEnum.Course,
      })
      .getOne();
  };
}
