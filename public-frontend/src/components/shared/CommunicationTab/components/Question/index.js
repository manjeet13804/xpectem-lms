// @flow
import React, { PureComponent, SyntheticEvent, Node } from 'react';
import { connect } from 'react-redux';
import { bemlds } from 'utils';
import { ArrowDown } from 'components';
import { DATE_FORMATS } from 'constants/constants';
import { Alert } from 'antd';
import moment from 'moment';
import _ from 'lodash';
import {
  getCurrentCommunicationCourseId,
  getCommunicationList,
  getErrorCommunications,
  getCurrentCourseId,
} from 'redux/selectors';
import {
  actionSetCommunicationId,
  actionGetCommunicationDialog,
  actionCommunicationIsRead,
  actionClickQuest,
  deleteLastMessage,
} from 'redux/actions';
import { COMMUNICATION_DICTIONARY } from 'localise';
import QuestionOpen from '../QuestionOpen';
import './styles.scss';

const b = bemlds('question-block');
const c = bemlds('question');
const { dayMonth, passedAssignmentDate } = DATE_FORMATS;

type PropsType = {
  id: number,
  title: string,
  date: string,
  firstName: string,
  lastName: string,
  setCurrentCommunicationId: void,
  getCommunicationDialog: void,
  currentCommunicationCourseId: number,
  communicationList: Array<object>,
  currentCourseId: number,
  openQuest: boolean,
  setCommunicationIsReaded: func
};

class Question extends PureComponent<PropsType> {
  render(): Node {
    const {
      id,
      title,
      date,
      firstName,
      lastName,
      currentCommunicationCourseId,
      currentCourseId,
      communicationList,
      userAvatar,
      openQuest,
      clickQuest,
      newMessageCount,
      messageCount,
      currentUserId,
      deleteMessage,
      errorCommunications,
    } = this.props;

    const currentDialog = communicationList && communicationList.length ? communicationList.find(item => item.id === id) : {};
    const isClosed = Boolean(_.get(currentDialog, 'isClosed', true));
    const dayMonthParse = moment(date).format(dayMonth);
    const dayMonthTimeParse = (time: string): Node => moment(time).format(passedAssignmentDate);

    const idx = communicationList.findIndex(
      ({ id: destrId }: number): object => destrId === id,
    );

    const dialogList = communicationList
      && communicationList[idx]
      && communicationList[idx].dialogList;

    const isNewMessages = Number(newMessageCount) > 0;

    return (
      <div className={c()}>
        {errorCommunications && (
          <Alert
            message={errorCommunications}
            type="error"
            closable
            banner
          />
        )}
        <div
          className={b({ new: isNewMessages})}
          role="button"
          tabIndex="0"
          onClick={(): SyntheticEvent => {
            clickQuest(currentCommunicationCourseId || currentCourseId, id);
          }}
        >
          <section className={b('text')}>
            <div className={b('text-name')}>
              {`${firstName} ${lastName}`}
            </div>
            <div className={b('text-ques')}>
              {title}
            </div>
            <div className={b('messages-container')}>
              <div className={b('messages-container-inner')}>
                <div>
                  {COMMUNICATION_DICTIONARY.message}
                </div>
                <div>
                  {messageCount}
                </div>
              </div>
              <div className={b('messages-container-inner')}>
                <div>
                  {COMMUNICATION_DICTIONARY.new}
                </div>
                <div>
                  {newMessageCount}
                </div>
              </div>
            </div>
          </section>
          <div className={b('data')}>
            <div className={b('data-date')}>
              {dayMonthParse}
            </div>
            <ArrowDown className={b('data-icon')} />
            {isClosed && (
            <div
              className={b('closed')}
            >
              {COMMUNICATION_DICTIONARY.closedDialog}
            </div>
            )}
          </div>
        </div>
        {(openQuest && dialogList && dialogList.map((
          {
            id: idMessage,
            heading,
            message,
            isChecked,
            author: {
              firstName: name, lastName: surName, avatar, id: authorId,
            },
            communicationAttachment,
            createdAt,
          }: object, index: number,
        ): Node => (
          <QuestionOpen
            messageId={idMessage}
            key={idMessage}
            onClick={() => clickQuest(currentCommunicationCourseId || currentCourseId, id)}
            id={id}
            index={index}
            authorId={authorId}
            userId={currentUserId}
            messageCount={dialogList.length}
            handleDeleteMessage={deleteMessage}
            currentCourseId={currentCourseId}
            isChecked={isChecked}
            communicationAttachment={communicationAttachment}
            date={dayMonthTimeParse(createdAt)}
            userAvatar={userAvatar}
            heading={heading}
            message={message}
            firstName={name}
            lastName={surName}
            avatar={avatar}
            isClosed={isClosed}
            replyStatus={dialogList.length === index + 1}
          />
        )))}
      </div>
    );
  }
}

const stateProps = (state: object): object => ({
  currentCourseId: getCurrentCourseId(state),
  currentCommunicationCourseId: getCurrentCommunicationCourseId(state),
  communicationList: getCommunicationList(state),
  currentUserId: state.userProfile.id,
  errorCommunications: getErrorCommunications(state),
});

const dispatchProps = {
  setCurrentCommunicationId: actionSetCommunicationId,
  getCommunicationDialog: actionGetCommunicationDialog,
  setCommunicationIsReaded: actionCommunicationIsRead,
  clickQuest: actionClickQuest,
  deleteMessage: deleteLastMessage,
};

export default connect(stateProps, dispatchProps)(Question);
