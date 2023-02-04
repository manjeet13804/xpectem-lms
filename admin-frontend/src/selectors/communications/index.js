import { createSelector } from 'reselect';
import fp from 'lodash/fp';

const getCommunicationSelector = ({ communication }) => communication;

const getQueuedCommunicationsDataFp = createSelector(
  getCommunicationSelector,
  fp.get('queuedCommunicationsData'),
);

const getCompletedCommunicationsDataFp = createSelector(
  getCommunicationSelector,
  fp.get('completedCommunicationsData'),
);

const getCurrentCommunicationFp = createSelector(
  getCommunicationSelector,
  fp.get('currentCommunication'),
);

const getIsQueuedQuestionFp = createSelector(
  getCommunicationSelector,
  fp.get('isQueuedQuestion'),
);

const getIsCompletedFp = createSelector(
  getCommunicationSelector,
  fp.get('isCompleted'),
);

const getCurrentStudentFp = createSelector(
  getCommunicationSelector,
  fp.get('currentStudent'),
);

const getPreviosCommunicationFp = createSelector(
  getCommunicationSelector,
  fp.get('previosCommunication'),
);

export {
  getQueuedCommunicationsDataFp,
  getCompletedCommunicationsDataFp,
  getCurrentCommunicationFp,
  getIsQueuedQuestionFp,
  getIsCompletedFp,
  getCurrentStudentFp,
  getPreviosCommunicationFp,
};
