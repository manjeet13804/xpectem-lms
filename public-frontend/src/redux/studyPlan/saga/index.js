// @flow
import {put, takeLatest, all} from 'redux-saga/effects';
import type {Saga} from 'redux-saga';
import {getError, apiCall} from 'redux/@utils/apiCall';
import { MY_COURSE, STUDY_PLAN } from 'constants/apiUrls';
import types from '../types';

const {
  GET_STUDY_PLAN,
  GET_STUDY_PLAN_START,
  GET_STUDY_PLAN_SUCCESS,
  GET_STUDY_PLAN_FAIL,
  SET_STUDY_PLAN_PARAM,
  SET_STUDY_PLAN_PARAM_START,
  SET_STUDY_PLAN_PARAM_SUCCESS,
  SET_STUDY_PLAN_PARAM_FAIL,
} = types;


function* getStudyPlan({payload: {id}}: object): Saga<void> {
  try {
    yield put({ type: GET_STUDY_PLAN_START});
    const {data: {data}} = yield apiCall({type: 'GET', url: `${MY_COURSE}/${id}/${STUDY_PLAN}`, isToken: true});
    yield put({
      type: GET_STUDY_PLAN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({ type: GET_STUDY_PLAN_FAIL, payload: getError(error) });
  }
}

function* setStudyPlanParam({payload: {id, body}}: object): Saga<void> {
  try {
    yield put({ type: SET_STUDY_PLAN_PARAM_START});
    const { data: {data}} = yield apiCall({
      type: 'PATCH',
      body,
      url: `${MY_COURSE}/${id}/${STUDY_PLAN}`,
      isToken: true,
    });
    yield put({
      type: SET_STUDY_PLAN_PARAM_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({ type: SET_STUDY_PLAN_PARAM_FAIL, payload: getError(error) });
  }
}

function* getGroupSaga(): Saga<void> {
  yield all([
    takeLatest(GET_STUDY_PLAN, getStudyPlan),
    takeLatest(SET_STUDY_PLAN_PARAM, setStudyPlanParam),
  ]);
}
export default getGroupSaga;
