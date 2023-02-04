import * as Yup from 'yup';
import {ERRORS} from 'localise';
import { phoneRegExp } from 'constants/regExp';

const email = Yup.string()
  .email(ERRORS.invalidEmail)
  .required(ERRORS.required);

const firstName = Yup.string()
  .min(3, ERRORS.minCharacters(3))
  .max(50, ERRORS.maxCharacters(50))
  .required(ERRORS.required);

const lastName = Yup.string()
  .min(3, ERRORS.minCharacters(3))
  .max(50, ERRORS.maxCharacters(50))
  .required(ERRORS.required);

const telephone = Yup.string()
  .matches(phoneRegExp, ERRORS.telephone);

const organisation = Yup.string()
  .max(50, ERRORS.maxCharacters(50))
  .min(3, ERRORS.minCharacters(3));

const streetAddress = Yup.string()
  .max(50, ERRORS.maxCharacters(80))
  .min(3, ERRORS.minCharacters(3));

const password = Yup.string()
  .min(5, ERRORS.minCharacters(5))
  .max(50, ERRORS.maxCharacters(50))
  .required(ERRORS.required);

const additionalEmail = Yup.string()
  .email(ERRORS.invalidEmail);

export {
  password,
  organisation,
  email,
  firstName,
  lastName,
  telephone,
  streetAddress,
  additionalEmail,
};
