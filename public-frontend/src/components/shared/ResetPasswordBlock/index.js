// @flow
import React, {Node, useState, useEffect} from 'react';
import { bemlds } from 'utils';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionResetPassword } from 'redux/actions';
import { getUserEmail } from 'redux/selectors';
import { ResetPasswordPopup } from 'components';
import { EDIT_PROFILE } from 'localise';
import './styles.scss';

const {
  password,
  passwordInfo,
  resetPassword,
} = EDIT_PROFILE;

const b = bemlds('reset-password-block');

const DefaultProps = {
  className: '',
};

type PropType = {
  className?: string,
  resetPasswordAction: () => void,
  userEmail: string
};

const ResetPasswordBlock = ({className, resetPasswordAction, userEmail}: PropType): Node => {
  const [isOpenPopup, openPopup] = useState(false);
  const [isReset, onClickReset] = useState(false);

  useEffect(() => {
    if (!userEmail && isReset) {
      openPopup(!isOpenPopup);
    }
  });

  const reset = () => {
    onClickReset(true);
    resetPasswordAction();
  };

  const closePopup = () => {
    openPopup(false);
    window.location.href = '/';
  };

  return (
    <section className={b({mix: className})}>
      <span className={b('title')}>{password}</span>
      <span className={b('info')}>{passwordInfo}</span>
      <button className={b('btn btn')} type="button" onClick={reset}>{resetPassword}</button>
      {isOpenPopup && <ResetPasswordPopup close={closePopup} />}
    </section>
  );
};

ResetPasswordBlock.defaultProps = DefaultProps;

const mapDispatchToProps = {
  resetPasswordAction: actionResetPassword,
};

const mapStateToProps = (state: object): object => ({
  userEmail: getUserEmail(state),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ResetPasswordBlock),
);
