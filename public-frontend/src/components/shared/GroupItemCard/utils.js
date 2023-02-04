// @flow

import { TERM_SHARED } from 'localise';

const getRenderData = (students: number, courses: number, active: number): Array<object> => {
  const RENDER_LIST = [
    {
      name: TERM_SHARED.students,
      value: active,
    },
    {
      name: TERM_SHARED.courses,
      value: courses,
    },
    {
      name: TERM_SHARED.active,
      value: active,
    },
  ];
  return RENDER_LIST;
};
export default getRenderData;
