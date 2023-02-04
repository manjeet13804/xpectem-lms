import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import studentsActions from 'redux/students/actions';
import communicationActions from 'redux/communication/actions';
import {
  getCurrentNavTitleFp,
  getCurrentStudentsFp,
  getCourseContentStudentsFp,
  getDialogsCommunicationFp,
  getSearchAdminsCommunicationFp,
  getSearchMessageValue,
} from 'selectors';
import { PropTypes } from 'prop-types';
import {
  AccountCard,
  DialogCommunication,
  SearchSvg,
} from 'components';
import IntlMessages from 'components/utility/intlMessages';
import LayoutContent from 'components/utility/layoutContent';
import { bemlds } from 'utils';
import {
  PLACEHOLDER,
} from 'constants/constants';
import CommunicationWrapper from './communication.style';

const { searchPlaceholder } = PLACEHOLDER;

const defaultProps = {
  idCourse: null,
  idStudent: null,
  currentStudents: null,
  courseContent: {
    course: {},
  },
  getCommunications: null,
  dialogs: [],
  addMessage: null,
  editHeaderDialog: null,
  admins: [],
  searchAdmins: null,
  reasignAdmin: null,
  currentDialogId: null,
  searchValue: '',
  abortMessage: () => null,
  setOpenedDialogId: () => null,
  setDialogCompleted: () => null,
  changeSearchMessageValue: () => null,
};

const propTypes = {
  idCourse: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  idStudent: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  currentStudents: PropTypes.arrayOf(PropTypes.object),
  courseContent: PropTypes.shape({
    course: PropTypes.shape({}),
  }),
  getCommunications: PropTypes.func,
  dialogs: PropTypes.arrayOf(PropTypes.object),
  addMessage: PropTypes.func,
  editHeaderDialog: PropTypes.func,
  admins: PropTypes.arrayOf(PropTypes.object),
  searchAdmins: PropTypes.func,
  reasignAdmin: PropTypes.func,
  currentDialogId: PropTypes.number,
  abortMessage: PropTypes.func,
  setOpenedDialogId: PropTypes.func,
  setDialogCompleted: PropTypes.func,
  searchValue: PropTypes.string,
  changeSearchMessageValue: PropTypes.func,
};

const title = bemlds('title');
const b = bemlds('communication');

class Communication extends PureComponent {
  debouncedSearch = _.debounce((search) => {
    const {
      getCommunications,
      idStudent,
      idCourse,
    } = this.props;
    getCommunications(idStudent, idCourse, search);
  }, 500);

  componentWillMount() {
    const {
      getCommunications,
      idStudent,
      idCourse,
      searchAdmins,
      searchValue,
    } = this.props;

    getCommunications(idStudent, idCourse, searchValue);
    searchAdmins();
  }

  componentDidUpdate(prevProps) {
    const { searchValue: prevSearchValue } = prevProps;
    const {
      searchValue,
    } = this.props;
    if (prevSearchValue !== searchValue) {
      this.debouncedSearch(searchValue);
    }
  }

  componentWillUnmount() {
    const { setOpenedDialogId } = this.props;
    setOpenedDialogId(null);
  }

  handleAbortMessage = (dialogId) => {
    const {
      abortMessage,
      idStudent,
      idCourse,
    } = this.props;

    abortMessage(idStudent, idCourse, dialogId);
  }

  handleChangeSearchValue = (e) => {
    const { target: { value } } = e;
    const { changeSearchMessageValue } = this.props;

    changeSearchMessageValue(value);
  }

  handleAddMessageCommunication = ({
    dialogId, textarea, fileList, isComplete,
  }) => {
    const {
      addMessage,
      idStudent,
      idCourse,
    } = this.props;

    const generateAttachedFormData = (formData, files) => {
      files.forEach((file) => {
        formData.append('attachment', file);
      });
    };

    const files = fileList.map(({ originFileObj }) => originFileObj);

    const formData = new FormData();

    if (textarea) {
      formData.append('message', textarea);
    }
    formData.append('closeDialog', isComplete);
    files && generateAttachedFormData(formData, files);
    addMessage(idStudent, idCourse, dialogId, formData, isComplete);
  };

  handleEditHeaderDialog = (dialogId, heading) => {
    const {
      idStudent,
      idCourse,
      editHeaderDialog,
    } = this.props;

    editHeaderDialog(idStudent, idCourse, dialogId, { heading });
  };

  handleReasignAdmin = (dialogId, idAdmin) => {
    const {
      idStudent,
      idCourse,
      reasignAdmin,
    } = this.props;

    reasignAdmin(
      {
        studentId: idStudent,
        courseId: idCourse,
        tutorId: idAdmin,
      },
      dialogId,
    );
  };

  render() {
    const {
      idCourse,
      currentStudents,
      courseContent,
      dialogs,
      admins,
      currentDialogId,
      setDialogCompleted,
      userId,
      deleteLastMessage,
      deleteDialog,
      searchValue,
    } = this.props;

    const {
      course: {
        title: titleCourse,
      } = {},
    } = courseContent;

    const rebuildedDialogs = dialogs.length ? dialogs.map(item => ({
      ...item,
      previousOpen: item.id === currentDialogId,
    })) : [];

    return (
      <LayoutContent>
        <CommunicationWrapper>
          <section className={title()}>
            <IntlMessages id="students.communicationsTitle" />
            {titleCourse}
          </section>
          <div className={b('search')}>
            <SearchSvg />
            <input
              type="text"
              className={b('input')}
              value={searchValue}
              placeholder={searchPlaceholder}
              onChange={this.handleChangeSearchValue}
            />
          </div>
          <section className={b()}>
            <section className={b('left')}>
              {rebuildedDialogs.map(item => (
                <DialogCommunication
                  key={item.id}
                  dialog={item}
                  currentStudents={currentStudents}
                  addMessage={this.handleAddMessageCommunication}
                  editHeaderDialog={this.handleEditHeaderDialog}
                  abortMessage={this.handleAbortMessage}
                  admins={admins}
                  reasignAdmin={this.handleReasignAdmin}
                  previousOpen={item.previousOpen}
                  setDialogCompleted={setDialogCompleted}
                  userId={userId}
                  deleteLastMessage={deleteLastMessage}
                  deleteDialog={deleteDialog}
                />
              ))}
            </section>
            <section className={b('right')}>
              <AccountCard
                currentStudents={currentStudents}
                courseContent={courseContent}
                idCourse={idCourse}
              />
            </section>
          </section>
        </CommunicationWrapper>
      </LayoutContent>
    );
  }
}

const mapStateToProps = (state) => {
  const isCurrentNav = getCurrentNavTitleFp(state);
  const currentStudents = getCurrentStudentsFp(state);
  const courseContent = getCourseContentStudentsFp(state);
  const dialogs = getDialogsCommunicationFp(state);
  const admins = getSearchAdminsCommunicationFp(state);
  const searchValue = getSearchMessageValue(state);
  const currentDialogId = _.get(state, 'communication.openedDialogId');
  const { user: { user: { id: userId } } } = state;

  return {
    isCurrentNav,
    currentStudents,
    courseContent,
    dialogs,
    admins,
    currentDialogId,
    userId,
    searchValue,
  };
};

Communication.propTypes = propTypes;
Communication.defaultProps = defaultProps;

export default connect(
  mapStateToProps,
  {
    ...studentsActions,
    ...communicationActions,
  },
)(Communication);
