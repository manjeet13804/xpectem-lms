import { INPUTS_NAMES } from 'constants/inputs';
import * as Yup from 'yup';
import {
  name,
  email,
  password,
} from './constants';

const USER_SHEMA = Yup.object().shape({
  ...name(INPUTS_NAMES.name),
  ...email(INPUTS_NAMES.email),
  ...password(INPUTS_NAMES.password),
});

export default USER_SHEMA;
