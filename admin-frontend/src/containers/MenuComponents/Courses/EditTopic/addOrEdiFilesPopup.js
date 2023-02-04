import React, { useState } from 'react';
import PropTypes from 'prop-types';
import IntlMessages from 'components/utility/intlMessages';
import { bemlds } from 'utils';
import Modal from 'components/feedback/modal';
import {
  AttachedFile,
} from 'components';
import { connect } from 'react-redux';
import coursesActions from 'redux/courses/actions';
import PopupWrapper from './popUp.style';
import AddFiles from '../AddFiles/index';

const courseFields = bemlds('course-fields');
const p = bemlds('popup');
const block = bemlds('drag-n-drop-block');

const defaultProps = {
  currentLessonFiles: [],
  lessonState: {},
  downloadCurrentFile: () => null,
  deleteFileOfCourse: () => null,
  changeFileOfCourse: () => null,
  lessonId: 0,
};

const propTypes = {
  currentLessonFiles: PropTypes.arrayOf(PropTypes.shape({})),
  lessonState: PropTypes.shape({}),
  downloadCurrentFile: PropTypes.func,
  deleteFileOfCourse: PropTypes.func,
  changeFileOfCourse: PropTypes.func,
  lessonId: PropTypes.func,
};

const AddOrEdiFilesPopup = ({
  currentLessonFiles,
  downloadCurrentFile,
  deleteFileOfCourse,
  changeFileOfCourse,
  topicId,
}) => {
  const [isOpen, togglePopUp] = useState(false);

  const handleClosePopup = () => {
    togglePopUp(false);
  };

  const handleDownloadCurrentFile = (url, name) => {
    downloadCurrentFile(url, name);
  };

  const handleDeleteFileOfCourse = (fileId) => {
    deleteFileOfCourse(fileId, true);
  };

  const handleEditFileOfCourse = (header, name, file, fileId) => {
    const body = new FormData();
    if (header) {
      body.append('header', header);
    }
    if (name) {
      body.append('name', name);
    }
    if (file) {
      body.append('file', file);
    }

    changeFileOfCourse(fileId, body, true);
  };

  return (
    <PopupWrapper>
      <section className={block()}>
        <div className={block('title')}>
          <IntlMessages id="courses.addFilesToLesson" />
        </div>
        {!isOpen && (
        <div>
          {currentLessonFiles.map(file => (
            <div className={courseFields('attached-file')} key={file.id}>
              <AttachedFile
                file={file}
                header={file.fileTopics.header}
                onDownload={handleDownloadCurrentFile}
                onDelete={id => handleDeleteFileOfCourse(id)}
                changeFileOfCourse={handleEditFileOfCourse}
                deleteFileOfCourse={id => deleteFileOfCourse(id, true)}
              />
            </div>
          ))}
          <div
            className={p('new-topic')}
            role="button"
            tabIndex="-1"
            onClick={() => togglePopUp(true)}
          >
            <IntlMessages id="lessons.addFilesBtn" />
          </div>
        </div>
        )}
        <Modal
          visible={isOpen}
          onCancel={handleClosePopup}
          footer={null}
          centered
          className={p('modal')}
        >
          <PopupWrapper>
            <AddFiles isLessonFiles topicId={topicId} handleClosePopup={handleClosePopup} />
          </PopupWrapper>
        </Modal>
      </section>
    </PopupWrapper>
  );
};

AddOrEdiFilesPopup.defaultProps = defaultProps;
AddOrEdiFilesPopup.propTypes = propTypes;
export default connect(() => {}, { ...coursesActions })(AddOrEdiFilesPopup);
