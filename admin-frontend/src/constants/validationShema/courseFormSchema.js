import * as Yup from 'yup';
import {
  name,
  timeField,
} from './constants';

const COURSE_FORM_SCHEMA = Yup.object().shape({
  ...name('title'),
  ...timeField('accessTime'),
  ...timeField('timeToComplete'),
});

export default COURSE_FORM_SCHEMA;
