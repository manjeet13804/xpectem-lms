import actions from './actions';


const initState = {
  message: [],
  postMessageLoading: false,
  isSuccessBanner: false,
  error: null,
};

export default function techSupport(state = initState, { type, payload }) {
  switch (type) {
    case actions.POST_SUPPORT_MESSAGE_LOADING:
      return {
        ...state,
        postMessageLoading: true,
        isSuccessBanner: false,
        error: null,
      };

    case actions.POST_SUPPORT_MESSAGE_SUCCESS: {
      return {
        ...state,
        postMessageLoading: false,
        isSuccessBanner: true,
      };
    }

    case actions.POST_SUPPORT_MESSAGE_ERROR:
      return {
        ...state,
        postMessageLoading: false,
        isSuccessBanner: false,
        error: true,
      };

    case actions.CLEAR_SUCCESS_SENDING_MESSAGE:
      return {
        ...state,
        isSuccessBanner: false,
      };
    default:
      return state;
  }
}
