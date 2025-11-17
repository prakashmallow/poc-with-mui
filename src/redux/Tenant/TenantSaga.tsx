import { call, put, takeLatest } from 'redux-saga/effects';

import { authActions } from '@/redux/Auth/AuthState';
import { getPromise } from '@/utils/axiosHelper';

import { tenantActions as actions } from './TenantState';

function* getProjectDetails(params: any): Generator<any, void, unknown> {
  try {
    const response: any = yield call(() =>
      getPromise('tenant', { isTenant: true }, false)
    );
    yield put(actions.getProjectDetailsSuccess(response));
    yield put(authActions.getAutherize(params?.payload));
  } catch (error: any) {
    yield put(actions.getProjectDetailsFailure(error));
  }
}

export default function* tenantSaga(): Generator<any, void, unknown> {
  yield takeLatest(actions.getProjectDetails.type, getProjectDetails);
}
