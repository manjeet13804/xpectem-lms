// @flow
import React, {Node} from 'react';
import isURL from 'validator/es/lib/isURL';
import { MyCourseType } from 'models';
import { bemlds } from 'utils';
import moment from 'moment';
import fileShape from 'assets/images/file_shape.png';
import { Link } from 'react-router-dom';
import { STUDENT_COURSE_PATHS } from 'constants/paths';
import {connect} from 'react-redux';
import { STUDYPLAN } from 'localise';
import Loader from 'components/elements/CustomLoader';
import { DATE_FORMATS, ERRORS, CERTIFICATES_DICTIONARY } from '../../../../../constants/constants.js';
import './styles.scss';
import { COURSE_INFORMATION } from '../../../../../localise/en/index.js';
import { getWelcomeLetterUrl, getWelcomeLetterRichText } from '../../../../../redux/my-courses/actions';

const { dayMonthYear, courseEnded } = DATE_FORMATS;
const { courseNoAccessTime } = ERRORS;
const { certificateWord, courseAccess } = CERTIFICATES_DICTIONARY;
const {
  needMoreTime,
  accordingDaysLeft,
  numberDaysLeft,
  finalDate,
  startDate,
  welcomeLetter,
  studyplanReadYourCourse,
} = STUDYPLAN;

const b = bemlds('block');

type PropsType = {
  course: MyCourseType
};

const defaultProps = {
  certificate: {},
};

const rebuildFileName = name => name && name.split('.')[0];

const CourseInfo = ({
  course,
  isTimeAccess,
  getWelcomeLetterUrl,
  getWelcomeLetterRichText,
  isLoadingMyCourses,
}): Node<PropsType> => {
  const {
    id: courseId,
    certificate,
    isCertified,
    time: {
      access,
    },
    student: {
      startAt,
      doneAt,
      leftDays: allDays,
      accessUntil,
      studyPlan: {
        leftDays,
      },
    },
    welcomeLetterTemplate,
    id,
    translations,
  } = course;
  const { originalName } = certificate || {};

  const handleClick = () => {
    isURL(welcomeLetterTemplate)
      ? getWelcomeLetterUrl(id, welcomeLetterTemplate)
      : getWelcomeLetterRichText(id, translations[0].welcomeLetter);
  };

  return (
    <section className={b()}>
      {isLoadingMyCourses ? (
        <Loader />
      ) : (
        <>
          {isCertified && <p>{COURSE_INFORMATION.isCertified}</p>}
          {Boolean(doneAt) && isTimeAccess && (
            <>
              <div className={b('title')}>{`The course is completed: ${moment(doneAt).format(courseEnded)}`}</div>
              {isCertified && (
                <div>
                  <div className={b('certificate')}>{certificateWord}</div>
                  <div className={b('certificate-file')}>
                    <img className={b('certificate-file-img')} src={fileShape} alt="file-shape" />
                    <div className={b('certificate-file-text')}>{rebuildFileName(originalName)}</div>
                  </div>
                </div>
              )}
            </>
          )}
          {isTimeAccess && (
          <div className={b('welcome')}>
            <div className={b('welcome-title')}>
              <div className={b('welcome-title-letter')}>
                {welcomeLetter}
                {'. '}
              </div>
              <div className={b('welcome-title-before')}>{studyplanReadYourCourse}</div>
            </div>
            <div className={b('welcome-file')}>
              <img className={b('welcome-file-img')} src={fileShape} alt="file-shape" />
              {(welcomeLetterTemplate || translations)
                ? (
                  <div
                    onClick={handleClick}
                    className={b('welcome-file-text')}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Welcome letter
                  </div>
                )
                : <div className={b('welcome-file-text')}>Welcome letter</div>
              }
            </div>
          </div>
          )}
          {isTimeAccess && <div className={b('access')}>{courseAccess(access)}</div>}
          {!isTimeAccess && <div className={b('no-time-title')}>{courseNoAccessTime}</div>}
          <hr className={b('line')} />
          <div className={b('stats')}>
            <div className={b('stats-date')}>
              <div className={b('stats-text')}>{startDate}</div>
              <div className={b('stats-number')}>{moment(startAt).format(dayMonthYear)}</div>
            </div>
            <div className={b('stats-date')}>
              <div className={b('stats-text')}>{finalDate}</div>
              <div className={b('stats-number')}>{moment(accessUntil).format(dayMonthYear)}</div>
            </div>
            <div className={b('stats-date')}>
              <div className={b('stats-text')}>{numberDaysLeft}</div>
              <div className={b('stats-number')}>{isTimeAccess ? allDays : 0}</div>
            </div>
            {isTimeAccess && (
            <div className={b('stats-date')}>
              <div className={b('stats-text')}>{accordingDaysLeft}</div>
              <div className={b('stats-number')}>{leftDays}</div>
            </div>
            )}
          </div>
          <Link
            to={{
              pathname: STUDENT_COURSE_PATHS.communication(courseId),
            }
              }
          >
            <div className={b('contact-text')}>
              {needMoreTime}
            </div>
          </Link>
        </>
      )}
    </section>
  );
};

const mapStateToProps = (state) => {
  const currentCourse = state.myCourses.byId;
  const isLoadingMyCourses = state.myCourses.isLoading;

  return {
    currentCourse,
    isLoadingMyCourses,
  };
};

CourseInfo.defaultProps = defaultProps;

export default connect(
  mapStateToProps,
  {getWelcomeLetterUrl, getWelcomeLetterRichText},
)(CourseInfo);
