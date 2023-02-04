import * as joi from "joi";

export const commonSchema = {
  name: joi.string().required(),
  translations: joi.array().items(joi.object().keys({
    language: joi.number().positive().integer(),
    description: joi.string().trim(),
    adminWelcomeText: joi.string().trim(),
    studentWelcomeText: joi.string().trim(),
  })),
  accessExpireAt: joi.date().iso().required(),
  maxLmsGroupAdmins: joi.number().positive().integer().required(),
  maxOrganisations: joi.number().positive().integer().required(),
  maxOrganisationAdmins: joi.number().positive().integer().required(),
  maxCourses: joi.number().positive().integer().required(),
  maxStudents: joi.number().positive().integer().required(),
  isActive: joi.boolean().required(),
  notifySms: joi.boolean().required(),
  hasAccessToMmc: joi.boolean().required(),
  orderEmails: joi.array().items(joi.string().email()),
  logoImageUri: joi.string(),
}

export const lmsAdminSchema = {
  name: joi.string().required(),
  translations: joi.array().items(joi.object().keys({
    language: joi.number().positive().integer(),
    description: joi.string().trim(),
    adminWelcomeText: joi.string().trim(),
    studentWelcomeText: joi.string().trim(),
  })),
  notifySms: joi.boolean().required(),
  orderEmails: joi.array().items(joi.string().email()),
  logoImageUri: joi.string(),
}
