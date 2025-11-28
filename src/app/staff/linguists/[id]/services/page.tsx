"use client";

import React, { useState } from "react";
import { Paper, Typography, IconButton, Button, Box, FormHelperText } from "@mui/material";
import { Add, InfoOutlined, CheckCircle } from "@mui/icons-material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import TranslateIcon from "@mui/icons-material/Translate";
import EditIcon from "@mui/icons-material/Edit";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import HistoryIcon from "@mui/icons-material/History";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/navigation";
import ContentLayout from "@/components/staff/linguists/edit-section/ContentLayout";
import GenericModal from "@/components/staff/linguists/edit-section/GenericModal";
import AddInterpretingLanguageModal, { InterpretingLanguageData } from "@/components/staff/linguists/edit-section/services/AddInterpretingLanguageModal";
import AddTranslationLanguageModal, { TranslationLanguageData } from "@/components/staff/linguists/edit-section/services/AddTranslationLanguageModal";
import AddQualificationModal, { QualificationData } from "@/components/staff/linguists/edit-section/services/AddQualificationModal";
import AddEnglishProficiencyModal, { EnglishProficiencyData } from "@/components/staff/linguists/edit-section/services/AddEnglishProficiencyModal";
import AddNativeLanguageModal, { NativeLanguageData } from "@/components/staff/linguists/edit-section/services/AddNativeLanguageModal";

export default function ServicesPage() {
  const router = useRouter();
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [serviceTypeError, setServiceTypeError] = useState("");
  const [isAddLanguageModalOpen, setIsAddLanguageModalOpen] = useState(false);
  const [isAddTranslationLanguageModalOpen, setIsAddTranslationLanguageModalOpen] = useState(false);
  const [isAddQualificationModalOpen, setIsAddQualificationModalOpen] = useState(false);
  const [isAddProficiencyModalOpen, setIsAddProficiencyModalOpen] = useState(false);
  const [isAddNativeLanguageModalOpen, setIsAddNativeLanguageModalOpen] = useState(false);

  const handleSave = () => {
    if (selectedServices.length === 0) {
      setServiceTypeError("Please select service type, you cannot skip this field");
      return;
    }
    setServiceTypeError("");
    console.log("Saving services data");
  };
  const handleCancel = () => router.back();

  const handleInterpretingLanguageSave = (data: InterpretingLanguageData) => {
    console.log("Interpreting language data:", data);
    // Add your save logic here
  };

  const handleTranslationLanguageSave = (data: TranslationLanguageData) => {
    console.log("Translation language data:", data);
    // Add your save logic here
  };

  const handleQualificationSave = (data: QualificationData) => {
    console.log("Qualification data:", data);
    // Add your save logic here
  };

  const handleEnglishProficiencySave = (data: EnglishProficiencyData) => {
    console.log("English proficiency data:", data);
    // Add your save logic here
  };

  const handleNativeLanguageSave = (data: NativeLanguageData) => {
    console.log("Native language data:", data);
    // Add your save logic here
  };

  const toggleService = (index: number) => {
    setSelectedServices(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
    // Clear error when user selects a service
    if (serviceTypeError) {
      setServiceTypeError("");
    }
  };

  const services = [
    { icon: PeopleAltIcon, label: "Face to Face Interpreting" },
    { icon: PhoneIphoneIcon, label: "Telephone Interpreting" },
    { icon: PlayCircleOutlineIcon, label: "Video Remote Interpreting" },
    { icon: TranslateIcon, label: "Translation & Multimedia" }
  ];

  return (
    <>
      <ContentLayout title="What services do you offer?" onSave={handleSave} onCancel={handleCancel}>
        <Paper elevation={0} className="p-6 bg-white ">
          <Typography variant="h6" fontSize={18} sx={{ color: "#1e285f", mb: 1 }}>
            Service Type <span className="text-red-500">*</span>
          </Typography>

          <Box>
            <div className="flex flex-wrap gap-2">
              {services.map((service, index) => {
                const Icon = service.icon;
                const isActive = selectedServices.includes(index);

                return (
                  <Box
                    key={index}
                    onClick={() => toggleService(index)}
                    className={`relative border cursor-pointer px-5 py-4 flex items-center gap-3 transition-all hover:shadow-md ${isActive
                        ? 'border-[#1e285f] bg-[#f0f1f7]'
                        : 'border-[#D0D4CA]'
                      }`}
                  >
                    {isActive ? (
                      <CheckCircle
                        className="absolute -top-2 -right-2 bg-white rounded-full"
                        style={{ fontSize: 20, color: '#1e285f' }}
                      />
                    ) : (
                      <div className="absolute -top-2 -right-2 w-5 h-5 bg-[#C5C8BD] rounded-full border-2 border-white"></div>
                    )}
                    <Icon
                      style={{
                        fontSize: 22,
                        color: isActive ? '#1e285f' : '#D0D4CA'
                      }}
                    />
                    <span
                      className={`text-[14px] font-semibold ${isActive ? 'text-[#1e285f]' : 'text-[#B7BCAF]'
                        }`}
                    >
                      {service.label}
                    </span>
                  </Box>
                );
              })}
            </div>
            {serviceTypeError && (
              <FormHelperText error sx={{ mt: 1, ml: 0 }}>
                {serviceTypeError}
              </FormHelperText>
            )}
          </Box>
        </Paper>
        <Paper elevation={0} className="p-6 bg-white  mt-4 flex justify-between items-center">
          <Typography variant="h6" fontSize={18} sx={{ color: "#1e285f" }}>
            Interpreting Languages
          </Typography>
          <Button 
            variant="contained" 
            color="primary"
            startIcon={<Add />}
            onClick={() => setIsAddLanguageModalOpen(true)}
          >
            Add Language
          </Button>
        </Paper>

        <Paper elevation={0} className="p-6 bg-white  mt-4 flex justify-between items-center">
          <Typography variant="h6" fontSize={18} sx={{ color: "#1e285f" }}>
            Translation & Multimedia Languages
          </Typography>
          <Button 
            variant="contained" 
            color="primary"
            startIcon={<Add />}
            onClick={() => setIsAddTranslationLanguageModalOpen(true)}
          >
            Add Language
          </Button>
        </Paper>

        <Paper elevation={0} className="p-6 mt-4 bg-white  flex justify-between items-center">
          <Typography variant="h6" fontSize={18} sx={{ color: "#1e285f", display: "flex", alignItems: "center", gap: 1 }}>
            Qualifications <InfoOutlined />
          </Typography>
          <Button 
            variant="contained" 
            color="primary"
            startIcon={<Add />}
            onClick={() => setIsAddQualificationModalOpen(true)}
          >
            Add Qualification
          </Button>
        </Paper>

        <Box className="flex justify-between items-center px-6 py-3 border-b border-gray-200 mt-2">
          <Typography className="font-medium text-gray-700">Qualification</Typography>
          <Typography className="font-medium text-gray-700">Actions</Typography>
        </Box>

        <Paper
          elevation={0}
          className="flex justify-between items-center px-6 py-4 bg-white border-b border-gray-200 hover:bg-[#f9f9f7] transition-all duration-200"
        >
          <Typography className="text-gray-800 font-medium">400 Hours Experience</Typography>

          <Box className="flex items-center gap-3">
            <IconButton size="small"><EditIcon className="text-blue-900" /></IconButton>
            <IconButton size="small"><FileUploadIcon className="text-gray-500" /></IconButton>
            <IconButton size="small"><HistoryIcon className="text-gray-500" /></IconButton>
            <IconButton size="small"><DeleteIcon className="text-red-600" /></IconButton>
          </Box>
        </Paper>

        <Paper elevation={0} className="p-6 bg-white  mt-4 flex justify-between items-center">
          <Typography variant="h6" fontSize={18} sx={{ color: "#1e285f", display: "flex", alignItems: "center", gap: 1 }}>
            English Proficiency <InfoOutlined />
          </Typography>
          <Button 
            variant="contained" 
            color="primary"
            startIcon={<Add />}
            onClick={() => setIsAddProficiencyModalOpen(true)}
          >
            Add Language
          </Button>
        </Paper>

        <Paper elevation={0} className="p-6 bg-white  mt-4 flex justify-between items-center mb-6">
          <Typography variant="h6" fontSize={18} sx={{ color: "#1e285f" }}>
            Native Language
          </Typography>
          <Button 
            variant="contained" 
            color="primary"
            startIcon={<Add />}
            onClick={() => setIsAddNativeLanguageModalOpen(true)}
          >
            Add Language
          </Button>
        </Paper>
      </ContentLayout>

      {/* Modals */}
      <AddInterpretingLanguageModal
        open={isAddLanguageModalOpen}
        onClose={() => setIsAddLanguageModalOpen(false)}
        onSave={handleInterpretingLanguageSave}
      />

      <AddTranslationLanguageModal
        open={isAddTranslationLanguageModalOpen}
        onClose={() => setIsAddTranslationLanguageModalOpen(false)}
        onSave={handleTranslationLanguageSave}
      />

      <AddQualificationModal
        open={isAddQualificationModalOpen}
        onClose={() => setIsAddQualificationModalOpen(false)}
        onSave={handleQualificationSave}
      />

      <AddEnglishProficiencyModal
        open={isAddProficiencyModalOpen}
        onClose={() => setIsAddProficiencyModalOpen(false)}
        onSave={handleEnglishProficiencySave}
      />

      <AddNativeLanguageModal
        open={isAddNativeLanguageModalOpen}
        onClose={() => setIsAddNativeLanguageModalOpen(false)}
        onSave={handleNativeLanguageSave}
      />
    </>
  );
}
