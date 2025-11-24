import { call, put, takeEvery } from '@redux-saga/core/effects';

import {
  deletePromise,
  // displayMessage,
  getPromise,
  handleErrorResponse,
  patchPromise,
  postPromise,
  putPromise
} from '@/utils';

import { appointmentTypesActions as actions } from '@/redux/appointmentTypes/AppointmentTypesState';

function* onGetLevels(params: any): Generator<any, void, unknown> {
  const {
    qualifications,
    security_clearance,
    isFromAppointmentTypes,
    clientId
  } = params.payload;
  try {
    let url = `api/levels?security_clearance=${security_clearance}&qualification=${qualifications}`;
    const response = yield call(() => getPromise(url, { isWebApp: true }));
    // @ts-ignore
    yield put(actions.getLevelsSuccess({ ...response }));
    if (isFromAppointmentTypes) {
      yield put(
        actions.getAppointmentTypesList({ clientId, ...{ page: 1, size: 25 } })
      );
    }
  } catch (error) {
    yield put(actions.getLevelsFailure());
    handleErrorResponse(error);
  }
}

function* onGetAppointmentTypesList(
  params: any
): Generator<any, void, unknown> {
  const { clientId, page, size } = params.payload;
  try {
    let url = `appointment-types/list?customer_id=${clientId}&page=${page}&size=${size}`;
    const response = yield call(() => getPromise(url, { isClient: true }));
    yield put(actions.getAppointmentTypesListSuccess(response));
  } catch (error) {
    yield put(actions.getAppointmentTypesListFailure());
    handleErrorResponse(error);
  }
}

function* onCreateAppointmentTypes(params: any): Generator<any, void, unknown> {
  const { appointmentTypesDetails, page, size } = params.payload;
  try {
    let url = 'appointment-types';
    const response = yield call(() =>
      postPromise(url, appointmentTypesDetails, { isClient: true })
    );
    yield put(actions.createAppointmentTypesSuccess());
    yield put(actions.setAppointmentTypesModalVisibility());
    // displayMessage('success', response);
    yield put(
      actions.getAppointmentTypesList({
        page,
        size,
        clientId: appointmentTypesDetails?.customer_id
      })
    );
  } catch (error) {
    yield put(actions.createAppointmentTypesFailure());
    handleErrorResponse(error);
  }
}

function* onUpdateAppointmentTypes(params: any): Generator<any, void, unknown> {
  const { appointmentTypeId, appointmentTypesDetails, page, size, clientId } =
    params.payload;
  try {
    let url = `appointment-types/${appointmentTypeId}`;
    const response = yield call(() =>
      patchPromise(url, appointmentTypesDetails, { isClient: true })
    );
    yield put(actions.updateAppointmentTypesSuccess());
    yield put(actions.setAppointmentTypesModalVisibility());
    // displayMessage('success', response);
    yield put(actions.getAppointmentTypesList({ page, size, clientId }));
  } catch (error) {
    yield put(actions.updateAppointmentTypesFailure());
    handleErrorResponse(error);
  }
}

function* onUpdateAppointmentTypesStatus(
  params: any
): Generator<any, void, unknown> {
  const { status, appointmentTypeId, clientId, page, size } = params.payload;
  try {
    let url = `appointment-types/${appointmentTypeId}/${status}`;
    const response = yield call(() =>
      putPromise(url, undefined, { isClient: true })
    );
    // displayMessage('success', response);
    yield put(actions.updateAppointmentTypesStatusSuccess());
    yield put(actions.getAppointmentTypesList({ page, size, clientId }));
  } catch (error) {
    yield put(actions.updateAppointmentTypesStatusFailure());
    handleErrorResponse(error);
  }
}

function* onGetAppointmentTypesDetails(
  params: any
): Generator<any, void, unknown> {
  const { appointmentTypeId } = params.payload;
  try {
    let url = `appointment-types/${appointmentTypeId}`;
    const response = yield call(() => getPromise(url, { isClient: true }));
    yield put(actions.getAppointmentTypesEditDataSuccess(response));
  } catch (error) {
    yield put(actions.getAppointmentTypesEditDataFailure());
    handleErrorResponse(error);
  }
}

function* onGetDeletedAppointmentTypesList(
  params: any
): Generator<any, void, unknown> {
  const { clientId, isFromEdit, appointmentTypeId } = params.payload;
  try {
    let url = `appointment-types/deleted?customer_id=${clientId}`;
    const response = yield call(() => getPromise(url, { isClient: true }));
    yield put(
      actions.getDeletedAppointmentTypesListSuccess({ response, isFromEdit })
    );
    if (isFromEdit) {
      yield put(actions.getAppointmentTypesEditData({ appointmentTypeId }));
    }
  } catch (error) {
    yield put(actions.getDeletedAppointmentTypesListFailure());
    handleErrorResponse(error);
  }
}

function* onGetBookingsDetails(params: any): Generator<any, void> {
  const { uuid } = params.payload;
  try {
    let url = `api/bookings_count?appointment_type_uuid=${uuid}`;
    const response = yield call(() => getPromise(url, { isWebApp: true }));
    yield put(actions.getBookingsDetailsSuccess(response.data));
    if (response?.data?.bookings_count !== 0) {
      yield put(actions.setInfoModalVisibility());
    } else {
      yield put(actions.setDeleteModalVisibility());
    }
  } catch (error) {
    yield put(actions.getBookingsDetailsFailure());
    handleErrorResponse(error);
  }
}

function* onDeleteAppointmentTypes(params: any): Generator<any, void, unknown> {
  const { appointmentTypeId, clientId, page, size } = params.payload;
  try {
    let url = `appointment-types/${appointmentTypeId}`;
    const response = yield call(() => deletePromise(url, { isClient: true }));
    // displayMessage('success', response);
    yield put(actions.getAppointmentTypesList({ clientId, page, size }));
    yield put(actions.deleteAppointmentTypesSuccess());
    yield put(actions.setDeleteModalVisibility());
  } catch (error) {
    yield put(actions.deleteAppointmentTypesFailure());
    handleErrorResponse(error);
  }
}

function* appointmentTypesSaga(): Generator<any, void, unknown> {
  yield takeEvery(actions.getLevels.type, onGetLevels);
  yield takeEvery(
    actions.getAppointmentTypesList.type,
    onGetAppointmentTypesList
  );
  yield takeEvery(
    actions.createAppointmentTypes.type,
    onCreateAppointmentTypes
  );
  yield takeEvery(
    actions.updateAppointmentTypes.type,
    onUpdateAppointmentTypes
  );
  yield takeEvery(
    actions.updateAppointmentTypesStatus.type,
    onUpdateAppointmentTypesStatus
  );
  yield takeEvery(
    actions.getAppointmentTypesEditData.type,
    onGetAppointmentTypesDetails
  );
  yield takeEvery(
    actions.getDeletedAppointmentTypesList.type,
    onGetDeletedAppointmentTypesList
  );
  yield takeEvery(actions.getBookingsDetails.type, onGetBookingsDetails);
  yield takeEvery(
    actions.deleteAppointmentTypes.type,
    onDeleteAppointmentTypes
  );
}

export default appointmentTypesSaga;
