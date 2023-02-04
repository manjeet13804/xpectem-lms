import request from 'components/restApi';
import URLS from 'redux/urls';
import {
  errorMessage,
  getMessage,
} from 'helpers/utility';

const actions = {
  GET_PRODUCT: 'GET_PRODUCT',
  GET_PRODUCT_START: 'GET_PRODUCT_START',
  GET_PRODUCT_SUCCESS: 'GET_PRODUCT_SUCCESS',
  PRODUCT_FAILURE: 'PRODUCT_FAILURE',

  GET_CURRENT_PRODUCT_START: 'GET_CURRENT_PRODUCT_START',
  GET_CURRENT_PRODUCT_SUCCESS: 'GET_CURRENT_PRODUCT_SUCCESS',

  UPDATE_PRODUCT_SUCCESS: 'UPDATE_PRODUCT_SUCCESS',
  UPDATE_CURRENT_PRODUCT: 'UPDATE_CURRENT_PRODUCT',
  REMOVE_IS_UPDATED_STATUS: 'REMOVE_IS_UPDATED_STATUS',

  CREATE_PRODUCT_SUCCESS: 'CREATE_PRODUCT_SUCCESS',

  DELETE_PRODUCT_SUCCESS: 'DELETE_PRODUCT_SUCCESS',

  GET_CARD_IMAGES_START: 'GET_CARD_IMAGES_START',
  GET_CARD_IMAGES_SUCCESS: 'GET_CARD_IMAGES_SUCCESS',
  GET_CARD_IMAGES_FAILURE: 'GET_CARD_IMAGES_FAILURE',

  GET_MEDIA_TRANSFER_START: 'GET_MEDIA_TRANSFER_START',
  GET_MEDIA_TRANSFER_SUCCESS: 'GET_MEDIA_TRANSFER_SUCCESS',

  DELETE_CARD_IMAGES: 'DELETE_CARD_IMAGES',
  DELETE_CARD_IMAGES_SUCCESS: 'DELETE_CARD_IMAGES_SUCCESS',

  UPDATE_CARD_IMAGES: 'UPDATE_CARD_IMAGES',
  UPDATE_CARD_IMAGES_SUCCESS: 'UPDATE_CARD_IMAGES_SUCCESS',

  ADD_CARD_IMAGES: 'ADD_CARD_IMAGES',
  ADD_CARD_IMAGES_SUCCESS: 'ADD_CARD_IMAGES_SUCCESS',

  CLEAR_PRODUCT: 'CLEAR_PRODUCT',

  getProducts: (type) => async (dispatch) => {
    try {
      dispatch({ type: actions.GET_PRODUCT_START });
      const { data: { data } } = await request.get(URLS.product, {params: { type }});
      dispatch({ type: actions.GET_PRODUCT_SUCCESS, payload: data });
    } catch (err) {
      errorMessage(err.message);
      dispatch({ type: actions.PRODUCT_FAILURE, payload: err });
    }
  },

  getOneProduct: (id) => async (dispatch) => {
    try {
      dispatch({ type: actions.GET_CURRENT_PRODUCT_START });
      const { data: { data } } = await request.get(`${URLS.product}/${id}`);
      dispatch({ type: actions.GET_CURRENT_PRODUCT_SUCCESS, payload: data });
    } catch (err) {
      errorMessage(err.message);
      dispatch({ type: actions.PRODUCT_FAILURE, payload: err });
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
        dispatch({ type: actions.PRODUCT_FAILURE, error });
      }
    }
  },

  deleteProduct: (id) => async (dispatch) => {
    try {
      await request.delete(`${URLS.product}/${id}`);
      dispatch({ type: actions.DELETE_PRODUCT_SUCCESS });
    } catch (error) {
      errorMessage(error.message);
      dispatch({ type: actions.PRODUCT_FAILURE, error });
    }
  },

  addProductOption: ({id, values}) => async (dispatch) => {
    try {
      await request.post(URLS.productAddOption(id), values);
      dispatch({ type: actions.CREATE_PRODUCT_SUCCESS });
      const status = [{ status: 'created' }];
      getMessage(status, 'productStatuses');
    } catch (error) {
      errorMessage(error.message);
      dispatch({ type: actions.PRODUCT_FAILURE, error });
    }
  },

  getMediaTransfer: () => async (dispatch) => {
    try {
      dispatch({ type: actions.GET_MEDIA_TRANSFER_START });
      const { data: { data } } = await request.get(URLS.productMediaTransfer);
      dispatch({ type: actions.GET_MEDIA_TRANSFER_SUCCESS, payload: data });
    } catch (err) {
      errorMessage(err.message);
      dispatch({ type: actions.PRODUCT_FAILURE, payload: err });
    }
  },

  createGiftCard: ({values}) => async (dispatch) => {
    try {
      await request.post(URLS.productGift, values);
      dispatch({ type: actions.CREATE_PRODUCT_SUCCESS });
      const status = [{ status: 'created' }];
      getMessage(status, 'productStatuses');
    } catch (error) {
      errorMessage(error.message);
      dispatch({ type: actions.PRODUCT_FAILURE, error });
    }
  },

  getCardImages: () => async (dispatch) => {
    try {
      dispatch({ type: actions.GET_CARD_IMAGES_START });
      const { data: { data } } = await request.get(URLS.productGiftImg);
      dispatch({ type: actions.GET_CARD_IMAGES_SUCCESS, payload: data });
    } catch (err) {
      errorMessage(err.message);
      dispatch({ type: actions.PRODUCT_FAILURE, payload: err });
    }
  },

  updateCardImages: ({id, values}) => async (dispatch) => {
    try {
      dispatch({ type: actions.UPDATE_CARD_IMAGES });
      await request.put(`${URLS.productGiftImg}/${id}`, values);
      dispatch({ type: actions.UPDATE_CARD_IMAGES_SUCCESS });
      const status = [{ status: 'update' }];
      getMessage(status, 'productStatuses');
    } catch (err) {
      errorMessage(err.message);
      dispatch({ type: actions.PRODUCT_FAILURE, payload: err });
    }
  },

  addCardImages: ({values}) => async (dispatch) => {
    const { name, index, file } = values;
    file.append('name', name);
    file.append('index', index);
    try {
      dispatch({ type: actions.ADD_CARD_IMAGES });
      await request({
        method: 'POST',
        headers: { 'content-type': 'multipart/form-data' },
        url: URLS.productGiftImg,
        data: file,
      });
      dispatch({ type: actions.ADD_CARD_IMAGES_SUCCESS });
      const status = [{ status: 'imgAdded' }];
      getMessage(status, 'productStatuses');
    } catch (err) {
      errorMessage(err.message);
      dispatch({ type: actions.PRODUCT_FAILURE, payload: err });
    }
  },

  deleteCardImages: (id) => async (dispatch) => {
    try {
      dispatch({ type: actions.DELETE_CARD_IMAGES });
      await request.delete(`${URLS.productGiftImg}/${id}`);
      dispatch({ type: actions.DELETE_CARD_IMAGES_SUCCESS });
    } catch (err) {
      errorMessage(err.message);
      dispatch({ type: actions.PRODUCT_FAILURE, payload: err });
    }
  },

  clearProduct: () => ({ type: actions.CLEAR_PRODUCT }),
  editProduct: () => ({ type: actions.UPDATE_CURRENT_PRODUCT }),
  removeIsUpdatedStatus: () => ({ type: actions.REMOVE_IS_UPDATED_STATUS }),
};
export default actions;
