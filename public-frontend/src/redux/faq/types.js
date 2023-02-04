import {factoryActionType} from 'utils';

const GET_FAQ = 'GET_FAQ';
const {
  GET_FAQ_START,
  GET_FAQ_SUCCESS,
  GET_FAQ_FAIL,
} = factoryActionType([GET_FAQ]);

export {
  GET_FAQ,
  GET_FAQ_START,
  GET_FAQ_SUCCESS,
  GET_FAQ_FAIL,
};
