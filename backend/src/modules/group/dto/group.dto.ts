import { ApiModelProperty } from '@nestjs/swagger';

export class CreateGroupDto {
  @ApiModelProperty({ required: true })
  name: string;

  @ApiModelProperty({ required: true })
  organisationId: number;
}

export class UpdateGroupDto {
  @ApiModelProperty({ required: false })
  name: string;

  @ApiModelProperty({ required: false })
  organisationId: number;
}
