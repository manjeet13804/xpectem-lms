// @flow
import React, {
  Fragment,
  PureComponent,
  Node,
} from 'react';
import { connect } from 'react-redux';
import { bemlds } from 'utils';
import { completeAssignment, startAssignment } from 'redux/actions';
import { getLessonsById, getAssignmentsById, getExamsById } from 'redux/selectors';
import {
  SuccessfulIcon,
  NotLearnIcon,
  ArrowDown,
  ArrowUp,
  LockIcon,
  CircleProgressBar,
  Assignments,
} from 'components';
import { Theme } from './components';
import Exams from '../Exams/index';
import './styles.scss';

const DefaultProps = {
  chapterStatus: false,
};

type PropsType = {
  isLocked: boolean,
  chapterStatus?: boolean,
  title: string,
  assignments: object[],
  exams: object[],
  lessons: object[]
};

const b = bemlds('chapter');

const iconType = (isViewed: boolean): string => (isViewed ? 2 : 1);

const sumCompleteLessons = (lessons: object[]): number => lessons
  .filter(({isViewed}: boolean): Node => isViewed).length;

const allLessons = (lessons: object[]): number => lessons.length;

const iconChapter = (lessons: object[]): Node => {
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
    this.state = {
      openChapter: props.chapterStatus,
    };
  }

  clickChapter = () => {
    const { openChapter } = this.state;
    const { isLocked } = this.props;

    if (isLocked) {
      return;
    }

    this.setState({ openChapter: !openChapter });
  };

  newDesc = blocks => blocks.map(item => <p key={item.key}>{item.text}</p>);

  render(): Node {
    const { openChapter } = this.state;
    const {
      title,
      assignments,
      exams,
      lessons,
      isLocked,
      onTab,
      description,
      ...actions
    } = this.props;

    const parseDesc = JSON.parse(description);

    return (
      <Fragment>
        <div className={b('border')}>
          <div
            className={b({ active: openChapter, locked: isLocked })}
            onClick={(): SyntheticEvent => this.clickChapter()}
            role="button"
            tabIndex={0}
          >
            <div className={b('title')}>
              {lessons && iconChapter(lessons)}
              <div className={b('text')}>
                {title}
              </div>
            </div>
            {isLocked
              ? (
                <div className={b('lock')}>
                  <LockIcon />
                </div>
              )
              : (
                <div className={b('arrow')}>
                  {openChapter ? <ArrowUp /> : <ArrowDown /> }
                </div>
              )
          }
          </div>
          { openChapter && (
          <section>
            {parseDesc && (
            <div className={b('description')}>
              {this.newDesc(parseDesc.blocks)}
            </div>
            )}
            {lessons && lessons.length > 0 && (
              <section>
                {lessons.map(({
                  id,
                  name,
                  isViewed,
                  url,
                }: object): Node => (
                  <Theme key={id} title={name} learnStatus={iconType(isViewed)} url={url} />
                ))}
              </section>
            )}
            {assignments && (
            <Assignments
              assignments={assignments}
              startAssignment={actions.startAssignment}
              completeAssignment={actions.completeAssignment}
              onTab={onTab}
            />
            )}
            {exams && exams.length > 0 && (
              <section className={b('exam')}>
                <div className={b('exam-title')}>Exam</div>
                <div className={b('exam-text')}>
                  Select an exam below for more information how
                  to take the exam and what score you need to pass.
                </div>
                <Exams exams={exams} />
              </section>
            )}
          </section>
          )}
        </div>
      </Fragment>
    );
  }
}

CourseChapter.defaultProps = DefaultProps;


const mapStateToProps = (
  state: object,
  {
    lessonIds,
    assignmentIds,
    examIds,
  }: object,
): object => ({
  lessons: getLessonsById(state, { lessons: lessonIds }),
  assignments: getAssignmentsById(state, { assignments: assignmentIds }),
  exams: getExamsById(state, { exams: examIds }),
});

const mapDispatchToProps = {
  startAssignment,
  completeAssignment,
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseChapter);
