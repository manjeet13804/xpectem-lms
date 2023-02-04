// @flow
import React, { Node } from 'react';
import { NavLink } from 'react-router-dom';
import { parseISO, differenceInCalendarDays } from 'date-fns';
import { bemlds } from 'utils';
import { TERM_SHARED } from 'localise';
import { STUDENT_COURSE_PATHS } from 'constants/paths';
import { MyCourseFullType } from 'models';
import { HorizontalProgressBar } from 'components';
import './styles.scss';
import { COURSE_INFORMATION } from '../../../localise/en';
import defaultImage from '../../../assets/images/no-image.png';

const { daysLeft, leftToStudy, toTheCourse } = TERM_SHARED;

const b = bemlds('student-course-card');

const DefaultProps = {
  className: '',
};

type PropType = {
  className?: string,
  data: MyCourseFullType
};

const StudentCourseCard = ({className, data}: PropType): Node => {
  const {
    id,
    title,
    imageUri,
    isCertified,
    student: {
      startAt,
      doneAt,
      studyPlan: {
        wishedDoneDate: accessUntil,
      },
      leftDays,
    },
  } = data;

  const isNotDone = !doneAt;

  const isHasntInfinityAccess = !!accessUntil;

  const isStudyPlanNotCompleted = Boolean(leftDays);

  const dateNow = new Date();

  const days = differenceInCalendarDays(
    parseISO(accessUntil),
    parseISO(startAt),
  );

  const daysReminder = differenceInCalendarDays(
    parseISO(accessUntil),
    dateNow,
  );

  const daysBeforeStart = differenceInCalendarDays(
    parseISO(startAt),
    dateNow,
  );

  const daysByStudyPlan = differenceInCalendarDays(
    parseISO(accessUntil),
    parseISO(startAt),
  );

  const daysLeftValue = () => {
    if (daysBeforeStart >= 0) {
      return days;
    }
    if (daysReminder > 0) {
      return daysReminder;
    }
    return 0;
  };

  const daysProgress = `${daysReminder / days * 100}%`;

  const studyProgressInPercents = daysReminder / daysByStudyPlan * 100;

  const studyProgress = `${studyProgressInPercents}%`;

  return (
    <article className={b({mix: className})}>
      <img className={b('img')} src={imageUri || defaultImage} alt={title} />
      <div className={b('info-block')}>
        <span className={b('title')}>{title}</span>
        {isNotDone && (
        <>
          {isHasntInfinityAccess && (
          <div className={b('progress-block')}>
            <div className={b('progress-text')}>
              <span className={b('progress-name')}>{daysLeft}</span>
              <span className={b('progress-value')}>{daysLeftValue()}</span>
            </div>
            <HorizontalProgressBar progress={daysProgress} className={b('progress-bar')} />
          </div>
          )}
          {isStudyPlanNotCompleted && (
          <div className={b('progress-block')}>
            <div className={b('progress-text')}>
              <span className={b('progress-name')}>{leftToStudy}</span>
              <span className={b('progress-value')}>{daysBeforeStart >= 0 ? '100%' : `${studyProgressInPercents.toFixed(0)}%`}</span>
            </div>
            <HorizontalProgressBar progress={studyProgress} className={b('progress-bar')} />
          </div>
          )}
        </>
        )}
        {isCertified && <p>{COURSE_INFORMATION.isCertified}</p>}
        <NavLink className={b('btn')} to={STUDENT_COURSE_PATHS.topics(id)}>{toTheCourse}</NavLink>
      </div>
    </article>
  );
};

StudentCourseCard.defaultProps = DefaultProps;

export default StudentCourseCard;
