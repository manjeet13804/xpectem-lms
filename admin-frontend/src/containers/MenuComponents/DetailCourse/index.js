import React, { Component } from 'react';
import { connect } from 'react-redux';
import studentsActions from 'redux/students/actions';
import {
  getSearchLmsGroupsStudentsFp,
  getSearchOrgStudentsFp,
  getSearchGroupStudentsFp,
  getCurrentLmsGroupIdStudentsFp,
  getCurrentNameLmsGroupStudentsFp,
  getCurrentOrgIdStudentsFp,
  getCurrentOrgNameStudentsFp,
  getSearchCoursesFp,
  getChosenCoursesStudentsFp,
  getCurrentStudentsFp,
  getChosenGroupsFp,
  getAddedStatusStudentFp,
  getCurrentNavTitleFp,
  getCurrentStudentIdFp,
  getCurrentDetailCourseIdFp,
  getCourseContentStudentsFp,
} from 'selectors';
import LayoutContent from 'components/utility/layoutContent';
import { REGEXP } from 'constants/regexp';
import { bemlds } from 'utils';
import {
  BannerDetail,
  BannerDetailAdaptive,
  BannerNotification,
  IntlMessages,
} from 'components';
import {
  Content,
  Communication,
  Notes,
  Certification,
  QuestionsAnswers,
} from './Components';
import DetailCourseWrapper from './DetailCourse.style';

const { getCourseDetailId } = REGEXP;

const b = bemlds('detail-course');

class DetailCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageSrc: null,
    };
  }

  addComponent = (type, id, idCourse, history, doneAt) => {
    switch (type) {
      case 'courseDetails.courseTab':
        return (
          <Content
            idStudent={id}
            idCourse={idCourse}
            history={history}
          />
        );
      case 'courseDetails.communicationTab':
        return (
          <Communication
            idStudent={id}
            idCourse={idCourse}
            history={history}
          />
        );
      case 'courseDetails.notesTable':
        return <Notes idStudent={id} />;
      case 'courseDetails.certificationTab':
        return doneAt ? (
          <Certification
            idStudent={id}
            idCourse={idCourse}
            history={history}
          />
        ) : null;
      case 'courseDetails.qaTab':
        return (
          <QuestionsAnswers
            idStudent={id}
            idCourse={idCourse}
            history={history}
          />
        );

      default:
        return null;
    }
  };

  handleChangeNavTitle = (type) => {
    const { clickNavMenu } = this.props;
    clickNavMenu(type);
  };

  render() {
    const {
      isCurrentNav,
      idStudent,
      currentDetailCourseId,
      history,
      courseContent = {},
      clearBannerCourseDetails,
      courseDetailsSuccess,
      courseDetailsError,
    } = this.props;

    const { course, doneAt } = courseContent;

    return (
      <LayoutContent>
        <DetailCourseWrapper>
          {courseDetailsSuccess && (
            <BannerNotification
              error={false}
              title={<IntlMessages id="students.editSuccess" />}
              close={clearBannerCourseDetails}
              isScrollMount
            />
          )}
          {courseDetailsError && (
            <BannerNotification
              error
              title={courseDetailsError}
              close={clearBannerCourseDetails}
              isScrollMount
            />
          )}
          <section className={b()}>
            <BannerDetailAdaptive
              changeNavTitle={this.handleChangeNavTitle}
              isCurrentNav={isCurrentNav}
              title={course && course.title}
            />
            <BannerDetail
              changeNavTitle={this.handleChangeNavTitle}
              isCurrentNav={isCurrentNav}
              title={course && course.title}
              doneAt={doneAt}
            />
            <section className={b('component')}>
              {this.addComponent(
                isCurrentNav,
                idStudent,
                currentDetailCourseId,
                history,
                doneAt,
              )}
            </section>
          </section>
        </DetailCourseWrapper>
      </LayoutContent>
    );
  }
}

const mapStateToProps = (state) => {
  const { router: { location } } = state;

  const searchLmsGroupsData = getSearchLmsGroupsStudentsFp(state);
  const searchOrgData = getSearchOrgStudentsFp(state);
  const searchGroupData = getSearchGroupStudentsFp(state);
  const currentLmsGroupId = getCurrentLmsGroupIdStudentsFp(state);
  const currentNameLmsGroup = getCurrentNameLmsGroupStudentsFp(state);
  const currentOrgId = getCurrentOrgIdStudentsFp(state);
  const currentOrgName = getCurrentOrgNameStudentsFp(state);
  const searchCoursesData = getSearchCoursesFp(state);
  const chosenCourses = getChosenCoursesStudentsFp(state);
  const currentStudents = getCurrentStudentsFp(state);
  const chosenGroup = getChosenGroupsFp(state);
  const isAddedStudents = getAddedStatusStudentFp(state);
  const isCurrentNav = getCurrentNavTitleFp(state);
  const currentStudentId = getCurrentStudentIdFp(state);
  const currentDetailCourseId = getCurrentDetailCourseIdFp(state);
  const courseContent = getCourseContentStudentsFp(state);

  const { pathname } = location;

  const res = pathname && pathname.match(getCourseDetailId);
  const idStudent = currentStudentId || res[1];


  return {
    searchLmsGroupsData,
    searchOrgData,
    searchGroupData,
    currentLmsGroupId,
    currentNameLmsGroup,
    currentOrgId,
    currentOrgName,
    searchCoursesData,
    chosenCourses,
    currentStudents,
    chosenGroup,
    isAddedStudents,
    isCurrentNav,
    idStudent,
    currentDetailCourseId,
    courseContent,
    ...state.students,
  };
};

export default connect(
  mapStateToProps,
  {
    ...studentsActions,
  },
)(DetailCourse);
