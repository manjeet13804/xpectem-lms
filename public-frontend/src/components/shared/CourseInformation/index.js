// @flow
import React, { Node } from 'react';
import { bemlds, stateEditorToHtml } from 'utils';
import { COURSE_INFORMATION } from 'localise';
import _ from 'lodash';
import { connect } from 'react-redux';
import { getTopicsById } from 'redux/my-courses/topics/selectors';
import CourseInfoSection from './Section';
import CourseInfoSectionWithImage from './SectionWithImage';
import './styles.scss';

const defaultProps = {};

type PropsType = {
    currentMyCourse: object
};

const block = bemlds('course-information');

const getSections = ({
  description,
  contentList,
  imageUri,
  length,
  examination,
  certifiedInfo,
}: object = {}): object[] => ([
  description && {
    id: 'description',
    component: (): Node => (
      <CourseInfoSection
        title={COURSE_INFORMATION.description}
        content={description}
      />
    ),
  },
  (contentList || imageUri) && {
    id: 'content',
    component: (): Node => (
      <CourseInfoSectionWithImage
        title={COURSE_INFORMATION.contentList}
        content={contentList}
        image={imageUri}
      />
    ),
  },
  length && {
    id: 'length',
    component: (): Node => (
      <CourseInfoSection
        title={COURSE_INFORMATION.length}
        content={length}
      />
    ),
  },
  examination && {
    id: 'examination',
    component: (): Node => (
      <CourseInfoSection
        title={COURSE_INFORMATION.examination}
        content={examination}
      />
    ),
  },
  certifiedInfo && {
    id: 'certifiedInfo',
    component: (): Node => (
      <CourseInfoSection
        title={COURSE_INFORMATION.certifiedInfo}
        content={certifiedInfo}
      />
    ),
  },
].filter(Boolean));

const rebuildCourse = (course, topics) => {
  const { translations } = course;
  const [translation] = translations;
  const description = stateEditorToHtml(_.get(translation, 'description', null));
  return {
    ...course,
    description,
  };
};

const CourseInformation = ({currentMyCourse, topics}: PropsType): Node => {
  const rebuildedCourse = rebuildCourse(currentMyCourse, topics);

  const sections = getSections(rebuildedCourse);
  return (
    <section className={block()}>
      {sections.map(
        ({
          id,
          component: Component,
        }: object): Node => <Component key={id} />,
      )}
    </section>
  );
};

CourseInformation.defaultProps = defaultProps;

const mapStateToProps = (state: object, { topicIds }: object): object => ({
  topics: getTopicsById(state, { topics: topicIds }),
});

export default connect(mapStateToProps)(CourseInformation);
