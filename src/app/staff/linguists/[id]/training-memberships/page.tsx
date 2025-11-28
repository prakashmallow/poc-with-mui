"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Paper, Typography, Button, Box } from '@mui/material';
import { InfoOutline, Add } from '@mui/icons-material';
import ContentLayout from '@/components/staff/linguists/edit-section/ContentLayout';
import AddMembershipModal, { MembershipData } from '@/components/staff/linguists/edit-section/training-memberships/AddMembershipModal';
import AddTrainingModal, { TrainingData } from '@/components/staff/linguists/edit-section/training-memberships/AddTrainingModal';
import AddInsuranceModal, { InsuranceData } from '@/components/staff/linguists/edit-section/training-memberships/AddInsuranceModal';

export default function TrainingMembershipsPage() {
  const router = useRouter();
  const [isMembershipModalOpen, setIsMembershipModalOpen] = useState(false);
  const [isTrainingModalOpen, setIsTrainingModalOpen] = useState(false);
  const [isInsuranceModalOpen, setIsInsuranceModalOpen] = useState(false);

  const handleSave = () => {
    console.log('Saving training & memberships data');
  };

  const handleCancel = () => {
    router.push(`/staff/linguists`);

  };

  const handleMembershipSave = (data: MembershipData) => {
    console.log("Membership data:", data);
    // Add your save logic here
  };

  const handleTrainingSave = (data: TrainingData) => {
    console.log("Training data:", data);
    // Add your save logic here
  };

  const handleInsuranceSave = (data: InsuranceData) => {
    console.log("Insurance data:", data);
    // Add your save logic here
  };

  return (
    <ContentLayout 
      title="Training & Memberships" 
      onSave={handleSave} 
      onCancel={handleCancel}
      showActions={false}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Paper elevation={0} sx={{ p: 3, bgcolor: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant='h6' fontSize={18} fontWeight={500} color="#1e285f" >Memberships <InfoOutline sx={{ ml: 1, color: '#757575', fontSize: 18 }} /></Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Add />}
              onClick={() => setIsMembershipModalOpen(true)}
            >
            Add Memberships
            </Button>
          </Paper>
          <Paper elevation={0} sx={{ p: 3, bgcolor: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant='h6' fontSize={18} fontWeight={500} color="#1e285f" >Continuous professional development
            <InfoOutline sx={{ ml: 1, color: '#757575', fontSize: 18 }} /></Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Add />}
              onClick={() => setIsTrainingModalOpen(true)}
            >
            Add Training
            </Button>
          </Paper>
          <Paper elevation={0} sx={{ p: 3, bgcolor: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant='h6' fontSize={18} fontWeight={500} color="#1e285f" >Insurance details
            <InfoOutline sx={{ ml: 1, color: '#757575', fontSize: 18 }} /></Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Add />}
              onClick={() => setIsInsuranceModalOpen(true)}
            >
            Add Insurance 
            </Button>
          </Paper>
          </Box>

      {/* Modals */}
      <AddMembershipModal
        open={isMembershipModalOpen}
        onClose={() => setIsMembershipModalOpen(false)}
        onSave={handleMembershipSave}
      />
      <AddTrainingModal
        open={isTrainingModalOpen}
        onClose={() => setIsTrainingModalOpen(false)}
        onSave={handleTrainingSave}
      />
      <AddInsuranceModal
        open={isInsuranceModalOpen}
        onClose={() => setIsInsuranceModalOpen(false)}
        onSave={handleInsuranceSave}
      />
    </ContentLayout>
  );
}
