// @flow
import React from 'react';
import { bemlds } from 'utils';
import { AssignmentLogStatuses, AssignmentType } from 'models';
import { ASSIGNMENT_DICTIONARY } from 'localise';
import AttemptButton from '../AttemptButton';
import AssignmentDescription from '../AssignmentDescription';
import './styles.scss';

const block = bemlds('assignment-not-done');

const defaultProps = {};

type PropsType = {
  assignment: AssignmentType,
  startAssignment: (id: number) => void,
  completeAssignment: (id: number) => void
};

const AssignmentNotDone = ({
  assignment: {
    id,
    name,
    todayTries,
    maxTries,
    totalTries,
    log = {},
    type,
    url,
  },
  startAssignment,
  completeAssignment,
  closeModal,
  onTab,
}: PropsType): Node => (
  <section className={block()}>
    <div className={block('title')}>
      {name}
    </div>
    {maxTries && <AssignmentDescription type={type} maxTries={maxTries} />}
    <div className={block('attempt')}>
      <div className={block('tries')}>
        {maxTries && (
        <div className={block('tries-count')}>
          {ASSIGNMENT_DICTIONARY.todayTries(todayTries, maxTries)}
        </div>
        )}
        <div className={block('tries-total')}>
          {ASSIGNMENT_DICTIONARY.totalTries(totalTries)}
        </div>
      </div>
      {
        (!log || log.status === AssignmentLogStatuses.Started)
        && (
        <AttemptButton
          className={block('start')}
          id={id}
          type={type}
          isNotStarted={!log}
          startAssignment={startAssignment}
          completeAssignment={completeAssignment}
          link={url}
          closeModal={closeModal}
          onTab={onTab}
        />
        )
      }
    </div>
  </section>
);

AssignmentNotDone.defaultProps = defaultProps;

export default AssignmentNotDone;
