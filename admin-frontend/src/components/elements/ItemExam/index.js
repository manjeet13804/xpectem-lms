import React, { useMemo, useState } from 'react';
import moment from 'moment';
import { Modal } from 'antd';
import { connect } from 'react-redux';
import studentsActions from 'redux/students/actions';
import { bemlds, getTypePassed } from 'utils';
import { 
  DATE_FORMATS, 
  TYPE_PASSED, 
  EXAM_FIELDS,
} from 'constants/constants';
import { 
  AddSvg, 
  TrashIcon, 
  EditSvg,
} from 'components';
import IntlMessages from 'components/utility/intlMessages';
import ItemExamWrapper from './itemExam.style';
import ItemExamModal from '../ItemExamModal';

const { yearMonthDay } = DATE_FORMATS;
const b = bemlds('item-exam');

const ItemExam = ({
  exam,
  student,
  courseTopicId,
  changeExamStudentLogPoints,
  deleteStudentLogById,
  addExamStudentLog,
}) => {
  const { 
    id: examId, 
    maxPoints, 
    gradeA, 
    gradeC, 
    name, 
    studentLogs, 
    maxTries 
  } = exam;

  const [modal, setModal] = useState({ isOpen: false });
  const [deleteModal, setDeleteModal] = useState({ isOpen: false });

  const handleOpenModal = ({ 
    studLogId, 
    points, 
    completedAt,
   }) => {
    setModal({ 
      isOpen: true, 
      studLogId, 
      points, 
      completedAt, 
    });
  };

  const handleOpenDeleteModal = (studLogId) => {
    setDeleteModal({ isOpen: true, studLogId });
  };

  const handleCloseDeleteModal = () => {
    setDeleteModal({ isOpen: false });
  };

  const onChangeStudentLogPoint = (
    { target: { value, name } }, 
    courseTopicId, 
    examId, 
    studLogId,
    ) => {
    changeExamStudentLogPoints({
      value,
      name,
      courseTopicId,
      examId,
      studLogId,
    });
  };

  const saveExamAnswer = ({ 
    courseTopicId, 
    points, 
    completedAt, 
    studLogId,
  }) => {
    if (studLogId === undefined) {
      addExamStudentLog({ 
        studentId: student.id, 
        examId, 
        points, 
        completedAt, 
        courseTopicId 
      });
      return;
    }

    changeExamStudentLogPoints({
      value: points,
      name: 'points',
      courseTopicId,
      examId,
      studLogId,
    });
    changeExamStudentLogPoints({
      value: completedAt,
      name: 'completedAt',
      courseTopicId,
      examId,
      studLogId,
    });
  };

  const handleDeleteStudentLog = () => {
    const studLogId = deleteModal.studLogId;
    deleteStudentLogById({
      courseTopicId,
      examId,
      studLogId,
    });
    handleCloseDeleteModal();
  };

  const isAddStudentLog = useMemo(() => (studentLogs || []).length < maxTries, [studentLogs, maxTries]);

  return (
    <ItemExamWrapper>
      <div className={b()}>
        {name && <div className={b('title')}>{name}</div>}
        <div className={b('row')}>
          <div className={b('input')}>
            <IntlMessages id='notes.examScore' />
            <input disabled className={b('input-number')} type='text' value={maxPoints} name={EXAM_FIELDS.maxPoints} />
          </div>
          <div className={b('input')}>
            <IntlMessages id='notes.passScore' />
            <input disabled className={b('input-number')} type='text' value={gradeC} name='gradeC' />
          </div>
          <div className={b('input')}>
            <IntlMessages id='notes.passDestinction' />
            <input disabled className={b('input-number')} type='text' value={gradeA} name='gradeA' />
          </div>

          {isAddStudentLog && (
            <div className={b('add-icon')} onClick={() => handleOpenModal({ courseTopicId, examId })}>
              <AddSvg />
            </div>
          )}
        </div>

        <div className={b('column')}>
          {studentLogs &&
            studentLogs.map(({ id: studLogId, points, completedAt }) => (
              <div key={studLogId} className={b('row')}>
                <input
                  className={b('input-number', {
                    failed: getTypePassed(gradeA, gradeC, points) === TYPE_PASSED.failed,
                    'passed-distinction': getTypePassed(gradeA, gradeC, points) === TYPE_PASSED.passedDistinction,
                    passed: getTypePassed(gradeA, gradeC, points) === TYPE_PASSED.passed,
                  })}
                  type='text'
                  value={points}
                  name='points'
                  onChange={(e) => onChangeStudentLogPoint(e, courseTopicId, examId, studLogId)}
                  disabled
                />
                <div className={b('type-passed')}>{getTypePassed(gradeA, gradeC, points)}</div>
                <input
                  className={b('input-date')}
                  type='text'
                  value={moment(completedAt).format(yearMonthDay)}
                  name='passScore'
                  disabled
                />

                <EditSvg
                  className={b('edit-icon')}
                  type='button'
                  onClick={() => handleOpenModal({ studLogId, points, completedAt })}
                />

                <TrashIcon className={b('trash-icon')} type='button' onClick={() => handleOpenDeleteModal(studLogId)} />
              </div>
            ))}
        </div>
      </div>

      {modal.isOpen && (
        <ItemExamModal
          exam={exam}
          courseTopicId={courseTopicId}
          modal={modal}
          setModal={setModal}
          saveExamAnswer={saveExamAnswer}
        />
      )}

      {deleteModal.isOpen && (
        <Modal centered visible={deleteModal.isOpen} onCancel={handleCloseDeleteModal} onOk={handleDeleteStudentLog}>
          <IntlMessages id='notes.deleteLog' />
        </Modal>
      )}
    </ItemExamWrapper>
  );
};

export default connect((state) => ({ student: state.students.currentStudents[0] }), {
  ...studentsActions,
})(ItemExam);
