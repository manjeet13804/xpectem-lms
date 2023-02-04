import React, { Component } from 'react';
import { connect } from 'react-redux';
import studentsActions from 'redux/students/actions';
import {
  getCurrentNavTitleFp,
  getCurrentDetailCourseIdFp,
  getCourseContentStudentsFp,
} from 'selectors';
import {
  FileBlock,
  DateStartEnd,
  DefaultButton,
} from 'components';
import _ from 'lodash';
import moment from 'moment';
import URLS from 'redux/urls';
import LayoutContent from 'components/utility/layoutContent';
import IntlMessages from 'components/utility/intlMessages';
import { DATE_FORMATS } from 'constants/constants';
import { bemlds } from 'utils';
import CollapseCourse from 'containers/Uielements/CollapseCourse';
import ContentWrapper from './content.style';

const { yearMonthDay } = DATE_FORMATS;

const b = bemlds('content');
const header = bemlds('header');
const btn = bemlds('button');
const success = bemlds('success');
const date = bemlds('date');

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageSrc: null,
    };
  }

  handleChangeAssignmentStatus = ({value, courseTopicId, assignId, studLogId, lessonId, completedAt}) => {
    const { changeAssigmentStatus } = this.props;
    changeAssigmentStatus({value, courseTopicId, assignId, studLogId, lessonId, completedAt});
  };

  handleChangeExamPoints = ({
    value,
    name,
    courseTopicId,
    examId,
    lessonId,
  }) => {
    const { changeExamPoints } = this.props;
    changeExamPoints(value, name, courseTopicId, examId, lessonId);
  };

  handleChangeExamStudentLogPoints = ({
    value,
    name,
    courseTopicId,
    examId,
    studLogId,
    lessonId,
  }) => {
    const { changeExamStudentLogPoints } = this.props;
    changeExamStudentLogPoints({value, name, courseTopicId, examId, studLogId, lessonId});
  };

  handleChangeExamStudentLogs = ({ studentsLogs, courseTopicId, examId, studLogId, lessonId }) => {
    const { changeExamStudentLogs } = this.props;
    changeExamStudentLogs(studentsLogs, courseTopicId, examId, studLogId, lessonId);
  };

  handleSave = () => {
    const {
      courseContent = {},
      saveCourseContent,
    } = this.props;

    const {
      id,
      course: { courseTopics } = {},
      startAt,
      studyPlan: { wishedDoneDate } = {},
    } = courseContent;

    const dateBody = {
      courseStudentId: id,
      startAt,
      wishedDoneDate,
    };

    const examsArray = courseTopics.reduce((acc, {
      topic: {
        exams,
        lessons,
      },
    }) => {
      const topicExams = exams.map(({
        id,
        gradeA,
        gradeB,
        gradeC,
        maxPoints,
      }) => ({
        id,
        gradeA,
        gradeB: gradeB || 1,
        gradeC,
        maxPoints: maxPoints || 1,
      }));
      const newLessonExams = lessons.reduce((lessonAcc, { exams: lessonExams }) => {
        const rebuildedExams = lessonExams.map(({
          id,
          gradeA,
          gradeB,
          gradeC,
          maxPoints,
        }) => ({
          id,
          gradeA,
          gradeB: gradeB || 1,
          gradeC,
          maxPoints: maxPoints || 1,
        }));
        return [...lessonAcc, ...rebuildedExams];
      }, []);
      return [...acc, ...topicExams, ...newLessonExams];
    }, []);

    const examsBody = {
      exams: [
        ...examsArray,
      ],
    };

    const examsStudentLogsArray = courseTopics.reduce((acc, {
      topic: {
        exams,
        lessons,
      },
    }) => {
      const topicExams = exams.reduce((tAcc, {
        studentLogs,
      }) => {
        const logs = studentLogs.map(({ id, status, points, completedAt }) => ({
          id,
          status,
          points,
          completedAt,
        }));
        return [...tAcc, ...logs];
      }, []);

      const newLessonExams = lessons.reduce((lessonAcc, { exams: lessonExams }) => {
        const rebuildedExams = lessonExams.reduce((examAcc, {
          studentLogs,
        }) => {
          const logs = studentLogs.map(({ id, status }) => ({
            id,
            status,
          }));
          return [...examAcc, ...logs];
        }, []);
        return [...lessonAcc, ...rebuildedExams];
      }, []);
      return [...acc, ...topicExams, ...newLessonExams];
    }, []);

    const examsStudentLogsBody = {
      studentLogs: [
        ...examsStudentLogsArray,
      ],
    };

    const assignmentsArray = courseTopics.reduce((acc, {
      topic: {
        assignments,
        lessons,
      },
    }) => {
      const topicExams = assignments.reduce((tAcc, {
        studentLogs,
      }) => {
        const logs = studentLogs.map(({ id, status, completedAt }) => ({
          id,
          status,
          completedAt,
        }));
        return [...tAcc, ...logs];
      }, []);
      const newLessonExams = lessons.reduce((lessonAcc, { assignments: lessonAssignments }) => {
        const rebuildedExams = (lessonAssignments||[]).reduce((assignAcc, {
          studentLogs,
        }) => {
          const logs = studentLogs.map(({ id, status, completedAt}) => ({
            id,
            status,
            completedAt,
          }));
          return [...assignAcc, ...logs];
        }, []);
        return [...lessonAcc, ...rebuildedExams];
      }, []);
      return [...acc, ...topicExams, ...newLessonExams];
    }, []);

    const assignmentsBody = {
      studentLogs: [
        ...assignmentsArray,
      ],
    };
    saveCourseContent({
      assignmentsBody,
      examsBody,
      examsStudentLogsBody,
      dateBody,
    });
  };

  handleSaveDate = (id, date, name) => {
    const { addDateCourseContent } = this.props;
    addDateCourseContent(id, date, name);
  };

  getDifferenceDate = (start, end) => moment(end).diff(start, 'days');

  componentWillMount() {
    const {
      getCourseContent,
      idStudent,
      idCourse,
      currentDetailCourseId,
      history,
    } = this.props;

    if (!currentDetailCourseId) {
      history.push(`${URLS.communicationChoose}`);
    } else {
      getCourseContent(idStudent, idCourse);
    }
  }

  render() {
    const {
      courseContent,
      history,
      getWelcomeLetterRichText,
      getWelcomeLetterUrl,
    } = this.props;
    if (_.isEmpty(courseContent)) { return null; }

    const {
      course: {
        id: courseId,
        courseTopics,
        welcomeLetterTemplate,
        welcomeEmailTemplate,
        translations,
      } = {},
      id,
      startAt,
      doneAt,
      studyPlan = {},
    } = courseContent;
    const { wishedDoneDate } = studyPlan;

    return (
      <LayoutContent>
        <ContentWrapper>
          <section className={b()}>
            <section>
              {doneAt && (
                <div className={success()}>
                  <IntlMessages id="notes.courseContentTitle" />
                  {moment(doneAt).format(yearMonthDay)}
                </div>
              )}
              <div className={header()}>
                <div className={header('left')}>
                  <FileBlock
                    title={<IntlMessages id="students.contentCertificateTitle" />}
                    fileName="ExampleTextForCertificate"
                  />
                  <FileBlock
                    title={<IntlMessages id="students.contentLetterTitle" />}
                    fileName="ExampleTextForWelcomeLetter"
                    uploadedFileURL={welcomeLetterTemplate}
                    translation={translations[0].welcomeLetter}
                    getWelcomeLetterUrl={getWelcomeLetterUrl}
                    getWelcomeLetterRichText={getWelcomeLetterRichText}
                    courseId={courseId}
                  />
                  <FileBlock
                    title={<IntlMessages id="students.contentEmailTitle" />}
                    fileName="ExampleTextForWelcomeEmail"
                    uploadedFileURL={welcomeEmailTemplate}
                    translation={translations[0].welcomeEmail}
                    getWelcomeLetterUrl={getWelcomeLetterUrl}
                    getWelcomeLetterRichText={getWelcomeLetterRichText}
                    courseId={courseId}
                  />
                  <div className={btn()}>
                    <DefaultButton
                      textId="students.contentResendEmail"
                    />
                  </div>
                </div>
                <div className={header('right')}>
                  <div className={date()}>
                    <IntlMessages id="students.contentDateTitle" />
                  </div>
                  <DateStartEnd
                    id={id}
                    dateBegin={startAt}
                    dateEnd={wishedDoneDate}
                    handleSaveDate={this.handleSaveDate}
                  />
                  <div className={date('block')}>
                    <div className={date('title-days')}>
                      <IntlMessages id="students.daysLeftTitle" />
                    </div>
                    <div className={date('day-number')}>
                      {this.getDifferenceDate(startAt, wishedDoneDate)}
                    </div>
                  </div>
                </div>
              </div>
              <CollapseCourse
                courses={courseTopics}
                changeAssigmentStatus={this.handleChangeAssignmentStatus}
                changeExamPoints={this.handleChangeExamPoints}
                changeExamStudentLogPoints={this.handleChangeExamStudentLogPoints}
              />
              <div className={btn()}>
                <DefaultButton
                  textId="organisations.saveBtn"
                  onClick={this.handleSave}
                />
                <div className={btn('save', { back: true })}>
                  <DefaultButton
                    textId="group.importGoBack"
                    onClick={history.goBack}
                  />
                </div>
              </div>
            </section>
          </section>
        </ContentWrapper>
      </LayoutContent>
    );
  }
}

const mapStateToProps = (state) => {
  const isCurrentNav = getCurrentNavTitleFp(state);
  const currentDetailCourseId = getCurrentDetailCourseIdFp(state);
  const courseContent = getCourseContentStudentsFp(state);

  return {
    isCurrentNav,
    currentDetailCourseId,
    courseContent,
  };
};

export default connect(
  mapStateToProps,
  {
    ...studentsActions,
  },
)(Content);
