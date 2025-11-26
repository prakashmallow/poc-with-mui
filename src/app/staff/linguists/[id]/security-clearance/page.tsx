"use client";

import React, { useState } from 'react';
import { Paper, Typography, Button, Box } from '@mui/material';
import ContentLayout from '@/components/staff/linguists/edit-section/ContentLayout';
import AddSecurityClearanceModal, { SecurityClearanceData } from '@/components/staff/linguists/edit-section/security-clearance/AddSecurityClearanceModal';
import { Add, Info, InfoOutline } from '@mui/icons-material';

export default function SecurityClearancePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [securityClearances, setSecurityClearances] = useState<SecurityClearanceData[]>([]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSave = (data: SecurityClearanceData) => {
    setSecurityClearances(prev => [...prev, data]);
    console.log('Security Clearance saved:', data);
  };

  return (
    <>
      <ContentLayout
        title="Security Clearance"
        showActions={false}
      >
        <Paper elevation={0} sx={{ p: 3, borderRadius: 2, bgcolor: 'white' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <Typography variant="h6" fontSize={18} sx={{display: 'flex', alignItems: 'center', color: "#1e285f", fontWeight: 500 }}>
              What type of security clearance do you have? <InfoOutline sx={{ ml: 1, color: '#757575', fontSize: 18 }}/>
            </Typography>
            <Button 
              variant="contained" 
              color="primary"
              startIcon={<Add />}
              onClick={handleOpenModal}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
              }}
            >
              Add Security Clearance
            </Button>
          </Box>
        </Paper>
      </ContentLayout>

      <AddSecurityClearanceModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSave}
      />
    </>
  );
}
