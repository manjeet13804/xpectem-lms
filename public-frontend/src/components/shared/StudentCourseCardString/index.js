// @flow
import React, { Node } from 'react';
import { bemlds } from 'utils';
import { TERM_SHARED } from 'localise';
import { STUDENT_COURSE_PATHS } from 'constants/paths';
import { NavLink } from 'react-router-dom';
import { MyCourseFullType } from 'models';
import './styles.scss';
import defaultImage from '../../../assets/images/no-image.png';

const { toTheCourse } = TERM_SHARED;

const b = bemlds('student-course-card-string');

const DefaultProps = {
  className: '',
};

type PropType = {
  className?: string,
  data: MyCourseFullType
};

const StudentCourseCardString = ({ className, data }: PropType): Node => {
  const {
    id,
    title,
    imageUri,
  } = data;

  return (
    <article className={b({mix: className})}>
      <img className={b('img')} src={imageUri || defaultImage} alt={title} />
      <div className={b('info')}>
        <span className={b('title')}>{title}</span>
        <NavLink className={b('btn')} to={STUDENT_COURSE_PATHS.topics(id)}>{toTheCourse}</NavLink>
      </div>
    </article>
  );
};

StudentCourseCardString.defaultProps = DefaultProps;

export default StudentCourseCardString;
