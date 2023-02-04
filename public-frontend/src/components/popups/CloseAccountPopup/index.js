// @flow
import React, { Node, useState, Fragment } from 'react';
import { bemlds } from 'utils';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionCloseAccount } from 'redux/actions';
import { getUserEmail } from 'redux/selectors';
import { CloseIcon } from 'components';
import { EDIT_PROFILE } from 'localise';
import './styles.scss';


const b = bemlds('close-account-popup');

const {
  closeAccount,
  closeAccountInfoText,
  closeAccountWarning,
  accountHasBeenClosed,
} = EDIT_PROFILE;

type PropType = {
  className?: string,
  close: () => void,
  closeAccountAction: () => void,
  userEmail: string
};

const DefaultProps = {
  className: '',
};


const CloseAccountPopup = (props: PropType): Node => {
  const {
    className,
    close,
    userEmail,
    closeAccountAction,
  } = props;

  const [isCloseAccount, closeAc] = useState(false);

  const closeAccountFunc = () => {
    closeAc(true);
    closeAccountAction();
  };

  const closePopup = () => {
    closeAc(false);
    window.location.href = '/';
  };

  return (
    <div className={b({mix: className})}>
      <div className={b('content-block')}>
        {(!userEmail && isCloseAccount)
          ? (
            <Fragment>
              <span className={b('big-text')}>{accountHasBeenClosed}</span>
              <button className={b('btn-close')} type="button" onClick={closePopup}>
                <CloseIcon />
              </button>
            </Fragment>
          )
          : (
            <Fragment>
              <span className={b('text')}>{closeAccountInfoText}</span>
              <span className={b('warning-text')}>{closeAccountWarning}</span>
              <button className={b('btn-close-account btn btn-delete')} type="button" onClick={closeAccountFunc}>{closeAccount}</button>
              <button className={b('btn-close')} type="button" onClick={close}>
                <CloseIcon />
              </button>
            </Fragment>
          )
        }
      </div>
    </div>
  );
};

CloseAccountPopup.defaultProps = DefaultProps;

const mapDispatchToProps = {
  closeAccountAction: actionCloseAccount,
};

const mapStateToProps = (state: object): object => ({
  userEmail: getUserEmail(state),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CloseAccountPopup),
);
