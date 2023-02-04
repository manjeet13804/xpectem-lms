// @flow
import {
  schema,
} from 'normalizr';

const { Entity } = schema;

const certification = new Entity('certifications');

export {
  // eslint-disable-next-line import/prefer-default-export
  certification,
};
