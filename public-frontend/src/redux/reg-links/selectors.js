// @flow
import fp from 'lodash/fp';
import { createSelector } from 'reselect';

const getRegLinkRoot = fp.get('regLink');

const getRegLinkData = createSelector(
  [getRegLinkRoot],
  fp.get('regData.registrationLinks'),
);

const getTaxonomiesData = createSelector(
  [getRegLinkRoot],
  fp.get('regData.taxonomies'),
);

const getLmsLogoData = createSelector(
  [getRegLinkRoot],
  fp.get('logo'),
);

const getStudentData = createSelector(
  [getRegLinkRoot],
  fp.get('studentData'),
);

const getStudentDataLoading = createSelector(
  [getRegLinkRoot],
  fp.get('getRegLinkDataLoading'),
);

const getRegisterStudentLoading = createSelector(
  [getRegLinkRoot],
  fp.get('registrationStudentLoading'),
);

const getRegLinkError = createSelector(
  [getRegLinkRoot],
  fp.get('regData.error'),
);

export {
  getRegLinkRoot,
  getRegLinkData,
  getTaxonomiesData,
  getLmsLogoData,
  getStudentData,
  getStudentDataLoading,
  getRegisterStudentLoading,
  getRegLinkError,
};
