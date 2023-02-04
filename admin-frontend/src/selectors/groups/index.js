import { createSelector } from 'reselect';
import fp from 'lodash/fp';

const getGroupsSelector = ({ groups }) => groups;

const getCurrentGroupFp = createSelector(
  getGroupsSelector,
  fp.get('currentGroup'),
);

const getSearchLmsGroupsDataGroupsFp = createSelector(
  getGroupsSelector,
  fp.get('searchLmsGroupsData'),
);

const getSearchOrgDataGroupsFp = createSelector(
  getGroupsSelector,
  fp.get('searchOrgData'),
);

const getCurrentLmsGroupIdGroupsFp = createSelector(
  getGroupsSelector,
  fp.get('currentLmsGroupId'),
);

const getStatusAddedGroupGroups = createSelector(
  getGroupsSelector,
  fp.get('isAddedGroup'),
);

const getStatusEditGroupFp = createSelector(
  getGroupsSelector,
  fp.get('isEditGroup'),
);

const getCurrentNameLmsGroupGroupsFp = createSelector(
  getGroupsSelector,
  fp.get('currentNameLmsGroup'),
);

const getCurrentOrgIdGroupsFp = createSelector(
  getGroupsSelector,
  fp.get('currentOrgId'),
);

const getCurrentOrgNameGroupsFp = createSelector(
  getGroupsSelector,
  fp.get('currentNameOrg'),
);

const getSearchGroupDataGroupsFp = createSelector(
  getGroupsSelector,
  fp.get('searchGroupsData'),
);

const getCurrentGroupIdGroupsFp = createSelector(
  getGroupsSelector,
  fp.get('currentGroupId'),
);

const getStatusImportFileGroupsFp = createSelector(
  getGroupsSelector,
  fp.get('isImportFile'),
);

const getErrorImportGroupsFp = createSelector(
  getGroupsSelector,
  fp.get('errorImport'),
);

export {
  getCurrentGroupFp,
  getSearchLmsGroupsDataGroupsFp,
  getCurrentLmsGroupIdGroupsFp,
  getCurrentNameLmsGroupGroupsFp,
  getCurrentOrgIdGroupsFp,
  getSearchOrgDataGroupsFp,
  getStatusAddedGroupGroups,
  getCurrentOrgNameGroupsFp,
  getSearchGroupDataGroupsFp,
  getCurrentGroupIdGroupsFp,
  getStatusEditGroupFp,
  getStatusImportFileGroupsFp,
  getErrorImportGroupsFp,
};
