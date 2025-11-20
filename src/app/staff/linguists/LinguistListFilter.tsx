'use client';
import React, { useState } from 'react';

import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const LinguistListFilter: React.FC<any> = () => {
    const [formValues, setFormValues] = useState({
        country: '',
        languages: []
    });

    const handleChange = (field: string, value: any) => {
        setFormValues(prev => ({
            ...prev,
            [field]: value
        }));
    };

    return (
        <form
            autoComplete="off"
            aria-label="linguist-filter-form"
        >
            <div className='p-5'>

                {/* Single Select */}
                <TextField
                    select
                    fullWidth
                    margin="normal"
                    label="Select Country"
                    value={formValues.country}
                    onChange={e => handleChange('country', e.target.value)}
                >
                    <MenuItem value="usa">USA</MenuItem>
                    <MenuItem value="uk">United Kingdom</MenuItem>
                    <MenuItem value="canada">Canada</MenuItem>
                </TextField>

                {/* Multi Select */}
                <TextField
                    select
                    fullWidth
                    margin="normal"
                    label="Select Languages"
                    SelectProps={{ multiple: true }}
                    value={formValues.languages}
                    onChange={e => handleChange('languages', e.target.value)}
                >
                    <MenuItem value="english">English</MenuItem>
                    <MenuItem value="spanish">Spanish</MenuItem>
                    <MenuItem value="german">German</MenuItem>
                </TextField>

            </div>
        </form>
    );
};

export default LinguistListFilter;
