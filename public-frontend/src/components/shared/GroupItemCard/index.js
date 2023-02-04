// @flow
import React from 'react';
import type { Node } from 'react';
import block from 'utils/bem';
import { btnIcon, sharedClass } from 'utils/className';
import {
  MoreIcon,
  StatsContent,
  Checkbox,
} from 'components';
import getRenderData from './utils';

import './group-item-card.scss';

const bem = block('group-item');

const DefaultProps = {
  data: {
    title: '',
    students: 0,
    courses: 0,
    active: 0,
  },
  className: '',
};

type PropType = {
  data?: object,
  className?: string,
  openPopup: () => void,
  checkItem: (boolean, string) => void
};

const GroupItemCard = (props: PropType): Node => {
  const {
    data,
    className,
    checkItem,
    openPopup,
  } = props;
  const {
    id,
    name,
    students,
    courses,
    active,
  } = data;
  const statsData = getRenderData(students, courses, active);
  const mainClass = sharedClass(bem, className);
  return (
    <section className={mainClass}>
      <Checkbox
        bem={bem}
        id={id}
        text={name}
        handleChange={checkItem}
      />
      <StatsContent
        statsData={statsData}
        bem={bem}
      />
      <button
        type="button"
        className={btnIcon(bem)}
        onClick={openPopup}
      >
        <MoreIcon />
      </button>
    </section>
  );
};
GroupItemCard.defaultProps = DefaultProps;
export default GroupItemCard;
