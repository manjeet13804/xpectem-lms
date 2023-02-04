import actions from './actions';

const initState = {
  groups: [],
  groupsTotal: [],
  selectedGroups: [],
  isLoading: false,
  isLoadingTotal: false,
  selectedGroupId: null,
  selectedGroupName: '',
  groupAdmins: [],
  value: '',
  date: '',
  isDeactivated: false,
  person: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    isDeactivated: false,
  },
};

export default function groupsSearch(state = initState, { type, payload }) {
  switch (type) {
    case actions.SET_SELECTED_GROUPS:
      return {
        ...state,
        selectedGroups: payload.map(item => ({
          ...item,
          text: item.name,
        })),
      };

    case actions.CLEAR_SEARCH_DATA:
      return {
        ...state,
        groupsTotal: [],
        groupAdmins: [],
      };

    case actions.GET_SEARCH_GROUP_START:
      return {
        ...state,
        ...(payload ? { isLoadingTotal: true } : { isLoading: true }),
        groupsTotal: [],
      };

    case actions.SELECT_ALL: {
      return {
        ...state,
        selectedGroups: state.groupsTotal.map(el => ({ id: el.id, text: el.name })),
      };
    }

    case actions.CLEAR_ALL_GROUPS: {
      return {
        ...state,
        selectedGroups: [],
      };
    }

    case actions.GET_SEARCH_GROUP_FAIL:
      return {
        ...state,
        isLoading: false,
        isLoadingTotal: false,
      };

    case actions.GET_SEARCH_GROUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        groups: payload,
      };

    case actions.SET_SEARCH_VALUE_SEARCH:
      return {
        ...state,
        value: payload,
      };

    case actions.SET_SEARCH_DATE_END_GROUP:
      return {
        ...state,
        date: payload,
      };

    case actions.SET_IS_DEACTIVATED_SEARCH_GROUP:
      return {
        ...state,
        isDeactivated: payload,
      };

    case actions.GET_SEARCH_GROUP_TOTAL_SUCCESS:
      return {
        ...state,
        groupsTotal: payload,
        isLoadingTotal: false,
      };

    case actions.SET_INIT_STATE_SEARCH_GROUP:
      return {
        ...initState,
      };

    case actions.SET_SEARCH_GROUP_NAME:
      return {
        ...state,
        selectedGroupName: payload,
      };

    case actions.SET_SEARCH_GROUP_ID:
      return {
        ...state,
        selectedGroupId: payload,
      };


    case actions.ADD_TO_SELECTED_GROUPS: {
      const group = state.selectedGroups.find(item => item.id === payload.id);

      if (group) {
        return {
          ...state,
          selectedGroups: state.selectedGroups.filter(item => item.id !== group.id),
        };
      }

      return {
        ...state,
        selectedGroups: [
          ...state.selectedGroups,
          payload,
        ],
      };
    }

    case actions.REMOVE_ITEM_FROM_SELECTED_GROUP:
      return {
        ...state,
        selectedGroups: state.selectedGroups.filter(item => item.id !== payload),
      };

    case actions.SEARCH_GROUP_ADMINS_SUCCESS:
      return {
        ...state,
        isLoadingGroupAdmins: false,
        groupAdmins: payload.map(item => ({
          id: item.id,
          name: `${item.lastName} ${item.firstName}`,
          email: item.userEmail.map(email => email.email).join(' and '),
          affiliation: item.groups.map(aff => aff.name).join(' and '),
          createdAt: item.createdAt,
        })),
      };

    case actions.SEARCH_GROUP_ADMINS_START:
      return {
        ...state,
        isLoadingGroupAdmins: true,
      };

    case actions.SEARCH_GROUP_ADMINS_FAIL:
      return {
        ...state,
        isLoadingGroupAdmins: false,
      };

    case actions.CHANGE_STATE_PERSON_SEARCH_GROUP:
      return {
        ...state,
        person: {
          ...state.person,
          [payload.name]: payload.value,
        },
      };

    case actions.SET_INIT_STATE_WITHOUT_SELECTED_GROUPS:
      return {
        ...initState,
        selectedGroups: state.selectedGroups,
      };

    default:
      return state;
  }
}
