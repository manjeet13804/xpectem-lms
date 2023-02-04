// @flow
import React from 'react';
import block from 'utils/bem';
import {AUTH_DICTIONARY} from 'localise';
import LogoXpectum from 'assets/images/xpectum_logo_big.png';
import {SuccessfulIcon} from 'components';
import { PATHS } from 'constants/paths';

import './styles.scss';

const bem = block('message');

type PropsType = {
  message: string
};

const handleReturn = (e: object) => {
  e.preventDefault();
  window.location.href = `${PATHS.signin}`;
};

const Message = (props: PropsType): Node => {
  const {message} = props;
  return (
    <section className={bem()}>
      <img className={bem('logo')} src={LogoXpectum} alt="xpectim-logo" />
      <hr className="line" />
      <section className={bem('content')}>
        {message}
      </section>
      <section className={bem('logo-success')}>
        <SuccessfulIcon />
      </section>
      <section className={bem('button')}>
        <div
          role="button"
          tabIndex={0}
          onClick={(e: object): Node => handleReturn(e)}
        >
          <button
            type="submit"
            className={`${bem('submit')} btn-auth`}
          >
            {AUTH_DICTIONARY.backToLogin}
          </button>
        </div>
      </section>
    </section>
  );
};


export default Message;
