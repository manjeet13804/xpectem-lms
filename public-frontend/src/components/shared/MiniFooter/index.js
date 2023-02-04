// @flow
import React, { Node } from 'react';
import { bemlds } from 'utils';
import { sharedClass } from 'utils/className';
import { CONTACTS } from 'constants/constants';
import {
  MINI_FOOTER_DICTIONARY,
} from 'localise';
import './styles.scss';

const block = bemlds('mini-footer');

const defaultProps = {
  className: '',
};

type PropType = {
    className?: string
};

const MiniFooter = ({ className }: PropType): Node => (
  <footer className={sharedClass(block(), className)}>
    <ul className={block('content')}>
      <li className={block('part')}>xpectum AB</li>
      {
          MINI_FOOTER_DICTIONARY
            .address
            .split(', ')
            .map(
              (addressPart: string): Node => (
                <li
                  key={addressPart}
                  className={block('part')}
                >
                  {addressPart}
                </li>
              ),
            )
      }
      <li className={block('part')}>
        <a className={block('mail')} href={`mailto:${CONTACTS.email}`}>{CONTACTS.email}</a>
      </li>
    </ul>
  </footer>
);

MiniFooter.defaultProps = defaultProps;

export default MiniFooter;
