import { ApiModelProperty } from "@nestjs/swagger";
import { NotificationTriggerType } from "../entity/notification-triggers.entity";
import { NotificationTranslation } from "../../notification/NotificationTranslation.entity";

export class AdminNotificationTriggerDto {
  @ApiModelProperty({ example: 'event notification id', description: 'approved_assignment' })
  public readonly type: NotificationTriggerType;

  @ApiModelProperty({ example: 'header text', description: 'text' })
  header: string;

  @ApiModelProperty({type: [NotificationTranslation]})
  translations: NotificationTranslation[];
}

export class AdminNotificationTriggersResponseDto {
  @ApiModelProperty()
  public readonly id: number;

  @ApiModelProperty()
  public readonly type: string;

  @ApiModelProperty()
  public readonly header: string;

  @ApiModelProperty()
  public readonly message: string;

  @ApiModelProperty()
  public readonly createdAt: string;
}
