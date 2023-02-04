import { ApiModelProperty } from '@nestjs/swagger';
import { NotificationTargetTypeEnum } from "../enum/notification-target-type.enum";
import { AdminNotificationNormalTypeEnum } from "../enum/admin-notification-normal-type.enum";
import { NotificationReminderTypeEnum } from "../enum/notification-reminder-type.enum";
import moment = require("moment");

class NotificationSchedule {

  @ApiModelProperty()
  public type: string;

  @ApiModelProperty()
  public countDays: number;

  @ApiModelProperty()
  public percent: number;
}

export class Translations {
  @ApiModelProperty({ example: 'message text' })
  message: string;

  @ApiModelProperty({ example: 'language number' })
  language: number;
}

export class AdminNotificationDto {
  @ApiModelProperty()
  public readonly limit: number;

  @ApiModelProperty()
  public readonly offset: number;

  @ApiModelProperty({ required: false })
  public readonly lmsGroupId: number;

  @ApiModelProperty({ required: false })
  public readonly organisationId: number;

  @ApiModelProperty({ required: false })
  public readonly groupId: number;


  @ApiModelProperty({ required: false })
  public readonly userId: number;

  @ApiModelProperty({ required: false })
  public readonly createdStartDate: string;

  @ApiModelProperty({ required: false })
  public readonly createdEndDate: string;

  @ApiModelProperty({ required: false })
  public readonly isAutomaticReminders: boolean;
}

export class AllNotificationsDto {
  @ApiModelProperty()
  id: number;

  @ApiModelProperty()
  header: string;

  @ApiModelProperty()
  createdAt: string;

  @ApiModelProperty()
  isRead: boolean;
}

export class AdminNotificationsCreateDto {
  @ApiModelProperty()
  public readonly type: string;

  @ApiModelProperty({ required: false })
  public readonly studentId: number;

  @ApiModelProperty({ required: false })
  public readonly lmsGroupId: number;

  @ApiModelProperty()
  public readonly message: string;

  @ApiModelProperty({ example: 'header text', description: 'text' })
  public readonly header: string;

  @ApiModelProperty({ required: false })
  public readonly schedule: NotificationSchedule;
}

export class NotificationsCreateDto {
  @ApiModelProperty({ example: 'header text', description: 'text' })
  public readonly header: string;

  @ApiModelProperty()
  translations: Translations[];

  @ApiModelProperty()
  public readonly targetType: NotificationTargetTypeEnum;

  @ApiModelProperty()
  public readonly notificationType: AdminNotificationNormalTypeEnum;

  @ApiModelProperty()
  public readonly reminderType: NotificationReminderTypeEnum;

  @ApiModelProperty({
    required: false,
    example: 'lmsGroup id',
    description: '0',
  })
  public readonly lmsGroupId: number;

  @ApiModelProperty({
    required: false,
    example: 'organisation id',
    description: '0',
  })
  public readonly organisationId: number;

  @ApiModelProperty({
    required: false,
    example: 'group id',
    description: '0',
  })
  public readonly groupId: number;

  @ApiModelProperty({
    required: false,
    isArray: true,
    example: 'courses ids',
    description: '0',
  })
  public readonly coursesIds: number[];
}

export class SearchAdminNotificationsDto {
  @ApiModelProperty({ required: false })
  public readonly lmsGroupId: number;
}

export class AdminNotificationDateRangeDto {

  @ApiModelProperty({ example: moment().format(), required: false })
  public createdStartDate: string;

  @ApiModelProperty({ example: moment().format(), required: false })
  public createdEndDate: string;

  @ApiModelProperty()
  public limit: number;

  @ApiModelProperty()
  public offset: number;
}
