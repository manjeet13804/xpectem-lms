// @flow
import {
  schema,
} from 'normalizr';
import {course} from '../my-courses/schema';

const { Entity } = schema;

const certificates = new Entity(
  'certificates',
  {
    course,
  },
);

export {
  // eslint-disable-next-line import/prefer-default-export
  certificates,
};
