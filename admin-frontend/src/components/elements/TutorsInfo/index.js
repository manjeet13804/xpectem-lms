import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { bemlds } from 'utils';
import IntlMessages from 'components/utility/intlMessages';
import {
  getCurrentTutorFp,
} from 'selectors';
import TutorsInfoWrapper from './tutorsInfo.style';


const ti = bemlds('tutors-info');

const TutorsInfo = (props) => {
  const { currentTutor: { userLog } = {} } = props;

  const {
    latestLogin = null,
    operatingSystem = null,
    browser = null,
    createdBy = {},
    createdBy: {
      userEmail: [
        { welcomeEmailSent = null } = {},
      ] = [],
    } = {},
    changedBy = {},
  } = userLog;

  const generateBlock = (info, title) => {
    if (!info) {
      return null;
    }
    return (
      <div className={ti('block')}>
        <div className={ti('title')}>
          <IntlMessages id={title} />
        </div>
        <div className={ti('description')}>
          {info}
        </div>
      </div>
    );
  };

  const generateWrap = (infoProps = {}, titleFirst, titleSecond) => {
    if (!infoProps || !Object.keys(infoProps).length) {
      return null;
    }

    const {
      createdAt = null,
      firstName = null,
      lastName = null,
      userEmail: [
        { email = null } = {},
      ] = [],
    } = infoProps;

    return (
      <div className={ti('wrap')}>
        {generateBlock(createdAt, titleFirst)}
        <div className={ti('block')}>
          <div className={ti('title')}>
            <IntlMessages id={titleSecond} />
          </div>
          <div className={ti('description')}>
            {`${firstName} ${lastName}`}
            <br />
            {email}
            <br />
          </div>
        </div>
      </div>
    );
  };


  return (
    <TutorsInfoWrapper>
      <div className={ti()}>
        {generateWrap(
          createdBy,
          'lmsGroups.createdTitle',
          'lmsGroups.createdTitleBy',
        )}
        {generateWrap(
          changedBy,
          'lmsGroups.changedTitle',
          'lmsGroups.changedTitleBy',
        )}
        <div className={ti('wrap')}>
          {generateBlock(welcomeEmailSent, 'lmsGroups.welcomeEmail')}
        </div>
        <div className={ti('wrap')}>
          {generateBlock(latestLogin, 'lmsGroups.latestLogin')}
          {generateBlock(operatingSystem, 'lmsGroups.operatingSystem')}
          {generateBlock(browser, 'lmsGroups.browser')}
        </div>

      </div>
    </TutorsInfoWrapper>
  );
};

TutorsInfo.defaultProps = {
  currentTutor: {},
};

TutorsInfo.propTypes = {
  currentTutor: PropTypes.objectOf(PropTypes.any),
};

const mapStateToProps = (state) => {
  const currentTutor = getCurrentTutorFp(state);

  return {
    currentTutor,
  };
};

export default connect(mapStateToProps)(TutorsInfo);
