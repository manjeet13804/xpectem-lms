import request from 'components/restApi';
import constants from 'helpers/constants';
import { getError, errorMessage } from 'helpers/utility';

const linksApi = constants.API.linkGroups;

const actions = {
  GET_LINK_GROUPS_SUCCESS: 'GET_LINK_GROUPS_SUCCESS',

  fetchLinkGroups: querystring => async (dispatch) => {
    if (querystring) {
      try {
        const { data: { data } } = await request.get(`${linksApi}?${querystring}`);
        dispatch({
          type: actions.GET_LINK_GROUPS_SUCCESS,
          payload: data,
        });
      } catch ({ response: { data } }) {
        const error = getError(data);
        errorMessage(error);
      }
    }
  },
};

export default actions;
