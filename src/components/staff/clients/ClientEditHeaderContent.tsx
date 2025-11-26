"use client";

import { RootState } from '@/redux/store';
import { Box, Breadcrumbs, Link, Typography } from '@mui/material';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { useSelector } from 'react-redux';

export const ClientEditHeaderTitle: React.FC = () => {
    const router = useRouter();
    const params = useParams();
    const searchParams = useSearchParams();
    const activeSection = searchParams.get('section') || 'profile';
    const isImport = searchParams.get('import') === 'true';
    const isImportFileHistory = searchParams.get('import-history') === 'true';
    const clientDetails = useSelector((state: RootState) => state.clients.clientDetails);
    const clientId = params?.id as string;

    const clientName = clientDetails?.name || 'Elijah Suarez';

    const getSectionLabel = (section: string) => {
        const sectionMap: Record<string, string> = {
            'profile': 'Profile',
            'billing-address': 'Billing Address',
            'division': 'Division',
            'department': 'Department',
            'sub-department': 'Sub Department',
            'sites': 'Sites',
            'history': 'History',
            'appointment-types': 'Appointment Types',
            'configurations': 'Configurations',
        };
        return sectionMap[section] || 'Profile';
    };

    const handleBillingAddressClick = () => {
        router.push(`/staff/clients/${clientId}?section=billing-address`);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '32px', color: 'white', lineHeight: 1.2, fontFamily: 'serif' }}>
                {clientName}
            </Typography>
            <Breadcrumbs
                separator=">"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    '& .MuiBreadcrumbs-separator': {
                        color: 'white',
                        mx: 1,
                        fontSize: '14px',
                    },
                    '& .MuiBreadcrumbs-ol': {
                        flexWrap: 'nowrap',
                        alignItems: 'center',
                        display: 'flex',
                    },
                    '& .MuiBreadcrumbs-li': {
                        display: 'flex',
                        alignItems: 'center',
                    },
                }}
            >
                <Link
                    component="button"
                    variant="body2"
                    onClick={() => router.push('/staff/clients')}
                    sx={{
                        color: 'white',
                        textDecoration: 'none',
                        cursor: 'pointer',
                        fontSize: '14px',
                        bgcolor: 'rgba(255, 255, 255, 0.2)',
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 1,
                        whiteSpace: 'nowrap',
                        '&:hover': {
                            bgcolor: 'rgba(255, 255, 255, 0.3)',
                        },
                    }}
                >
                    Clients
                </Link>
                {(isImport || isImportFileHistory) && activeSection === 'billing-address' ? (
                    <Link
                        component="button"
                        variant="body2"
                        onClick={handleBillingAddressClick}
                        sx={{
                            color: 'white',
                            textDecoration: 'none',
                            cursor: 'pointer',
                            fontSize: '14px',
                            bgcolor: 'rgba(255, 255, 255, 0.2)',
                            px: 1.5,
                            py: 0.5,
                            borderRadius: 1,
                            whiteSpace: 'nowrap',
                            '&:hover': {
                                bgcolor: 'rgba(255, 255, 255, 0.3)',
                            },
                        }}
                    >
                        {clientName} / Billing Address
                    </Link>
                ) : null}
                {isImport && activeSection === 'billing-address' ? (
                    <Typography
                        component="span"
                        variant="body2"
                        sx={{ color: 'white', fontSize: '14px', whiteSpace: 'nowrap' }}
                    >
                        Import
                    </Typography>
                ) : isImportFileHistory && activeSection === 'billing-address' ? (
                    <Typography
                        component="span"
                        variant="body2"
                        sx={{ color: 'white', fontSize: '14px', whiteSpace: 'nowrap' }}
                    >
                        Import File History
                    </Typography>
                ) : (
                    <Typography
                        component="span"
                        variant="body2"
                        sx={{ color: 'white', fontSize: '14px', whiteSpace: 'nowrap' }}
                    >
                        {getSectionLabel(activeSection)}
                    </Typography>
                )}
            </Breadcrumbs>
        </Box>
    );
};

const ClientEditHeaderContent: React.FC = () => {
    // Buttons are now in the Profile page header, not in the site header
    return null;
};

export default ClientEditHeaderContent;

