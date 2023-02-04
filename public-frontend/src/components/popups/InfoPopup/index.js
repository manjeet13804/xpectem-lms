// @flow
import React, { Node } from 'react';
import { bemlds } from 'utils';
import {TERM_SHARED } from 'localise';
import './styles.scss';

const { ok } = TERM_SHARED;

const b = bemlds('info-popup');

type PropType = {
  className?: string,
  text: string,
  callback: () => void
};

const DefaultProps = {
  className: '',
};

const InfoPopup = (props: PropType): Node => {
  const {
    className,
    text,
    callback,
  } = props;

  return (
    <div className={b({mix: className})}>
      <div className={b('content-block')}>
        <span className={b('text')}>{text}</span>
        <button className={b('btn')} type="button" onClick={callback}>{ok}</button>
      </div>
    </div>
  );
};

InfoPopup.defaultProps = DefaultProps;


export default InfoPopup;
