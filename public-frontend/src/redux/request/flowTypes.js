// @flow
import types from './types';

const {
  ASYNC_REQUEST,
  ASYNC_DEFAULT,
} = types;

type ActionValueType = {
  body: object,
  url: string,
  method: string,
  callback?: () => void,
  isToken: boolean,
  file: object
};

type AsyncRequestType = {
  type: ASYNC_REQUEST
};

type AsyncDefaultType = {
  type: ASYNC_DEFAULT
};

export {
  AsyncRequestType,
  AsyncDefaultType,
  ActionValueType,
};
