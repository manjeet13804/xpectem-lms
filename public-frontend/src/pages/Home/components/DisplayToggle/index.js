// @flow
import React, { Node } from 'react';
import block from 'utils/bem';
import classNames from 'classnames/bind';
import { TERM_SHARED } from 'localise';
import {
  ListIcon,
  GridIcon,
} from 'components';
import { DISPLAY_MODE } from '../../constants';

import './display-toggler.scss';

const bem = block('display-toggler');

type PropType = {
  classNamePrefix?: string,
  displayMode?: string,
  toggler: object
};

const DisplayToggle = (props: PropType): Node => {
  const { classNamePrefix, displayMode, toggler } = props;
  const addClassParent = classNamePrefix ? block(classNamePrefix) : (): string => '';
  const iconClass = (displayName: string): string => classNames([
    `${bem('svg', {active: displayMode === displayName})}`,
    `${addClassParent('svg')}`,
  ]);
  const mainClass = classNames([
    `${bem()}`,
    `${addClassParent('display-toggler')}`,
  ]);
  const textClass = classNames([
    `${bem('text')}`,
    `${addClassParent('text')}`,
  ]);

  return (
    <section className={mainClass}>
      <span className={textClass}>{TERM_SHARED.show}</span>
      <ListIcon
        className={iconClass(DISPLAY_MODE.list)}
        fill="#d8d8d8"
        role="button"
        tabIndex="0"
        onClick={() => { toggler(DISPLAY_MODE.list); }}
      />
      <GridIcon
        className={iconClass(DISPLAY_MODE.grid)}
        fill="#959595"
        role="button"
        tabIndex="0"
        onClick={() => { toggler(DISPLAY_MODE.grid); }}
      />
    </section>
  );
};

DisplayToggle.defaultProps = {
  classNamePrefix: '',
  displayMode: '',
};

export default DisplayToggle;
