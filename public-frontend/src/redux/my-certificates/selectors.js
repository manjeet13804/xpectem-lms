// @flow
import fp from 'lodash/fp';
import { denormalize } from 'normalizr';
import { createSelector } from 'reselect';
import { ByIdType, MyCourseType, CertificateType } from 'models';
import { certificates as certificatesSchema } from './schema';
import { getMyCourses } from '../my-courses/selectors';

const getMyCertificatesRoot = fp.get('myCertificates');

const getMyCertificatesIds = createSelector(
  [getMyCertificatesRoot],
  fp.get('ids'),
);

const getMyCertificates = createSelector(
  [getMyCertificatesRoot],
  fp.get('byId'),
);

const getMyCertificatesAsArray = createSelector(
  [
    getMyCertificatesIds,
    getMyCertificates,
    getMyCourses,
  ],
  (
    ids: number[],
    certificates: ByIdType<CertificateType>,
    courses: ByIdType<MyCourseType>,
  ): CertificateType[] => denormalize(
    ids,
    [certificatesSchema],
    { certificates, courses },
  ),
);

const getLoadingCertificates = (state: object): boolean => (state.certificates.isLoading);

export {
  getMyCertificatesIds,
  getMyCertificates,
  getMyCertificatesAsArray,
  getLoadingCertificates,
};
