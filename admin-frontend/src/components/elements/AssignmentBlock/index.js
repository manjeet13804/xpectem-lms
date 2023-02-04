import React, { PureComponent } from 'react';
import { bemlds } from 'utils';
import IntlMessages from 'components/utility/intlMessages';
import { ItemAssignment } from 'components';
import AssignmentBlockWrapper from './assignmentBlock.style';

const b = bemlds('assignment-block');

class AssignmentBlock extends PureComponent {
  render() {
    const { assignments, courseTopicId, changeAssigmentStatus } = this.props;
    if (!assignments.length) { return null; }
    const isDisabled = assignments.map(item => Boolean(item.studentLogs && item.studentLogs.length)).some(item => !item);
    return (
      <AssignmentBlockWrapper>
        <div className={b()}>
          <div className={b('chapter')}>
            <IntlMessages id="notes.assignmentTitle" />
          </div>
          {!isDisabled && (
          <div className={b('title')}>
            <IntlMessages id="notes.selectTitle" />
          </div>
          )}
          <div className={b('assignment')}>
            {assignments && assignments.map(assignment => (
              <ItemAssignment
                key={assignment.id}
                assignment={assignment}
                courseTopicId={courseTopicId}
                changeAssigmentStatus={changeAssigmentStatus}
              />
            ))}
          </div>
        </div>
      </AssignmentBlockWrapper>
    );
  }
}

export default AssignmentBlock;
