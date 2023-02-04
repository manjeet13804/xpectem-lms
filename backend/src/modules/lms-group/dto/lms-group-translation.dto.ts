import { ApiModelProperty } from '@nestjs/swagger';

export class LmsGroupTranslationDto {
  @ApiModelProperty()
  id: number;

  @ApiModelProperty()
  lmsGroupId: number;

  @ApiModelProperty()
  languageId: number;

  @ApiModelProperty()
  description: string;

  @ApiModelProperty()
  adminWelcomeText: string;

  @ApiModelProperty()
  studentWelcomeText: string;
}

export class CreateLmsGroupTranslationDto {
  @ApiModelProperty()
  languageId: number;

  @ApiModelProperty()
  description: string;

  @ApiModelProperty()
  adminWelcomeText: string;

  @ApiModelProperty()
  studentWelcomeText: string;
}
