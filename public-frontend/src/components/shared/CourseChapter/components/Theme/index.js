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

const mockFunc = () => null;

const Theme = withHover(
  (
    {
      title,
      learnStatus,
      isHover,
      onMouseEnter,
      onMouseLeave,
      url,
      onClickExam,
    }: PropsType,
  ): Node => (!url ? (
    <div
      className={block()}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role="button"
      tabIndex={0}
      onClick={onClickExam || mockFunc}
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
          Start the exam
        </div>
      </div>
      )}
    </div>
  )
    : (
      <a
        className={block()}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        role="button"
        tabIndex={0}
        href={`https://${url}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClickExam || mockFunc}
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
      </a>
    )
  ),
);

Theme.defaultProps = defaultProps;

export default Theme;
