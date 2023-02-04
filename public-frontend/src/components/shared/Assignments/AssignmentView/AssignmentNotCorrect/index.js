// @flow
import React from 'react';
import format from 'date-fns/format';
import addDays from 'date-fns/addDays';
import { bemlds } from 'utils';
import { AssignmentType } from 'models';
import { ASSIGNMENT_DICTIONARY } from 'localise';
import moment from 'moment';
import AttemptButton from '../AttemptButton';
import AssignmentDescription from '../AssignmentDescription';
import './styles.scss';
import { DATE_FORMATS } from '../../../../../constants/constants';

const { passedAssignmentDate } = DATE_FORMATS;

const block = bemlds('assignment-not-correct');

const defaultProps = {};

type PropsType = {
  assignment: AssignmentType,
  startAssignment: (id: number) => void
};

const AssignmentNotCorrect = (props: PropsType): Node => {
  const {
    assignment: {
      id,
      name,
      todayTries,
      maxTries,
      totalTries,
      type,
      link,
      log: {
        approvedAt = null,
      } = {},
    },
    startAssignment,
    closeModal,
    onTab,
  } = props;

  const [
    dayOfWeek,
    date,
  ] = format(
    addDays(new Date(), 1),
    'cccc, yyyy-MM-dd',
  )
    .split(', ');

  const approvedDate = moment(approvedAt).format(passedAssignmentDate);

  return (
    <section className={block()}>
      <div className={block('title')}>
        {name}
      </div>
      <div className={block('title-failed')}>
        {ASSIGNMENT_DICTIONARY.failed}
      </div>
      <AssignmentDescription type={type} maxTries={maxTries} />
      <div className={block('attempt')}>
        <div className={block('tries')}>
          <div className={block('tries-count')}>
            {[
              ASSIGNMENT_DICTIONARY.todayTries(todayTries, maxTries),
              ASSIGNMENT_DICTIONARY.failedAt(approvedDate),
            ].join(' - ')}
          </div>
          <div className={block('tries-total')}>
            {ASSIGNMENT_DICTIONARY.totalTries(totalTries)}
          </div>
          {todayTries === maxTries && (
            <div className={block('tries-not-attempt')}>
              {ASSIGNMENT_DICTIONARY.attemptsLimitReached(
                dayOfWeek,
                date,
                maxTries,
              )}
            </div>
          )}
        </div>
        {
            todayTries < maxTries && (
            <AttemptButton
              className={block('start')}
              id={id}
              type={type}
              isNotStarted
              startAssignment={startAssignment}
              link={link}
              closeModal={closeModal}
              onTab={onTab}
            />
            )
        }
      </div>
    </section>
  );
};

AssignmentNotCorrect.defaultProps = defaultProps;

export default AssignmentNotCorrect;
