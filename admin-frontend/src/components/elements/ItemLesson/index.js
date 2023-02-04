import React  from 'react';
import { bemlds } from 'utils';
import { Icon } from 'antd';
import ItemLessonWrapper from './itemLesson.style';

const b = bemlds('item-lesson');

const ItemLesson = ({
  lesson = {},
}) => {
  const {
    name,
    studentLogs,
  } = lesson;

  return (
    <ItemLessonWrapper>
      <div
        className={b()}
        role="button"
        tabIndex={-1}
      >
        <div className={b('left')}>
          <div className={b('circle')}>
            <Icon
              theme="filled"
              className={b('icon', { notGreen: !studentLogs.length }).toString()}
            />
          </div>
          <div className={b('text')}>{name}</div>
        </div>
        <div className={b('right')}>
          <Icon
            className={b('arrow')}
            type="arrow-right"
          />
        </div>
      </div>
    </ItemLessonWrapper>
  );
};

export default ItemLesson;
