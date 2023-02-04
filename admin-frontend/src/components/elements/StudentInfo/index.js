import React from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'antd';

import {
  DateStartEnd,
  CourseProfile,
  TestInfo,
  CertificationInfo,
} from 'components';
import IntlMessages from 'components/utility/intlMessages';
import { bemlds } from 'utils';
import StudentInfoWrapper from './studentInfo.style';

const si = bemlds('student-info');
const { Panel } = Collapse;

const StudentInfo = (props) => {
  const {
    id,
    avatar,
    firstName,
    lastName,
    userEmail: [{
      email,
    }],
    userPhone: [{
      phone,
    }],
    language: {
      name: languageName,
    },
    lmsGroups: [{
      name: lmsGroupsName,
    }],
    score,
    maxScore,
    requelresScore,
    requiresScore,
    userCourseRelation,
    testRelation,
    certification,
  } = props;

  // not backend
  const handleSaveDate = (id, date) => {

  };

  const generateItem = (title, data, account = false) => (
    <div className={si('info-item')}>
      <div className={si('info-item-title', { account })}>
        <IntlMessages id={title} />
      </div>
      <div className={si('info-item-data ')}>
        {data}
      </div>
    </div>
  );

  const generateAccountingItem = (title, data) => (
    <div className={si('accounting-item')}>
      <IntlMessages id={title} />
      <div className={si('accounting-data ')}>
        {data}
      </div>
    </div>
  );

  return (
    <StudentInfoWrapper>
      <section className={si()}>
        <div className={si('info-block', { main: true })}>
          <img
            src={avatar}
            alt="student-avatar"
            className={si('img')}
          />
          <div className={si('name-wrapper')}>
            <div className={si('name-data')}>
              {`${firstName} ${lastName}`}
            </div>
          </div>
        </div>
        <div>
          <div className={si('info-block', { accounting: true })}>
            <div className={si('info-title')}>
              <IntlMessages id="communication.accouting" />
            </div>
            <div className={si('accounting-panel')}>
              {generateAccountingItem('communication.accoutingScore', maxScore)}
              {generateAccountingItem('communication.accoutingRequelresScore', requelresScore)}
              {generateAccountingItem('communication.accoutingRequiresScore', requiresScore)}
            </div>
            <div className={si('accounting-date')}>
              <div className={si('accounting-score')}>
                {score}
              </div>
              <DateStartEnd
                onlyBegin
                id={id}
                isOpenTitle={false}
                handleSaveDate={handleSaveDate}
              />
            </div>
          </div>
        </div>
        <Collapse
          expandIconPosition="right"
          defaultActiveKey={['2']}
        >
          <Panel header={<IntlMessages id="communication.account" />} key="1">
            <div className={si('info-block')}>
              {generateItem('tutors.firstNameLabel', firstName, true)}
              {generateItem('tutors.lastNameLabel', lastName, true)}
              {generateItem('tutors.emailLabel', email, true)}
              {generateItem('tutors.telephoneLabel', phone, true)}
              {generateItem('groupAdmin.lang', languageName, true)}
              {generateItem('sidebar.lmsGroup', lmsGroupsName, true)}
            </div>
          </Panel>
          <Panel header={<IntlMessages id="communication.courses" />} key="2">
            {userCourseRelation.map(({
              id: courseId,
              course,
              dateBegin,
              dateEnd,
              activationDate,
              sentDate,
            }) => (
              <CourseProfile
                key={courseId}
                dateBegin={dateBegin}
                dateEnd={dateEnd}
                activationDate={activationDate}
                sentDate={sentDate}
                {...course}
              />
            ))}
            <div className={si('info-block')}>
              <div className={si('info-title', { alone: true })}>
                <IntlMessages id="communication.onlineTests" />
              </div>
              {testRelation.map(item => <TestInfo key={item.id} {...item} />)}
            </div>
            <div className={si('info-block')}>
              <div className={si('info-title', { alone: true })}>
                <IntlMessages id="communication.handtasks" />
              </div>
            </div>
            <div className={si('info-block')}>
              <div className={si('info-title', { alone: true })}>
                <IntlMessages id="communication.certification" />
              </div>
              <CertificationInfo {...certification} />
            </div>
          </Panel>
        </Collapse>
      </section>
    </StudentInfoWrapper>
  );
};

StudentInfo.defaultProps = {
  id: null,
  avatar: '',
  firstName: '',
  lastName: '',
  userEmail: [{
    email: '',
  }],
  userPhone: [{
    phone: '',
  }],
  language: {
    name: '',
  },
  lmsGroups: [{
    name: '',
  }],
  maxScore: null,
  requelresScore: null,
  requiresScore: null,
  score: null,
  userCourseRelation: [],
  testRelation: [],
  certification: {},
};

StudentInfo.propTypes = {
  id: PropTypes.number,
  avatar: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  userEmail: PropTypes.arrayOf(PropTypes.object),
  userPhone: PropTypes.arrayOf(PropTypes.object),
  language: PropTypes.shape({
    name: PropTypes.string,
  }),
  lmsGroups: PropTypes.arrayOf(PropTypes.object),
  maxScore: PropTypes.number,
  requelresScore: PropTypes.number,
  requiresScore: PropTypes.number,
  score: PropTypes.number,
  userCourseRelation: PropTypes.arrayOf(PropTypes.object),
  testRelation: PropTypes.arrayOf(PropTypes.object),
  certification: PropTypes.objectOf(PropTypes.any),
};

export default StudentInfo;
