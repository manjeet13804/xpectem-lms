import React from "react";
import { string, object } from 'yup';
import IntlMessages from 'components/utility/intlMessages';

const REQUIRED = <IntlMessages id="validation.errors.required" />;
const MINIMUM_ONE_SYMBOL = <IntlMessages id="validation.errors.minimumOneSymbols" />;

export default object().shape({
  name: string()
    .test('len', MINIMUM_ONE_SYMBOL, (val) => val.length >= 1)
    .test('len', REQUIRED, (val) => val.length),
});
