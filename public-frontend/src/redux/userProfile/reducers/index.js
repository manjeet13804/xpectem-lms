// @flow
import union from 'lodash/union';
import { USER_ROLES_ENUM } from 'constants/enums';
import types from '../types';
import { GET_MY_COURSES_SUCCESS } from '../../my-courses/types';
import {
  StateType,
  StartType,
  SuccessType,
  FailType,
  LoginDefaultType,
  LoginOffType,
} from '../flowTypes';
import { GetMyCoursesSuccessType } from '../../my-courses/flowTypes';

const {
  LOGIN_IN_START,
  LOGIN_IN_SUCCESS,
  LOGIN_IN_FAIL,
  LOGIN_OFF,
  LOGIN_DEFAULT,
  UPLOAD_USER_AVATAR_START,
  UPLOAD_USER_AVATAR_SUCCESS,
  UPLOAD_USER_AVATAR_FAIL,
  GET_CURRENT_PROFILE_START,
  GET_CURRENT_PROFILE_SUCCESS,
  GET_CURRENT_PROFILE_FAIL,
  PUT_CURRENT_PROFILE_START,
  PUT_CURRENT_PROFILE_SUCCESS,
  PUT_CURRENT_PROFILE_FAIL,
  RESET_PASSWORD_START,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  CLOSE_ACCOUNT_START,
  CLOSE_ACCOUNT_SUCCESS,
  CLOSE_ACCOUNT_FAIL,
  ADD_NEW_EMAIL_START,
  ADD_NEW_EMAIL_SUCCESS,
  ADD_NEW_EMAIL_FAIL,
} = types;

const INITIAL_STATE = {
  error: null,
  loading: null,
  firstName: null,
  lastName: null,
  email: null,
  roles: USER_ROLES_ENUM.none,
  groups: [],
  avatar: {},
  profile: {},
  id: null,
};

type ActionType =
  | SuccessType
  | LoginOffType
  | FailType
  | StartType
  | LoginDefaultType
  | GetMyCoursesSuccessType;

export default (
  state: StateType = INITIAL_STATE,
  { type, payload }: ActionType,
): StateType => {
  switch (type) {
    case LOGIN_IN_SUCCESS: {
      const {
        email,
        roles,
        avatar,
        firstName,
        lastName,
        isRemember,
        token,
        id,
      } = payload;

      if (token) {
        if (isRemember) {
          localStorage.setItem('token', token);
        }
        sessionStorage.setItem('token', token);
      }

      return {
        ...state,
        email,
        roles,
        firstName,
        lastName,
        avatar,
        id,
        loading: false,
      };
    }
    case LOGIN_IN_FAIL: {
      sessionStorage.removeItem('token');
      localStorage.removeItem('token');
      return {
        ...INITIAL_STATE,
        error: payload,
        loading: false,
      };
    }

    case LOGIN_IN_START: {
      return {
        ...state,
        loading: true,
      };
    }

    case GET_CURRENT_PROFILE_SUCCESS: {
      return {
        ...state,
        profile: {
          data: payload,
          loading: false,
        },
      };
    }
    case GET_CURRENT_PROFILE_FAIL: {
      return {
        ...state,
        profile: {
          error: payload,
          loading: false,
        },
      };
    }

    case PUT_CURRENT_PROFILE_START: {
      return {
        ...state,
        profile: {
          ...state.profile,
          loading: true,
        },
      };
    }

    case PUT_CURRENT_PROFILE_SUCCESS: {
      return {
        ...state,
        profile: {
          data: payload,
          loading: false,
        },
      };
    }

    case PUT_CURRENT_PROFILE_FAIL: {
      return {
        ...state,
        profile: {
          ...state.profile,
          error: payload,
          loading: false,
        },
      };
    }

    case RESET_PASSWORD_START: {
      return {
        ...state,
        loading: true,
      };
    }

    case RESET_PASSWORD_SUCCESS: {
      sessionStorage.removeItem('token');
      localStorage.removeItem('token');
      return INITIAL_STATE;
    }

    case RESET_PASSWORD_FAIL: {
      return {
        ...state,
        error: payload,
        loading: false,
      };
    }

    case CLOSE_ACCOUNT_START: {
      return {
        ...state,
        loading: true,
      };
    }

    case CLOSE_ACCOUNT_SUCCESS: {
      sessionStorage.removeItem('token');
      localStorage.removeItem('token');
      return {
        ...state,
        email: null,
      };
    }

    case CLOSE_ACCOUNT_FAIL: {
      return {
        ...state,
        error: payload,
        loading: false,
      };
    }

    case LOGIN_DEFAULT: {
      return {
        ...state,
        error: null,
      };
    }

    case LOGIN_OFF: {
      sessionStorage.removeItem('token');
      localStorage.removeItem('token');
      return INITIAL_STATE;
    }

    case GET_CURRENT_PROFILE_START: {
      return {
        ...state,
        profile: {
          loading: true,
        },
      };
    }

    case UPLOAD_USER_AVATAR_START: {
      return {
        ...state,
        avatar: {
          loading: true,
          success: false,
        },
      };
    }

    case UPLOAD_USER_AVATAR_SUCCESS: {
      return {
        ...state,
        avatar: {
          loading: false,
          success: true,
        },
      };
    }

    case UPLOAD_USER_AVATAR_FAIL: {
      return {
        ...state,
        avatar: {
          loading: false,
          success: false,
          error: payload,
        },
      };
    }

    case GET_MY_COURSES_SUCCESS: {
      return {
        ...state,
        groups: union(state.groups, Object.keys(payload.groups).map(Number)),
      };
    }

    case ADD_NEW_EMAIL_START: {
      return {
        ...state,
        profile: {
          loading: true,
        },
      };
    }

    case ADD_NEW_EMAIL_SUCCESS: {
      return {
        ...state,
        profile: {
          data: payload,
          loading: false,
          success: true,
        },
      };
    }

    case ADD_NEW_EMAIL_FAIL: {
      return {
        ...state,
        profile: {
          error: payload,
          loading: false,
          success: false,
        },
      };
    }

    default:
      return state;
  }
};
