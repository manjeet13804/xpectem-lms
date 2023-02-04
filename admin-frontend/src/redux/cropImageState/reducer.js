import actions from './actions';

const initState = {
  croppedImageUrl: null,
  dragging: false,
  file: null,
  imageSrc: null,
  crop: null,
  pixelCrop: null,
  disableBtn: true,
  blobFile: null,
  errors: '',
};

export default function cropImageReducer(state = initState, { type, payload }) {
  switch (type) {
    case actions.SET_STATE_CROP_IMAGE:
      return {
        ...state,
        ...payload,
      }
      
    case actions.SET_INIT_STATE_CROP_IMAGE:
      return {
        ...initState,
      }
    default:
      return state;
  }
}
