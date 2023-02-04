import { createSelector } from 'reselect';
import fp from 'lodash/fp';

const getAuthSelector = ({ Auth }) => Auth;

const getIdFp = createSelector(
  getAuthSelector,
  fp.get('id'),
);

export {
  getIdFp,
};
