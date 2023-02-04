import React from 'react';
import { bemlds } from 'utils';
import { Avatar, Collapse } from 'antd';
import { DATE_FORMATS } from 'constants/constants';
import CollapseCourseInfo from 'containers/Uielements/CollapseCourseInfo';
import moment from 'moment';
import Tooltip from 'components/uielements/tooltip';
import AccountCardWrapper from './accountCard.style';
import CollapseWrapper from './collapse.style';

const { dayMonthYearTime } = DATE_FORMATS;


const b = bemlds('account-card');

const Collapses = props => (
  <CollapseWrapper>
    <Collapse {...props}>{props.children}</Collapse>
  </CollapseWrapper>
);

const { Panel } = Collapse;

const AccountCard = (props) => {
  const {
    currentStudents,
    courseContent,
  } = props;

  const [student = {}] = currentStudents || [];
  const {
    avatar,
    firstName,
    lastName,
    emails = [],
    phones = [],
    language,
    notifyEmail,
    notifySms,
    lmsGroups = [],
  } = student;
  const [lmsGroup] = lmsGroups;

  const {
    course: {
      title: courseTitle,
      courseTopics,
      createdAt,
      senderName,
      senderEmail,
    } = {},
    doneUntil,
    startAt,
  } = courseContent;

  const notify = (notifyEmail, notifySms) => (
    `${notifyEmail ? 'Email ' : ''}${notifySms ? ' Sms' : ''}`
  );

  const account = [
    {
      title: 'First Name',
      value: firstName,
    },
    {
      title: 'Last Name',
      value: lastName,
    },
    {
      title: 'E-mail address',
      value: emails[0],
    },
    {
      title: 'Telephone',
      value: phones[0],
    },
    {
      title: 'Language',
      value: language && language.name,
    },
    {
      title: 'Notifications',
      value: notify(notifyEmail, notifySms),
    },
    {
      title: 'Admin group',
      value: lmsGroup && lmsGroup.name,
    },
  ].filter(({ value }) => value);
  const getDate = date => moment(date).format(dayMonthYearTime);

  return (
    <AccountCardWrapper>
      <div className={b()}>
        <div className={b('avatar')}>
          <Avatar
            size={50}
            icon="user"
            src={avatar}
          />
          <div className={b('avatar-name')}>
            <div className={b('avatar-name-first')}>
              {firstName}
            </div>
            <div className={b('avatar-name-last')}>
              {lastName}
            </div>
          </div>
        </div>
        <Collapses>
          <Panel header="Account" key="account">
            {account.map(({ title, value }) => (
              <div key={title} className={b('account')}>
                <div className={b('account-title')}>
                  {title}
                </div>
                <Tooltip title={value}>
                  <div className={b('account-value')}>
                    {value}
                  </div>
                </Tooltip>
              </div>
            ))}
          </Panel>
          <Panel header="Course" key="course">
            <div className={b('course-title')}>
              {courseTitle}
            </div>
            <div className={b('created')}>
              <div className={b('created-ordered')}>
                <div className={b('created-ordered-title')}>
                  Ordered:
                </div>
                <div className={b('created-ordered-value')}>
                  <Tooltip title={getDate(createdAt)}>
                    <span className={b('created-ordered-value-span')}>{getDate(createdAt)}</span>
                  </Tooltip>
                  <Tooltip title={senderName}>
                    <span className={b('created-ordered-value-span')}>{senderName}</span>
                  </Tooltip>
                  <Tooltip title={senderEmail}>
                    <span className={b('created-ordered-value-span')}>{senderEmail}</span>
                  </Tooltip>
                </div>
              </div>
              <div className={b('created-ordered')}>
                <div className={b('created-ordered-title')}>
                  <span>Start date:</span>
                </div>
                <div className={b('created-ordered-value')}>
                  <Tooltip title={getDate(startAt)}>
                    <span className={b('created-ordered-value-span')}>{getDate(startAt)}</span>
                  </Tooltip>
                </div>
              </div>
              <div className={b('created-ordered')}>
                <div className={b('created-ordered-title')}>
                  Final date:
                </div>
                <div className={b('created-ordered-value')}>
                  <Tooltip title={getDate(doneUntil)}>
                    <span className={b('created-ordered-value-span')}>{getDate(doneUntil)}</span>
                  </Tooltip>
                </div>
              </div>
            </div>
            <CollapseCourseInfo courses={courseTopics} />
          </Panel>
        </Collapses>
      </div>
    </AccountCardWrapper>
  );
};

export default AccountCard;
