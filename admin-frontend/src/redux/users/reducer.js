import actions from './actions';
const initState = {
  users: [],
  total: null,
  isNewUser: false,
  isUpdated: false,
  isLoading: false,
};

export default function cardReducer(state = initState, { type, ...action }) {
  switch (type) {
    case actions.GET_USERS_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case actions.GET_USERS: {
      const { payload } = action;
      return {
        ...state,
        users: payload.data,
        total: payload.total,
        isLoading: false,
      };
    }
    case actions.GET_USERS_FAILURE: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case actions.DELETE_USER_SUCCESS: {
      const { payload } = action;
      return {
        ...state,
        users: state.users.filter( item => item.id !== payload )
      }
    }
    case actions.NEED_UPDATE_USERS: {
      return {
        ...state,
        isUpdated: true,
      };
    }
    case actions.REMOVE_IS_UPDATED_STATUS: {
      return {
        ...state,
        isUpdated: false,
      };
    }
    default:
      return state;
  }
}
