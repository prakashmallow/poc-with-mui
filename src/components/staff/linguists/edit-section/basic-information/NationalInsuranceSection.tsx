"use client";

import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
} from '@mui/material';
import {
  Add,
} from '@mui/icons-material';

const NationalInsuranceSection: React.FC = () => {
  return (
    <Paper elevation={0} sx={{ p: 4, borderRadius: 2, bgcolor: 'white', mt: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography sx={{ color: '#1e285f' }}>
        National Insurance Number / National Identity Number
      </Typography>
      <Button variant="contained" color="primary">
        <Add /> Add Proof
      </Button>
    </Paper>
  );
};

export default NationalInsuranceSection;

