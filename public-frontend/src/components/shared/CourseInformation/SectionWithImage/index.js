// @flow
import React, { Node } from 'react';
import { bemlds } from 'utils';
import CourseInfoSection from '../Section';
import './styles.scss';

const defaultProps = {
  image: null,
};

type PropsType = {
    title: string,
    content: string,
    image?: string
};

const block = bemlds('course-info-section-with-image');

const CourseInfoSectionWithImage = ({ title, content, image }: PropsType): Node => (
  <div className={block()}>
    {content && (
      <CourseInfoSection
        className={block('content')}
        title={title}
        content={content}
      />
    )}
    {image && <img className={block('image')} src={image} alt={title} />}
  </div>
);

CourseInfoSectionWithImage.defaultProps = defaultProps;

export default CourseInfoSectionWithImage;
