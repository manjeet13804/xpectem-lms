// @flow
import React, { Node } from 'react';
import { bemlds } from 'utils';
import { sharedClass } from 'utils/className';
import { CERTIFICATES_DICTIONARY } from 'localise';
import { CertificateType } from 'models';
import { DocumentIcon } from 'components';
import './styles.scss';

type PropsType = {
    position: number
} & CertificateType;

const block = bemlds('certificate');
const certificateBtn = sharedClass(
  block('certificate-btn'),
  'btn',
  'btn--text',
);

const openCertificate = (url: string): () => void => (): void => window.open(
  url,
  '__blank',
  'noopener',
);

const Certificate = ({ position, url, course }: PropsType): Node => (
  <div className={block()}>
    <h4 className={block('course')}>
      {`${position}. ${course.title}`}
    </h4>
    <button
      className={certificateBtn}
      type="button"
      onClick={openCertificate(url)}
    >
      {CERTIFICATES_DICTIONARY.certificate}
      <DocumentIcon className={block('certificate-icon')} />
    </button>
  </div>
);

export default Certificate;
