// @flow
import types from '../types';

const { GET_STUDY_PLAN, SET_STUDY_PLAN_PARAM } = types;

const actionGetStudyPlan = (payload: object): object => ({
  type: GET_STUDY_PLAN,
  payload,
});

const actionSetStudyPlanParam = (payload: object): object => ({
  type: SET_STUDY_PLAN_PARAM,
  payload,
});

export {
  actionGetStudyPlan,
  actionSetStudyPlanParam,
};
