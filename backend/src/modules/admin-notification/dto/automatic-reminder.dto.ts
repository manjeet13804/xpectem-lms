import { ApiModelProperty } from "@nestjs/swagger";
import { Translations } from "./admin-notification.dto";

export class AutomaticReminderNotificationDto {
  @ApiModelProperty({ example: 'lmsGroup id', description: '0' })
  public readonly lmsGroupId: number;

  @ApiModelProperty({ example: 'header text', description: 'text' })
  header: string;

  @ApiModelProperty({ example: 'percent', description: '10%' })
  percent: number;

  @ApiModelProperty()
  translations: Translations[];

  @ApiModelProperty({
    default: false,
    example: 'enable',
    description: 'true',
  })
  public readonly enable: boolean;
}

export class AutomaticReminderNotificationEnableDto {
  @ApiModelProperty({ example: 'notification id', description: '0' })
  public readonly id: number;

  @ApiModelProperty({
    example: 'enable',
    description: 'true',
  })
  public readonly enable: boolean;
}
