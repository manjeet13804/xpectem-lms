import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { bemlds } from 'utils';
import IntlMessages from 'components/utility/intlMessages';
import queued from 'assets/images/queued.png';
import completed from 'assets/images/completed.png';
import QueuedQuestionWrapper from './queuedQuestion.style';

const q = bemlds('queued-question');

const QueuedQuestion = (props) => {
  const {
    completedNumber,
    queuedNumber,
    handleQueuedQuestion,
    stateQueuedQuestion: {
      isQueuedQuestion,
      isCompleted,
    },
  } = props;

  const initState = {
    isQueuedQuestionLocal: false,
    isCompletedLocal: false,
  };

  const [{ isQueuedQuestionLocal, isCompletedLocal }, setActive] = useState(initState);

  if (isQueuedQuestion !== isQueuedQuestionLocal || isCompleted !== isCompletedLocal) {
    setActive({
      isQueuedQuestionLocal: isQueuedQuestion,
      isCompletedLocal: isCompleted,
    });
  }

  const handleToggle = (key) => {
    setActive(() => {
      handleQueuedQuestion({
        isQueuedQuestion: key === 'isQueuedQuestion',
        isCompleted: key === 'isCompleted',
      });
      return {
        isQueuedQuestionLocal: key === 'isQueuedQuestion',
        isCompletedLocal: key === 'isCompleted',
      };
    });
  };

  const generateItem = (
    handleClick,
    key,
    title,
    imgInfo,
    isActive,
    count,
  ) => {
    const [src, alt] = imgInfo;
    return (
      <div
        role="button"
        tabIndex={0}
        className={q('item')}
        onClick={() => handleClick(key)}
      >
        <img src={src} alt={alt} className={q('item-img')} />
        <div className={q('item-title', { active: isActive })}>
          <IntlMessages id={title} />
        </div>
        <div className={q('item-numbers')}>
          {count}
        </div>
      </div>
    );
  };

  return (
    <QueuedQuestionWrapper>
      <section className={q()}>
        <div className={q('title')}>
          <IntlMessages id="communication.queuedQuestion" />
        </div>
        <div className={q('item-wrapper')}>
          {generateItem(
            handleToggle,
            'isQueuedQuestion',
            'communication.queuedQuestion',
            [queued, 'queued'],
            isQueuedQuestionLocal,
            queuedNumber,
          )}
          {generateItem(
            handleToggle,
            'isCompleted',
            'communication.completed',
            [completed, 'completed'],
            isCompletedLocal,
            completedNumber,
          )}
        </div>
      </section>
    </QueuedQuestionWrapper>
  );
};

QueuedQuestion.defaultProps = {
  queuedNumber: null,
  completedNumber: null,
  stateQueuedQuestion: {
    isQueuedQuestion: false,
    isCompleted: false,
  },
  handleQueuedQuestion: null,
};

QueuedQuestion.propTypes = {
  queuedNumber: PropTypes.number,
  completedNumber: PropTypes.number,
  stateQueuedQuestion: PropTypes.shape({
    isQueuedQuestion: PropTypes.bool,
    isCompleted: PropTypes.bool,
  }),
  handleQueuedQuestion: PropTypes.func,
};

export default QueuedQuestion;
