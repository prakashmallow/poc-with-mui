"use client";

import CustomTable, { Column } from '@/components/shared/CustomTable';
import DownloadIcon from '@mui/icons-material/Download';
import { Box, Button, IconButton, Link, Typography } from '@mui/material';
import React from 'react';

interface ImportHistoryItem {
    id: string;
    dateTime: string;
    fileName: string;
    user: string;
    importStatus: string;
    fileStatus: string;
    hasError: boolean;
}

interface BillingAddressImportFileHistorySectionProps {
    importHistoryData: ImportHistoryItem[];
    page: number;
    rowsPerPage: number;
    totalRows: number;
    onPageChange: (event: unknown, newPage: number) => void;
    onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onBackToBillingAddressList: () => void;
    onDownloadError: (id: string) => void;
    onFileNameClick: (fileName: string) => void;
}

const BillingAddressImportFileHistorySection: React.FC<BillingAddressImportFileHistorySectionProps> = ({
    importHistoryData,
    page,
    rowsPerPage,
    totalRows,
    onPageChange,
    onRowsPerPageChange,
    onBackToBillingAddressList,
    onDownloadError,
    onFileNameClick,
}) => {
    const columns: Column<ImportHistoryItem>[] = [
        {
            id: 'dateTime',
            label: 'Date & Time',
            minWidth: 150,
        },
        {
            id: 'fileName',
            label: 'File Name',
            minWidth: 250,
            renderCell: (row) => (
                <Link
                    component="button"
                    onClick={() => onFileNameClick(row.fileName)}
                    sx={{
                        color: 'primary.main',
                        textDecoration: 'none',
                        cursor: 'pointer',
                        '&:hover': {
                            textDecoration: 'underline',
                        },
                    }}
                >
                    {row.fileName}
                </Link>
            ),
        },
        {
            id: 'user',
            label: 'User',
            minWidth: 200,
        },
        {
            id: 'importStatus',
            label: 'Import Status',
            minWidth: 120,
            align: 'center',
        },
        {
            id: 'fileStatus',
            label: 'File Status',
            minWidth: 120,
            align: 'center',
        },
        {
            id: 'errorDetail',
            label: 'Error Detail',
            minWidth: 120,
            align: 'center',
            renderCell: (row) => (
                row.hasError ? (
                    <IconButton
                        size="small"
                        onClick={() => onDownloadError(row.id)}
                        sx={{ color: 'primary.main' }}
                    >
                        <DownloadIcon fontSize="small" />
                    </IconButton>
                ) : (
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>-</Typography>
                )
            ),
        },
    ];

    const displayRows = importHistoryData.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

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
                    Billing Address - Import File History
                </Typography>
                <Button
                    variant="outlined"
                    color="primary"
                    size="large"
                    className="bg-white"
                    onClick={onBackToBillingAddressList}
                >
                    BACK TO BILLING ADDRESS LIST
                </Button>
            </Box>

            {/* Table */}
            <Box sx={{ flex: 1, overflow: 'auto' }}>
                <CustomTable
                    columns={columns}
                    rows={displayRows}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    totalRows={totalRows}
                    onPageChange={onPageChange}
                    onRowsPerPageChange={onRowsPerPageChange}
                    rowsPerPageOptions={[10, 25, 50, 100]}
                    stickyHeader
                    maxHeight="calc(100vh - 320px)"
                    emptyMessage="No import history found"
                />
            </Box>
        </Box>
    );
};

export default BillingAddressImportFileHistorySection;

