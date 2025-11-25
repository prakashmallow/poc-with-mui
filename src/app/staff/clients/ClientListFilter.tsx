'use client';
import { forwardRef, useImperativeHandle, useMemo, useState } from 'react';

import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

const getDefaultFormValues = () => ({
    // Row 1
    searchWithName: '',
    searchWithPrefixAccountRef: '',
    active: '',
    // Row 2
    type: '',
    services: '',
    sector: '',
    // Row 3
    consortium: '',
    industry: '',
    contractPurchaseOrderNumber: '',
    // Row 4
    providerSalesManager: '',
    providerAccountManager: '',
    telephoneInterpretingProcess: '',
    // Row 5
    tiAccessNumber: '',
    onDemandTI: '',
    country: ''
});

export type ClientListFilterValues = ReturnType<typeof getDefaultFormValues>;

export interface ClientListFilterHandle {
    resetFilters: () => void;
    getFilters: () => ClientListFilterValues;
}

const selectOptions = {
    active: [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' }
    ],
    type: [
        { label: 'Type 1', value: 'type1' },
        { label: 'Type 2', value: 'type2' },
        { label: 'Type 3', value: 'type3' }
    ],
    services: [
        { label: 'Translation', value: 'translation' },
        { label: 'Interpretation', value: 'interpretation' },
        { label: 'Localization', value: 'localization' }
    ],
    sector: [
        { label: 'Healthcare', value: 'healthcare' },
        { label: 'Legal', value: 'legal' },
        { label: 'Business', value: 'business' },
        { label: 'Government', value: 'government' }
    ],
    consortium: [
        { label: 'Consortium 1', value: 'consortium1' },
        { label: 'Consortium 2', value: 'consortium2' },
        { label: 'Consortium 3', value: 'consortium3' }
    ],
    industry: [
        { label: 'Healthcare', value: 'healthcare' },
        { label: 'Legal', value: 'legal' },
        { label: 'Finance', value: 'finance' },
        { label: 'Technology', value: 'technology' }
    ],
    telephoneInterpretingProcess: [
        { label: 'Process 1', value: 'process1' },
        { label: 'Process 2', value: 'process2' },
        { label: 'Process 3', value: 'process3' }
    ],
    onDemandTI: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
    ]
};

const ClientListFilter = forwardRef<ClientListFilterHandle>((_, ref) => {
    const [formValues, setFormValues] = useState<ClientListFilterValues>(() => getDefaultFormValues());

    const handleChange = (field: keyof ClientListFilterValues, value: any) => {
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
        field: keyof ClientListFilterValues;
        placeholder?: string;
        select?: boolean;
        options?: Array<{ label: string; value: string }>;
        autocomplete?: boolean;
    };

    const filterFields = useMemo<FieldInput[]>(() => ([
        // Row 1
        {
            label: 'Search with Name',
            field: 'searchWithName',
            placeholder: 'Enter Client Name to filter'
        },
        {
            label: 'Search with Prefix / Account Ref',
            field: 'searchWithPrefixAccountRef',
            placeholder: 'Enter Prefix / Account Ref...'
        },
        {
            label: 'Active',
            field: 'active',
            placeholder: 'Select Active status to filt...',
            select: true,
            options: selectOptions.active
        },
        // Row 2
        {
            label: 'Type',
            field: 'type',
            placeholder: 'Select type to filter',
            select: true,
            options: selectOptions.type
        },
        {
            label: 'Services',
            field: 'services',
            placeholder: 'Select services to filter',
            select: true,
            options: selectOptions.services
        },
        {
            label: 'Sector',
            field: 'sector',
            placeholder: 'Select sector to filter',
            select: true,
            options: selectOptions.sector
        },
        // Row 3
        {
            label: 'Consortium',
            field: 'consortium',
            placeholder: 'Select consortium to filter',
            select: true,
            options: selectOptions.consortium
        },
        {
            label: 'Industry',
            field: 'industry',
            placeholder: 'Select Industry to search',
            select: true,
            options: selectOptions.industry
        },
        {
            label: 'Contract / Purchase Order Number',
            field: 'contractPurchaseOrderNumber',
            placeholder: 'Select Contract / Purchase ...'
        },
        // Row 4
        {
            label: 'Provider Sales Manager',
            field: 'providerSalesManager',
            placeholder: 'Enter more than 3 charac...',
            autocomplete: true
        },
        {
            label: 'Provider Account Manager',
            field: 'providerAccountManager',
            placeholder: 'Enter more than 3 charac...',
            autocomplete: true
        },
        {
            label: 'Telephone Interpreting Process',
            field: 'telephoneInterpretingProcess',
            placeholder: 'Select Telephone interpre...',
            select: true,
            options: selectOptions.telephoneInterpretingProcess
        },
        // Row 5
        {
            label: 'TI Access Number',
            field: 'tiAccessNumber',
            placeholder: 'Select TI Access number to ...'
        },
        {
            label: 'On Demand TI',
            field: 'onDemandTI',
            placeholder: 'Select On Demand Tl to fi...',
            select: true,
            options: selectOptions.onDemandTI
        },
        {
            label: 'Country',
            field: 'country',
            placeholder: 'Enter more than 3 charac...',
            autocomplete: true
        }
    ]), []);

    const renderField = (input: FieldInput) => (
        <TextField
            fullWidth
            label={input.label}
            placeholder={input.placeholder}
            value={formValues[input.field]}
            onChange={e => {
                handleChange(input.field, e.target.value);
            }}
            select={Boolean(input.select)}
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
            InputProps={input.autocomplete ? {
                endAdornment: <i className="da da-chevron-down" style={{ cursor: 'pointer' }} />
            } : undefined}
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
            aria-label="client-filter-form"
            sx={{ minWidth: 600 }}
        >
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
                    gap: 2,
                    mb: 3
                }}
            >
                {filterFields.map((input) => (
                    <Box key={input.field}>
                        {renderField(input)}
                    </Box>
                ))}
            </Box>
        </Box>
    );
});

ClientListFilter.displayName = 'ClientListFilter';

export default ClientListFilter;

