import { ApiModelProperty } from '@nestjs/swagger';
import { UserRole } from "../../../entity/User";

export class SigninDto {
  @ApiModelProperty({
    example: 'user email',
    description: 'User@mail.com',
  })
  email: string;

  @ApiModelProperty({
    example: 'user password',
    description: '0000',
  })
  password: string;
}

class UserEmail {
  @ApiModelProperty()
  id: number;

  @ApiModelProperty({
    example: 'user email',
    description: 'User@mail.com',
  })
  email: string;
}

export class SigninResponseDto {
  @ApiModelProperty()
  id: number;

  @ApiModelProperty({
    example: 'user firstName',
    description: 'Jone',
  })
  firstName: string;

  @ApiModelProperty({
    example: 'user lastName',
    description: 'Jone',
  })
  lastName: string;

  @ApiModelProperty({
    example: 'user avatar',
    description: 'URL',
  })
  avatar: string;

  @ApiModelProperty({
    type: UserRole,
    isArray: true,
  })
  roles: UserRole[];

  @ApiModelProperty({
    type: UserEmail,
    isArray: true,
    example: UserEmail,
  })
  userEmail: UserEmail[];

  @ApiModelProperty({
    example: 'user token',
    description: '0000000',
  })
  token: string;

  @ApiModelProperty({
    example: 'user organisation id',
    description: '0',
  })
  organisationId: number;
}
