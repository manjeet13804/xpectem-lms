import React, { useState } from 'react';
import PropTypes from 'prop-types';
import IntlMessages from 'components/utility/intlMessages';

import {
  AttachedFile,
} from 'components';

import { bemlds, download } from 'utils';
import FilesPopUp from './FilesPopUp';

const page = bemlds('page');

const Folder = ({
  name,
  files,
  id,
  onSaveFile,
  onUpdateFile,
  deleteFile,
  folders,
}) => {
  const [isOpen, toggleIsOpen] = useState(false);
  const [filePopUpIsOpen, toggleFilePopUp] = useState(false);
  const openFilePopUp = () => {
    toggleFilePopUp(true);
  };

  const closeFilePopUp = () => {
    toggleFilePopUp(false);
  };

  const toggle = () => {
    toggleIsOpen(prevState => !prevState);
  };

  const autoCompleteOptions = folders.map(item => ({
    value: item.name,
  }));

  return (
    <div className={page('folder', { 'is-open': isOpen })}>
      <div className={page('folder-header')} onClick={toggle} role="button" tabIndex={-1}>
        <p className={page('folder-name')}>{name}</p>
        <button className={page('folder-toggle')} type="button">
          <div className={page('folder-toggle-gray-line')} />
          <div className={page('folder-toggle-gray-line', { second: true, 'is-open': isOpen })} />
        </button>
      </div>
      <div className={page('folder-content')}>
        {files.map(item => (
          <AttachedFile
            name={item.name}
            url={item.url}
            onDownload={download}
            key={item.id}
            file={item}
            header={name}
            hideFile
            tutorFile
            changeFileOfCourse={(...args) => onUpdateFile(...args, id)}
            deleteFileOfCourse={deleteFile}
            onDelete={deleteFile}
            headerInputType="autocomplete"
            autoCompleteOptions={autoCompleteOptions}
          />
        ))}
      </div>
      <div className={page('folder-footer')}>
        <button className={page('button')} type="button" onClick={openFilePopUp}>
          <IntlMessages id="tutors.addFiles" />
        </button>
        <FilesPopUp
          isOpen={filePopUpIsOpen}
          closePopUp={closeFilePopUp}
          onSave={onSaveFile}
          folderId={id}
          folderName={name}
          numberUpload={id}
        />
      </div>
    </div>
  );
};

Folder.defaultProps = {
  name: '',
  files: [],
  id: 0,
  onSaveFile: () => null,
  onUpdateFile: () => null,
  deleteFile: () => null,
  folders: [],
};

Folder.propTypes = {
  name: PropTypes.string,
  files: PropTypes.arrayOf(PropTypes.shape({})),
  id: PropTypes.number,
  onSaveFile: PropTypes.func,
  onUpdateFile: PropTypes.func,
  deleteFile: PropTypes.func,
  folders: PropTypes.arrayOf(PropTypes.shape({})),
};

export default Folder;
