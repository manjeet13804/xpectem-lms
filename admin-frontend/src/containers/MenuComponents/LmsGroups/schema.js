import React from 'react';
import { string, number, object } from 'yup';
import moment from 'moment';
import IntlMessages from 'components/utility/intlMessages';
import { REGEXP } from '../../../constants/regexp';

const { email } = REGEXP;

const REQUIRED = <IntlMessages id="validation.errors.required" />;
const MINIMUM_ONE = <IntlMessages id="validation.errors.minimumOne" />;
const MINIMUM_ONE_SYMBOL = <IntlMessages id="validation.errors.minimumOneSymbols" />;
const INVALID_EMAILS = <IntlMessages id="lmsGroups.errors.invalidEmail" />;
const SPACES_ARE_NOT_ALLOWED = <IntlMessages id="lmsGroups.errors.noSpaces" />;

const minimumSchema = (
  number()
    .typeError(MINIMUM_ONE)
    .min(1, MINIMUM_ONE)
);

export default object().shape({
  name: string()
    .test('len', MINIMUM_ONE_SYMBOL, val => val.length >= 1)
    .test('len', REQUIRED, val => val.length),
  accessExpireAt: string()
    .required(REQUIRED)
    .test('len', MINIMUM_ONE, (val) => {
      const days = moment(moment(val).startOf('day')).diff(moment().startOf('day'), 'days');

      return days >= 1;
    }),
  maxLmsGroupAdmins: minimumSchema,
  maxOrganisations: minimumSchema,
  maxOrganisationAdmins: minimumSchema,
  maxCourses: minimumSchema,
  maxStudents: minimumSchema,
  orderEmails: string().nullable()
    .test('space', SPACES_ARE_NOT_ALLOWED, val => !/\s/g.test(val))
    .test('len', INVALID_EMAILS, (val) => {
      if (val && val.length) {
        const splitValue = val.split(',');
        const allEmailsValid = splitValue.every(item => email.test(item));

        return allEmailsValid;
      }

      return true;
    }),
});
