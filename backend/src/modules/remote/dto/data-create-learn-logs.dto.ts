import { ApiModelProperty } from '@nestjs/swagger';
import { User } from '../../../entity/User';

export class DataCreateLearnLogsDto {
  @ApiModelProperty({ type: 'number' })
  formLearnId: number;

  @ApiModelProperty({ type: 'string' })
  type: string;
}

export class ParamsCreateLearnLogsDto {
  @ApiModelProperty({ type: 'number' })
  formLearnId: number;

  @ApiModelProperty({ type: 'string' })
  type: string;

  @ApiModelProperty({ type: User })
  user: User;
}
