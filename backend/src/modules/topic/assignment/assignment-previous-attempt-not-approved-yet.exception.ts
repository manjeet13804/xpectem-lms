import { BadRequestException } from '@nestjs/common';
import { Assignment } from './assignment.entity';
import { HasProblemInterface } from '../../../common/exceptions/has-problem.interface';

export class AssignmentPreviousAttemptNotApprovedYetException
  extends BadRequestException
  implements HasProblemInterface {

  public readonly problem: string = 'ACTIVE_ATTEMPT_NOT_APPROVED';

  public static for = (
    assignment: Assignment,
  ): AssignmentPreviousAttemptNotApprovedYetException => {
    return new AssignmentPreviousAttemptNotApprovedYetException(
      `Assignment#${assignment.id} [${assignment.name}] cant be started now`
      + ' because previous answers not approved yet.',
    );
  }

  constructor(
    message: string = 'Assignment cant be started now'
    + ' because previous answers not approved yet.',
  ) {
    super(message);
  }
}
