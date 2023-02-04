// @flow
import {
  START,
  SUCCESS,
  FAIL,
} from 'redux/@utils/actionSuffixes';

export default (arrayTypes: Array<string>): object => {
  const types = {};

  arrayTypes.forEach((type: string) => {
    const typeStart = `${type}_${START}`;
    const typeFail = `${type}_${FAIL}`;
    const typeSuccess = `${type}_${SUCCESS}`;

    types[typeStart] = typeStart;
    types[typeFail] = typeFail;
    types[typeSuccess] = typeSuccess;
  });

  return types;
};
