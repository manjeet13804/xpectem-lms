import React, { useState } from 'react';
import moment from 'moment';
import { bemlds, getTypePassed } from 'utils';
import { Modal } from 'antd';
import { ReactDatePicker, DateSvg } from 'components';
import IntlMessages from 'components/utility/intlMessages';
import { DATE_FORMATS, TYPE_PASSED } from 'constants/constants';
import ItemExamModalWrapper from './itemExam.style';

const { yearMonthDay } = DATE_FORMATS;
const b = bemlds('item-exam-modal');

const ItemExamModal = ({ exam, courseTopicId, modal, setModal, saveExamAnswer }) => {
  const [completedAt, setCompletedAt] = useState(moment(modal.completedAt).toDate());
  const [points, setPoints] = useState(modal.points || 0);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { maxPoints, gradeA, gradeC, name } = exam;

  const handleCloseModal = () => {
    setModal({ isOpen: false });
  };

  const handleChangeModalPoints = ({ target: { value } }) => {
    const valueNumber = Number(value);
    const isValidValue = !isNaN(valueNumber) && valueNumber <= maxPoints;

    if (isValidValue) {
      setPoints(Number(value));
    }
  };

  const handleSave = () => {
    saveExamAnswer({ courseTopicId, points, completedAt, studLogId: modal.studLogId });
    handleCloseModal();
  };

  const saveDate = (date) => {
    setCompletedAt(date);
  };

  return (
    <Modal centered visible={modal.isOpen} title={name} onCancel={handleCloseModal} onOk={handleSave}>
      <ItemExamModalWrapper>
        <div className={b()}>
          <div className={b('row')}>
            <div className={b('input')}>
              <IntlMessages id='notes.examScore' />
              <p>{maxPoints}</p>
            </div>
            <div className={b('input')}>
              <IntlMessages id='notes.passScore' />
              <p>{gradeC}</p>
            </div>
            <div className={b('input')}>
              <IntlMessages id='notes.passDestinction' />
              <p>{gradeA}</p>
            </div>
          </div>

          <div className={b('row')}>
            <input
              className={b('input-number', {
                failed: getTypePassed(gradeA, gradeC, points) === TYPE_PASSED.failed,
                'passed-distinction': getTypePassed(gradeA, gradeC, points) === TYPE_PASSED.passedDistinction,
              })}
              type='text'
              value={points}
              name='points'
              onChange={(e) => handleChangeModalPoints(e)}
            />
            <div className={b('type-passed')}>{getTypePassed(gradeA, gradeC, points)}</div>

            <span className={b('date')}>{moment(completedAt).format(yearMonthDay)}</span>

            <DateSvg type='button' onClick={() => setShowDatePicker((prev) => !prev)} />

            {showDatePicker && (
              <ReactDatePicker
                className={b('date-picker')}
                close={() => setShowDatePicker(false)}
                value={completedAt}
                saveDate={saveDate}
                maxDate={new Date()}
                headerType='start'
              />
            )}
          </div>
        </div>
      </ItemExamModalWrapper>
    </Modal>
  );
};

export default ItemExamModal;
