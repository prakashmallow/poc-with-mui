"use client";

import { RootState } from '@/redux/store';
import { Box, Breadcrumbs, Link, Typography } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { useSelector } from 'react-redux';

export const ClientEditHeaderTitle: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const activeSection = searchParams.get('section') || 'profile';
    const clientDetails = useSelector((state: RootState) => state.clients.clientDetails);

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

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '20px', color: 'white', lineHeight: 1.2 }}>
                {clientName}
            </Typography>
            <Breadcrumbs
                separator=">"
                sx={{
                    '& .MuiBreadcrumbs-separator': {
                        color: 'white',
                    },
                    '& .MuiBreadcrumbs-ol': {
                        flexWrap: 'nowrap',
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
                        '&:hover': {
                            textDecoration: 'underline',
                        },
                    }}
                >
                    Clients
                </Link>
                <Typography variant="body2" sx={{ color: 'white', fontSize: '14px' }}>
                    {getSectionLabel(activeSection)}
                </Typography>
            </Breadcrumbs>
        </Box>
    );
};

const ClientEditHeaderContent: React.FC = () => {
    // Buttons are now in the Profile page header, not in the site header
    return null;
};

export default ClientEditHeaderContent;

