import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import {
  DATE_FORMATS,
} from 'constants/constants';
import {
  NotificationSvg,
  CheckRead,
} from 'components';
import { bemlds } from 'utils';
import NotificationItemWrapper from './notificationItem.style';
import _ from "lodash";

const { dayMonth } = DATE_FORMATS;
const ni = bemlds('notification-item');

const NotificationItem = (props) => {
  const {
    header,
    createdAt,
    isRead,
  } = props;

  const currentDate = moment(createdAt).format(dayMonth);

  return (
    <NotificationItemWrapper>
      <section className={ni()}>
        {!_.isNil(isRead) && (
          <div className={ni('icon')}>
            {isRead === 1 ? <CheckRead /> : <NotificationSvg />}
          </div>
        )}
        <div className={ni('title', { cheked: isRead === 1 })}>
          {header}
        </div>
        <div className={ni('date', { cheked: isRead === 1 })}>
          {currentDate}
        </div>
      </section>
    </NotificationItemWrapper>
  );
};

NotificationItem.defaultProps = {
  header: null,
  createdAt: null,
  isRead: null,
};

NotificationItem.propTypes = {
  header: PropTypes.string,
  createdAt: PropTypes.string,
  isRead: PropTypes.number,
};

export default NotificationItem;
