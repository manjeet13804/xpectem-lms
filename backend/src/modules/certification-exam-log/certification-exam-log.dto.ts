import { ApiModelProperty } from '@nestjs/swagger';

export class ICreateCertificationExamLog {
  @ApiModelProperty()
  public readonly date: string;

  @ApiModelProperty()
  public readonly isPassed: boolean;

  @ApiModelProperty()
  public readonly results: string;

  @ApiModelProperty()
  public readonly sendNotifications: boolean;

  @ApiModelProperty()
  public readonly studentId: number;

  @ApiModelProperty()
  public readonly courseId: number;
}

export class ICertificationExamLog {
  @ApiModelProperty()
  public readonly id: number;

  @ApiModelProperty()
  public readonly date: string;

  @ApiModelProperty()
  public readonly isPassed: boolean;

  @ApiModelProperty()
  public readonly results: string;
}

export class ICertificationExamLogs {
  @ApiModelProperty({
    isArray: true,
    type: ICertificationExamLog
  })
  public readonly certificationExamLogs: ICertificationExamLog[]
}

export class IGetCertificationExamLog {
  @ApiModelProperty()
  public readonly studentId: number;

  @ApiModelProperty()
  public readonly courseId: number;
}
