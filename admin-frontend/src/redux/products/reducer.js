import actions from './actions';

const initState = {
  productList: [],
  cardImages: [],
  mediaTransfer: {},
  currentProduct: {},
  isLoading: false,
  error: null,
  isUpdated: false,
};

export default function productReducer(state = initState, { type, payload }) {
  switch (type) {
    case actions.GET_PRODUCT_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case actions.GET_PRODUCT_SUCCESS:
      return {
        ...state,
        productList: payload,
        isLoading: false,
        error: null,
      };
    case actions.PRODUCT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case actions.GET_CURRENT_PRODUCT_SUCCESS:
      return {
        ...state,
        currentProduct: payload,
        isLoading: false,
        error: null,
      };
    case actions.UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        isUpdated: true,
      };
    case actions.CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        isUpdated: true,
      };
    case actions.DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        isUpdated: true,
      };
    case actions.DELETE_CARD_IMAGES_SUCCESS:
      return {
        ...state,
      };
    case actions.GET_CARD_IMAGES_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case actions.GET_CARD_IMAGES_SUCCESS:
      return {
        ...state,
        cardImages: payload,
        isLoading: false,
        error: null,
      };
    case actions.GET_MEDIA_TRANSFER_SUCCESS:
      return {
        ...state,
        mediaTransfer: payload,
        isLoading: false,
        error: null,
      };
    case actions.UPDATE_CARD_IMAGES_SUCCESS:
      return {
        ...state,
        isUpdated: true,
      };
    case actions.REMOVE_IS_UPDATED_STATUS:
      return {
        ...state,
        isUpdated: false,
      };
    case actions.CLEAR_PRODUCT:
      return {
        ...state,
        productList: [],
      }
    default:
    return state;
  }
}
