import React, { useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { bemlds } from 'utils';
import moment from 'moment';
import { Modal, Radio } from 'antd';
import studentsActions from 'redux/students/actions';
import { 
  AddSvg, 
  TrashIcon, 
  EditSvg, 
  ReactDatePicker, 
  DateSvg 
} from 'components';
import IntlMessages from 'components/utility/intlMessages';
import { DATE_FORMATS, studentAssignmentLogStatus } from 'constants/constants';
import ItemAssignmentWrapper from './itemAssignment.style';

const { yearMonthDay } = DATE_FORMATS;
const b = bemlds('item-assignment');

const ItemAssignment = ({
  assignment,
  courseTopicId,
  changeAssigmentStatus,
  student,
  addAssignmentStudentLog,
  deleteAssignmentStudentLogById,
}) => {
  const { 
    name, 
    studentLogs,
    maxTries,
    id: assignId, 
  } = assignment;

  const [deleteModal, setDeleteModal] = useState({ isOpen: false });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [modal, setModal] = useState({ isOpen: false });

  const handleSave = () => {
    if (modal.studLogId === undefined) {
      addAssignmentStudentLog({
        studentId: student.id,
        assignmentId: assignId,
        status: modal.status,
        completedAt: modal.completedAt,
        courseTopicId,
      });
      handleCloseModal();
      return;
    }

    changeAssigmentStatus({
      courseTopicId,
      assignId,
      value: modal.status,
      studLogId: modal.studLogId,
      completedAt: moment(modal.completedAt).format(yearMonthDay),
    });
    handleCloseModal();
  };

  const handleOpenModal = ({ 
    studLogId, 
    status, 
    completedAt, 
    assignId,
  }) => {
    setModal({ 
      studLogId, 
      status, 
      assignId,
      isOpen: true, 
      completedAt: moment(completedAt).toDate(), 
    });
  };

  const handleCloseModal = () => {
    setModal({ isOpen: false });
  };
  const handleOpenDeleteModal = (studLogId) => {
    setDeleteModal({ isOpen: true, studLogId });
  };

  const handleCloseDeleteModal = () => {
    setDeleteModal({ isOpen: false });
  };

  const handleDeleteStudentLog = () => {
    const studLogId = deleteModal.studLogId;
    deleteAssignmentStudentLogById({ 
      courseTopicId, 
      studLogId,
      assignmentId: assignId, 
    });
    handleCloseDeleteModal();
  };

  const handleClickDateSvg = () => setShowDatePicker((prev) => !prev)

  const handleChangeRadio = ({ target: { value } }) => setModal((prev) => ({ ...prev, status: value }))

  const saveDate = (date) => {
    setModal((prev) => ({ ...prev, completedAt: date }));
  };

  const isAddStudentLog = useMemo(() => (studentLogs || []).length < maxTries, [studentLogs, maxTries]);

  return (
    <ItemAssignmentWrapper>
      <div className={b()}>
        {name && (
          <div className={b('row')}>
            <h3 className={b('title')}>{name} </h3>

            {isAddStudentLog && <div
              className={b('add-icon')}
              onClick={() => handleOpenModal({ 
                courseTopicId, 
                assignId, 
                status: studentAssignmentLogStatus.failed
              })}
            >
              <AddSvg />
            </div>}
          </div>
        )}

        {studentLogs &&
          studentLogs.map(({ id: studLogId, status, completedAt }) => (
            <div key={studLogId} className={b('row')}>
              <Radio.Group value={status} disabled>
                <Radio value={studentAssignmentLogStatus.completed}>
                  <IntlMessages id='students.completed' />
                </Radio>
                <Radio value={studentAssignmentLogStatus.failed}>
                  <IntlMessages id='students.failed' />
                </Radio>
              </Radio.Group>

              {completedAt && <div className={b('title')}>{moment(completedAt).format(yearMonthDay)}</div>}

              <EditSvg
                className={b('edit-icon')}
                type='button'
                onClick={() => handleOpenModal({ studLogId, status, completedAt })}
              />

              <TrashIcon className={b('trash-icon')} type='button' onClick={() => handleOpenDeleteModal(studLogId)} />
            </div>
          ))}

        {modal.isOpen && (
          <Modal centered visible={modal.isOpen} title={name} onCancel={handleCloseModal} onOk={handleSave}>
            <ItemAssignmentWrapper>
              <div className={b()}>
                <div className={b('row')}>
                  <Radio.Group
                    onChange={handleChangeRadio}
                    value={modal.status}
                  >
                    <Radio value={studentAssignmentLogStatus.completed}>
                      <IntlMessages id='students.completed' />
                    </Radio>
                    <Radio value={studentAssignmentLogStatus.failed}>
                      <IntlMessages id='students.failed' />
                    </Radio>
                  </Radio.Group>

                  <span className={b('date')}>{moment(modal.completedAt).format(yearMonthDay)}</span>

                  <DateSvg type='button' onClick={handleClickDateSvg} />

                  {showDatePicker && (
                    <ReactDatePicker
                      className={b('date-picker')}
                      close={() => setShowDatePicker(false)}
                      value={modal.completedAt}
                      saveDate={saveDate}
                      maxDate={moment().toDate()}
                      headerType='start'
                    />
                  )}
                </div>
              </div>
            </ItemAssignmentWrapper>
          </Modal>
        )}

        {deleteModal.isOpen && (
          <Modal centered visible={deleteModal.isOpen} onCancel={handleCloseDeleteModal} onOk={handleDeleteStudentLog}>
            <IntlMessages id='notes.deleteLog' />
          </Modal>
        )}
      </div>
    </ItemAssignmentWrapper>
  );
};

export default connect((state) => ({ student: state.students.currentStudents[0] }), {
  ...studentsActions,
})(ItemAssignment);
