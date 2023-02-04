// @flow
import React,
{
  Node,
  PureComponent,
  SyntheticEvent,
} from 'react';
import {COMMUNICATION_DICTIONARY} from 'localise';
import { bemlds, downloadFile } from 'utils';
import { DEFAULT_USER_AVATAR } from 'constants/mock';
import { COMMUNICATION_MESSAGE_HASH_PREFIX } from 'constants/constants';
import './styles.scss';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertFromRaw } from 'draft-js';
import QuestionReply from '../QuestionReply';

const b = bemlds('question-open');

const getMessageFromEditor = text => EditorState.createWithContent(convertFromRaw(JSON.parse(text)));

type PropsType = {
  onClick: void,
  id: number | string,
  currentCourseId: number,
  heading: string,
  message: string,
  firstName: string,
  lastName: string,
  communicationAttachment: Array<object>,
  date: string,
  replyStatus: boolean,
  avatar: string
};

class QuestionOpen extends PureComponent<PropsType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      openReply: false,
    };
  }

  clickReply = (): Node => {
    const {openReply} = this.state;
    this.setState({openReply: !openReply});
  };

  showDeleteButton = (): Node => {
    const {
      index,
      messageCount,
      handleDeleteMessage,
      authorId,
      userId,
    } = this.props;

    if (handleDeleteMessage
      && userId
      && userId === authorId
      && index === messageCount - 1) {
      return true;
    }

    return false;
  };


  render(): Node {
    const { openReply } = this.state;
    const {
      id,
      currentCourseId,
      heading,
      message,
      firstName,
      lastName,
      communicationAttachment,
      date,
      replyStatus,
      avatar,
      userAvatar,
      isClosed,
      isChecked,
      messageId,
      handleDeleteMessage,
    } = this.props;

    const dialogIsOpen = !isClosed;
    const isShowDeleteButton = !isChecked && this.showDeleteButton();

    return (
      <div className={b()} id={`${COMMUNICATION_MESSAGE_HASH_PREFIX}${messageId}`}>
        <div className={b('author')} role="button" tabIndex="0">
          <div className={b('author-profile')}>
            <img className={b('author-profile-image')} src={avatar || DEFAULT_USER_AVATAR} alt="user" />
            <div className={b('author-profile-name')}>
              {`${firstName} ${lastName}`}
            </div>
          </div>
          <div className={b('author-date')}>
            {date}
          </div>
        </div>
        <section className={b('message')}>
          <div className={b('message-title')}>
            {heading}
          </div>
          {isShowDeleteButton && (
            <div className={b('message-delete')}>
              <button
                onClick={() => handleDeleteMessage(id, messageId)}
                className={b('message-delete_button')}
              >
                {COMMUNICATION_DICTIONARY.deleteMessage}
              </button>
            </div>
          )}
          {message && (
          <div className={b('message-text', { new: !isChecked })}>
            <Editor
              editorState={getMessageFromEditor(message)}
              toolbarHidden
              editorClassName={b('editor')}
            />
          </div>
          )}
          {Boolean(communicationAttachment.length) && (
          <div className={b('message-attache')}>
            <div className={b('message-attache-title')}>Attached files:</div>
            {communicationAttachment
            && communicationAttachment.map(({id: idAttach, uri, originalName}: object): Node => (
              <button
                key={idAttach}
                className={b('message-attache-file')}
                type="button"
                onClick={() => downloadFile(uri, originalName)}
              >
                {originalName}
              </button>
            ))
            }
          </div>
          )}
        </section>
        {(replyStatus && dialogIsOpen) && (
          openReply
            ? (
              <QuestionReply
                onClick={this.clickReply}
                id={id}
                currentCourseId={currentCourseId}
                heading={heading}
                isClosed={isClosed}
              />
            )
            : (
              <div
                className={b('answer')}
                role="button"
                tabIndex="0"
                onClick={(): SyntheticEvent => this.clickReply()}
              >
                <img className={b('answer-icon')} src={userAvatar || DEFAULT_USER_AVATAR} alt="user" />
                <div className={b('answer-text')}>
                  <div className={b('answer-text-tutor')}>
                    {COMMUNICATION_DICTIONARY.reply}
                  </div>
                </div>
              </div>
            )
        )}
      </div>
    );
  }
}

export default QuestionOpen;
