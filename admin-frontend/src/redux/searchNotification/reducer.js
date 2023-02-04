import actions from './actions';

const initState = {
  isLoadingReportNotifications: false,
  isLoadingUserNotification: false,
  users: [],
  person: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    isDeactivated: false,
  },
  error: null,
  reportNotifications: [],
  total: 0,
};

export default function notificationSearch(state = initState, { type, payload }) {
  switch (type) {
    case actions.SEARCH_USER_START:
      return {
        ...state,
        isLoadingUserNotification: true,
      };
    case actions.SEARCH_USER_SUCCESS:
      return {
        ...state,
        isLoadingUserNotification: false,
        users: payload.map(item => ({
          id: item.id,
          name: `${item.lastName} ${item.firstName}`,
          email: item.userEmail.map(email => email.email).join(' and '),
          createdAt: item.createdAt,
        })),
      };

    case actions.NOTIFICATIONS_FAIL:
      return {
        ...state,
        error: false,
      };

    case actions.CHENGE_PERSON:
      return {
        ...state,
        person: payload,
      };

    case actions.CLEAR_DATA_USER:
      return {
        ...state,
        users: [],
      };
    case actions.SET_ALL_NOTIFICATIONS_START:
      return {
        ...state,
        isLoadingReportNotifications: true,
      };
    case actions.GET_ALL_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        reportNotifications: [...state.reportNotifications, ...payload.notifications],
      };
    case actions.SET_LIST_NOTIFICATIONS: {
      return {
        ...state,
        isLoadingReportNotifications: false,
        reportNotifications: payload.notifications,
        total: payload.total,
      };
    }

    default:
      return state;
  }
}
