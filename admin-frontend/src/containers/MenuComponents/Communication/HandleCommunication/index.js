import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik } from 'formik';

import { COMMUNICATION_SHEMA } from 'constants/validationShema';
import IntlMessages from 'components/utility/intlMessages';
import LayoutContent from 'components/utility/layoutContent';
import {
  Banner,
  SearchSvg,
  DialogItem,
  TextFormatSimple,
  DragAndDropCustomize,
  CommunicationItem,
  StudentInfo,
} from 'components';
import {
  getCurrentCommunicationFp,
  getUserIdFp,
  getUserAvatarFp,
  getCurrentStudentFp,
  getPreviosCommunicationFp,
} from 'selectors';
import { bemlds } from 'utils';
import {
  PLACEHOLDER,
} from 'constants/constants';
import communicationActions from 'redux/communication/actions';
import userActions from 'redux/user/actions';
import HandleCommunicationWrapper from './handleCommunication.style';

const page = bemlds('page');
const rb = bemlds('reply-group');
const pc = bemlds('previos-communication');
const { placeholderText } = PLACEHOLDER;

const HandleCommunication = (props) => {
  const {
    match: {
      params,
    },
    currentCommunication,
    userAvatar,
    userId,
    setCurrentCommunication,
    setCurrentUser,
    searchTutor,
    searchTopic,
    reasignQuestion,
    moveQuestionTopic,
    addNewTopic,
    sendMessage,
    currentStudent,
    currentStudent: {
      avatar,
    },
    previosCommunication,
    setCurrentStudent,
  } = props;

  const [isReply, setReply] = useState(false);
  const [files, setFiles] = useState([]);
  const [note, setNote] = useState('');

  useEffect(() => {
    const { dialogId } = params;
    setCurrentCommunication(dialogId);
    setCurrentUser();
  }, []);

  const generateCurrentDIalog = () => currentCommunication.map((item) => {
    const { id: dialogId, author: { id } } = item;
    return (
      <DialogItem
        key={dialogId}
        userAvatar={userAvatar}
        isUser={id === userId}
        searchTutor={searchTutor}
        searchTopic={searchTopic}
        reasignQuestion={reasignQuestion}
        moveQuestionTopic={moveQuestionTopic}
        addNewTopic={addNewTopic}
        {...item}
      />
    );
  });

  // not backend
  const handleChangeDescription = (value) => {
    setNote(value);
  };
  // not backend
  const handleDragAndDropCustomize = (fileList) => {
    setFiles(fileList);
  };

  const handleAbort = () => {
    setFiles([]);
    setNote('');
    setReply(false);
  };

  return (
    <LayoutContent>
      <HandleCommunicationWrapper>
        <Banner title={<IntlMessages id="communication.banner" />} />
        <div className="main-title">
          <IntlMessages id="communication.title" />
        </div>
        <section className={page()}>
          <div className={page('wrapper', { left: true })}>
            <div className={page('search')}>
              <SearchSvg />
              <input
                className={page('input')}
                type="text"
                placeholder={placeholderText}
              />
            </div>
            <div className={page('dialog-content')}>
              {generateCurrentDIalog()}
            </div>
            <div className={rb()}>
              <img
                src={avatar}
                alt="student-avatar"
                className={rb('img')}
              />
              <div className={rb('wrapper')}>
                {!isReply && (
                <button
                  type="button"
                  className={rb('btn')}
                  onClick={() => setReply(true)}
                >
                  <IntlMessages id="communication.reply" />
                </button>
                )}
                {isReply && (
                <Formik
                  initialValues={{
                    headerMessage: '',
                  }}
                  validationSchema={COMMUNICATION_SHEMA}
                  onSubmit={(values) => {
                    sendMessage({ ...values, files, note });
                    handleAbort();
                  }}
                  render={({
                    handleChange,
                    handleSubmit,
                    handleBlur,
                    handleReset,
                    errors,
                    values,
                  }) => (
                    <form className={rb('form')}>
                      <div className={rb('message-header')}>
                        <IntlMessages id="communication.messageHeader" />
                      </div>
                      <input
                        name="headerMessage"
                        type="text"
                        className={page('input', { error: errors.headerMessage })}
                        value={values.headerMessage}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder={placeholderText}
                      />
                      <div className={rb('text-format-simple')}>
                        <TextFormatSimple
                          saveDescription={handleChangeDescription}
                          name="description"
                          note={note}
                        />
                      </div>
                      <div className={rb('drag-and-drop')}>
                        <DragAndDropCustomize
                          sizeInfo={5}
                          handleDragAndDropCustomize={handleDragAndDropCustomize}
                          files={files}
                        />
                      </div>
                      <div className={rb('wrap-btn')}>
                        <button
                          type="button"
                          onClick={() => {
                            handleSubmit();
                            handleReset();
                          }}
                          className={rb('btn', { 'send-completed': true })}
                        >
                          <IntlMessages id="communication.sendCompleted" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            handleSubmit();
                            handleReset();
                          }}
                          className={rb('btn', { 'send-remain': true })}
                        >
                          <IntlMessages id="communication.sendRemain" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            handleAbort();
                            handleReset();
                          }}
                          className={rb('btn', { abort: true })}
                        >
                          <IntlMessages id="students.communicationAbort" />
                        </button>
                      </div>
                    </form>
                  )}
                />
                )}
                <div className={pc()}>
                  <div className={pc('wrap-info')}>
                    <div className={pc('title')}>
                      <IntlMessages id="communication.previosCommunication" />
                    </div>
                    <div className={pc('number')}>
                      {`[  ${previosCommunication.length}  ]`}
                    </div>
                  </div>
                  {previosCommunication.map(item => (
                    <CommunicationItem
                      key={item.id}
                      setCurrentStudent={setCurrentStudent}
                      {...item}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className={page('wrapper')}>
            <StudentInfo {...currentStudent} />
          </div>
        </section>
      </HandleCommunicationWrapper>
    </LayoutContent>
  );
};

const mapStateToProps = (state) => {
  const currentCommunication = getCurrentCommunicationFp(state);
  const userId = getUserIdFp(state);
  const userAvatar = getUserAvatarFp(state);
  const currentStudent = getCurrentStudentFp(state);
  const previosCommunication = getPreviosCommunicationFp(state);
  return {
    currentCommunication,
    userAvatar,
    userId,
    currentStudent,
    previosCommunication,
  };
};


HandleCommunication.defaultProps = {
  userId: null,
  userAvatar: '',
  currentCommunication: [],
  setCurrentCommunication: null,
  setCurrentUser: null,
  searchTutor: null,
  searchTopic: null,
  reasignQuestion: null,
  moveQuestionTopic: null,
  addNewTopic: null,
  sendMessage: null,
  currentStudent: {
    avatar: '',
    firsName: '',
    lastName: '',
  },
  previosCommunication: [],
  setCurrentStudent: null,
};

HandleCommunication.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  userId: PropTypes.number,
  userAvatar: PropTypes.string,
  currentCommunication: PropTypes.arrayOf(PropTypes.object),
  setCurrentCommunication: PropTypes.func,
  setCurrentUser: PropTypes.func,
  searchTutor: PropTypes.func,
  searchTopic: PropTypes.func,
  reasignQuestion: PropTypes.func,
  moveQuestionTopic: PropTypes.func,
  addNewTopic: PropTypes.func,
  sendMessage: PropTypes.func,
  currentStudent: PropTypes.shape({
    avatar: PropTypes.string,
  }),
  previosCommunication: PropTypes.arrayOf(PropTypes.object),
  setCurrentStudent: PropTypes.func,
};

export default connect(mapStateToProps, {
  ...communicationActions,
  ...userActions,
})(HandleCommunication);
