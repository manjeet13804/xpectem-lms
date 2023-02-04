import { createSelector } from 'reselect';
import fp from 'lodash/fp';

const getOrganisationAdminSelector = ({ orgAdmins }) => orgAdmins;

const getCurrentOrgAdminsFp = createSelector(
  getOrganisationAdminSelector,
  fp.get('currentOrgAdmin'),
);

const getChosenOrgFp = createSelector(
  getOrganisationAdminSelector,
  fp.get('chosenOrg'),
);

const getErrorOrgAdminsFp = createSelector(
  getOrganisationAdminSelector,
  fp.get('error'),
);

const getSearchOrgDataOrgAdminsFp = createSelector(
  getOrganisationAdminSelector,
  fp.get('searchOrgData'),
);

const getSearchLmsGroupDataOrgAdminsFp = createSelector(
  getOrganisationAdminSelector,
  fp.get('searchLmsGroupsData'),
);

const getCurrentLmsGroupIdOrgAdminsFp = createSelector(
  getOrganisationAdminSelector,
  fp.get('currentLmsGroupIdOrg'),
);

const getCurrentOrgIdOrgAdminsFp = createSelector(
  getOrganisationAdminSelector,
  fp.get('currentOrgId'),
);

const getCurrentNameLmsGroupOrgAdminsFp = createSelector(
  getOrganisationAdminSelector,
  fp.get('currentNameLmsGroupOrg'),
);

const getCurrentOrgAdminFp = createSelector(
  getOrganisationAdminSelector,
  fp.get('currentOrgAdmin'),
);

const getAddedStatusOrgAdminFp = createSelector(
  getOrganisationAdminSelector,
  fp.get('isAddedOrgAdmin'),
);

const getSearchAdminsOrgAdminsFp = createSelector(
  getOrganisationAdminSelector,
  fp.get('searchAdminsData'),
);

const getCurrentAdminIdOrgAdminsFp = createSelector(
  getOrganisationAdminSelector,
  fp.get('currentOrgAdminId'),
);

const getStatusEditOrgAdminsFp = createSelector(
  getOrganisationAdminSelector,
  fp.get('isEditOrgAdmin'),
);

const getStatusImportFileOrgAdminsFp = createSelector(
  getOrganisationAdminSelector,
  fp.get('isImportFile'),
);

const getErrorImportOrgAdminsFp = createSelector(
  getOrganisationAdminSelector,
  fp.get('errorImport'),
);

export {
  getCurrentOrgAdminsFp,
  getCurrentLmsGroupIdOrgAdminsFp,
  getSearchLmsGroupDataOrgAdminsFp,
  getSearchOrgDataOrgAdminsFp,
  getCurrentNameLmsGroupOrgAdminsFp,
  getCurrentOrgAdminFp,
  getChosenOrgFp,
  getErrorOrgAdminsFp,
  getAddedStatusOrgAdminFp,
  getCurrentOrgIdOrgAdminsFp,
  getSearchAdminsOrgAdminsFp,
  getCurrentAdminIdOrgAdminsFp,
  getStatusEditOrgAdminsFp,
  getStatusImportFileOrgAdminsFp,
  getErrorImportOrgAdminsFp,
};
