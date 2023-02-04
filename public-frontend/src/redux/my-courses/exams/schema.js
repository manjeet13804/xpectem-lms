// @flow
import {
  schema,
} from 'normalizr';

const { Entity } = schema;

const exam = new Entity('exams');

export {
  // eslint-disable-next-line import/prefer-default-export
  exam,
};
