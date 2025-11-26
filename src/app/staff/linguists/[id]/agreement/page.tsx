"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Paper } from '@mui/material';
import ContentLayout from '@/components/staff/linguists/edit-section/ContentLayout';

export default function AgreementPage() {
  const router = useRouter();

  const handleSave = () => {
    console.log('Saving agreement data');
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <ContentLayout 
      title="Agreement" 
      onSave={handleSave} 
      onCancel={handleCancel}
    >
      <Paper sx={{ p: 4, borderRadius: 2, bgcolor: 'white' }}>
        Agreement content will go here
      </Paper>
    </ContentLayout>
  );
}
