import actions from './actions';

const initState = {
  listNotifications: [],
  foundListLMSGroup: [],
  foundListStudent: [],
  automaticReminders: [],
  currentLMSGroup: null,
  currentStudent: null,
  isLoading: false,
  total: 0,
  targetType: undefined,
  enable: false,
  isLoadingReminder: false,
  automaticReminder: {
    header: '',
    percent: undefined,
    enable: false,
    translations: [],
  },
  eventNotifications: [],
};

export default function notifications(state = initState, { type, ...action }) {
  switch (type) {
    case actions.CLEAR_NOTIFICATION_TARGET_TYPE: {
      return {
        ...state,
        targetType: undefined,
      };
    }
    case actions.GET_NEW_NOTIFICATIONS_FAIL: {
      return {
        ...state,
        isLoading: false,
      };
    }

    case actions.GET_REMINDERS_NOTIFICATION_BY_ID_START: {
      return {
        ...state,
        isLoadingReminder: true,
      };
    }

    case actions.GET_REMINDERS_NOTIFICATION_BY_ID_SUCCESS: {
      const { payload } = action;

      return {
        ...state,
        automaticReminder: {
          ...payload,
          translations: payload.translations.map(translation => ({
            ...translation,
            message: JSON.parse(translation.message).blocks[0].text,
            language: translation.language.id,
          })),
        },
        isLoadingReminder: false,
      };
    }

    case actions.ENABLE_REMINDERS_NOTIFICATIONS_TO_SUCCESS: {
      const { payload } = action;

      return {
        ...state,
        automaticReminders: state.automaticReminders.map((item) => {
          if (item.id === payload) {
            return {
              ...item,
              enable: !item.enable,
            };
          }
          return item;
        }),
      };
    }

    case actions.ENABLE_REMINDERS_NOTIFICATIONS_TO_FAIL: {
      const { payload } = action;

      return {
        ...state,
        automaticReminders: state.automaticReminders.map((item) => {
          if (item.id === payload) {
            return {
              ...item,
              enable: !item.enable,
            };
          }
          return item;
        }),
      };
    }

    case actions.GET_REMINDERS_NOTIFICATION_BY_ID_FAIL: {
      return {
        ...state,
        isLoading: false,
      };
    }

    case actions.CREATE_TRIGGER_SUCCESS: {
      const { payload } = action;
      const index = state.eventNotifications
        .findIndex(eventNotification => eventNotification.type === payload.type);

      const event = {
        ...payload,
        translations: payload.translations.map(translation => ({
          ...translation,
          language: translation.language.id,
        })),
      };

      if (index === -1) {
        return {
          ...state,
          eventNotifications: [
            ...state.eventNotifications,
            event,
          ],
        };
      }

      return {
        ...state,
        eventNotifications: state.eventNotifications
          .map(eventNotification => ((eventNotification.type === event.type)
            ? event : eventNotification)),
      };
    }

    case actions.GET_EVENT_NOTIFICATION_FAIL: {
      return {
        ...state,
        isLoading: false,
      };
    }

    case actions.GET_EVENT_NOTIFICATION_START: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case actions.GET_EVENT_NOTIFICATION_SUCCESS: {
      const { payload } = action;

      return {
        ...state,
        isLoading: false,
        eventNotifications: payload.map(eventNotification => ({
          ...eventNotification,
          translations: eventNotification.translations.map(translation => ({
            ...translation,
            language: translation.language.id,
          })),
        })),
      };
    }

    case actions.DELETE_REMINDERS_NOTIFICATIONS_TO_SUCCESS: {
      const { payload } = action;

      return {
        ...state,
        automaticReminders: state.automaticReminders.filter(item => item.id !== payload),
      };
    }

    case actions.GET_NEW_NOTIFICATIONS_SUCCESS: {
      const { payload } = action;
      const { total, notifications: newList } = payload;
      const { listNotifications } = state;

      return {
        ...state,
        listNotifications: [...listNotifications, ...newList],
        total,
        isLoading: false,
      };
    }

    case actions.GET_NEW_NOTIFICATIONS_START: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case (actions.SET_LIST_NOTIFICATIONS): {
      const { payload } = action;
      const { total, notifications: listNotifications } = payload;
      return {
        ...state,
        listNotifications,
        total,
      };
    }

    case (actions.SET_FOUND_LIST_LMS_GROUPS): {
      const { payload } = action;
      const currentFoundListLMSGroup = payload.map(({ id, name }) => ({ id, name }));

      return {
        ...state,
        foundListLMSGroup: currentFoundListLMSGroup,
      };
    }

    case (actions.SET_FOUND_LIST_STUDENTS): {
      const { payload } = action;

      return {
        ...state,
        foundListStudent: payload,
      };
    }

    case (actions.SET_CURRENT_LMS_GROUP): {
      const { payload } = action;
      const { foundListLMSGroup } = initState;

      return {
        ...state,
        foundListLMSGroup,
        currentLMSGroup: payload,
      };
    }

    case (actions.SET_CURRENT_STUDENT): {
      const { payload } = action;
      const { foundListStudent } = initState;

      return {
        ...state,
        foundListStudent,
        currentStudent: payload,
      };
    }

    case (actions.SET_NOTIFICATIONS_TARGET_TYPE): {
      const { payload } = action;
      return {
        ...state,
        targetType: payload,
      };
    }

    case (actions.SET_INIT_STATE_NOTIFICATIONS): {
      return {
        ...initState,
      };
    }

    case (actions.GET_REMINDERS_NOTIFICATIONS_START): {
      return {
        ...state,
        isLoading: true,
      };
    }

    case (actions.GET_REMINDERS_NOTIFICATIONS_SUCCESS): {
      const { payload } = action;
      const { message, enable } = payload;
      return {
        ...state,
        automaticReminders: payload,
        message,
        enable,
        isLoading: false,
      };
    }

    case (actions.GET_REMINDERS_NOTIFICATIONS_FAIL): {
      return {
        ...state,
        isLoading: false,
      };
    }

    case (actions.CREATE_REMINDERS_NOTIFICATIONS_TO_SUCCESS): {
      return {
        ...state,
        isLoading: false,
      };
    }

    case (actions.CREATE_REMINDERS_NOTIFICATIONS_TO_FAIL): {
      const { payload } = action;
      return {
        ...state,
        error: payload,
      };
    }

    case (actions.CREATE_SEND_NOTIFICATIONS_TO_SUCCESS): {
      return {
        ...state,
      };
    }

    case (actions.CREATE_SEND_NOTIFICATIONS_TO_FAIL): {
      const { payload } = action;
      return {
        ...state,
        error: payload,
      };
    }

    default:
      return state;
  }
}
