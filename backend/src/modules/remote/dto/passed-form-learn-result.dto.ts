import { ApiModelProperty } from '@nestjs/swagger';

export class PassedFormLearnResultDto {
  @ApiModelProperty({ required: true, type: 'string' })
  token: string;

  @ApiModelProperty({ required: true, type: 'string' })
  result: string;
}
