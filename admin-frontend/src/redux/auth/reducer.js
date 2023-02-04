import actions from './actions';

const initState = {
  idToken: null,
  id: null,
  role: [],
  email: '',
  isLoggedIn: false,
  isLoading: false,
  isResetEmailSend: false,
  error: null,
  avatar: '',
  lmsGroup: '',
  user: {},
};

export default function authReducer(state = initState, action) {
  switch (action.type) {
    case actions.GET_USER_INFO: {
      const { payload } = action;

      return {
        ...state,
        user: payload,
      };
    }

    case actions.LOGIN_SUCCESS: {
      const {
        token,
        id,
        roles,
        email,
        firstName,
        lastName,
        avatar,
        lmsGroups,
      } = action.payload;

      const lmsGroup = lmsGroups[0];

      return {
        ...state,
        idToken: token,
        id,
        role: roles,
        email,
        isLoggedIn: true,
        error: null,
        firstName,
        lastName,
        avatar,
        lmsGroup: lmsGroup ? lmsGroup.name : '',
      };
    }
    case actions.LOGIN_FAILURE: {
      const { error } = action;
      return {
        ...state,
        idToken: null,
        isLoggedIn: false,
        error,
      };
    }

    case actions.SEND_RESET_MAIL_START: {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }

    case actions.SEND_RESET_MAIL_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isResetEmailSend: true,
      };
    }

    case actions.SEND_RESET_MAIL_FAILURE: {
      const { error } = action;
      return {
        ...state,
        isLoading: false,
        error,
      };
    }

    case actions.CLEAR_RESET_MAIL: {
      return {
        ...state,
        isLoading: false,
        isResetEmailSend: false,
        error: null,
      };
    }

    case actions.SET_AUTH_VALUE: {
      return {
        ...state,
        ...action,
      };
    }
    case actions.LOGOUT: {
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');

      return initState;
    }

    default:
      return state;
  }
}
