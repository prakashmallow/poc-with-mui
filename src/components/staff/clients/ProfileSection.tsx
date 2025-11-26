"use client";

import { Box, Checkbox, Chip, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Select, Switch, TextField } from '@mui/material';
import React from 'react';
import SectionHeader from './SectionHeader';

interface ProfileSectionProps {
    formData: any;
    onFieldChange: (field: string, value: any) => void;
    onMultiSelectChange: (field: string, value: string[]) => void;
    onChipDelete: (field: string, chipToDelete: string) => void;
    onCancel: () => void;
    onUpdate: () => void;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({
    formData,
    onFieldChange,
    onMultiSelectChange,
    onChipDelete,
    onCancel,
    onUpdate,
}) => {
    const inputFontSize = { fontSize: '12px' };
    const inputSx = {
        ...inputFontSize,
        '& .MuiInputBase-input': inputFontSize,
        '& .MuiInputLabel-root': inputFontSize,
        '& .MuiSelect-select': inputFontSize,
        '& .MuiMenuItem-root': inputFontSize,
        '& .MuiChip-label': inputFontSize,
        '& .MuiFormLabel-root': inputFontSize,
        '& .MuiFormControlLabel-label': inputFontSize,
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
            {/* Fixed Profile Header */}
            <SectionHeader
                title="Profile"
                onCancel={onCancel}
                onUpdate={onUpdate}
            />
            {/* Scrollable Content Area */}
            <Box sx={{ flex: 1, overflow: 'auto', p: 3 }}>
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 3, }}>
                    {/* Left Column */}
                    <Box>
                        <FormControl fullWidth sx={{ mb: 2, ...inputSx }}>
                            <InputLabel>Account Status *</InputLabel>
                            <Select
                                value={formData.accountStatus}
                                label="Account Status *"
                                onChange={(e) => onFieldChange('accountStatus', e.target.value)}
                            >
                                <MenuItem value="Suspended">Suspended</MenuItem>
                                <MenuItem value="Active">Active</MenuItem>
                                <MenuItem value="Inactive">Inactive</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl fullWidth sx={{ mb: 2, ...inputSx }}>
                            <InputLabel>Suspension Type *</InputLabel>
                            <Select
                                value={formData.suspensionType}
                                label="Suspension Type *"
                                onChange={(e) => onFieldChange('suspensionType', e.target.value)}
                            >
                                <MenuItem value="General">General</MenuItem>
                                <MenuItem value="Temporary">Temporary</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            fullWidth
                            label="Name *"
                            value={formData.name}
                            onChange={(e) => onFieldChange('name', e.target.value)}
                            sx={{ mb: 2, ...inputSx }}
                        />

                        <TextField
                            fullWidth
                            label="Prefix / Accounts Ref *"
                            value={formData.prefixAccountRef}
                            onChange={(e) => onFieldChange('prefixAccountRef', e.target.value)}
                            sx={{ mb: 2, ...inputSx }}
                        />

                        <FormControl fullWidth sx={{ mb: 2, ...inputSx }}>
                            <InputLabel>Type *</InputLabel>
                            <Select
                                value={formData.type}
                                label="Type *"
                                onChange={(e) => onFieldChange('type', e.target.value)}
                            >
                                <MenuItem value="Prospect">Prospect</MenuItem>
                                <MenuItem value="Client">Client</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            fullWidth
                            label="Default Rate (Pence per min) *"
                            value={formData.defaultRate}
                            onChange={(e) => onFieldChange('defaultRate', e.target.value)}
                            sx={{ mb: 2, ...inputSx }}
                        />

                        <FormControl fullWidth sx={{ mb: 2, ...inputSx }}>
                            <InputLabel>Sector *</InputLabel>
                            <Select
                                value={formData.sector}
                                label="Sector *"
                                onChange={(e) => onFieldChange('sector', e.target.value)}
                            >
                                <MenuItem value="Public Sector">Public Sector</MenuItem>
                                <MenuItem value="Private Sector">Private Sector</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            fullWidth
                            label="Contract / Purchase Order Number"
                            value={formData.contractPurchaseOrderNumber}
                            onChange={(e) => onFieldChange('contractPurchaseOrderNumber', e.target.value)}
                            sx={{ mb: 2, ...inputSx }}
                        />

                        <FormControl fullWidth sx={{ mb: 2, ...inputSx }}>
                            <InputLabel>Consortium *</InputLabel>
                            <Select
                                value={formData.consortium}
                                label="Consortium *"
                                onChange={(e) => onFieldChange('consortium', e.target.value)}
                            >
                                <MenuItem value="South West Police">South West Police</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                            </Select>
                        </FormControl>

                        <Box sx={{ mb: 2, ...inputSx }}>
                            <FormLabel component="legend" sx={{ mb: 1, fontSize: '12px', color: 'text.primary' }}>
                                VRI Configurations
                            </FormLabel>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={formData.vriLiveSupport}
                                        onChange={(e) => onFieldChange('vriLiveSupport', e.target.checked)}
                                        color="success"
                                    />
                                }
                                label="Live support : VRI Live Support"
                            />
                        </Box>
                    </Box>

                    {/* Middle Column */}
                    <Box>
                        <FormControl fullWidth sx={{ mb: 2, ...inputSx }}>
                            <InputLabel>Industry *</InputLabel>
                            <Select
                                value={formData.industry}
                                label="Industry *"
                                onChange={(e) => onFieldChange('industry', e.target.value)}
                            >
                                <MenuItem value="Central Government (e.g. Digital Cabinet Office, ...)">Central Government (e.g. Digital Cabinet Office, ...)</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl fullWidth sx={{ mb: 2, ...inputSx }}>
                            <InputLabel>Appointment Type Category *</InputLabel>
                            <Select
                                value={formData.appointmentTypeCategory}
                                label="Appointment Type Category *"
                                onChange={(e) => onFieldChange('appointmentTypeCategory', e.target.value)}
                            >
                                <MenuItem value="Adhoc">Adhoc</MenuItem>
                                <MenuItem value="Scheduled">Scheduled</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl fullWidth sx={{ mb: 2, ...inputSx }}>
                            <InputLabel>Available Services *</InputLabel>
                            <Select
                                multiple
                                value={formData.availableServices}
                                label="Available Services *"
                                onChange={(e) => onMultiSelectChange('availableServices', e.target.value as string[])}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {(selected as string[]).map((value) => (
                                            <Chip
                                                key={value}
                                                label={value}
                                                onDelete={() => onChipDelete('availableServices', value)}
                                                size="small"
                                            />
                                        ))}
                                    </Box>
                                )}
                            >
                                <MenuItem value="Translation / Transcription">Translation / Transcription</MenuItem>
                                <MenuItem value="Telephone interpreting">Telephone interpreting</MenuItem>
                                <MenuItem value="Interpreting">Interpreting</MenuItem>
                                <MenuItem value="Video remote interpreting">Video remote interpreting</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl fullWidth sx={{ mb: 2, ...inputSx }}>
                            <InputLabel>Default Interpreter type *</InputLabel>
                            <Select
                                value={formData.defaultInterpreterType}
                                label="Default Interpreter type *"
                                onChange={(e) => onFieldChange('defaultInterpreterType', e.target.value)}
                            >
                                <MenuItem value="Trainee Sign Language Interpreters (TSLI)">Trainee Sign Language Interpreters (TSLI)</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl fullWidth sx={{ mb: 2, ...inputSx }}>
                            <InputLabel>Language Type *</InputLabel>
                            <Select
                                multiple
                                value={formData.languageType}
                                label="Language Type *"
                                onChange={(e) => onMultiSelectChange('languageType', e.target.value as string[])}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {(selected as string[]).map((value) => (
                                            <Chip
                                                key={value}
                                                label={value}
                                                onDelete={() => onChipDelete('languageType', value)}
                                                size="small"
                                            />
                                        ))}
                                    </Box>
                                )}
                            >
                                <MenuItem value="Sign">Sign</MenuItem>
                                <MenuItem value="Spoken">Spoken</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl fullWidth sx={{ mb: 2, ...inputSx }}>
                            <InputLabel>Telephone Interpreting Process *</InputLabel>
                            <Select
                                value={formData.telephoneInterpretingProcess}
                                label="Telephone Interpreting Process *"
                                onChange={(e) => onFieldChange('telephoneInterpretingProcess', e.target.value)}
                            >
                                <MenuItem value="Automation">Automation</MenuItem>
                                <MenuItem value="Manual">Manual</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            fullWidth
                            label="TI Access Number *"
                            value={formData.tiAccessNumber}
                            onChange={(e) => onFieldChange('tiAccessNumber', e.target.value)}
                            sx={{ mb: 2, ...inputSx }}
                        />

                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={formData.onDemandTIOnly}
                                    onChange={(e) => onFieldChange('onDemandTIOnly', e.target.checked)}
                                />
                            }
                            label="On Demand TI only"
                            sx={{ mb: 2, ...inputSx }}
                        />

                        <TextField
                            fullWidth
                            label="Client Master Email"
                            value={formData.clientMasterEmail}
                            onChange={(e) => onFieldChange('clientMasterEmail', e.target.value)}
                            sx={{ mb: 2, ...inputSx }}
                        />

                        <TextField
                            fullWidth
                            label="Translation / Transcription Service Email *"
                            value={formData.translationTranscriptionServiceEmail}
                            onChange={(e) => onFieldChange('translationTranscriptionServiceEmail', e.target.value)}
                            sx={{ mb: 2, ...inputSx }}
                        />
                    </Box>

                    {/* Right Column */}
                    <Box>
                        <TextField
                            fullWidth
                            label="Spoken Interpreting Service Email *"
                            value={formData.spokenInterpretingServiceEmail}
                            onChange={(e) => onFieldChange('spokenInterpretingServiceEmail', e.target.value)}
                            sx={{ mb: 2, ...inputSx }}
                        />

                        <TextField
                            fullWidth
                            label="Non Spoken Interpreting Service Email *"
                            value={formData.nonSpokenInterpretingServiceEmail}
                            onChange={(e) => onFieldChange('nonSpokenInterpretingServiceEmail', e.target.value)}
                            sx={{ mb: 2, ...inputSx }}
                        />

                        <FormControl fullWidth sx={{ mb: 2, ...inputSx }}>
                            <InputLabel>Provider Sales Manager</InputLabel>
                            <Select
                                value={formData.providerSalesManager}
                                label="Provider Sales Manager"
                                onChange={(e) => onFieldChange('providerSalesManager', e.target.value)}
                            >
                                <MenuItem value="Anxxxxxxxx Samxxxx">Anxxxxxxxx Samxxxx</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl fullWidth sx={{ mb: 2, ...inputSx }}>
                            <InputLabel>Provider Account Manager</InputLabel>
                            <Select
                                value={formData.providerAccountManager}
                                label="Provider Account Manager"
                                onChange={(e) => onFieldChange('providerAccountManager', e.target.value)}
                            >
                                <MenuItem value="Vixxx Ramxxxx">Vixxx Ramxxxx</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl fullWidth sx={{ mb: 2, ...inputSx }}>
                            <InputLabel>Country</InputLabel>
                            <Select
                                value={formData.country}
                                label="Country"
                                onChange={(e) => onFieldChange('country', e.target.value)}
                            >
                                <MenuItem value="India">India</MenuItem>
                                <MenuItem value="UK">UK</MenuItem>
                                <MenuItem value="USA">USA</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            fullWidth
                            label="Postcode"
                            value={formData.postcode}
                            onChange={(e) => onFieldChange('postcode', e.target.value)}
                            sx={{ mb: 2, ...inputSx }}
                        />

                        <TextField
                            fullWidth
                            label="Location"
                            value={formData.location}
                            onChange={(e) => onFieldChange('location', e.target.value)}
                            sx={{ mb: 2, ...inputSx }}
                        />

                        <TextField
                            fullWidth
                            label="Main Telephone"
                            value={formData.mainTelephone}
                            onChange={(e) => onFieldChange('mainTelephone', e.target.value)}
                            sx={{ mb: 2, ...inputSx }}
                        />
                    </Box>
                </Box>
                <TextField
                    fullWidth
                    label="Notes"
                    value={formData.notes}
                    onChange={(e) => onFieldChange('notes', e.target.value)}
                    multiline
                    rows={4}
                    sx={{ ...inputSx }}
                />
            </Box>
        </Box>
    );
};

export default ProfileSection;

