import { ApiModelProperty } from '@nestjs/swagger';

export class NotificationDeleteDto {
  @ApiModelProperty()
  public readonly notifications: number[];
}
