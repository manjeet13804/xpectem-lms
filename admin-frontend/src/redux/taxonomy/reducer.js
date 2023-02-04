import { v4 as uuid } from 'uuid';
import actions from './actions';


const initState = {
  taxonomies: [],
  loadTaxonomy: false,
  error: null,
};

export default function taxonomy(state = initState, { type, payload }) {
  switch (type) {
    case actions.GET_TAXONOMY_DATA:
      return {
        ...state,
        loadTaxonomy: true,
        isSuccessBanner: false,
      };

    case actions.CLEAR_SUCCESS_RESULT_TAXONOMY: {
      return {
        ...state,
        isSuccessBanner: false,
      };
    }

    case actions.GET_TAXONOMY_DATA_SUCCESS:
      return {
        ...state,
        taxonomies: payload,
        loadTaxonomy: false,
      };

    case actions.GET_TAXONOMY_DATA_ERROR:
      return {
        ...state,
        loadTaxonomy: false,
      };

      case actions.SAVE_TAXONOMY_DATA_SUCCESS:
        return {
          ...state,
          isSuccessBanner: true,
        };

    case actions.EDIT_TAXONOMY_INFO:
      const { name, value, id } = payload;
      return {
        ...state,
        taxonomies: [...state.taxonomies.map((item) => {
          if (item.id.toString() === id.toString()) return { ...item, [name]: value };
          return item;
        })],
      };

    case actions.ADD_TAXONOMY:
      return {
        ...state,
        taxonomies: [...state.taxonomies, { ...payload, id: uuid() }],
      };

    case actions.REMOVE_TAXONOMY:
      return {
        ...state,
        taxonomies: [...state.taxonomies.filter(item => item.id !== payload)],
      };

    default:
      return state;
  }
}
