// @flow
import React, {
  PureComponent,
  Node,
  SyntheticEvent,
} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  getCommunications,
  getCommunicationList,
  getSearchCommunication,
  getCurrentCourseId,
  getLoadingCommunications,
} from 'redux/selectors';
import { getGeneralUser } from 'redux/userProfile/selectors';
import {
  actionGetCourseCommunication,
  actionSetCommunicationId,
  actionCommunicationSearch,
  actionGetAllCommunication,
  actionSetCourseCommunicationId,
  openAllQuests,
  actionClickQuest,
  clearCommunication,
} from 'redux/actions';
import {
  Question as Quest,
  ArrowDown,
  SearchIcon,
} from 'components';
import { COMMUNICATION_DICTIONARY } from 'localise';
import { bemlds } from 'utils';
import { DEFAULT_USER_AVATAR } from 'constants/mock';
import Loader from 'components/elements/CustomLoader';
import {
  Question,
  QuestionAdd,
} from './components';
import './styles.scss';

const b = bemlds('communication');

type PropsType = {
  getCourseCommunication: void,
  communicationList: Array<object>,
  searchClick: void,
  currentMyCourse: object,
  searchArray: Array<object>,
  getAllCommunication: void,
  setCourseCommunicationId: number,
  user: object,
  history: object,
  clearCommunication: void
};

class CommunicationTab extends PureComponent<PropsType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      addQuestState: false,
      querySearch: '',
      isOpenAll: false,
    };
    this.querySearchChange = this.querySearchChange.bind(this);
  }

  openAllMessage = () => {
    const {
      openQuests,
      currentCourseId,
      communicationList,
    } = this.props;
    const { isOpenAll } = this.state;
    this.setState({
      isOpenAll: !isOpenAll,
    });

    openQuests(currentCourseId, communicationList, !isOpenAll);
  }

  querySearchChange(event: Event) {
    this.setState({querySearch: event.target.value});
  }

  toggleSearchBlock = (status: boolean): Node => !status;

  clickAddQuest = (): Node => {
    const { addQuestState } = this.state;
    this.setState({addQuestState: !addQuestState});
  };

  componentDidMount() {
    const {
      getCourseCommunication,
      currentMyCourse,
      setCourseCommunicationId,
      getAllCommunication,
      history: {
        location,
      },
    } = this.props;

    getAllCommunication();
    getCourseCommunication(currentMyCourse.id, location.state ? location.state.id : null); // filled communicationsList in state.communication
    setCourseCommunicationId(currentMyCourse.id); // filled currentCommunicationCourseId in state
  }

  componentDidUpdate() {
    this.checkAllOpend();
  }

  componentWillUnmount() {
    const { clearCommunication } = this.props;
    clearCommunication();
  }

  checkAllOpend = () => {
    const { communicationList } = this.props;
    const { isOpenAll } = this.state;

    if (communicationList) {
      const isAllOpenNow = communicationList.every(el => el.openQuest);
      if (isAllOpenNow && !isOpenAll) {
        this.setState({isOpenAll: true});
      } else if (!isAllOpenNow && this.state.isOpenAll) {
        this.setState({isOpenAll: false});
      }
    }
  }

  submitSearch = (e: SyntheticEvent) => {
    e.preventDefault();
    const { querySearch } = this.state;
    if (querySearch) {
      const {
        searchClick,
        currentMyCourse: {
          id: idCourse,
        },
      } = this.props;
      searchClick(querySearch, idCourse);
    }
  };

  render(): Node {
    const {
      addQuestState,
      querySearch,
      isOpenAll,
    } = this.state;

    const {
      communicationList,
      searchArray,
      user: {
        avatar,
      },
      currentCourseId,
      clickQuest,
      isLoadingCommunications,
    } = this.props;

    const initialDialog = {
      messages: 0,
      newMessageCount: 0,
    };

    const {
      messages: allMessages,
      newMessageCount: newMessages,
    } = communicationList
      ? communicationList.reduce((acc, item) => (
        {
          messages: Number(acc.messages) + Number(item.messages),
          newMessageCount: Number(acc.newMessageCount) + Number(item.newMessageCount),
        }
      ), initialDialog) : initialDialog;

    return (
      <section className={b()}>
        {isLoadingCommunications && !communicationList ? (
          <Loader />
        ) : (
          <>
            <div className={b('search')}>
              <form className={b('search-form')} onSubmit={this.submitSearch}>
                <input
                  className={b('search-input')}
                  type="text"
                  value={querySearch}
                  placeholder={COMMUNICATION_DICTIONARY.searchPlaceholder}
                  onChange={this.querySearchChange}
                />
                <button
                  className={b('search-btn')}
                  type="submit"
                >
                  <SearchIcon className={b('search-icon')} />
                </button>
              </form>
            </div>
            <hr className={b('line')} />
            {searchArray && searchArray.length > 0 && (
              <div className={b('search-answer')}>
                {searchArray.map(
                  ({
                    dialog_heading: heading,
                    message_message: message,
                    dialog_id: dialogId,
                    message_id: messageId,
                  }: object): Node => (
                    <div className={b('question-wrap')} key={`question${messageId}`}>
                      <Quest
                        className={b('question-field')}
                        text={heading}
                        answer={message}
                        searchText={querySearch}
                        userAvatar={avatar}
                        dialogId={dialogId}
                        messageId={messageId}
                        currentCourseId={currentCourseId}
                        clickQuest={clickQuest}
                      />
                    </div>
                  ),
                )}
              </div>
            )}
            {addQuestState
              ? <QuestionAdd onClick={this.clickAddQuest} />
              : (
                <div
                  className={b('question')}
                  role="button"
                  tabIndex="0"
                  onClick={(): SyntheticEvent => this.clickAddQuest()}
                >
                  <img className={b('question-icon')} src={avatar || DEFAULT_USER_AVATAR} alt="user" />
                  <div className={b('question-text')}>
                    <div className={b('question-text-tutor')}>
                      {COMMUNICATION_DICTIONARY.questionMessage}
                    </div>
                  </div>
                </div>
              )
            }
            <section className={b('message')}>
              <div className={b('message-count')}>
                <div className={b('message-count-all')}>
                  {`${COMMUNICATION_DICTIONARY.message} ${allMessages} -`}
                </div>
                <div className={b('message-count-new')}>
                  {` ${newMessages} ${COMMUNICATION_DICTIONARY.new}`}
                </div>
              </div>
              <div className={b('message-open')}>
                <div className={b('message-open-text')} onClick={this.openAllMessage}>
                  {isOpenAll ? COMMUNICATION_DICTIONARY.closeAll : COMMUNICATION_DICTIONARY.openAll}
                </div>
                <div
                  onClick={this.openAllMessage}
                >
                  <ArrowDown className={b('message-open-icon', { opened: isOpenAll })} />
                </div>
              </div>
            </section>
            {communicationList && communicationList.map(({
              id,
              title,
              createdAt,
              newMessageCount: newMessage,
              messages: messageCount,
              firstName,
              lastName,
              openQuest,
            }: object): Node => (
              <Question
                key={`question${id}`}
                id={id}
                title={title}
                date={createdAt}
                newMessageCount={newMessage}
                messageCount={messageCount}
                firstName={firstName}
                lastName={lastName}
                openQuest={openQuest}
              />
            ))}
          </>
        )}
      </section>
    );
  }
}

const stateProps = (state: object): object => ({
  courseCommunication: getCommunications(state),
  currentCommunicationId: state.communication.currentCommunicationId,
  communicationList: getCommunicationList(state),
  searchArray: getSearchCommunication(state),
  user: getGeneralUser(state),
  currentCourseId: getCurrentCourseId(state),
  isLoadingCommunications: getLoadingCommunications(state),
});

const dispatchProps = {
  getCourseCommunication: actionGetCourseCommunication,
  setCurrentCommunicationId: actionSetCommunicationId,
  searchClick: actionCommunicationSearch,
  getAllCommunication: actionGetAllCommunication,
  setCourseCommunicationId: actionSetCourseCommunicationId,
  openQuests: openAllQuests,
  clickQuest: actionClickQuest,
  clearCommunication,
};

export default withRouter(connect(stateProps, dispatchProps)(CommunicationTab));
