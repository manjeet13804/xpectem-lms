import { ApiModelProperty } from '@nestjs/swagger';

export class GroupTranslationDto {
  @ApiModelProperty()
  id: number;

  @ApiModelProperty()
  groupId: number;

  @ApiModelProperty()
  languageId: number;

  @ApiModelProperty()
  description: string;
}

export class CreateGroupTranslationDto {
  @ApiModelProperty()
  languageId: number;

  @ApiModelProperty()
  description: string;
}
