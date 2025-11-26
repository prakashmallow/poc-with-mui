"use client";

import CloseIcon from '@mui/icons-material/Close';
import DescriptionIcon from '@mui/icons-material/Description';
import { Autocomplete, Box, Button, Dialog, DialogContent, DialogTitle, IconButton, TextField, Typography } from '@mui/material';
import React from 'react';

interface BillingAddressModalProps {
    open: boolean;
    formData: {
        name: string;
        country: string;
        postcode: string;
        city: string;
        addressLine1: string;
        addressLine2: string;
        addressLine3: string;
    };
    onClose: () => void;
    onSubmit: () => void;
    onFieldChange: (field: string, value: string) => void;
}

const BillingAddressModal: React.FC<BillingAddressModalProps> = ({
    open,
    formData,
    onClose,
    onSubmit,
    onFieldChange,
}) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 2,
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                    width: '410px',
                },
            }}
        >
            <DialogTitle
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    pb: 2,
                    borderBottom: '1px solid #e0e0e0',
                }}
            >
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e285f' }}>
                    Billing Address
                </Typography>
                <IconButton
                    onClick={onClose}
                    size="small"
                    sx={{ color: 'text.secondary' }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{ pt: 3 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 3 }}>
                    {/* Name Field */}
                    <TextField
                        fullWidth
                        label="Name"
                        required
                        value={formData.name}
                        onChange={(e) => onFieldChange('name', e.target.value)}
                        sx={{
                            '& .MuiInputLabel-root': { fontSize: '14px' },
                            '& .MuiInputBase-input': { fontSize: '14px' },
                        }}
                    />

                    {/* Country Field with Autocomplete */}
                    <Autocomplete
                        freeSolo
                        options={[]}
                        value={formData.country}
                        onInputChange={(event, newValue) => {
                            onFieldChange('country', newValue);
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Country"
                                required
                                placeholder="Enter more than 3 characters to search"
                                sx={{
                                    '& .MuiInputLabel-root': { fontSize: '14px' },
                                    '& .MuiInputBase-input': { fontSize: '14px' },
                                }}
                            />
                        )}
                    />

                    {/* Postcode Field */}
                    <TextField
                        fullWidth
                        label="Postcode"
                        required
                        value={formData.postcode}
                        onChange={(e) => onFieldChange('postcode', e.target.value)}
                        sx={{
                            '& .MuiInputLabel-root': { fontSize: '14px' },
                            '& .MuiInputBase-input': { fontSize: '14px' },
                        }}
                    />

                    {/* City Field with Autocomplete */}
                    <Autocomplete
                        freeSolo
                        options={[]}
                        value={formData.city}
                        onInputChange={(event, newValue) => {
                            onFieldChange('city', newValue);
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="City"
                                required
                                placeholder="Enter more than 3 characters to search"
                                sx={{
                                    '& .MuiInputLabel-root': { fontSize: '14px' },
                                    '& .MuiInputBase-input': { fontSize: '14px' },
                                }}
                            />
                        )}
                    />

                    {/* Address Line 1 */}
                    <TextField
                        fullWidth
                        label="Address Line 1"
                        required
                        value={formData.addressLine1}
                        onChange={(e) => onFieldChange('addressLine1', e.target.value)}
                        sx={{
                            '& .MuiInputLabel-root': { fontSize: '14px' },
                            '& .MuiInputBase-input': { fontSize: '14px' },
                        }}
                    />

                    {/* Address Line 2 */}
                    <TextField
                        fullWidth
                        label="Address Line 2"
                        required
                        value={formData.addressLine2}
                        onChange={(e) => onFieldChange('addressLine2', e.target.value)}
                        sx={{
                            '& .MuiInputLabel-root': { fontSize: '14px' },
                            '& .MuiInputBase-input': { fontSize: '14px' },
                        }}
                    />

                    {/* Address Line 3 */}
                    <TextField
                        fullWidth
                        label="Address Line 3"
                        required
                        value={formData.addressLine3}
                        onChange={(e) => onFieldChange('addressLine3', e.target.value)}
                        sx={{
                            '& .MuiInputLabel-root': { fontSize: '14px' },
                            '& .MuiInputBase-input': { fontSize: '14px' },
                        }}
                    />
                </Box>
            </DialogContent>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: 2,
                    p: 3,
                    borderTop: '1px solid #e0e0e0',
                }}
            >
                <Button
                    variant="outlined"
                    onClick={onClose}
                    startIcon={<CloseIcon />}
                    sx={{
                        textTransform: 'none',
                        borderColor: '#d0d0d0',
                        color: 'text.primary',
                        '&:hover': {
                            borderColor: '#b0b0b0',
                            backgroundColor: '#f5f5f5',
                        },
                    }}
                >
                    CANCEL
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={onSubmit}
                    startIcon={<DescriptionIcon />}
                    sx={{
                        textTransform: 'none',
                    }}
                >
                    SUBMIT
                </Button>
            </Box>
        </Dialog>
    );
};

export default BillingAddressModal;

