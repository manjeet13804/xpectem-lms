import { Modal } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import studentsActions from 'redux/students/actions';
import { Loader } from 'semantic-ui-react';
import {
  DefaultButton,
} from 'components';
import { PropTypes } from 'prop-types';
import { bemlds } from 'utils';
import IntlMessages from 'components/utility/intlMessages';
import './styles.scss';

const b = bemlds('existing-students-modal');

const defaultProps = {
  isNeedToUpdateStudents: false,
  studentsToUpdate: [],
  addExistingStudentsStart: false,
  successAddExistingStudents: false,
  addExistingStudentsError: '',
  addExistingStudentsToCourses: () => null,
  closeModalExistingStudents: () => null,
};

const propTypes = {
  isNeedToUpdateStudents: PropTypes.bool,
  studentsToUpdate: PropTypes.arrayOf(
    PropTypes.shape({
      email: PropTypes.string,
    }),
  ),
  addExistingStudentsStart: PropTypes.bool,
  successAddExistingStudents: PropTypes.bool,
  addExistingStudentsError: PropTypes.string,
  addExistingStudentsToCourses: PropTypes.func,
  closeModalExistingStudents: PropTypes.func,
};

const AddExistingStudentsModal = ({
  isNeedToUpdateStudents,
  studentsToUpdate,
  addExistingStudentsStart,
  successAddExistingStudents,
  addExistingStudentsError,
  addExistingStudentsToCourses,
  closeModalExistingStudents,
}) => {
  const generateForm = () => {
    if (addExistingStudentsError) {
      return (
        <div>
          <p className={b('success-title')}><IntlMessages id="existingStudents.error" /></p>
          <div className={b('footer')}>
            <DefaultButton
              textId="uiElements.popover.close"
              onClick={closeModalExistingStudents}
            />
          </div>
        </div>
      );
    }

    if (successAddExistingStudents) {
      return (
        <div>
          <p className={b('success-title')}><IntlMessages id="existingStudents.updated" /></p>
          <div className={b('footer')}>
            <DefaultButton
              textId="uiElements.popover.close"
              onClick={closeModalExistingStudents}
            />
          </div>
        </div>
      );
    }
    return (
      <div>
        <p className={b('emails-title')}>
          <IntlMessages
            id="existingStudents.studentWithEmailsExists"
          />
        </p>
        <div className={b('emails-list')}>
          {studentsToUpdate.map(item => (
            <div className={b('student-email-row')} key={item.email}>
              {`- ${item.email}`}
            </div>
          ))}
        </div>
        <p className={b('emails-title')}><IntlMessages id="existingStudents.wantAdd" /></p>
        <div className={b('footer')}>
          <DefaultButton
            textId="students.certModalYes"
            onClick={addExistingStudentsToCourses}
          />
          <DefaultButton
            textId="students.certModalNo"
            onClick={closeModalExistingStudents}
            isDelete
          />
        </div>
      </div>
    );
  };
  return (
    <Modal
      visible={isNeedToUpdateStudents}
      onCancel={closeModalExistingStudents}
      footer={null}
      centered
    >
      <div className={b({ loading: addExistingStudentsStart })}>
        {generateForm()}
      </div>
      <Loader
        active={addExistingStudentsStart}
      />
    </Modal>
  );
};

AddExistingStudentsModal.propTypes = propTypes;
AddExistingStudentsModal.defaultProps = defaultProps;

const mapStateToProps = ({
  students: {
    isNeedToUpdateStudents,
    studentsToUpdate,
    addExistingStudentsStart,
    successAddExistingStudents,
    addExistingStudentsError,
  },
}) => ({
  isNeedToUpdateStudents,
  studentsToUpdate,
  addExistingStudentsStart,
  successAddExistingStudents,
  addExistingStudentsError,
});

export default connect(
  mapStateToProps,
  {
    ...studentsActions,
  },
)(AddExistingStudentsModal);
