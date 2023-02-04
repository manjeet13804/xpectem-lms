// @flow
import types from '../types';
import {
  AsyncRequestType,
  AsyncDefaultType,
  ActionValueType,
} from '../flowTypes';

const {
  ASYNC_REQUEST,
  ASYNC_DEFAULT,
} = types;

const actionRequest = ({
  body,
  url,
  method,
  callback,
  isToken,
  file,
}: ActionValueType): AsyncRequestType => ({
  type: ASYNC_REQUEST,
  payload: body,
  method,
  url,
  callback,
  isToken,
  file,
});

const actionRequestDefault = (): AsyncDefaultType => ({
  type: ASYNC_DEFAULT,
});


export {
  actionRequest,
  actionRequestDefault,
};
