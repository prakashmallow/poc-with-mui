/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, takeLatest } from 'redux-saga/effects';
import { omit } from 'lodash';

import { authActions as actions } from '@/redux/Auth/AuthState';
import {
  getPromise,
  handleErrorResponse,
  handleSetTokensInCookies,
  handleUnauthorized,
  postPromise,
  patchPromise,
  handleRouting,
  setTokensInCookie
} from '@/utils';
import { publicRoutes, unauthorizedRoutes } from '@/utils/constants';

function* onGetAuthorize(params: any): Generator<any, void, unknown> {
  try {
    const response: any = yield call(() =>
      getPromise(
        `v1/user/authorize?app_id=${process.env.NEXT_PUBLIC_AUTH_APP_ID}`,
        { isAuth: true }
      )
    );
    const callbackRoutePath = localStorage.getItem('callback_route_path');
    yield put(actions.getAutherizeSuccess(response?.data));
    localStorage.setItem('user_type', response?.data?.primary_user_type);
    localStorage.setItem('cont_login_email', response?.data?.email);
    if (response?.data?.primary_user_type === 'staff') {
      if (process.env.NEXT_PUBLIC_CLIENT_SERVICE_DISABLED !== 'true') {
        yield put(
          actions.getCSInitDetails({
            ...(params?.payload || {}),
            data: response?.data,
            callback_route_path: callbackRoutePath
          })
        );
      } else if (publicRoutes.includes(window.location.pathname)) {
        window.location.href = callbackRoutePath || '/staff/linguists';
        localStorage.removeItem('callback_route_path');
      }
    } else if (response?.data?.primary_user_type === 'linguist') {
      yield put(
        actions.getLinguistInitDetails({
          ...(params?.payload || {}),
          data: response?.data
        })
      );
    } else if (response?.data?.primary_user_type === 'client_user') {
      yield put(
        actions.getVRIUserMe({ ...(params?.payload || {}), ...response.data })
      );
    }
  } catch (error) {
    yield put(actions.getAutherizeFailure());
    if(
      unauthorizedRoutes.includes(window.location.pathname)
    ) {
      yield put(actions.setLoading(false));
    }
    const routingPath = localStorage.getItem('callback_route_path');
    if (!routingPath) {
      if (
        window.location.pathname.startsWith('/staff/linguists/reference/given-details')
      ) {
        localStorage.setItem('callback_route_path', window.location.href);
      }
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    handleErrorResponse(error, {
      action: actions.getAutherize,
      payload: params.payload
    });
  }
}

function* onGetTokens(params: any): Generator<any> {
  try {
    const { data, ...rest } = params?.payload;
    const response: any = yield call(() =>
      postPromise('v1/token', data, { isAuth: true })
    );
    yield put(actions.getTokensSuccess(response?.data));
    yield handleSetTokensInCookies(
      response?.data,
      process.env.NEXT_PUBLIC_ENVIRONMENT
    );
    yield put(actions.getAutherize({ ...rest }));
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    yield put(actions.getTokensFailure(error));
    window.location.href = '/';
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function* onGetRefreshToken(params: any): Generator<any, void, unknown> {
  try {
    const { callbackActionDetails } = params.payload;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response: any = yield call(() =>
      postPromise(
        'v1/refresh_access_token',
        {
          app_id: process.env.NEXT_PUBLIC_AUTH_APP_ID,
          email: localStorage.getItem('cont_login_email')
        },
        { isAuth: true },
        true,
        true
      )
    );
    yield handleSetTokensInCookies(
      response?.data,
      process.env.NEXT_PUBLIC_ENVIRONMENT
    );
    if (callbackActionDetails) {
      const { action, payload } = callbackActionDetails;
      yield put(action(payload));
    } else {
      yield put(actions.getRefreshTokenSuccess(response?.data));
    }
  } catch (error) {
    yield put(actions.getRefreshTokenFailure());
    handleUnauthorized();
    // @ts-ignore
    handleErrorResponse(error);
  }
}

function* onGetCSInitDetails(params: any): Generator<any, void, unknown> {
  try {
    const { isFromTokens, callback_route_path } = params.payload;
    const response: any = yield call(() =>
      getPromise('user/me', { isClient: true })
    );
    if (isFromTokens || publicRoutes.includes(window.location.pathname)) {
      window.location.href = callback_route_path || '/staff/clients';
      localStorage.removeItem('callback_route_path');
    } else {
      yield put(actions.getCSInitDetailsSuccess(response));
    }
  } catch (error) {
    yield put(actions.getCSInitDetailsFailure());
    // @ts-ignore
    handleErrorResponse(error, params);
  }
}

function* onGetLinguistInitDetails(params: any): Generator<any, void, unknown> {
  try {
    const { isFromTokens, router, searchParamsObject } = params.payload;
    const response: any = yield call(() => getPromise('v1/linguists/user_identity', { isLinguist: true }));
    const responseData = omit(
      {
        ...response.data,
        ...response.data.attributes,
        ...response.meta,
        primary_user_type: 'linguist'
      },
      ['attributes']
    );
    if (isFromTokens) {
      let path: any = `/linguist/${response?.data?.state === 'approved' ? 'profile' : 'onboarding'}/basic-information`;
      const routingPath = yield handleRouting(responseData, window.location.pathname, searchParamsObject);
      if (routingPath) {
        path = routingPath;
      }
      window.location.href = path;
    } else {
      // @ts-ignore
      const routingPath = yield handleRouting(
        responseData,
        window.location.pathname,
        searchParamsObject
      );
      if (routingPath) {
        router.push(routingPath);
      }
      yield put(actions.getLinguistInitDetailsSuccess(responseData));
      yield put(actions.getCredentials());
      // yield put(
      //   actions.getVRIUserMe({ ...(params?.payload || {}), ...responseData })
      // );
      // const { accountsActions } = require('@/redux/accounts/AccountsState');
      // yield put(
      //   accountsActions?.setLinguistOnboardingProfileDetails({ data: responseData })
      // );
      // if (responseData?.is_first_approved) {
      //   yield put(accountsActions?.setWelcomeModalVisibility());
      // }
    }
  } catch (error) {
    yield put(actions.getLinguistInitDetailsFailure());
    // @ts-ignore
    handleErrorResponse(error, params);
  }
}

export function* onLinguistSetPassword(
  params?: any
): Generator<any, void, unknown> {
  try {
    const {
      payload: { data: payload }
    } = params;
    const response: any = yield call(() =>
      patchPromise('v1/set_password', payload, { isAuth: true }, false)
    );
    let responseData = {
      ...response.data,
      ...response.data?.attributes,
      ...response.data?.attributes.cognito_fields
    };
    responseData = omit(responseData, ['attributes', 'cognito_fields']);
    yield put(actions.updateLinguistPasswordSuccess(responseData));
    setTokensInCookie(responseData);
    yield put(actions.getLinguistInitDetailsSuccess(responseData));
    window.location.href = '/linguist/onboarding/basic-information';
  } catch (error) {
    yield put(actions.updateLinguistPasswordFailure());
    // @ts-ignore
    handleErrorResponse(error);
  }
}

export function* onGetCommonPasswords(): Generator<any, void> {
  try {
    const response = yield call(() =>
      getPromise('v1/common_passwords', { isAuth: true }, false)
    );
    yield put(actions.getCommonPasswordsSuccess(response.data));
  } catch (error) {
    yield put(actions.getCommonPasswordsFailure());
    // @ts-ignore
    handleErrorResponse(error);
  }
}

function* onGetCredentials(): Generator<any, void> {
  try {
    const response = yield call(() =>
      getPromise('v1/staffs/linguists/credentials', { isLinguist: true })
    );
    yield put(actions.getCredentialsSuccess(response?.data));
  } catch (error: any) {
    handleErrorResponse(error);
  }
}

export function* onGetVRIUserMe(
  params: Record<any, any> = {}
): Generator<any, void, any | unknown> {
  try {
    const response = yield call(() => getPromise('user/me', { isVRI: true }));
    yield put(
      actions.getVRIUserMeSuccess({
        ...(params.payload || {}),
        ...response
      })
    );
    if (
      params.payload?.primary_user_type === 'client_user' &&
      !window.location.pathname.startsWith('/interpreter-view')
    ) {
      if (params.payload.router) {
        params.payload.router?.push('/interpreter-view');
      } else {
        window.location.href = '/interpreter-view';
      }
    }
  } catch (error) {
    yield put(actions.getVRIUserMeFailure());
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    handleErrorResponse(error, params);
  }
}

export default function* authSaga(): Generator<any, void, unknown> {
  yield takeLatest(actions.getAutherize.type, onGetAuthorize);
  yield takeLatest(actions.getTokens.type, onGetTokens);
  yield takeLatest(actions.getRefreshToken.type, onGetRefreshToken);
  yield takeLatest(actions.getCSInitDetails.type, onGetCSInitDetails);
  yield takeLatest(
    actions.getLinguistInitDetails.type,
    onGetLinguistInitDetails
  );
  yield takeLatest(actions.updateLinguistPassword.type, onLinguistSetPassword);
  yield takeLatest(actions.getCommonPasswords.type, onGetCommonPasswords);
  yield takeLatest(actions.getCredentials.type, onGetCredentials);
  yield takeLatest(actions.getVRIUserMe.type, onGetVRIUserMe);
}
