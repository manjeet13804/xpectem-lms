import React from 'react';
import { CONTACTS } from 'constants/constants';
import {
  MINI_FOOTER_DICTIONARY,
} from 'constants/constants';
import MiniFooterWrapper from './miniFooter.style';


const defaultProps = {
  className: '',
};

const MiniFooter = () => (
  <MiniFooterWrapper>
    <footer className="mini-footer">
      <ul className="content">
        <li className="part">xpectum AB</li>
        {
          MINI_FOOTER_DICTIONARY
            .address
            .split(', ')
            .map(
              (addressPart) => (
                <li
                  key={addressPart}
                  className="part"
                >
                  {addressPart}
                </li>
              ),
            )
        }
        <li className="part">
          <a href={`mailto:${CONTACTS.email}`}>{CONTACTS.email}</a>
        </li>
      </ul>
    </footer>
  </MiniFooterWrapper>
);

MiniFooter.defaultProps = defaultProps;

export default MiniFooter;
