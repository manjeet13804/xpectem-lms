import * as Yup from 'yup';
import {
  email,
  telephone,
  additionalEmail,
} from '../validate';

const validationSchema = Yup.object().shape({
  email1: email,
  email2: additionalEmail,
  email3: additionalEmail,
  phone1: telephone,
  phone2: telephone,
  phone3: telephone,
});

export default validationSchema;
