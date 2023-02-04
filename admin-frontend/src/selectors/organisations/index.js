import { createSelector } from 'reselect';
import fp from 'lodash/fp';

const getOrganisationsSelector = ({organisations}) => organisations;

const getCurrentOrgFp = createSelector(
  getOrganisationsSelector,
  fp.get('currentOrg'),
);

const getSearchLmsGroupDataFp = createSelector(
  getOrganisationsSelector,
  fp.get('searchLmsGroupsData'),
);

const getSearchOrgDataFp = createSelector(
  getOrganisationsSelector,
  fp.get('searchOrgData'),
);

const getCurrentLmsGroupIdOrgFp = createSelector(
  getOrganisationsSelector,
  fp.get('currentLmsGroupIdOrg'),
);

const getCurrentNameLmsGroupOrgFp = createSelector(
  getOrganisationsSelector,
  fp.get('currentNameLmsGroupOrg'),
);

const getCurrentLmsGroupOrgFp = createSelector(
  getOrganisationsSelector,
  fp.get('currentLmsGroupOrg'),
);

const getAddedStatusOrgFp = createSelector(
  getOrganisationsSelector,
  fp.get('isAddedOrg'),
);

const getEditedStatusOrgFp = createSelector(
  getOrganisationsSelector,
  fp.get('isEditOrg'),
);

const getCurrentOrgIdFp = createSelector(
  getOrganisationsSelector,
  fp.get('currentOrgId'),
);

const getErrorInAddOrgFp = createSelector(
  getOrganisationsSelector,
  fp.get('error'),
);

export {
  getCurrentOrgFp,
  getSearchLmsGroupDataFp,
  getCurrentLmsGroupIdOrgFp,
  getCurrentLmsGroupOrgFp,
  getAddedStatusOrgFp,
  getErrorInAddOrgFp,
  getSearchOrgDataFp,
  getCurrentNameLmsGroupOrgFp,
  getCurrentOrgIdFp,
  getEditedStatusOrgFp,
};
