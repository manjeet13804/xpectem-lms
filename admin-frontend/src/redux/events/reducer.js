import clone from 'clone';
import constants from 'helpers/constants';
import moment from 'moment';
import actions from './actions';

const initState = {
  events: null,
  editableEvent: {},
  editableEventAssets: [],
  isEventLoading: false,
  categories: null,
  importanceLevels: null,
  isUpdatedEvents: false,
  eventsIsLoading: false,
  error: null,
  totalEvents: 0,
};

const ASSET_CALENDAR = {
  title: '',
  description: '',
  externalLink: '',
  dateStart: null,
  dateEnd: null,
  categoryId: null,
  featured: false,
  verified: false,
  assets: [],
  markets: [],
  isDeleted: false,
};

export default function cardReducer(state = initState, { type, ...action }) {
  switch (type) {
    case actions.GET_EVENTS_START: {
      return {
        ...state,
        eventsIsLoading: true,
      };
    }
    case actions.GET_EVENTS: {
      const { total, data } = action.events;

      return {
        ...state,
        totalEvents: total,
        events: data,
        eventsIsLoading: false,
      };
    }

    case actions.GET_EVENTS_FAIL: {
      return {
        ...state,
        eventsIsLoading: false,
      };
    }

    case actions.GET_EVENT_START: {
      return {
        isEventLoading: true,
      };
    }

    case actions.GET_EVENT: {
      const { data: { result } } = action;
      const [event] = result;

      const changedEvent = {
        ...event,
        dateStart: moment(event.dateStart, 'YYYY-MM-DDTHH:mm:ss.SSSZ'),
        dateFinish: moment(event.dateFinish, 'YYYY-MM-DDTHH:mm:ss.SSSZ'),
        assets: event.assets ? event.assets.map(asset => asset.id) : [],
      };

      return {
        ...state,
        editableEvent: changedEvent,
        editableEventAssets: event.assets,
        isEventLoading: false,
      };
    }

    case actions.DELETE_EVENT: {
      return {
        ...state,
        editableEvent: {},
        editableEventAssets: [],
      };
    }

    case actions.GET_EVENT_FAIL: {
      return {
        ...state,
        isEventLoading: false,
      };
    }

    case actions.DELETE_EVENTS: {
      return {
        ...state,
        events: null,
      };
    }

    case actions.GET_CATEGORIES: {
      const { categories } = action;

      return {
        ...state,
        categories,
      };
    }

    case actions.GET_CATEGORIES_FAIL: {
      return {
        ...state,
      };
    }

    case actions.GET_IMPORTANCE_LEVELS: {
      const { result } = action.data;
      const importanceLevels = result.sort((a, b) => a.level - b.level);

      return {
        ...state,
        importanceLevels,
      };
    }

    case actions.GET_IMPORTANCE_LEVELS_FAIL: {
      return {
        ...state,
      };
    }

    case actions.UPDATE_EVENT: {
      const events = clone(state.events);
      const updatedEvents = action.data;

      if (!events) {
        return {
          ...state,
          isUpdatedEvents: true,
        };
      }

      const newEvents = events.map((event) => {
        const index = updatedEvents.findIndex(item => Number(item.data.id) === Number(event.id));

        if (index !== -1) {
          return {
            ...event,
            ...updatedEvents[index].data,
          };
        }

        return event;
      });

      return {
        ...state,
        events: newEvents,
        isUpdatedEvents: true,
      };
    }

    case actions.UPDATE_EVENT_FAIL: {
      return {
        ...state,
      };
    }

    case actions.CREATE_EVENT: {
      return {
        ...state,
        isUpdatedEvents: true,
      };
    }

    case actions.CREATE_EVENT_FAIL: {
      return {
        ...state,
      };
    }

    case actions.REMOVE_UPDATED_STATUS: {
      return {
        ...state,
        isUpdatedEvents: false,
      };
    }

    case actions.TOGGLE_SOFT_DELETE_EVENT: {
      const { data, withoutFilter } = action;
      const { softDeleteStatuses } = constants;

      const newEvents = state.events.map((event) => {
        const index = data.findIndex(elem => elem.id === event.id);

        if (index !== -1) {
          const status = softDeleteStatuses[data[index].statusCode];

          return {
            ...event,
            isDeleted: status,
          };
        }

        return event;
      });

      return {
        ...state,
        ...(withoutFilter && { events: newEvents }),
      };
    }

    case actions.TOGGLE_SOFT_DELETE_EVENT_FAIL: {
      return {
        ...state,
      };
    }

    case actions.GET_ASSET_CALENDAR_ITEM_START: {
      return {
        ...state,
        isEventLoading: true,
      };
    }

    case actions.GET_ASSET_CALENDAR_ITEM_SUCCESS: {
      return {
        ...state,
        editableEvent: {
          ...ASSET_CALENDAR,
          ...action.payload,
          categoryId: action.payload.category ? action.payload.category.id : null,
        },
        isEventLoading: false,
        error: null,
      };
    }

    case actions.UPDATE_ASSET_CALENDAR_START:
    case actions.CREATE_ASSET_CALENDAR_START: {
      return {
        ...state,
        isUpdatedEvents: true,
      };
    }

    case actions.UPDATE_ASSET_CALENDAR_SUCCESS:
    case actions.CREATE_ASSET_CALENDAR_SUCCESS: {
      return {
        ...state,
        isUpdatedEvents: false,
        error: null,
      };
    }

    case actions.UPDATE_ASSET_CALENDAR_FAIL:
    case actions.CREATE_ASSET_CALENDAR_FAIL: {
      return {
        ...state,
        isUpdatedEvents: false,
        error: action.payload,
      };
    }

    case actions.INIT_ASSET_CALENDAR: {
      return {
        ...state,
        editableEvent: ASSET_CALENDAR,
      };
    }

    case actions.CHANGE_ASSET_CALENDAR: {
      return {
        ...state,
        editableEvent: {
          ...state.editableEvent,
          ...action.payload,
        },
      };
    }

    default:
      return state;
  }
}
