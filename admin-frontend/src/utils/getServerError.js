import _ from 'lodash'
import { ERRORS_DICTIONARY } from 'constants/constants';

const { UNKNOWN_ERROR } = ERRORS_DICTIONARY;

export default (error) => _.get(error, 'response.data.message', UNKNOWN_ERROR);