import actions from './actions';

const initState = {
  lmsGroups: [],
  lmsGroupsTotal: [],
  isLoading: false,
  isLoadingTotal: false,
  value: '',
  date: '',
  isDeactivated: false,
  courseLmsGroupsPermission: [],
  selectedLmsGroupName: '',
  selectedLmsGroupId: null,
  selectedLmsGroups: [],
};

export default function lmsGroupsSearch(state = initState, { type, payload }) {
  switch (type) {
    case actions.CLEAR_SEARCH_LMS_ADMINS:
      return {
        ...state,
        lmsGroupsTotal: [],
      };

    case actions.SELECT_COURSE_LMS_GROUPS_PERMISSION: {
      return {
        ...state,
        courseLmsGroupsPermission: payload,
      };
    }

    case actions.CHANGE_LMS_GROUPS_PERMISSION: {
      const { newRow, index } = payload;
      const newCourses = state.courseLmsGroupsPermission.newGroup[index].map((item) => {
        if (item.lms_group_id === newRow.lms_group_id && item.course_id === newRow.course_id) {
          item = newRow;
        }
        return item;
      });
      state.courseLmsGroupsPermission.newGroup[index] = newCourses;
      return {
        ...state,
        courseLmsGroupsPermission: {
          queryGroup: state.courseLmsGroupsPermission.queryGroup,
          newGroup: state.courseLmsGroupsPermission.newGroup,


        },
      };
    }


    case actions.ADD_TO_SELECTED_LMS_GROUPS: {
      const lmsGroups = state.selectedLmsGroups.find(item => item.id === payload.id);
      if (lmsGroups) {
        return {
          ...state,
          selectedLmsGroups: state.selectedLmsGroups.filter(item => item.id !== lmsGroups.id),
        };
      }

      return {
        ...state,
        selectedLmsGroups: [
          ...state.selectedLmsGroups,
          payload,
        ],
      };
    }

    case actions.SELECT_ALL_LMS_GROUP: {
      return {
        ...state,
        selectedLmsGroups: state.lmsGroupsTotal.map(el => ({ id: el.id, text: el.name })),
      };
    }

    case actions.CLEAR_ALL_LMS_GROUP: {
      return {
        ...state,
        selectedLmsGroups: [],
      };
    }

    case actions.GET_SEARCH_LMS_GROUP_START:
      return {
        ...state,
        ...(payload ? { isLoadingTotal: true } : { isLoading: true }),
        lmsGroupsTotal: [],
      };

    case actions.GET_SEARCH_LMS_GROUP_FAIL:
      return {
        ...state,
        isLoading: false,
        isLoadingTotal: false,
      };

    case actions.GET_SEARCH_LMS_GROUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        lmsGroups: payload,
      };

    case actions.SET_SEARCH_LMS_VALUE_SEARCH:
      return {
        ...state,
        value: payload,
      };

    case actions.SET_SEARCH_DATE_END_GROUP_LMS:
      return {
        ...state,
        date: payload,
      };

    case actions.SET_IS_DEACTIVATED_SEARCH_LMS_GROUP:
      return {
        ...state,
        isDeactivated: payload,
      };

    case actions.GET_SEARCH_LMS_GROUP_TOTAL_SUCCESS:
      return {
        ...state,
        lmsGroupsTotal: payload,
        isLoadingTotal: false,
      };

    case actions.SET_LMS_GROUP_NAME_ORGANISATION_FIND:
      return {
        ...state,
        selectedLmsGroupName: payload,
      };

    case actions.SET_LMS_GROUP_ID_ORGANISATION_FIND:
      return {
        ...state,
        selectedLmsGroupId: payload,
      };

    case actions.SET_INIT_STATE_SEARCH_LMS_GROUP:
      return {
        ...initState,
      };
    default:
      return state;
  }
}
