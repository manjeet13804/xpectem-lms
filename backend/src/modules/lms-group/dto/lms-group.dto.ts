import { ApiModelProperty } from '@nestjs/swagger';

import { CreateLmsGroupTranslationDto } from './lms-group-translation.dto';

export class CreateLmsGroupDto {
  @ApiModelProperty()
  name: string;

  @ApiModelProperty({
    type: CreateLmsGroupTranslationDto,
    isArray: true,
  })
  translations: CreateLmsGroupTranslationDto[];

  @ApiModelProperty({ isArray: true, type: 'string'})
  orderEmails: string[];

  @ApiModelProperty()
  accessExpireAt: Date;

  @ApiModelProperty()
  maxLmsGroupAdmins: number;

  @ApiModelProperty()
  maxOrganisations: number;

  @ApiModelProperty()
  maxOrganisationAdmins: number;

  @ApiModelProperty()
  maxCourses: number;

  @ApiModelProperty()
  maxStudents: number;

  @ApiModelProperty()
  isActive: boolean;

  @ApiModelProperty()
  notifySms: boolean;

  @ApiModelProperty()
  hasAccessToMmc: boolean;
}

export class UpdateLmsGroupDto {
  @ApiModelProperty({
    required: false,
  })
  name: string;

  @ApiModelProperty({isArray: true, type: 'string'})
  orderEmails: string[];

  @ApiModelProperty({
    type: CreateLmsGroupTranslationDto,
    isArray: true,
    required: false,
  })
  translations: CreateLmsGroupTranslationDto[];

  @ApiModelProperty({
    required: false,
  })
  accessExpireAt: Date;

  @ApiModelProperty({
    required: false,
  })
  maxLmsGroupAdmins: number;

  @ApiModelProperty({
    required: false,
  })
  maxOrganisations: number;

  @ApiModelProperty({
    required: false,
  })
  maxOrganisationAdmins: number;

  @ApiModelProperty({
    required: false,
  })
  maxCourses: number;

  @ApiModelProperty({
    required: false,
  })
  maxStudents: number;

  @ApiModelProperty({
    required: false,
  })
  isActive: boolean;

  @ApiModelProperty({
    required: false,
  })
  notifySms: boolean;

  @ApiModelProperty({
    required: false,
  })
  hasAccessToMmc: boolean;

  @ApiModelProperty({
    required: false,
  })
  logoImageUri: string;
}

export class GetAllLmsGroupDto {
  @ApiModelProperty({
    required: false,
  })
  name: string;

  @ApiModelProperty({
    required: false,
  })
  onlyActive: boolean;

  @ApiModelProperty({
    required: false,
  })
  createdAt: string;
}
