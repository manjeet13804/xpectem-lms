// @flow
import React, { Node } from 'react';
import { PopupContainer, ArrowRightInCircle } from 'components';
import { bemlds } from 'utils';
import { EXAM_DICTIOANARY } from 'localise';
import moment from 'moment';
import { DATE_FORMATS } from 'constants/constants';
import '../styles.scss';

const { passedAssignmentDate } = DATE_FORMATS;

const b = bemlds('exam-view');

type PropsType = {
    close: () => void
};

const ExamView = ({
  exam,
  close,
}: PropsType): Node => {
  const {
    url,
    name,
    maxTries,
    studentLogs = [],
    maxPoints,
    gradeA,
    gradeC,
    completedAt,
    isCompleted,
    isFailed,
    todayTries,
  } = exam;
  const points = studentLogs.length ? studentLogs.reverse()[0].points : 0;
  const percentFromNumber = ((points / maxPoints) * 100).toFixed(0);
  const getDiff = numberOfPoints => 100 - Number(((Number(numberOfPoints) / maxPoints) * 100).toFixed(0));
  const noTries = todayTries >= maxTries;
  const examFactory = (): Node => {
    if (isCompleted) {
      return (
        <>
          <div className={b('completed-title')}>
            {EXAM_DICTIOANARY.passedTitle(points, maxPoints)}
          </div>
          <div className={b('progress')}>
            <div className={b('background-layout')}>
              <div className={b('progress-result')} style={{height: `${percentFromNumber}%`}} />
              <div className={b('result-points')}>{points}</div>
              <div className={b('score')}>{EXAM_DICTIOANARY.scoreWord}</div>
              <div className={b('max-score')}>
                <div className={b('max-score-title')}>
                  {EXAM_DICTIOANARY.maxScore(maxPoints)}
                </div>
              </div>
              <div className={b('max-score', { left: true })} style={{ top: `${getDiff(gradeA)}%`}}>
                <div className={b('max-score-title', { left: true })}>
                  {EXAM_DICTIOANARY.goodPass(gradeA)}
                </div>
              </div>
              <div className={b('max-score', { left: true })} style={{ top: `${getDiff(gradeC)}%`}}>
                <div className={b('max-score-title', { left: true })}>
                  {EXAM_DICTIOANARY.minPass(gradeC)}
                </div>
              </div>
            </div>
          </div>
          <div className={b('atempt')}>
            {`${EXAM_DICTIOANARY.atempts(todayTries, maxTries)} - ${moment(completedAt).format(passedAssignmentDate)}`}
          </div>
        </>
      );
    }

    if (isFailed) {
      return (
        <>
          <div className={b('failed-title')}>
            {EXAM_DICTIOANARY.failedTitle}
          </div>
          <div className={b('progress')}>
            <div className={b('background-layout')}>
              <div className={b('progress-result', { error: true })} style={{height: `${percentFromNumber}%`}} />
              <div className={b('result-points', { error: true })}>{points}</div>
              <div className={b('score')}>{EXAM_DICTIOANARY.scoreWord}</div>
              <div className={b('max-score')}>
                <div className={b('max-score-title')}>
                  {EXAM_DICTIOANARY.maxScore(maxPoints)}
                </div>
              </div>
              <div className={b('max-score', { left: true })} style={{ top: `${getDiff(gradeA)}%`}}>
                <div className={b('max-score-title', { left: true })}>
                  {EXAM_DICTIOANARY.goodPass(gradeA)}
                </div>
              </div>
              <div className={b('max-score', { left: true })} style={{ top: `${getDiff(gradeC)}%`}}>
                <div className={b('max-score-title', { left: true })}>
                  {EXAM_DICTIOANARY.minPass(gradeC)}
                </div>
              </div>
            </div>
          </div>
          <div className={b('description')}>
            <p className={b('text')}>
              {EXAM_DICTIOANARY.descriptionFirst}
            </p>
            <p className={b('text')}>{EXAM_DICTIOANARY.descriptionSecond(maxTries)}</p>
            <p className={b('text')}>{EXAM_DICTIOANARY.descriptionThird}</p>
          </div>
          <div className={b('atempt')}>
            {`${EXAM_DICTIOANARY.atempts(todayTries, maxTries)} - ${moment(completedAt).format(passedAssignmentDate)}`}
            <p className={b('text')}>
              {noTries && EXAM_DICTIOANARY.scoresLimit(maxTries)}
            </p>
          </div>
          {!noTries && (
          <div className={b('footer-btn')}>
            <a href={url} target="_blank" rel="noopener noreferrer" className={b('button')}>
              {EXAM_DICTIOANARY.start}
              <ArrowRightInCircle className={b('icon')} />
            </a>
          </div>
          )}
          <div className={b('footer')}>
            <div className={b('points-text')}>
              {EXAM_DICTIOANARY.maxScoreWord}
            </div>
            <div className={b('big-points')}>{maxPoints}</div>
            <div className={b('points-text')}>
              {EXAM_DICTIOANARY.passReq}
            </div>
            <div className={b('big-points')}>{gradeC}</div>
            <div className={b('points-text')}>
              {EXAM_DICTIOANARY.passMax}
            </div>
            <div className={b('big-points')}>{gradeA}</div>
          </div>
        </>
      );
    }

    return (
      <>
        <div className={b('description')}>
          <p className={b('text')}>
            {EXAM_DICTIOANARY.descriptionFirst}
          </p>
          <p className={b('text')}>{EXAM_DICTIOANARY.descriptionSecond(maxTries)}</p>
          <p className={b('text')}>{EXAM_DICTIOANARY.descriptionThird}</p>
        </div>
        <div className={b('atempt')}>
          {EXAM_DICTIOANARY.atempts(todayTries, maxTries)}
        </div>
        <div className={b('footer-btn')}>
          <a href={url} target="_blank" rel="noopener noreferrer" className={b('button')}>
            {EXAM_DICTIOANARY.start}
            <ArrowRightInCircle className={b('icon')} />
          </a>
        </div>
        <div className={b('footer')}>
          <div className={b('points-text')}>
            {EXAM_DICTIOANARY.maxScoreWord}
          </div>
          <div className={b('big-points')}>{maxPoints}</div>
          <div className={b('points-text')}>
            {EXAM_DICTIOANARY.passReq}
          </div>
          <div className={b('big-points')}>{gradeC}</div>
          <div className={b('points-text')}>
            {EXAM_DICTIOANARY.passMax}
          </div>
          <div className={b('big-points')}>{gradeA}</div>
        </div>
      </>
    );
  };

  return (
    <PopupContainer close={close}>
      <div className={b()}>
        <div className={b('title')}>
          {EXAM_DICTIOANARY.title(name)}
        </div>
        {examFactory()}
      </div>
    </PopupContainer>
  );
};


export default ExamView;
