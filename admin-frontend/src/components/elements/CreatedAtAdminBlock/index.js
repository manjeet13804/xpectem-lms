import IntlMessages from 'components/utility/intlMessages';
import { DATE_FORMATS } from 'constants/constants';
import _ from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { bemlds } from 'utils';

import CreatedAtAdminBlockWrapper from './createdAtAdminBlock.style';

const created = bemlds('created');
const changed = bemlds('changed');

const { yearMonthDayHoursMinutesSeconds } = DATE_FORMATS;


const CreatedAtAdminBlock = ({ currentLmsGroup }) => {
  const {
    userLog,
    createdAt,
    updatedAt,
    userEmail: emails,
  } = currentLmsGroup;

  if (!(userLog && userLog.id)) { return null; }

  const {
    createdBy,
    changedBy,
    latestLogin,
    browser,
    operatingSystem,
  } = userLog;

  const {
    firstName,
    lastName,
    roles,
    userEmail,
  } = createdBy;
  const changedByEmails = _.get(changedBy, 'userEmail', []);
  const [firstEmail, secondEmail] = userEmail || [];
  const [firstEmailChangedBy, secondEmailChangedBy] = changedByEmails;

  const dateParse = data => (data ? moment(data).format(yearMonthDayHoursMinutesSeconds) : data);

  return (
    <CreatedAtAdminBlockWrapper>
      <section className={created()}>
        <section className={created('date')}>
          <div className={created('date-title')}>
            <IntlMessages id="lmsGroups.createdTitle" />
          </div>
          <div className={created('date-date')}>
            {dateParse(createdAt)}
          </div>
        </section>
        <section className={created('name')}>
          <div className={created('name-title')}>
            <IntlMessages id="lmsGroups.createdTitleBy" />
          </div>
          <div className={created('name-text')}>
            <div>
              {firstName}
              {lastName}
            </div>
            <div>
              {firstEmail && firstEmail.email}
              {secondEmail && secondEmail.email}
            </div>
            <div>{roles}</div>
          </div>
        </section>
      </section>
      {Boolean(changedByEmails.length) && (
      <section className={changed()}>
        <section className={changed('date')}>
          <div className={changed('date-title')}>
            <IntlMessages id="lmsGroups.changedTitle" />
          </div>
          <div className={changed('date-date')}>
            {dateParse(updatedAt)}
          </div>
        </section>
        <section className={changed('name')}>
          <div className={changed('name-title')}>
            <IntlMessages id="lmsGroups.changedTitleBy" />
          </div>
          <div className={changed('name-text')}>
            <div>
              {changedBy.firstName}
              {changedBy.lastName}
            </div>
            <div>
              {firstEmailChangedBy && firstEmailChangedBy.email}
              {secondEmailChangedBy && secondEmailChangedBy.email}
            </div>
            <div>{changedBy.roles}</div>
          </div>
        </section>
      </section>
      )}
      <section className={changed()}>
        <section className={changed('date')}>
          <div className={changed('date-title')}>
            <IntlMessages id="lmsGroups.welcomeEmail" />
          </div>
          <div className={changed('date-date')}>
            {dateParse(emails[0] ? emails[0].welcomeEmailSent : '')}
          </div>
        </section>
      </section>
      <section className={changed()}>
        {Boolean(latestLogin) && (
        <section className={changed('date')}>
          <div className={changed('date-title')}>
            <IntlMessages id="lmsGroups.latestLogin" />
          </div>
          <div className={changed('date-date')}>
            {dateParse(latestLogin)}
          </div>
        </section>
        )}
        {Boolean(operatingSystem) && (
        <section className={changed('date')}>
          <div className={changed('date-title')}>
            <IntlMessages id="lmsGroups.operatingSystem" />
          </div>
          <div className={changed('date-date')}>
            {operatingSystem}
          </div>
        </section>
        )}
        {Boolean(browser) && (
        <section className={changed('date')}>
          <div className={changed('date-title')}>
            <IntlMessages id="lmsGroups.browser" />
          </div>
          <div className={changed('date-date')}>
            {browser}
          </div>
        </section>
        )}
      </section>
    </CreatedAtAdminBlockWrapper>
  );
};

CreatedAtAdminBlock.defaultProps = {
  currentLmsGroup: {},
};

CreatedAtAdminBlock.propTypes = {
  currentLmsGroup: PropTypes.shape({}),
};
export default CreatedAtAdminBlock;
