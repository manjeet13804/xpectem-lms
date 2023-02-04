// @flow
import React from 'react';
import { bemlds } from 'utils';
import { AssignmentType, isAutoAssignment } from 'models';
import { ASSIGNMENT_DICTIONARY } from 'localise';
import {
  SuccessfulIcon,
} from 'components';
import moment from 'moment';
import { DATE_FORMATS } from '../../../../../constants/constants';
import './styles.scss';

const { passedAssignmentDate } = DATE_FORMATS;

const block = bemlds('assignment-success');

const defaultProps = {};

type PropsType = {
    assignment: AssignmentType
};

const AssignmentSuccess = (props: PropsType): Node => {
  const {
    assignment: {
      name,
      todayTries,
      maxTries,
      totalTries,
      log: {
        approvedAt = null,
      } = {},
      type,
    },
  } = props;

  const approvedDate = moment(approvedAt).format(passedAssignmentDate);

  return (
    <section className={block()}>
      <div className={block('title')}>
        {name}
      </div>
      <SuccessfulIcon className={block('icon')} />
      <div className={block('text')}>
        {ASSIGNMENT_DICTIONARY.success}
      </div>
      <div className={block('attempt')}>
        <div className={block('tries')}>
          <div className={block('tries-count')}>
            {[
              ASSIGNMENT_DICTIONARY.todayTries(todayTries, maxTries),
              ASSIGNMENT_DICTIONARY.approvedAt(approvedDate),
            ].join(' - ')}
          </div>
          <div className={block('tries-total')}>
            {ASSIGNMENT_DICTIONARY.totalTries(totalTries)}
          </div>
        </div>
        {isAutoAssignment(type) && (
          <div className={block('answer')}>
            {ASSIGNMENT_DICTIONARY.showResults}
          </div>
        )}
      </div>
    </section>
  );
};

AssignmentSuccess.defaultProps = defaultProps;

export default AssignmentSuccess;
