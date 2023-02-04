import request from 'components/restApi';
import URLS from 'redux/urls';
import {
  getError,
  errorMessage,
  getMessage,
} from 'helpers/utility';

const actions = {
  GET_MATERIALS: 'GET_MATERIALS',
  GET_MATERIALS_START: 'GET_MATERIALS_START',
  GET_MATERIALS_SUCCESS: 'GET_MATERIALS_SUCCESS',
  GET_MATERIALS_FAILURE: 'GET_MATERIALS_FAILURE',

  GET_OPTIONS: 'GET_OPTIONS',
  GET_OPTIONS_START: 'GET_OPTIONS_START',
  GET_OPTIONS_SUCCESS: 'GET_OPTIONS_SUCCESS',
  GET_OPTIONS_FAILURE: 'GET_OPTIONS_FAILURE',

  UPDATE_VALUE: 'UPDATE_VALUE',
  REMOVE_IS_UPDATED_STATUS: 'REMOVE_IS_UPDATED_STATUS',

  getOptions: (type) => async (dispatch) => {
    try {
      dispatch({ type: actions.GET_OPTIONS_START });
      const { data: { data } } = await request.get(URLS[type]);
      dispatch({ type: actions.GET_OPTIONS_SUCCESS, payload: {data, field: type} });
    } catch ({ response: { data } }) {
      const error = getError(data);
      errorMessage(error.message);
      dispatch({ type: actions.GET_OPTIONS_FAILURE, payload: error });
    }
  },

  getOneProduct: (id) => async (dispatch) => {
    try {
      dispatch({ type: actions.GET_CURRENT_PRODUCT_START });
      const { data: { data } } = await request.get(`${URLS.product}/${id}`);
      dispatch({ type: actions.GET_CURRENT_PRODUCT_SUCCESS, payload: data });
    } catch ({ response: { data } }) {
      const error = getError(data);
      errorMessage(error.message);
      dispatch({ type: actions.GET_PRODUCT_FAILURE, payload: error });
    }
  },

  updateProduct: ({id, values}) => async (dispatch) => {
    if (id) {
      try {
        await request.put(`${URLS.product}/${id}`, values);
        dispatch({ type: actions.UPDATE_PRODUCT_SUCCESS });
        const status = [{ status: 'update' }];
        getMessage(status, 'productStatuses');
      } catch (error) {
        errorMessage(error.message);
        dispatch({ type: actions.UPDATE_PRODUCT_FAILURE, error });
      }
    }
  },

  removeIsUpdatedStatus: () => ({ type: actions.REMOVE_IS_UPDATED_STATUS }),
};
export default actions;
