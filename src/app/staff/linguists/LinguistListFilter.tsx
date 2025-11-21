'use client';
import { Dayjs } from 'dayjs';
import { forwardRef, useImperativeHandle, useMemo, useState } from 'react';

import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const getDefaultFormValues = () => ({
    // Services section
    nativeLanguage: '',
    interpretingTo: '',
    translateFrom: '',
    translateTo: '',
    servicesTypes: '',
    // General section
    gender: '',
    profileStatus: '',
    internalNotesLatest: '',
    securityClearance: '',
    securityClearanceLevels: '',
    qualification: '',
    qualificationLevels: '',
    search: '',
    linguistAccountDeletion: '',
    profileCreatedStartDate: null as Dayjs | null,
    profileCreatedEndDate: null as Dayjs | null,
    // Locational section
    region: '',
    country: '',
    // Assigned To section
    assignedStatus: ''
});

export type LinguistListFilterValues = ReturnType<typeof getDefaultFormValues>;

export interface LinguistListFilterHandle {
    resetFilters: () => void;
    getFilters: () => LinguistListFilterValues;
}

const selectOptions = {
    nativeLanguage: [
        { label: 'English', value: 'english' },
        { label: 'Spanish', value: 'spanish' },
        { label: 'French', value: 'french' },
        { label: 'German', value: 'german' }
    ],
    interpretingTo: [
        { label: 'English', value: 'english' },
        { label: 'Spanish', value: 'spanish' },
        { label: 'French', value: 'french' }
    ],
    translateFrom: [
        { label: 'English', value: 'english' },
        { label: 'Spanish', value: 'spanish' },
        { label: 'French', value: 'french' }
    ],
    translateTo: [
        { label: 'English', value: 'english' },
        { label: 'Spanish', value: 'spanish' },
        { label: 'French', value: 'french' }
    ],
    servicesTypes: [
        { label: 'Translation', value: 'translation' },
        { label: 'Interpretation', value: 'interpretation' },
        { label: 'Localization', value: 'localization' }
    ],
    gender: [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
        { label: 'Other', value: 'other' }
    ],
    profileStatus: [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
        { label: 'Pending', value: 'pending' }
    ],
    internalNotesLatest: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
    ],
    securityClearance: [
        { label: 'Level 1', value: 'level1' },
        { label: 'Level 2', value: 'level2' },
        { label: 'Level 3', value: 'level3' }
    ],
    securityClearanceLevels: [
        { label: 'Basic', value: 'basic' },
        { label: 'Intermediate', value: 'intermediate' },
        { label: 'Advanced', value: 'advanced' }
    ],
    qualification: [
        { label: 'Certified', value: 'certified' },
        { label: 'Professional', value: 'professional' },
        { label: 'Expert', value: 'expert' }
    ],
    qualificationLevels: [
        { label: 'Beginner', value: 'beginner' },
        { label: 'Intermediate', value: 'intermediate' },
        { label: 'Advanced', value: 'advanced' }
    ],
    linguistAccountDeletion: [
        { label: 'Active', value: 'active' },
        { label: 'Deleted', value: 'deleted' }
    ],
    region: [
        { label: 'North America', value: 'north-america' },
        { label: 'Europe', value: 'europe' },
        { label: 'Asia', value: 'asia' }
    ],
    country: [
        { label: 'United States', value: 'usa' },
        { label: 'United Kingdom', value: 'uk' },
        { label: 'Canada', value: 'canada' }
    ],
    assignedStatus: [
        { label: 'Assigned', value: 'assigned' },
        { label: 'Unassigned', value: 'unassigned' },
        { label: 'Pending', value: 'pending' }
    ]
};

const LinguistListFilter = forwardRef<LinguistListFilterHandle>((_, ref) => {
    const [formValues, setFormValues] = useState<LinguistListFilterValues>(() => getDefaultFormValues());

    const handleChange = (field: keyof LinguistListFilterValues, value: any) => {
        setFormValues(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const resetFilters = () => setFormValues(getDefaultFormValues());

    const getFilters = () => formValues;

    useImperativeHandle(ref, () => ({
        resetFilters,
        getFilters
    }), [formValues]);

    type FieldInput = {
        label: string;
        field: keyof LinguistListFilterValues;
        placeholder?: string;
        select?: boolean;
        options?: Array<{ label: string; value: string }>;
        multiple?: boolean;
    };

    const servicesFields = useMemo<FieldInput[]>(() => ([
        {
            label: 'Native Language',
            field: 'nativeLanguage',
            select: true,
            options: selectOptions.nativeLanguage
        },
        {
            label: 'Interpreting To',
            field: 'interpretingTo',
            select: true,
            options: selectOptions.interpretingTo
        },
        {
            label: 'Translate From',
            field: 'translateFrom',
            select: true,
            options: selectOptions.translateFrom
        },
        {
            label: 'Translate To',
            field: 'translateTo',
            select: true,
            options: selectOptions.translateTo
        },
        {
            label: 'Services Types',
            field: 'servicesTypes',
            select: true,
            options: selectOptions.servicesTypes
        }
    ]), []);

    const generalFields = useMemo<FieldInput[]>(() => ([
        {
            label: 'Gender',
            field: 'gender',
            select: true,
            options: selectOptions.gender
        },
        {
            label: 'Profile Status',
            field: 'profileStatus',
            select: true,
            options: selectOptions.profileStatus
        },
        {
            label: 'Internal Notes - Latest',
            field: 'internalNotesLatest',
            select: true,
            options: selectOptions.internalNotesLatest
        },
        {
            label: 'Security Clearance',
            field: 'securityClearance',
            select: true,
            options: selectOptions.securityClearance
        },
        {
            label: 'Security Clearance Levels',
            field: 'securityClearanceLevels',
            select: true,
            options: selectOptions.securityClearanceLevels
        },
        {
            label: 'Qualification',
            field: 'qualification',
            select: true,
            options: selectOptions.qualification
        },
        {
            label: 'Qualification Levels',
            field: 'qualificationLevels',
            select: true,
            options: selectOptions.qualificationLevels
        },
        {
            label: 'Search',
            field: 'search',
            placeholder: 'Search by Name, Ref or M...'
        },
        {
            label: 'Linguist Account Deletion',
            field: 'linguistAccountDeletion',
            select: true,
            options: selectOptions.linguistAccountDeletion
        }
    ]), []);

    const locationalFields = useMemo<FieldInput[]>(() => ([
        {
            label: 'Region',
            field: 'region',
            select: true,
            options: selectOptions.region
        },
        {
            label: 'Country',
            field: 'country',
            select: true,
            options: selectOptions.country
        }
    ]), []);

    const assignedToFields = useMemo<FieldInput[]>(() => ([
        {
            label: 'Assigned Status',
            field: 'assignedStatus',
            select: true,
            options: selectOptions.assignedStatus
        }
    ]), []);

    const renderField = (input: FieldInput) => (
        <TextField
            fullWidth
            label={input.label}
            placeholder={input.placeholder}
            value={formValues[input.field]}
            onChange={e => {
                const nextValue = input.multiple
                    ? (typeof e.target.value === 'string'
                        ? e.target.value.split(',')
                        : e.target.value)
                    : e.target.value;
                handleChange(input.field, nextValue);
            }}
            select={Boolean(input.select)}
            SelectProps={{
                multiple: input.multiple
            }}
            sx={{
                '& .MuiInputBase-input': {
                    fontSize: '12px'
                },
                '& .MuiInputLabel-root': {
                    fontSize: '12px'
                },
                '& .MuiSelect-select': {
                    fontSize: '12px'
                }
            }}
        >
            {input.select && input.options?.map(option => (
                <MenuItem key={option.value} value={option.value} sx={{ fontSize: '12px' }}>
                    {option.label}
                </MenuItem>
            ))}
        </TextField>
    );

    return (
        <Box
            component="form"
            autoComplete="off"
            aria-label="linguist-filter-form"
            sx={{ minWidth: 600 }}
        >
            {/* Services Section */}
            <Box
                sx={{
                    mb: 4,
                    p: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1
                }}
            >
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, fontSize: '14px' }}>
                    Services
                </Typography>
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
                        gap: 2
                    }}
                >
                    {servicesFields.map((input) => (
                        <Box key={input.field}>
                            {renderField(input)}
                        </Box>
                    ))}
                </Box>
            </Box>

            {/* General Section */}
            <Box
                sx={{
                    mb: 4,
                    p: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1
                }}
            >
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, fontSize: '14px' }}>
                    General
                </Typography>
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
                        gap: 2,
                        mb: 2
                    }}
                >
                    {generalFields.map((input) => (
                        <Box key={input.field}>
                            {renderField(input)}
                        </Box>
                    ))}
                </Box>
                {/* Profile Created Date Range */}
                <Box sx={{
                    mt: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                    p: 2,
                }}>
                    <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 500, fontSize: '13px' }}>
                        Profile Created Date
                    </Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Box
                            sx={{
                                display: 'flex',
                                gap: 1,
                                alignItems: 'center',
                                width: '100%'
                            }}
                        >
                            <DatePicker
                                label="From"
                                value={formValues.profileCreatedStartDate}
                                onChange={(newValue) => handleChange('profileCreatedStartDate', newValue)}
                                slotProps={{
                                    textField: {
                                        sx: {
                                            flex: 1,
                                            '& .MuiInputBase-input': {
                                                fontSize: '12px'
                                            },
                                            '& .MuiInputLabel-root': {
                                                fontSize: '12px'
                                            }
                                        }
                                    }
                                }}
                            />
                            <Box sx={{ px: 1, fontSize: '12px', color: 'text.secondary' }}>→</Box>
                            <DatePicker
                                label="To"
                                value={formValues.profileCreatedEndDate}
                                onChange={(newValue) => handleChange('profileCreatedEndDate', newValue)}
                                slotProps={{
                                    textField: {
                                        sx: {
                                            flex: 1,
                                            '& .MuiInputBase-input': {
                                                fontSize: '12px'
                                            },
                                            '& .MuiInputLabel-root': {
                                                fontSize: '12px'
                                            }
                                        }
                                    }
                                }}
                            />
                        </Box>
                    </LocalizationProvider>
                </Box>
            </Box>

            {/* Locational Section */}
            <Box
                sx={{
                    mb: 4,
                    p: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1
                }}
            >
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, fontSize: '14px' }}>
                    Locational
                </Typography>
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
                        gap: 2
                    }}
                >
                    {locationalFields.map((input) => (
                        <Box key={input.field}>
                            {renderField(input)}
                        </Box>
                    ))}
                </Box>
            </Box>

            {/* Assigned To Section */}
            <Box
                sx={{
                    p: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1
                }}
            >
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, fontSize: '14px' }}>
                    Assigned To
                </Typography>
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
                        gap: 2
                    }}
                >
                    {assignedToFields.map((input) => (
                        <Box key={input.field}>
                            {renderField(input)}
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
});

LinguistListFilter.displayName = 'LinguistListFilter';

export default LinguistListFilter;
