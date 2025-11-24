'use client';
import { forwardRef, useImperativeHandle, useMemo, useState } from 'react';

import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

const getDefaultFormValues = () => ({
    clientName: '',
    accountReference: '',
    activeStatus: '',
    type: 'prospect',
    services: [] as string[],
    sector: '',
    consortium: '',
    industry: '',
    contractNumber: '',
    providerSalesManager: '',
    providerAccountManager: '',
    telephoneProcess: '',
    tiAccessNumber: '',
    onDemandTi: '',
    country: ''
});

export type ClientListFilterValues = ReturnType<typeof getDefaultFormValues>;

export interface ClientListFilterHandle {
    resetFilters: () => void;
    getFilters: () => ClientListFilterValues;
}

const selectOptions = {
    activeStatus: [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' }
    ],
    type: [
        { label: 'Prospect', value: 'prospect' },
        { label: 'Client', value: 'client' }
    ],
    services: [
        { label: 'Translation', value: 'translation' },
        { label: 'Interpretation', value: 'interpretation' },
        { label: 'Localization', value: 'localization' }
    ],
    sector: [
        { label: 'Healthcare', value: 'healthcare' },
        { label: 'Government', value: 'government' },
        { label: 'Education', value: 'education' }
    ],
    consortium: [
        { label: 'Consortium A', value: 'consortium-a' },
        { label: 'Consortium B', value: 'consortium-b' }
    ],
    industry: [
        { label: 'Legal', value: 'legal' },
        { label: 'Technology', value: 'technology' },
        { label: 'Finance', value: 'finance' }
    ],
    telephoneProcess: [
        { label: 'Standard', value: 'standard' },
        { label: 'Priority', value: 'priority' }
    ],
    country: [
        { label: 'United States', value: 'usa' },
        { label: 'United Kingdom', value: 'uk' },
        { label: 'Canada', value: 'canada' }
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

    const formFields = useMemo(() => ([
        {
            label: 'Search with Name',
            field: 'clientName',
            placeholder: 'Enter Client Name to filter'
        },
        {
            label: 'Search with Prefix / Account Ref',
            field: 'accountReference',
            placeholder: 'Enter Prefix / Account Ref'
        },
        {
            label: 'Active',
            field: 'activeStatus',
            placeholder: 'Select Active status to filter',
            select: true,
            options: selectOptions.activeStatus
        },
        {
            label: 'Type',
            field: 'type',
            select: true,
            options: selectOptions.type
        },
        {
            label: 'Services',
            field: 'services',
            select: true,
            multiple: true,
            options: selectOptions.services
        },
        {
            label: 'Sector',
            field: 'sector',
            placeholder: 'Select sector to filter',
            select: true,
            options: selectOptions.sector
        },
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
            field: 'contractNumber',
            placeholder: 'Select Contract / Purchase Order Number'
        },
        {
            label: 'Provider Sales Manager',
            field: 'providerSalesManager',
            placeholder: 'Enter more than 3 characters'
        },
        {
            label: 'Provider Account Manager',
            field: 'providerAccountManager',
            placeholder: 'Enter more than 3 characters'
        },
        {
            label: 'Telephone Interpreting Process',
            field: 'telephoneProcess',
            placeholder: 'Select Telephone interpreting process',
            select: true,
            options: selectOptions.telephoneProcess
        },
        {
            label: 'TI Access Number',
            field: 'tiAccessNumber',
            placeholder: 'Enter Access Number'
        },
        {
            label: 'On Demand TI',
            field: 'onDemandTi',
            placeholder: 'Enter On Demand TI'
        },
        {
            label: 'Country',
            field: 'country',
            placeholder: 'Select Country',
            select: true,
            options: selectOptions.country
        },
        {
            label: 'Postcode',
            field: 'postcode',
        }
    ]), []);

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
                    gap: 2
                }}
            >
                {formFields.map((input) => (
                    <Box key={input.field}>
                        <TextField
                            fullWidth
                            label={input.label}
                            placeholder={input.placeholder}
                            value={formValues[input.field as keyof ClientListFilterValues]}
                            onChange={e => {
                                const nextValue = input.multiple
                                    ? (typeof e.target.value === 'string'
                                        ? e.target.value.split(',')
                                        : e.target.value)
                                    : e.target.value;
                                handleChange(input.field as keyof ClientListFilterValues, nextValue);
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
                    </Box>
                ))}
            </Box>
        </Box>
    );
});

ClientListFilter.displayName = 'ClientListFilter';

export default ClientListFilter;
