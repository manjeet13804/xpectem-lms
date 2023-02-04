import { ApiModelProperty } from '@nestjs/swagger';

import { Language } from '../../../entity/Language';
import { UserRole } from '../../../entity/User';

export class UserDto {
  @ApiModelProperty({ required: true })
  public readonly email: string;

  @ApiModelProperty({ required: true })
  public readonly firstName: string;

  @ApiModelProperty({ required: true })
  public readonly lastName: string;

  @ApiModelProperty()
  public readonly phone: string;

  @ApiModelProperty()
  public readonly postalCode: string;

  @ApiModelProperty()
  public readonly postalAddress: string;

  @ApiModelProperty()
  public readonly streetAddress: string;

  @ApiModelProperty({ required: true, isArray: true, type: [UserRole], enum: UserRole })
  public readonly roles: UserRole[];

  @ApiModelProperty({ isArray: true, type: 'number' })
  public readonly groups: number[];
}

export class UserUpdateDto {
  @ApiModelProperty()
  public readonly firstName: string;

  @ApiModelProperty()
  public readonly lastName: string;

  @ApiModelProperty()
  public readonly phone: string;

  @ApiModelProperty()
  public readonly postalCode: string;

  @ApiModelProperty()
  public readonly postalAddress: string;

  @ApiModelProperty()
  public readonly streetAddress: string;

  @ApiModelProperty()
  public readonly roles: UserRole[];

  @ApiModelProperty({ isArray: true, type: 'number' })
  public readonly groups: number[];
}

export class UserFtsDto {
  @ApiModelProperty()
  public readonly query: string;
}

export class UserProfileUpdateDto {
  @ApiModelProperty()
  public readonly firstName: string;

  @ApiModelProperty()
  public readonly lastName: string;

  @ApiModelProperty()
  public readonly email: string[];

  @ApiModelProperty()
  public readonly phone: string[];

  @ApiModelProperty()
  public readonly postalCode: string;

  @ApiModelProperty()
  public readonly postalAddress: string;

  @ApiModelProperty()
  public readonly streetAddress: string;

  @ApiModelProperty()
  public readonly personNumber: string;

  @ApiModelProperty()
  public readonly language: Language;

  @ApiModelProperty()
  public readonly notifyEmail: boolean;

  @ApiModelProperty()
  public readonly notifySms: boolean;
}

export class UpdateUserAvatarDto {
  @ApiModelProperty()
  public readonly uri: string;
}

export class UpdateUserBackgroundDto {
  @ApiModelProperty()
  public readonly uri: string;
}

export class ResetUserPasswordDto {
  @ApiModelProperty()
  public readonly email: string;
}
