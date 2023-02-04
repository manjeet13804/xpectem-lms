import { ApiModelProperty } from '@nestjs/swagger';

export class NotificationResponse {
  @ApiModelProperty()
  public readonly id: number;

  @ApiModelProperty()
  public readonly header: string;

  @ApiModelProperty()
  public readonly recipientUserId: number;

  @ApiModelProperty()
  public readonly isRead: number;

  @ApiModelProperty()
  public readonly createdAt: string;
}

export class AdminNotificationListResponseDto {
  @ApiModelProperty({ isArray: true, type: NotificationResponse })
  public readonly notifications: NotificationResponse[];

  @ApiModelProperty()
  public readonly total: number;
}
