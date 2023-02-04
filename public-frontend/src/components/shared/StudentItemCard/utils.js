// @flow

import { TERM_SHARED } from 'localise';

const getRenderData = (days: number, study: number, result: object): Array<object> => {
  const subValue = `${result.done}/${result.total}`;
  const resultValue = `${Math.round(result.done * 100 / result.total)}%`;
  const RENDER_LIST = [
    {
      name: TERM_SHARED.daysLeft,
      value: days,
    },
    {
      name: TERM_SHARED.toStudy,
      value: study,
    },
    {
      name: TERM_SHARED.result,
      subname: subValue,
      value: resultValue,
    },
  ];
  return RENDER_LIST;
};
export default getRenderData;
