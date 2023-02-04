import { BadRequestException } from '@nestjs/common';
import { Assignment } from './assignment.entity';
import { HasProblemInterface } from '../../../common/exceptions/has-problem.interface';

export class AssignmentAttemptAlreadyCompleteException
  extends BadRequestException
  implements HasProblemInterface {

  public readonly problem: string = 'ATTEMPT_ALREADY_COMPLETED';

  public static for = (
    assignment: Assignment,
  ): AssignmentAttemptAlreadyCompleteException => {
    return new AssignmentAttemptAlreadyCompleteException(
      `Assignment#${assignment.id} [${assignment.name}]`
      + ' attempt already completed.',
    );
  }

  constructor(
    message: string = 'Assignment attempt already completed.',
  ) {
    super(message);
  }
}
