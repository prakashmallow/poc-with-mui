"use client";

import React from 'react';
import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Typography,
  Paper,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Info as InfoIcon,
} from '@mui/icons-material';
import PhotoUpload from './PhotoUpload';

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

interface BasicInformationProps {
  formData: FormData;
  onFieldChange: (field: keyof FormData, value: string) => void;
}

const BasicInformation: React.FC<BasicInformationProps> = ({ formData, onFieldChange }) => {
  return (
    <Paper elevation={0} sx={{ p: 4, borderRadius: 2, bgcolor: 'white' }}>
      <Typography variant='h6' fontSize={18} sx={{ mb: 3, fontWeight: 600, color: '#1e285f' }}>
        Tell us about you
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' }, gap: 4 }}>
        {/* Left Column - Form Fields */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Title, Forename, Surname */}
          <Box sx={{ display: 'grid', gridTemplateColumns: '2.1fr 1fr 1fr', gap: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Title</InputLabel>
              <Select
                value={formData.title}
                label="Title"
                onChange={(e) => onFieldChange('title', e.target.value)}
              >
                <MenuItem value="Mr">Mr</MenuItem>
                <MenuItem value="Mrs">Mrs</MenuItem>
                <MenuItem value="Ms">Ms</MenuItem>
                <MenuItem value="Miss">Miss</MenuItem>
                <MenuItem value="Dr">Dr</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              size="small"
              label="Forename"
              required
              value={formData.forename}
              onChange={(e) => onFieldChange('forename', e.target.value)}
            />

            <TextField
              fullWidth
              size="small"
              label="Surname"
              required
              value={formData.surname}
              onChange={(e) => onFieldChange('surname', e.target.value)}
            />
          </Box>

          {/* Date of Birth and Country of Birth */}
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            <TextField
              fullWidth
              size="small"
              label="Date of birth"
              required
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => onFieldChange('dateOfBirth', e.target.value)}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                endAdornment: (
                  <Tooltip title="Date format: DD/MM/YYYY">
                    <IconButton size="small">
                      <InfoIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                ),
              }}
            />

            <FormControl fullWidth size="small">
              <InputLabel>Country of birth *</InputLabel>
              <Select
                value={formData.countryOfBirth}
                label="Country of birth *"
                onChange={(e) => onFieldChange('countryOfBirth', e.target.value)}
              >
                <MenuItem value="Spain">Spain</MenuItem>
                <MenuItem value="UK">United Kingdom</MenuItem>
                <MenuItem value="France">France</MenuItem>
                <MenuItem value="Germany">Germany</MenuItem>
                <MenuItem value="Italy">Italy</MenuItem>
                <MenuItem value="India">India</MenuItem>
                <MenuItem value="USA">United States</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Gender */}
          <FormControl fullWidth size="small">
            <InputLabel>Gender *</InputLabel>
            <Select
              value={formData.gender}
              label="Gender *"
              onChange={(e) => onFieldChange('gender', e.target.value)}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
              <MenuItem value="Prefer not to say">Prefer not to say</MenuItem>
            </Select>
          </FormControl>

          {/* Employment Status */}
          <Box>
            <FormLabel component="legend" sx={{ mb: 2, fontWeight: 500, color: '#1e285f' }}>
              Select your employment status *
            </FormLabel>
            <RadioGroup
              value={formData.employmentStatus}
              onChange={(e) => onFieldChange('employmentStatus', e.target.value)}
            >
              <FormControlLabel
                value="Agency"
                control={<Radio />}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2">Agency</Typography>
                    <Tooltip title="Employment through an agency">
                      <InfoIcon fontSize="small" sx={{ color: '#9e9e9e' }} />
                    </Tooltip>
                  </Box>
                }
              />
              <FormControlLabel
                value="Personal Services Company (PSC)"
                control={<Radio />}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2">Personal Services Company (PSC)</Typography>
                    <Tooltip title="Operating through your own limited company">
                      <InfoIcon fontSize="small" sx={{ color: '#9e9e9e' }} />
                    </Tooltip>
                  </Box>
                }
              />
              <FormControlLabel
                value="Sole Trader"
                control={<Radio />}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2">Sole Trader</Typography>
                    <Tooltip title="Self-employed individual">
                      <InfoIcon fontSize="small" sx={{ color: '#9e9e9e' }} />
                    </Tooltip>
                  </Box>
                }
              />
            </RadioGroup>
          </Box>

          {/* VAT Registration */}
          <Box>
            <FormLabel component="legend" sx={{ mb: 2, fontWeight: 500, color: '#1e285f', fontSize: 14 }}>
              Are you VAT registered ?
            </FormLabel>
            <RadioGroup
              row
              value={formData.vatRegistered}
              onChange={(e) => onFieldChange('vatRegistered', e.target.value)}
            >
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </Box>
        </Box>

        {/* Right Column - Photo Upload */}
        <Box>
          <PhotoUpload />
        </Box>
      </Box>
    </Paper>
  );
};

export default BasicInformation;

