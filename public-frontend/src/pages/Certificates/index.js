// @flow
import React, { Node } from 'react';
import {
  StudentHeader,
  SimpleLayout,
} from 'components';
import {
  Certificates,
} from 'containers';
import { bemlds } from 'utils';
import './styles.scss';

const block = bemlds('certificates-page');

const CertificatesPage = (): Node => (
  <SimpleLayout contentClassName={block()}>
    <StudentHeader />
    <Certificates />
  </SimpleLayout>
);

export default CertificatesPage;
