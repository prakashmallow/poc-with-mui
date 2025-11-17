import { call, put, takeEvery } from 'redux-saga/effects';

import { sharedDetailsActions } from '@/redux/SharedDetails/SharedDetailsState';
import { getPromise, handleErrorResponse } from '@/utils';

function* getGlobalSearchData(params: any): Generator<any, void> {
  const {
    current_page = 1,
    page_items = 25,
    searchText = ''
  } = params?.payload || {};
  try {
    const response = yield call(() =>
      getPromise(
        `v1/staffs/linguists/global_search?query=${searchText}&size=${page_items}&page=${current_page}`,
        { isLinguist: true }
      )
    );
    yield put(sharedDetailsActions.getGlobalSearchDataSuccess(response));
  } catch (error: any) {
    handleErrorResponse(error);
    yield put(sharedDetailsActions.getGlobalSearchDataFailure());
  }
}

function* onGetExportDetails(): Generator<any, void> {
  try {
    const response = yield call(() =>
      getPromise('v1/staffs/linguists/recent_exports', { isLinguist: true })
    );
    yield put(sharedDetailsActions.getExportDetailsSuccess(response?.data));
  } catch (error: any) {
    handleErrorResponse(error);
  }
}

function* sharedDetailsSaga(): Generator<any, void> {
  yield takeEvery(
    sharedDetailsActions.getGlobalSearchData.type,
    getGlobalSearchData
  );
  yield takeEvery(
    sharedDetailsActions.getExportDetails.type,
    onGetExportDetails
  );
}

export default sharedDetailsSaga;
