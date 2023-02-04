import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  PLACEHOLDER,
} from 'constants/constants';
import IntlMessages from 'components/utility/intlMessages';
import { bemlds } from 'utils';
import { Modal } from 'antd';
import TutorsFilesWrapper from './TutorsFiles.style';

const p = bemlds('popup');
const page = bemlds('page');
const {
  enterFolderName,
} = PLACEHOLDER;

const CreateFolderPopUp = (props) => {
  const [folderName, changeFolderName] = useState('');
  const {
    isOpen,
    closePopUp,
    onSave,
  } = props;

  const handleClosePopup = () => {
    changeFolderName('');
    closePopUp();
  };

  const handleChange = ({ target: { value } }) => {
    changeFolderName(value);
  };

  const handleSave = (name) => {
    onSave(name);
    handleClosePopup();
  };

  return (
    <Modal
      visible={isOpen}
      onCancel={handleClosePopup}
      footer={null}
      centered
      className={page('modal')}
      style={{ minWidth: '751px' }}
    >
      <TutorsFilesWrapper>
        <div className={page('create-folder')}>
          <p className={page('create-folder-title')}>
            <IntlMessages id="tutors.popupCreateFolder" />
          </p>
          <div className={page('create-folder-content')}>
            <p className={page('create-folder-input-title')}><IntlMessages id="tutors.folderWord" /></p>
            <input
              placeholder={enterFolderName}
              value={folderName}
              onChange={handleChange}
              className={page('create-folder-input')}
            />
          </div>
          <div className={page('create-folder-footer')}>
            <button
              className={page('button')}
              type="button"
              onClick={() => handleSave(folderName)}
              disabled={!folderName}
            >
              <IntlMessages id="tutors.saveBtn" />
            </button>
          </div>
        </div>
      </TutorsFilesWrapper>
    </Modal>
  );
};

CreateFolderPopUp.defaultProps = {
  isOpen: false,
  closePopUp: () => null,
  onSave: () => null,
};

CreateFolderPopUp.propTypes = {
  closePopUp: PropTypes.func,
  isOpen: PropTypes.bool,
  onSave: PropTypes.func,
};

export default CreateFolderPopUp;
