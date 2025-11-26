"use client";

import React, { useState } from "react";
import { Paper, Typography, IconButton, Button, Box } from "@mui/material";
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

export default function ServicesPage() {
  const router = useRouter();
  const [selectedServices, setSelectedServices] = useState<number[]>([]);

  const handleSave = () => console.log("Saving services data");
  const handleCancel = () => router.back();

  const toggleService = (index: number) => {
    setSelectedServices(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const services = [
    { icon: PeopleAltIcon, label: "Face to Face Interpreting" },
    { icon: PhoneIphoneIcon, label: "Telephone Interpreting" },
    { icon: PlayCircleOutlineIcon, label: "Video Remote Interpreting" },
    { icon: TranslateIcon, label: "Translation & Multimedia" }
  ];

  return (
    <ContentLayout title="What services do you offer?" onSave={handleSave} onCancel={handleCancel}>

      <Paper elevation={0} className="p-6 bg-white ">
        <Typography variant="h6" fontSize={18} sx={{ color: "#1e285f", mb: 1 }}>
          Service Type <span className="text-red-500">*</span>
        </Typography>

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
      </Paper>
      <Paper elevation={0} className="p-6 bg-white  mt-4 flex justify-between items-center">
        <Typography variant="h6" fontSize={18} sx={{ color: "#1e285f" }}>
          Interpreting Languages
        </Typography>
        <Button variant="contained" color="primary">
          <Add /> Add Language
        </Button>
      </Paper>

      <Paper elevation={0} className="p-6 bg-white  mt-4 flex justify-between items-center">
        <Typography variant="h6" fontSize={18} sx={{ color: "#1e285f" }}>
          Translation & Multimedia Languages
        </Typography>
        <Button variant="contained" color="primary">
          <Add /> Add Language
        </Button>
      </Paper>

      <Paper elevation={0} className="p-6 mt-4 bg-white  flex justify-between items-center">
        <Typography variant="h6" fontSize={18} sx={{ color: "#1e285f", display: "flex", alignItems: "center", gap: 1 }}>
          Qualifications <InfoOutlined />
        </Typography>
        <Button variant="contained" color="primary">
          <Add /> Add Qualification
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
        <Button variant="contained" color="primary">
          <Add /> Add Language
        </Button>
      </Paper>

      <Paper elevation={0} className="p-6 bg-white  mt-4 flex justify-between items-center mb-6">
        <Typography variant="h6" fontSize={18} sx={{ color: "#1e285f" }}>
          Native Language
        </Typography>
        <Button variant="contained" color="primary">
          <Add /> Add Language
        </Button>
      </Paper>
    </ContentLayout>
  );
}