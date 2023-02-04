import { BadRequestException } from '@nestjs/common';
import { Assignment } from './assignment.entity';
import { HasProblemInterface } from '../../../common/exceptions/has-problem.interface';

export class AssignmentAlreadyPassedException
  extends BadRequestException
  implements HasProblemInterface {

  public readonly problem: string = 'ASSIGNMENT_ALREADY_PASSED';

  public static for = (
    assignment: Assignment,
  ): AssignmentAlreadyPassedException => {
    return new AssignmentAlreadyPassedException(
      `Assignment#${assignment.id} [${assignment.name}] has already been passed.`,
    );
  }

  constructor(message: string = 'Assignment has already been passed.') {
    super(message);
  }
}
