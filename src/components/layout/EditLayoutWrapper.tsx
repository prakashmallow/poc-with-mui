'use client';
import LinguistEditHeaderLayout from '@/components/layout/LinguistEditHeaderLayout';
import { getEditLayoutHeaderDetails, isEditPage } from '@/utils/components/layout/editLayoutHelper';
import { usePathname } from 'next/navigation';
import React from 'react';

const EditLayoutWrapper = ({ children }: { children: React.ReactNode }) => {
    const pathName = usePathname();
    
    // Check if this is an edit page
    if (!isEditPage(pathName)) {
        return <>{children}</>;
    }
    
    // Get header details for edit page
    const headerDetails = getEditLayoutHeaderDetails(pathName);
    
    if (!headerDetails) {
        return <>{children}</>;
    }
    
    return (
        <LinguistEditHeaderLayout headerDetails={headerDetails}>
            {children}
        </LinguistEditHeaderLayout>
    );
};

export default EditLayoutWrapper;

