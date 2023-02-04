import {
  errorMessage,
  getMessage,
} from 'helpers/utility';
import request from 'components/restApi';
import URLS from 'redux/urls';

const actions = {
  GET_ZIP_CODES: 'GET_ZIP_CODES',
  GET_ZIP_CODES_SUCCESS: 'GET_ZIP_CODES_SUCCESS',
  ZIP_CODES_FAILURE: 'ZIP_CODES_FAILURE',
  ZIP_CODES_SUCCESS: 'ZIP_CODES_SUCCESS',

  getZipCodes: () => async (dispatch) => {
    try {
      dispatch({ type: actions.GET_ZIP_CODES });
      const { data: { data } } = await request.get(URLS.zipCodes);
      dispatch({ type: actions.GET_ZIP_CODES_SUCCESS, payload: data });
    } catch (err) {
      errorMessage(err.message);
      dispatch({ type: actions.ZIP_CODES_FAILURE, payload: err });
    }
  },

  addZipCodes: (values) => async (dispatch) => {
    try {
      await request.post(URLS.zipCodes, values);
      const status = [{ status: 'addedCoupon' }];
      getMessage(status, 'couponStatuses');
      dispatch({ type: actions.ZIP_CODES_SUCCESS});
    } catch (err) {
      errorMessage(err.message);
      dispatch({ type: actions.ZIP_CODES_FAILURE, payload: err });
    }
  },

  deleteZipCode: (id) => async (dispatch) => {
    try {
      await request.delete(`${URLS.zipCodes}/${id}`);
      dispatch({ type: actions.ZIP_CODES_SUCCESS });
    } catch (err) {
      errorMessage(err.message);
      dispatch({ type: actions.ZIP_CODES_FAILURE, payload: err });
    }
  },
};

export default actions;
