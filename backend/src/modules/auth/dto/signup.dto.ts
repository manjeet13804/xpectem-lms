import { ApiModelProperty } from '@nestjs/swagger';

export class SignupDto {
  @ApiModelProperty({
    required: true,
    example: 'user email',
    description: 'User@mail.com',
  })
  public readonly email: string;

  @ApiModelProperty({
    required: true,
    example: 'user firstName',
    description: 'Jone',
  })
  public readonly firstName: string;

  @ApiModelProperty({
    required: true,
    example: 'user lastName',
    description: 'Jone',
  })
  public readonly lastName: string;

  @ApiModelProperty({
    required: true,
    example: 'user password',
    description: '0000',
  })
  public readonly password: string;
}
