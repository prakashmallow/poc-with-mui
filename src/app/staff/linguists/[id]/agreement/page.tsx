"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Paper, Box, Typography, Checkbox, FormControlLabel, Button, TextField, InputLabel } from '@mui/material';
import { Download } from '@mui/icons-material';
import ContentLayout from '@/components/staff/linguists/edit-section/ContentLayout';

export default function AgreementPage() {
  const router = useRouter();
  const [accepted, setAccepted] = useState(false);

  const handleSave = () => {
    console.log('Saving agreement data');
  };

  const handleCancel = () => {
    router.push(`/staff/linguists`);
  };

  return (
    <ContentLayout
      title="The agreement between us"
      onSave={handleSave}
      onCancel={handleCancel}
      showActions={false}
    >
      <Paper sx={{ p: 3, borderRadius: 2, bgcolor: 'white' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, pb: 2, borderBottom: '1px solid #e0e0e0' }}>

          <Typography variant='h6' fontSize={18} fontWeight={550} color="#1e285f" >Supply of service agreement</Typography>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<Download />}
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
            Download
          </Button>
        </Box>
        <Box
          sx={{
            height: 500,
            borderRadius: 2,
            bgcolor: "#e6e6e6",
            border: "1px solid #d1d1d1",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography sx={{ color: "#757575", fontSize: 14 }}>
            Agreement preview not available
          </Typography>
        </Box>
        <Box sx={{  mb: 2 }}>
          <Typography sx={{ color: "#1e285f", fontSize: 14, mb: 2 }}>  Document period</Typography>
          <InputLabel sx={{ fontSize: 14, color: "#1e285f" }}>Start date</InputLabel>
          <TextField
            fullWidth={false}
            sx={{ width: '30%' }}
            size="small"
            type="date"
            placeholder="Select Start date"
          />

        </Box>

        {/* Checkbox */}
        <FormControlLabel
          control={
            <Checkbox
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
              sx={{ color: "#1e285f", '&.Mui-checked': { color: "#1e285f" } }}
            />
          }
          label={
            <Typography sx={{ fontSize: 14, color: "#1e285f" }}>
              I have read the agreement carefully and hereby accept its terms and conditions.
            </Typography>
          }
        />
      </Paper>
    </ContentLayout>
  );
}
