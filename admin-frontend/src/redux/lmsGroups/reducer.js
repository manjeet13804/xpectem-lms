import _ from 'lodash';

import actions from './actions';

const initStateGroup = {
  name: '',
  accessExpireAt: '',
  maxLmsGroupAdmins: 1,
  maxLmsGroupAdminsSetting: 1,
  maxOrganisations: 1,
  maxOrganisationsSetting: 1,
  maxOrganisationAdmins: 1,
  maxOrganisationAdminsSetting: 1,
  maxCourses: 1,
  maxCoursesSetting: 1,
  maxStudents: 1,
  maxStudentsSetting: 1,
  isActive: false,
  notifySms: false,
  hasAccessToMmc: false,
  file: null,
  isLoadingData: false,
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
  isDataUpload: false,
  isSuccessResult: false,
  createdLmsGroup: '',
  orderEmails: '',
};

const initState = {
  currentLmsGroup: initStateGroup,
  currentId: null,
  isEditLmsGroup: false,
  isDeleteLmsGroup: false,
  isLoadingLmsGroup: false,
};

const copyInitState = _.cloneDeep(initState);

export default function lmsGroups(state = initState, { type, ...action }) {
  switch (type) {
    case actions.CHANGE_FIELD: {
      const { currentLmsGroup } = state;
      const { name, value } = action.payload;
      return {
        ...state,
        currentLmsGroup: {
          ...currentLmsGroup,
          [name]: value,
        },
      };
    }

    case actions.SET_INITIAL_PROPS_CURRENT_LMS_GROUP: {
      return {
        ...state,
        currentLmsGroup: {
          ...initStateGroup,
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
          isSuccessResult: state.currentLmsGroup.isSuccessResult,
          createdLmsGroup: state.currentLmsGroup.createdLmsGroup,
        },
      };
    }

    case actions.SET_INITIAL_PROPS_LMS_GROUP:
      return { ..._.cloneDeep(copyInitState) };

    case actions.SET_SUCCESS_RESULT:
      return {
        ...state,
        currentLmsGroup: {
          ...state.currentLmsGroup,
          isSuccessResult: action.payload,
        },
      };

    case actions.CHANGE_DESCRIPTION_LMS_GROUP: {
      const { payload: { value, name, lang } } = action;
      const { currentLmsGroup } = state;
      const { translations } = currentLmsGroup;

      translations.map((item, index) => {
        if (index === lang) {
          item[name] = value;
        }
        return null;
      });

      return {
        ...state,
        currentLmsGroup: {
          ...currentLmsGroup,
          translations: [
            ...translations,
          ],
        },
      };
    }

    case actions.REMOVE_DOWNLOAD_LINK_IMG:
      return {
        ...state,
        currentLmsGroup: {
          ...state.currentLmsGroup,
          logoImageUri: '',
        },
      };

    case actions.ADD_INPUT_LMS_GROUP: {
      const { payload } = action;
      const { currentLmsGroup } = state;

      return {
        ...state,
        currentLmsGroup: {
          ...currentLmsGroup,
          name: payload,
        },
      };
    }

    case actions.ADD_DATE_LMS_GROUP: {
      const { payload } = action;
      const { currentLmsGroup } = state;

      return {
        ...state,
        currentLmsGroup: {
          ...currentLmsGroup,
          accessExpireAt: payload,
        },
      };
    }

    case actions.ADD_INPUT_MAX_VALUES_LMS_GROUP: {
      const { payload: { value, name } } = action;
      const { currentLmsGroup } = state;

      return {
        ...state,
        currentLmsGroup: {
          ...currentLmsGroup,
          [name]: value,
        },
      };
    }

    case actions.CHANGE_CHECKBOX_LMS_GROUP: {
      const { payload: { value, name } } = action;
      const { currentLmsGroup } = state;

      return {
        ...state,
        currentLmsGroup: {
          ...currentLmsGroup,
          [name]: value,
        },
      };
    }

    case actions.ADD_CROP_FILE_LMS_GROUP: {
      const { payload } = action;
      const { currentLmsGroup } = state;

      return {
        ...state,
        currentLmsGroup: {
          ...currentLmsGroup,
          file: payload,
        },
      };
    }

    case actions.ADD_LMS_GROUP_START: {
      return {
        ...state,
        isLoadingLmsGroup: true,
      };
    }

    case actions.ADD_LMS_GROUP_SUCCESS: {
      return {
        ...state,
        isLoadingLmsGroup: false,
        currentLmsGroup: {
          ...initStateGroup,
          isSuccessResult: true,
          createdLmsGroup: state.currentLmsGroup.name,
        },
      };
    }

    case actions.ADD_LMS_GROUP_FAILURE: {
      return {
        ...state,
        isAddedLmsGroup: false,
        isLoadingLmsGroup: false,
      };
    }

    case actions.SEARCH_LMS_GROUP: {
      const { payload } = action;

      return {
        ...state,
        searchData: payload,
      };
    }

    case actions.SET_CURRENT_ID_LMS_GROUP: {
      const { payload } = action;

      return {
        ...state,
        currentId: payload,
      };
    }

    case actions.GET_LMS_GROUP_BY_ID_FAIL:
      return {
        ...state,
        currentLmsGroup: {
          ...state.currentLmsGroup,
          isLoadingData: false,
        },
      };

    case actions.GET_LMS_GROUP_BY_ID_START:
      return {
        ...state,
        currentLmsGroup: {
          ...state.currentLmsGroup,
          isLoadingData: true,
        },
      };

    case actions.GET_LMS_GROUP_BY_ID_SUCCESS: {
      const { payload } = action;
      const {
        translations,
        maxLmsGroupAdmins,
        maxOrganisations,
        maxOrganisationAdmins,
        maxCourses,
        maxStudents,
        orderEmails,
      } = payload;
      const rebuildTranslations = translations.map(item => ({
        ...item,
        language: item.language.id,
      }));
      let newTranslations = [...initState.currentLmsGroup.translations];

      newTranslations = _.merge([], newTranslations, rebuildTranslations);

      const isSendOrderEmail = orderEmails && orderEmails.length;
      return {
        ...state,
        currentLmsGroup: {
          ...payload,
          isSendOrderEmail,
          isLoadingData: false,
          translations: [
            ...newTranslations,
          ],
          maxLmsGroupAdminsSetting: maxLmsGroupAdmins,
          maxOrganisationsSetting: maxOrganisations,
          maxOrganisationAdminsSetting: maxOrganisationAdmins,
          maxCoursesSetting: maxCourses,
          maxStudentsSetting: maxStudents,
        },
      };
    }

    case actions.EDIT_LMS_GROUP_START: {
      return {
        ...state,
        isLoadingLmsGroup: true,
      };
    }

    case actions.EDIT_LMS_GROUP_SUCCESS: {
      const { payload } = action;
      const {
        translations,
        maxLmsGroupAdmins,
        maxOrganisations,
        maxOrganisationAdmins,
        maxCourses,
        maxStudents,
        orderEmails,
      } = payload;
      const rebuildTranslations = translations.map(item => ({
        ...item,
        language: item.language.id,
      }));
      let newTranslations = [...initState.currentLmsGroup.translations];

      newTranslations = _.merge([], newTranslations, rebuildTranslations);
      const isSendOrderEmail = orderEmails && orderEmails.length;

      return {
        ...state,
        isLoadingLmsGroup: false,
        currentLmsGroup: {
          isSendOrderEmail,
          isSuccessResult: true,
          ...payload,
          isLoadingData: false,
          translations: [
            ...newTranslations,
          ],
          maxLmsGroupAdminsSetting: maxLmsGroupAdmins,
          maxOrganisationsSetting: maxOrganisations,
          maxOrganisationAdminsSetting: maxOrganisationAdmins,
          maxCoursesSetting: maxCourses,
          maxStudentsSetting: maxStudents,
        },
      };
    }

    case actions.EDIT_LMS_GROUP_FAILURE: {
      return {
        ...state,
        isEditLmsGroup: false,
        isLoadingLmsGroup: false,
      };
    }

    case actions.DELETE_LMS_GROUP_SUCCESS: {
      return {
        ...state,
        isDeleteLmsGroup: true,
      };
    }

    case actions.DELETE_LMS_GROUP_FAILURE: {
      return {
        ...state,
        isDeleteLmsGroup: false,
      };
    }

    default:
      return state;
  }
}
