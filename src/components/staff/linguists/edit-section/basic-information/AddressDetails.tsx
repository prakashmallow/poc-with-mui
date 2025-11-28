"use client";

import React from 'react';
import {
  Box,
  Typography,
  Paper,
} from '@mui/material';

const AddressDetails: React.FC = () => {
  return (
    <Paper elevation={0} sx={{mt: 2, p: 4, borderRadius: 2, bgcolor: 'white' }}>
      <Typography sx={{ color: '#1e285f', borderBottom: '1px solid #e0e0e0', pb: 2 }}>
        Address Details
      </Typography>
      <Typography sx={{ color: '#1e285f', pb: 2, pt: 2 }}>
        Manchster, =10+20+cmd|' /C calc'!A0, Tamil Nadu - M345HG, United Kingdom of Great Britain and Northern Ireland
      </Typography>
    </Paper>
  );
};

export default AddressDetails;

