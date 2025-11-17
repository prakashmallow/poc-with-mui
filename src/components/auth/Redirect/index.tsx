'use client';
import React, { useEffect } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

// import LoadingComponent from '@/components/shared/LoadingComponent/index';
import { authActions } from '@/redux/Auth/AuthState';
import { getCookie } from '@/utils';

import { RootState } from '@/redux/store';
import Loading from '@/components/Loading';

const Redirect: React.FC<any> = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const userDetails = useSelector((state: RootState) => state.auth.userDetails);
  const isClientServiceAccess =
    process.env.NEXT_PUBLIC_CLIENT_SERVICE_DISABLED !== 'true';

  useEffect(() => {
    if (!isAuthenticated && getCookie('code_verifier')) {
      dispatch(
        authActions.getTokens({
          data: {
            app_id: searchParams.get('app_id'),
            code: searchParams.get('code'),
            code_verifier: getCookie('code_verifier')
          },
          router,
          dispatch,
          isFromTokens: true
        })
      );
    } else if (Object.keys(userDetails).length > 0) {
      window.location.href = `/staff/${isClientServiceAccess ? 'clients' : 'linguists'}`;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Loading />;
};

export default Redirect;
