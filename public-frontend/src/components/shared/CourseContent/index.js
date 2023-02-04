// @flow
import React, {PureComponent, Node} from 'react';
import { bemlds } from 'utils';
import { MyCourseType } from 'models';
import {
  CourseInfo,
  CourseTree,
  Links,
} from './components';
import './styles.scss';

const defaultProps = {};

type PropsType = {
  currentMyCourse: MyCourseType
};

const b = bemlds('course-content');

class CourseContent extends PureComponent<PropsType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {};
  }

  render(): Node {
    const { currentMyCourse, onTab } = this.props;
    const {
      links = [],
      topics = [],
      student: {
        leftDays,
      } = {},
    } = currentMyCourse || {};

    const isTimeAccess = Boolean(leftDays);
    return (
      <section className={b()}>
        <CourseInfo
          course={currentMyCourse}
          isTimeAccess={isTimeAccess}
        />
        {isTimeAccess && (
        <>
          <CourseTree
            isLinear={currentMyCourse.isLinear}
            isConsistently={currentMyCourse.isConsistently}
            topicIds={topics}
            onTab={onTab}
          />
          <Links links={links} />
        </>
        )}
      </section>
    );
  }
}

CourseContent.defaultProps = defaultProps;

export default CourseContent;
