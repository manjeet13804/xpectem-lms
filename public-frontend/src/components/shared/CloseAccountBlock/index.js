// @flow
import React, {Node, useState} from 'react';
import { EDIT_PROFILE } from 'localise';
import { bemlds } from 'utils';
import { CloseAccountPopup } from 'components';
import './styles.scss';

const {
  closeYourAccount,
  closeAccountInfo,
  closeAccount,
} = EDIT_PROFILE;

const b = bemlds('close-account-block');

const DefaultProps = {
  className: '',
};

type PropType = {
  className?: string
};


const CloseAccountBlock = ({className}: PropType): Node => {
  const [isOpenPopup, openPopup] = useState(false);

  const showPopup = () => {
    openPopup(!isOpenPopup);
  };

  return (
    <section className={b({mix: className})}>
      <span className={b('title')}>{closeYourAccount}</span>
      <span className={b('info')}>{closeAccountInfo}</span>
      <button className={b('btn btn btn-delete')} type="button" onClick={showPopup}>{closeAccount}</button>
      {isOpenPopup && <CloseAccountPopup close={showPopup} />}
    </section>
  );
};

CloseAccountBlock.defaultProps = DefaultProps;

export default CloseAccountBlock;
