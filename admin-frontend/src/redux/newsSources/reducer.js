import actions from './actions';

const initEditableSourceState = {
  name: '',
  color: '#FFFFFF',
  domain: '',
  websiteUri: '',
  imageUri: null,
  isPrioritized: false,
  isActive: false,
};

const initState = {
  newsSources: [],
  editableSource: initEditableSourceState,
  isNewSourcesLoading: false,
  total: 0,
  isUpdatedOrCreated: false,
};

export default function cardReducer(state = initState, { type, ...action }) {
  switch (type) {
    case actions.GET_NEWS_SOURCES_START: {
      return {
        ...state,
        isNewSourcesLoading: true,
        isUpdatedOrCreated: false,
      };
    }
    case actions.GET_NEWS_SOURCES: {
      const { data, total } = action.newsSources;

      return {
        ...state,
        newsSources: data,
        total,
        isNewSourcesLoading: false,
      };
    }
    case actions.GET_NEWS_SOURCES_FAILURE: {
      return {
        ...state,
        isNewSourcesLoading: false,
      };
    }
    case actions.GET_NEWS_SOURCE_START: {
      return {
        ...state,
        isNewSourcesLoading: true,
      };
    }
    case actions.GET_NEWS_SOURCE_SUCCESS: {
      const { data, forSearch } = action;

      return {
        ...state,
        editableSource: data,
        isNewSourcesLoading: false,
        ...(forSearch && { newsSources: [data] }),
      };
    }
    case actions.DELETE_EDITABLE_NEWS_SOURCE: {
      return {
        ...state,
        editableSource: initEditableSourceState,
      };
    }
    case actions.GET_NEWS_SOURCE_FAILURE: {
      return {
        ...state,
        isNewSourcesLoading: false,
      };
    }
    case actions.SOURCE_DELETE_STATUS_CHANGE_START: {
      return {
        ...state,
        isNewSourcesLoading: true,
      };
    }
    case actions.SOURCE_DELETE_STATUS_CHANGE_SUCCESS: {
      const { payload: { ids, isDeleted } } = action;

      if (!ids.length) {
        return {
          ...state,
          isNewSourcesLoading: false,
        };
      }

      const newsSources = state.newsSources.map((source) => {
        const index = ids.findIndex(id => id === source.id);

        if (index !== -1) {
          return {
            ...source,
            isDeleted,
          };
        }

        return source;
      });

      return {
        ...state,
        isNewSourcesLoading: false,
        newsSources,
      };
    }

    case actions.UPDATE_NEWS_SOURCE_START: {
      return {
        ...state,
        isNewSourcesLoading: true,
      };
    }

    case actions.UPDATE_NEWS_SOURCE_SUCCESS: {
      const { payload: { data, updateStatus } } = action;
      const { newsSources } = state;

      const updatedNewSources = newsSources.map((source) => {
        const index = data.findIndex(item => item.id === source.id);

        if (index !== -1) {
          return {
            ...source,
            ...data[index],
          };
        }

        return source;
      });

      return {
        ...state,
        newsSources: updatedNewSources,
        isNewSourcesLoading: false,
        ...(!updateStatus && { isUpdatedOrCreated: true }),
      };
    }

    case actions.UPDATE_NEWS_SOURCE_FAIL: {
      return {
        ...state,
        isNewSourcesLoading: false,
      };
    }

    case actions.EDIT_EDITABLE_SOURCE: {
      const { data } = action;

      return {
        ...state,
        editableSource: {
          ...state.editableSource,
          ...data,
        },
      };
    }

    case actions.CREATE_NEWS_SOURCE: {
      return {
        ...state,
        isUpdatedOrCreated: true,
      };
    }

    case actions.RESET_IS_UPDATED_STATUS: {
      return {
        ...state,
        isUpdatedOrCreated: false,
      };
    }

    default:
      return state;
  }
}
