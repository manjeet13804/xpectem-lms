import * as joi from "joi";
import {NotificationTriggerType} from "../entity/notification-triggers.entity";

export const getTriggersValidation = {
  createdStartDate: joi.date(),
    createdEndDate: joi.date(),
}


export const adminNotificationTriggerValidation = {
  type: joi.string().valid(Object.values(NotificationTriggerType)).required(),
  header: joi.string().required(),
  translations: joi.array().items(joi.object().keys({
    id: joi.number().positive().integer(),
    language: joi.number().min(1).integer().required(),
    message: joi.string().trim(),
  })).required(),
}
