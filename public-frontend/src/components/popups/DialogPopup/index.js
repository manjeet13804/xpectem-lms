// @flow
import React, { Node } from 'react';
import { bemlds } from 'utils';
import {TERM_SHARED } from 'localise';
import './styles.scss';

const { yes, no } = TERM_SHARED;

const b = bemlds('dialog-popup');

type PropType = {
  className?: string,
  text: string,
  callbackYes: () => void,
  callbackNo: () => void
};

const DefaultProps = {
  className: '',
};

const DialogPopup = (props: PropType): Node => {
  const {
    className,
    text,
    callbackYes,
    callbackNo,
  } = props;

  return (
    <div className={b({mix: className})}>
      <div className={b('content-block')}>
        <span className={b('text')}>{text}</span>
        <div className={b('button-block')}>
          <button className={b('btn', {yes: true})} type="button" onClick={callbackYes}>{yes}</button>
          <button className={b('btn', {no: true})} type="button" onClick={callbackNo}>{no}</button>
        </div>
      </div>
    </div>
  );
};

DialogPopup.defaultProps = DefaultProps;


export default DialogPopup;
