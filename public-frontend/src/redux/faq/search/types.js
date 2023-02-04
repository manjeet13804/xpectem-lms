import {factoryActionType} from 'utils';

const SEARCH_FAQ = 'SEARCH_FAQ';
const {
  SEARCH_FAQ_START,
  SEARCH_FAQ_SUCCESS,
  SEARCH_FAQ_FAIL,
} = factoryActionType([SEARCH_FAQ]);

export {
  SEARCH_FAQ,
  SEARCH_FAQ_START,
  SEARCH_FAQ_SUCCESS,
  SEARCH_FAQ_FAIL,
};
