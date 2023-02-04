import _ from 'lodash';
import actions from './actions';

const initState = {
  news: [],
  images: {},
  total: 0,
  isNewNews: false,
  isUpdated: false,
  isNewsUpdate: false,
};

export default function cardReducer(state = initState, { type, ...action }) {
  switch (type) {
    case actions.GET_FEED_NEWS_START: {
      return {
        ...state,
        isNewsUpdate: true,
      };
    }
    case actions.GET_FEED_NEWS: {
      const { result, total } = action.news;

      return {
        ...state,
        news: result,
        total,
        isNewsUpdate: false,
      };
    }
    case actions.GET_FEED_NEWS_FAILURE: {
      return {
        ...state,
      };
    }
    case actions.UPDATE_FEED_NEWS_SUCCESS: {
      const { data, withoutFilter } = action;
      const { news } = state;
      const updatedNews = [...news];

      if (news.length) {
        data.map((updatedOneNews) => {
          const currentNews = news.findIndex(oneNews => oneNews.id === updatedOneNews.data.id);

          if (currentNews > -1) {
            updatedNews[currentNews] = {
              ...updatedOneNews.data,
              assets: updatedNews[currentNews].assets,
            };
          }

          return updatedNews;
        });
      } else {
        updatedNews.push(data[0].data);
      }

      return {
        ...state,
        ...(withoutFilter && { news: updatedNews }),
        isUpdated: true,
      };
    }
    case actions.UPDATE_FEED_NEWS_FAILURE: {
      return {
        ...state,
      };
    }
    case actions.CREATE_FEED_NEWS_SUCCESS: {
      const { feed: { id } } = action;

      return {
        ...state,
        isUpdated: true,
        createdNews: id,
      };
    }
    case actions.CREATE_FEED_NEWS_FAILURE: {
      return {
        ...state,
      };
    }
    case actions.UPDATE_EDIT_FEED_NEWS:
      return {
        ...state,
      };
    case actions.REMOVE_NEWS_IS_UPDATED_STATUS: {
      return {
        ...state,
        isUpdated: false,
      };
    }
    case actions.DELETE_FEED_NEWS_STATUS_CHANGE_SUCCESS: {
      const { ids, value, withoutFilter } = action;

      const news = state.news.map((item) => {
        const found = _.find(ids, id => id === item.id);

        if (found) {
          return { ...item, isDeleted: !value };
        }

        return item;
      });

      return {
        ...state,
        ...(withoutFilter && { news }),
      };
    }
    case actions.DELETE_FEED_NEWS_STATUS_CHANGE_FAILURE: {
      return {
        ...state,
        isUpdated: false,
      };
    }
    default:
      return state;
  }
}
