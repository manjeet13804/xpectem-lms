import { ApiModelProperty } from '@nestjs/swagger';

export class ExamForEditPointsDto {
  @ApiModelProperty()
  id: number;

  @ApiModelProperty({ required: false })
  gradeA: number;

  @ApiModelProperty({ required: false })
  gradeB: number;

  @ApiModelProperty({ required: false })
  gradeC: number;

  @ApiModelProperty({ required: false })
  maxPoints: number;
}

export class ExamEditPointsDto {
  @ApiModelProperty({
    isArray: true,
    type: ExamForEditPointsDto,
  })
  exams: ExamForEditPointsDto[];
}

export class ExamLogsForEditPointsDto {
  @ApiModelProperty()
  id: number;

  @ApiModelProperty()
  points: number;

  @ApiModelProperty()
  completedAt?: Date;
}

export class ExamLogForAddDto {
  @ApiModelProperty()
  points: number;

  @ApiModelProperty()
  examId: number;

  @ApiModelProperty()
  studentId: number;

  @ApiModelProperty()
  answers?: string;

  @ApiModelProperty()
  completedAt?: Date;

  @ApiModelProperty()
  startedAt?: Date;
}

export class ExamLogsEditPointsDto {
  @ApiModelProperty({
    isArray: true,
    type: ExamLogsForEditPointsDto,
  })
  studentLogs: ExamLogsForEditPointsDto[];
}
