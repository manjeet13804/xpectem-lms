// @flow
import React, { Node } from 'react';
import { PopupContainer } from 'components';
import { bemlds } from 'utils';
import { AssignmentLogStatuses, AssignmentType } from 'models';
import AssignmentNotCorrect from './AssignmentNotCorrect';
import AssignmentNotDone from './AssignmentNotDone';
import AssignmentSuccess from './AssignmentSuccess';
import './styles.scss';

const block = bemlds('assignment-view');

type PropsType = {
    close: () => void,
    assignment: AssignmentType,
    startAssignment: (id: number) => void,
    completeAssignment: (id: number) => void
};

const getAssignmentView = (status: $Values<AssignmentLogStatuses>): Node => (
  {
    [AssignmentLogStatuses.Passed]: AssignmentSuccess,
    [AssignmentLogStatuses.Failed]: AssignmentNotCorrect,
  }[status] || AssignmentNotDone
);

const AssignmentView = ({
  assignment,
  startAssignment,
  completeAssignment,
  close,
  onTab,
}: PropsType): Node => {
  const Assignment = getAssignmentView(assignment.log && assignment.log.status);
  return (
    <PopupContainer close={close}>
      <div className={block()}>
        <Assignment
          assignment={assignment}
          closeModal={close}
          startAssignment={startAssignment}
          completeAssignment={completeAssignment}
          onTab={onTab}
        />
      </div>
    </PopupContainer>
  );
};


export default AssignmentView;
