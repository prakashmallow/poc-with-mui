'use client';
import LinguistLayout from '@/components/layout/LinguistLayout';
import EditLayoutWrapper from '@/components/layout/EditLayoutWrapper';
import { isEditPage } from '@/utils/components/layout/editLayoutHelper';
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

    // If it's an edit page, handle it separately with EditLayoutWrapper
    if (isEditPage(pathName)) {
        return <EditLayoutWrapper>{children}</EditLayoutWrapper>;
    }
    
    // For non-edit pages, use the normal layout flow
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

