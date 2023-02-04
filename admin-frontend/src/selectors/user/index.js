import { createSelector } from 'reselect';
import fp from 'lodash/fp';

const getUserSelector = ({ user }) => user;

const getUserIdFp = createSelector(
  getUserSelector,
  fp.get('id'),
);

const getUserAvatarFp = createSelector(
  getUserSelector,
  fp.get('avatar'),
);

const getFirstNameFp = createSelector(
  getUserSelector,
  fp.get('firstName'),
);

const getLastNameFp = createSelector(
  getUserSelector,
  fp.get('lastName'),
);


export {
  getUserIdFp,
  getUserAvatarFp,
  getFirstNameFp,
  getLastNameFp,
};
