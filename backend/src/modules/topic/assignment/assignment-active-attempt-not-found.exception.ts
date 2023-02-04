import { NotFoundException } from '@nestjs/common';
import { Assignment } from './assignment.entity';
import { HasProblemInterface } from '../../../common/exceptions/has-problem.interface';

export class AssignmentActiveAttemptNotFoundException
  extends NotFoundException
  implements HasProblemInterface {

  public readonly problem: string = 'ACTIVE_ATTEMPT_NOT_FOUND';

  public static for = (
    assignment: Assignment,
  ): AssignmentActiveAttemptNotFoundException => {
    return new AssignmentActiveAttemptNotFoundException(
      'You dont have any active attempts'
      + ` in Assignment#${assignment.id} [${assignment.name}].`,
    );
  }

  constructor(
    message: string = 'You dont have any active attempts in this assignment.',
  ) {
    super(message);
  }
}
