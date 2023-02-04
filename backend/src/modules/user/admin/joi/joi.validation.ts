import * as config from 'config';
import * as joi from 'joi';

const MAX_EMAIL_COUNT: number = config.get('user.account.maxEmailCount');
const MAX_PHONE_COUNT: number = config.get('user.account.maxPhoneCount');

const importOrganisationAdmin = joi.array().items(joi.object().keys({
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  email: joi.array().items(joi.string().email()).min(1).max(MAX_EMAIL_COUNT).unique().required(),
  phone: joi.array().items(joi.string()).max(MAX_PHONE_COUNT).unique(),
  language: joi.number().min(1).integer().required(),
  notifyEmail: joi.boolean(),
  notifySms: joi.boolean(),
})).min(1).unique().required();

const addExistingAdminSchema = joi.object().keys({
  email: joi.array().items(joi.string().email()).min(1).max(MAX_EMAIL_COUNT).required(),
  idLmsGroup: joi.number().positive().integer().required(),
});

const createAdminGroupSchema = joi.object().keys({
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  email: joi.array().items(joi.string()).min(1).max(MAX_EMAIL_COUNT).required(),
  phone: joi.array().items(joi.string().allow('')).min(1).max(MAX_PHONE_COUNT),
  language: joi.number().positive().integer().required(),
  notifyEmail: joi.boolean().required(),
  notifySms: joi.boolean().required(),
  groups: joi.array().items(joi.number().positive().integer()).min(1).required(),
  avatar: joi.string(),
  isDeactivated: joi.boolean(),
  organisations: joi.array().items(joi.number().positive().integer()).min(1)
})

const createAdminOrganizationSchema = joi.object().keys({
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  email: joi.array().items(joi.string().email()).min(1).max(MAX_EMAIL_COUNT).required(),
  phone: joi.array().items(joi.string()).min(1).max(MAX_PHONE_COUNT),
  language: joi.number().positive().integer().required(),
  notifyEmail: joi.boolean().required(),
  notifySms: joi.boolean().required(),
  organisations: joi.array().items(joi.number().positive().integer()).min(1).required(),
  avatar: joi.string(),
  isDeactivated: joi.boolean(),
  groups: joi.array().items(joi.number().positive().integer()).min(1)
})

export {
  createAdminOrganizationSchema,
  createAdminGroupSchema,
  importOrganisationAdmin,
  addExistingAdminSchema,
  MAX_EMAIL_COUNT,
  MAX_PHONE_COUNT,
};
