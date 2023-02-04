// @flow
import React, { Node } from 'react';
import { bemlds } from 'utils';
import { sharedClass } from 'utils/className';
import { ASSIGNMENT_DICTIONARY } from 'localise';
import { AssignmentTypes, isManualAssignment } from 'models';
import './styles.scss';

const block = bemlds('assignment-description');

const defaultProps = {
  className: '',
};

type PropsType = {
    className?: string,
    type: $Values<AssignmentTypes>,
    maxTries: number
};

const AssignmentDescription = ({ className, type, maxTries }: PropsType): Node => (
  <div className={sharedClass(block(), className)}>
    {isManualAssignment(type)
      ? ASSIGNMENT_DICTIONARY.descriptionForManual
      : ASSIGNMENT_DICTIONARY.descriptionForAuto(maxTries)}
  </div>
);

AssignmentDescription.defaultProps = defaultProps;

export default AssignmentDescription;
