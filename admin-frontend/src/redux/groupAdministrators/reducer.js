import _ from 'lodash';
import actions from './actions';

const initState = {
  currentGroupAdmin: {
    firstName: '',
    lastName: '',
    firstEmail: '',
    secondEmail: '',
    firstTelephone: '',
    secondTelephone: '',
    language: 1,
    notifyEmail: false,
    notifySms: false,
    isLoading: false,
    group: '',
    lmsGroup: '',
    isDeactivated: false,
    organisations: [],
    file: null,
    groups: [],
  },
  searchOrgData: [],
  searchLmsGroupsData: [],
  searchGroupsData: [],
  searchAdminsData: [],
  currentLmsGroupId: '',
  currentNameLmsGroup: '',
  currentNameOrg: '',
  currentOrgId: '',
  currentGroupId: '',
  currentGroupAdminId: '',
  isAddedGroupAdmin: false,
  isEditGroupAdmin: false,
  isImportFile: '',
  errorImport: '',
  isSuccessGroupAdmin: false,
  isResetPasswordGroupAdmin: false,
};

export default function groupAdministrators(state = initState, { type, ...action }) {
  switch (type) {
    case actions.RESET_GROUP_ADMIN_PASSWORD: {
      return {
        ...state,
        isResetPasswordGroupAdmin: true,
      };
    }

    case actions.CLOSE_GROUP_ADMIN_PASSWORD: {
      return {
        ...state,
        isResetPasswordGroupAdmin: false,
      };
    }

    case actions.CLEAR_ERROR_IMPORT: {
      return {
        ...state,
        errorImport: null,
        isImportFile: false,
      };
    }

    case actions.SET_INITIAL_PROPS_ADMIN_GROUP_ADMINS: {
      const {
        currentGroupAdmin,
        searchLmsGroupsData,
        searchOrgData,
      } = initState;

      return {
        ...state,
        currentGroupAdmin: {
          ...currentGroupAdmin,
        },
        searchLmsGroupsData: [
          ...searchLmsGroupsData,
        ],
        searchOrgData: [
          ...searchOrgData,
        ],
      };
    }

    case actions.IMPORT_CSV_GROUP_ADMINS_START: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case actions.IMPORT_CSV_GROUP_ADMINS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isImportFile: true,
      };
    }

    case actions.IMPORT_CSV_GROUP_ADMINS_FAILURE: {
      const { payload } = action;

      return {
        ...state,
        isLoading: false,
        isImportFile: false,
        errorImport: payload,
      };
    }

    case actions.EDIT_ADMIN_GROUP_ADMINS_START:
      return {
        ...state,
        isLoadingEditAdmin: true,
      };

    case actions.EDIT_ADMIN_GROUP_ADMINS_SUCCESS: {
      const { payload } = action;

      const { userEmail, userPhone } = payload;

      return {
        ...state,
        isLoadingEditAdmin: false,
        isSuccessGroupAdmin: true,
        currentGroupAdmin: {
          ...payload,
          firstEmail: userEmail[0].email,
          secondEmail: _.get(userEmail, '1.email'),
          firstTelephone: userPhone[0].phone,
          secondTelephone: _.get(userPhone, '1.phone'),
          language: payload.language.id,
        },
      };
    }

    case actions.EDIT_ADMIN_GROUP_ADMINS_FAILURE: {
      return {
        ...state,
        isLoadingEditAdmin: false,
      };
    }

    case actions.GET_CURRENT_ADMIN_GROUP_ADMIN: {
      const { payload } = action;

      const { userEmail, userPhone } = payload;

      return {
        ...state,
        currentGroupAdmin: {
          ...payload,
          firstEmail: userEmail[0].email,
          secondEmail: _.get(userEmail, '1.email'),
          firstTelephone: userPhone[0].phone,
          secondTelephone: _.get(userPhone, '1.phone'),
          language: payload.language.id,
        },

      };
    }

    case actions.SET_CURRENT_ADMIN_ID_GROUP_ADMINS: {
      const { payload } = action;

      return {
        ...state,
        currentGroupAdminId: payload,
      };
    }

    case actions.SEARCH_ADMINS_GROUP_ADMINS: {
      const { payload } = action;

      return {
        ...state,
        searchAdminsData: payload,
      };
    }

    case actions.ADD_GROUP_ADMIN_START:
      return {
        ...state,
        isLoadingAddAdmin: true,
      };

    case actions.ADD_GROUP_ADMIN_SUCCESS: {
      return {
        ...state,
        isLoadingAddAdmin: false,
        isSuccessGroupAdmin: true,
      };
    }

    case actions.ADD_GROUP_ADMIN_FAILURE: {
      const { payload } = action;

      return {
        ...state,
        isLoadingAddAdmin: false,
        error: payload,
      };
    }

    case actions.ADD_FIRSTNAME_GROUP_ADMINS: {
      const { payload } = action;
      const { currentGroupAdmin } = state;

      return {
        ...state,
        currentGroupAdmin: {
          ...currentGroupAdmin,
          firstName: payload,
        },
      };
    }

    case actions.ADD_LASTNAME_GROUP_ADMINS: {
      const { payload } = action;
      const { currentGroupAdmin } = state;

      return {
        ...state,
        currentGroupAdmin: {
          ...currentGroupAdmin,
          lastName: payload,
        },
      };
    }

    case actions.ADD_EMAIL_GROUP_ADMINS: {
      const { payload } = action;
      const { currentGroupAdmin } = state;

      return {
        ...state,
        currentGroupAdmin: {
          ...currentGroupAdmin,
          email: payload,
        },
      };
    }

    case actions.ADD_CROP_FILE_GROUP_ADMINS: {
      const { payload } = action;
      const { currentGroupAdmin } = state;

      return {
        ...state,
        currentGroupAdmin: {
          ...currentGroupAdmin,
          file: payload,
        },
      };
    }

    case actions.ADD_PHONE_GROUP_ADMINS: {
      const { payload } = action;
      const { currentGroupAdmin } = state;

      return {
        ...state,
        currentGroupAdmin: {
          ...currentGroupAdmin,
          phone: payload,
        },
      };
    }

    case actions.ADD_LANGUAGE_GROUP_ADMINS: {
      const { payload } = action;
      const { currentGroupAdmin } = state;

      return {
        ...state,
        currentGroupAdmin: {
          ...currentGroupAdmin,
          language: payload,
        },
      };
    }

    case actions.CHANGE_CHECKBOX_GROUP_ADMINS: {
      const { payload: { value, name } } = action;
      const { currentGroupAdmin } = state;

      return {
        ...state,
        currentGroupAdmin: {
          ...currentGroupAdmin,
          [name]: value,
        },
      };
    }

    case actions.SET_CURRENT_GROUP_ID_GROUP_ADMINS: {
      const { payload } = action;
      const { searchGroupsData } = state;

      const indexCurrentGroup = searchGroupsData.findIndex(
        ({ id }) => id === payload,
      );
      const { check } = searchGroupsData[indexCurrentGroup];
      const searchGroupItem = { ...searchGroupsData[indexCurrentGroup], check: !check };
      const newSearchGroupsData = [...searchGroupsData];
      newSearchGroupsData[indexCurrentGroup] = searchGroupItem;

      const chosenGroup = newSearchGroupsData.filter(({ check }) => check === true);

      return {
        ...state,
        currentGroupId: payload,
        searchGroupsData: [
          ...newSearchGroupsData,
        ],
        chosenGroup: [
          ...chosenGroup,
        ],
      };
    }

    case actions.SET_CURRENT_ID_LMS_GROUP_GROUP_ADMINS: {
      const { payload } = action;

      return {
        ...state,
        currentLmsGroupId: payload,
      };
    }

    case actions.SET_CURRENT_NAME_ORG_GROUP_ADMINS: {
      const { payload } = action;

      return {
        ...state,
        currentNameOrg: payload,
      };
    }

    case actions.SET_CURRENT_NAME_LMS_GROUP_GROUP_ADMINS: {
      const { payload } = action;

      return {
        ...state,
        currentNameLmsGroup: payload,
      };
    }

    case actions.SET_CURRENT_ORG_ID_GROUP_ADMINS: {
      const { payload } = action;

      return {
        ...state,
        currentOrgId: payload,
      };
    }


    case actions.SEARCH_GROUPS_GROUP_ADMINS: {
      const { payload } = action;

      return {
        ...state,
        searchGroupsData: payload,
      };
    }

    case actions.SEARCH_ORG_GROUP_ADMINS: {
      const { payload } = action;

      return {
        ...state,
        searchOrgData: payload,
      };
    }

    case actions.SEARCH_LMS_GROUPS_GROUP_ADMINS: {
      const { payload } = action;

      return {
        ...state,
        searchLmsGroupsData: payload,
      };
    }

    case actions.TOGGLE_GROUPS_SWITCH: {
      const { groupsSearch } = state;

      const { id: currentCheckbox } = action;
      const groupsSearchId = groupsSearch.findIndex(
        ({ id }) => id === currentCheckbox,
      );
      const { check } = groupsSearch[groupsSearchId];

      const groupsSearchItem = { ...groupsSearch[groupsSearchId], check: !check };
      const newGroupsSearch = [...groupsSearch];
      newGroupsSearch[groupsSearchId] = groupsSearchItem;


      return {
        ...state,
        groupsSearch: [
          ...newGroupsSearch,
        ],
      };
    }


    case actions.CHANGE_GROUP_ADMIN_STATE:
      return {
        ...state,
        currentGroupAdmin: {
          ...state.currentGroupAdmin,
          [action.payload.name]: action.payload.value,
        },
      };


    case actions.SET_INIT_FULL_GROUP_ADMIN_STATE:
      return {
        ...initState,
      };

    case actions.SET_INIT_STATE_GROUP_ADMIN:
      return {
        ...initState,
        isSuccessGroupAdmin: state.isSuccessGroupAdmin,
      };

    case actions.CLEAR_SUCCESS_RESULT_GROUP_ADMIN:
      return {
        ...state,
        isSuccessGroupAdmin: false,
      };


    case actions.CLEAR_ERROR_GROUP_ADMIN:
      return {
        ...state,
        error: '',
      };

    case actions.REMOVE_DOWNLOAD_LINK_GROUP_ADMINS:
      return {
        ...state,
        currentGroupAdmin: {
          ...state.currentGroupAdmin,
          avatar: null,
        },
      };

    default:
      return state;
  }
}
