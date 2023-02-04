// @flow
import { put, takeLatest, all } from 'redux-saga/effects';
import { Saga } from 'redux-saga';
import { getError, apiCall } from 'redux/@utils/apiCall';
import { GROUP, ORGANISATION } from 'constants/apiUrls';
import {
  GET_GROUPS,
  GET_GROUPS_START,
  GET_GROUPS_FAIL,
  GET_GROUPS_SUCCESS,
  GET_ORGANISATION_GROUP,
} from './types';
import { GetOrganisationGroupType } from './flowTypes';


function* getGroups(): Saga<void> {
  try {
    yield put({ type: GET_GROUPS_START });

    const {
      data: {
        data: groups,
      },
    } = yield apiCall({
      type: 'GET',
      url: GROUP,
      isToken: true,
    });

    yield put({
      type: GET_GROUPS_SUCCESS,
      payload: {
        groups,
      },
    });
  } catch (error) {
    yield put({ type: GET_GROUPS_FAIL, payload: getError(error) });
  }
}

function* getOrganisationGroup({ organisationId }: GetOrganisationGroupType): Saga<void> {
  try {
    yield put({ type: GET_GROUPS_START });

    const {
      data: {
        data: {
          groups,
        },
      },
    } = yield apiCall({
      type: 'GET',
      url: `${ORGANISATION}/${organisationId}`,
      isToken: true,
    });

    yield put({
      type: GET_GROUPS_SUCCESS,
      payload: {
        groups,
      },
    });
  } catch (error) {
    yield put({ type: GET_GROUPS_FAIL, payload: getError(error) });
  }
}

function* getGroupSaga(): Saga<void> {
  yield all([
    takeLatest(GET_GROUPS, getGroups),
    takeLatest(GET_ORGANISATION_GROUP, getOrganisationGroup),
  ]);
}
export default getGroupSaga;
