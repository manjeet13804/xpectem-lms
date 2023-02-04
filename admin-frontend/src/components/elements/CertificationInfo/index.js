import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import {
  DATE_FORMATS,
} from 'constants/constants';
import IntlMessages from 'components/utility/intlMessages';
import { bemlds } from 'utils';
import CertificationInfoWrapper from './certificationInfo.style';

const ci = bemlds('certification-info');
const { yearMonthDay } = DATE_FORMATS;


const CertificationInfo = (props) => {
  const {
    place,
    booked,
    paid,
  } = props;

  const generateItem = (titleId, data) => data && (
    <div className={ci('item')}>
      <div className={ci('item-title')}>
        <IntlMessages id={titleId} />
      </div>
      <div className={ci('item-data')}>
        {data}
      </div>
    </div>
  );

  const dateParse = (data) => {
    const date = data !== '' ? moment(data).format(yearMonthDay) : data;
    return date;
  };

  return (
    <CertificationInfoWrapper>
      <section className={ci()}>
        <div className={ci('item-title')}>
          {place}
        </div>
        <div className={ci('items-wrapper')}>
          {generateItem(
            'communication.testMaxScore',
            dateParse(booked),
          )}
          {generateItem(
            'communication.testRequelresScore',
            dateParse(paid),
          )}
        </div>
      </section>
    </CertificationInfoWrapper>
  );
};

CertificationInfo.defaultProps = {
  place: '',
  booked: '',
  paid: '',
};

CertificationInfo.propTypes = {
  place: PropTypes.string,
  booked: PropTypes.string,
  paid: PropTypes.string,
};

export default CertificationInfo;
