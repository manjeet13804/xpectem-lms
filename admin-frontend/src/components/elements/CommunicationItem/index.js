import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { DATE_FORMATS } from 'constants/constants';
import { bemlds } from 'utils';
import { Avatar } from 'antd';
import CommunicationItemWrapper from './communicationItem.style';

const ci = bemlds('communication-item');
const { dayMonth } = DATE_FORMATS;

const CommunicationItem = (props) => {
  const {
    id: dialogId,
    heading,
    course: {
      id: courseId,
      title,
    },
    author: {
      firstName,
      lastName,
      avatar,
      id: studentId,
    },
    accepter,
    lastAnswerAdmin,
    createdAt,
    handleReadMessage,
    communicationMessage,
  } = props;

  const isNewMessage = () => communicationMessage.some(item => !item.isAdminChecked);
  const currentDate = moment(createdAt).format(dayMonth);

  return (
    <CommunicationItemWrapper>
      <section className={ci()}>
        <div className={ci('wrapper-left')}>
          <div className={ci('header-wrapper')}>
            <div className={ci('student-name')}>
              {`${firstName} ${lastName}`}
            </div>
            <div className={ci('student-name')}>
              {title}
            </div>
          </div>
          <button
            className={ci('title')}
            type="button"
            onClick={() => handleReadMessage(studentId, courseId, dialogId)}
          >
            {isNewMessage() && <div className={ci('circle')} />}
            <span className={ci('title-text')}>{heading}</span>
          </button>
          <div className={ci('assigned')}>
            {accepter && `Dialog assigned to: ${accepter.firstName} ${accepter.lastName}`}
          </div>
        </div>
        <div className={ci('wrapper-right')}>
          <div className={ci('avatar-and-date')}>
            <div className={ci('date')}>
              {currentDate}
            </div>
            <div className={ci('img-wrap')}>
              <Avatar
                size={40}
                icon="user"
                src={avatar}
              />
            </div>
          </div>
          <div className={ci('last-answer')}>
            <span>{lastAnswerAdmin && `Last answer from: ${lastAnswerAdmin.firstName} ${lastAnswerAdmin.lastName}`}</span>
          </div>
        </div>
      </section>
    </CommunicationItemWrapper>
  );
};
CommunicationItem.defaultProps = {
  id: null,
  author: {
    id: '',
    firstName: '',
    lastName: '',
    avatar: '',
  },
  createdAt: '',
  communicationDialog: {
    heading: '',
  },
  handleReadMessage: () => null,
  isChecked: false,
  isAdminChecked: false,
  communicationMessage: [],
};

CommunicationItem.propTypes = {
  id: PropTypes.number,
  author: PropTypes.shape({
    id: PropTypes.number,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    avatar: PropTypes.string,
  }),
  communicationDialog: PropTypes.shape({
    heading: PropTypes.string,
    id: PropTypes.number,
    communication: {
      course: PropTypes.shape({
        id: PropTypes.number,
      }),
    },
  }),
  createdAt: PropTypes.string,
  handleReadMessage: PropTypes.func,
  communicationMessage: PropTypes.shape({
    createdAt: PropTypes.string,
    id: PropTypes.number,
    isChecked: PropTypes.bool,
    isAdminChecked: PropTypes.bool,
    message: PropTypes.string,
    updatedAt: PropTypes.string,
  }),
};

export default CommunicationItem;
