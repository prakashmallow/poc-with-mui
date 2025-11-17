import authSaga from '@/redux/Auth/AuthSaga';
import sharedDetailsSaga from '@/redux/SharedDetails/SharedDetailsSaga';
import tenantSaga from '@/redux/Tenant/TenantSaga';
import { all } from 'redux-saga/effects';

const rootSaga = function* () {
    yield all([
    authSaga(),
    sharedDetailsSaga(),
    tenantSaga(),
  ]);
}

export default rootSaga;