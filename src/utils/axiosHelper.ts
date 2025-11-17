import axios, { AxiosError, AxiosResponse } from 'axios';

import { getBaseUrl, getCookie } from './helper';

export const getHeadersToken = (withRefreshToken?: boolean): any => {
  let headers = {};
  if (getCookie('access_token_pkce')) {
    headers = {
      ...headers,
      'auth-id-token': getCookie('id_token_pkce'),
      'auth-access-token': getCookie('access_token_pkce')
    };
  }
  if (withRefreshToken && getCookie('refresh_token_pkce')) {
    headers = {
      ...headers,
      'auth-refresh-token': getCookie('refresh_token_pkce')
    };
  }
  return { headers: { ...headers } };
};

interface URLType {
  isAuth?: boolean;
  isTenant?: boolean;
  isClient?: boolean;
  isLinguist?: boolean;
  isWebApp?: boolean;
  isLinkedAPI?: boolean;
  isVRI?: boolean;
  isOps?: boolean;
  isIL?: boolean;
}

export const handleBaseURL = (
  url: string,
  {
    isAuth = false,
    isTenant = false,
    isClient = false,
    isLinguist = false,
    isWebApp = false,
    isLinkedAPI = false,
    isVRI = false,
    isOps = false,
    isIL = false
  }: URLType
) => {
  let baseUrl: string = url;
  let baseDomainUrl: string = getBaseUrl({
    isAuth,
    isTenant,
    isWebApp,
    isClient,
    isLinguist,
    isLinkedAPI,
    isVRI,
    isOps,
    isIL
  });

  if (isTenant || isWebApp) {
    baseUrl = `${baseDomainUrl}/${url}`;
  } else {
    baseUrl = `${baseDomainUrl}/api/${url}`;
  }
  console.log({ baseUrl, baseDomainUrl });
  return baseUrl;
};

export function getPromise(
  url: string,
  options: URLType = {},
  withCredentials: boolean = true
): AxiosResponse<any> | AxiosError<any> | Promise<any> {
  let config = {};
  if (withCredentials) {
    config = getHeadersToken();
  }
  return axios
    .get(handleBaseURL(url, options), config)
    .then((response) => response.data);
}

const headers = {
  'Content-type': 'application/json',
  Authorization: `${process.env.NEXT_PUBLIC_WEB_APP_TOKEN}`
};

export function getCitiesPromise(url: string) {
  return fetch(handleBaseURL(url, { isWebApp: true }), {
    method: 'GET',
    headers
  }).then((response) => response.json());
}

export function patchPromise(
  url: string,
  payload: any,
  options: URLType = {},
  withCredentials: boolean | undefined = true
): AxiosResponse<any> | AxiosError<any> | Promise<any> {
  let config = {};
  if (withCredentials) {
    config = getHeadersToken();
  }
  return axios
    .patch(handleBaseURL(url, options), payload, config)
    .then((response) => response.data);
}

export function postPromise(
  url: string,
  payload: any,
  options: URLType = {},
  withCredentials: boolean | undefined = true,
  withRefreshToken: boolean = false
): AxiosResponse<any> | AxiosError<any> | Promise<any> {
  let config = {};
  if (withCredentials) {
    config = getHeadersToken(withRefreshToken);
  }
  return axios
    .post(handleBaseURL(url, options), payload, config)
    .then((response) => response.data);
}

export function putPromise(
  url: string,
  payload: any,
  options: URLType = {},
  withCredentials: boolean | undefined = true
): AxiosResponse<any> | AxiosError<any> | Promise<any> {
  let config = {};
  if (withCredentials) {
    config = getHeadersToken();
  }
  return axios
    .put(handleBaseURL(url, options), payload, config)
    .then((response) => response.data);
}

export function deletePromise(
  url: string,
  options: URLType = {},
  withCredentials: boolean | undefined = true
): AxiosResponse<any> | AxiosError<any> | Promise<any> {
  let config = {};
  if (withCredentials) {
    config = getHeadersToken();
  }
  return axios
    .delete(handleBaseURL(url, options), config)
    .then((response) => response.data);
}
