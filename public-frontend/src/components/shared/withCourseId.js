// @flow
import React, { AbstractComponent } from 'react';
import { withRouter, ContextRouter } from 'react-router-dom';

const defaultProps = {};

type PropType = ContextRouter;

type InjectedPropType = {
    courseId: number
};

function withCourseId<Config: {}>(
  Component: AbstractComponent<Config>,
): React.AbstractComponent<Config & InjectedPropType> {
  const CourseIdWrap = (
    {
      match: {
        params: {
          id: courseId,
        },
      },
      ...props
    }: PropType,
  ): Node => <Component courseId={courseId} {...props} />;

  CourseIdWrap.displayName = `withCourseId (${Component.displayName})`;
  CourseIdWrap.defaultProps = defaultProps;

  return withRouter(CourseIdWrap);
}

export default withCourseId;
