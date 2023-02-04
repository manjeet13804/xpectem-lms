import { ApiModelProperty } from '@nestjs/swagger';

import { CreateGroupTranslationDto } from './group-translation.dto';

export class AdminCreateGroupDto {
  @ApiModelProperty()
  name: string;

  @ApiModelProperty({
    type: CreateGroupTranslationDto,
    isArray: true,
  })
  translations: CreateGroupTranslationDto[];

  @ApiModelProperty()
  isActive: boolean;

  @ApiModelProperty()
  organisation: number;
}

export class AdminGroupDto {
  @ApiModelProperty()
  id: number;

  @ApiModelProperty()
  name: string;

  @ApiModelProperty({
    type: CreateGroupTranslationDto,
    isArray: true,
  })
  translations: CreateGroupTranslationDto[];

  @ApiModelProperty()
  createdAt: string;

  @ApiModelProperty()
  isActive: boolean;
}

export class AdminUpdateGroupDto {
  @ApiModelProperty()
  name: string;
  @ApiModelProperty()
  isActive: boolean;
  @ApiModelProperty({
    type: CreateGroupTranslationDto,
    isArray: true,
  })
  translations: CreateGroupTranslationDto[];
}

export class ImportGroupDto {
  @ApiModelProperty({ isArray: true, type: 'string'})
  headers: string[];

  @ApiModelProperty()
  organisation: number;
}

export class SearchAdminGroupDto {
  @ApiModelProperty()
  lmsGroup: number;

  @ApiModelProperty()
  organisation: number;

  @ApiModelProperty()
  name: string;

  @ApiModelProperty()
  createdAt: string;

  @ApiModelProperty({ required: false })
  onlyActive: boolean;
}
