import { INPUTS_NOTIFICATIONS } from 'constants/inputs';
import * as Yup from 'yup';
import {
  ERRORS,
  name,
} from './constants';

const studentYup = {
  [INPUTS_NOTIFICATIONS.student]: Yup
    .string().when('LMSGroup', {
      is: LMSGroup => !LMSGroup,
      then: Yup.string().required(),
    }),
};

const LMSGroupYup = {
  [INPUTS_NOTIFICATIONS.LMSGroup]: Yup
    .string().when('student', {
      is: student => !student,
      then: Yup.string().required(),
    }),
};

const triggerTypeYup = {
  [INPUTS_NOTIFICATIONS.triggerType]: Yup
    .string().when('sendToType', {
      is: sendToType => !sendToType,
      then: Yup.string().required(),
    }),
};

const notificationTypeYup = {
  [INPUTS_NOTIFICATIONS.notificationType]: Yup
    .string().required(ERRORS.required),
};

const NOTIFICATIONS_SHEMA = Yup.object().shape({
  ...name(INPUTS_NOTIFICATIONS.header),
  ...name(INPUTS_NOTIFICATIONS.message),
  ...studentYup,
  ...LMSGroupYup,
}, ['student', 'LMSGroup']);

const NOTIFICATIONS_SHEMA_EVENT = Yup.object().shape({
  ...name(INPUTS_NOTIFICATIONS.header),
  ...triggerTypeYup,
}, ['triggerType']);

const SEND_NOTIFICATIONS_SCHEMA = Yup.object().shape({
  ...name(INPUTS_NOTIFICATIONS.header),
  ...name(INPUTS_NOTIFICATIONS.translations),
  ...notificationTypeYup,
});

const AUTOMATIC_REMINDERS_SCHEMA = Yup.object().shape({
  ...name(INPUTS_NOTIFICATIONS.message),
});

export {
  NOTIFICATIONS_SHEMA,
  NOTIFICATIONS_SHEMA_EVENT,
  SEND_NOTIFICATIONS_SCHEMA,
  AUTOMATIC_REMINDERS_SCHEMA,
};
