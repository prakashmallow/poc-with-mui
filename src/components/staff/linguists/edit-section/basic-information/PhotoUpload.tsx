"use client";

import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
} from '@mui/material';
import {
  CameraAlt as CameraIcon,
  Sync as SyncIcon,
} from '@mui/icons-material';

const PhotoUpload: React.FC = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        border: '2px dashed #ccd0d5',
        borderRadius: 2,
        p: 3,
        textAlign: 'center',
        bgcolor: '#f5f5f5',
      }}
    >
      {/* Upload Icon */}
      <CameraIcon sx={{ fontSize: 18, color: '#607d8b', mb: 1 }} />

      {/* Title */}
      <Typography fontSize={14} sx={{ fontWeight: 500, mb: 1 }}>
        Please upload a photo of yourself <Typography component="span" color="error">*</Typography>
      </Typography>

      {/* Sub title */}
      <Typography fontSize={12} variant="body2" sx={{ color: '#5f6368' }}>
        Click here or drag and drop your photo
      </Typography>

      {/* Link */}
      <Typography
        variant="body2"
        sx={{
          color: '#2e7d32',
          mb: 1,
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center'
        }}
      >
        <CameraIcon sx={{ fontSize: 8, mr: 0.5 }} />
        Read photo requirements
      </Typography>

      {/* Buttons */}
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mb: 2 }}>
        <Button
          variant="outlined"
          size="small"
          startIcon={<SyncIcon />}
          sx={{ textTransform: 'none', minWidth: 'auto' }}
        >
          Upload
        </Button>

        <Button
          variant="outlined"
          size="small"
          startIcon={<CameraIcon />}
          sx={{ textTransform: 'none' }}
        >
          Open camera
        </Button>
      </Box>
    </Paper>
  );
};

export default PhotoUpload;

