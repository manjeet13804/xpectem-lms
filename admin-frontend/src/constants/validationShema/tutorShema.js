import { INPUTS_TUTORS } from 'constants/inputs';
import * as Yup from 'yup';
import {
  name,
  email,
  optionalEmail,
  phone,
  fileImg,
} from './constants';

const TUTOR_SHEMA = Yup.object().shape({
  ...name(INPUTS_TUTORS.firstName),
  ...name(INPUTS_TUTORS.lastName),
  ...email(INPUTS_TUTORS.firstEmail),
  ...optionalEmail(INPUTS_TUTORS.secondEmail),
  ...phone(INPUTS_TUTORS.firstPhoneNumber),
  ...phone(INPUTS_TUTORS.secondPhoneNumber),
  ...fileImg(INPUTS_TUTORS.file),
});

export default TUTOR_SHEMA;
