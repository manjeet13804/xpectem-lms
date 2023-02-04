// @flow
import fp from 'lodash/fp';
import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import { ByIdType, CertificationType } from 'models';
import { certification } from './schema';

const getCertificationsRoot = fp.get('myCourses.certifications');

const getCourseId = (
  _: object,
  { courseId }: object,
): number => Number(courseId);

const getCertificationIds = createSelector(
  [getCertificationsRoot],
  fp.get('ids'),
);

const getCertifications = createSelector(
  [getCertificationsRoot],
  fp.get('byId'),
);

const getCourseCertifications = createSelector(
  [getCertificationIds, getCertifications, getCourseId],
  (
    ids: number[],
    certifications: ByIdType<CertificationType>,
    courseId: number,
  ): CertificationType[] => denormalize(
    ids,
    [certification],
    { certifications },
  ).filter(
    ({ course }: CertificationType): boolean => !course || course === courseId,
  ),
);

const getExamLogs = createSelector([getCertificationsRoot], fp.get('certificationsLogs'));

export {
  // eslint-disable-next-line import/prefer-default-export
  getCertifications,
  getExamLogs,
  getCourseCertifications,
};
