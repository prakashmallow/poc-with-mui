"use client";

import React, { useState } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import ContentLayout from '@/components/staff/linguists/edit-section/ContentLayout';
import GenericModal from '@/components/staff/linguists/edit-section/GenericModal';
import AddRightToWorkModal, { RightToWorkData } from '@/components/staff/linguists/edit-section/documentation/AddRightToWorkModal';
import AddAddressProofModal, { AddressProofData } from '@/components/staff/linguists/edit-section/documentation/AddAddressProofModal';
import AddWorkHistoryModal, { WorkHistoryData } from '@/components/staff/linguists/edit-section/documentation/AddWorkHistoryModal';
import { InfoOutline, Add } from '@mui/icons-material';

export default function DocumentationPage() {
  const [isRightToWorkModalOpen, setIsRightToWorkModalOpen] = useState(false);
  const [isAddressProofModalOpen, setIsAddressProofModalOpen] = useState(false);
  const [isWorkHistoryModalOpen, setIsWorkHistoryModalOpen] = useState(false);

  const handleRightToWorkSave = (data: RightToWorkData) => {
    console.log("Right to work data:", data);
    // Add your save logic here
  };

  const handleAddressProofSave = (data: AddressProofData) => {
    console.log("Address proof data:", data);
    // Add your save logic here
  };

  const handleWorkHistorySave = (data: WorkHistoryData) => {
    console.log("Work history data:", data);
    // Add your save logic here
  };

  return (
    <>
      <ContentLayout
        title="Documentation"
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
              onClick={() => setIsRightToWorkModalOpen(true)}
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
              onClick={() => setIsAddressProofModalOpen(true)}
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
              onClick={() => setIsWorkHistoryModalOpen(true)}
            >
              Add Work History
            </Button>
          </Paper>
        </Box>
      </ContentLayout>

      {/* Modals */}
      <AddRightToWorkModal
        open={isRightToWorkModalOpen}
        onClose={() => setIsRightToWorkModalOpen(false)}
        onSave={handleRightToWorkSave}
      />

      <AddAddressProofModal
        open={isAddressProofModalOpen}
        onClose={() => setIsAddressProofModalOpen(false)}
        onSave={handleAddressProofSave}
      />

      <AddWorkHistoryModal
        open={isWorkHistoryModalOpen}
        onClose={() => setIsWorkHistoryModalOpen(false)}
        onSave={handleWorkHistorySave}
      />
    </>
  );
}
