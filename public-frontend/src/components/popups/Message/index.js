// @flow
import React from 'react';
import {PopupContainer} from 'components';
import block from 'utils/bem';
import {TERM_SHARED} from 'localise';
import {sharedClass} from 'utils/className';

import './message-popup.scss';

const bem = block('message-popup');

type PropsType = {
  close: () => void,
  message: string
};

const btnSubmit = sharedClass(bem('submit'), 'btn');

const MessagePopup = (props: PropsType): Node => {
  const {close, message} = props;
  return (
    <PopupContainer close={close}>
      <div className={`${bem()}`}>
        <p className={`${bem('message')}`}>{message}</p>
        <hr className="line" />
        <section className={bem('buttons')}>
          <button
            type="submit"
            className={btnSubmit}
            onClick={close}
          >
            {TERM_SHARED.ok}
          </button>
        </section>
      </div>
    </PopupContainer>
  );
};


export default MessagePopup;
