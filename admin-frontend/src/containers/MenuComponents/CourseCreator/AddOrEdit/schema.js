import { string, object } from 'yup';
import { REGEXP } from 'constants/regexp';
import EmailValidator from 'email-validator';

const REQUIRED = 'Required';
const MINIMUM_ONE_SYMBOL = 'Minimum 2 symbol';
const INVALID_EMAIL = 'Invalid email';
const INVALID_NUMBER = 'Invalid number';
const INVALID_EMPLOYENUMBER = 'Only numbers are allowed';

const checkForPhone = phone => (phone ? phone.match(REGEXP.getPhoneNumber) : true);

export default object().shape({
  firstName: string()
    .test('len', MINIMUM_ONE_SYMBOL, val => val.length >= 1)
    .test('len', REQUIRED, val => val.length),
  lastName: string()
    .test('len', MINIMUM_ONE_SYMBOL, val => val.length >= 1)
    .test('len', REQUIRED, val => val.length),
  firstEmail: string()
    .test('len', INVALID_EMAIL, EmailValidator.validate)
    .required(REQUIRED),
  secondEmail: string()
    .test('len', INVALID_EMAIL, val => !val || EmailValidator.validate(val)),
  firstTelephone: string().test('is good phone', INVALID_NUMBER, checkForPhone),
  secondTelephone: string().test('is good phone', INVALID_NUMBER, checkForPhone),
  employeeNumber: string()
    .test('len', INVALID_EMPLOYENUMBER, val => !val || REGEXP.onlyNumbers.test(val))
    .nullable(),
});
