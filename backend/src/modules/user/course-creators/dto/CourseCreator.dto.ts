import { ApiModelProperty } from '@nestjs/swagger';
import { UserEmail } from '../../../../entity/UserEmail';
import { UserPhone } from '../../../../entity/UserPhone';
import { Language } from '../../../../entity/Language';

export class CourseCreatorDto {
  @ApiModelProperty()
  public readonly firstName : string;

  @ApiModelProperty()
  public readonly lastName: string;

  @ApiModelProperty({ isArray: true, type: 'string' })
  public readonly emails: string[];

  @ApiModelProperty({ isArray: true, type: 'string', required: false })
  public readonly phones: string[];

  @ApiModelProperty()
  public readonly language: number;

  @ApiModelProperty()
  public readonly notifyEmail: boolean;

  @ApiModelProperty()
  public readonly notifySms: boolean;

  @ApiModelProperty({ required: false })
  public readonly personNumber: string;

  @ApiModelProperty({ required: false })
  public readonly employeeNumber: string;

  @ApiModelProperty({ type : {
    type: 'array',
    format: 'number',
    items: {
      type: 'number',
    },
  }})
  public readonly groups: number[];

  @ApiModelProperty()
  public readonly isDeactivated: boolean;
}

export class UpdateCourseCreatorResponse {
  @ApiModelProperty()
  public readonly firstName : string;

  @ApiModelProperty()
  public readonly lastName: string;

  @ApiModelProperty({ isArray: true, type: 'string' })
  public readonly userEmail: UserEmail[];

  @ApiModelProperty({ isArray: true, type: 'string', required: false })
  public readonly userPhone: UserPhone[];

  @ApiModelProperty()
  public readonly language: Language;

  @ApiModelProperty()
  public readonly notifyEmail: boolean;

  @ApiModelProperty()
  public readonly notifySms: boolean;

  @ApiModelProperty({ required: false })
  public readonly personNumber: string;

  @ApiModelProperty({ required: false })
  public readonly employeeNumber: string;

  @ApiModelProperty()
  public readonly avatar: string;

  @ApiModelProperty()
  public readonly isDeactivated: boolean;
}

export class UpdateCourseCreatorDto {
  @ApiModelProperty()
  public readonly firstName : string;

  @ApiModelProperty()
  public readonly lastName: string;

  @ApiModelProperty({ isArray: true, type: 'string' })
  public readonly emails: string[];

  @ApiModelProperty({ isArray: true, type: 'string', required: false })
  public readonly phones: string[];

  @ApiModelProperty()
  public readonly language: number;

  @ApiModelProperty()
  public readonly notifyEmail: boolean;

  @ApiModelProperty()
  public readonly notifySms: boolean;

  @ApiModelProperty({ required: false })
  public readonly personNumber: string;

  @ApiModelProperty({ required: false })
  public readonly employeeNumber: string;

  @ApiModelProperty()
  public readonly avatar: string;
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