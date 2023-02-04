// @flow
import React, { Node } from 'react';
import { withRouter, RouterHistory } from 'react-router-dom';
import { bemlds } from 'utils';
import { sharedClass } from 'utils/className';
import { ASSIGNMENT_DICTIONARY } from 'localise';
import { STUDENT_COURSE_PATHS } from 'constants/paths';
import { AssignmentTypes } from 'models';
import {ArrowRightInCircle, withCourseId} from 'components';
import './styles.scss';

const goToCommunication = (
  courseId: number,
  history: RouterHistory,
): void => history.push(
  STUDENT_COURSE_PATHS.communication(courseId),
);

const block = bemlds('attempt-button');

const defaultProps = {
  className: '',
  startAssignment: () => {},
  completeAssignment: () => {},
};

type BaseVariationPropsType = {
    className: string,
    id: number,
    isNotStarted: boolean,
    startAssignment: (id: number) => void
};

type PropsForManualType = BaseVariationPropsType & {
    courseId: number
};

type PropsForAutoType = BaseVariationPropsType & {
    completeAssignment: (id: number) => void
};

type PropsType = $Diff<BaseVariationPropsType,
    { className: *, startAssignment: * }>
    & {
    className?: string,
    type: $Values<AssignmentTypes>,
    startAssignment?: (id: number) => void,
    completeAssignment?: (id: number) => void
};

const VARIATIONS = {
  [AssignmentTypes.File]: withCourseId(
    withRouter(
      (
        {
          className,
          id,
          courseId,
          isNotStarted,
          startAssignment,
          history,
          closeModal = () => null,
          onTab = () => null,
        }: PropsForManualType,
      ): Node => {
        const onClick = () => {
          if (isNotStarted) {
            startAssignment(id);
          }

          closeModal();
          onTab('communication');
          goToCommunication(courseId, history);
        };

        return (
          <button
            type="button"
            className={className}
            onClick={onClick}
          >
            {isNotStarted
              ? ASSIGNMENT_DICTIONARY.submit
              : ASSIGNMENT_DICTIONARY.goToCommunication}
            <ArrowRightInCircle className={block('icon')} />
          </button>
        );
      },
    ),
  ),
  [AssignmentTypes.WebForm]:
    (
      {
        className,
        id,
        isNotStarted,
        startAssignment,
        completeAssignment,
        link,
      }: PropsForAutoType,
    ): Node => {

      return (
        <a
          type="button"
          className={className}
          href={link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {isNotStarted
            ? ASSIGNMENT_DICTIONARY.start
            : ASSIGNMENT_DICTIONARY.complete}
          <ArrowRightInCircle className={block('icon')} />
        </a>
      );
    },
};

const AttemptButton = (
  {
    className,
    type,
    ...rest
  }: PropsType,
): Node => {
  const Button = VARIATIONS[type] || null;

  return (
    <Button
      className={sharedClass(block(), className, 'btn', 'btn--text')}
      {...rest}
    />
  );
};

AttemptButton.defaultProps = defaultProps;

export default AttemptButton;
