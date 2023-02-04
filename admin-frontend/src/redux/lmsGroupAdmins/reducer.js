import actions from './actions';

const initState = {
  currentAdmin: {
    firstName: '',
    lastName: '',
    language: '',
    notifyEmail: false,
    notifySms: false,
    lmsGroup: '',
    firstEmail: '',
    secondEmail: '',
    firstTelephone: '',
    secondTelephone: '',
    isDeactivated: false,
    organisations: [],
    file: null,
    isActive: true,
  },
  isSuccessLmsGroupsAdmin: false,
  isAddedAdmin: false,
  isEditAdmin: false,
  isDeleteAdmin: false,
  currentLmsGroupId: null,
  currentLmsGroupAdminId: null,
  error: '',
  searchData: [],
  searchAdminsData: [],
  isLoadingAddAdmin: false,
  isLoadingEditAdmin: false,
  isResetPasswordLMSAdmin: false,
};

export default function lmsGroupAdmins(state = initState, { type, ...action }) {
  switch (type) {
    case actions.RESET_LMS_ADMIN_PASSWORD: {
      return {
        ...state,
        isResetPasswordLMSAdmin: true,
      };
    }

    case actions.CLOSE_LMS_GROUP_ADMIN_PASSWORD: {
      return {
        ...state,
        isResetPasswordLMSAdmin: false,
      };
    }

    case actions.CLEAR_ADMINS: {
      return {
        ...state,
        searchAdminsData: [],
      };
    }

    case actions.EDIT_LMS_ADMIN_START: {
      return {
        ...state,
        isLoadingEditAdmin: true,
      };
    }

    case actions.ADD_LMS_ADMIN_START: {
      return {
        ...state,
        isLoadingAddAdmin: true,
      };
    }

    case actions.SET_INITIAL_PROPS_LMS_ADMINS: {
      return {
        ...initState,
        isSuccessLmsGroupsAdmin: state.isSuccessLmsGroupsAdmin,
        currentLmsGroupId: state.currentLmsGroupId,
        currentAdmin: {
          ...initState.currentAdmin,
          language: 1,
        },
      };
    }

    case actions.REMOVE_DOWNLOAD_LINK_LMS_GROUP_ADMIN: {
      const { currentAdmin } = state;
      return {
        ...state,
        currentAdmin: {
          ...currentAdmin,
          avatar: null,
        },
      };
    }

    case actions.CLEAR_ERROR_LMS_GROUP_ADMIN: {
      return {
        ...state,
        error: null,
      };
    }

    case actions.CLEAR_SUCCESS_RESULT_LMS_ADMIN: {
      return {
        ...state,
        isSuccessLmsGroupsAdmin: false,
      };
    }

    case actions.CHANGE_LMS_ADMINS_STATE: {
      const { currentAdmin } = state;
      const { payload } = action;
      const { name, value } = payload;
      return {
        ...state,
        currentAdmin: {
          ...currentAdmin,
          [name]: value,
        },
      };
    }

    case actions.SET_INITIAL_FULL_PROPS_LMS_ADMINS: {
      return {
        ...initState,
        currentLmsGroupId: state.currentLmsGroupId,
        currentAdmin: {
          ...initState.currentAdmin,
          language: 1,
        },
      };
    }

    case actions.SET_INITIAL_PROPS_LMS_GROUP_ADMINS: {
      return {
        ...initState,
        currentLmsGroupId: state.currentLmsGroupId,
      };
    }

    case actions.ADD_FIRSTNAME_LMS_GROUP_ADMINS: {
      const { payload } = action;
      const { currentAdmin } = state;

      return {
        ...state,
        currentAdmin: {
          ...currentAdmin,
          firstName: payload,
        },
      };
    }

    case actions.ADD_LASTNAME_LMS_GROUP_ADMINS: {
      const { payload } = action;
      const { currentAdmin } = state;

      return {
        ...state,
        currentAdmin: {
          ...currentAdmin,
          lastName: payload,
        },
      };
    }

    case actions.ADD_EMAIL_LMS_GROUP_ADMINS: {
      const { payload } = action;
      const { currentAdmin } = state;

      return {
        ...state,
        currentAdmin: {
          ...currentAdmin,
          email: payload,
        },
      };
    }
    case actions.ADD_PHONE_LMS_GROUP_ADMINS: {
      const { payload } = action;
      const { currentAdmin } = state;

      return {
        ...state,
        currentAdmin: {
          ...currentAdmin,
          phone: payload,
        },
      };
    }

    case actions.ADD_LANGUAGE_LMS_GROUP_ADMINS: {
      const { payload } = action;
      const { currentAdmin } = state;

      return {
        ...state,
        currentAdmin: {
          ...currentAdmin,
          language: payload,
        },
      };
    }

    case actions.CHANGE_CHECKBOX_LMS_GROUP_ADMINS: {
      const { payload: { value, name } } = action;
      const { currentAdmin } = state;

      return {
        ...state,
        currentAdmin: {
          ...currentAdmin,
          [name]: value,
        },
      };
    }

    case actions.ADD_CROP_FILE_LMS_GROUP_ADMINS: {
      const { payload } = action;
      const { currentAdmin } = state;

      return {
        ...state,
        currentAdmin: {
          ...currentAdmin,
          file: payload,
        },
      };
    }

    case actions.SEARCH_LMS_GROUP_ADMINS: {
      const { payload } = action;

      return {
        ...state,
        searchData: payload,
      };
    }

    case actions.SEARCH_ADMINS_LMS_GROUP_ADMINS: {
      const { payload } = action;
      const rebuildData = payload.map(item => ({
        id: item.id,
        name: `${item.lastName} ${item.firstName}`,
        email: item.userEmail.map(email => email.email).join(' and '),
        affiliation: item.lmsGroups.map(aff => aff.name).join(' and '),
        createdAt: item.createdAt,
      }));

      return {
        ...state,
        searchAdminsData: rebuildData,
      };
    }

    case actions.SET_CURRENT_ID_LMS_GROUP_ADMINS: {
      const { payload } = action;

      return {
        ...state,
        currentLmsGroupId: payload,
      };
    }

    case actions.SET_CURRENT_ADMIN_ID_LMS_GROUP_ADMIN: {
      const { payload } = action;

      return {
        ...state,
        currentLmsGroupAdminId: payload,
      };
    }

    case actions.GET_CURRENT_ADMIN_LMS_GROUP_ADMIN: {
      const { payload } = action;
      const { userEmail, userPhone } = payload;
      const email = userEmail.map(({ email }) => email);
      const phone = userPhone.map(({ phone }) => phone);

      return {
        ...state,
        currentAdmin: {
          ...payload,
          firstEmail: email[0],
          secondEmail: email[1] || '',
          firstTelephone: phone[0],
          secondTelephone: phone[1] || '',
          language: payload.language.id,
          isActive: !payload.isDeactivated,
        },
        currentLmsGroupId: payload.lmsGroups[0].id,
      };
    }

    case actions.ADD_LMS_GROUP_ADMINISTRATOR_SUCCESS: {
      return {
        ...state,
        isAddedAdmin: true,
        isSuccessLmsGroupsAdmin: true,
        isLoadingAddAdmin: false,
        currentAdmin: {
          ...initState.currentAdmin,
        },
      };
    }

    case actions.ADD_LMS_GROUP_ADMINISTRATOR_FAILURE: {
      const { payload } = action;

      return {
        ...state,
        isAddedAdmin: false,
        isSuccessLmsGroupsAdmin: false,
        isLoadingAddAdmin: false,
        error: payload,
      };
    }

    case actions.EDIT_ADMIN_LMS_GROUP_ADMINS_SUCCESS: {
      const { payload } = action;
      const { userEmail, userPhone } = payload;
      const email = userEmail.map(({ email }) => email);
      const phone = userPhone.map(({ phone }) => phone);

      return {
        ...state,
        isLoadingEditAdmin: false,
        isSuccessLmsGroupsAdmin: true,
        isEditAdmin: true,
        currentAdmin: {
          ...payload,
          firstEmail: email[0],
          secondEmail: email[1] || '',
          firstTelephone: phone[0],
          secondTelephone: phone[1] || '',
          language: payload.language.id,
          isActive: !payload.isDeactivated,
        },
        currentLmsGroupId: payload.lmsGroups[0].id,
      };
    }

    case actions.EDIT_ADMIN_LMS_GROUP_ADMINS_FAILURE: {
      return {
        ...state,
        isEditAdmin: false,
        isLoadingEditAdmin: false,
      };
    }

    case actions.DELETE_ADMIN_LMS_GROUP_SUCCESS: {
      return {
        ...state,
        isDeleteAdmin: true,
      };
    }

    case actions.DELETE_ADMIN_LMS_GROUP_FAILURE: {
      return {
        ...state,
        isDeleteAdmin: false,
      };
    }

    default:
      return state;
  }
}
