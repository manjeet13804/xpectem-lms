// @flow
import React, { Node, useState } from 'react';
import { bemlds, generateAttachedFormData } from 'utils';
import { sharedClass } from 'utils/className';
import { UserType } from 'models';
import { CustomSelect, InputField } from 'components';
import { CONTACT_US } from 'localise';
import fileShape from 'assets/images/file_shape.png';
import { connect } from 'react-redux';
import { actionSendMessageToSupport } from 'redux/actions';
import _ from 'lodash';
import {
  Upload,
} from 'antd';
import AvatarWithName from '../AvatarWithName';

import './styles.scss';

type PropsType = {
    user: UserType
};

const block = bemlds('contact-us');
const addAttachmentBtn = sharedClass(
  block('add-attachment'),
  'btn',
  'btn--text',
);
const sendBtn = sharedClass(block('send'), 'btn');

const ContactUs = ({
  user,
  myCourses,
  sendMessage,
}: PropsType): Node => {
  const coursesOptions = Object.entries(_.get(myCourses, 'byId', {}));

  const rebuildedOptions = coursesOptions.map(item => ({
    value: item[0],
    label: item[1].title,
  }));

  const TOPICS = [
    ...rebuildedOptions,
    {
      value: 'general',
      label: 'General question',
    },
  ];

  const [
    [topic, setTopic],
    [message, setMessage],
    [files, setFiles],
    [key, setKey],
  ] = [
    useState(null),
    useState(''),
    useState([]),
    useState(0),
  ];

  const handleMessageChange = ({
    target: {
      value,
    },
  }: SyntheticInputEvent): void => setMessage(value);


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
    sendMessage(body, clearForm);
  };

  const handleChangeFile = ({ fileList }) => {
    setFiles(fileList);
  };

  const isDisabled = !message || !topic;
  return (
    <div className={block()}>
      <div className={block('header')}>
        <div className={block('title')}>{CONTACT_US.title}</div>
        <hr className={block('line')} />
        <div className={block('description')}>{CONTACT_US.description}</div>
      </div>
      <div className={block('content')}>
        <AvatarWithName
          className={block('avatar')}
          img={user.avatar}
          firstName={user.firstName}
          lastName={user.lastName}
        />
        <div className={block('topic-tip')}>{CONTACT_US.topicTip}</div>
        <CustomSelect
          instanceId="support-topic"
          className={block('topic-select')}
          options={TOPICS}
          value={topic}
          onChange={(e: SyntheticEvent): SyntheticEvent => setTopic(e)}
        />
        <InputField
          id="textarea"
          className={block('message-wrapper')}
          inputClassName={block('message')}
          type="textarea"
          title={CONTACT_US.message}
          value={message}
          onChange={handleMessageChange}
          placeholder={CONTACT_US.messagePlaceholder}
          required
        />
      </div>
      <hr className={block('line')} />
      <div className={block('bottom')}>
        <Upload
          onChange={handleChangeFile}
          beforeUpload={() => false}
          key={key}
        >
          <button type="button" className={addAttachmentBtn}>
            <img className={block('icon')} src={fileShape} alt="attach" />
            {CONTACT_US.attach}
          </button>
        </Upload>
        <button disabled={isDisabled} onClick={sendMessageToTechSupport} type="submit" className={sendBtn}>{CONTACT_US.send}</button>
      </div>
    </div>
  );
};

const mapStateToProps = ({
  myCourses,
}): object => ({
  myCourses,
});

const mapDispatchToProps = {
  sendMessage: actionSendMessageToSupport,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactUs);
