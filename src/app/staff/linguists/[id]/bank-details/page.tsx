"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Paper } from '@mui/material';
import ContentLayout from '@/components/staff/linguists/edit-section/ContentLayout';

export default function BankDetailsPage() {
  const router = useRouter();

  const handleSave = () => {
    console.log('Saving bank details data');
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <ContentLayout 
      title="Bank Details" 
      onSave={handleSave} 
      onCancel={handleCancel}
    >
      <Paper sx={{ p: 4, borderRadius: 2, bgcolor: 'white' }}>
        Bank Details content will go here
      </Paper>
    </ContentLayout>
  );
}
