import { BadRequestException } from '@nestjs/common';
import { Assignment } from './assignment.entity';
import { HasProblemInterface } from '../../../common/exceptions/has-problem.interface';

export class AssignmentsAttemptsLimitReachedException
  extends BadRequestException
  implements HasProblemInterface {
  public readonly problem: string = 'ATTEMPT_LIMIT_REACHED';

  public static for = (
    assignment: Assignment,
  ): AssignmentsAttemptsLimitReachedException => {
    return new AssignmentsAttemptsLimitReachedException(
      `Assignment#${assignment.id} [${assignment.name}] cant be started now`
      + ' because you have reached the limit of attempts per day.',
    );
  }

  constructor(
    message: string = 'Assignment cant be started now'
    + ' because you have reached the limit of attempts per day.',
  ) {
    super(message);
  }
}
