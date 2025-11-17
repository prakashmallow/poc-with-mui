// import { message, Skeleton, Select, Spin, notification } from 'antd';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';
// import Image from 'next/image';
import { NextRouter } from 'next/router';

// import LoadingComponent from '@/components/shared/LoadingComponent';
import { authActions as actions } from '@/redux/Auth/AuthState';
import { modalActions } from '@/redux/Modals/ModalsState';
import {
  basePathNames,
  dropDownSearchPlaceHolder,
  linguistPermissionSlugs,
  publicRoutes,
  tokens
} from '@/utils/constants';
import { UserDetails } from '@/utils/types';
import { CircularProgress } from '@mui/material';

interface CookiesData {
  access_token: string;
  id_token: string;
  refresh_token: string | undefined;
  expires_in: number | undefined;
}

export const getStore = async () =>
  (await import('@/redux/store')).default;

export function getBaseDomain() {
  const hostname = window.location.hostname;
  const parts = hostname.split('.');

  // Handle cases like 'localhost' or IP addresses
  if (
    parts.length <= 2 &&
    !hostname.includes('localhost') &&
    !/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(hostname)
  ) {
    return hostname; // Already a base domain or an IP
  }

  // Handle common TLDs (e.g., .com, .org) and country code TLDs (e.g., .co.uk)
  // This is a simplified approach and might not cover all edge cases with complex TLDs.
  if (
    parts.length > 2 &&
    (parts[parts.length - 2].length === 2 ||
      parts[parts.length - 1].length === 2)
  ) {
    // Likely a country code TLD like example.co.uk
    return parts.slice(-3).join('.');
  } else {
    // Standard TLD like example.com
    return parts.slice(-2).join('.');
  }
}

export const getBaseUrl = ({
  isAuth = false,
  isTenant = false,
  isWebApp = false,
  isClient = false,
  isLinguist = false,
  isLinkedAPI = false,
  isVRI = false,
  isOps = false,
  isIL = false
}: {
  isAuth?: boolean;
  isTenant?: boolean;
  isWebApp?: boolean;
  isClient?: boolean;
  isLinguist?: boolean;
  isLinkedAPI?: boolean;
  isVRI?: boolean;
  isOps?: boolean;
  isIL?: boolean;
}): string => {
  let subDomain: string = '';
  let baseDomain: string = getBaseDomain();
  const environment: string = process.env.NEXT_PUBLIC_ENVIRONMENT || 'local';
  if (baseDomain === 'localhost') {
    baseDomain = 'dals.co.uk';
  }

  if (['local', 'pre-staging'].includes(environment)) {
    subDomain = 'prestaging';
  } else if (environment === 'staging') {
    subDomain = environment;
  } else if (environment === 'translit-staging') {
    subDomain = 'link-ie-stage-';
  }

  const subDomainSeparator: string = environment === 'translit-staging' ? '' : '.';

  if (isAuth) {
    return `https://${subDomain ? `${subDomain}${subDomainSeparator}` : ''}auth.${baseDomain}`;
  } else if (isWebApp) {
    if (environment === 'translit-staging') {
      return `https://${subDomain ? `${subDomain}` : ''}web.${baseDomain}`;
    }
    return `https://${subDomain ? `${subDomain}.` : ''}link.${baseDomain}`;
  } else if (isClient) {
    return `https://${subDomain ? `${subDomain}${subDomainSeparator}` : ''}clients-api.${baseDomain}`;
  } else if (isLinguist) {
    return `https://${subDomain ? `${subDomain}.` : ''}linguists-api.${baseDomain}`;
  } else if (isVRI) {
    // return `https://${subDomain ? `${subDomain}.` : ''}vri-api.${baseDomain}`;
    return 'https://vri-api.dev-miton.co.uk';
  } else if (isOps) {
    return `https://${subDomain ? `${subDomain}.` : ''}ops-api.${baseDomain}`;
  } else if (isIL) {
    return `https://${subDomain ? `${subDomain}.` : ''}il-api.${baseDomain}`;
  } else if (isTenant) {
    return `https://${subDomain ? `${subDomain}${subDomainSeparator}` : ''}tenants-api.${baseDomain}`;
  } else if (isLinkedAPI) {
    return `https://${subDomain ? `${subDomain}.` : ''}api.${baseDomain}`;
  }
  return `https://${subDomain ? `${subDomain}.` : ''}app.${baseDomain}`;
};

// export const getSortingData = (sortingData: Record<any, string>) => {
//   if (sortingData?.order) {
//     let order = sortingData.order;
//     if (order) {
//       order = order === 'ascend' ? 'asc' : 'desc';
//     }
//     return { ...sortingData, order };
//   }
//   return;
// };

// export const displayMessage = (
//   type: any,
//   content: any,
//   duration: number = 3
// ) => {
//   message.config({ maxCount: 1 });
//   message.open({
//     type,
//     content,
//     duration,
//     style: {
//       marginTop: `${
//           content.includes('Started file processing') ? '0px' : '60px'
//       }`
//     },
//   });
// };

// export const handleRemoveMessage = () => {
//   message.destroy();
// };

// export const onShowNotification = (
//   title: string,
//   message: string,
//   status: string
// ) => {
//   const handleIconDisplay = () => {
//     if (status === 'success') {
//       return <i className={'da da-circle-checked'} />;
//     } else if (status === 'error') {
//       return <i className={'da da-circle-close'} />;
//     } else if (status === 'done') {
//       return (
//         <Image
//           src={'/assets/fireworks.png'}
//           alt={'Icon'}
//           width={50}
//           height={50}
//         />
//       );
//     } else if (status === 'highDemandLanguage') {
//       return (
//         <Image
//           src={'/assets/translater.png'}
//           alt={'Icon'}
//           width={50}
//           height={50}
//         />
//       );
//     }
//   };
//   notification.config({
//     maxCount: 1,
//     // @ts-ignore
//     className: `bg-info-light-color${
//       ['success', 'error'].includes(status) ? '' : ' display-background-image'
//     }`
//   });
//   notification.open({
//     message: title,
//     description: message,
//     icon: handleIconDisplay(),
//     closeIcon: <></>,
//     duration: 5
//   });
// };

export function wordStr(count: number): string {
  const array = new Uint8Array(count);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join(
    ''
  );
}

export function toBase64(input: ArrayBuffer): string {
  const uint8Array = new Uint8Array(input);
  const base64String = btoa(String.fromCharCode(...uint8Array));
  return base64String
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export async function toSHA256(input: string): Promise<ArrayBuffer> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  return crypto.subtle.digest('SHA-256', data);
}

export const generateCodeVerifier = () => wordStr(48);

export const generateCodeChallenge = async (
  codeVerifier: string
): Promise<string> => {
  const hashed = await toSHA256(codeVerifier);
  return toBase64(hashed);
};

export function getCookie(key: string): string | undefined {
  if (typeof document !== 'undefined') {
    const b: RegExpMatchArray | null = document?.cookie.match(`(^|;)\\s*${key}\\s*=\\s*([^;]+)`);
    return b ? b.pop() : '';
  }
  return '';
}

export function setCookie(
  key: string,
  value: string | number | boolean,
  days: number
): void {
  let d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
  document.cookie = `${key}=${value};path=/;expires=${d.toUTCString()}`;
}

export const setTokensInCookie = (data: CookiesData): void => {
  setCookie('id_token_pkce', data?.id_token, 1);
  setCookie('access_token_pkce', data?.access_token, 1);
  document.cookie =
    'code_verifier=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  if (data?.refresh_token) {
    setCookie('refresh_token_pkce', data.refresh_token, 365);
  }
};

export const handleSetTokensInCookies = (
  data: CookiesData,
  environment: string | undefined
) => {
  let expiresData: number = 3600;
  if (data?.expires_in) {
    expiresData = data.expires_in * 1000;
  }
  setCookie('id_token_pkce', data.id_token, expiresData);
  setCookie('access_token_pkce', data.access_token, expiresData);
  if (data.refresh_token) {
    if (environment) {
      setCookie(
        'refresh_token_pkce',
        data.refresh_token,
        ['production', 'live', 'translit-production', 'translit-live'].includes(
          environment
        )
          ? 365
          : 7
      );
    }
  }
  return new Promise((resolve) => setTimeout(resolve, 500));
};

export const handleLogin = async (
  loginBy?: string,
  autoLogin?: boolean
): Promise<void> => {
  const codeVerifier: string = await generateCodeVerifier();
  const codeChallenge: string = await generateCodeChallenge(codeVerifier);
  setCookie('code_verifier', codeVerifier, 1);
  const baseUrl = new URL(
    `fetch_authorizer_code?app_id=${
      process.env.NEXT_PUBLIC_AUTH_APP_ID
    }&code_challenge=${codeChallenge}${loginBy ? `&login_by=${loginBy}` : ''}${
      autoLogin ? '&auto_login=true' : ''
    }`,
    getBaseUrl({ isAuth: true })
  );
  window.location.href = baseUrl.toString();
};

export const deleteCookie = (name: string) => {
  document.cookie = `${name}=; expires=${new Date(0).toUTCString()};path=/;`;
};

export const clearCookies = () => {
  const allCookie = document.cookie.split(';');
  for (let i = 0; i < allCookie.length; i++)
    document.cookie = `${allCookie[i]}=;expires=${new Date(
      0
    ).toUTCString()};path=/;`;
};

export const handleStorageData = (isFromChangePassword = false) => {
  const onetrustActiveGroups = localStorage.getItem('onetrustActiveGroups');
  if (!isFromChangePassword) {
    localStorage.clear();
  }
  if (onetrustActiveGroups) {
    if (!isFromChangePassword) {
      localStorage.setItem('onetrustActiveGroups', onetrustActiveGroups);
    }
    for (const token of tokens) {
      const tokenValue = getCookie(token);
      if (tokenValue) {
        deleteCookie(token);
      }
    }
  } else {
    clearCookies();
  }
};

export const handleLogout = () => {
  const baseUrl = new URL(
    `logout?app_id=${process.env.NEXT_PUBLIC_AUTH_APP_ID}`,
    process.env.NEXT_PUBLIC_AUTH_URL
  );
  handleStorageData();
  window.location.href = baseUrl.toString();
};

export const handleUnauthorized = (): void => {
  handleStorageData();
  const baseUrl = new URL(
    `unauthorized?app_id=${process.env.NEXT_PUBLIC_AUTH_APP_ID}&clear_session=true`,
    process.env.NEXT_PUBLIC_AUTH_URL
  );
  window.location.href = baseUrl.toString();
};

export const handleUnauthorizedAccess = () => {
  // displayMessage(
  //   'error',
  //   // eslint-disable-next-line
  //   "You don't have permission to access this portal."
  // );
  handleLogout();
};

// export const getLoadingComponent = (
//   error: Record<any, any>,
//   isShowSkeleton = false
// ) => {
//   if (error) {
//     window.location.reload();
//   }

//   return isShowSkeleton ? (
//     <Skeleton active paragraph={{ rows: 1, width: 200 }} />
//   ) : (
//     <LoadingComponent />
//   );
// };

export const handleRouting = async(
  userDetails: Record<any, any>,
  pathName: string,
  searchParamsObject?: Record<string, unknown>
): Promise<string> => {
  if (userDetails?.primary_user_type === 'linguist') {
    const { profile_completion, application_summary_completion, state } =
      userDetails;
    let routingPath: string = '';
    if (profile_completion < 100) {
      if (
        ['approved', 'pending_approval'].includes(state) &&
        (pathName.startsWith(basePathNames?.onboarding) ||
          pathName.startsWith(basePathNames?.vri.vriBasepath) ||
          publicRoutes.includes(pathName) ||
          pathName.startsWith('/404'))
      ) {
        if (pathName.startsWith(basePathNames?.vri.vriBasepath)) {
          routingPath = pathName;
        } else {
          routingPath = '/linguist/profile/basic-information';
        }
      } else if (
        ['approved', 'pending_approval'].includes(state) &&
        (pathName.startsWith(basePathNames?.profile) ||
          pathName.startsWith(basePathNames?.vri.vriBasepath))
      ) {
        routingPath = pathName;
      } else if (state === 'completed') {
        routingPath = '/linguist/onboarding/pending-approval-info';
      } else {
        routingPath = '/linguist/onboarding/basic-information';
      }
    } else if (profile_completion === 100) {
      if (application_summary_completion) {
        if (
          ['approved', 'pending_approval'].includes(state) &&
          (pathName.startsWith(basePathNames?.onboarding) ||
            publicRoutes.includes(pathName) ||
            pathName.startsWith('/404'))
        ) {
          routingPath = '/linguist/profile/basic-information';
        } else if (
          ['approved', 'pending_approval'].includes(state) &&
          pathName.startsWith(basePathNames?.profile)
        ) {
          routingPath = pathName;
        } else if (state === 'completed') {
          routingPath = '/linguist/onboarding/pending-approval-info';
        }
      } else {
        routingPath = '/linguist/onboarding/basic-information';
      }
    }
    if (searchParamsObject?.isJobOffersAccessDenied) {
      const store = await getStore();
      const { dispatch } = store;
      dispatch(
        modalActions.updateActionConfirmModalDetails({
          title: 'Access Denied',
          content:
            'You do not have access to view job offers. Please check your profile and ensure that it is in an approved state. Only approved profiles are permitted to view job offers.',
          visible: true,
          type: 'info',
          icon: 'da-info',
          withoutLoading: true
        })
      );
    }
    return routingPath;
  }
  return '';
};

export const handleLinguistPortalRedirection = async (
  userDetails?: UserDetails,
  router?: any
) => {
  // @ts-ignore
  const routingPath = await handleRouting(userDetails, router?.pathname);
  if (routingPath) {
    router.push(routingPath);
  }
};

export const handleMainPageRedirection = (
  userDetails: UserDetails,
  router: any,
  isClientServiceAccess: boolean
) => {
  const { primary_user_type: userType } = userDetails;
  if (userType === 'staff') {
    router.push(`/staff/${isClientServiceAccess ? 'clients' : 'linguists'}`);
  } else if (userType === 'linguist') {
    handleLinguistPortalRedirection(userDetails, router);
  }
};

interface ProjectDetails {
  name?: string;
}

interface EmailInfoContent {
  key: string;
  title: string;
  content: string;
  note?: string;
  status: string;
}

export const getSuccessEmailInfoContent = (
  existing_email: string = '',
  confirmed_email: string = '',
  projectDetails: ProjectDetails = {}
): EmailInfoContent => ({
  key: 'email_configurations',
  title: 'Email ID Verified Successfully',
  content: `Your email ID (${confirmed_email}) has been verified successfully. Use this email ID to login.`,
  note: `Note : Your existing email ID(${existing_email}) is removed from ${projectDetails?.name}.`,
  status: 'success'
});

export const getFailureEmailInfoContent = (
  projectDetails: ProjectDetails = {}
): EmailInfoContent => ({
  key: 'email_configurations',
  title: 'Email ID Verification token is Invalid',
  content: `Your email ID verification token is invalid. Either you might have already verified it or you have added another email ID in the ${projectDetails?.name} again.`,
  status: 'failure'
});

export const handleLoggedInRoutePathCheck = (
  userDetails: UserDetails,
  router: NextRouter,
  permissions: string[]
) => {
  const { primary_user_type: userType } = userDetails;
  if (userType === 'linguist' && !router.pathname.startsWith('/linguist')) {
    handleLinguistPortalRedirection();
  } else if (userType === 'staff') {
    const callbackRoutePath = localStorage.getItem('callback_route_path');
    if (
      callbackRoutePath?.startsWith('/staff/linguists/reference/given-details')
    ) {
      localStorage.removeItem('callback_route_path');
      router.push(callbackRoutePath);
    }
    if (
      router.pathname === '/staff/create-linguist' &&
      !permissions.includes(linguistPermissionSlugs.createLinguist)
    ) {
      router.push('/staff/linguists');
    } else if (
      router.pathname.startsWith('/staff/linguists') &&
      !router.pathname.includes('history')
    ) {
      if (
        (router.pathname.includes('/services') &&
          !permissions.includes(
            linguistPermissionSlugs.sections.service.view
          )) ||
        (router.pathname.includes('/security-clearances') &&
          !permissions.includes(
            linguistPermissionSlugs.sections.security_clearance.view
          )) ||
        (router.pathname.includes('/documentation') &&
          !permissions.includes(
            linguistPermissionSlugs.sections.documentation.view
          )) ||
        (router.pathname.includes('/bank-details') &&
          !permissions.includes(linguistPermissionSlugs.sections.bank.view)) ||
        (router.pathname.includes('/training-and-memberships') &&
          !permissions.includes(
            linguistPermissionSlugs.sections.membership.view
          )) ||
        (router.pathname.includes('/approve') &&
          !permissions.includes(
            linguistPermissionSlugs.moveLinguistApprovalOrPendingApproval
          ))
      ) {
        router.push('/staff/linguists');
      }
    }
    if (
      router.pathname.startsWith('/linguist') &&
      !publicRoutes.includes(router.pathname)
    ) {
      router.push('/staff/linguists');
    }
  }
};

// const isRequiredField = (rules: any[]) =>
//   rules.some((rule: any) => 'required' in rule);

// export const getFormItemProps = (
//   name: string,
//   formItemsDetails: any,
//   isNumberField: boolean = false,
//   isMobile: boolean = false,
//   fieldType: string = '',
//   maxLength: number = 255,
//   isRequired: boolean = false
// ) => {
//   let props: any = {
//     name
//   };

//   const getLabel = () => {
//     if (
//       isMobile &&
//       (formItemsDetails[name].isRequired ||
//         (formItemsDetails[name].rules &&
//           isRequiredField(formItemsDetails[name].rules)))
//     ) {
//       return (
//         <>
//           {formItemsDetails[name].label}
//           <span className={'custom-required-mark'}>*</span>
//         </>
//       );
//     }
//     return formItemsDetails[name].label;
//   };

//   const getRules = (rules: Record<any, any>[] = []) => {
//     let updatedRules = [];
//     if (rules?.length) {
//       updatedRules = rules.map((rule) => {
//         if (rule.required && (fieldType === 'input' || fieldType === 'select')) {
//           return { required: true };
//         }
//         return rule;
//       });
//       if (fieldType === 'input') {
//         const maxLengthRule = updatedRules.find((rule) => rule.max);
//         if (!maxLengthRule) {
//           updatedRules.push({ max: maxLength });
//         }
//       }
//       return updatedRules;
//     }
//     return rules;
//   };

//   if (formItemsDetails[name].label) {
//     props = {
//       ...props,
//       label: getLabel()
//     };
//   }

//   if (formItemsDetails[name].isRequired || isRequired) {
//     const isWhiteSpaceValidationNeeded = !isNumberField && ['input', 'text_area'].includes(fieldType)
//     props = {
//       ...props,
//       rules: [
//         { required: true, ...(isWhiteSpaceValidationNeeded ?  { whitespace: true } : {}) }
//       ]
//     };
//   }

//   if (formItemsDetails[name].rules) {
//     props = {
//       ...props,
//       rules: getRules([
//         ...(props.rules
//           ? [...props.rules, ...formItemsDetails[name]?.rules]
//           : formItemsDetails[name]?.rules)
//       ])
//     };
//   }

//   if (formItemsDetails[name].isHaveTooltip) {
//     props = {
//       ...props,
//       tooltip: {
//         title: formItemsDetails[name].tooltipText,
//         icon: (
//           <span onClick={(event) => event.preventDefault()}>
//             <i className={'da da-info neutral-medium-color'} />
//           </span>
//         ),
//         placement: 'topLeft',
//         overlayClassName: formItemsDetails[name].tooltipClassName || ''
//       }
//     };
//   }

//   if (formItemsDetails[name].valuePropName) {
//     props = {
//       ...props,
//       valuePropName: formItemsDetails[name].valuePropName
//     };
//   }
//   return props;
// };

// export const getSelectOptions = (
//   options: any = [],
//   isGroupedOptions: boolean = false
// ) => {
//   if (isGroupedOptions) {
//     return options?.map((data: Record<any, any>, index: number) => (
//       <Select.OptGroup key={`${data.label}_${index}`} label={data.label}>
//         {data.options.map((option: Record<any, any>, index: number) => (
//           <Select.Option key={`${option.value}_${index}`} {...option}>
//             {option.label}
//           </Select.Option>
//         ))}
//       </Select.OptGroup>
//     ));
//   }
//   return options?.map((data: Record<any, any>, index: number) => (
//     <Select.Option key={`${data.value}_${index}`} {...data}>
//       {data.label}
//     </Select.Option>
//   ));
// };

// export const handleInputValueChange = (e: Record<any, any>) => {
//   if (e?.key === ' ' && e?.target?.selectionStart === 0) {
//     e.preventDefault();
//   }
// };

// export const handleInputNumberChange = (
//   e: Record<any, any>,
//   isAllowedDigit = false,
//   maxLength = 0
// ) => {
//   if (
//     ((isNaN(e?.key) || e?.key === ' ') &&
//       !(isAllowedDigit && e?.key === '.' && !e?.target?.value?.includes('.')) &&
//       !(
//         ['c', 'v', 'x', 'a', 'z'].includes(e?.key) &&
//         (e?.metaKey || e?.ctrlKey)
//       )) ||
//     (maxLength && e?.target?.selectionStart === maxLength)
//   ) {
//     e.preventDefault();
//   }
// };

export const changePassword = () => {
  localStorage.setItem('callback_route_path', window.location.pathname);
  localStorage.setItem('is_from_change_password', 'true');
  const baseUrl = new URL(
    `change_password?app_id=${process.env.NEXT_PUBLIC_AUTH_APP_ID}`,
    getBaseUrl({ isAuth: true })
  );
  window.location.href = baseUrl.toString();
};

export const handleLoggedInSuccess = (isLoggedInCall: boolean) => {
  if (isLoggedInCall) {
    displayMessage('success', 'Logged in successfully');
  }
};

export const handleTokenExpired = async (
  callBackActionDetails: {} = {},
  isUserCalledFailed: boolean = false
) => {
  if (
    getCookie('refresh_token_pkce') &&
    localStorage.getItem('cont_login_email')
  ) {
    const store = await getStore();
    store.dispatch(
      actions.getRefreshToken({
        data: {
          app_id: process.env.NEXT_PUBLIC_AUTH_APP_ID,
          email: localStorage.getItem('cont_login_email')
        },
        callbackActionDetails: !isUserCalledFailed
          ? callBackActionDetails
          : undefined
      })
    );
  } else if (
    !publicRoutes.includes(window.location.pathname) ||
    isUserCalledFailed
  ) {
    if (getCookie('access_token_pkce')) {
      handleUnauthorized();
    } else {
      handleLogin(undefined, publicRoutes.includes(window.location.pathname));
    }
    // @ts-ignore
    if (isUserCalledFailed && callBackActionDetails?.action) {
      const store = await getStore();
      store.dispatch(
        // @ts-ignore
        callBackActionDetails.action(callBackActionDetails.payload)
      );
    }
  }
};

export function handleErrorResponse(
  data: AxiosError | Record<any, Record<any, any>>,
  callBackActionDetails?: any,
  isUserCalledFailed: boolean = false,
  routeCallBack?: () => void,
  isPageNotFound?: boolean,
  router?: any,
  // dispatch?: any,
  ignoreError: boolean = false
) {
  if (ignoreError) {
    return;
  }
  if (data?.response?.status === 406) {
    changePassword();
  } else if (
    isUserCalledFailed &&
    ![401, 403].includes(data?.response?.status)
  ) {
    handleLogout();
  } else if ([401, 403].includes(data?.response?.status)) {
    if (
      data?.response?.status === 403 &&
      // @ts-ignore
      data?.response?.data?.errors?.at(0)?.error_code === 'ERROR_0004'
    ) {
      // @ts-ignore
      displayMessage('error', data.response.data.errors.at(0).message);
      if (window.location.pathname.endsWith('/staff/linguists')) {
        // dispatch(actions.updateLinguistServiceAccess(false));
      } else if (
        window.location.pathname.startsWith('/staff/linguists/') ||
        window.location.pathname.startsWith('staff/configurations/linguists')
      ) {
        router.push('/staff/linguists');
      }
    } else if (
      data?.response?.status === 401 &&
      // @ts-ignore
      data?.response?.data?.errors?.at(0)?.error_code === 'ERROR_0007'
    ) {
      handleLogout();
    } else {
      handleTokenExpired(callBackActionDetails, isUserCalledFailed);
    }
  } else if ([500, 503].includes(data?.response?.status)) {
    // displayMessage('error', 'Internal Server Error');
  }
  // Handle error from BackEnd team
  else if (data?.response?.status === 400) {
    // @ts-ignore
    // displayMessage('warning', data.response.data.detail);
  } else if (
    // @ts-ignore
    data?.response?.data?.errors?.length ||
    data?.response?.status === 404
  ) {
    if (data?.response?.status === 404 && isPageNotFound) {
      // dispatch(actions.updateNotFoundPagePath(router.pathname));
    } else if (routeCallBack && data?.response?.status === 404) {
      routeCallBack();
    } else {
      // @ts-ignore
      // displayMessage('error', data.response.data.errors?.at(0)?.message);
    }
  } else if (data?.response?.status === 422) {
    // @ts-ignore
    // displayMessage('error', data?.response?.data?.detail[0]?.msg);
    // @ts-ignore
  } else if (data?.response?.data?.detail) {
    // @ts-ignore
    // displayMessage('error', data.response.data.detail);
  }
}

export const handleDropDownValue = (
  isFilter: boolean,
  filterData: any[],
  dropDownList: Record<string, any> = [],
  searchValue: string
): Record<string, any> => {
  if (isFilter) {
    if (searchValue.length > 0) {
      return dropDownList;
    }
    return filterData;
  } else {
    return dropDownList;
  }
};

export function capitalizeFirstLetter(string: string = '') {
  if (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return '';
}

export const handleNotFoundContentForDropDown = (
  searchValue: string,
  loading: boolean,
  text: string
) => {
  const handleTextChange = () => {
    if (loading) {
      // return <Spin />;
      return <CircularProgress />;
    }
    if (searchValue?.length >= 3) {
      return `No ${capitalizeFirstLetter(text.replace('_', ' '))} found`;
    } else if (searchValue.length === 0) {
      return 'Please enter any value to search';
    } else {
      return dropDownSearchPlaceHolder;
    }
  };
  return <div className="py-1 px-2">{handleTextChange()}</div>;
};

export const checkValidFormFields = (
  formData: Record<any, any> | null | undefined
) => {
  for (let key in formData) {
    if (
      formData[key] === undefined ||
      formData[key] === '' ||
      formData[key] === null ||
      (Array.isArray(formData[key]) && !formData[key]?.length)
    ) {
      delete formData[key];
    }
  }
  return formData;
};

export function getURLtoFile(url: string, filename: string, mimeType: string) {
  if (url.startsWith('data:')) {
    let arr: string[] = url.split(',');
    if (arr?.length) {
      // @ts-ignore
      let mime: string | null = arr[0].match(/:(.*?);/)[1];
      let bstr = atob(arr[arr.length - 1]);
      let n = bstr.length;
      let u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      let file = new File([u8arr], filename, { type: mime || mimeType });
      return Promise.resolve(file);
    }
  }
  return fetch(url)
    .then((res) => res.arrayBuffer())
    .then((buf) => new File([buf], filename, { type: mimeType }));
}

export const copyText = (data: string) => {
  navigator.clipboard
    .writeText(data)
    // .then(() => displayMessage('success', 'Copied Successfully'));
};

// export const insertValueInMiddleOfArray = (
//   array: any[] = [],
//   position: number = array.length,
//   newValue: Record<any, any> = {}
// ) => {
//   array.splice(position, 0, newValue);
//   return array;
// };

type TimeUnit =
  | 'millisecond'
  | 'second'
  | 'minute'
  | 'hour'
  | 'day'
  | 'week'
  | 'month'
  | 'year';

export const getElapsedTime = (pastTime: string, unit: TimeUnit) =>
  dayjs().diff(dayjs(pastTime), unit);

export const getDuration = (
  startDateString: string,
  endDateString?: string
): string => {
  if (startDateString) {
    const startDate = new Date(startDateString);
    const endDate = new Date(endDateString || Date.now());
    const diffInSeconds = Math.floor(
      (endDate.getTime() - startDate.getTime()) / 1000
    );

    const days = Math.floor(diffInSeconds / (3600 * 24));
    const hours = Math.floor((diffInSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((diffInSeconds % 3600) / 60);
    const seconds = diffInSeconds % 60;

    return `${days ? `${days}d ` : ''}${hours ? `${hours}h ` : ''}${minutes ? `${minutes}m ` : ''}${seconds}s`;
  }
  return '-';
};

export const getDateTimeWithDuration = (
  startDateStr: string,
  endDateStr: string | null | undefined = null
) => {
  const start = dayjs(startDateStr);
  const end = endDateStr ? dayjs(endDateStr) : dayjs();

  let result = '';

  if (start.isSame(end, 'day')) {
    result = `${start.format('DD/MM/YYYY')}, ${start.format('h:mm A')} to ${end.format('h:mm A')}`;
  } else {
    result = `${start.format('DD/MM/YYYY, h:mm A')} to ${end.format('DD/MM/YYYY, h:mm A')}`;
  }
  return result;
};

export const nowInRange = (
  startDate: any,
  endDate: any,
  offsetStart: number = 0
): boolean => {
  if (!startDate) {
    throw new Error('startDate not provided');
  }

  if (!endDate) {
    throw new Error('endDate not provided');
  }

  const now: Date = new Date();
  const start: Date = new Date(startDate);

  if (offsetStart) {
    start.setSeconds(start.getSeconds() + offsetStart);
  }

  return now >= start && now <= new Date(endDate);
};
