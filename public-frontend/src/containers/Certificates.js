// @flow
import React, { Node, useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  Certificates as CertificatesView,
} from 'components';
import { CertificateFullType } from 'models';
import { getMyCertificatesAsArray } from 'redux/selectors';
import { fetchMyCertificates } from 'redux/actions';

type PropType = {
    certificates: CertificateFullType[],
    fetch: () => void
};

const CourseCertifications = (
  { certificates, fetch, ...props }: PropType,
): Node => {
  useEffect(
    () => {
      fetch();
    },
    [],
  );

  if (!certificates) return null;

  return (
    <CertificatesView
      certificates={certificates}
      {...props}
    />
  );
};

export default compose(
  connect(
    (
      state: object,
    ): object => ({
      certificates: getMyCertificatesAsArray(state),
    }),
    {
      fetch: fetchMyCertificates,
    },
  ),
)(CourseCertifications);
