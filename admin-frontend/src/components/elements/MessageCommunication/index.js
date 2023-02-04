import React, { PureComponent, Fragment } from 'react';
import { bemlds, downloadFile } from 'utils';
import {
  Avatar,
} from 'antd';
import { PropTypes } from 'prop-types';
import IntlMessages from 'components/utility/intlMessages';
import { Editor } from 'react-draft-wysiwyg';
import { DATE_FORMATS } from 'constants/constants';
import { EditorState, convertFromRaw } from 'draft-js';
import moment from 'moment';
import MessageCommunicationWrapper from './messageCommunication.style';
import DefaultButton from '../../defaultButton';

const defaultProps = {
  itemMessage: {},
};

const propTypes = {
  itemMessage: PropTypes.shape({
    message: PropTypes.string,
    author: {
      firstName: PropTypes.string,
      lastName: PropTypes.string,
    },
    avatar: PropTypes.shape({}),
    communicationAttachment: PropTypes.arrayOf(PropTypes.object),
  }),
};

const getMessageFromEditor = text => EditorState.createWithContent(convertFromRaw(JSON.parse(text)));

const b = bemlds('add-message');

const { yearMonthDayHoursMinutesSeconds } = DATE_FORMATS;

class MessageCommunication extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      heading: '',
      textarea: '',
      fileList: [],
      isToggleReply: false,
    };
  }

  handleChange = ({ fileList }) => {
    this.setState({ fileList });
  };

  showDeleteButton = () => {
    const {
      itemMessage,
      userId,
      index,
      messageCount,
      handleDeleteMessage,
    } = this.props;

    const {
      author: { id: authorId },
    } = itemMessage;

    if (handleDeleteMessage
      && userId
      && userId === authorId
      && index === messageCount - 1) {
      return true;
    }

    return false;
  };

  render() {
    const {
      itemMessage,
      handleDeleteMessage,
      dialogId,
    } = this.props;

    const {
      id,
      message,
      author: { firstName, lastName },
      avatar,
      communicationAttachment,
      createdAt,
      isChecked,
      updatedAt,
    } = itemMessage;

    const createdDialogWithTime = moment(createdAt).format(yearMonthDayHoursMinutesSeconds);
    const updatedDialogWithTime = moment(updatedAt).format(yearMonthDayHoursMinutesSeconds);

    const isShowDeleteButton = !isChecked && this.showDeleteButton();

    return (
      <MessageCommunicationWrapper>
        <div className={b()}>
          <div className={b('form')}>
            <div className={b('form-title')}>
              <div className={b('form-title-avatar')}>
                <Avatar
                  size={32}
                  icon="user"
                  src={avatar}
                />
              </div>
              <div className={b('form-title-name')}>
                <div>
                  <span className={b('form-title-name-firstname')}>
                    {firstName}
                  </span>
                  <span>
                    {lastName}
                  </span>
                </div>
                <div className={b('form-title-date')}>
                  {createdDialogWithTime}
                </div>
              </div>
            </div>
            {message && (
            <div className={b('form-input')}>
              <div className={b('form-input-title')}>
                <IntlMessages id="students.communicationsTitleMessage" />
              </div>
              <div className={b('form-input-text')}>
                <Editor
                  editorState={getMessageFromEditor(message)}
                  toolbarHidden
                  editorClassName={b('editor')}
                />
              </div>
            </div>
            )}
            {communicationAttachment.length > 0 && (
              <Fragment>
                <hr className={b('form-line')} />
                <div className={b('attached')}>
                  <div className={b('attached-header')}>
                    <IntlMessages id="students.attached" />
                  </div>
                  {communicationAttachment.map(({ id, originalName, uri }) => (
                    <div
                      className={b('attached-link-download')}
                      key={id}
                      role="button"
                      tabIndex={-1}
                      onClick={() => downloadFile(uri, originalName)}
                    >
                      {originalName}
                    </div>
                  ))}
                </div>
              </Fragment>
            )}
            <div className={b('form-delete-button', { 'is-delete': isShowDeleteButton })}>
              {isChecked && updatedAt && (
                <div>
                  <IntlMessages id="students.readMessage" />
                  {updatedDialogWithTime}
                </div>
              )}
              {isShowDeleteButton && (
              <DefaultButton
                onClick={() => handleDeleteMessage(dialogId, id)}
                textId="students.deleteOneMessage"
                isDelete
              />
              )}
            </div>
          </div>
        </div>
      </MessageCommunicationWrapper>
    );
  }
}


MessageCommunication.propTypes = propTypes;
MessageCommunication.defaultProps = defaultProps;

export default MessageCommunication;
