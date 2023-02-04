// @flow
import React, { Node } from 'react';
import { bemlds } from 'utils';
import { CERTIFICATES_DICTIONARY } from 'localise';
import { CertificateFullType } from 'models';
import Certificate from './Certificate';
import './styles.scss';

type PropsType = {
    certificates: CertificateFullType[]
};

const block = bemlds('certificates');

const Certificates = ({ certificates }: PropsType): Node => (
  <div className={block()}>
    <h3 className={block('title')}>{CERTIFICATES_DICTIONARY.title}</h3>
    <hr className={block('line')} />
    <div className={block('description')}>{CERTIFICATES_DICTIONARY.description}</div>
    <hr className={block('line')} />
    {Boolean(certificates.length)
      && certificates.map(
        (certificate: CertificateFullType, index: number): Node => (
          <Certificate
            key={certificate.id}
            position={index + 1}
            {...certificate}
          />
        ),
      )
    }
  </div>
);

export default Certificates;
