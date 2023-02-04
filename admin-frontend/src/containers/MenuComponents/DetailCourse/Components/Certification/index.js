import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import studentsActions from 'redux/students/actions';
import {
  getCurrentNavTitleFp,
  getCurrentDetailCourseIdFp,
  getCourseContentStudentsFp,
  getCertificationFp,
  getCertificationLogsFp,
} from 'selectors';
import URLS from 'redux/urls';
import LayoutContent from 'components/utility/layoutContent';
import IntlMessages from 'components/utility/intlMessages';
import { bemlds } from 'utils';
import {
  CertificationList,
  Checkbox,
  CustomTextInput,
  DefaultButton,
  DateStartEnd,
} from 'components';
import { PLACEHOLDER, DATE_FORMATS } from 'constants/constants';
import moment from 'moment';
import { Radio } from 'antd';
import _ from 'lodash';
import FailedIcon from './components/FailedIcon';
import PassedIcon from './components/PassedIcon';
import DeleteIcon from './components/DeleteIcon';
import CertificationWrapper from './certification.style';


const b = bemlds('certification');
const form = bemlds('form');
const logs = bemlds('logs');

const dateToString = date => (date ? moment(date).format(DATE_FORMATS.yearMonthDay) : date);
class Certification extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
      isPassed: null,
      results: '',
      sendNotifications: false,
    };
  }

  componentWillMount() {
    const {
      getCertification,
      idStudent,
      idCourse,
      currentDetailCourseId,
      history,
    } = this.props;

    if (!currentDetailCourseId) {
      history.push(`${URLS.communicationChoose}`);
    } else {
      getCertification(idStudent, idCourse);
    }
  }

  componentDidMount() {
    const { idCourse, idStudent, getCertificationExamLog } = this.props;
    getCertificationExamLog({
      courseId: idCourse, studentId: idStudent,
    });
  }

  reserve = (certificate) => {
    const { reserveCertificate, student, courseContent } = this.props;
    const { course: { id: courseId } } = courseContent;
    const { id } = certificate;
    const { id: studentId } = student;
    reserveCertificate(studentId, courseId, id);
  };

  cancel = () => {
    const { cancelReserveCertificate, courseContent, student } = this.props;
    const { course: { id } } = courseContent;
    const { id: studentId } = student;
    cancelReserveCertificate(studentId, id);
  };

  handleSave = () => {
    const {
      date,
      isPassed,
      results,
      sendNotifications,
    } = this.state;

    const {
      idCourse,
      idStudent,
      setCertificationExamLog
    } = this.props;

    setCertificationExamLog({
      date,
      isPassed,
      results,
      sendNotifications,
      courseId: idCourse,
      studentId: idStudent,
    });
  }

  handleDelete = (id) => {
    const { deleteCertificationExamLog } = this.props;
    deleteCertificationExamLog(id);
  }

  isInvalid = ({ isPassed, date }) => _.isNil(isPassed) || _.isNil(date)

  render() {
    const {
      courseContent,
      certification,
      certificationLogs,
      student,
    } = this.props;

    const { dateTitle, resultsTitle } = PLACEHOLDER;

    const {
      date,
      isPassed,
      results,
      sendNotifications,
    } = this.state;

    const { course: { title } = {} } = courseContent;

    return (
      <LayoutContent>
        <CertificationWrapper>
          <section className={b()}>
            {title && (
              <div className={b('title')}>
                <IntlMessages id="students.certTitle" />
                {title}
              </div>
            )}
            <div className={b('text')}>
              <div className={b('text-item')}>
                <IntlMessages id="students.certTextFirst" />
              </div>
              <div className={b('text-item')}>
                <IntlMessages id="students.certTextSecond" />
              </div>
              <div className={b('text-item')}>
                <IntlMessages id="students.certTextThird" />
              </div>
            </div>
            <div className={b('list')}>
              <CertificationList
                certifications={certification}
                cancelReserve={this.cancel}
                reserve={this.reserve}
              />
            </div>
            <div className={form()}>
              <div className={form('title')}>
                <span>
                  <IntlMessages id="students.certFormTitle" />
                  {title}
                </span>
              </div>
              <div className={form('info')}>
                <span>
                  <IntlMessages id="students.certFormStydent" />
                  {student.firstName} {student.lastName}
                </span>
              </div>
              <div className={form('row')}>
                <div className={form('row-title')}>
                  <IntlMessages id="students.certDateTitle" />
                </div>
                <DateStartEnd
                  placeholder={dateTitle}
                  handleSaveDate={(id, value) => this.setState({ date: dateToString(value) })}
                  date={date}
                  id={title}
                  onlyBegin
                  noLimit
                  fromThisDay
                  isOpenTitle={false}
                />
              </div>
              <div className={form('row')}>
                <div className={form('row-title')}>
                  <IntlMessages id="students.certGrade" />
                </div>
                <Radio.Group
                  onChange={({ target: { value } }) => this.setState({ isPassed: value })}
                  value={isPassed}
                  className={form('row-radio')}
                >
                  <Radio value>Passed</Radio>
                  <Radio value={false}>Failed</Radio>
                </Radio.Group>
              </div>
              <div className={form('row')}>
                <div className={form('row-title')}>
                  <IntlMessages id="students.certResults" />
                </div>
                <CustomTextInput
                  className={form('results-input')}
                  type="text"
                  value={results}
                  name="results"
                  placeholder={resultsTitle}
                  onChange={({ target: { value } }) => this.setState({ results: value })}
                />
              </div>
              <div className={form('row')}>
                <Checkbox
                  name="sendNotifications"
                  handleCheck={sendNotifications => this.setState({ sendNotifications })}
                  value={sendNotifications}
                  title={<IntlMessages id="students.certNotifaction" />}
                />
              </div>
              <div className={form('button')}>
                <DefaultButton
                  textId="tutors.saveBtn"
                  onClick={this.handleSave}
                  disabled={this.isInvalid(this.state)}
                />
              </div>
            </div>
            <div className={logs()}>
              <div className={logs('title')}>
                <IntlMessages id="students.certLogsTitle" />
              </div>
              <div className={logs('totla')}>
                <span>
                  <IntlMessages id="students.certTotalTitle" />
                  {certificationLogs.length}
                </span>
              </div>
              <div className={logs('list')}>
                {certificationLogs && certificationLogs.map((el, i) => (
                  <div className={logs('item', { dark: i % 2 })}>
                    <div className={logs('item-image')}>
                      {el.isPassed ? <PassedIcon /> : <FailedIcon />}
                    </div>
                    <div className={logs('item-info')}>
                      <p>{el.date}</p>
                      <p>{el.results}</p>
                    </div>
                    <div className={logs('item-delete')} onClick={() => this.handleDelete(el.id)}>
                      <DeleteIcon />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </CertificationWrapper>
      </LayoutContent>
    );
  }
}

const mapStateToProps = (state) => {
  const isCurrentNav = getCurrentNavTitleFp(state);
  const currentDetailCourseId = getCurrentDetailCourseIdFp(state);
  const courseContent = getCourseContentStudentsFp(state);
  const certification = getCertificationFp(state);
  const student = state.students.currentStudents[0];
  const certificationLogs = _.sortBy(getCertificationLogsFp(state), ['date']).reverse();

  return {
    isCurrentNav,
    currentDetailCourseId,
    courseContent,
    certification,
    student,
    certificationLogs,
  };
};

export default connect(
  mapStateToProps,
  {
    ...studentsActions,
  },
)(Certification);
