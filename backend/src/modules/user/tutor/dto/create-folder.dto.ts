import { ApiModelProperty } from '@nestjs/swagger';

export class CreateFolderRequestDto {
  @ApiModelProperty()
  public readonly folderName: string;
}

export class CreateFolderResponseDto {
  @ApiModelProperty()
  public readonly id: string;

  @ApiModelProperty()
  public readonly name: string;
}
