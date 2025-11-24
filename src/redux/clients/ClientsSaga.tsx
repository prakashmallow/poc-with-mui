import {
  all,
  call,
  put,
  takeEvery,
  takeLatest
} from '@redux-saga/core/effects';
// import { omit } from 'lodash';

// import { getEntityRouteName } from '@/components/client/helper';
// import { handlePageRouting } from '@/components/shared/CustomTable/helper';
import {
  // displayMessage,
  getPromise,
  handleErrorResponse,
  patchPromise,
  postPromise,
  putPromise
} from '@/utils';

import { clientsActions as actions } from '@/redux/clients/ClientsState';

// import {
//   getPreSignedBlobData,
//   handleCreateLink,
//   handleFileNameForExportFile,
//   postS3UploadPromise
// } from '@/utils/helper';

// import { clientsPagePath } from '@/utils/constants';

function* onGetClients(params: any): Generator<any, void, unknown> {
  try {
    const { page = 1, size = 25, value } = params?.payload;
    const response: any | undefined = yield call(() =>
      postPromise(`clients?page=${page}&size=${size}`, value, {
        isClient: true
      })
    );
    yield put(actions.getClientsSuccess(response));
  } catch (error) {
    yield put(actions.getClientsFailure());
    handleErrorResponse(error, {
      action: actions.getClients,
      payload: params.payload
    });
  }
}

function* onGetClient(params: any): Generator<any, void, unknown> {
  try {
    const { id, isFromOtherSection } = params?.payload;
    const response: any | undefined = yield call(() =>
      getPromise(`clients/${id}`, { isClient: true })
    );
    if (!isFromOtherSection) {
      yield put(actions.setProviderSalesManagerDropdownValues(response));
      yield put(actions.setProviderAccountManagerDropdownValues(response));
      yield put(actions.setCountryDropdownValues(response));
    }
    yield put(actions.getClientSuccess(response));
  } catch (error) {
    yield put(actions.getClientFailure(error));
    handleErrorResponse(error, {
      action: actions.getClient,
      payload: params.payload
    });
  }
}

function* onGetCountryDropdownValues(
  params: any
): Generator<any, void, unknown> {
  try {
    let url = `clients/profile_data?country=${params.payload.name}`;
    const data = yield call(() => getPromise(url, { isClient: true }));
    yield put(actions.getCountryDropdownValuesSuccess(data));
  } catch (e) {
    yield put(actions.getCountryDropdownValuesFailure());
    handleErrorResponse(e, {
      action: actions.getCountryDropdownValues,
      payload: params.payload
    });
  }
}

function* onGetClientDropdownValues(): Generator<any, void, unknown> {
  try {
    let url = 'clients/profile_data';
    const data = yield call(() => getPromise(url, { isClient: true }));
    yield put(actions.getClientDropdownValuesSuccess(data));
  } catch (e) {
    handleErrorResponse(e, { action: actions.getClientDropdownValues });
  }
}

function* onGetProviderAccountManagerDropdownValues(
  params: any
): Generator<any, void, unknown> {
  try {
    let url = `clients/profile_data?manager_name=${params.payload.name}`;
    const data = yield call(() => getPromise(url, { isClient: true }));
    yield put(actions.getProviderAccountManagerDropdownValuesSuccess(data));
  } catch (e) {
    yield put(actions.getProviderAccountManagerDropdownValuesFailure());
    handleErrorResponse(e, {
      action: actions.getProviderAccountManagerDropdownValues,
      payload: params.payload
    });
  }
}

function* onGetProviderSalesManagerDropdownValues(
  params: any
): Generator<any, void, unknown> {
  try {
    let url = `clients/profile_data?manager_name=${params.payload.name}`;
    const data = yield call(() => getPromise(url, { isClient: true }));
    yield put(actions.getProviderSalesManagerDropdownValuesSuccess(data));
  } catch (e) {
    yield put(actions.getProviderSalesManagerDropdownValuesFailure());
    handleErrorResponse(e, {
      action: actions.getProviderSalesManagerDropdownValues,
      payload: params.payload
    });
  }
}

function* onAddNewClient(params: any): Generator<any, void, unknown> {
  try {
    let url = 'clients/create';
    const data = yield call(() =>
      postPromise(url, params.payload.formData, { isClient: true })
    );
    yield put(actions.addNewClientSuccess(data));
    window.location.href = '/staff/clients';
  } catch (e) {
    yield put(actions.addNewClientFailure());
    handleErrorResponse(e, {
      action: actions.addNewClient,
      payload: params.payload
    });
  }
}

// function* onClientDuplicate(params: any): Generator<any, void, unknown> {
//   const { value, filterData, paginationData } = params.payload;
//   try {
//     let url = 'clients/duplicate';
//     const data = yield call(() => postPromise(url, value, { isClient: true }));
//     yield put(actions.clientDuplicateSuccess());
//     // displayMessage('success', data);
//     yield put(actions.getClients({ ...paginationData, value: filterData }));
//   } catch (error) {
//     yield put(actions.clientDuplicateFailure(error));
//     if (error?.response?.status === 422) {
//       // displayMessage('error', error?.response?.data?.detail, 10);
//       window.location.href = `${clientsPagePath.basePath}/${value.customer_id}`;
//       yield put(actions.setDuplicateModalVisibility());
//     } else {
//       handleErrorResponse(error, {
//         action: actions.clientDuplicate,
//         payload: params.payload
//       });
//     }
//   }
// }

function* onUpdateClient(params: any): Generator<any, void, unknown> {
  try {
    let url = `clients/${params.payload.clientId}`;
    const data = yield call(() =>
      putPromise(url, params.payload.formData, { isClient: true })
    );
    yield put(
      actions.updateClientSuccess({ data, formData: params.payload.formData })
    );
  } catch (e) {
    yield put(actions.updateClientFailure());
    handleErrorResponse(e, {
      action: actions.updateClient,
      payload: params.payload
    });
  }
}

// function* onGetSampleExcelFile(params: any): Generator<any, void, unknown> {
//   try {
//     let url = `signed-url/sample/${params.payload.entity}`;
//     const data: any = yield call(() => getPromise(url, { isClient: true }));
//     try {
//       const response = yield call(() => getPreSignedBlobData(data));
//       yield put(actions.getSampleExcelFileSuccess(data));
//       const fileName = `${params.payload.entity}_sample.xlsx`;
//       yield handleCreateLink(response, fileName);
//     } catch (error) {
//       yield put(actions.getSampleExcelFileFailure(error));
//       // displayMessage('error', 'File export failed');
//     }
//   } catch (e) {
//     yield put(actions.getSampleExcelFileFailure());
//     handleErrorResponse(e, {
//       action: actions.getSampleExcelFile,
//       payload: params.payload
//     });
//   }
// }

// function* s3UploadFile(params: any): Generator<any, void, unknown> {
//   try {
//     yield call(() =>
//       postS3UploadPromise(
//         params.payload.url,
//         params.payload.clientPresignedPostDetailsFormData
//       )
//     );
//     yield put(actions.s3UploadSuccess());
//     yield put(
//       actions.s3UploadAcknowledgment({
//         clientPresignedFileHistoryId:
//           params.payload.clientPresignedFileHistoryId,
//         entity: params.payload.entity,
//         router: params.payload.router,
//         clientId: params.payload.clientId
//       })
//     );
//     // displayMessage(
//       'success',
//       `${params.payload.fileName} file uploaded successfully.`
//     );
//   } catch (e) {
//     yield put(actions.s3UploadFailure());
//     handleErrorResponse(e);
//     // displayMessage('error', `${params.payload.fileName} file upload failed.`);
//   }
// }

// function* uploadS3Acknowledgment(params: any): Generator<any, void, unknown> {
//   const { router, entity, clientPresignedFileHistoryId, clientId } =
//     params.payload;
//   try {
//     const url = `${entity}/import/${clientPresignedFileHistoryId}${
//       entity === 'client' ? '' : `?cust_id=${clientId}`
//     }`;
//     const data = yield call(() => postPromise(url, {}, { isClient: true }));
//     // displayMessage('success', data);
//     if (entity === 'clients') {
//       router.push('/staff/clients/import-history');
//     } else {
//       handlePageRouting(
//         getEntityRouteName(entity),
//         clientId,
//         router,
//         'import-history'
//       );
//     }
//     yield put(actions.s3UploadAcknowledgmentSuccess());
//   } catch (e) {
//     yield put(actions.s3UploadAcknowledgmentFailure(e));
//     handleErrorResponse(e, {
//       action: actions.s3UploadAcknowledgment,
//       payload: params.payload
//     });
//   }
// }

function* onGetClientPresignedPost(params: any): Generator<any, void, unknown> {
  try {
    let url = `${params.payload.entity}/presigned-post?filename=${params.payload.fileName}`;
    const data: any = yield call(() => getPromise(url, { isClient: true }));
    const formData = new FormData();
    Object.keys(data?.pre_signed_url.fields).forEach((key) => {
      formData.append(key, data?.pre_signed_url.fields[key]);
    });
    formData.append('file', params.payload.file);
    yield put(actions.getClientPresignedPostSuccess());
    yield put(
      actions.s3Upload({
        url: data?.pre_signed_url.url,
        clientPresignedPostDetailsFormData: formData,
        clientPresignedFileHistoryId: data?.file_history_id,
        ...params.payload
      })
    );
  } catch (e) {
    yield put(actions.getClientPresignedPostFailure());
    handleErrorResponse(e, {
      action: actions.getClientPresignedPost,
      payload: params.payload
    });
  }
}

function* onGetClientFileHistory(params: any): Generator<any, void, unknown> {
  try {
    let url = `filehistory?page=${params.payload.page}&entity=${params.payload.entity}&size=${params.payload.size}`;
    const data = yield call(() => getPromise(url, { isClient: true }));
    yield put(actions.getClientFileHistorySuccess(data));
  } catch (e) {
    yield put(actions.getClientFileHistoryFailure());
    handleErrorResponse(e, {
      action: actions.getClientFileHistory,
      payload: params.payload
    });
  }
}

// function* onGetFileHistoryPresignedURL(
//   params: any
// ): Generator<any, void, unknown> {
//   try {
//     let url = `signed-url/${params.payload.entity}?file_secret=${params.payload.fileSecret}`;
//     const data = yield call(() => getPromise(url, { isClient: true }));
//     try {
//       const response = yield call(() => getPreSignedBlobData(data));
//       yield put(actions.getFileHistoryPresignedURLSuccess(data));
//       const fileName = params.payload.fileName;
//       yield handleCreateLink(response, fileName);
//     } catch (error) {
//       yield put(actions.getFileHistoryPresignedURLFailure(error));
//       // displayMessage('error', 'File export failed');
//     }
//   } catch (e) {
//     yield put(actions.getFileHistoryPresignedURLFailure());
//     handleErrorResponse(e, {
//       actions: actions.getFileHistoryPresignedURL,
//       payload: params.payload
//     });
//   }
// }

// function* onExportClientsData(params: any): Generator<any, void, unknown> {
//   const { filtersFormData } = params.payload;
//   try {
//     let url = 'clients/export';
//     let filters = filtersFormData;
//     filters = omit(filters, ['page', 'size']);
//     const data: any = yield call(() =>
//       postPromise(url, filters, { isClient: true })
//     );
//     try {
//       const response = yield call(() => getPreSignedBlobData(data));
//       yield put(actions.exportClientsDataSuccess(data));
//       const fileName = handleFileNameForExportFile(response);
//       yield handleCreateLink(response, fileName);
//     } catch (error) {
//       yield put(actions.exportClientsDataFailure(error));
//       // displayMessage('error', 'File export failed');
//     }
//   } catch (e) {
//     yield put(actions.exportClientsDataFailure());
//     handleErrorResponse(e, {
//       action: actions.exportClientsData,
//       payload: params.payload
//     });
//   }
// }

function* onGetClientSessionLogoutData(
  params: any
): Generator<any, void, unknown> {
  const { clientId } = params.payload;
  try {
    let url: string = 'configurations/session_logout_defaults';
    const data = yield call(() => getPromise(url, { isClient: true }));
    yield put(actions.getClientSessionLogoutDataSuccess(data));
    yield put(actions.getClientConfigurationsDetails({ clientId }));
  } catch (error) {
    handleErrorResponse(error, {
      action: actions.getClientSessionLogoutData,
      payload: params.payload
    });
  }
}

function* onGetClientConfigurationsDetails(
  params: any
): Generator<any, void, unknown> {
  const { clientId } = params.payload;
  try {
    let url: string = `configurations?customer_id=${clientId}`;
    const data = yield call(() => getPromise(url, { isClient: true }));
    yield put(actions.getClientConfigurationsDetailsSuccess(data));
  } catch (error) {
    yield put(actions.getClientConfigurationsDetailsFailure());
    handleErrorResponse(error, {
      action: actions.getClientConfigurationsDetails,
      payload: params.payload
    });
  }
}

function* onUpdateClientConfigurationsDetails(
  params: any
): Generator<any, void, unknown> {
  const { clientId, payload } = params.payload;
  try {
    let url: string = `configurations/${clientId}`;
    const data = yield call(() =>
      patchPromise(url, payload, { isClient: true })
    );
    yield put(actions.updateClientConfigurationsDetailsSuccess(data));
  } catch (error) {
    yield put(actions.updateClientConfigurationsDetailsFailure());
    handleErrorResponse(error, {
      action: actions.updateClientConfigurationsDetails,
      payload: params.payload
    });
  }
}

export default function* clientsSaga(): Generator<any, void, unknown> {
  yield all([
    takeLatest(actions.getClients.type, onGetClients),
    takeEvery(actions.getClient.type, onGetClient),
    takeLatest(
      actions.getCountryDropdownValues.type,
      onGetCountryDropdownValues
    ),
    takeLatest(actions.getClientDropdownValues.type, onGetClientDropdownValues),
    takeLatest(
      actions.getProviderAccountManagerDropdownValues.type,
      onGetProviderAccountManagerDropdownValues
    ),
    takeLatest(
      actions.getProviderSalesManagerDropdownValues.type,
      onGetProviderSalesManagerDropdownValues
    ),
    takeLatest(actions.addNewClient.type, onAddNewClient),
    // takeLatest(actions.clientDuplicate.type, onClientDuplicate),
    takeLatest(actions.updateClient.type, onUpdateClient),
    // takeLatest(actions.getSampleExcelFile.type, onGetSampleExcelFile),
    takeLatest(actions.getClientPresignedPost.type, onGetClientPresignedPost),
    // takeLatest(actions.s3Upload.type, s3UploadFile),
    // takeLatest(actions.s3UploadAcknowledgment.type, uploadS3Acknowledgment),
    takeLatest(actions.getClientFileHistory.type, onGetClientFileHistory),
    // takeLatest(
    //   actions.getFileHistoryPresignedURL.type,
    //   onGetFileHistoryPresignedURL
    // ),
    // takeLatest(actions.exportClientsData.type, onExportClientsData),
    takeLatest(
      actions.getClientSessionLogoutData.type,
      onGetClientSessionLogoutData
    ),
    takeLatest(
      actions.getClientConfigurationsDetails.type,
      onGetClientConfigurationsDetails
    ),
    takeLatest(
      actions.updateClientConfigurationsDetails.type,
      onUpdateClientConfigurationsDetails
    )
  ]);
}
