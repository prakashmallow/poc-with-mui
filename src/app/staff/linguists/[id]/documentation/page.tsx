"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, Paper, Typography } from '@mui/material';
import ContentLayout from '@/components/staff/linguists/edit-section/ContentLayout';
import { InfoOutline, Add } from '@mui/icons-material';

export default function DocumentationPage() {
  const router = useRouter();

  const handleSave = () => {
    console.log('Saving documentation data');
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <ContentLayout
      title="Documentation"
      onSave={handleSave}
      onCancel={handleCancel}
      showActions={false}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Paper elevation={0} sx={{ p: 2, bgcolor: 'white' }}>
          <Typography fontSize={13} fontWeight={500} color="#1e285f" >Our clients require us to follow Baseline Personnel Security Standards (BPSS) when onboarding linguists, therefore we require the following documents.</Typography>
        </Paper>
        <Paper elevation={0} sx={{ p: 3, bgcolor: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant='h6' fontSize={18} fontWeight={500} color="#1e285f" >Right to work <InfoOutline sx={{ ml: 1, color: '#757575', fontSize: 18 }} /></Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
          >
            Add Right to Work
          </Button>

        </Paper>
        <Paper elevation={0} sx={{ p: 3, bgcolor: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant='h6' fontSize={18} fontWeight={500} color="#1e285f" >Proof of address
            <InfoOutline sx={{ ml: 1, color: '#757575', fontSize: 18 }} /></Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
          >
            Add Address Proof
          </Button>

        </Paper>
        <Paper elevation={0} sx={{ p: 3, bgcolor: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant='h6' fontSize={18} fontWeight={500} color="#1e285f" >Work History
            <InfoOutline sx={{ ml: 1, color: '#757575', fontSize: 18 }} /></Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
          >
            Add Work History
          </Button>

        </Paper>
      </Box>
    </ContentLayout>
  );
}
