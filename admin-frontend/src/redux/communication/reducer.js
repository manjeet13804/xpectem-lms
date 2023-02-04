import actions from './actions';

const initState = {
  isQueuedQuestion: false,
  isCompleted: false,
  currentCommunications: [],
  queuedCommunicationsData: [],
  completedCommunicationsData: [],
  idCommunication: null,
  currentCommunication: [],
  reasignList: [],
  topicList: [],
  currentStudent: {},
  previosCommunication: [],
  isRedirect: false,
  openedDialogId: null,
};

export default function communication(state = initState, { type, ...action }) {
  switch (type) {
    case actions.SET_OPENED_DIALOG_ID: {
      return {
        ...state,
        openedDialogId: action.payload,
      };
    }

    case actions.SET_REDIRECT_STATUS: {
      const { payload } = action;
      const { status } = payload;
      return {
        ...state,
        isRedirect: status,
      };
    }

    case actions.SET_CURRENT_LIST_COMMUNICATION: {
      const { payload } = action;

      const newCompletedCommunications = payload.filter(({ isClosed }) => isClosed);
      const newQueuedCommunications = payload.filter(({ isClosed }) => !isClosed);

      return {
        ...state,
        openedDialogId: null,
        currentCommunications: payload,
        queuedCommunicationsData: newQueuedCommunications,
        completedCommunicationsData: newCompletedCommunications,
      };
    }

    case actions.SET_TOGGLE: {
      const {
        payload: {
          isQueuedQuestion,
          isCompleted,
        },
      } = action;

      return {
        ...state,
        isQueuedQuestion,
        isCompleted,
      };
    }

    case actions.SEARCH_COMMUNICATION: {
      return {
        ...state,
      };
    }

    case actions.SET_CURRENT_COMMUNICATION: {
      const { payload } = action;

      return {
        ...state,
        currentCommunication: payload,
      };
    }

    case actions.SEARCH_TUTOR: {
      const { payload } = action;

      return {
        ...state,
        reasignList: payload,
      };
    }

    case actions.SEARCH_TOPIC: {
      const { payload } = action;

      return {
        ...state,
        topicList: payload,
      };
    }

    case actions.MOVE_QUESTION_TOPIC: {
      return {
        ...state,
      };
    }

    case actions.SET_CURRENT_STUDENT: {
      const { payload } = action;

      return {
        ...state,
        currentStudent: payload,
      };
    }

    default:
      return state;
  }
}
