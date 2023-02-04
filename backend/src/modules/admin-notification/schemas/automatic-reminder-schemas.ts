import * as joi from "joi";

export const automaticReminderNotificationValidation = {
  lmsGroupId: joi.number().positive().integer().required(),
  enable: joi.boolean(),
  header: joi.string().trim(),
  translations: joi.array().items(joi.object().keys({
    id: joi.number().positive().integer(),
    language: joi.number().positive().integer(),
    message: joi.string().trim(),
  })),
  percent: joi.number().positive().integer(),
}

export const automaticReminderEnableValidation = {
  id: joi.number().positive().integer().required(),
  enable: joi.boolean().required().required(),
}
