"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Paper } from '@mui/material';
import ContentLayout from '@/components/staff/linguists/edit-section/ContentLayout';

export default function TrainingMembershipsPage() {
  const router = useRouter();

  const handleSave = () => {
    console.log('Saving training & memberships data');
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <ContentLayout 
      title="Training & Memberships" 
      onSave={handleSave} 
      onCancel={handleCancel}
    >
      <Paper sx={{ p: 4, borderRadius: 2, bgcolor: 'white' }}>
        Training & Memberships content will go here
      </Paper>
    </ContentLayout>
  );
}
