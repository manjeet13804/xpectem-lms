import { ApiModelProperty } from '@nestjs/swagger';

export class AddEmailDto {
  @ApiModelProperty()
  public readonly token: string;
}
