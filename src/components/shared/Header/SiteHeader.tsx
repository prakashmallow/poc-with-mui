'use client';
import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '@/redux/store';

const SiteHeader = ({
                        title,
                        children,
                        breadCrumbItems = [],
                        className
                    }: {
    title: string | React.ReactNode;
    children?: React.ReactNode;
    breadCrumbItems?: any[];
    className?: string;
}) => {
    const tenantDetails = useSelector(
        (state: RootState) => state.tenant.projectDetails
    );
    return (
        <div
            style={{
                backgroundImage: `url(${tenantDetails.header_img_url})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                height: 120
            }}
        >

        </div>
    );
};

export default React.memo(SiteHeader);
