// @flow
import React, { Node } from 'react';
import { bemlds } from 'utils';
import './styles.scss';

const block = bemlds('support-header');

type PropType = {
    children: string
};

const SupportHeader = ({ children }: PropType): Node => (
  <nav className={block()}>
    {children}
  </nav>
);

export default SupportHeader;
