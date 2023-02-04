import actions from './actions';

const initState = {
  zipCodes: [],
  error: null,
  isLoading: false,
};

export default function zipReducer(state = initState, { type, ...action }) {
  switch (type) {
    case actions.GET_ZIP_CODES_SUCCESS: {
      return {
        ...state,
        zipCodes: action.payload,
        error: null,
      };
    }

    case actions.ZIP_CODES_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }

    default:
      return state;
  }
}
