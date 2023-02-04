import { string, object } from 'yup';
import { REGEXP } from 'constants/regexp';

const REQUIRED = 'Required';
const MINIMUM_ONE_SYMBOL = 'Minimum 2 symbol';
const INVALID_NUMBER = 'Invalid number';

export default object().shape({
  city: string()
    .test('len', MINIMUM_ONE_SYMBOL, val => val.length > 1)
    .test('len', REQUIRED, val => val.length),
  street: string()
    .test('len', MINIMUM_ONE_SYMBOL, val => val.length > 1)
    .test('len', REQUIRED, val => val.length),
  startAt: string()
    .required(REQUIRED),
  zip: string()
    .required(REQUIRED)
    .test('len', INVALID_NUMBER, val => !val || REGEXP.onlyNumbers.test(val)),
});
