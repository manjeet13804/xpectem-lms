// @flow
import React, { Node } from 'react';
import { bemlds } from 'utils';
import {sharedClass} from 'utils/className';
import './styles.scss';

const defaultProps = {
  className: '',
};

type PropsType = {
    className?: string,
    title: string,
    content: string
};

const block = bemlds('course-info-section');

const CourseInfoSection = ({ className, title, content }: PropsType): Node => (
  <div className={sharedClass(block(), className)}>
    <h3 className={block('title')}>{title}</h3>
    <div
      dangerouslySetInnerHTML={{
        __html: content,
      }}
    />
  </div>
);

CourseInfoSection.defaultProps = defaultProps;

export default CourseInfoSection;
