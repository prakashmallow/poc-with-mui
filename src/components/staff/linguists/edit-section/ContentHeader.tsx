"use client";

import React from 'react';
import {
  Box,
  Typography,
  Button,
} from '@mui/material';
import {
  Cancel as CancelIcon,
  Save as SaveIcon,
} from '@mui/icons-material';

interface ContentHeaderProps {
  title: string;
  onSave?: () => void;
  onCancel?: () => void;
  showActions?: boolean;
}

const ContentHeader: React.FC<ContentHeaderProps> = ({ 
  title, 
  onSave, 
  onCancel,
  showActions = true 
}) => {
  const hasActions = showActions && (onSave || onCancel);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, paddingBottom: 2, borderBottom: '1px solid #e0e0e0' }}>
      <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e285f', fontSize: 22 }}>
        {title}
      </Typography>
      {hasActions && (
        <Box sx={{ display: 'flex', gap: 2 }}>
          {onCancel && (
            <Button
              variant="outlined"
              startIcon={<CancelIcon />}
              onClick={onCancel}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                borderColor: '#bdbdbd',
                color: '#616161',
                '&:hover': {
                  borderColor: '#9e9e9e',
                  bgcolor: '#fafafa',
                },
              }}
            >
              CANCEL
            </Button>
          )}
          {onSave && (
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={onSave}
              sx={{
                textTransform: 'none',
                fontWeight: 600
              }}
            >
              SAVE
            </Button>
          )}
        </Box>
      )}
    </Box>
  );
};

export default ContentHeader;
