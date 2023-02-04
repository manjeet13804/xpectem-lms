import { createSelector } from 'reselect';
import fp from 'lodash/fp';

const getGroupAdminsSelector = ({ groupAdministrators }) => groupAdministrators;

const getCurrentAdminGroupAdminsFp = createSelector(
  getGroupAdminsSelector,
  fp.get('currentGroupAdmin'),
);

const getSearchLmsGroupsGroupAdminsFp = createSelector(
  getGroupAdminsSelector,
  fp.get('searchLmsGroupsData'),
);

const getSearchOrgGroupAdminsFp = createSelector(
  getGroupAdminsSelector,
  fp.get('searchOrgData'),
);

const getSearchGroupGroupAdminsFp = createSelector(
  getGroupAdminsSelector,
  fp.get('searchGroupsData'),
);

const getCurrentLmsGroupIdGroupAdminsFp = createSelector(
  getGroupAdminsSelector,
  fp.get('currentLmsGroupId'),
);

const getCurrentNameLmsGroupGroupAdminsFp = createSelector(
  getGroupAdminsSelector,
  fp.get('currentNameLmsGroup'),
);

const getCurrentOrgIdGroupAdminsFp = createSelector(
  getGroupAdminsSelector,
  fp.get('currentOrgId'),
);

const getCurrentOrgNameGroupAdminsFp = createSelector(
  getGroupAdminsSelector,
  fp.get('currentNameOrg'),
);

const getCurrentGroupIdGroupAdminsFp = createSelector(
  getGroupAdminsSelector,
  fp.get('currentGroupId'),
);

const getChosenGroupGroupAdminsFp = createSelector(
  getGroupAdminsSelector,
  fp.get('chosenGroup'),
);

const getStatusAddAdminGroupAdminFp = createSelector(
  getGroupAdminsSelector,
  fp.get('isAddedGroupAdmin'),
);

const getSearchAdminsGroupAdminsFp = createSelector(
  getGroupAdminsSelector,
  fp.get('searchAdminsData'),
);

const getCurrentAdminIdGroupAdminsFp = createSelector(
  getGroupAdminsSelector,
  fp.get('currentGroupAdminId'),
);

const getStatusEditAdminGroupAdminsFp = createSelector(
  getGroupAdminsSelector,
  fp.get('isEditGroupAdmin'),
);

const getStatusImportFileGroupAdminsFp = createSelector(
  getGroupAdminsSelector,
  fp.get('isImportFile'),
);

const getErrorImportGroupAdminsFp = createSelector(
  getGroupAdminsSelector,
  fp.get('errorImport'),
);

export {
  getCurrentAdminGroupAdminsFp,
  getSearchLmsGroupsGroupAdminsFp,
  getSearchOrgGroupAdminsFp,
  getSearchGroupGroupAdminsFp,
  getCurrentLmsGroupIdGroupAdminsFp,
  getCurrentNameLmsGroupGroupAdminsFp,
  getCurrentOrgIdGroupAdminsFp,
  getCurrentOrgNameGroupAdminsFp,
  getCurrentGroupIdGroupAdminsFp,
  getChosenGroupGroupAdminsFp,
  getStatusAddAdminGroupAdminFp,
  getSearchAdminsGroupAdminsFp,
  getCurrentAdminIdGroupAdminsFp,
  getStatusEditAdminGroupAdminsFp,
  getStatusImportFileGroupAdminsFp,
  getErrorImportGroupAdminsFp,
};
