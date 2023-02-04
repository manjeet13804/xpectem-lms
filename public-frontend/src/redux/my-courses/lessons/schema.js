// @flow
import {
  schema,
} from 'normalizr';

const { Entity } = schema;

const lesson = new Entity('lessons');

export {
  // eslint-disable-next-line import/prefer-default-export
  lesson,
};
