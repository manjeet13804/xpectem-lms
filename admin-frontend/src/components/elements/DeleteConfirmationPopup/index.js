import React, { useState } from 'react';
import PropTypes from 'prop-types';

import IntlMessages from 'components/utility/intlMessages';
import { DefaultButton } from 'components';
import { bemlds } from 'utils';
import closeImg from 'assets/images/close.png';
import DeleteConfirmationPopupWrapper from './deleteConfirmationPopup.style';

const p = bemlds('popup');

const DeleteConfirmationPopup = (props) => {
  const { handlePopup } = props;

  const [{ isClose }, setClose] = useState({
    isClose: false,
  });

  return (
    <DeleteConfirmationPopupWrapper>
      { !isClose && (
      <button
        type="button"
        className={p('button', { delete: true })}
        onClick={() => {
          setClose({ isClose: true });
        }}
      >
        <IntlMessages id="groupAdmin.deleteBtn" />
      </button>
      )}
      <div className={p({ close: isClose })}>
        <div className={p('wrap')}>
          <div
            role="button"
            className={p('img-wrap')}
            onClick={() => setClose({ isClose: false })}
            tabIndex={0}
          >
            <img src={closeImg} alt="close" className={p('img')} />
          </div>
          <div className={p('title')}>
            <IntlMessages id="tutors.confirmDelete" />
          </div>
          <div className={p('btn-wrap')}>
            <DefaultButton
              textId="groupAdmin.deleteBtn"
              onClick={handlePopup}
              isDelete
            />
            <DefaultButton
              textId="groups.closeBtn"
              onClick={() => setClose({ isClose: false })}
            />
          </div>
        </div>
      </div>
    </DeleteConfirmationPopupWrapper>
  );
};

DeleteConfirmationPopup.defaultProps = {
  handlePopup: null,
};

DeleteConfirmationPopup.propTypes = {
  handlePopup: PropTypes.func,
};

export default DeleteConfirmationPopup;
