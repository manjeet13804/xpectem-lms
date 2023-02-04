// @flow
import React, {
  Node,
} from 'react';
import { bemlds } from 'utils';
import { AssignmentLogStatuses, AssignmentType } from 'models';
import { ArrowRight, CircleIcon, withHover } from 'components';
import { ASSIGNMENT_DICTIONARY } from 'localise';
import './styles.scss';

const defaultProps = {};

type PropsType = {
    assignment: AssignmentType,
    onClick: () => void
};

const block = bemlds('assignment');

const isPassedOrFailed = (status: $Values<AssignmentLogStatuses>): boolean => [
  AssignmentLogStatuses.Passed,
  AssignmentLogStatuses.Failed,
].indexOf(status) >= 0;

const isNotStarted = (status: $Values<AssignmentLogStatuses>): boolean => !status;

const isStarted = (
  status: $Values<AssignmentLogStatuses>,
): boolean => status === AssignmentLogStatuses.Started;

const getStatusStyle = (status: $Values<AssignmentLogStatuses>): object => ({
  [status]: true,
});

const getOnHoverTip = (status?: $Values<AssignmentLogStatuses>): ?string => {
  switch (true) {
    case isNotStarted(status):
      return ASSIGNMENT_DICTIONARY.start;
    case isStarted(status):
      return ASSIGNMENT_DICTIONARY.complete;
    case isPassedOrFailed(status):
      return ASSIGNMENT_DICTIONARY.showResults;
    default:
      return null;
  }
};

const Assignment = withHover(
  (
    {
      assignment,
      onClick,
      isHover,
      onMouseEnter,
      onMouseLeave,
    }: PropsType,
  ): Node => {
    const status = assignment.log && assignment.log.status;

    return (
      <div
        className={block()}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
        role="button"
        tabIndex={0}
      >
        <div className={block('title')}>
          <CircleIcon
            className={block('status', getStatusStyle(status))}
          />
          <div className={block('text')}>
            {assignment.name}
          </div>
        </div>
        {isHover && (
          <div className={block('next')}>
            <ArrowRight className={block('next-arrow')} />
            <div className={block('next-text')}>
              {getOnHoverTip(status)}
            </div>
          </div>
        )}
      </div>
    );
  },
);

Assignment.defaultProps = defaultProps;

export default Assignment;
