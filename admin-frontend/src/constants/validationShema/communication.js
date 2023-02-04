import { INPUTS_COMMUNICATION } from 'constants/inputs';
import * as Yup from 'yup';
import {
  name,
} from './constants';

const COMMUNICATION_SHEMA = Yup.object().shape({
  ...name(INPUTS_COMMUNICATION.headerMessage),
});

export default COMMUNICATION_SHEMA;
