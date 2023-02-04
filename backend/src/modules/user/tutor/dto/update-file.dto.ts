import { ApiModelProperty } from '@nestjs/swagger';
import { GetFolderDto } from './get-folder.dto';

export class UpdateFileRequestDto {
  @ApiModelProperty()
  public readonly folderName: string;

  @ApiModelProperty()
  public readonly fileName: string;

  @ApiModelProperty()
  public readonly folderId: number;
}

export class UpdateFileResponseDto {
  @ApiModelProperty()
  public readonly id: number;

  @ApiModelProperty()
  public readonly name: string;

  @ApiModelProperty()
  public readonly url: string;

  @ApiModelProperty({
    type: GetFolderDto,
  })
  public readonly folder: GetFolderDto;
}
