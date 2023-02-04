import actions from './actions';

const initState = {
  linkGroups: [],
};

export default function cardReducer(state = initState, { type, ...action }) {
  switch (type) {
    case actions.GET_LINK_GROUPS_SUCCESS: {
      const { payload } = action;

      return {
        ...state,
        linkGroups: payload,
      };
    }

    default:
      return state;
  }
}
