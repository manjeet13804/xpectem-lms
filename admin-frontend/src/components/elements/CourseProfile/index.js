import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import {
  DATE_FORMATS,
} from 'constants/constants';
import { bemlds } from 'utils';
import IntlMessages from 'components/utility/intlMessages';
import CourseProfileWrapper from './courseProfile.style';

const cp = bemlds('course-profile');
const { yearMonthDay } = DATE_FORMATS;

const CourseProfile = (props) => {
  const {
    title,
    orderer,
    targetGroup,
    price,
    dateBegin,
    dateEnd,
    activationDate,
    sentDate,
  } = props;

  const dateParse = (data) => {
    const date = data !== '' ? moment(data).format(yearMonthDay) : data;
    return date;
  };


  const generateItem = (titleId, data) => {
    const item = (data !== '') ? (
      <div className={cp('item')}>
        <div className={cp('item-title')}>
          <IntlMessages id={titleId} />
        </div>
        <div className={cp('item-data')}>
          {data}
        </div>
      </div>
    ) : null;
    return item;
  };

  return (
    <CourseProfileWrapper>
      <section className={cp()}>
        <div className={cp('title')}>
          {title}
        </div>
        {generateItem('communication.order', orderer)}
        {generateItem('communication.courseGroup', targetGroup)}
        {generateItem('communication.coursePrice', price)}
        {generateItem('communication.courseDateBegin', dateParse(dateBegin))}
        {generateItem('communication.courseDateEnd', dateParse(dateEnd))}
        {generateItem('communication.courseActivationDate', dateParse(activationDate))}
        {generateItem('communication.courseSentDate', dateParse(sentDate))}
      </section>
    </CourseProfileWrapper>

  );
};

CourseProfile.defaultProps = {
  title: '',
  orderer: '',
  targetGroup: '',
  price: null,
  dateBegin: '',
  dateEnd: '',
  activationDate: '',
  sentDate: '',
};

CourseProfile.propTypes = {
  title: PropTypes.string,
  orderer: PropTypes.string,
  targetGroup: PropTypes.string,
  price: PropTypes.number,
  dateBegin: PropTypes.string,
  dateEnd: PropTypes.string,
  activationDate: PropTypes.string,
  sentDate: PropTypes.string,
};

export default CourseProfile;
