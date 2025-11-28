"use client";

import React from 'react';
import {
  Box,
  Typography,
  Paper,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';

interface SourceOfApplicationProps {
  value: string;
  onChange: (value: string) => void;
}

const SourceOfApplication: React.FC<SourceOfApplicationProps> = ({ value, onChange }) => {
  return (
    <Paper elevation={0} sx={{ p: 2, borderRadius: 2, bgcolor: 'white', mt: 2 }}>
      <Typography sx={{ color: '#1e285f', mb: 4, borderBottom: '1px solid #e0e0e0', pb: 2 }}>
        Source of application
      </Typography>
      <FormControl sx={{ width: '30%' }} size="small">
        <Typography sx={{ mb: 2 }}>
          Where did you hear about us?
        </Typography>
        <Select
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          <MenuItem value="Dals">Dals</MenuItem>
          <MenuItem value="Dlink">Dlink</MenuItem>
        </Select>
      </FormControl>
    </Paper>
  );
};

export default SourceOfApplication;

