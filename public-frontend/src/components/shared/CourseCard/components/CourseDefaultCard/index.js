// @flow
import React, { Node } from 'react';
import { PATHS } from 'constants/paths';
import {
  TERM_SHARED,
} from 'localise';

import {
  PeopleIcon,
  FavoriteOutlineIcon,
} from 'components';

import { ImgCard } from '..';

const DefaultProps = {
  course: {},
};

type PropType = {
  course?: object,
  bem: (string | object | null) => string
};

const CourseDefaultCard = (props: PropType): Node => {
  const { course, bem } = props;
  const {
    img,
    title,
    text,
    like,
    students,
  } = course;
  return (
    <article className={bem({default: true})}>
      {
        img && (
          <ImgCard
            img={img}
            title={title}
            bem={bem}
          />
        )
      }
      <div className={bem('info')}>
        <h1 className={bem('title')}>{title && title}</h1>
        <p className={bem('text')}>{text && text}</p>
        <a className={bem('link')} href={PATHS.courses}>{TERM_SHARED.read_more_about_coure}</a>
        <div className={bem('statistic-block')}>
          <p className={bem('students')}>
            <PeopleIcon
              className={bem('svg')}
            />
            {students || 0}
          </p>
          <p className={bem('like')}>
            <FavoriteOutlineIcon
              className={bem('svg')}
            />
            {like || 0}
          </p>
        </div>
      </div>
    </article>
  );
};
CourseDefaultCard.defaultProps = DefaultProps;

export default CourseDefaultCard;
