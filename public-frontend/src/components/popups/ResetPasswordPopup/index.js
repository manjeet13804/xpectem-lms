// @flow
import React, { Node } from 'react';
import { bemlds } from 'utils';
import { CloseIcon } from 'components';
import { EDIT_PROFILE } from 'localise';
import './styles.scss';


const b = bemlds('reset-password-popup');

const { resetPasswordText } = EDIT_PROFILE;

type PropType = {
  className?: string,
  close: () => void
};

const DefaultProps = {
  className: '',
};

const ResetPasswordPopup = (props: PropType): Node => {
  const {
    className,
    close,
  } = props;

  return (
    <div className={b({mix: className})}>
      <div className={b('content-block')}>
        <span className={b('text')}>{resetPasswordText}</span>
        <button className={b('btn-close')} type="button" onClick={close}>
          <CloseIcon />
        </button>
      </div>
    </div>
  );
};

ResetPasswordPopup.defaultProps = DefaultProps;


export default ResetPasswordPopup;
