import React, { PureComponent } from 'react';
import { bemlds } from 'utils';
import {
  Upload,
  Avatar,
  Input,
  Icon,
} from 'antd';
import { PropTypes } from 'prop-types';
import IntlMessages from 'components/utility/intlMessages';
import { SimpleTextFormat } from '../../index';
import AddCommunicationWrapper from './addCommunication.style';

const defaultProps = {
  currentStudents: null,
  isToggleQuestion: false,
  onToggleCommunication: null,
  handleAddCommunication: null,
};

const propTypes = {
  currentStudents: PropTypes.arrayOf(PropTypes.object),
  isToggleQuestion: PropTypes.bool,
  onToggleCommunication: PropTypes.func,
  handleAddCommunication: PropTypes.func,
};

const b = bemlds('add-communication');

class AddCommunication extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      heading: '',
      textarea: '',
      fileList: [],
    };
  }

  onToggleCommunication = () => {
    const { onToggleCommunication } = this.props;

    onToggleCommunication();
    this.setState({ heading: '', textarea: '', fileList: [] });
  };

  addText = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
  };

  handleChange = ({ fileList }) => {
    this.setState({ fileList });
  };

  handleSend = () => {
    const { heading, textarea, fileList } = this.state;
    const { handleAddCommunication } = this.props;

    handleAddCommunication(heading, textarea, fileList);
  }

  render() {
    const { heading, textarea } = this.state;

    const {
      currentStudents,
      isToggleQuestion,
    } = this.props;

    const [student = {}] = currentStudents || [];

    const {
      avatar,
      firstName,
      lastName,
    } = student;

    return (
      <AddCommunicationWrapper>
        <div className={b()}>
          {isToggleQuestion ? (
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
                  <IntlMessages id="students.communicationsTitleHeading" />
                </div>
                <div className={b('form-input-text')}>
                  <Input
                    value={heading}
                    name="heading"
                    onChange={e => this.addText(e)}
                  />
                </div>
                <div className={b('form-input-text')}>
                  <SimpleTextFormat
                    name="textarea"
                    handleChange={(name, json, text) => this.addText({ target: { name, value: text } })}
                    title="students.communicationsTitleMessage"
                    value={textarea}
                    isMessage
                  />
                </div>
              </div>
              <hr className={b('form-line')} />
              <div className={b('button')}>
                <div className={b('button-text')}>
                  <Upload
                    onChange={this.handleChange}
                    beforeUpload={() => false}
                  >
                    <div className={b('button-upload')}>
                      <Icon type="file" theme="twoTone" style={{ marginRight: '5px' }} />
                      <IntlMessages id="students.attach" />
                    </div>
                  </Upload>
                </div>
                <div className={b('button-click')}>
                  <button
                    className={b('button-btn')}
                    onClick={this.onToggleCommunication}
                    type="button"
                  >
                    <IntlMessages id="students.communicationAbort" />
                  </button>
                  <button
                    className={b('button-btn', { send: true })}
                    onClick={this.handleSend}
                    type="button"
                  >
                    <IntlMessages id="students.communicationSend" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div
              className={b('question')}
              onClick={this.onToggleCommunication}
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
                <IntlMessages id="students.communicationsNewQuestion" />
              </div>
            </div>
          )}
        </div>
      </AddCommunicationWrapper>
    );
  }
}


AddCommunication.propTypes = propTypes;
AddCommunication.defaultProps = defaultProps;

export default AddCommunication;
