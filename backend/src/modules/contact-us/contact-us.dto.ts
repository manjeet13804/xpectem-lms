import { ApiModelProperty } from '@nestjs/swagger';

export class ContactUsSendMessageDto {
  @ApiModelProperty()
  public readonly courseId: string;

  @ApiModelProperty()
  public readonly message: string;

}
