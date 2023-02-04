// @flow
import React, {
  Node,
  useState,
} from 'react';
import { bemlds } from 'utils';
import { ASSIGNMENT_DICTIONARY } from 'localise';
import { AssignmentType } from 'models';
import Assignment from './Assignment';
import AssignmentView from './AssignmentView';
import './styles.scss';

const defaultProps = {};

type PropsType = {
    assignments: AssignmentType[],
    startAssignment: (id: number) => void,
    completeAssignment: (id: number) => void
};

const block = bemlds('assignments');

const Assignments = ({
  assignments,
  startAssignment,
  completeAssignment,
  onTab,
}: PropsType): Node => {
  const [
    assignmentId,
    selectAssignment,
  ] = useState(null);

  const currentAssignment = assignmentId && assignments.find(
    ({ id }: AssignmentType): boolean => id === assignmentId,
  );

  if (assignments.length === 0) {
    return null;
  }

  const closeModal = () => selectAssignment(null);

  return (
    <>
      <div className={block()}>
        <div className={block('title')}>{ASSIGNMENT_DICTIONARY.title}</div>
        <div className={block('help-text')}>
          {ASSIGNMENT_DICTIONARY.helpText}
        </div>
        {assignments.map((assignment: AssignmentType): Node => (
          <Assignment
            key={assignment.id}
            assignment={assignment}
            onClick={(): void => selectAssignment(assignment.id)}
          />
        ))}
      </div>
      {
          currentAssignment && (
          <AssignmentView
            close={closeModal}
            assignment={currentAssignment}
            startAssignment={startAssignment}
            completeAssignment={completeAssignment}
            onTab={onTab}
          />
          )
      }
    </>
  );
};

Assignments.defaultProps = defaultProps;

export default Assignments;
