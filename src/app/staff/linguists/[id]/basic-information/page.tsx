"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getLinguistById } from '@/utils/linguistData';
import { Box } from '@mui/material';

// Import components from components folder
import ContentLayout from '@/components/staff/linguists/edit-section/ContentLayout';
import BasicInformation, { BasicInformationRef } from '@/components/staff/linguists/edit-section/basic-information/BasicInformation';
import AddressDetails from '@/components/staff/linguists/edit-section/basic-information/AddressDetails';
import ContactInformation from '@/components/staff/linguists/edit-section/basic-information/ContactInformation';
import NationalInsuranceSection from '@/components/staff/linguists/edit-section/basic-information/NationalInsuranceSection';
import SourceOfApplication from '@/components/staff/linguists/edit-section/basic-information/SourceOfApplication';

interface FormData {
  title: string;
  forename: string;
  surname: string;
  dateOfBirth: string;
  countryOfBirth: string;
  gender: string;
  employmentStatus: string;
  vatRegistered: string;
}

export default function BasicInformationPage() {
  const params = useParams();
  const router = useRouter();
  const linguistId = params?.id as string;
  const linguist = linguistId ? getLinguistById(linguistId) : null;

  const [formData, setFormData] = useState<FormData>({
    title: 'Mr',
    forename: '',
    surname: '',
    dateOfBirth: '',
    countryOfBirth: 'Spain',
    gender: 'Male',
    employmentStatus: 'Sole Trader',
    vatRegistered: 'No',
  });

  const [sourceOfApplication, setSourceOfApplication] = useState<string>('Dals');
  const [photo, setPhoto] = useState<File | null>(null);
  const basicInformationRef = useRef<BasicInformationRef>(null);

  useEffect(() => {
    if (linguist) {
      // Parse the linguist name to extract title, forename, and surname
      const nameParts = linguist.name.split(' ');
      const title = nameParts[0]; // Mr, Ms, Dr, etc.
      const forename = nameParts[1] || '';
      const surname = nameParts.slice(2).join(' ') || '';

      setFormData(prev => ({
        ...prev,
        title: title,
        forename: forename,
        surname: surname,
      }));
    }
  }, [linguist]);

  const handleFieldChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    // Validate using Zod schema
    const isValid = await basicInformationRef.current?.validate();
    if (!isValid) {
      return;
    }
    console.log('Saving linguist data:', formData, photo);
    // Add your save logic here
  };

  const handleCancel = () => {
    router.push(`/staff/linguists`);
  };

  if (!linguist) {
    return (
      <Box sx={{ p: 3 }}>
        <Box sx={{ p: 3, borderRadius: 2, bgcolor: 'white' }}>
          Linguist not found
        </Box>
      </Box>
    );
  }

  return (
    <ContentLayout 
      title="Basic Information" 
      onSave={handleSave} 
      onCancel={handleCancel}
    >
      <BasicInformation 
        ref={basicInformationRef}
        formData={formData} 
        onFieldChange={handleFieldChange}
        photo={photo}
        onPhotoChange={setPhoto}
      />
      <AddressDetails />
      <ContactInformation />
      <NationalInsuranceSection />
      <SourceOfApplication 
        value={sourceOfApplication} 
        onChange={setSourceOfApplication} 
      />
    </ContentLayout>
  );
}
