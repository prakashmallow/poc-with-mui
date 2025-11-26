"use client";

import { Box, Typography } from '@mui/material';
import React from 'react';
import ClientEditActions from './ClientEditActions';

interface SectionHeaderProps {
    title: string;
    onCancel: () => void;
    onUpdate: () => void;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
    title,
    onCancel,
    onUpdate,
}) => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 3,
                bgcolor: '#f0efeb',
                borderBottom: '1px solid #bec2b9',
                position: 'sticky',
                top: 0,
                zIndex: 10,
            }}
        >
            <Typography variant="h5" sx={{ fontWeight: 600, color: '#1e285f' }}>
                {title}
            </Typography>
            <ClientEditActions onCancel={onCancel} onUpdate={onUpdate} />
        </Box>
    );
};

export default SectionHeader;

