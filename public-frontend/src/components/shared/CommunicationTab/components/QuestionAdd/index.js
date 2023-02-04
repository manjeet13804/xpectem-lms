// @flow
import React, { PureComponent, SyntheticEvent } from 'react';
import { connect } from 'react-redux';
import { getCurrentCommunicationCourseId, getCurrentCourseId } from 'redux/selectors';
import { actionAddCommunication } from 'redux/actions';
import { bemlds } from 'utils';
import { TERM_SHARED, COMMUNICATION_DICTIONARY } from 'localise';
import { DEFAULT_USER_AVATAR } from 'constants/mock';
import { UploadForm } from 'components';
import { getGeneralUser } from 'redux/userProfile/selectors';
import './styles.scss';
import { Editor } from 'react-draft-wysiwyg';
import { convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const b = bemlds('question-add');

type PropsType = {
  onClick: void,
  addCommunication: void,
  getCourseCommunicationId: number,
  currentCourseId: number
};

class QuestionAdd extends PureComponent<PropsType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      clicked: false,
      heading: '',
      message: '',
      fileList: null,
    };
  }

  headingChange = (event: Event) => {
    this.setState({
      clicked: !event.target.value,
      heading: event.target.value,
    });
  };

  messageChange = (event: Event) => {
    const jsonData = JSON.stringify(convertToRaw(event.getCurrentContent()));
    this.setState({ message: jsonData });
  };

  handleChangeFile = ({ fileList }) => {
    this.setState({ fileList });
  };

  render(): Node {
    const {
      onClick,
      addCommunication,
      getCourseCommunicationId,
      currentCourseId,
      user: { firstName, lastName, avatar },
    } = this.props;

    const {
      heading, message, fileList, clicked,
    } = this.state;
    const emptyText = heading === '' || message === '';
    const textMessage = 'Please enter message';
    const textHeading = 'Please enter heading (max. 100 characters) ';

    return (
      <div className={b()}>
        <div
          className={b('user-profile')}
          role="button"
          tabIndex="0"
          onClick={(): SyntheticEvent => onClick()}
        >
          <img className={b('user-profile-image')} src={avatar || DEFAULT_USER_AVATAR} alt="user" />
          <div className={b('user-profile-name')}>{`${firstName} ${lastName}`}</div>
        </div>
        <section className={b('heading')}>
          <div className={b('heading-title')}>{COMMUNICATION_DICTIONARY.heading}</div>
          <input
            className={b('heading-form', { error: clicked })}
            type="text"
            value={heading}
            onChange={this.headingChange}
            placeholder={textHeading}
            maxLength="100"
          />
        </section>
        {clicked && <p>Required field</p>}
        <section className={b('message')}>
          <div className={b('message-title')}>{COMMUNICATION_DICTIONARY.message}</div>
          <Editor
            onEditorStateChange={this.messageChange}
            placeholder={textMessage}
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
          <UploadForm handleChangeFile={this.handleChangeFile} isMultiple />
          <section className={b('buttons')}>
            <button
              type="button"
              className={b('buttons-abort')}
              onClick={(): SyntheticEvent => onClick()}
            >
              {TERM_SHARED.abortButton}
            </button>
            <button
              type="submit"
              className={b('buttons-send')}
              onClick={(event: Event): SyntheticEvent => {
                if (!emptyText) {
                  addCommunication(
                    getCourseCommunicationId || currentCourseId,
                    heading,
                    message,
                    fileList,
                  );
                  onClick();
                  event.preventDefault();
                }
                this.setState({ clicked: true });
              }}
            >
              {TERM_SHARED.sendButton}
            </button>
          </section>
        </section>
      </div>
    );
  }
}

const stateProps = (state: object): object => ({
  getCourseCommunicationId: getCurrentCommunicationCourseId(state),
  currentCourseId: getCurrentCourseId(state),
  user: getGeneralUser(state),
});

const dispatchProps = {
  addCommunication: actionAddCommunication,
};

export default connect(stateProps, dispatchProps)(QuestionAdd);
