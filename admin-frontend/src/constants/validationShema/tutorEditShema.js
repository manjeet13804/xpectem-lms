import { INPUTS_TUTORS } from 'constants/inputs';
import * as Yup from 'yup';
import {
  ERRORS,
  phone,
  checkIfFileAreCorrectType,
  checkIfFileAreTooBig,
} from './constants';

const nameEdit = key => ({
  [key]: Yup.string()
    .min(2, ERRORS.min_name),
});

const emailEdit = key => ({
  [key]: Yup.string()
    .email(ERRORS.email),
});

const optionalEmailEdit = key => ({
  [key]: Yup.string()
    .email(ERRORS.email),
});

const fileImgEdit = key => ({
  [key]: Yup.mixed()
    .test('is-correct-file', ERRORS.file_format, checkIfFileAreCorrectType)
    .test('is-big-file', ERRORS.file_format, checkIfFileAreTooBig),
});

const TUTOR_EDIT_SHEMA = Yup.object().shape({
  ...nameEdit(INPUTS_TUTORS.firstName),
  ...nameEdit(INPUTS_TUTORS.lastName),
  ...emailEdit(INPUTS_TUTORS.firstEmail),
  ...optionalEmailEdit(INPUTS_TUTORS.secondEmail),
  ...phone(INPUTS_TUTORS.firstPhoneNumber),
  ...phone(INPUTS_TUTORS.secondPhoneNumber),
  ...fileImgEdit(INPUTS_TUTORS.file),
});

export default TUTOR_EDIT_SHEMA;
