import React from 'react';
import { bemlds } from 'utils';
import IntlMessages from 'components/utility/intlMessages';
import QADeleteCardWrapper from './qaDeleteCard.style';

const modal = bemlds('modal');

const QADeleteCard = (props) => {
  const {
    text,
    closeModal,
    deleteQA,
    currentQuestionId,
    faqType,
  } = props;

  return (
    <QADeleteCardWrapper>
      <div className={modal()}>
        <div className={modal('title')}>
          <IntlMessages id={text} />
        </div>
        <div className={modal('actions')}>
          <button
            onClick={() => {
              deleteQA(currentQuestionId, faqType);
              closeModal();
            }}
            className={modal('button', { red: true })}
          >
            <IntlMessages id="students.qaButtonDelete" />
          </button>
          <button
            onClick={closeModal}
            className={modal('button')}
          >
            <IntlMessages id="students.qaButtonCancel" />
          </button>
        </div>
      </div>
    </QADeleteCardWrapper>
  );
};

export default QADeleteCard;
