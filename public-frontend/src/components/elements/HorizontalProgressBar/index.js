// @flow
import React, { Node } from 'react';
import { bemlds } from 'utils';
import './styles.scss';

const b = bemlds('horizontal-progress-bar');

type PropType = {
  className: string,
  progress: string
};

const HorizontalProgressBar = ({progress, className}: PropType): Node => (
  <div className={b({mix: className})}>
    <span className={b('progress-line')} style={{width: progress}} />
  </div>
);

export default HorizontalProgressBar;
