import request from 'components/restApi';
import URLS from '../urls';

const techSupportApi = URLS.techSupport;

const actions = {
  POST_SUPPORT_MESSAGE_LOADING: 'POST_SUPPORT_MESSAGE_LOADING',
  POST_SUPPORT_MESSAGE_SUCCESS: 'POST_SUPPORT_MESSAGE_SUCCESS',
  POST_SUPPORT_MESSAGE_ERROR: 'POST_SUPPORT_MESSAGE_ERROR',
  CLEAR_SUCCESS_SENDING_MESSAGE: 'CLEAR_SUCCESS_SENDING_MESSAGE',

  sendSupportMessage: (body, clearForm) => async (dispatch) => {
    try {
      dispatch({ type: actions.POST_SUPPORT_MESSAGE_LOADING });
      await request.post(techSupportApi, body);
      dispatch({ type: actions.POST_SUPPORT_MESSAGE_SUCCESS });
      clearForm();
    } catch ({ response: { data } }) {
      dispatch({ type: actions.POST_SUPPORT_MESSAGE_ERROR });
    }
  },

  clearSuccessSendingMessage: () => (dispatch) => {
    dispatch({
      type: actions.CLEAR_SUCCESS_SENDING_MESSAGE,
    });
  },
};

export default actions;
