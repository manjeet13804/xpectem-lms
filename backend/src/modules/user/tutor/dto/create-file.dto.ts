import { ApiModelProperty } from '@nestjs/swagger';

export class CreateFileDto {
  @ApiModelProperty()
  public readonly folderId: number;
}
