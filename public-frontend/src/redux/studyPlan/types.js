
import { factoryActionType } from 'utils';

const GET_STUDY_PLAN = 'GET_STUDY_PLAN';
const SET_STUDY_PLAN_PARAM = 'SET_STUDY_PLAN_PARAM';
const types = factoryActionType(
  ['GET_STUDY_PLAN', 'SET_STUDY_PLAN_PARAM'],
);

export default {
  GET_STUDY_PLAN,
  SET_STUDY_PLAN_PARAM,
  ...types,
};
