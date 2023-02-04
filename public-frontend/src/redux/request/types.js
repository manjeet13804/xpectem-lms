import factoryActionTypes from 'utils/factoryActionType';

const ASYNC_REQUEST = 'ASYNC_REQUEST';
const ASYNC_DEFAULT = 'ASYNC_DEFAULT';
const types = factoryActionTypes(
  ['ASYNC'],
);

export default {
  ASYNC_REQUEST,
  ASYNC_DEFAULT,
  ...types,
};
