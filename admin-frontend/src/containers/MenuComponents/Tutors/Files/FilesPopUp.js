import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  acceptedFileTypes,
} from 'constants/constants';
import IntlMessages from 'components/utility/intlMessages';
import { bemlds } from 'utils';
import { Modal } from 'antd';
import {
  DragAndDropAllTypes,
} from 'components';
import TutorsFilesWrapper from './TutorsFiles.style';


const page = bemlds('page');

const FilesPopUp = (props) => {
  const [file, setFile] = useState(null);

  const handleAddFile = (newFile) => {
    setFile(newFile);
  };

  const {
    isOpen,
    closePopUp,
    onSave,
    folderName,
    folderId,
    numberUpload,
  } = props;

  const handleClosePopup = () => {
    setFile(null);
    closePopUp();
  };

  const handleSave = (name) => {
    onSave(name, folderId);
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
        <div className={page('popup-file')}>
          <p className={page('popup-file-title')}>
            {folderName ? `Add file to ${folderName}`
              : <IntlMessages id="tutors.addFilesWithoutFolder" />
            }
          </p>
          <div className={page('popup-file-content')}>
            <p className={page('popup-file-input-title')}><IntlMessages id="tutors.fileWord" /></p>
            {isOpen && (
            <DragAndDropAllTypes
              numberUpload={numberUpload}
              fileTypes={acceptedFileTypes}
              handleDrop={handleAddFile}
              handleAddFile={handleAddFile}
            />
            )}
          </div>
          <div className={page('popup-file-footer')}>
            <button
              className={page('button')}
              type="button"
              onClick={() => handleSave(file)}
              disabled={!file}
            >
              <IntlMessages id="tutors.saveBtn" />
            </button>
          </div>
        </div>
      </TutorsFilesWrapper>
    </Modal>
  );
};

FilesPopUp.defaultProps = {
  isOpen: false,
  closePopUp: () => null,
  onSave: () => null,
  folderName: '',
  folderId: null,
  numberUpload: 1,
};

FilesPopUp.propTypes = {
  closePopUp: PropTypes.func,
  isOpen: PropTypes.bool,
  onSave: PropTypes.func,
  folderName: PropTypes.string,
  folderId: PropTypes.number,
  numberUpload: PropTypes.number,
};

export default FilesPopUp;
