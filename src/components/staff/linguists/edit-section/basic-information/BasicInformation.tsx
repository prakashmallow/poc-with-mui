"use client";

import React, { useEffect, useImperativeHandle, forwardRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
  FormHelperText,
} from '@mui/material';
import {
  Info as InfoIcon,
} from '@mui/icons-material';
import PhotoUpload from './PhotoUpload';
import { basicInformationSchema, BasicInformationFormData } from '../schemas/basicInformationSchema';

export interface BasicInformationRef {
  validate: () => Promise<boolean>;
}

interface BasicInformationProps {
  formData: Omit<BasicInformationFormData, 'photo'>;
  onFieldChange: (field: keyof Omit<BasicInformationFormData, 'photo'>, value: string) => void;
  photo?: File | null;
  onPhotoChange?: (file: File | null) => void;
}

const BasicInformation = forwardRef<BasicInformationRef, BasicInformationProps>(({ 
  formData, 
  onFieldChange, 
  photo,
  onPhotoChange
}, ref) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
  } = useForm<BasicInformationFormData>({
    resolver: zodResolver(basicInformationSchema),
    defaultValues: {
      ...formData,
      photo: photo || null,
    },
    mode: 'onChange',
  });

  // Sync form data with external state
  useEffect(() => {
    Object.keys(formData).forEach((key) => {
      const field = key as keyof typeof formData;
      setValue(field, formData[field]);
    });
  }, [formData, setValue]);

  // Sync photo
  useEffect(() => {
    setValue('photo', photo || null);
  }, [photo, setValue]);

  // Expose validation function to parent via ref
  useImperativeHandle(ref, () => ({
    validate: async () => {
      const isValid = await trigger();
      return isValid;
    },
  }));

  const handleFieldChange = (field: keyof Omit<BasicInformationFormData, 'photo'>, value: string) => {
    setValue(field, value);
    onFieldChange(field, value);
    trigger(field);
  };

  const handlePhotoChange = (file: File | null) => {
    setValue('photo', file);
    trigger('photo');
    onPhotoChange?.(file);
  };
  return (
    <Paper elevation={0} sx={{ p: 4, borderRadius: 2, bgcolor: 'white' }}>
      <Typography variant='h6' fontSize={18} sx={{ mb: 3, fontWeight: 600, color: '#1e285f' }}>
        Tell us about you
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' }, gap: 4 }}>
        {/* Left Column - Form Fields */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Title, Forename, Surname */}
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 2.1fr 2.1fr', gap: 2 }}>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth size="small">
                  <InputLabel>Title</InputLabel>
                  <Select
                    {...field}
                    label="Title"
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      handleFieldChange('title', e.target.value);
                    }}
                  >
                    <MenuItem value="Mr">Mr</MenuItem>
                    <MenuItem value="Mrs">Mrs</MenuItem>
                    <MenuItem value="Ms">Ms</MenuItem>
                    <MenuItem value="Miss">Miss</MenuItem>
                    <MenuItem value="Dr">Dr</MenuItem>
                  </Select>
                </FormControl>
              )}
            />

            <Controller
              name="forename"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  size="small"
                  label="Forename"
                  required
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    handleFieldChange('forename', e.target.value);
                  }}
                  error={!!errors.forename}
                  helperText={errors.forename?.message}
                />
              )}
            />

            <Controller
              name="surname"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  size="small"
                  label="Surname"
                  required
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    handleFieldChange('surname', e.target.value);
                  }}
                  error={!!errors.surname}
                  helperText={errors.surname?.message}
                />
              )}
            />
          </Box>

          {/* Date of Birth and Country of Birth */}
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            <Controller
              name="dateOfBirth"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  size="small"
                  label="Date of birth"
                  required
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    handleFieldChange('dateOfBirth', e.target.value);
                  }}
                  error={!!errors.dateOfBirth}
                  helperText={errors.dateOfBirth?.message}
                />
              )}
            />

            <Controller
              name="countryOfBirth"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth size="small" error={!!errors.countryOfBirth}>
                  <InputLabel>Country of birth *</InputLabel>
                  <Select
                    {...field}
                    label="Country of birth *"
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      handleFieldChange('countryOfBirth', e.target.value);
                    }}
                  >
                    <MenuItem value="Spain">Spain</MenuItem>
                    <MenuItem value="UK">United Kingdom</MenuItem>
                    <MenuItem value="France">France</MenuItem>
                    <MenuItem value="Germany">Germany</MenuItem>
                    <MenuItem value="Italy">Italy</MenuItem>
                    <MenuItem value="India">India</MenuItem>
                    <MenuItem value="USA">United States</MenuItem>
                  </Select>
                  {errors.countryOfBirth && <FormHelperText>{errors.countryOfBirth.message}</FormHelperText>}
                </FormControl>
              )}
            />
          </Box>

          {/* Gender */}
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth size="small" error={!!errors.gender}>
                <InputLabel>Gender *</InputLabel>
                <Select
                  {...field}
                  label="Gender *"
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    handleFieldChange('gender', e.target.value);
                  }}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                  <MenuItem value="Prefer not to say">Prefer not to say</MenuItem>
                </Select>
                {errors.gender && <FormHelperText>{errors.gender.message}</FormHelperText>}
              </FormControl>
            )}
          />

          {/* Employment Status */}
          <Controller
            name="employmentStatus"
            control={control}
            render={({ field }) => (
              <Box>
                <FormLabel component="legend" sx={{ mb: 2, fontWeight: 500, color: '#1e285f' }}>
                  Select your employment status *
                </FormLabel>
                <RadioGroup
                  {...field}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    handleFieldChange('employmentStatus', e.target.value);
                  }}
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
                {errors.employmentStatus && (
                  <FormHelperText error sx={{ mt: 0.5, ml: 0 }}>
                    {errors.employmentStatus.message}
                  </FormHelperText>
                )}
              </Box>
            )}
          />

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
          <Controller
            name="photo"
            control={control}
            render={({ field }) => (
              <Box>
                <PhotoUpload 
                  photo={photo}
                  onPhotoChange={handlePhotoChange}
                  error={errors.photo?.message}
                />
              </Box>
            )}
          />
        </Box>
      </Box>
    </Paper>
  );
});

BasicInformation.displayName = 'BasicInformation';

export default BasicInformation;

