import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import tutorsActions from 'redux/tutors/actions';
import LayoutContent from 'components/utility/layoutContent';
import IntlMessages from 'components/utility/intlMessages';

import {
  getCurrentTutorFp,
  getTutorCreatedFp,
  getChosenCoursesTutorsFp,
  getTutorId,
} from 'selectors';

import {
  Banner,
  AttachedFile,
} from 'components';

import { bemlds, download } from 'utils';
import FilesPopUp from './FilesPopUp';
import CreateFolderPopUp from './CreateFolderPopUp';
import Folder from './folderComponent';
import TutorsFilesWrapper from './TutorsFiles.style';

const page = bemlds('page');

const TutorFiles = (props) => {
  const {
    folders,
    files,
    getTutorFolders,
    creatTutorFolder,
    createFile,
    updateFile,
    deleteFile,
  } = props;
  useEffect(() => {
    getTutorFolders();
  }, []);
  const [createFolderIsOpen, toggleCreateFolder] = useState(false);
  const [filePopUpIsOpen, toggleFilePopUp] = useState(false);
  const openFilePopUp = () => {
    toggleFilePopUp(true);
  };

  const closeFilePopUp = () => {
    toggleFilePopUp(false);
  };
  const closeCreateFolder = () => {
    toggleCreateFolder(false);
  };

  const openCreateFolder = () => {
    toggleCreateFolder(true);
  };

  const onSaveFolder = (name) => {
    creatTutorFolder(name);
  };

  const handleSaveFile = (file, folderId) => {
    const formData = new FormData();
    formData.append('files', file);
    if (folderId) {
      formData.append('folderId', folderId);
    }
    createFile(formData);
  };

  const onUpdateFile = (folderName, name, file, fileId, folderId) => {
    const body = {
      folderName,
      folderId,
      fileName: name,
    };
    updateFile(body, fileId);
  };

  const autoCompleteOptions = folders.map(item => ({
    value: item.name,
  }));

  return (
    <LayoutContent>
      <TutorsFilesWrapper>
        <Banner title={<IntlMessages id="tutors.files" />} />
        <section className={page()}>
          <div className={page('title')}>
            <IntlMessages id="tutors.filesTitle" />
          </div>
          <button className={page('button')} type="button" onClick={openCreateFolder}>
            <IntlMessages id="tutors.createFolder" />
          </button>
          <CreateFolderPopUp
            isOpen={createFolderIsOpen}
            closePopUp={closeCreateFolder}
            onSave={onSaveFolder}
          />
          <button className={page('button')} type="button" onClick={openFilePopUp}>
            <IntlMessages id="tutors.addFiles" />
          </button>
          <FilesPopUp
            isOpen={filePopUpIsOpen}
            closePopUp={closeFilePopUp}
            onSave={handleSaveFile}
            numberUpload={1}
          />
          <div className={page('content')}>
            {folders.map(({ id, name, files: folderFiles }) => (
              <Folder
                name={name}
                key={id}
                files={folderFiles}
                id={id}
                onSaveFile={handleSaveFile}
                onUpdateFile={onUpdateFile}
                deleteFile={deleteFile}
                folders={folders}
              />
            ))}
          </div>
          <div className={page('files')}>
            {files.map(item => (
              <AttachedFile
                name={item.name}
                url={item.url}
                onDownload={download}
                key={item.id}
                file={item}
                hideFile
                hideHeader
                tutorFile
                changeFileOfCourse={onUpdateFile}
                deleteFileOfCourse={deleteFile}
                onDelete={deleteFile}
                headerInputType="autocomplete"
                autoCompleteOptions={autoCompleteOptions}
              />
            ))}
          </div>
        </section>
      </TutorsFilesWrapper>
    </LayoutContent>
  );
};

const mapStateToProps = (state) => {
  const currentTutor = getCurrentTutorFp(state);
  const isTutorCreated = getTutorCreatedFp(state);
  const chosenCourses = getChosenCoursesTutorsFp(state);
  const currentTutorId = getTutorId(state);

  return {
    currentTutor,
    isTutorCreated,
    chosenCourses,
    currentTutorId,
    ...state.tutors,
  };
};

TutorFiles.defaultProps = {
  getTutorFolders: () => null,
  folders: [],
  creatTutorFolder: () => null,
  createFile: () => null,
  files: [],
  updateFile: () => null,
  deleteFile: () => null,
};

TutorFiles.propTypes = {
  getTutorFolders: PropTypes.func,
  creatTutorFolder: PropTypes.func,
  folders: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    files: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      url: PropTypes.string,
    })),
  })),
  createFile: PropTypes.func,
  files: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    url: PropTypes.string,
  })),
  updateFile: PropTypes.func,
  deleteFile: PropTypes.func,
};

export default connect(mapStateToProps, { ...tutorsActions })(TutorFiles);
