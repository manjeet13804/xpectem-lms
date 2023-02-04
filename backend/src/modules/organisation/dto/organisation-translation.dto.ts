import { ApiModelProperty } from '@nestjs/swagger';

export class OrganisationTranslationDto {
  @ApiModelProperty()
  id: number;

  @ApiModelProperty()
  organisationId: number;

  @ApiModelProperty()
  languageId: number;

  @ApiModelProperty()
  description: string;

  @ApiModelProperty()
  adminWelcomeText: string;

  @ApiModelProperty()
  studentWelcomeText: string;
}

export class CreateOrganisationTranslationDto {
  @ApiModelProperty()
  languageId: number;

  @ApiModelProperty()
  description: string;

  @ApiModelProperty()
  adminWelcomeText: string;

  @ApiModelProperty()
  studentWelcomeText: string;
}
