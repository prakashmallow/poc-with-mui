import { call, put, takeEvery } from '@redux-saga/core/effects';

import { getPromise, handleErrorResponse } from '@/components/shared/utils';

import { handleHistoryData } from '@/utils/components/history/helper';

import { historyActions as actions } from './HistoryState';

function* onGetHistoryList(params: any): Generator<any, void, unknown> {
  try {
    let url = `history/${params.payload.clientId}?page=${params.payload.page}&size=${params.payload.size}`;
    const data = yield call(() => getPromise(url, { isClient: true }));
    yield put(actions.getHistoryListSuccess(data));
  } catch (e) {
    yield put(actions.getHistoryListFailure());
    handleErrorResponse(e, {
      action: actions.getHistoryList,
      payload: params.payload
    });
  }
}

function* onGetHistoryDetails(params: any): Generator<any, void, unknown> {
  try {
    const { id, dispatch, section, router, clientId } = params.payload;
    let url = `history/detail/${id}`;
    const data: any = yield call(() => getPromise(url, { isClient: true }));
    yield put(actions.getHistoryDetailsSuccess(data));
    if (!section && (data.message || data?.detail || data?.version)) {
      yield put(actions.setComparisonDataModalVisibility());
    } else if (section) {
      handleHistoryData({ data, dispatch, router, clientId });
    }
  } catch (e) {
    yield put(actions.getHistoryDetailsFailure());
    handleErrorResponse(e, {
      action: actions.getHistoryDetails,
      payload: params.payload
    });
  }
}

function* historySaga(): Generator<any, void, unknown> {
  yield takeEvery(actions.getHistoryList.type, onGetHistoryList);
  yield takeEvery(actions.getHistoryDetails.type, onGetHistoryDetails);
}

export default historySaga;
