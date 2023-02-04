import React, { PureComponent } from 'react';
import { bemlds } from 'utils';
import {
  Upload,
  Avatar,
  Icon,
} from 'antd';
import { PropTypes } from 'prop-types';
import IntlMessages from 'components/utility/intlMessages';
import { COMMUNICATION_TYPE } from 'constants/constants';
import { checkIfFileAreTooBig } from 'constants/validationShema/constants';
import { SimpleTextFormat } from '../../index';
import AddMessageWrapper from './addMessage.style';

const defaultProps = {
  currentStudents: null,
  isToggleQuestion: false,
  handleAddMessage: null,
  dialogId: null,
  addMessage: null,
};

const propTypes = {
  currentStudents: PropTypes.arrayOf(PropTypes.object),
  isToggleQuestion: PropTypes.bool,
  handleAddMessage: PropTypes.func,
  dialogId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  addMessage: PropTypes.func,
};

const b = bemlds('add-message');

class AddMessage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      textarea: '',
      fileList: [],
      isToggleReply: false,
      error: '',
    };
  }

  onToggleReply = () => {
    const { isToggleReply } = this.state;

    this.setState({ isToggleReply: !isToggleReply });
    this.setState({ textarea: '', fileList: [] });
  };

  addText = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
  };

  handleChange = ({ fileList }) => {
    if (fileList.every(file => checkIfFileAreTooBig(file))) {
      this.setState({ error: '', fileList });
      return;
    }
    this.setState({ error: 'File size must be less than 5MB' });
  };

  handleAbortMessage = () => {
    const { abortMessage, dialogId } = this.props;
    abortMessage(dialogId);
    this.onToggleReply();
  }

  handleSendAndRemain = () => {
    const { textarea, fileList } = this.state;
    const { addMessage, dialogId } = this.props;

    addMessage({
      dialogId,
      textarea,
      fileList,
      isComplete: false,
    });
    this.onToggleReply();
  }

  handleSendComplete = () => {
    const { textarea, fileList } = this.state;
    const { addMessage, dialogId } = this.props;

    addMessage({
      dialogId,
      textarea,
      fileList,
      isComplete: true,
    });
    this.onToggleReply();
  }

  render() {
    const {
      textarea,
      isToggleReply,
      fileList,
      error,
    } = this.state;

    const {
      currentStudents,
    } = this.props;

    const [student = {}] = currentStudents || [];

    const {
      avatar,
      firstName,
      lastName,
    } = student;
    const disabled = () => {
      if (fileList.length) {
        return false;
      }
      return !(textarea && JSON.parse(textarea).blocks.some(item => item.text));
    };

    return (
      <AddMessageWrapper>
        <div className={b()}>
          {isToggleReply ? (
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
                  <span className={b('form-title-name-firstname')}>
                    {firstName}
                  </span>
                  <span>
                    {lastName}
                  </span>
                </div>
              </div>
              <div className={b('form-input')}>
                <div className={b('form-input-title')}>
                  <IntlMessages id="students.communicationsTitleMessage" />
                </div>
                <div className={b('form-input-text')}>
                  <SimpleTextFormat
                    name="textarea"
                    handleChange={(name, json) => {
                      this.addText({
                        target: {
                          name,
                          value: json,
                        },
                      });
                    }}
                    value={textarea}
                    isMessage
                    isReply
                  />
                </div>
              </div>
              <hr className={b('form-line')} />
              <div className={b('button')}>
                <div className={b('button-text')}>
                  <Upload
                    fileList={fileList}
                    onChange={this.handleChange}
                    beforeUpload={() => false}
                    accept={COMMUNICATION_TYPE}
                    multiple
                  >
                    <div className={b('button-upload')}>
                      <Icon
                        type="file"
                        theme="twoTone"
                        style={{ marginRight: '5px' }}
                      />
                      <IntlMessages id="students.attach" />
                    </div>
                    {error
                      && (
                      <div>
                        <p className={b('upload-error')}>{error}</p>
                      </div>
                      )}
                  </Upload>
                </div>
                <div className={b('button-click')}>
                  <button
                    className={b('button-btn')}
                    onClick={this.handleAbortMessage}
                    type="button"
                  >
                    <IntlMessages id="students.communicationAbort" />
                  </button>
                  <button
                    className={b('button-btn', { send: true })}
                    onClick={this.handleSendAndRemain}
                    type="button"
                    disabled={disabled()}
                  >
                    <IntlMessages id="students.communicationSendAndRemain" />
                  </button>
                  <button
                    className={b('button-btn', { send: true })}
                    onClick={this.handleSendComplete}
                    type="button"
                    disabled={disabled()}
                  >
                    <IntlMessages id="students.communicationSendAndComplete" />
                  </button>
                </div>
              </div>
              <div className={b('upload-info')}>
                <p className={b('about-file')}>
                  <span className={b('bold-text')}>
                    <IntlMessages id="students.communicationsFileFormatText" />
                  </span>
                  <span>
                    <IntlMessages id="students.communicationsFileFormat" />
                  </span>
                </p>
                <p className={b('about-file')}>
                  <span className={b('bold-text')}>
                    <IntlMessages id="students.communicationsFileSizeText" />
                  </span>
                  <span>
                    <IntlMessages id="students.communicationsFileSize" />
                  </span>
                </p>
              </div>
            </div>
          ) : (
            <div
              className={b('question')}
              onClick={this.onToggleReply}
              role="button"
              tabIndex="-1"
            >
              <div className={b('question-avatar')}>
                <Avatar
                  size={32}
                  icon="user"
                  src={avatar}
                />
              </div>
              <div className={b('question-title')}>
                <IntlMessages id="students.communicationsReply" />
              </div>
            </div>
          )}
        </div>
      </AddMessageWrapper>
    );
  }
}


AddMessage.propTypes = propTypes;
AddMessage.defaultProps = defaultProps;

export default AddMessage;
