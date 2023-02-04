import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import {
  DATE_FORMATS,
  PLACEHOLDER,
} from 'constants/constants';
import {
  SearchBlock,
} from 'components';
import { bemlds } from 'utils';
import IntlMessages from 'components/utility/intlMessages';
import DialogItemWrapper from './dialogItem.style';

const { communicationSearchBlock } = PLACEHOLDER;
const { dayMonth } = DATE_FORMATS;
const di = bemlds('dialog-item');

const DialogItem = (props) => {
  const {
    createdAt,
    title,
    message,
    userAvatar,
    isUser,
    author: {
      firstName,
      lastName,
      avatar,
    },
    searchTutor,
    searchTopic,
    reasignQuestion,
    moveQuestionTopic,
    addNewTopic,
  } = props;

  const currentDate = moment(createdAt).format(dayMonth);

  return (
    <DialogItemWrapper>
      <section className={di()}>
        <div className={di('images-info')}>
          <div className={di('images-wrap')}>
            <img
              src={userAvatar}
              alt="avatar"
              className={di('img')}
            />
            <div className={di('name')}>
              {`${firstName} ${lastName}`}
            </div>
          </div>
          <div className={di('images-wrap')}>
            <div className={di('date')}>
              {currentDate}
            </div>
            <img
              src={avatar}
              alt="avatar"
              className={di('img')}
            />
          </div>
        </div>
        <div className={di('content')}>
          <div className={di('title')}>
            {title}
          </div>
          <div className={di('message')}>
            {message}
          </div>
        </div>
        {isUser && (
        <div className={di('search-wrap')}>
          <SearchBlock
            title={<IntlMessages id="communication.reasignQuestion" />}
            handleSearchBlock={searchTutor}
            placeholder={communicationSearchBlock}
            onClick={reasignQuestion}
          />
          <SearchBlock
            title={<IntlMessages id="communication.moveQuestion" />}
            handleSearchBlock={searchTopic}
            onClick={moveQuestionTopic}
            handleTopic={addNewTopic}
            placeholder={communicationSearchBlock}
          />
        </div>
        )}
      </section>
    </DialogItemWrapper>
  );
};

DialogItem.defaultProps = {
  isUser: false,
  createdAt: '',
  userAvatar: '',
  avatar: '',
  title: '',
  message: '',
  author: {
    firstName: '',
    lastName: '',
    avatar: '',
  },
};

DialogItem.propTypes = {
  isUser: PropTypes.bool,
  createdAt: PropTypes.string,
  userAvatar: PropTypes.string,
  avatar: PropTypes.string,
  title: PropTypes.string,
  message: PropTypes.string,
  author: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    avatar: PropTypes.string,
  }),
  searchTutor: PropTypes.func.isRequired,
  searchTopic: PropTypes.func.isRequired,
  reasignQuestion: PropTypes.func.isRequired,
  moveQuestionTopic: PropTypes.func.isRequired,
  addNewTopic: PropTypes.func.isRequired,
};

export default DialogItem;
