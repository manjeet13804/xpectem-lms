import { createSelector } from 'reselect';
import fp from 'lodash/fp';

const getLmsGroupAdminSelector = ({lmsGroupAdmins}) => lmsGroupAdmins;

const getCurrentAdminFp = createSelector(
  getLmsGroupAdminSelector,
  fp.get('currentAdmin'),
);

const getSearchDataLmsGroupFp = createSelector(
  getLmsGroupAdminSelector,
  fp.get('searchData'),
);

const getCurrentLmsGroupIdFp = createSelector(
  getLmsGroupAdminSelector,
  fp.get('currentLmsGroupId'),
);

const getCurrentAdminIdFp = createSelector(
  getLmsGroupAdminSelector,
  fp.get('currentLmsGroupAdminId'),
);

const getSearchAdminsDataLmsGroupFp = createSelector(
  getLmsGroupAdminSelector,
  fp.get('searchAdminsData'),
);

const getErrorInAddAdminLmsGroupFp = createSelector(
  getLmsGroupAdminSelector,
  fp.get('error'),
);

const getAddedStatusFp = createSelector(
  getLmsGroupAdminSelector,
  fp.get('isAddedAdmin'),
);

const getEditStatusFp = createSelector(
  getLmsGroupAdminSelector,
  fp.get('isEditAdmin'),
);

const getDeletedStatusFp = createSelector(
  getLmsGroupAdminSelector,
  fp.get('isDeleteAdmin'),
);

export {
  getLmsGroupAdminSelector,
  getCurrentAdminFp,
  getAddedStatusFp,
  getCurrentLmsGroupIdFp,
  getErrorInAddAdminLmsGroupFp,
  getSearchDataLmsGroupFp,
  getSearchAdminsDataLmsGroupFp,
  getCurrentAdminIdFp,
  getEditStatusFp,
  getDeletedStatusFp,
};
