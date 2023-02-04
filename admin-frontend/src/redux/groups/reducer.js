import _ from 'lodash';
import actions from './actions';

const initState = {
  currentGroup: {
    name: '',
    translations: [
      { language: 1, description: '' },
      { language: 2, description: '' },
      { language: 3, description: '' },
    ],
    isActive: true,
  },
  isLoading: false,
  isSuccessResult: false,
  searchOrgData: [],
  searchGroupsData: [],
  currentGroupId: null,
  currentNameGroup: '',
  currentNameOrg: '',
  currentOrgId: null,
  isImportFile: false,
  errorImport: '',
  isAddGroupLoading: false,
  createdGroupName: '',
  errors: [],
};

export default function groups(state = initState, { type, ...action }) {
  switch (type) {
    case actions.CLEAR_RESULTS: {
      return {
        ...state,
        isImportFile: false,
        errorImport: '',
        isAddGroupLoading: false,
        errors: [],
      };
    }

    case actions.CHANGE_INFO_GROUP: {
      const { payload } = action;
      const { name, value } = payload;
      const { currentGroup } = state;
      return {
        ...state,
        currentGroup: {
          ...currentGroup,
          [name]: value,
        },
      };
    }

    case actions.IMPORT_CSV_GROUPS_START: {
      return {
        ...state,
        isLoading: true,
        isImportFile: true,
      };
    }

    case actions.IMPORT_CSV_GROUPS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isImportFile: true,
      };
    }
    case actions.IMPORT_CSV_GROUPS_FAILURE: {
      const { payload } = action;
      const { error, errors } = payload;

      return {
        ...state,
        isLoading: false,
        isImportFile: false,
        errorImport: error,
        errors,
      };
    }

    case actions.EDIT_GROUP_GROUPS_START:
      return {
        ...state,
        isLoadingEditGroup: true,
      };

    case actions.EDIT_GROUP_GROUPS_SUCCESS: {
      return {
        ...state,
        isSuccessResult: true,
        isLoadingEditGroup: false,
      };
    }

    case actions.EDIT_GROUP_GROUPS_FAILURE: {
      return {
        ...state,
        isEditGroup: false,
        isLoadingEditGroup: false,
      };
    }

    case actions.GET_CURRENT_GROUP_SUCCESS: {
      const { payload } = action;
      const { translations } = payload;
      let newTranslations = [...initState.currentGroup.translations];

      newTranslations = _.merge([], newTranslations, translations);
      return {
        ...state,
        isLoadingGettingGroup: false,
        currentGroup: {
          ...payload,
          translations: [
            ...newTranslations,
          ],
        },
      };
    }

    case actions.GET_CURRENT_GROUP_START:
      return {
        ...state,
        isLoadingGettingGroup: true,
      };

    case actions.GET_CURRENT_GROUP_FAILURE:
      return {
        isLoadingGettingGroup: false,
      };

    case actions.ADD_INPUT_GROUP_GROUPS: {
      const { payload } = action;
      const { currentGroup } = state;

      return {
        ...state,
        currentGroup: {
          ...currentGroup,
          name: payload,
        },
      };
    }

    case actions.CHANGE_DESCRIPTION_GROUPS: {
      const { payload: { value, name, lang } } = action;
      const {
        currentGroup,
        currentGroup: {
          translations,
        } = {},
      } = state;

      translations.map((item, index) => {
        if (index === lang) {
          item[name] = value;
        }
        return null;
      });

      return {
        ...state,
        currentGroup: {
          ...currentGroup,
          translations: [
            ...translations,
          ],
        },
      };
    }

    case actions.ADD_GROUP_GROUPS_SUCCESS: {
      return {
        ...state,
        isSuccessResult: true,
        isAddGroupLoading: false,
      };
    }

    case actions.ADD_GROUP_GROUPS_FAILURE: {
      const { payload } = action;

      return {
        ...state,
        error: payload,
        isAddGroupLoading: false,
      };
    }

    case actions.SET_CURRENT_ID_GROUP_GROUPS: {
      const { payload } = action;

      return {
        ...state,
        currentGroupId: payload,
      };
    }

    case actions.SET_CURRENT_NAME_ORG_GROUPS: {
      const { payload } = action;

      return {
        ...state,
        currentNameOrg: payload,
      };
    }

    case actions.SET_CURRENT_NAME_GROUP_GROUPS: {
      const { payload } = action;

      return {
        ...state,
        currentNameGroup: payload,
      };
    }

    case actions.SET_CURRENT_ORG_ID_GROUPS: {
      const { payload } = action;

      return {
        ...state,
        currentOrgId: payload,
      };
    }

    case actions.SET_CURRENT_GROUP_ID_GROUPS: {
      const { payload } = action;

      return {
        ...state,
        currentGroupId: payload,
      };
    }

    case actions.SEARCH_GROUPS_GROUPS: {
      const { payload } = action;

      return {
        ...state,
        searchGroupsData: payload,
      };
    }

    case actions.SEARCH_ORG_GROUPS: {
      const { payload } = action;

      return {
        ...state,
        searchOrgData: payload,
      };
    }

    case actions.TOGGLE_ORGANISATIONS_SWITCH: {
      const { orgSearch } = state;
      const { id: currentCheckbox } = action;
      const orgSearchId = orgSearch.findIndex(
        ({ id }) => id === currentCheckbox,
      );
      const { check } = orgSearch[orgSearchId];

      const orgSearchItem = { ...orgSearch[orgSearchId], check: !check };
      const newOrgSearch = [...orgSearch];
      newOrgSearch[orgSearchId] = orgSearchItem;

      return {
        ...state,
        orgSearch: [
          ...newOrgSearch,
        ],
      };
    }

    case actions.CLEAR_SUCCESS_RESULT_GROUPS:
      return {
        ...state,
        isSuccessResult: false,
      };

    case actions.ADD_GROUP_GROUPS_START:
      return {
        ...state,
        isAddGroupLoading: true,
      };


    case actions.SET_INIT_STATE_GROUPS:
      return {
        ...initState,
        isSuccessResult: state.isSuccessResult,
        createdGroupName: state.currentGroup.name,
        currentGroup: {
          ...initState.currentGroup,
          translations: [
            { language: 1, description: '' },
            { language: 2, description: '' },
            { language: 3, description: '' },
          ],
        },
      };

    case actions.SET_INIT_STATE_FULL_GROUPS:
      return {
        ...initState,
        currentGroup: {
          ...initState.currentGroup,
          translations: [ // TODO FIX Mutation
            { language: 1, description: '' },
            { language: 2, description: '' },
            { language: 3, description: '' },
          ],
        },
      };

    default:
      return state;
  }
}
