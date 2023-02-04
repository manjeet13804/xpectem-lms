import * as Yup from 'yup';
import {
  phone,
  firstAndLastNames,
  email,
  optionalEmail,
  employeNumber,
} from './constants';

const STUDENT_SCHEMA = Yup.object().shape({
  ...firstAndLastNames('firstName'),
  ...firstAndLastNames('lastName'),
  ...email('firstEmail'),
  ...optionalEmail('secondEmail'),
  ...phone('firstPhone'),
  ...phone('secondPhone'),
  ...employeNumber('employeeNumber'),
});

export default STUDENT_SCHEMA;
