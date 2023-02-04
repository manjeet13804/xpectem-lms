import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import IntlMessages from 'components/utility/intlMessages';
import LayoutContent from 'components/utility/layoutContent';
import {
  Banner,
  QueuedQuestion,
  SearchSvg,
  CommunicationItem,
} from 'components';
import {
  getQueuedCommunicationsDataFp,
  getCompletedCommunicationsDataFp,
  getIsQueuedQuestionFp,
  getIsCompletedFp,
} from 'selectors';
import { bemlds } from 'utils';
import {
  PLACEHOLDER,
} from 'constants/constants';
import communicationActions from 'redux/communication/actions';
import userActions from 'redux/students/actions';
import URLS from '../../../../redux/urls';
import ChooseCommunicationWrapper from './communication.style';

const page = bemlds('page');
const { searchPlaceholder } = PLACEHOLDER;
const { studentsToCourseDetailUrl } = URLS;

const ChooseCommunication = (props) => {
  const {
    queuedCommunicationsData,
    completedCommunicationsData,
    setCurrentListCommunication,
    setToggle,
    isQueuedQuestion,
    isCompleted,
    searchCommunication,
    setCurrentStudent,
    markMessageAsReaded,
    history,
    isNeedToRedirect,
    setRedirectStatus,
    idForRedirect,
  } = props;

  const [dialogIdForOpen, setDialogId] = useState(null);

  useEffect(() => {
    setCurrentListCommunication();
  }, []);

  useEffect(() => {
    if (isNeedToRedirect && idForRedirect) {
      setRedirectStatus(false);
      setDialogId(null);
    }
  }, [isNeedToRedirect, idForRedirect]);
  const [inputValue, setInputValue] = useState('');

  const handleChangeSearch = ({ target: { value } }) => {
    setInputValue(value);
    const query = value.trim();

    const currentSearchCommunication = _.debounce(searchCommunication, 500);
    currentSearchCommunication(query);
  };

  const handleReadMessage = (studentId, courseId, dialogId) => {
    markMessageAsReaded(studentId, courseId, dialogId);
    setDialogId(dialogId);
    history.push(`${studentsToCourseDetailUrl}/${studentId}`, {
      dialogId: dialogIdForOpen,
    });
  };

  const genCurrentListCommunications = () => {
    let currentList = [];
    if (isQueuedQuestion) {
      currentList = queuedCommunicationsData;
    }
    if (isCompleted) {
      currentList = completedCommunicationsData;
    }

    return currentList.map(item => (
      <CommunicationItem
        key={item.id}
        setCurrentStudent={setCurrentStudent}
        handleReadMessage={handleReadMessage}
        {...item}
      />
    ));
  };

  return (
    <LayoutContent>
      <ChooseCommunicationWrapper>
        <Banner title={<IntlMessages id="communication.banner" />} />
        <section className={page()}>
          <div className={page('title')}>
            <IntlMessages id="communication.title" />
          </div>
          <div className={page('wrapper')}>
            <QueuedQuestion
              handleQueuedQuestion={setToggle}
              stateQueuedQuestion={{ isQueuedQuestion, isCompleted }}
              queuedNumber={queuedCommunicationsData.length}
              completedNumber={completedCommunicationsData.length}
            />
            <div className={page('list-item')}>
              <div className={page('search')}>
                <SearchSvg />
                <input
                  className={page('input')}
                  type="text"
                  placeholder={searchPlaceholder}
                  value={inputValue}
                  onChange={handleChangeSearch}
                />
              </div>
              {genCurrentListCommunications()}
            </div>
          </div>
        </section>
      </ChooseCommunicationWrapper>
    </LayoutContent>
  );
};

const mapStateToProps = (state) => {
  const queuedCommunicationsData = getQueuedCommunicationsDataFp(state);
  const completedCommunicationsData = getCompletedCommunicationsDataFp(state);
  const isQueuedQuestion = getIsQueuedQuestionFp(state);
  const isCompleted = getIsCompletedFp(state);
  const isNeedToRedirect = state.communication.isRedirect;
  const student = state.students.currentStudents[0];
  const idForRedirect = student ? student.id : null;

  return {
    queuedCommunicationsData,
    completedCommunicationsData,
    isQueuedQuestion,
    isCompleted,
    isNeedToRedirect,
    idForRedirect,
  };
};

ChooseCommunication.defaultProps = {
  queuedCommunicationsData: [],
  completedCommunicationsData: [],
  currentListCommunications: [],
  setCurrentListCommunication: null,
  setToggle: null,
  isQueuedQuestion: false,
  isCompleted: false,
  searchCommunication: null,
  setCurrentStudent: null,
  markMessageAsReaded: () => null,
  getCurrentStudentById: () => null,
  clickNavMenu: () => null,
  history: {
    push: () => null,
  },
  isNeedToRedirect: false,
  setRedirectStatus: () => null,
  idForRedirect: null,
};

ChooseCommunication.propTypes = {
  queuedCommunicationsData: PropTypes.arrayOf(PropTypes.object),
  completedCommunicationsData: PropTypes.arrayOf(PropTypes.object),
  currentListCommunications: PropTypes.arrayOf(PropTypes.object),
  setCurrentListCommunication: PropTypes.func,
  setToggle: PropTypes.func,
  isQueuedQuestion: PropTypes.bool,
  isCompleted: PropTypes.bool,
  searchCommunication: PropTypes.func,
  setCurrentStudent: PropTypes.func,
  markMessageAsReaded: PropTypes.func,
  getCurrentStudentById: PropTypes.func,
  clickNavMenu: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  isNeedToRedirect: PropTypes.bool,
  setRedirectStatus: PropTypes.func,
  idForRedirect: PropTypes.number,
};

export default connect(mapStateToProps,
  { ...userActions, ...communicationActions })(ChooseCommunication);
