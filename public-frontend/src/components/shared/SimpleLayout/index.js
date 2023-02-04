// @flow
import React, { Node } from 'react';
import { bemlds } from 'utils';
import { sharedClass } from 'utils/className';
import MiniFooter from '../MiniFooter';
import './styles.scss';

const block = bemlds('simple-layout');

const defaultProps = {
  contentClassName: '',
};

type PropType = {
    contentClassName?: string,
    children: Node
};

const SimpleLayout = ({ contentClassName, children }: PropType): Node => (
  <div className={block()}>
    <div className={sharedClass(block('content'), contentClassName)}>
      {children}
    </div>
    <MiniFooter />
  </div>
);

SimpleLayout.defaultProps = defaultProps;

export default SimpleLayout;
