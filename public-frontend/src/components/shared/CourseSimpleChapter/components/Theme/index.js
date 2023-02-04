// @flow
import React, { Node } from 'react';
import { bemlds } from 'utils';
import {
  CircleIcon,
  ArrowRight,
  withHover,
} from 'components';
import './styles.scss';

const getStatusStyle = (status: 1 | 2): object => ({
  [status === 1 ? 'notlearn' : 'learn']: true,
});

const defaultProps = {};

type PropsType = {
  title: string,
  learnStatus: number
};

const block = bemlds('theme');

const Theme = withHover(
  ({
    title,
    learnStatus,
    isHover,
    onMouseEnter,
    onMouseLeave,
  }: PropsType): Node => (
    <div
      className={block()}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role="button"
      tabIndex={0}
    >
      <div className={block('title')}>
        <CircleIcon
          className={block('status', getStatusStyle(learnStatus))}
        />
        <div className={block('text')}>
          {title}
        </div>
      </div>
      {isHover && (
      <div className={block('next')}>
        <ArrowRight className={block('next-arrow')} />
        <div className={block('next-text')}>
                Continue studying
        </div>
      </div>
      )}
    </div>
  ),
);

Theme.defaultProps = defaultProps;

export default Theme;
