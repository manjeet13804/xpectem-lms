import { ApiModelProperty } from '@nestjs/swagger';

export class ForgotPasswordDto {
  @ApiModelProperty()
  public readonly email: string;
}
