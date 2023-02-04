import { ApiModelProperty } from '@nestjs/swagger';
import { StudentAssignmentLogStatusEnum } from '../student-assignment-log-status.enum';

export class AssignmentLogsForEditDto {
  @ApiModelProperty()
  id: number;

  @ApiModelProperty({
    enum: [
      StudentAssignmentLogStatusEnum.Completed,
      StudentAssignmentLogStatusEnum.Failed,
    ],
  })
  status: StudentAssignmentLogStatusEnum;

  @ApiModelProperty()
  completedAt?: Date;
}

export class AssignmentLogsForAddDto {
  @ApiModelProperty({
    enum: [
      StudentAssignmentLogStatusEnum.Completed,
      StudentAssignmentLogStatusEnum.Failed,
    ],
  })
  status: StudentAssignmentLogStatusEnum;

  @ApiModelProperty()
  assignmentId: number;

  @ApiModelProperty()
  studentId: number;

  @ApiModelProperty()
  answers?: string;

  @ApiModelProperty()
  completedAt?: Date;

  @ApiModelProperty()
  startedAt?: Date;

  @ApiModelProperty()
  approvedAt?: Date;
}

export class AssignmentsEditDto {
  @ApiModelProperty({
    isArray: true,
    type: AssignmentLogsForEditDto,
  })
  studentLogs: AssignmentLogsForEditDto[];
}
