// @flow
import React, { useEffect, useState } from 'react';
import { compose, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { withRouter, ContextRouter } from 'react-router-dom';
import { COURSE_TABS_ENUM } from 'constants/enums';
import { Page } from 'pages';
import {
  StudentHeader,
  CourseHeader,
  withCourseId,
  SimpleLayout,
} from 'components';
import { MyCourseFullType } from 'models';
import { getCurrentMyCourse, getMyCoursesIsLoading } from 'redux/selectors';
import {
  getMyCourse,
  getWelcomeLetterUrl,
  getWelcomeLetterRichText,
} from 'redux/actions';
import Loader from 'components/elements/CustomLoader';

type StateType = {};

type PropsType = ContextRouter & {
  currentCourse: MyCourseFullType,
  getCurrentCourse: () => void
};


const StudentCoursePage = ({
  match: {
    params: {
      tab,
    },
  },
  currentCourse,
  getCurrentCourse,
  isLoadingCoursesByGroup,
}): Page<PropsType, StateType> => {
  const [currentTab, setTab] = useState(tab || COURSE_TABS_ENUM.communication);
  useEffect(() => {
    getCurrentCourse();
  }, []);

  useEffect(() => {
    if (tab) {
      setTab(tab);
    }
  }, [tab]);

  return (
    <SimpleLayout>
      <StudentHeader />
      {isLoadingCoursesByGroup ? (
        <Loader />
      ) : (
        <>
          {currentCourse && (
            <CourseHeader
              tab={currentTab}
              currentMyCourse={currentCourse}
              id={currentCourse.id}
            />
          )}
        </>
      )}
    </SimpleLayout>
  );
};

const mapStateToProps = (
  state: object,
  {
    courseId,
  }: PropType,
): object => ({
  currentCourse: getCurrentMyCourse(state, { id: Number(courseId) }),
  isLoadingCoursesByGroup: getMyCoursesIsLoading(state),
});

const mapDispatchToProps = (
  dispatch: Dispatch,
  {
    courseId,
    welcomeLetterURL,
    welcomeLetterRichText,
  }: PropType,
): object => ({
  getCurrentCourse: (): void => dispatch(
    getMyCourse(courseId),
  ),
  getWelcomeLetterUrl: (): void => dispatch(
    getWelcomeLetterUrl(courseId, welcomeLetterURL),
  ),
  getWelcomeLetterRichText: (): void => dispatch(
    getWelcomeLetterRichText(courseId, welcomeLetterRichText),
  ),

});

export default compose(
  withCourseId,
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(StudentCoursePage);
