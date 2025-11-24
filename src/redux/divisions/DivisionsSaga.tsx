import { call, put, takeEvery } from '@redux-saga/core/effects';
import { omit } from 'lodash';

import { handleGetTableData } from '@/components/client/helper';
import {
  displayMessage,
  getPromise,
  handleErrorResponse,
  postPromise,
  putPromise
} from '@/components/shared/utils';

import { billingAddressActions } from '@/redux/billingAddress/BillingAddressState';
import { divisionsActions as actions } from '@/redux/divisions/DivisionsState';

import {
  getPreSignedBlobData,
  handleCreateLink,
  handleFileNameForExportFile
} from '@/utils/helper';

function* workGetDivisionsList(params: any): Generator<any, void, unknown> {
  try {
    let url = `division/list?cust_id=${params.payload.value.cust_id}&page=${params.payload.value.page}&size=${params.payload.value.size}`;
    params.payload.value = omit(params.payload.value, [
      'page',
      'cust_id',
      'size',
      'pages',
      'total'
    ]);
    const data = yield call(() =>
      postPromise(url, params.payload.value, { isClient: true })
    );
    yield put(actions.getDivisionsListSuccess(data));
  } catch (e) {
    yield put(actions.getDivisionsListFailure());
    handleErrorResponse(e, {
      action: actions.getDivisionsList,
      payload: params.payload
    });
  }
}

function* workGetDivisionsFormValues(
  params: any
): Generator<any, void, unknown> {
  try {
    let url: string = `division/?cust_id=${params.payload.cust_id}&div_id=${params.payload.div_id}`;
    const data: any = yield call(() => getPromise(url, { isClient: true }));
    yield put(billingAddressActions.setBillingAddressDropdownValues(data));
    yield put(
      actions.getDivisionsFormValuesSuccess(
        data?.id ? data : { ...data, id: params.payload.div_id }
      )
    );
  } catch (e) {
    yield put(actions.getDivisionsFormValuesFailure());
    handleErrorResponse(e, {
      action: actions.getDivisionsFormValues,
      payload: params.payload
    });
  }
}

function* workPostDivisionsFormData(
  params: any
): Generator<any, void, unknown> {
  const { data, filterData, clientId, paginationData, dispatch } =
    params.payload;
  try {
    let url = 'division';
    const response = yield call(() =>
      postPromise(url, data, { isClient: true })
    );
    yield put(actions.postDivisionsFormDataSuccess(response));
    handleGetTableData(
      dispatch,
      filterData,
      clientId,
      paginationData,
      'divisions'
    );
    yield put(actions.setDivisionsModalVisibility());
  } catch (e) {
    yield put(actions.postDivisionsFormDataFailure());
    handleErrorResponse(e, {
      action: actions.postDivisionsFormData,
      payload: params.payload
    });
  }
}

function* workPutDivisionsFormData(params: any): Generator<any, void, unknown> {
  const { data, filterData, clientId, paginationData, dispatch } =
    params.payload;
  try {
    let url = `division/${data.division_id}`;
    let formDetails = {
      ...params.payload.data,
      division_id: undefined
    };
    const response = yield call(() =>
      putPromise(url, formDetails, { isClient: true })
    );
    yield put(actions.putDivisionsFormDataSuccess(response));
    handleGetTableData(
      dispatch,
      filterData,
      clientId,
      paginationData,
      'divisions'
    );
    yield put(actions.setDivisionsModalVisibility());
  } catch (e) {
    yield put(actions.putDivisionsFormDataFailure());
    handleErrorResponse(e, {
      action: actions.putDivisionsFormData,
      payload: params.payload
    });
  }
}

function* workChangeDivisionStatus(params: any): Generator<any, void, unknown> {
  const { page, size, editClientId, filterData, id, status } = params.payload;
  try {
    let url = `division/${id}/${status}`;
    const data = yield call(() => postPromise(url, {}, { isClient: true }));
    yield put(actions.changeDivisionStatusSuccess(data));
    yield put(
      actions.getDivisionsList({
        value: {
          ...filterData,
          cust_id: editClientId,
          page,
          size
        }
      })
    );
  } catch (e) {
    yield put(actions.changeDivisionStatusFailure());
    handleErrorResponse(e, {
      action: actions.changeDivisionStatus,
      payload: params.payload
    });
  }
}

function* workGetDivisionsDropdownValues(
  params: any
): Generator<any, void, unknown> {
  try {
    let url = `division/?cust_id=${params.payload.cust_id}&division_name=${params.payload.division_name}`;
    const data = yield call(() => getPromise(url, { isClient: true }));
    yield put(actions.getDivisionsDropdownValuesSuccess(data));
  } catch (e) {
    yield put(actions.getDivisionsDropdownValuesFailure());
    handleErrorResponse(e, {
      action: actions.getDivisionsDropdownValues,
      payload: params.payload
    });
  }
}

function* workGetDivisionExport(params: any): Generator<any, void, unknown> {
  try {
    let url = `division/export?cust_id=${params.payload.clientId}`;
    let filters = params.payload.filtersFormData;
    filters = omit(filters, ['page', 'cust_id', 'size']);
    const data = yield call(() =>
      postPromise(url, filters, { isClient: true })
    );
    try {
      const response = yield call(() => getPreSignedBlobData(data));
      yield put(actions.getDivisionExportSuccess(data));
      const fileName = handleFileNameForExportFile(response);
      yield handleCreateLink(response, fileName);
    } catch (errorObj) {
      yield put(actions.getDivisionExportFailure(errorObj));
      displayMessage('error', 'File export failed');
    }
  } catch (e) {
    yield put(actions.getDivisionExportFailure());
    handleErrorResponse(e, {
      action: actions.getDivisionExport,
      payload: params.payload
    });
  }
}

function* divisionsSaga(): Generator<any, void, unknown> {
  yield takeEvery(actions.getDivisionsList.type, workGetDivisionsList);
  yield takeEvery(
    actions.getDivisionsFormValues.type,
    workGetDivisionsFormValues
  );
  yield takeEvery(
    actions.postDivisionsFormData.type,
    workPostDivisionsFormData
  );
  yield takeEvery(actions.putDivisionsFormData.type, workPutDivisionsFormData);
  yield takeEvery(actions.changeDivisionStatus.type, workChangeDivisionStatus);
  yield takeEvery(
    actions.getDivisionsDropdownValues.type,
    workGetDivisionsDropdownValues
  );
  yield takeEvery(actions.getDivisionExport.type, workGetDivisionExport);
}

export default divisionsSaga;
