// @flow
import React, { Node, useEffect } from 'react';
import { compose, Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  withCourseId,
  CourseCertifications as CourseCertificationsView,
} from 'components';
import { CertificationType } from 'models';
import { getCourseCertifications, getExamLogs } from 'redux/selectors';
import {
  getCertifications, getCertificationsLogs, makeBooking, cancelBooking,
} from 'redux/actions';
import _ from 'lodash';

type PropType = {
    certifications: CertificationType[],
    fetch: () => void,
    fetchLog: () => void,
    makeBooking: (certificationId: number) => void,
    cancelBooking: (certificationId: number) => void
};

const CourseCertifications = (
  {
    certifications, certificationsLogs, fetch, fetchLog, ...props
  }: PropType,
): Node => {
  useEffect(
    () => {
      fetch();
      fetchLog();
    },
    [],
  );

  if (!certifications) return null;
  return (
    <CourseCertificationsView
      certifications={certifications}
      certificationsLogs={_.sortBy(certificationsLogs, ['date']).reverse()}
      {...props}
    />
  );
};

export default compose(
  withCourseId,
  connect(
    (
      state: object,
      {
        courseId,
      }: PropType,
    ): object => ({
      certifications: getCourseCertifications(
        state,
        { courseId },
      ),
      certificationsLogs: getExamLogs(
        state,
        { courseId },
      ),
    }),
    (
      dispatch: Dispatch,
      {
        courseId,
      }: PropType,
    ): object => ({
      fetch: (): void => dispatch(
        getCertifications(Number(courseId)),
      ),
      fetchLog: (): void => dispatch(getCertificationsLogs(Number(courseId))),
      makeBooking: (certificationId: number): void => dispatch(
        makeBooking(Number(courseId), certificationId),
      ),
      cancelBooking: (certificationId: number): void => dispatch(
        cancelBooking(Number(courseId), certificationId),
      ),
    }),
  ),
)(CourseCertifications);
