import _ from 'lodash';
import actions from './actions';

const initState = {
  id: null,
  avatar: '',
  firstName: '',
  lastName: '',
  user: {},
  isSuccesUpdate: false,
  error: '',
  notifications: [],
};

export default function communication(state = initState, { type, ...action }) {
  switch (type) {
    case actions.REMOVE_AVATAR: {
      return {
        ...state,
        user: {
          ...state.user,
          avatar: null,
          file: '',
        },
      };
    }

    case actions.CLEAR_NOTIFICATION: {
      return {
        ...state,
        isSuccesUpdate: false,
        error: '',
      };
    }

    case actions.USER_UPDATED: {
      return {
        ...state,
        isSuccesUpdate: true,
        error: '',
      };
    }

    case actions.FAIL_UPDATE: {
      return {
        ...state,
        isSuccesUpdate: false,
        error: action.payload,
      };
    }

    case actions.EDIT_USER_PROFILE_INFO: {
      const { payload } = action;
      const { name, value } = payload;
      const { user } = state;
      return {
        ...state,
        user: {
          ...user,
          [name]: value,
        },
      };
    }

    case actions.GET_USER_INFO: {
      const { payload } = action;
      const {
        userEmail,
        userPhone,
      } = payload;

      const emails = {
        first: _.get(userEmail, '0.email', ''),
        second: _.get(userEmail, '1.email', ''),
      };

      const phones = {
        first: _.get(userPhone, '0.phone', ''),
        second: _.get(userPhone, '1.phone', ''),
      };
      return {
        ...state,
        user: {
          ...payload,
          firstEmail: emails.first,
          secondEmail: emails.second,
          firstTelephone: phones.first,
          secondTelephone: phones.second,
          language: payload.language.id,
        },
      };
    }

    case actions.SET_CURRENT_USER: {
      const {
        payload: {
          id,
          avatar,
          firstName,
          lastName,
        },
      } = action;

      return {
        ...state,
        id,
        avatar,
        firstName,
        lastName,
      };
    }

    case (actions.ADD_USER_NOTIFICATION): {
      const { payload } = action;
      return {
        ...state,
        notifications: [
          ...state.notifications,
          payload,
        ],
      };
    }

    case (actions.REMOVE_NOTIFICATION): {
      const { payload } = action;
      return {
        ...state,
        notifications: state.notifications.filter(value => payload !== value.id),
      };
    }

    default:
      return state;
  }
}
