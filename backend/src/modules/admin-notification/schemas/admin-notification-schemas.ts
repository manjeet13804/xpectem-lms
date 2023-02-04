import * as joi from "joi";
import { NotificationTargetTypeEnum } from "../enum/notification-target-type.enum";
import { AdminNotificationNormalTypeEnum } from "../enum/admin-notification-normal-type.enum";
import { NotificationReminderTypeEnum } from "../enum/notification-reminder-type.enum";

export const adminNotificationValidation = {
  limit: joi.number().positive().integer().required(),
  offset: joi.number().integer().required(),
  lmsGroupId: joi.number().positive().integer(),
  organisationId: joi.number().positive().integer(),
  groupId: joi.number().positive().integer(),
  userId: joi.number().positive().integer(),
  createdStartDate: joi.string(),
  createdEndDate: joi.string(),
  isAutomaticReminders: joi.boolean(),
}

export const createNotificationValidation = {
  header: joi.string().required(),
  translations: joi.array().items(joi.object().keys({
    id: joi.number().positive().integer(),
    language: joi.number().min(1).integer().required(),
    message: joi.string().trim(),
  })).required(),
  targetType: joi.string().valid(Object.values(NotificationTargetTypeEnum)).required(),
  notificationType: joi.string().valid(Object.values(AdminNotificationNormalTypeEnum)).required(),
  reminderType: joi.when('notificationType', {
    is: AdminNotificationNormalTypeEnum.REMINDER,
    then: joi.string().valid(Object.values(NotificationReminderTypeEnum)).required(),
    otherwise: joi.forbidden(),
  }),
  lmsGroupId: joi.number().positive().integer(),
  organisationId: joi.number().positive().integer(),
  groupId: joi.number().positive().integer(),
  coursesIds:  joi.array().items(joi.number().positive().integer()),
}
