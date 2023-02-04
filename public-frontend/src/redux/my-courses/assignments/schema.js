// @flow
import {
  schema,
} from 'normalizr';

const { Entity } = schema;

const assignment = new Entity('assignments');

export {
  // eslint-disable-next-line import/prefer-default-export
  assignment,
};
