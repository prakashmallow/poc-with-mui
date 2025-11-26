"use client";

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Box, Button, Link, List, ListItem, Typography } from '@mui/material';
import React from 'react';

interface BillingAddressImportSectionProps {
    clientName: string;
    uploadedFile: File | null;
    onBackToBillingAddressList: () => void;
    onImportFileHistory: () => void;
    onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onDrop: (event: React.DragEvent<HTMLDivElement>) => void;
    onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
    onDownloadSample: () => void;
    onImportSubmit: () => void;
}

const BillingAddressImportSection: React.FC<BillingAddressImportSectionProps> = ({
    clientName,
    uploadedFile,
    onBackToBillingAddressList,
    onImportFileHistory,
    onFileUpload,
    onDrop,
    onDragOver,
    onDownloadSample,
    onImportSubmit,
}) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
            {/* Header */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    p: 3,
                    bgcolor: '#f0efeb',
                    borderBottom: '1px solid #bec2b9',
                }}
            >
                <Typography variant="h5" sx={{ fontWeight: 600, color: '#1e285f' }}>
                    Billing Address - Import
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                        variant="outlined"
                        color="primary"
                        size="large"
                        className="bg-white"
                        onClick={onBackToBillingAddressList}
                    >
                        BACK TO BILLING ADDRESS LIST
                    </Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        size="large"
                        className="bg-white"
                        onClick={onImportFileHistory}
                    >
                        IMPORT FILE HISTORY
                    </Button>
                </Box>
            </Box>

            {/* Main Content */}
            <Box sx={{ flex: 1, overflow: 'hidden', p: 3, display: 'flex', gap: 4 }}>
                {/* Left Section - Instructions (Scrollable) */}
                <Box sx={{ flex: 1, overflow: 'auto', pr: 2 }}>
                    <Typography variant="body1" sx={{ mb: 3, color: 'text.primary', lineHeight: 1.6 }}>
                        A CSV or Excel file can be used to import the billing address. The first row should be the column name. The following columns are allowed:
                    </Typography>
                    <List sx={{ pl: 0 }}>
                        <ListItem sx={{ px: 0, py: 1.5, display: 'flex', alignItems: 'center' }}>
                            <Typography variant="body2" sx={{ fontWeight: 600, mr: 1 }}>
                                Billing Address Name
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                - E.g., "Billing Address 1" - Required
                            </Typography>
                        </ListItem>
                        <ListItem sx={{ px: 0, py: 1.5, display: 'flex', alignItems: 'center' }}>
                            <Typography variant="body2" sx={{ fontWeight: 600, mr: 1 }}>
                                Country Name
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                - E.g., "United Kingdom" - Required
                            </Typography>
                        </ListItem>
                        <ListItem sx={{ px: 0, py: 1.5, display: 'flex', alignItems: 'center' }}>
                            <Typography variant="body2" sx={{ fontWeight: 600, mr: 1 }}>
                                Postcode
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                - E.g., "YO26 6RW" - Required
                            </Typography>
                        </ListItem>
                        <ListItem sx={{ px: 0, py: 1.5, display: 'flex', alignItems: 'center' }}>
                            <Typography variant="body2" sx={{ fontWeight: 600, mr: 1 }}>
                                Address City
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                - E.g., "Manchester" - Required
                            </Typography>
                        </ListItem>
                        <ListItem sx={{ px: 0, py: 1.5, display: 'flex', alignItems: 'center' }}>
                            <Typography variant="body2" sx={{ fontWeight: 600, mr: 1 }}>
                                Address Line 1
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                - Required
                            </Typography>
                        </ListItem>
                        <ListItem sx={{ px: 0, py: 1.5, display: 'flex', alignItems: 'center' }}>
                            <Typography variant="body2" sx={{ fontWeight: 600, mr: 1 }}>
                                Address Line 2
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                - Optional
                            </Typography>
                        </ListItem>
                        <ListItem sx={{ px: 0, py: 1.5, display: 'flex', alignItems: 'center' }}>
                            <Typography variant="body2" sx={{ fontWeight: 600, mr: 1 }}>
                                Address Line 3
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                - Optional
                            </Typography>
                        </ListItem>
                    </List>
                </Box>

                {/* Right Section - File Upload (Fixed) */}
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="body2" sx={{ mb: 2, color: 'text.primary' }}>
                        You can use this sample EXCEL file{' '}
                        <Link
                            component="button"
                            onClick={onDownloadSample}
                            sx={{
                                color: 'primary.main',
                                textDecoration: 'none',
                                cursor: 'pointer',
                                fontWeight: 600,
                                '&:hover': { textDecoration: 'underline' },
                            }}
                        >
                            Download
                        </Link>
                    </Typography>
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: 'text.primary' }}>
                            For your notice,
                        </Typography>
                        <Typography variant="body2" component="ul" sx={{ pl: 2, color: 'text.secondary', m: 0 }}>
                            <li>Test your list before inserting</li>
                            <li>You will be able to edit these new Billing Addresses</li>
                        </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ mb: 2, color: 'text.primary' }}>
                        Upload the file here <Typography component="span" sx={{ color: 'error.main' }}>*</Typography>
                    </Typography>
                    <input
                        type="file"
                        accept=".csv,.xlsx,.xls"
                        onChange={onFileUpload}
                        style={{ display: 'none' }}
                        id="file-upload-input"
                    />
                    <Box
                        onClick={() => document.getElementById('file-upload-input')?.click()}
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                        sx={{
                            border: '2px dashed #d0d0d0',
                            borderRadius: 2,
                            p: 4,
                            textAlign: 'center',
                            bgcolor: '#fafafa',
                            cursor: 'pointer',
                            transition: 'all 0.3s',
                            '&:hover': {
                                borderColor: 'primary.main',
                                bgcolor: '#f5f5f5',
                            },
                        }}
                    >
                        <CloudUploadIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Click or drag file to this area to upload
                        </Typography>
                        {uploadedFile && (
                            <Typography variant="body2" sx={{ color: 'primary.main', mt: 2, fontWeight: 600 }}>
                                {uploadedFile.name}
                            </Typography>
                        )}
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            onClick={onImportSubmit}
                            disabled={!uploadedFile}
                            sx={{ textTransform: 'none' }}
                        >
                            Import
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default BillingAddressImportSection;

