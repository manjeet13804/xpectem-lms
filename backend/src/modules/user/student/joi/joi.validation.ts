import * as config from 'config';
import * as joi from 'joi';

const MAX_EMAIL_COUNT: number = config.get('user.account.maxEmailCount');
const MAX_PHONE_COUNT: number = config.get('user.account.maxPhoneCount');

const importStudent = joi.array().items(joi.object().keys({
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  email: joi.array().items(joi.string().email()).min(1).max(MAX_EMAIL_COUNT).unique().required(),
  phone: joi.array().items(joi.string()).max(MAX_PHONE_COUNT).unique(),
  language: joi.number().min(1).integer().required(),
  notifyEmail: joi.boolean(),
  notifySms: joi.boolean(),
  note: joi.string(),
})).min(1).unique().required();

 const importStudentsFile = {
  headers: joi
    .array()
    .items(joi.string())
    .required(),
  groups: joi
    .array()
    .items(
      joi
        .number()
        .positive()
        .integer(),
    )
    .min(1)
    .required(),
  courses: joi
    .array()
    .items(
      {
        id: joi
          .number()
          .integer()
          .required(),
        dateBegin: joi.date(),
      }
    )
    .unique()
    .required(),
}

export {
  importStudent,
  MAX_EMAIL_COUNT,
  MAX_PHONE_COUNT,
  importStudentsFile,
};
