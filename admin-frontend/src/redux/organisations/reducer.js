import _ from 'lodash';
import actions from './actions';

const initState = {
  currentOrg: {
    name: '',
    lmsGroup: '',
    adminFullAccess: false,
    translations: [
      {
        language: 1, description: '', adminWelcomeText: '', studentWelcomeText: '',
      },
      {
        language: 2, description: '', adminWelcomeText: '', studentWelcomeText: '',
      },
      {
        language: 3, description: '', adminWelcomeText: '', studentWelcomeText: '',
      },
    ],
    file: null,
    logoImageUri: '',
    isActive: true,
  },
  searchLmsGroupsData: [],
  searchOrgData: [],
  currentLmsGroupOrg: {},
  currentLmsGroupIdOrg: null,
  currentNameLmsGroupOrg: '',
  currentOrgId: null,
  isDeletedOrg: false,
  error: '',
  isSuccessResult: false,
  createdOrganisation: '',
  isLoading: false,
  isLoadingEdit: false,
};

const copyInitState = _.cloneDeep(initState);

export default function organisations(state = initState, { type, ...action }) {
  switch (type) {
    case actions.SET_INITIAL_PROPS_ORG: {
      return { ..._.cloneDeep(copyInitState) };
    }


    case actions.REMOVE_DOWNLOAD_LINK_IMG:
      return {
        ...state,
        currentOrg: {
          ...state.currentOrg,
          logoImageUri: '',
        },
      };


    case actions.GET_CURRENT_ORG_START:
      return {
        ...state,
        isLoadingInitData: true,
      };

    case actions.GET_CURRENT_ORG_SUCCESS: {
      const { payload } = action;
      const { translations } = payload;
      let newTranslations = [...initState.currentOrg.translations];

      newTranslations = _.merge([], newTranslations, translations);
      return {
        ...state,
        isLoadingInitData: false,
        currentOrg: {
          ...payload,
          translations: [
            ...newTranslations,
          ],
        },
      };
    }

    case actions.GET_CURRENT_ORG_FAILURE: {
      const { payload } = action;

      return {
        ...state,
        isLoadingInitData: false,
        error: payload,
      };
    }

    case actions.GET_LMS_GROUP_BY_ID_ORG: {
      const { payload } = action;

      return {
        ...state,
        currentLmsGroupOrg: payload,
      };
    }

    case actions.ADD_INPUT_ORG: {
      const { payload } = action;
      const { currentOrg } = state;

      return {
        ...state,
        currentOrg: {
          ...currentOrg,
          name: payload,
        },
      };
    }

    case actions.ADD_ORG_START:
      return {
        ...state,
        isLoading: true,
      };

    case actions.ADD_ORG_SUCCESS: {
      return {
        ...state,
        isSuccessResult: true,
        createdOrganisation: state.currentOrg.name,
        isLoading: false,
      };
    }

    case actions.ADD_ORG_FAILURE: {
      const { payload } = action;
      return {
        ...state,
        error: payload,
        isLoading: false,
      };
    }

    case actions.SEARCH_LMS_GROUP_ORG: {
      const { payload } = action;

      return {
        ...state,
        searchLmsGroupsData: payload,
      };
    }

    case actions.SEARCH_ORG: {
      const { payload } = action;

      return {
        ...state,
        searchOrgData: payload,
      };
    }

    case actions.SET_CURRENT_ID_LMS_GROUP_ORG: {
      const { payload } = action;

      return {
        ...state,
        currentLmsGroupIdOrg: payload,
      };
    }

    case actions.EDIT_ORG_START:
      return {
        ...state,
        isLoadingEdit: true,
      };

    case actions.EDIT_ORG_SUCCESS: {
      const { payload } = action;
      const { translations } = payload;
      let newTranslations = [...initState.currentOrg.translations];

      newTranslations = _.merge([], newTranslations, translations);
      return {
        ...state,
        isSuccessResult: true,
        isLoadingEdit: false,
        currentOrg: {
          ...payload,
          translations: [
            ...newTranslations,
          ],
        },
      };
    }

    case actions.EDIT_ORG_FAILURE: {
      return {
        ...state,
        isEditOrg: false,
        isLoadingEdit: false,
      };
    }

    case actions.SET_CURRENT_NAME_LMS_GROUP_ORG: {
      const { payload } = action;

      return {
        ...state,
        currentNameLmsGroupOrg: payload,
      };
    }

    case actions.SET_CURRENT_ORG_ID: {
      const { payload } = action;

      return {
        ...state,
        currentOrgId: payload,
      };
    }

    case actions.CHANGE_DESCRIPTION_ORG: {
      const { payload: { value, name, lang } } = action;
      const { currentOrg } = state;
      const { translations } = currentOrg;

      translations.map((item, index) => {
        if (index === lang) {
          item[name] = value;
        }
        return null;
      });

      return {
        ...state,
        currentOrg: {
          ...currentOrg,
          translations: [
            ...translations,
          ],
        },
      };
    }

    case actions.CHANGE_CHECKBOX_ORG: {
      const { payload: { value, name } } = action;
      const { currentOrg } = state;

      return {
        ...state,
        currentOrg: {
          ...currentOrg,
          [name]: value,
        },
      };
    }

    case actions.ADD_CROP_FILE_ORG: {
      const { payload } = action;
      const { currentOrg } = state;

      return {
        ...state,
        currentOrg: {
          ...currentOrg,
          file: payload,
        },
      };
    }

    case actions.DELETE_ORG_SUCCESS: {
      return {
        ...state,
        isDeletedOrg: true,
      };
    }

    case actions.DELETE_ORG_FAILURE: {
      return {
        ...state,
        isDeletedOrg: false,
      };
    }

    case actions.SET_INIT_STATE_ORGANISATION_AFTER_ADD:
      return {
        ...initState,
        currentLmsGroupOrg: state.currentLmsGroupOrg,
        currentLmsGroupIdOrg: state.currentLmsGroupIdOrg,
        currentNameLmsGroupOrg: state.currentNameLmsGroupOrg,
        createdOrganisation: state.createdOrganisation,
        isSuccessResult: state.isSuccessResult,
        translations: [
          {
            language: 1, description: '', adminWelcomeText: '', studentWelcomeText: '',
          },
          {
            language: 2, description: '', adminWelcomeText: '', studentWelcomeText: '',
          },
          {
            language: 3, description: '', adminWelcomeText: '', studentWelcomeText: '',
          },
        ],
      };

    case actions.CLEAR_RESULT_STATUS_OPERATION_ORGANISATIONS:
      return {
        ...state,
        isSuccessResult: false,
      };

    case actions.SET_INIT_STATE_ORGANISATION:
      return {
        ...initState,
        translations: [
          {
            language: 1, description: '', adminWelcomeText: '', studentWelcomeText: '',
          },
          {
            language: 2, description: '', adminWelcomeText: '', studentWelcomeText: '',
          },
          {
            language: 3, description: '', adminWelcomeText: '', studentWelcomeText: '',
          },
        ],
      };

    default:
      return state;
  }
}
