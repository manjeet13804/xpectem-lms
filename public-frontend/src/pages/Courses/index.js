// @flow
import React from 'react';
import type { Node } from 'react';
import { connect } from 'react-redux';
import block from 'utils/bem';
import {
  CourseCard,
  NewCourseCard,
} from 'components';

import { getUserRoles } from 'redux/selectors';

import { Page } from 'pages';
import { COURSE_LIST_DESIGNER } from 'constants/mock';

import './courses.scss';

const bem = block('courses');

class CoursesPage extends Page {
  constructor() {
    super();
    this.bem = bem;
  }

  clickHandler = () => {
    console.log('CreateNewCourseAction');
  }

  goToCoursePage = (path: string) => {
    const { history } = this.props;
    history.push(path);
  }

  checkRenderCard = (isPublished: boolean): boolean => {
    const {
      xpectrum,
      editor,
      designer,
    } = this.users;
    return (
      this.userRole !== designer
                      && this.userRole !== editor
                      && this.userRole !== xpectrum
                      && !isPublished
    ) || (
      this.userRole === editor && isPublished
    );
  }

  checkRenderNewCard = (): boolean => (
    this.userRole === this.users.designer
    || this.userRole === this.users.xpectrum
  )

  renderContent = (): Node => (
    <section className={bem('course-list')}>
      {
          COURSE_LIST_DESIGNER.map((item: object): Node => (
            this.checkRenderCard(item.publishedStatus) ? null : (
              <CourseCard
                key={item.id}
                course={item}
                role={this.userRole}
                goToPage={this.goToCoursePage}
              />
            )
          ))
        }
      {
          this.checkRenderNewCard()
          && (
            <NewCourseCard
              clickHandler={this.clickHandler}
            />
          )
        }
    </section>
  )
}

const stateProps = (state: object): object => ({
  userRole: getUserRoles(state),
});

export default connect(stateProps)(CoursesPage);
