// @flow
import React, { PureComponent, Node } from 'react';
import { connect } from 'react-redux';
import { bemlds } from 'utils';
import { TopicType } from 'models';
import { getTopicsById } from 'redux/my-courses/topics/selectors';
import {
  CourseChapter,
  CourseSimpleChapter,
} from 'components';
import './styles.scss';

const defaultProps = {};

type PropsType = {
  isLinear: boolean,
  isConsistently: boolean,
  topics: Array<TopicType>
};

const b = bemlds('tree');

class CourseTree extends PureComponent<PropsType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {};
  }

  render(): Node {
    const {
      isLinear,
      topics,
      onTab,
    } = this.props;

    const Chapter = isLinear ? CourseSimpleChapter : CourseChapter;
    return (
      <section className={b()}>
        {topics && topics.length > 0
        && topics.map((
          {
            name,
            id,
            assignments,
            exams,
            lessons,
            isClosed,
            description,
          }: object,
        ): Node => (
          <Chapter
            key={id}
            isLocked={isClosed}
            title={name}
            assignmentIds={assignments}
            examIds={exams}
            lessonIds={lessons}
            description={description}
            onTab={onTab}
          />
        ))}
      </section>
    );
  }
}

CourseTree.defaultProps = defaultProps;

const mapStateToProps = (state: object, { topicIds }: object): object => ({
  topics: getTopicsById(state, { topics: topicIds }),
});

export default connect(mapStateToProps)(CourseTree);
