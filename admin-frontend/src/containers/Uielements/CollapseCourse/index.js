import React, { Component } from 'react';
import { Collapse, Icon } from 'antd';
import { bemlds } from 'utils';
import LayoutContent from 'components/utility/layoutContent';
import { COLORS } from 'constants/constants';
import {
  ItemLesson,
  ExamBlock,
  AssignmentBlock,
} from 'components';
import CircleProgress from '../CircleProgress';

import CollapseCourseWrapper from './collapseCourse.style';

const icon = bemlds('icon');

const { Panel } = Collapse;

const Collapses = props => (
  <CollapseCourseWrapper>
    <Collapse {...props}>{props.children}</Collapse>
  </CollapseCourseWrapper>
);

const getIconAndText = (percent, text) => (
  <div className={icon()}>
    {percent === 100 ? (
      <Icon
        type="check-circle"
        theme="filled"
        style={{ color: COLORS.green }}
      />
    )
      : (
        <CircleProgress percent={percent} />
      )}
    <p className={icon('text')}>{text}</p>
  </div>
);

const genExtra = () => (
  <Icon
    type="setting"
    onClick={(event) => {
      event.stopPropagation();
    }}
  />
);

class CollapseCourse extends Component {
  render() {
    const {
      courses = [],
      changeAssigmentStatus,
      changeExamPoints,
      changeExamStudentLogPoints,
    } = this.props;


    const percentOfLessons = lessons => lessons.filter(({ studentLogs }) => (studentLogs.length > 0)).length * 100 / lessons.length;

    return (
      <LayoutContent>
        <Collapses>
          {courses && courses.map(({
            topic: {
              id,
              name,
              lessons,
              exams,
              assignments,
            },
          }) => (
            <Panel header={getIconAndText(percentOfLessons(lessons), name)} key={id} extra={genExtra()}>
              {lessons && lessons.map((lesson, index) => (
                <ItemLesson
                  key={lesson.id}
                  lesson={lesson}
                  courseTopicId={id}
                  changeAssigmentStatus={changeAssigmentStatus}
                  changeExamPoints={changeExamPoints}
                  changeExamStudentLogPoints={changeExamStudentLogPoints}
                />
              ))}
              {exams && (
              <ExamBlock
                courseTopicId={id}
                exams={exams}
                changeExamPoints={changeExamPoints}
                changeExamStudentLogPoints={changeExamStudentLogPoints}
              />
              )}
              {assignments && (
              <AssignmentBlock
                courseTopicId={id}
                assignments={assignments}
                changeAssigmentStatus={changeAssigmentStatus}
              />
              )}
            </Panel>
          ))}
        </Collapses>
      </LayoutContent>
    );
  }
}


export default CollapseCourse;
