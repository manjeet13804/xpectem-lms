// @flow
import React, { PureComponent, SyntheticEvent } from 'react';
import { connect } from 'react-redux';
import { bemlds } from 'utils';
import {
  getCurrentCommunicationId,
  getCurrentCommunicationCourseId,
} from 'redux/selectors';
import { getGeneralUser } from 'redux/userProfile/selectors';

import { actionAddCommunicationDialog } from 'redux/actions';
import { DEFAULT_USER_AVATAR } from 'constants/mock';
import fileShape from 'assets/images/file_shape.png';
import { TERM_SHARED, COMMUNICATION_DICTIONARY } from 'localise';
import { COMMUNICATION_TYPE, COMMUNICATION_MAX_SIZE, MB_SIZE } from 'constants/constants';
import {
  Upload,
} from 'antd';
import './styles.scss';
import { Editor } from 'react-draft-wysiwyg';
import { convertToRaw } from 'draft-js';

const b = bemlds('question-reply');

type PropsType = {
  id: number | string,
  onClick: void,
  addDialog: void,
  currentCommunicationCourseId: number,
  currentCommunicationId: number,
  currentCourseId: number
};

class QuestionReply extends PureComponent<PropsType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      message: '',
      fileList: [],
      notification: '',
    };
    this.messageChange = this.messageChange.bind(this);
  }

  messageChange(event: Event) {
    const jsonData = JSON.stringify(convertToRaw(event.getCurrentContent()));
    this.setState({ message: jsonData });
  }

  handleChangeFile = ({ fileList }) => {
    const isLarger5Mb = fileList.every(file => file.size / MB_SIZE / MB_SIZE < COMMUNICATION_MAX_SIZE);
    if (!isLarger5Mb) {
      this.setState({ notification: 'File size must be less than 5MB' });
      return;
    }
    this.setState({ notification: '', fileList });
  };

  handleAbortButton = () => {
    const { onClick } = this.props;
    this.setState({
      message: '',
      fileList: [],
    });
    onClick();
  };

  disabledSendButton = () => {
    const { message } = this.state;
    return !(message && JSON.parse(message).blocks.some(item => item.text));
  }

  render(): Node {
    const { message, fileList, notification } = this.state;
    const {
      onClick,
      addDialog,
      id: currentCommunicationId,
      getCourseCommunicationId,
      user: {
        firstName,
        lastName,
        avatar,
      },
    } = this.props;

    return (
      <div className={b()}>
        <div
          className={b('user-profile')}
          role="button"
          tabIndex="0"
          onClick={(): SyntheticEvent => onClick()}
        >
          <img className={b('user-profile-image')} src={avatar || DEFAULT_USER_AVATAR} alt="user" />
          <div className={b('user-profile-name')}>
            {`${firstName} ${lastName}`}
          </div>
        </div>
        <section className={b('block')}>
          <section className={b('message')}>
            <div className={b('message-title')}>
              {COMMUNICATION_DICTIONARY.message}
            </div>
            <Editor
              onEditorStateChange={this.messageChange}
              editorClassName={b('editor')}
              toolbar={{
                options: ['inline', 'textAlign', 'list', 'blockType'],
                inline: {
                  options: ['bold', 'italic'],
                },
                list: {
                  options: ['unordered', 'ordered'],
                },
                textAlign: {
                  options: ['left', 'center', 'right'],
                },
              }}
            />
          </section>
          <hr className={b('line')} />
          <section className={b('form')}>
            <Upload
              fileList={fileList}
              onChange={this.handleChangeFile}
              accept={COMMUNICATION_TYPE}
              beforeUpload={() => false}
              multiple
            >
              <section className={b('attach')}>
                <img className={b('attach-image')} src={fileShape} alt="attach" />
                <div className={b('attach-title')}>
                  {COMMUNICATION_DICTIONARY.attachFiles}
                </div>
              </section>
              {notification
                && (
                <div>
                  <p className={b('upload-error')}>{notification}</p>
                </div>
                )}
            </Upload>
            <section className={b('buttons')}>
              <button
                type="submit"
                className={b('buttons-abort')}
                onClick={this.handleAbortButton}
              >
                {TERM_SHARED.abortButton}
              </button>
              <button
                type="submit"
                className={b('buttons-send', { disabled: this.disabledSendButton()})}
                onClick={
                  (event: Event): SyntheticEvent => {
                    addDialog(
                      getCourseCommunicationId,
                      currentCommunicationId,
                      message,
                      fileList,
                    );
                    onClick();
                    event.preventDefault();
                  }
                }
                disabled={this.disabledSendButton()}
              >
                {TERM_SHARED.sendButton}
              </button>
            </section>
          </section>
          <div>
            <p className={b('about-file')}>
              <span className={b('bold-text')}>{COMMUNICATION_DICTIONARY.allowFormatText}</span>
              <span>{COMMUNICATION_DICTIONARY.allowFormat}</span>
            </p>
            <p className={b('about-file')}>
              <span className={b('bold-text')}>{COMMUNICATION_DICTIONARY.maxFileSizeText}</span>
              <span>{COMMUNICATION_DICTIONARY.maxFileSize}</span>
            </p>
          </div>
        </section>
      </div>
    );
  }
}

const stateProps = (state: object): object => ({
  currentCommunicationId: getCurrentCommunicationId(state),
  getCourseCommunicationId: getCurrentCommunicationCourseId(state),
  user: getGeneralUser(state),
});

const dispatchProps = {
  addDialog: actionAddCommunicationDialog,
};

export default connect(stateProps, dispatchProps)(QuestionReply);
