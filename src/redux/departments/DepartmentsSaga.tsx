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
import { departmentsActions as actions } from '@/redux/departments/DepartmentsState';
import { divisionsActions } from '@/redux/divisions/DivisionsState';

import {
  getPreSignedBlobData,
  handleCreateLink,
  handleFileNameForExportFile
} from '@/utils/helper';

function* workGetDepartmentsList(params: any): Generator<any, void, unknown> {
  try {
    let url: string = `department/list?cust_id=${params.payload.value.cust_id}&page=${params.payload.value.page}&size=${params.payload.value.size}`;
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
    yield put(actions.getDepartmentsListSuccess(data));
  } catch (e) {
    yield put(actions.getDepartmentsListFailure());
    handleErrorResponse(e, {
      action: actions.getDepartmentsList,
      payload: params.payload
    });
  }
}

function* workGetDepartmentsFormValues(
  params: any
): Generator<any, void, unknown> {
  try {
    let url: string = `department/?customer_id=${params.payload.cust_id}&department_id=${params.payload.department_id}`;
    const data: any = yield call(() => getPromise(url, { isClient: true }));
    yield put(billingAddressActions.setBillingAddressDropdownValues(data));
    yield put(divisionsActions.setDivisionsDropdownValues(data));
    yield put(
      actions.getDepartmentsFormValuesSuccess(
        data.id ? data : { ...data, id: params.payload.department_id }
      )
    );
  } catch (e) {
    yield put(actions.getDepartmentsFormValuesFailure());
    handleErrorResponse(e, {
      action: actions.getDepartmentsFormValues,
      payload: params.payload
    });
  }
}

function* workPostDepartmentsFormData(
  params: any
): Generator<any, void, unknown> {
  const { dispatch, data, filterData, clientId, paginationData } =
    params.payload;
  try {
    let url: string = 'department';
    const response = yield call(() =>
      postPromise(url, data, { isClient: true })
    );
    handleGetTableData(
      dispatch,
      filterData,
      clientId,
      paginationData,
      'departments'
    );
    yield put(actions.postDepartmentsFormDataSuccess(response));
    yield put(actions.setDepartmentModalVisibility());
  } catch (e) {
    yield put(actions.postDepartmentsFormDataFailure());
    handleErrorResponse(e, {
      action: actions.postDepartmentsFormData,
      payload: params.payload
    });
  }
}

function* workPutDepartmentsFormData(
  params: any
): Generator<any, void, unknown> {
  const { dispatch, data, filterData, clientId, paginationData } =
    params.payload;
  try {
    let url: string = `department/${data.department_id}`;
    let formDetails = {
      ...data,
      department_id: undefined
    };
    const response = yield call(() =>
      putPromise(url, formDetails, { isClient: true })
    );
    handleGetTableData(
      dispatch,
      filterData,
      clientId,
      paginationData,
      'departments'
    );
    yield put(actions.putDepartmentsFormDataSuccess(response));
    yield put(actions.setDepartmentModalVisibility());
  } catch (e) {
    yield put(actions.putDepartmentsFormDataFailure());
    handleErrorResponse(e, {
      action: actions.putDepartmentsFormData,
      payload: params.payload
    });
  }
}

function* workChangeDepartmentsStatus(
  params: any
): Generator<any, void, unknown> {
  const { page, size, clientId, filterData, department_id, status } =
    params.payload;
  try {
    let url: string = `department/${department_id}/${status}`;
    const data = yield call(() => postPromise(url, {}, { isClient: true }));
    yield put(actions.changeDepartmentsStatusSuccess(data));
    yield put(
      actions.getDepartmentsList({
        value: {
          ...filterData,
          cust_id: clientId,
          page,
          size
        }
      })
    );
  } catch (e) {
    yield put(actions.changeDepartmentsStatusFailure());
    handleErrorResponse(e, {
      action: actions.changeDepartmentsStatus,
      payload: params.payload
    });
  }
}

function* workGetDepartmentsDropdownValues(
  params: any
): Generator<any, void, unknown> {
  try {
    const { cust_id, searchValue, division_id } = params.payload;
    let url: string = `department/?customer_id=${cust_id}&department_name=${searchValue}${division_id ? `&division_id=${division_id}` : ''}`;
    const data = yield call(() => getPromise(url, { isClient: true }));
    yield put(actions.getDepartmentsDropdownValuesSuccess(data));
  } catch (e) {
    yield put(actions.getDepartmentsDropdownValuesFailure());
    handleErrorResponse(e, {
      action: actions.getDepartmentsDropdownValues,
      payload: params.payload
    });
  }
}

function* workGetDepartmentExport(params: any): Generator<any, void, unknown> {
  try {
    let url: string = `department/export?cust_id=${params.payload.clientId}`;
    let filters = params.payload.filtersFormData;
    filters = omit(filters, ['page', 'cust_id', 'size']);
    const data = yield call(() =>
      postPromise(url, filters, { isClient: true })
    );
    try {
      const response = yield call(() => getPreSignedBlobData(data));
      yield put(actions.getDepartmentExportSuccess(data));
      const fileName = handleFileNameForExportFile(response);
      yield handleCreateLink(response, fileName);
    } catch (errorObj) {
      yield put(actions.getDepartmentExportFailure(errorObj));
      displayMessage('error', 'File export failed');
    }
  } catch (e) {
    yield put(actions.getDepartmentExportFailure());
    handleErrorResponse(e, {
      action: actions.getDepartmentExport,
      payload: params.payload
    });
  }
}

function* departmentsSaga(): Generator<any, void, unknown> {
  yield takeEvery(actions.getDepartmentsList.type, workGetDepartmentsList);
  yield takeEvery(
    actions.getDepartmentsFormValues.type,
    workGetDepartmentsFormValues
  );
  yield takeEvery(
    actions.postDepartmentsFormData.type,
    workPostDepartmentsFormData
  );
  yield takeEvery(
    actions.putDepartmentsFormData.type,
    workPutDepartmentsFormData
  );
  yield takeEvery(
    actions.changeDepartmentsStatus.type,
    workChangeDepartmentsStatus
  );
  yield takeEvery(
    actions.getDepartmentsDropdownValues.type,
    workGetDepartmentsDropdownValues
  );
  yield takeEvery(actions.getDepartmentExport.type, workGetDepartmentExport);
}

export default departmentsSaga;
