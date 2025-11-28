"use client";

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
} from '@mui/material';
import {
  Add,
} from '@mui/icons-material';
import AddProofModal, { ProofData } from './AddProofModal';

const NationalInsuranceSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = (data: ProofData) => {
    console.log('Proof data:', data);
    // Add your save logic here
  };

  return (
    <>
      <Paper elevation={0} sx={{ p: 4, borderRadius: 2, bgcolor: 'white', mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography sx={{ color: '#1e285f' }}>
          National Insurance Number / National Identity Number
        </Typography>
        <Button 
          variant="contained"   
          color="primary"
          startIcon={<Add />}
          onClick={() => setIsModalOpen(true)}
        >
          Add Proof
        </Button>
      </Paper>

      <AddProofModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
    </>
  );
};

export default NationalInsuranceSection;
