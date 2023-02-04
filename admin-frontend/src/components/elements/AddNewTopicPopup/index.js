import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  PLACEHOLDER,
} from 'constants/constants';
import IntlMessages from 'components/utility/intlMessages';
import { bemlds } from 'utils';
import closeImg from 'assets/images/close.png';
import AddNewTopicPopupWrapper from './addNewTopicPopup.style';

const p = bemlds('popup');
const { placeholderText } = PLACEHOLDER;

const AddNewTopicPopup = (props) => {
  const { handlePopup } = props;

  const [isClose, setClose] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  return (
    <AddNewTopicPopupWrapper>
      {!isClose && (
      <div
        className={p('new-topic')}
        role="button"
        tabIndex="-1"
        onClick={() => setClose(true)}
      >
        <IntlMessages id="communication.addTopic" />
      </div>
      )}
      <div className={p({ close: isClose })}>
        <div className={p('wrap')}>
          <div
            role="button"
            className={p('img-wrap')}
            onClick={() => setClose(false)}
            tabIndex="-1"
          >
            <img src={closeImg} alt="close" className={p('img')} />
          </div>
          <div className={p('title')}>
            <IntlMessages id="communication.popupTopic" />
          </div>
          <div className={p('input-title')}>
            <IntlMessages id="communication.inputTitleTopic" />
          </div>
          <input
            className={p('input')}
            type="text"
            placeholder={placeholderText}
            value={searchValue}
            onChange={({ target: { value } }) => setSearchValue(value)}
          />
          <button
            type="button"
            className={p('button')}
            onClick={() => {
              handlePopup(searchValue);
              setClose(false);
            }}
          >
            <IntlMessages id="communication.btnTopic" />
          </button>
        </div>
      </div>
    </AddNewTopicPopupWrapper>
  );
};

AddNewTopicPopup.defaultProps = {
  handlePopup: null,
};

AddNewTopicPopup.propTypes = {
  handlePopup: PropTypes.func,
};

export default AddNewTopicPopup;
