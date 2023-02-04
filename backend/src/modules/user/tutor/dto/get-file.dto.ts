import { ApiModelProperty } from '@nestjs/swagger';

export class GetFileDto {
  @ApiModelProperty()
  public readonly id: number;

  @ApiModelProperty()
  public readonly name: string;

  @ApiModelProperty()
  public readonly url: string;
}
