import { call, put, takeEvery, takeLatest } from '@redux-saga/core/effects';

import {
  displayMessage,
  getPromise,
  handleErrorResponse,
  postPromise,
  putPromise
} from '@/components/shared/utils';

import { configurationsActions as actions } from '@/redux/configurations/ConfigurationsState';

export function* onGetConsortiums({
  payload
}: any): Generator<any, void, unknown> {
  try {
    const { page = 1, size = 25 } = payload;
    const response = yield call(() =>
      postPromise(
        `consortiums/list?page=${page}&size=${size}`,
        {},
        { isClient: true }
      )
    );
    yield put(actions.getConsortiumsSuccess(response));
  } catch (error) {
    handleErrorResponse(error, { action: actions.getConsortiums, payload });
    yield put(actions.getConsortiumsFailure(error));
  }
}

export function* onGetConsortium({
  payload
}: any): Generator<any, void, unknown> {
  try {
    const response = yield call(() =>
      getPromise(`consortiums/${payload.id}`, { isClient: true })
    );
    yield put(actions.getConsortiumSuccess(response));
  } catch (error) {
    yield put(actions.getConsortiumFailure(error));
    handleErrorResponse(error, { action: actions.getConsortium, payload });
  }
}

export function* onCreateConfiguration({
  payload
}: any): Generator<any, void, unknown> {
  try {
    const { data, paginationData } = payload;
    const response = yield call(() =>
      postPromise('consortiums', data, { isClient: true })
    );
    yield put(actions.createConsortiumSuccess());
    displayMessage(
      'success',
      response || 'Consortium has been created successfully'
    );
    yield put(actions.setConsortiumModalVisibility());
    yield put(actions.getConsortiums(paginationData));
  } catch (error) {
    yield put(actions.createConsortiumFailure(error));
    handleErrorResponse(error, { action: actions.createConsortium, payload });
  }
}

export function* onUpdateConfiguration({
  payload
}: any): Generator<any, void, unknown> {
  try {
    const { id, name, paginationData } = payload;
    const response = yield call(() =>
      putPromise(`consortiums/${id}`, { name }, { isClient: true })
    );
    displayMessage(
      'success',
      response || 'Consortium has been updated successfully'
    );
    yield put(actions.updateConsortiumSuccess());
    yield put(actions.getConsortiums(paginationData));
    yield put(actions.setConsortiumModalVisibility());
  } catch (error) {
    yield put(actions.updateConsortiumFailure(error));
    handleErrorResponse(error, { action: actions.updateConsortium, payload });
  }
}

function* clientsConfigurationsSaga() {
  yield takeLatest(actions.getConsortiums.type, onGetConsortiums);
  yield takeEvery(actions.getConsortium.type, onGetConsortium);
  yield takeEvery(actions.createConsortium.type, onCreateConfiguration);
  yield takeEvery(actions.updateConsortium.type, onUpdateConfiguration);
}

export default clientsConfigurationsSaga;
