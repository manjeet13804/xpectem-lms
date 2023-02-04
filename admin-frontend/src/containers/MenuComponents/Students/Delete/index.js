import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import studentsActions from 'redux/students/actions';
import {
  getCurrentStudentsFp,
  getCurrentStudentIdFp,
} from 'selectors';
import URLS from 'redux/urls';
import LayoutContent from 'components/utility/layoutContent';
import { PLACEHOLDER } from 'constants/constants';
import { REGEXP } from 'constants/regexp';
import IntlMessages from 'components/utility/intlMessages';
import {
  Banner,
  DeleteAttentionSvg,
  DefaultButton,
} from 'components';
import { bemlds } from 'utils';
import StudentDeleteWrapper from './studentDelete.style';

const { confirmDelete } = PLACEHOLDER;
const { getDeleteId } = REGEXP;

const b = bemlds('delete-block');
const btn = bemlds('button');

const deleteConfirm = (string) => string.trim().toLowerCase() !== 'delete';

const urlToConfirmDelete = id => `${URLS.studentsInfoDeleteUrl}/${id}/confirm`;

class StudentDelete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
    };
  }

  inputChange = ({ target: { value } }) => {
    this.setState({ inputValue: value });
  };

  clickCancel = () => {
    const { history, studentId } = this.props;
    if (studentId)  { history.push(`${URLS.studentsInfoUrl}/${studentId}`); }
  };

  componentWillMount() {
    const { getCurrentStudentById, studentId } = this.props;
    getCurrentStudentById(studentId);
  }

  render() {
    const { inputValue } = this.state;

    const {
      currentStudents,
      studentId,
      deleteStudent,
    } = this.props;

    if (!currentStudents.length) return null;

    const [currentStudent] = currentStudents || [];

    const {
      firstName,
      lastName,
    } = currentStudent;

    return (
      <LayoutContent>
        <StudentDeleteWrapper>
          <Banner title={<IntlMessages id="students.deleteBanner" />} />
          <section className={b()}>
            <DeleteAttentionSvg />
            <section className={b('text')}>
              <div className={b('text-title')}>
                <IntlMessages id="students.deleteTitle" />
              </div>
              <div className={b('text-message')}>
                <IntlMessages id="students.deleteAttention" />
                {firstName} {lastName}
              </div>
              <div className={b('text-confirm')}>
                <IntlMessages id="groupAdmin.deleteConfirm" />
              </div>
              <input
                className={b('text-input')}
                type="text"
                value={inputValue}
                placeholder={confirmDelete}
                onChange={this.inputChange}
              />
              <section className={btn()}>
                <Link
                  className={btn('link', {'disabled-link': deleteConfirm(inputValue)})}
                  to={urlToConfirmDelete(studentId)}
                >
                  <DefaultButton
                    textId="groups.deleteBtn"
                    onClick={() => deleteStudent(studentId)}
                    disabled={deleteConfirm(inputValue)}
                    isDelete
                  />
                </Link>
                <DefaultButton
                  textId="groups.cancelBtn"
                  onClick={() => this.clickCancel()}
                />
              </section>
            </section>
          </section>
        </StudentDeleteWrapper>
      </LayoutContent>
    );
  }
}

const mapStateToProps = (state) => {
  const { router: { location } } = state;

  const currentStudents = getCurrentStudentsFp(state);
  const currentStudentId = getCurrentStudentIdFp(state);

  const { pathname } = location;
  const res = pathname && pathname.match(getDeleteId);
  const studentId = currentStudentId || res[1];

  return {
    currentStudents,
    studentId,
  };
};

export default connect(
  mapStateToProps,
  {
    ...studentsActions,
  },
)(StudentDelete);
