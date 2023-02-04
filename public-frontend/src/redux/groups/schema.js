// @flow
import {
  schema,
} from 'normalizr';

const { Entity } = schema;

const group = new Entity('groups');

export {
  // eslint-disable-next-line import/prefer-default-export
  group,
};
