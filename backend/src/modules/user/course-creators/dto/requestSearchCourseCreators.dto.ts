import { ApiModelProperty } from '@nestjs/swagger';

export class RequestSearchCourseCreatorsDto {
  @ApiModelProperty({ required: false })
  public readonly firstName: string;

  @ApiModelProperty({ required: false })
  public readonly lastName: string;

  @ApiModelProperty({ required: false })
  public readonly email: string;

  @ApiModelProperty({ required: false })
  public readonly phone: string;

  @ApiModelProperty({ required: false })
  public readonly isDeactivated: boolean;

  @ApiModelProperty({ required: false })
  public readonly group: number;

  @ApiModelProperty({ required: false })
  public readonly organisation: number;

  @ApiModelProperty({ required: false })
  public readonly lmsGroup: number;

  @ApiModelProperty({ required: false })
  public readonly employeeNumber: string;

  @ApiModelProperty({ required: false })
  public readonly personNumber: string;
}
