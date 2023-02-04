import actions from './actions';

const initState = {
  colors: [],
  materials: [],
  sizes: [],
  isLoading: false,
  error: null,
  isUpdated: false,
};

export default function createArt(state = initState, { type, payload }) {
  switch (type) {
    case actions.GET_OPTIONS_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case actions.GET_OPTIONS_SUCCESS:
      const { data, field } = payload;
      return {
        ...state,
        [`${field}`]: data,
        isLoading: false,
        error: null,
      };
    case actions.GET_OPTIONS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case actions.UPDATE_VALUE:
      return {
        ...state,
        isUpdated: true,
      };
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
