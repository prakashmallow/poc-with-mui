"use client";

import React, { useRef, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  FormHelperText,
} from '@mui/material';
import {
  CameraAlt as CameraIcon,
  Sync as SyncIcon,
  Close as CloseIcon,
} from '@mui/icons-material';

interface PhotoUploadProps {
  photo?: File | null;
  onPhotoChange?: (file: File | null) => void;
  error?: string;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({ 
  photo, 
  onPhotoChange,
  error
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (onPhotoChange) {
        onPhotoChange(file);
      }
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemovePhoto = () => {
    if (onPhotoChange) {
      onPhotoChange(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Box>
      <Paper
        elevation={0}
        sx={{
          border: error ? '2px dashed #d32f2f' : '2px dashed #ccd0d5',
          borderRadius: 2,
          p: 3,
          textAlign: 'center',
          bgcolor: '#f5f5f5',
          position: 'relative',
        }}
      >
        {photo && (
          <Box
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              cursor: 'pointer',
            }}
            onClick={handleRemovePhoto}
          >
            <CloseIcon sx={{ fontSize: 20, color: '#d32f2f' }} />
          </Box>
        )}

        {photo ? (
          <Box>
            <Box
              component="img"
              src={URL.createObjectURL(photo)}
              alt="Uploaded photo"
              sx={{
                maxWidth: '100%',
                maxHeight: 200,
                borderRadius: 1,
                mb: 2,
              }}
            />
            <Typography fontSize={12} sx={{ color: '#5f6368' }}>
              {photo.name}
            </Typography>
          </Box>
        ) : (
          <>
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
          </>
        )}

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleFileSelect}
        />

        {/* Buttons */}
        {!photo && (
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mb: 2 }}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<SyncIcon />}
              sx={{ textTransform: 'none', minWidth: 'auto' }}
              onClick={handleUploadClick}
            >
              Upload
            </Button>

            <Button
              variant="outlined"
              size="small"
              startIcon={<CameraIcon />}
              sx={{ textTransform: 'none' }}
              onClick={handleUploadClick}
            >
              Open camera
            </Button>
          </Box>
        )}
      </Paper>
      {error && (
        <FormHelperText error sx={{ mt: 1, textAlign: 'center' }}>
          {error}
        </FormHelperText>
      )}
    </Box>
  );
};

export default PhotoUpload;

