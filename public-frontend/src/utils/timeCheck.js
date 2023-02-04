// @flow
import { TWENTY_HOURS } from 'constants/constants';

const timeCheck = (date1: Date, date2: Date): boolean => (date1 - date2 > TWENTY_HOURS);

export default timeCheck;
