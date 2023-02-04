import { ApiModelProperty } from '@nestjs/swagger';

export class UploadFilesDto {
  @ApiModelProperty()
  public readonly folderName: string;
}
