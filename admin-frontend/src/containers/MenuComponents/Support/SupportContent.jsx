// @flow
import React, { useState } from 'react';
import { bemlds } from 'utils';
import {
  Banner,
  DefaultButton,
  BannerNotification,
} from 'components';
import fileShape from 'assets/images/file_shape.png';
import { connect } from 'react-redux';
import {
  Upload,
} from 'antd';
import IntlMessages from 'components/utility/intlMessages';
import PropTypes from 'prop-types';
import TechSupportActions from '../../../redux/techSupport/actions';
import CustomSelect from './CustomSelect/CustomSelect';
import AvatarWithName from './UserInfo/AvatarWithName';
import InputField from './TextArea/InputField';
import TechSupportWrapper from './TechSupport.style';

const CONTACT_US = {
  messagePlaceholder: 'Please describe as detailed as possible what happened and when the error occurred.',
};

const generateAttachedFormData = (formData, array) => {
  array.forEach((file) => {
    formData.append('attachment', file);
  });
};

const block = bemlds('tech-support');

const propTypes = {
  user: PropTypes.obj,
  isSuccessBanner: PropTypes.bool,
  sendSupportMessage: PropTypes.func,
  clearSuccessSendingMessage: PropTypes.func,
};

const defaultProps = {
  user: {},
  isSuccessBanner: false,
  sendSupportMessage: () => null,
  clearSuccessSendingMessage: () => null,
};

const ContactUs = ({
  user,
  isSuccessBanner,
  sendSupportMessage,
  clearSuccessSendingMessage,
}) => {
  const TOPICS = [
    {
      value: 'general',
      label: 'General question',
    },
  ];

  const [defaultOption] = TOPICS;

  const [
    [topic, setTopic],
    [message, setMessage],
    [files, setFiles],
    [key, setKey],
  ] = [
    useState(defaultOption),
    useState(''),
    useState([]),
    useState(0),
  ];

  const handleChange = (e) => {
    setTopic(e);
  };

  const handleMessageChange = ({
    target: {
      value,
    },
  }) => setMessage(value);


  const clearForm = () => {
    setTopic(null);
    setMessage('');
    setFiles([]);
    setKey(prevState => prevState + 1);
  };

  const sendMessageToTechSupport = () => {
    const body = new FormData();
    const rebuildedFiles = files.map(({ originFileObj }) => originFileObj);
    body.append('courseId', topic.value);
    body.append('message', message);
    rebuildedFiles && generateAttachedFormData(body, rebuildedFiles);
    sendSupportMessage(body, clearForm);
  };

  const handleChangeFile = ({ fileList }) => {
    setFiles(fileList);
  };

  const isDisabled = !message || !topic;
  return (
    <div>
      <Banner title={<IntlMessages id="techSupport.banner" />} />
      {isSuccessBanner && (
      <BannerNotification
        error={false}
        title={<IntlMessages id="techSupport.successSending" />}
        close={clearSuccessSendingMessage}
        isScrollMount
      />
      )}
      <TechSupportWrapper>
        <div className={block()}>
          <div className={block('text')}>
            <IntlMessages id="techSupport.description" />
          </div>
          <div className={block('content')}>
            {user && (
            <AvatarWithName
              img={user.avatar}
              firstName={user.firstName}
              lastName={user.lastName}
            />
            )}
            <div className={block('topic-tip')}>
              <IntlMessages id="techSupport.topicTip" />
            </div>
            <CustomSelect
              instanceId="support-topic"
              className={block('topic-select')}
              options={TOPICS}
              value={topic}
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <InputField
              id="textarea"
              className={block('message-wrapper')}
              inputClassName={block('message')}
              title={<IntlMessages id="techSupport.message" />}
              type="textarea"
              value={message}
              onChange={handleMessageChange}
              placeholder={CONTACT_US.messagePlaceholder}
              required
            />
          </div>
          <hr className={block('line')} />
          <div className={block('bottom')}>
            <div className={block('attach-button-wrapper')}>
              <Upload
                onChange={handleChangeFile}
                beforeUpload={() => false}
                key={key}
              >
                <button className={block('attach-button')} type="button">
                  <img className={block('icon')} src={fileShape} alt="attach" />
                  <IntlMessages id="techSupport.attach" />
                </button>
              </Upload>
            </div>
            <DefaultButton
              disabled={isDisabled}
              onClick={sendMessageToTechSupport}
              textId="techSupport.sendButton"
            />
          </div>
        </div>
      </TechSupportWrapper>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { user } = state.Auth;
  const { isSuccessBanner } = state.techSupport;

  return {
    user,
    isSuccessBanner,
  };
};

ContactUs.propTypes = propTypes;
ContactUs.defaultProps = defaultProps;

export default connect(mapStateToProps, TechSupportActions)(ContactUs);
