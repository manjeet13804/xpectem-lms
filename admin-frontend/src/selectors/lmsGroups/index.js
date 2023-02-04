import { createSelector } from 'reselect';
import fp from 'lodash/fp';

const getLmsGroupsSelector = ({lmsGroups}) => lmsGroups;

const getCurrentLmsGroupFp = createSelector(
  getLmsGroupsSelector,
  fp.get('currentLmsGroup'),
);

const getCurrentIdLmsGroupFp = createSelector(
  getLmsGroupsSelector,
  fp.get('currentId'),
);

const getEditStatusFp = createSelector(
  getLmsGroupsSelector,
  fp.get('isEditLmsGroup'),
);
const getAddedStatusFp = createSelector(
  getLmsGroupsSelector,
  fp.get('isAddedLmsGroup'),
);

const getLoadingLmsGroupFp = createSelector(
  getLmsGroupsSelector,
  fp.get('isLoadingLmsGroup'),
)

export {
  getLoadingLmsGroupFp,
  getLmsGroupsSelector,
  getCurrentLmsGroupFp,
  getCurrentIdLmsGroupFp,
  getEditStatusFp,
  getAddedStatusFp,
};
