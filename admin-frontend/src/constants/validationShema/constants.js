import * as Yup from 'yup';
import { REGEXP } from '../regexp';

const ERRORS = {
  min_name: 'Name couldn’t be less then 1 symbol',
  required: 'This field is required',
  email: 'Enter valid email',
  min_password: 'Password couldn’t be less then 5 symbols',
  phone: 'Phone number is not valid',
  file_format: 'File format is not correct',
  file_size: 'File has an invalid size',
  personNumberReg: 'Invalid person number',
  employeNumber: 'Only numbers allowed',
  firstAndLastName: 'Numbers not allowed',
};

const checkIfFileAreTooBig = (file) => {
  let valid = true;
  if (typeof file === 'string') { return valid; }
  if (file) {
    const size = file.size / 1024 / 1024;
    if (size > 5) {
      valid = false;
    }
  }
  return valid;
};

const checkIfFileAreCorrectType = (file) => {
  let valid = true;
  if (typeof file === 'string') { return valid; }
  if (file) {
    if (!['application/pdf', 'image/jpeg', 'image/png'].includes(file.type)) {
      valid = false;
    }
  }
  return valid;
};

const checkForPhone = phone => (phone ? phone.match(REGEXP.getPhoneNumber) : true);

const name = key => ({
  [key]: Yup.string()
    .min(1, ERRORS.min_name)
    .required(ERRORS.required),
});

const firstAndLastNames = key => ({
  [key]: Yup.string()
    .min(1, ERRORS.min_name)
    .required(ERRORS.required),
});

const email = key => ({
  [key]: Yup.string()
    .email(ERRORS.email)
    .required(ERRORS.required),
});

const optionalEmail = key => ({
  [key]: Yup.string()
    .email(ERRORS.email),
});

const password = key => ({
  [key]: Yup.string()
    .min(5, ERRORS.min_password)
    .required(ERRORS.required),
});

const phone = key => ({
  [key]: Yup.string()
    .test('is good phone', ERRORS.phone, checkForPhone),
});

const fileImg = key => ({
  [key]: Yup.mixed()
    .required(ERRORS.required)
    .test('is-correct-file', ERRORS.file_format, checkIfFileAreCorrectType)
    .test('is-big-file', ERRORS.file_format, checkIfFileAreTooBig),
});

const personNumber = key => ({
  [key]: Yup.string()
    .required(ERRORS.required)
    .matches(REGEXP.personNumberReg, ERRORS.personNumberReg),
});

const employeNumber = key => ({
  [key]: Yup.string().matches(REGEXP.onlyNumbers, ERRORS.employeNumber),
});

const timeField = key => ({
  [key]: Yup.string().matches(REGEXP.onlyNumbers, ERRORS.employeNumber).required(ERRORS.required),
});

const streetAddress = key => ({
  [key]: Yup.string().required(ERRORS.required),
});

export {
  name,
  email,
  optionalEmail,
  password,
  phone,
  fileImg,
  checkIfFileAreTooBig,
  checkIfFileAreCorrectType,
  ERRORS,
  personNumber,
  employeNumber,
  firstAndLastNames,
  timeField,
  streetAddress,
};
