const actions = {
  SET_STATE_CROP_IMAGE: 'SET_STATE_CROP_IMAGE',
  SET_INIT_STATE_CROP_IMAGE: 'SET_INIT_STATE_CROP_IMAGE',
  
  setStateCropImage: (payload) => ({ type: actions.SET_STATE_CROP_IMAGE, payload }),
  setInitStateCropImage: () => ({ type: actions.SET_INIT_STATE_CROP_IMAGE }),
};
export default actions;
