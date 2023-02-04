import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import searchNotificationActions from 'redux/searchNotification/actions';
import PropTypes from 'prop-types';
import LayoutContent from 'components/utility/layoutContent';
import IntlMessages from 'components/utility/intlMessages';
import {
  Banner,
  SelectAnyTime,
  NotificationItem,
  LoaderFullSize,
} from 'components';
import {
  DATE_FORMATS,
} from 'constants/constants';
import { bemlds, caseDateWithFormat } from 'utils';
import _ from 'lodash';
import moment from 'moment';
import ReportNotificationsWrapper from './notificationReport.style';

const page = bemlds('page');
const { yearMonthDay } = DATE_FORMATS;

const NotificationsReport = (props) => {
  const {
    history,

    getNotifications,
    setNotifications,

    isLoadingUserNotification,
    reportNotifications,
    total,
  } = props;

  const [dateSelected, selectDate] = useState({
    startDate: null,
    endDate: null,
  });
  const [limit, setLimit] = useState(10);
  const { userId } = history.location.state;

  const getAdditionalNotifications = () => {
    const { length } = reportNotifications;
    const { startDate, endDate } = dateSelected;
    if (length < total) {
      const newLimit = limit + 10;
      const query = {
        createdStartDate: startDate,
        createdEndDate: endDate,
        limit: newLimit,
        offset: limit,
        ...history.location.state,
      };
      setLimit(newLimit);
      getNotifications(query);
    }
  };

  const notificationsEl = useRef(null);

  const fixScrollToTop = () => {
    const el = _.get(notificationsEl, 'current', null);
    if (el) {
      el.scrollTo(0, 0);
    }
  };

  const handleScroll = (e) => {
    const isBottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (isBottom) {
      getAdditionalNotifications();
    }
  };

  const handleDataSave = (date) => {
    const startDate = caseDateWithFormat(date, yearMonthDay);
    const endDate = moment().subtract(-1, 'days').format(yearMonthDay);
    selectDate({
      startDate,
      endDate,
    });
    const query = {
      createdStartDate: startDate
        ? startDate.trim()
        : startDate,
      createdEndDate: startDate
        ? endDate.trim()
        : startDate,
      limit: 10,
      offset: 0,
      ...history.location.state,
    };
    fixScrollToTop();
    setNotifications(query);
  };

  const handleCustomRange = (date) => {
    const startDate = moment(date).format(yearMonthDay);
    const endDate = moment(startDate).subtract(-1, 'days').format(yearMonthDay);
    selectDate({
      startDate: startDate.trim(),
      endDate: endDate.trim(),
    });
    const query = {
      createdStartDate: startDate.trim(),
      createdEndDate: endDate.trim(),
      limit: 10,
      offset: 0,
      ...history.location.state,
    };
    fixScrollToTop();
    setNotifications(query);
  };

  return (
    <LayoutContent>
      <ReportNotificationsWrapper>
        <Banner title={<IntlMessages id="notifications.report" />} />
        <section className={page()}>
          <div className={page('description')}>
            <IntlMessages id="notifications.description" />
          </div>
          <div className={page('title')}>
            <IntlMessages id="notifications.all" />
          </div>
          <div className={page('notifications')}>
            <LoaderFullSize isLoading={isLoadingUserNotification} textId="notifications.loading" />
            <div className={page('notifications-select-wrap')}>
              <SelectAnyTime
                status
                handleDataSave={handleDataSave}
                handleCustomRange={handleCustomRange}
              />
            </div>
            <div className={page('notifications-list')} onScroll={handleScroll} ref={notificationsEl}>
              {reportNotifications.map(({
                id,
                header,
                isRead,
                createdAt,
              }) => (
                <NotificationItem
                  key={id}
                  isRead={userId ? isRead : undefined}
                  header={header}
                  createdAt={createdAt}
                />
              ))}
            </div>
          </div>
        </section>
      </ReportNotificationsWrapper>
    </LayoutContent>
  );
};

const mapStateToProps = state => ({
  isLoadingUserNotification: state.searchNotification.isLoadingUserNotification,
  reportNotifications: state.searchNotification.reportNotifications,
  error: state.searchNotification.error,
  total: state.searchNotification.total,
});

NotificationsReport.defaultProps = {
  history: {},
  reportNotifications: [],
  isLoadingUserNotification: false,
  total: 0,
};

NotificationsReport.propTypes = {
  history: PropTypes.object,
  reportNotifications: PropTypes.arrayOf(PropTypes.object),
  isLoadingUserNotification: PropTypes.bool,
  total: PropTypes.number,
};

export default connect(mapStateToProps, searchNotificationActions)(NotificationsReport);
