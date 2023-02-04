// @flow
import React, {
  Fragment,
  PureComponent,
  Node,
} from 'react';
import { connect } from 'react-redux';
import { bemlds } from 'utils';
import {
  SuccessfulIcon,
  NotLearnIcon,
  CircleProgressBar,
} from 'components';
import { getLessonsById } from 'redux/selectors';
import { Theme } from './components';
import './styles.scss';

type PropsType = {
  title: string,
  lessons: array[]
};

const b = bemlds('chapter-simple');

const iconType = (isViewed: boolean): string => (isViewed ? '2' : '1');

const sumCompleteLessons = (lessons: array[]): number => lessons
  .filter(({isViewed}: boolean): Node => isViewed).length;

const allLessons = (lessons: array[]): number => lessons.length;

const iconChapter = (lessons: array[]): Node => {
  if (sumCompleteLessons(lessons) === 0) {
    return (<NotLearnIcon className={b('status-notlearn')} />);
  }
  if (sumCompleteLessons(lessons) === allLessons(lessons)) {
    return (<SuccessfulIcon className={b('status-success')} />);
  }
  if (sumCompleteLessons(lessons) < allLessons(lessons)) {
    return (
      <CircleProgressBar
        completeThemes={sumCompleteLessons(lessons)}
        allThemes={allLessons(lessons)}
        className={b('status-image')}
      />
    );
  }
  return 0;
};

class CourseChapter extends PureComponent<PropsType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {};
  }

  render(): Node {
    const { title, lessons } = this.props;

    return (
      <Fragment>
        <div
          className={b()}
          role="button"
          tabIndex={0}
        >
          <div className={b('title')}>
            {lessons && iconChapter(lessons)}
            <div className={b('text')}>
              {title}
            </div>
          </div>
        </div>
        <section className={b('themes')}>
          {lessons && lessons.map(({name, id, isViewed}: object): Node => (
            <Theme
              key={id}
              title={name}
              learnStatus={iconType(isViewed)}
            />
          ))}
        </section>
      </Fragment>
    );
  }
}

const mapStateToProps = (
  state: object,
  {
    lessonIds,
  }: object,
): object => ({
  lessons: getLessonsById(state, { lessons: lessonIds }),
});

export default connect(mapStateToProps)(CourseChapter);
