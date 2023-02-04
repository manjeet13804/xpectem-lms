import request from 'components/restApi';
import URLS from '../urls';

const taxonomyAPI = URLS.taxonomy;

const actions = {
  GET_TAXONOMY_DATA: 'GET_TAXONOMY_DATA',
  GET_TAXONOMY_DATA_SUCCESS: 'GET_TAXONOMY_DATA_SUCCESS',
  CLEAR_SUCCESS_RESULT_TAXONOMY: 'CLEAR_SUCCESS_RESULT_TAXONOMY',
  GET_TAXONOMY_DATA_ERROR: 'GET_TAXONOMY_DATA_ERROR',
  SAVE_TAXONOMY_DATA: 'SAVE_TAXONOMY_DATA',
  SAVE_TAXONOMY_DATA_SUCCESS: 'SAVE_TAXONOMY_DATA_SUCCESS',
  SAVE_TAXONOMY_DATA_ERROR: 'SAVE_TAXONOMY_DATA_ERROR',
  EDIT_TAXONOMY_INFO: 'EDIT_TAXONOMY_INFO',
  ADD_TAXONOMY: 'ADD_TAXONOMY',
  REMOVE_TAXONOMY: 'REMOVE_TAXONOMY',

  fetchTaxonomy: ({ lmsGroupId = null, groupId = null }) => async (dispatch) => {
    try {
      dispatch({ type: actions.GET_TAXONOMY_DATA });

      if (lmsGroupId) {
        const { data: { data } } = await request.get(`${taxonomyAPI}?lmsGroupId=${lmsGroupId}`);
        dispatch({ type: actions.GET_TAXONOMY_DATA_SUCCESS, payload: data });
      }

      if (groupId) {
        const { data: { data } } = await request.get(`${taxonomyAPI}?groupId=${groupId}`);
        dispatch({ type: actions.GET_TAXONOMY_DATA_SUCCESS, payload: data });
      }
    } catch ({ response: { data } }) {
      dispatch({ type: actions.GET_TAXONOMY_DATA_ERROR });
    }
  },

  clearSuccessResultTaxonomy: () => (dispatch) => {
    dispatch({
      type: actions.CLEAR_SUCCESS_RESULT_TAXONOMY,
    });
  },

  saveTaxonomy: taxonomyData => async (dispatch) => {
    try {
      const { currentLmsGroupId } = taxonomyData;
      dispatch({ type: actions.SAVE_TAXONOMY_DATA });
      await request.post(taxonomyAPI, taxonomyData);
      dispatch({ type: actions.SAVE_TAXONOMY_DATA_SUCCESS });

      const { data: { data } } = await request.get(`${taxonomyAPI}?lmsGroupId=${currentLmsGroupId}`);
      dispatch({ type: actions.GET_TAXONOMY_DATA_SUCCESS, payload: data });
    } catch ({ response: { data } }) {
      dispatch({ type: actions.SAVE_TAXONOMY_DATA_ERROR });
    }
  },

  changeTaxonomyData: (name, value, id) => async (dispatch) => {
    dispatch({
      type: actions.EDIT_TAXONOMY_INFO,
      payload: { name, value, id },
    });
  },

  addTaxonomy: newTaxonomy => async (dispatch) => {
    if (!newTaxonomy.format) {
      delete newTaxonomy.format;
    }
    dispatch({
      type: actions.ADD_TAXONOMY,
      payload: newTaxonomy,
    });
  },

  removeTaxonomy: id => async (dispatch) => {
    dispatch({
      type: actions.REMOVE_TAXONOMY,
      payload: id,
    });
  },
};

export default actions;
