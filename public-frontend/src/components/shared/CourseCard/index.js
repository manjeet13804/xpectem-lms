// @flow
import React from 'react';
import type { Node } from 'react';

import block from 'utils/bem';
import { USER_ROLES_ENUM } from 'constants/enums';

import CourseAdminsCard from './components/CourseAdminsCard';
import CourseDefaultCard from './components/CourseDefaultCard';

import './course-card.scss';

const bem = block('course-card');

const DefaultProps = {
  course: {},
};

type PropType = {
  role: string,
  course?: object,
  goToPage: (string) => object
};

const CourseCard = (props: PropType): Node => {
  const { role, course, goToPage } = props;
  return (role === USER_ROLES_ENUM.none || role === USER_ROLES_ENUM.student)
    ? (
      <CourseDefaultCard
        course={course}
        bem={bem}
        role={role}
      />
    )
    : (
      <CourseAdminsCard
        course={course}
        bem={bem}
        role={role}
        goToPage={goToPage}
      />
    );
};
CourseCard.defaultProps = DefaultProps;

export default CourseCard;
