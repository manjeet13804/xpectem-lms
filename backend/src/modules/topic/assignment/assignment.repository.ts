import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Assignment } from './assignment.entity';
import { User } from '../../../entity/User';

@Injectable()
@EntityRepository(Assignment)
export class AssignmentRepository extends Repository<Assignment> {
  public getAssignmentFor = (user: User, id: number): Promise<Assignment> => {
    return this.findOneOrFail(
      id,
      {
        relations: [
          'studentLogs',
          'studentLogs.assignment',
          'studentLogs.student',
        ],
        join: {
          alias: 'a',
          innerJoin: {
            topic: 'a.topic',
            courseTopics: 'topic.courseTopics',
            course: 'courseTopics.course',
            students: 'course.students',
          },
        },
        where: {
          'students.id': user.id,
        },
      },
    );
  }
}
