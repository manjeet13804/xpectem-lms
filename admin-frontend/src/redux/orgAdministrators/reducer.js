import actions from './actions';

const initState = {
  currentOrgAdmin: {
    firstName: '',
    lastName: '',
    firstEmail: '',
    secondEmail: '',
    firstTelephone: '',
    secondTelephone: '',
    language: 1,
    notifyEmail: false,
    notifySms: false,
    lmsGroup: '',
    isDeactivated: false,
    organisations: [],
    file: null,
  },
  searchLmsGroupsData: [],
  searchOrgData: [],
  currentLmsGroupIdOrg: null,
  currentNameLmsGroupOrg: '',
  currentOrgAdminId: null,
  chosenOrg: [],
  isSuccessOrgAdmin: false,
  isLoadingAddAdmin: false,
  isLoading: false,
  isEditOrgAdmin: false,
  isDeleteAdmin: false,
  error: '',
  isImportFile: false,
  errorImport: '',
  errors: null,
  isResetPasswordOrgAdmin: false,
};

export default function orgAdmins(state = initState, { type, ...action }) {
  switch (type) {
    case actions.RESET_ORG_ADMIN_PASSWORD: {
      return {
        ...state,
        isResetPasswordOrgAdmin: true,
      };
    }

    case actions.CLOSE_ORG_ADMIN_PASSWORD: {
      return {
        ...state,
        isResetPasswordOrgAdmin: false,
      };
    }

    case actions.IMPORT_CSV_ORG_ADMINS_START: {
      return {
        ...state,
        errors: null,
        isLoading: true,
        errorImport: '',
      };
    }

    case actions.ORG_ADMINS_CLEAR_IMPORT_STATUSES: {
      return {
        ...state,
        isImportFile: false,
        errorImport: '',
      };
    }

    case actions.SET_INITIAL_PROPS_ORG_ADMINS: {
      return {
        ...initState,
        isSuccessOrgAdmin: state.isSuccessOrgAdmin,
      };
    }

    case actions.SET_INITIAL_FULL_PROPS_ORG_ADMINS: {
      return {
        ...initState,
      };
    }

    case actions.SEARCH_ADMINS_ORG_ADMINS: {
      const { payload } = action;

      return {
        ...state,
        searchAdminsData: payload,
      };
    }

    case actions.ADD_FIRSTNAME_ORG_ADMINS: {
      const { payload } = action;
      const { currentOrgAdmin } = state;

      return {
        ...state,
        currentOrgAdmin: {
          ...currentOrgAdmin,
          firstName: payload,
        },
      };
    }

    case actions.ADD_LASTNAME_ORG_ADMINS: {
      const { payload } = action;
      const { currentOrgAdmin } = state;

      return {
        ...state,
        currentOrgAdmin: {
          ...currentOrgAdmin,
          lastName: payload,
        },
      };
    }

    case actions.ADD_EMAIL_ORG_ADMINS: {
      const { payload } = action;
      const { currentOrgAdmin } = state;

      return {
        ...state,
        currentOrgAdmin: {
          ...currentOrgAdmin,
          email: payload,
        },
      };
    }
    case actions.ADD_PHONE_ORG_ADMINS: {
      const { payload } = action;
      const { currentOrgAdmin } = state;

      return {
        ...state,
        currentOrgAdmin: {
          ...currentOrgAdmin,
          phone: payload,
        },
      };
    }

    case actions.EDIT_ADMIN_ORG_ADMINS_START:
      return {
        ...state,
        isLoadingEditAdmin: true,
      };

    case actions.EDIT_ADMIN_ORG_ADMINS_SUCCESS: {
      return {
        ...state,
        isLoadingEditAdmin: false,
        isSuccessOrgAdmin: true,
      };
    }

    case actions.EDIT_ADMIN_ORG_ADMINS_FAILURE: {
      return {
        ...state,
        isLoadingEditAdmin: false,
      };
    }

    case actions.ADD_LANGUAGE_ORG_ADMINS: {
      const { payload } = action;
      const { currentOrgAdmin } = state;

      return {
        ...state,
        currentOrgAdmin: {
          ...currentOrgAdmin,
          language: payload,
        },
      };
    }

    case actions.CHANGE_CHECKBOX_ORG_ADMINS: {
      const { payload: { value, name } } = action;
      const { currentOrgAdmin } = state;

      return {
        ...state,
        currentOrgAdmin: {
          ...currentOrgAdmin,
          [name]: value,
        },
      };
    }

    case actions.SEARCH_ORG_ADMINS: {
      const { payload } = action;

      const newSearchOrgData = payload;
      newSearchOrgData.map(item => item.check = false);

      return {
        ...state,
        searchOrgData: [
          ...newSearchOrgData,
        ],
      };
    }

    case actions.SEARCH_LMS_GROUP_ORG_ADMINS: {
      const { payload } = action;

      return {
        ...state,
        searchLmsGroupsData: payload,
      };
    }

    case actions.SET_CURRENT_ID_LMS_GROUP_ORG_ADMINS: {
      const { payload } = action;
      const { currentOrgAdmin } = state;

      return {
        ...state,
        currentOrgAdmin: {
          ...currentOrgAdmin,
          lmsGroup: payload,
        },
        currentLmsGroupIdOrg: payload,
      };
    }

    case actions.SET_CURRENT_NAME_LMS_GROUP_ORG_ADMINS: {
      const { payload } = action;

      return {
        ...state,
        currentNameLmsGroupOrg: payload,
      };
    }

    case actions.SET_CURRENT_ORG_ID_ORG_ADMINS: {
      const { payload } = action;
      const { searchOrgData, currentOrgAdmin } = state;

      const indexCurrentOrg = searchOrgData.findIndex(
        ({ id }) => id === payload,
      );
      const { check } = searchOrgData[indexCurrentOrg];
      const searchOrgItem = { ...searchOrgData[indexCurrentOrg], check: !check };
      const newSearchOrgData = [...searchOrgData];
      newSearchOrgData[indexCurrentOrg] = searchOrgItem;

      const chosenOrg = newSearchOrgData.filter(({ check }) => check === true);

      return {
        ...state,
        currentOrgAdmin: {
          ...currentOrgAdmin,
        },
        currentOrgId: payload,
        searchOrgData: [
          ...newSearchOrgData,
        ],
        chosenOrg: [
          ...chosenOrg,
        ],
      };
    }

    case actions.ADD_ORG_ADMIN_START:
      return {
        ...state,
        isLoadingAddAdmin: true,
      };

    case actions.ADD_ORG_ADMIN_SUCCESS: {
      return {
        ...state,
        isSuccessOrgAdmin: true,
        isLoadingAddAdmin: false,
        currentOrgAdmin: {
          ...initState.currentOrgAdmin,
        },
      };
    }

    case actions.ADD_ORG_ADMIN_FAILURE: {
      const { payload } = action;

      return {
        ...state,
        isSuccessOrgAdmin: false,
        isLoadingAddAdmin: false,
        error: payload,
      };
    }

    case actions.CLEAR_ERRORS_ORG_ADMINS:
      return {
        ...state,
        error: null,
      };

    case actions.CLEAR_SUCCESS_RESULT_ORG_ADMIN:
      return {
        ...state,
        isSuccessOrgAdmin: false,
      };

    case actions.ADD_CROP_FILE_ORG_ADMINS: {
      const { payload } = action;
      const { currentOrgAdmin } = state;

      return {
        ...state,
        currentOrgAdmin: {
          ...currentOrgAdmin,
          file: payload,
        },
      };
    }

    case actions.IMPORT_CSV_ORG_ADMINS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isImportFile: true,
      };
    }

    case actions.IMPORT_CSV_ORG_ADMINS_FAILURE: {
      const { payload } = action;
      const { errors, error } = payload;

      return {
        ...state,
        errors,
        isLoading: false,
        isImportFile: false,
        errorImport: error,
      };
    }

    case actions.SET_CURRENT_ADMIN_ID_ORG_ADMINS: {
      const { payload } = action;

      return {
        ...state,
        currentOrgAdminId: payload,
      };
    }

    case actions.DELETE_ADMIN_ORG_ADMINS_SUCCESS: {
      return {
        ...state,
        isDeleteAdmin: true,
      };
    }

    case actions.DELETE_ADMIN_ORG_ADMINS_FAILURE: {
      return {
        ...state,
        isDeleteAdmin: false,
      };
    }

    case actions.REMOVE_DOWNLOAD_LINK_ORG_ADMINS:
      return {
        ...state,
        currentOrgAdmin: {
          ...state.currentOrgAdmin,
          avatar: '',
        },
      };

    case actions.GET_CURRENT_ADMIN_ORG_ADMIN: {
      const { payload } = action;

      const { userEmail, userPhone } = payload;
      const email = userEmail.map(({ email }) => email);
      const phone = userPhone.map(({ phone }) => phone);


      return {
        ...state,
        currentOrgAdmin: {
          ...payload,
          firstEmail: email[0],
          secondEmail: email[1] || '',
          firstTelephone: phone[0],
          secondTelephone: phone[1] || '',
          language: payload.language.id,
        },

      };
    }


    case actions.CHANGE_ORG_ADMINISTRATION_STATE:
      return {
        ...state,
        currentOrgAdmin: {
          ...state.currentOrgAdmin,
          [action.payload.name]: action.payload.value,
        },
      };

    default:
      return state;
  }
}
