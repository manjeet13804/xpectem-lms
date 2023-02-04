import { ApiModelProperty } from '@nestjs/swagger';
import { GetFileDto } from './get-file.dto';

export class GetFolderDto {
  @ApiModelProperty()
  public readonly id: number;

  @ApiModelProperty()
  public readonly name: string;
}

export class GetFoldersAndFilesDto extends GetFolderDto {
  @ApiModelProperty({
    type: GetFileDto,
    isArray: true,
  })
  public readonly files: GetFileDto[];
}
