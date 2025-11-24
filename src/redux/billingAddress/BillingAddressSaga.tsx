import { call, put, takeEvery } from '@redux-saga/core/effects';
import { omit } from 'lodash';

import { handleGetTableData } from '@/utils';
import {
  // displayMessage,
  getCitiesPromise,
  getPromise,
  handleErrorResponse,
  postPromise,
  putPromise
} from '@/utils';

import { billingAddressActions as actions } from '@/redux/billingAddress/BillingAddressState';
import { clientsActions } from '@/redux/clients/ClientsState';

import {
  getPreSignedBlobData,
  handleCreateLink,
  handleFileNameForExportFile
} from '@/utils/helper';

function* workGetBillingAddressList(
  params: any
): Generator<any, void, unknown> {
  try {
    let url = `address/list?cust_id=${params.payload.value.cust_id}&page=${params.payload.value.page}&size=${params.payload.value.size}`;
    params.payload.value = omit(params.payload.value, [
      'page',
      'cust_id',
      'size',
      'pages',
      'total'
    ]);
    params.payload.value = {
      ...params.payload.value,
      address_country:
        params.payload.value.address_country?.value ||
        params.payload.value.address_country
    };
    if (!params.payload.value.address_country) {
      delete params.payload.value.address_country;
    }
    const data = yield call(() =>
      postPromise(url, params.payload.value, { isClient: true })
    );
    yield put(actions.getBillingAddressListSuccess(data));
  } catch (e) {
    yield put(actions.getBillingAddressListFailure());
    handleErrorResponse(e, {
      action: actions.getBillingAddressList,
      payload: params.payload
    });
  }
}

function* workGetBillingAddressDropdownValues(
  params: any
): Generator<any, void, unknown> {
  try {
    let url = `address?cust_id=${params.payload.cust_id}&billing_address_name=${params.payload.name}`;
    const data = yield call(() => getPromise(url, { isClient: true }));
    yield put(actions.getBillingAddressDropdownValuesSuccess(data));
  } catch (e) {
    yield put(actions.getBillingAddressDropdownValuesFailure());
    handleErrorResponse(e, {
      action: actions.getBillingAddressDropdownValues,
      payload: params.payload
    });
  }
}

function* workGetBillingAddressFormValues(
  params: any
): Generator<any, void, unknown> {
  try {
    let url = `address/?cust_id=${params.payload.cust_id}&addr_id=${params.payload.addr_id}`;
    const data: any = yield call(() => getPromise(url, { isClient: true }));
    yield put(
      actions.getBillingAddressFormValuesSuccess(
        data?.id ? data : { ...data, id: params.payload.addr_id }
      )
    );
    yield put(clientsActions.setCountryDropdownValues(data));
    yield put(actions.setBillingAddressCitesDropdownValues(data));
  } catch (e) {
    yield put(actions.getBillingAddressFormValuesFailure());
    handleErrorResponse(e, {
      action: actions.getBillingAddressFormValues,
      payload: params.payload
    });
  }
}

function* workPostBillingAddressFormData(
  params: any
): Generator<any, void, unknown> {
  const { data, dispatch, filterData, clientId, paginationData } =
    params.payload;
  try {
    let url = 'address';
    const response = yield call(() =>
      postPromise(url, data, { isClient: true })
    );
    handleGetTableData(
      dispatch,
      filterData,
      clientId,
      paginationData,
      'billing_address'
    );
    yield put(actions.postBillingAddressFormDataSuccess(response));
    yield put(actions.setBillingAddressModalVisibility());
  } catch (e) {
    yield put(actions.postBillingAddressFormDataFailure());
    handleErrorResponse(e, {
      action: actions.postBillingAddressFormData,
      payload: params.payload
    });
  }
}

function* workChangeBillingAddressStatus(
  params: any
): Generator<any, void, unknown> {
  try {
    let url = `address/${params.payload.addr_id}/${params.payload.status}`;
    const data = yield call(() => postPromise(url, { isClient: true }));
    yield put(actions.changeBillingAddressStatusSuccess(data));
    yield put(
      actions.getBillingAddressList({
        value: { cust_id: params.payload.clientId, page: 1 }
      })
    );
  } catch (e) {
    yield put(actions.changeBillingAddressStatusFailure());
    handleErrorResponse(e, {
      action: actions.changeBillingAddressStatus,
      payload: params.payload
    });
  }
}

function* workPutBillingAddressFormData(
  params: any
): Generator<any, void, unknown> {
  const {
    data,
    billingAddressId,
    dispatch,
    filterData,
    clientId,
    paginationData
  } = params.payload;
  try {
    let url = `address/${billingAddressId}`;
    const response = yield call(() =>
      putPromise(url, data, { isClient: true })
    );
    handleGetTableData(
      dispatch,
      filterData,
      clientId,
      paginationData,
      'billing_address'
    );
    yield put(actions.putBillingAddressFormDataSuccess(response));
    yield put(actions.setBillingAddressModalVisibility());
  } catch (e) {
    yield put(actions.putBillingAddressFormDataFailure());
    handleErrorResponse(e, {
      action: actions.putBillingAddressFormData,
      payload: params.payload
    });
  }
}

function* workGetCitiesDropdownValues(
  params: any
): Generator<any, void, unknown> {
  try {
    let url = `account/select/cities_list?city_name=${params.payload.value}`;
    const data = yield call(() => getCitiesPromise(url));
    yield put(actions.getCitiesDropdownSuccess(data));
  } catch (e) {
    yield put(actions.getCitiesDropdownFailure());
    handleErrorResponse(e);
  }
}

function* workGetBillingAddressExport(
  params: any
): Generator<any, void, unknown> {
  try {
    let url = `address/export?cust_id=${params.payload.clientId}`;
    let filters = params.payload.filtersFormData;
    filters = omit(filters, ['page', 'cust_id', 'size']);
    filters = {
      ...filters,
      address_country: filters.address_country?.value || filters.address_country
    };
    if (!filters.address_country) {
      delete filters.address_country;
    }
    const data = yield call(() =>
      postPromise(url, filters, { isClient: true })
    );
    try {
      const response = yield call(() => getPreSignedBlobData(data));
      yield put(actions.getBillingAddressExportSuccess());
      const fileName = handleFileNameForExportFile(response);
      yield handleCreateLink(response, fileName);
    } catch (error) {
      yield put(actions.getBillingAddressExportFailure(error));
      // displayMessage('error', 'File export failed');
    }
  } catch (e) {
    yield put(actions.getBillingAddressExportFailure());
    handleErrorResponse(e, {
      action: actions.getBillingAddressExport,
      payload: params.payload
    });
  }
}

function* billingAddressSaga(): Generator<any, void, unknown> {
  yield takeEvery(
    actions.getBillingAddressList.type,
    workGetBillingAddressList
  );
  yield takeEvery(
    actions.getBillingAddressDropdownValues.type,
    workGetBillingAddressDropdownValues
  );
  yield takeEvery(
    actions.getBillingAddressFormValues.type,
    workGetBillingAddressFormValues
  );
  yield takeEvery(
    actions.postBillingAddressFormData.type,
    workPostBillingAddressFormData
  );
  yield takeEvery(
    actions.changeBillingAddressStatus.type,
    workChangeBillingAddressStatus
  );
  yield takeEvery(
    actions.putBillingAddressFormData.type,
    workPutBillingAddressFormData
  );
  yield takeEvery(
    actions.getCitiesDropdownValues.type,
    workGetCitiesDropdownValues
  );
  yield takeEvery(
    actions.getBillingAddressExport.type,
    workGetBillingAddressExport
  );
}

export default billingAddressSaga;
