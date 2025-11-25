"use client";

import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { Box, Button } from '@mui/material';
import React from 'react';

interface ClientEditActionsProps {
    onCancel: () => void;
    onUpdate: () => void;
}

const ClientEditActions: React.FC<ClientEditActionsProps> = ({
    onCancel,
    onUpdate,
}) => {
    return (
        <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
                variant="outlined"
                className='bg-white'
                startIcon={<CloseIcon />}
                onClick={onCancel}
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
    );
};

export default ClientEditActions;

