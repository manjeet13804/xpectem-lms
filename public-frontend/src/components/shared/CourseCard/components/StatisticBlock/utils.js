// @flow

import { TERM_SHARED } from 'localise';

const PREFIX_ENUM = {
  active: 'active',
  total: 'total',
  new: 'new',
};

const getRenderData = (active: number, total: number, newCount: number): Array<object> => {
  const RENDER_LIST = [
    {
      name: TERM_SHARED.active,
      value: active,
      prefix: PREFIX_ENUM.active,
    },
    {
      name: TERM_SHARED.total,
      value: total,
      prefix: PREFIX_ENUM.total,
    },
    {
      name: TERM_SHARED.new,
      value: newCount,
      prefix: PREFIX_ENUM.new,
    },
  ];
  return RENDER_LIST;
};
export default getRenderData;
