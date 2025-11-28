"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Paper,
  Typography,
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import ContentLayout from '@/components/staff/linguists/edit-section/ContentLayout';
import { InfoOutline } from '@mui/icons-material';

export default function PreferencesPage() {
  const router = useRouter();
  const [modeOfTransport, setModeOfTransport] = useState("");
  const [modeOfTransportError, setModeOfTransportError] = useState("");

  const handleSave = () => {
    if (!modeOfTransport) {
      setModeOfTransportError("Please select mode of transport, you cannot skip this field");
      return;
    }
    setModeOfTransportError("");
    console.log('Saving preferences data');
  };

  const handleCancel = () => {
    router.push(`/staff/linguists`);
  };

  return (
    <ContentLayout
      title="Preferences"
      onSave={handleSave}
      onCancel={handleCancel}
    >
      <Paper elevation={0} sx={{ p: 3, borderRadius: 2, bgcolor: "white"}}>
        <Typography
          variant="h6"
          sx={{
            fontSize: 18,
            fontWeight: 550,
            color: "#1e285f",
            borderBottom: "1px solid #e0e0e0",
            pb: 2,
            mb: 3,
          }}
        >
          Mode of transport
          <InfoOutline sx={{ ml: 1, color: '#757575', fontSize: 18 }} />
        </Typography>

        <Box>
          {/* Title + Star in same line */}
          <Box display="flex" alignItems="center" gap={0.5}>
            <Typography fontSize={14} fontWeight={500} color="#1e285f">
              Mode of transport
            </Typography>
            <Typography fontSize="small" sx={{ color: "#d32f2f" }} >*</Typography>
          </Box>
          <RadioGroup 
            row 
            sx={{ mt: 1, gap: 1 }}
            value={modeOfTransport}
            onChange={(e) => {
              setModeOfTransport(e.target.value);
              if (modeOfTransportError) {
                setModeOfTransportError("");
              }
            }}
          >
            <Box
              px={1}
              py={0.3}
              border="1px solid #e0e0e0"
              borderRadius={1.5}
              display="flex"
              alignItems="center"
            >
              <FormControlLabel
                value="car"
                control={<Radio sx={{ color: "#1e285f", '&.Mui-checked': { color: "#1e285f" } }} size="small" />}
                label={
                  <Box display="flex" alignItems="center" gap={0.3}>
                    <DirectionsCarIcon sx={{ fontSize: 14 }} />
                    <Typography sx={{ fontSize: 14 }}>Car</Typography>
                  </Box>
                }
              />
            </Box>

            <Box
              px={1}
              py={0.3}
              border="1px solid #e0e0e0"
              borderRadius={1.5}
              display="flex"
              alignItems="center"
            >
              <FormControlLabel
                value="public transport"
                control={<Radio sx={{ color: "#1e285f", '&.Mui-checked': { color: "#1e285f" } }} size="small" />}
                label={
                  <Box display="flex" alignItems="center" gap={0.3}>
                    <DirectionsBusIcon sx={{ fontSize: 14 }} />
                    <Typography sx={{ fontSize: 14 }}>Public Transport</Typography>
                  </Box>
                }
              />
            </Box>

            <Box
              px={1}
              py={0.3}
              border="1px solid #e0e0e0"
              borderRadius={1.5}
              display="flex"
              alignItems="center"
            >
              <FormControlLabel
                value="not provided"
                control={<Radio sx={{ color: "#1e285f", '&.Mui-checked': { color: "#1e285f" } }} size="small" />}
                label={
                  <Box display="flex" alignItems="center" gap={0.3}>
                    <ReportProblemIcon sx={{ fontSize: 14 }} />
                    <Typography sx={{ fontSize: 14 }}>Not Provided</Typography>
                  </Box>
                }
              />
            </Box>
          </RadioGroup>
          {modeOfTransportError && (
            <FormHelperText error sx={{ mt: 1, ml: 0 }}>
              {modeOfTransportError}
            </FormHelperText>
          )}


        </Box>
      </Paper>
    </ContentLayout>
  );
}
