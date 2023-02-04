// @flow
import React, { Node } from 'react';
import block from 'utils/bem';
import {
  NEW_COURSE_DICTIONARY,
} from 'localise';

import { ArrowIcon } from 'components';

import './new-course.scss';

const bem = block('new-course');

type PropType = {
  clickHandler: () => void
};

const NewCourseCard = (props: PropType): Node => {
  const { clickHandler } = props;
  return (
    <article className={bem()}>
      <div className={bem('img-container')} />
      <div
        className={bem('info')}
        onClick={clickHandler}
        role="button"
        tabIndex="0"
      >
        <h1 className={bem('title')}>{NEW_COURSE_DICTIONARY.newCourse}</h1>
        <div className={bem('container')}>
          <p className={bem('text')}>{NEW_COURSE_DICTIONARY.createNewCourse}</p>
          <ArrowIcon className={bem('svg')} />
        </div>
      </div>
    </article>
  );
};
export default NewCourseCard;
