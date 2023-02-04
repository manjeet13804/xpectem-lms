// @flow
import {
  schema,
} from 'normalizr';
import { lesson } from '../lessons/schema';
import { assignment } from '../assignments/schema';
import { exam } from '../exams/schema';

const { Entity } = schema;

const topic = new Entity('topics', {
  lessons: [lesson],
  assignments: [assignment],
  exams: [exam],
});

export {
  // eslint-disable-next-line import/prefer-default-export
  topic,
};
