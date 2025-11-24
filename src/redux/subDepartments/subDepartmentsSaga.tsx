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
import { departmentsActions } from '@/redux/departments/DepartmentsState';
import { divisionsActions } from '@/redux/divisions/DivisionsState';
import { subDepartmentsActions as actions } from '@/redux/subDepartments/SubDepartmentsState';

import {
  getPreSignedBlobData,
  handleCreateLink,
  handleFileNameForExportFile
} from '@/utils/helper';

function* workGetSubDepartmentsList(
  params: any
): Generator<any, void, unknown> {
  try {
    let url: string = `sub-department/list?customer_id=${params.payload.value.cust_id}&page=${params.payload.value.page}&size=${params.payload.value.size}`;
    params.payload.value = omit(params.payload.value, [
      'cust_id',
      'page',
      'size',
      'pages',
      'total'
    ]);
    const data = yield call(() =>
      postPromise(url, params.payload.value, { isClient: true })
    );
    yield put(actions.getSubDepartmentsListSuccess(data));
  } catch (e) {
    yield put(actions.getSubDepartmentsListFailure());
    handleErrorResponse(e, {
      action: actions.getSubDepartmentsList,
      payload: params.payload
    });
  }
}

function* workGetSubDepartmentsFormValues(
  params: any
): Generator<any, void, unknown> {
  try {
    let url: string = `sub-department/?customer_id=${params.payload.cust_id}&sub_department_id=${params.payload.sub_department_id}`;
    const data = yield call(() => getPromise(url, { isClient: true }));
    yield put(divisionsActions.setDivisionsDropdownValues(data));
    yield put(departmentsActions.setDepartmentsDropdownValues(data));
    yield put(billingAddressActions.setBillingAddressDropdownValues(data));
    yield put(actions.getSubDepartmentsFormValuesSuccess(data));
  } catch (e) {
    yield put(actions.getSubDepartmentsFormValuesFailure());
    handleErrorResponse(e, {
      action: actions.getSubDepartmentsFormValues,
      payload: params.payload
    });
  }
}

function* workPostSubDepartmentsFormData(
  params: any
): Generator<any, void, unknown> {
  const { dispatch, data, filterData, clientId, paginationData } =
    params.payload;
  try {
    let url: string = 'sub-department';
    const response = yield call(() =>
      postPromise(url, data, { isClient: true })
    );
    handleGetTableData(
      dispatch,
      filterData,
      clientId,
      paginationData,
      'sub_departments'
    );
    yield put(actions.postSubDepartmentsFormDataSuccess(response));
    yield put(actions.setSubDepartmentModalVisibility());
    yield put(actions.clearSubDepartmentsFormData());
  } catch (e) {
    yield put(actions.postSubDepartmentsFormDataFailure());
    handleErrorResponse(e, {
      action: actions.postSubDepartmentsFormData,
      payload: params.payload
    });
  }
}

function* workPutSubDepartmentsFormData(
  params: any
): Generator<any, void, unknown> {
  const { dispatch, data, filterData, clientId, paginationData } =
    params.payload;
  try {
    let url: string = `sub-department/${data.sub_department_id}`;
    const response = yield call(() =>
      putPromise(url, data, { isClient: true })
    );
    handleGetTableData(
      dispatch,
      filterData,
      clientId,
      paginationData,
      'sub_departments'
    );
    yield put(actions.putSubDepartmentsFormDataSuccess(response));
    yield put(actions.setSubDepartmentModalVisibility());
  } catch (e) {
    yield put(actions.putSubDepartmentsFormDataFailure());
    handleErrorResponse(e, {
      action: actions.putSubDepartmentsFormData,
      payload: params.payload
    });
  }
}

function* workChangeSubDepartmentsStatus(
  params: any
): Generator<any, void, unknown> {
  const { page, size, clientId, filterData, sub_department_id, status } =
    params.payload;
  try {
    let url: string = `sub-department/${sub_department_id}/${status}`;
    const data = yield call(() => postPromise(url, {}, { isClient: true }));
    yield put(actions.changeSubDepartmentsStatusSuccess(data));
    yield put(
      actions.getSubDepartmentsList({
        value: {
          ...filterData,
          cust_id: clientId,
          page,
          size
        }
      })
    );
  } catch (e) {
    yield put(actions.changeSubDepartmentsStatusFailure());
    handleErrorResponse(e, {
      action: actions.changeSubDepartmentsStatus,
      payload: params.payload
    });
  }
}

function* workGetSubDepartmentsDropdownValues(
  params: any
): Generator<any, void, unknown> {
  try {
    const url = `sub-department/?customer_id=${
      params.payload.cust_id
    }&sub_department_name=${params.payload.searchValue}${
      params.payload.department_id
        ? `&department_id=${params.payload.department_id}`
        : ''
    }`;
    const data = yield call(() => getPromise(url, { isClient: true }));
    yield put(actions.getSubDepartmentsDropdownValuesSuccess(data));
  } catch (e) {
    yield put(actions.getSubDepartmentsDropdownValuesFailure());
    handleErrorResponse(e, {
      action: actions.getSubDepartmentsDropdownValues,
      payload: params.payload
    });
  }
}

function* workGetSubDepartmentExport(
  params: any
): Generator<any, void, unknown> {
  try {
    let url: string = `sub-department/export?cust_id=${params.payload.clientId}`;
    let filters = params.payload.filtersFormData;
    filters = omit(filters, ['cust_id', 'page', 'size']);
    const data = yield call(() =>
      postPromise(url, filters, { isClient: true })
    );
    try {
      const response = yield call(() => getPreSignedBlobData(data));
      yield put(actions.getSubDepartmentExportSuccess(data));
      const fileName = handleFileNameForExportFile(response);
      yield handleCreateLink(response, fileName);
    } catch (errorObj) {
      yield put(actions.getSubDepartmentExportFailure(errorObj));
      displayMessage('error', 'File export failed');
    }
  } catch (e) {
    yield put(actions.getSubDepartmentExportFailure());
    handleErrorResponse(e, {
      action: actions.getSubDepartmentExport,
      payload: params.payload
    });
  }
}

function* departmentsSaga(): Generator<any, void, unknown> {
  yield takeEvery(
    actions.getSubDepartmentsList.type,
    workGetSubDepartmentsList
  );
  yield takeEvery(
    actions.getSubDepartmentsFormValues.type,
    workGetSubDepartmentsFormValues
  );
  yield takeEvery(
    actions.postSubDepartmentsFormData.type,
    workPostSubDepartmentsFormData
  );
  yield takeEvery(
    actions.putSubDepartmentsFormData.type,
    workPutSubDepartmentsFormData
  );
  yield takeEvery(
    actions.changeSubDepartmentsStatus.type,
    workChangeSubDepartmentsStatus
  );
  yield takeEvery(
    actions.getSubDepartmentsDropdownValues.type,
    workGetSubDepartmentsDropdownValues
  );
  yield takeEvery(
    actions.getSubDepartmentExport.type,
    workGetSubDepartmentExport
  );
}

export default departmentsSaga;
