import * as joi from "joi";

export const getAdminOrganisationSchema = {
  lmsGroup: joi.number(),
  name: joi.string().trim(),
  createdAt: joi.date().iso(),
  onlyActive: joi.boolean(),
}

export const postAdminOrganisationSchema = {
  name: joi.string().required(),
  lmsGroup: joi.number().min(1).integer().required(),
  translations: joi.array().items(joi.object().keys({
    language: joi.number().min(1).integer().required(),
    description: joi.string().trim(),
    adminWelcomeText: joi.string().trim(),
    studentWelcomeText: joi.string().trim(),
  })),
  adminFullAccess: joi.boolean().required(),
  isActive: joi.boolean().required()
}

export const putAdminOrganisationSchema = {
  name: joi.string(),
  translations: joi.array().items(joi.object().keys({
    language: joi.number().min(1).integer().required(),
    description: joi.string(),
    adminWelcomeText: joi.string(),
    studentWelcomeText: joi.string(),
  })),
  adminFullAccess: joi.boolean(),
  isActive: joi.boolean().required(),
  logoImageUri: joi.string(),
}
