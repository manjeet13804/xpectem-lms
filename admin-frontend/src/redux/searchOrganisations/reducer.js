import actions from './actions';

const initState = {
  organisations: [],
  organisationsTotal: [],
  isLoading: false,
  isLoadingTotal: false,
  value: '',
  date: '',
  isDeactivated: false,
  selectedOrganisationName: '',
  selectedOrganisationId: null,
  selectedOrganisations: [],
  orgAdmins: [],
  selectedOrganisation: [],
  isLoadingOrgAdmins: false,
  courseOrganisationPermission: [],
  person: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    isDeactivated: false,
  },
};

export default function organisationsSearch(state = initState, { type, payload }) {
  switch (type) {
    case actions.CLEAR_SEARCH_ORGS:
      return {
        ...state,
        orgAdmins: [],
        organisationsTotal: [],
      };
    case actions.SELECT_COURSE_ORGANISATION_PERMISSION: {
      return {
        ...state,
        courseOrganisationPermission: payload,
      };
    }

    case actions.CHANGE_ORGANISATION_PERMISSION: {
      const { newRow, index } = payload;
      const newCourses = state.courseOrganisationPermission.newGroup[index].map((item) => {
        if (item.organisation_id === newRow.organisation_id && item.course_id === newRow.course_id) {
          item = newRow;
        }
        return item;
      });
      state.courseOrganisationPermission.newGroup[index] = newCourses;
      return {
        ...state,
        courseOrganisationPermission: {
          queryGroup: state.courseOrganisationPermission.queryGroup,
          newGroup: state.courseOrganisationPermission.newGroup,


        },
      };
    }

    case actions.ADD_TO_SELECTED_ORGANISATION: {
      const organisation = state.selectedOrganisation.find(item => item.id === payload.id);
      if (organisation) {
        return {
          ...state,
          selectedOrganisation: state.selectedOrganisation.filter(item => item.id !== organisation.id),
        };
      }

      return {
        ...state,
        selectedOrganisation: [
          ...state.selectedOrganisation,
          payload,
        ],
      };
    }

    case actions.SELECT_ALL_ORGANISATION: {
      return {
        ...state,
        selectedOrganisation: state.organisationsTotal.map(el => ({
          id: el.id,
          text: el.name,
          lmsGroup: el.lmsGroup,
        })),
      };
    }

    case actions.CLEAR_ALL_ORGANISATION: {
      return {
        ...state,
        selectedOrganisation: [],
      };
    }

    case actions.GET_SEARCH_ORGANISATIONS_START:
      return {
        ...state,
        ...(payload ? { isLoadingTotal: true } : { isLoading: true }),
        organisationsTotal: [],
      };

    case actions.GET_SEARCH_ORGANISATIONS_FAIL:
      return {
        ...state,
        isLoading: false,
        isLoadingTotal: false,
      };

    case actions.GET_SEARCH_ORGANISATIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        organisations: payload,
      };

    case actions.SET_SEARCH_ORGANISATIONS_SUCCESS:
    const organisations = payload.map((organisation)=>({...organisation, text:organisation.name, lmsGroupName:organisation.lmsGroup.name }))
      return {
        ...state,
        organisations,
        selectedOrganisations: organisations,
      };

    case actions.SET_SEARCH_ORGANISATIONS_VALUE_SEARCH:
      return {
        ...state,
        value: payload,
      };

    case actions.SET_SEARCH_DATE_END_ORGANISATIONS:
      return {
        ...state,
        date: payload,
      };

    case actions.SET_IS_DEACTIVATED_SEARCH_ORGANISATIONS:
      return {
        ...state,
        isDeactivated: payload,
      };

    case actions.GET_SEARCH_ORGANISATIONS_TOTAL_SUCCESS:
      return {
        ...state,
        organisationsTotal: payload,
        isLoadingTotal: false,
      };

    case actions.SET_ORGANISATION_NAME_FIND:
      return {
        ...state,
        selectedOrganisationName: payload,
      };


    case actions.SET_ORGANISATION_ID_FIND:
      return {
        ...state,
        selectedOrganisationId: payload,
      };

    case actions.ADD_TO_SELECTED_ARRAY_ORG:
      const org = state.selectedOrganisations.find(item => item.id === payload.id);

      if (org) {
        return {
          ...state,
          selectedOrganisations: state.selectedOrganisations.filter(item => item.id !== org.id),
        };
      }

      return {
        ...state,
        selectedOrganisations: [
          ...state.selectedOrganisations,
          payload,
        ],
      };

    case actions.CLEAR_SELECTED_ARRAY_ORG:
      return {
        ...state,
        selectedOrganisations: [],
      };

    case actions.SET_SELECTED_ARRAY_ORG:
      return {
        ...state,
        selectedOrganisations: payload.map(item => ({
          id: item.id,
          text: item.name,
          lmsGroup: item.lmsGroup,
        })),
      };

    case actions.REMOVE_ITEM_FROM_ORG_ARRAY:
      return {
        ...state,
        selectedOrganisations: state.selectedOrganisations.filter(item => item.id !== payload),
      };

    case actions.SEARCH_ORG_ADMINS_SUCCESS:
      return {
        ...state,
        isLoadingOrgAdmins: false,
        orgAdmins: payload.map(item => ({
          id: item.id,
          name: `${item.lastName} ${item.firstName}`,
          email: item.userEmail.map(email => email.email).join(' and '),
          affiliation: item.organisations.map(aff => aff.name).join(' and '),
          createdAt: item.createdAt,
        })),
      };

    case actions.SEARCH_ORG_ADMINS_START:
      return {
        ...state,
        isLoadingOrgAdmins: true,
      };

    case actions.SEARCH_ORG_ADMINS_FAIL:
      return {
        ...state,
        isLoadingOrgAdmins: false,
      };

    case actions.SET_INIT_STATE_ORG:
      return {
        ...initState,
        selectedOrganisations: state.selectedOrganisations,
      };

    case actions.SET_INIT_STATE_FULL_ORG:
      return {
        ...initState,
      };

    case actions.CHANGE_STATE_PERSON_SEARCH_ORG:
      return {
        ...state,
        person: {
          ...state.person,
          [payload.name]: payload.value,
        },
      };

    default:
      return state;
  }
}
