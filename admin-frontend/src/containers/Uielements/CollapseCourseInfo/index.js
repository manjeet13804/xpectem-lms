import React, { Component } from 'react';
import { Collapse, Icon } from 'antd';
import LayoutContent from 'components/utility/layoutContent';
import IntlMessages from 'components/utility/intlMessages';
import {
  ItemExamInfo,
  ItemAssignmentInfo,
} from 'components';
import { bemlds } from 'utils';

import CollapseCourseInfoWrapper from './collapseCourseInfo.style';

const b = bemlds('collapse-course-info');
const { Panel } = Collapse;

const Collapses = props => (
  <CollapseCourseInfoWrapper>
    <Collapse {...props}>{props.children}</Collapse>
  </CollapseCourseInfoWrapper>
);

const genExtra = () => (
  <Icon
    type="setting"
    onClick={event => {
      event.stopPropagation();
    }}
  />
);

class CollapseCourseInfo extends Component {
  render() {
    const {
      courses = [],
    } = this.props;

    return (
      <LayoutContent>
        <Collapses>
          {courses && courses.map(({ topic: {
            id,
            name,
            exams,
            assignments,
          } }) => (
            <Panel header={name} key={id} extra={genExtra()}>
              {exams.length > 0 && (
                <div className={b('title')}>
                  <IntlMessages id="students.communicationsExamsTitle" />
                </div>
              )}
              {exams && exams.map((exam) => (
                <ItemExamInfo
                  key={exam.id}
                  exam={exam}
                />
              ))}
              {assignments.length > 0 && (
                <div className={b('title')}>
                  <IntlMessages id="students.communicationsAssignmentsTitle" />
                </div>
              )}
              {assignments && assignments.map((assignment) => (
                <ItemAssignmentInfo
                  key={assignment.id}
                  assignment={assignment}
                />
              ))}
            </Panel>
          ))}
        </Collapses>
      </LayoutContent>
    );
  }
}


export default CollapseCourseInfo;
