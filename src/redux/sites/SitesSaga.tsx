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

import { clientsActions } from '@/redux/clients/ClientsState';
import { departmentsActions } from '@/redux/departments/DepartmentsState';
import { divisionsActions } from '@/redux/divisions/DivisionsState';
import { sitesActions as actions } from '@/redux/sites/SitesState';
import { subDepartmentsActions } from '@/redux/subDepartments/SubDepartmentsState';

import {
  getPreSignedBlobData,
  handleCreateLink,
  handleFileNameForExportFile
} from '@/utils/helper';

function* workGetSiteDropdownValues(): Generator<any, void, unknown> {
  try {
    let url = 'site';
    const data = yield call(() => getPromise(url, { isClient: true }));
    yield put(actions.getSiteDropdownValuesSuccess(data));
  } catch (e) {
    yield put(actions.getSiteDropdownValuesFailure());
    handleErrorResponse(e, { action: actions.getSiteDropdownValues });
  }
}

function* workAddNewSite(params: any): Generator<any, void, unknown> {
  const { dispatch, data, clientId, filterData, paginationData } =
    params.payload;
  try {
    let url = 'site';
    const response = yield call(() =>
      postPromise(url, data, { isClient: true })
    );
    yield put(actions.addNewSiteSuccess(response));
    handleGetTableData(dispatch, filterData, clientId, paginationData, 'sites');
    yield put(actions.setSitesModalVisibility());
  } catch (e) {
    yield put(actions.addNewSiteFailure());
    handleErrorResponse(e, {
      action: actions.addNewSite,
      payload: params.payload
    });
  }
}

function* workGetSitesList(params: any): Generator<any, void, unknown> {
  try {
    let url = `site/list?page=${params.payload.value.page}&cust_id=${params.payload.value.cust_id}&size=${params.payload.value.size}`;
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
    yield put(actions.getSitesListSuccess(data));
  } catch (e) {
    yield put(actions.getSitesListFailure());
    handleErrorResponse(e, {
      action: actions.getSitesList,
      payload: params.payload
    });
  }
}

function* workGetSiteFormDetails(params: any): Generator<any, void, unknown> {
  try {
    let url = `site/${params.payload.site_id}`;
    const data = yield call(() => getPromise(url, { isClient: true }));
    yield put(divisionsActions.setDivisionsDropdownValues(data));
    yield put(departmentsActions.setDepartmentsDropdownValues(data));
    yield put(subDepartmentsActions.setSubDepartmentDropdownValues(data));
    yield put(clientsActions.setCountryDropdownValues(data));
    yield put(actions.getSiteFormDetailsSuccess(data));
  } catch (e) {
    yield put(actions.getSiteFormDetailsFailure());
    handleErrorResponse(e, {
      action: actions.getSiteFormDetails,
      payload: params.payload
    });
  }
}

function* workGetSitesPreSelectedLanguages(): Generator<any, void, unknown> {
  try {
    let url = 'site/languages';
    const data = yield call(() => getPromise(url, { isClient: true }));
    yield put(actions.getSitesPreSelectedLanguagesSuccess(data));
  } catch (e) {
    yield put(actions.getSitesPreSelectedLanguagesFailure());
    handleErrorResponse(e, { action: actions.getSitesPreSelectedLanguages });
  }
}

function* workChangeSitesStatus(params: any): Generator<any, void, unknown> {
  const { site_id, status, page, size, clientId, filterData } = params.payload;
  try {
    let url = `site/${site_id}/${status}`;
    const data = yield call(() => postPromise(url, {}, { isClient: true }));
    yield put(actions.changeSitesStatusSuccess(data));
    yield put(
      actions.getSitesList({
        value: {
          ...filterData,
          page,
          cust_id: clientId,
          size
        }
      })
    );
  } catch (e) {
    yield put(actions.changeSitesStatusFailure());
    handleErrorResponse(e, {
      action: actions.changeSitesStatus,
      payload: params.payload
    });
  }
}

function* workUpdateSite(params: any): Generator<any, void, unknown> {
  const { dispatch, data, filterData, clientId, paginationData } =
    params.payload;
  try {
    let url = `site/${data.site_id}`;
    const response = yield call(() =>
      putPromise(url, data, { isClient: true })
    );
    handleGetTableData(dispatch, filterData, clientId, paginationData, 'sites');
    yield put(actions.updateSiteSuccess(response));
    yield put(actions.setSitesModalVisibility());
  } catch (e) {
    yield put(actions.updateSiteFailure());
    handleErrorResponse(e, {
      action: actions.updateSite,
      payload: params.payload
    });
  }
}

function* workGetSitesExport(params: any): Generator<any, void, unknown> {
  try {
    let url = `site/export?cust_id=${params.payload.clientId}`;
    let filters = params.payload.filtersFormData;
    filters = omit(filters, ['page', 'cust_id', 'size']);
    const data = yield call(() =>
      postPromise(url, filters, { isClient: true })
    );
    try {
      const response = yield call(() => getPreSignedBlobData(data));
      yield put(actions.getSitesExportSuccess(data));
      const fileName = handleFileNameForExportFile(response);
      yield handleCreateLink(response, fileName);
    } catch (error) {
      yield put(actions.getSitesExportFailure(error));
      displayMessage('error', 'File export failed');
    }
  } catch (e) {
    yield put(actions.getSitesExportFailure());
    handleErrorResponse(e, {
      action: actions.getSitesExport,
      payload: params.payload
    });
  }
}

function* workGetSitesGenerateCode(params: any): Generator<any, void, unknown> {
  try {
    let url = `site/generate-code?code_length=${params.payload.code_length}`;
    const data = yield call(() => getPromise(url, { isClient: true }));
    yield put(actions.getSitesGenerateCodeSuccess(data));
  } catch (e) {
    yield put(actions.getSitesGenerateCodeFailure());
    handleErrorResponse(e, { action: actions.getSitesGenerateCode });
  }
}

function* sitesSaga(): Generator<any, void, unknown> {
  yield takeEvery(actions.getSitesList.type, workGetSitesList);
  yield takeEvery(
    actions.getSiteDropdownValues.type,
    workGetSiteDropdownValues
  );
  yield takeEvery(actions.addNewSite.type, workAddNewSite);
  yield takeEvery(actions.updateSite.type, workUpdateSite);
  yield takeEvery(actions.getSiteFormDetails.type, workGetSiteFormDetails);
  yield takeEvery(
    actions.getSitesPreSelectedLanguages.type,
    workGetSitesPreSelectedLanguages
  );
  yield takeEvery(actions.changeSitesStatus.type, workChangeSitesStatus);
  yield takeEvery(actions.getSitesExport.type, workGetSitesExport);
  yield takeEvery(actions.getSitesGenerateCode.type, workGetSitesGenerateCode);
}

export default sitesSaga;
