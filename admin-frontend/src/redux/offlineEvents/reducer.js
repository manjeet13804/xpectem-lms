import actions from './actions';

const initState = {
  offlineEvents: [],
  isDoing: false,
  editableOfflineEvent: {
    assets: [],
    dateStart: null,
    dateFinish: null,
  },
  error: null,
  totalEvents: 1,
  isEventsLoading: false,
  offlineEventCategories: [],
};

export default function offlineEventsReducer(state = initState, { type, ...action }) {
  switch (type) {
    case actions.GET_OFFLINE_EVENTS_START:
      return {
        ...state,
        isEventsLoading: true,
      };

    case actions.GET_OFFLINE_EVENTS: {
      const { data } = action;

      return {
        ...state,
        offlineEvents: data.result,
        totalEvents: data.total,
        isEventsLoading: false,
      };
    }

    case actions.GET_OFFLINE_EVENTS_FAILURE:
      return {
        ...state,
        isEventsLoading: false,
      };

    case actions.GET_OFFLINE_EVENT_START:
      return {
        ...state,
        isEventsLoading: true,
      };

    case actions.GET_OFFLINE_EVENT: {
      const { data } = action;
      const { editableOfflineEvent: prevData } = state;

      return {
        ...state,
        editableOfflineEvent: { ...prevData, ...data },
        isEventsLoading: false,
      };
    }

    case actions.GET_OFFLINE_EVENT_FAILURE:
      return {
        ...state,
        isEventsLoading: false,
      };

    case actions.REMOVE_EDITABLE_OFFLINE_EVENT:
      return {
        ...state,
        editableOfflineEvent: { ...initState.editableOfflineEvent },
      };

    case actions.EDIT_EDITABLE_OFFLINE_EVENT: {
      const { data } = action;
      const { editableOfflineEvent } = state;

      return {
        ...state,
        editableOfflineEvent: {
          ...editableOfflineEvent,
          ...data,
        },
      };
    }

    case actions.GET_CATEGORIES: {
      const { categories } = action;

      return {
        ...state,
        offlineEventCategories: categories,
      };
    }

    case actions.GET_CATEGORIES_FAIL:
      return {
        ...state,
      };

    case actions.TOGGLE_SOFT_DELETE_OFFLINE_EVENT_START:
    case actions.CREATE_OFFLINE_EVENT_START:
    case actions.UPDATE_OFFLINE_EVENT_START:
      return { ...state, isDoing: true };

    case actions.TOGGLE_SOFT_DELETE_OFFLINE_EVENT_SUCCESS:
    case actions.CREATE_OFFLINE_EVENT_SUCCESS:
    case actions.UPDATE_OFFLINE_EVENT_SUCCESS:
      return { ...state, isDoing: false, error: null };

    case actions.TOGGLE_SOFT_DELETE_OFFLINE_EVENT_FAIL:
    case actions.CREATE_OFFLINE_EVENT_FAIL:
    case actions.UPDATE_OFFLINE_EVENT_FAIL:
      return { ...state, isDoing: false, error: action.payload };

    default:
      return state;
  }
}
