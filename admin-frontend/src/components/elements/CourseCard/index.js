import React, { Component } from 'react';
import { bemlds } from 'utils';
import { TITLE, DATE_FORMATS } from 'constants/constants';
import moment from 'moment';
import CourseCardWrapper from './courseCard.style';

const {
  languageTitle,
  categoriesTitle,
  createdAtTitle,
  courseIntroductionTitle,
  certificateTitle,
  courseLengthTitle,
} = TITLE;

const { yearMonthDay } = DATE_FORMATS;

const b = bemlds('course-card');

class CourseCard extends Component {
  returnLangOfNumber = (id) => {
    switch (id) {
      case 1:
        return 'English';
      case 2:
        return 'Svenska';
      case 3:
        return 'Norsk';

      default:
        return null;
    }
  };

  render() {
    const { item = {}, text } = this.props;
    const {
      title,
      language,
      categories,
      shortDescription,
      certifiedInfo,
      length,
      createdAt,
    } = item;
    const dateCreateCourse = moment(createdAt).format(yearMonthDay);

    return (
      <CourseCardWrapper>
        <div className={b()}>
          {text && (
            <div className={b('text-info')}>
              {text}
            </div>
          )}
          {title && (
            <div className={b('title-main')}>
              {title}
            </div>
          )}
          {language && language.id && (
            <div className={b('option')}>
              {`${languageTitle} ${this.returnLangOfNumber(language.id)}`}
            </div>
          )}
          {categories && categories.length > 0 && (
            <div className={b('option')}>
              {`${categoriesTitle}`}
              {categories.map(({ id, name }) => (
                <span key={id}>
                  {name}
                </span>
              ))}
            </div>
          )}
          {!text && (
            <div className={b('option')}>
              {`${createdAtTitle} ${dateCreateCourse}`}
            </div>
          )}
          {length && (
            <div>
              <div className={b('title')}>
                {courseLengthTitle}
              </div>
              <div className={b('text')}>
                {length}
              </div>
            </div>
          )}
          {shortDescription && (
            <div>
              <div className={b('title')}>
                {certificateTitle}
              </div>
              <div className={b('text')}>
                {shortDescription}
              </div>
            </div>
          )}
          {certifiedInfo && (
            <div>
              <div className={b('title')}>
                {courseIntroductionTitle}
              </div>
              <div className={b('text')}>
                {certifiedInfo}
              </div>
            </div>
          )}
        </div>
      </CourseCardWrapper>
    );
  }
}

export default CourseCard;
