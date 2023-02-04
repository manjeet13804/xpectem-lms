import { ApiModelProperty } from '@nestjs/swagger';
import { LmsGroup } from '../../../entity/LmsGroup';

import { CreateOrganisationTranslationDto } from './organisation-translation.dto';

export class CreateOrganisationDto {
  @ApiModelProperty({ required: true })
  name: string;

  @ApiModelProperty({
    isArray: true,
    required: false,
    type: 'number',
  })
  groups: number[];
}

export class UpdateOrganisationDto {
  @ApiModelProperty({ required: false })
  name: string;

  @ApiModelProperty({
    isArray: true,
    required: false,
    type: 'number',
  })
  groups: number[];
}

export class AdminCreateOrganisationDto {
  @ApiModelProperty()
  name: string;

  @ApiModelProperty()
  lmsGroup: number;

  @ApiModelProperty()
  adminFullAccess: boolean;

  @ApiModelProperty({
    type: CreateOrganisationTranslationDto,
    isArray: true,
  })
  translations: CreateOrganisationTranslationDto[];

  @ApiModelProperty()
  isActive: boolean;
}

export class AdminUpdateOrganisationDto {
  @ApiModelProperty({
    required: false,
  })
  name: string;

  @ApiModelProperty({
    required: false,
  })
  adminFullAccess: boolean;

  @ApiModelProperty({
    type: CreateOrganisationTranslationDto,
    isArray: true,
    required: false,
  })
  translations: CreateOrganisationTranslationDto[];

  @ApiModelProperty({ required: false })
  isActive: boolean;

  @ApiModelProperty({ required: false })
  logoImageUri: string;
}
