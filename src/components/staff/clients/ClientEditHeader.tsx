"use client";

import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { Box, Breadcrumbs, Button, Link, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import React from 'react';

interface ClientEditHeaderProps {
    clientName: string;
    currentSection: string;
    onCancel: () => void;
    onUpdate: () => void;
}

const ClientEditHeader: React.FC<ClientEditHeaderProps> = ({
    clientName,
    currentSection,
    onCancel,
    onUpdate,
}) => {
    const router = useRouter();

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
        <Box
            sx={{
                bgcolor: '#1976d2',
                color: 'white',
                px: 3,
                py: 2,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                minHeight: 64,
            }}
        >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '20px' }}>
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
                            '&:hover': {
                                textDecoration: 'underline',
                            },
                        }}
                    >
                        Clients
                    </Link>
                    <Typography variant="body2" sx={{ color: 'white' }}>
                        {getSectionLabel(currentSection)}
                    </Typography>
                </Breadcrumbs>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                    variant="contained"
                    startIcon={<CloseIcon />}
                    onClick={onCancel}
                    className='bg-white'
                >
                    CANCEL
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<SaveIcon />}
                    onClick={onUpdate}
                >
                    UPDATE
                </Button>
            </Box>
        </Box>
    );
};

export default ClientEditHeader;

