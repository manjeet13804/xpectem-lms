import { ApiModelProperty } from '@nestjs/swagger';

export class CreateAdminDto {

  @ApiModelProperty({ required: true })
  public readonly firstName: string;

  @ApiModelProperty({ required: true })
  public readonly lastName: string;

  @ApiModelProperty({ isArray: true, type: 'string' })
  public readonly email: string[];

  @ApiModelProperty({ isArray: true, type: 'string' })
  public readonly phone: string[];

  @ApiModelProperty()
  public readonly language: number;

  @ApiModelProperty()
  public readonly notifyEmail: boolean;

  @ApiModelProperty()
  public readonly notifySms: boolean;

  @ApiModelProperty({ type : {
    type: 'array',
    format: 'number',
    items: {
      type: 'number',
    },
  }})
  public readonly groups: number[];

  @ApiModelProperty({ type : {
    type: 'array',
    format: 'number',
    items: {
      type: 'number',
    },
  }})
  public readonly organisations: number[];

  @ApiModelProperty()
  public readonly avatar: string;

  @ApiModelProperty()
  public readonly isDeactivated: boolean;
}

export class SearchAdminDto {

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

}

export class CreateLmsAdminDto {

  @ApiModelProperty({ required: true })
  public readonly firstName: string;

  @ApiModelProperty({ required: true })
  public readonly lastName: string;

  @ApiModelProperty({ isArray: true, type: 'string' })
  public readonly email: string[];

  @ApiModelProperty({ isArray: true, type: 'string' })
  public readonly phone: string[];

  @ApiModelProperty()
  public readonly language: number;

  @ApiModelProperty()
  public readonly notifyEmail: boolean;

  @ApiModelProperty()
  public readonly notifySms: boolean;

  @ApiModelProperty()
  public readonly lmsGroup: number;

  @ApiModelProperty()
  public readonly isDeactivated: boolean;
}

export class ImportAdminDto {

  @ApiModelProperty({ isArray: true, type: 'string' })
  public readonly headers: string[];

  @ApiModelProperty({ isArray: true, type: 'number' })
  public readonly organisations: number[];

  @ApiModelProperty({ isArray: true, type: 'number' })
  public readonly groups: number[];

}

export class FileTemplateDto {
  @ApiModelProperty()
  public readonly fieldname: string;

  @ApiModelProperty()
  public readonly originalname: string;

  @ApiModelProperty()
  public readonly encoding: string;

  @ApiModelProperty()
  public readonly mimetype: string;

  @ApiModelProperty()
  public readonly buffer: Buffer;

  @ApiModelProperty()
  public readonly size: number;
}

export class UserProfile {
  @ApiModelProperty()
  public readonly firstName: string;

  @ApiModelProperty()
  public readonly lastName: string;

  @ApiModelProperty()
  public readonly emails: string[];

  @ApiModelProperty()
  public readonly phones: string[]

  @ApiModelProperty()
  public readonly language: number;

  @ApiModelProperty()
  public readonly notifyEmail: boolean;

  @ApiModelProperty()
  public readonly notifySms: boolean;

  @ApiModelProperty()
  public readonly avatar: string;
}

export class AddExistingAdminDto {
  @ApiModelProperty()
  public readonly email: string[];

  @ApiModelProperty()
  public readonly idLmsGroup: number;

}
