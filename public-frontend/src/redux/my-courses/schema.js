// @flow
import {
  schema,
} from 'normalizr';
import { topic } from './topics/schema';

const { Entity } = schema;

const course = new Entity('courses');

const coursesByGroup = new Entity('groups', {
  courses: [course],
});

course.define({
  topics: [topic],
});

export {
  // eslint-disable-next-line import/prefer-default-export
  course,
  coursesByGroup,
};
