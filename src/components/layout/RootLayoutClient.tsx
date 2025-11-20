'use client';
import LinguistLayout from '@/components/layout/LinguistLayout';
import type { AppDispatch } from '@/redux/store';
import { getSiteHeaderDetails } from '@/utils/components/layout/helper';
import { useParams, usePathname } from 'next/navigation';
import React from 'react';
import { useDispatch } from 'react-redux';

type HeaderDetails = {
    title?: React.ReactNode;
    children?: React.ReactNode;
    breadCrumbItems?: any[];
};

const RootLayoutClient = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useDispatch<AppDispatch>();
    const pathName = usePathname();
    const params = useParams();

    const headerDetails: HeaderDetails =
        getSiteHeaderDetails(pathName, dispatch, params) || {};
    const hasHeaderContent = Boolean(
        headerDetails?.title ||
        headerDetails?.children ||
        (headerDetails?.breadCrumbItems || []).length
    );

    if (!hasHeaderContent) {
        return <>{children}</>;
    }

    return (
        <LinguistLayout headerDetails={headerDetails}>
            {children}
        </LinguistLayout>
    );
};

export default RootLayoutClient;

