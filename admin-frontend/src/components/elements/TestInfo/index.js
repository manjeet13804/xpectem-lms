import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import {
  DATE_FORMATS,
} from 'constants/constants';
import IntlMessages from 'components/utility/intlMessages';
import { bemlds } from 'utils';
import TestInfoWrapper from './testInfo.style';

const ti = bemlds('test-info');
const { yearMonthDay } = DATE_FORMATS;


const TestInfo = (props) => {
  const {
    title,
    maxScore,
    requelresScore,
    requiresScore,
    timed,
  } = props;

  const generateItem = (titleId, data, styles = {}) => {
    const {
      main = false,
      second = false,
    } = styles;
    const item = (data !== '') ? (
      <div className={ti('item')}>
        <div className={ti('item-title')}>
          <IntlMessages id={titleId} />
        </div>
        <div className={ti('item-data', { main, second })}>
          {data}
        </div>
      </div>
    ) : null;
    return item;
  };

  const dateParse = (data) => {
    const date = data !== '' ? moment(data).format(yearMonthDay) : data;
    return date;
  };

  return (
    <TestInfoWrapper>
      <section className={ti()}>
        <div className={ti('title')}>
          {title}
        </div>
        <div className={ti('items-wrapper')}>
          {generateItem(
            'communication.testMaxScore',
            maxScore,
            { main: true },
          )}
          {generateItem(
            'communication.testRequelresScore',
            requelresScore,
            { second: true },
          )}
          {generateItem(
            'communication.testRequiresScore',
            requiresScore,
            { second: true },
          )}
          {generateItem('communication.testTimed', dateParse(timed))}
        </div>
      </section>
    </TestInfoWrapper>
  );
};

TestInfo.defaultProps = {
  title: '',
  maxScore: null,
  requelresScore: null,
  requiresScore: null,
  timed: '',
};

TestInfo.propTypes = {
  title: PropTypes.string,
  maxScore: PropTypes.number,
  requelresScore: PropTypes.number,
  requiresScore: PropTypes.number,
  timed: PropTypes.string,
};

export default TestInfo;
