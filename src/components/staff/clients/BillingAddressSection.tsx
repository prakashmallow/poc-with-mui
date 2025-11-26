"use client";

import CustomTable, { Column } from '@/components/shared/CustomTable';
import FilterComponent from '@/components/shared/FilterComponent';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Box, Button, Typography } from '@mui/material';
import React from 'react';

interface BillingAddress {
    id: string;
    name: string;
    address: string;
}

interface BillingAddressSectionProps {
    billingAddresses: BillingAddress[];
    page: number;
    rowsPerPage: number;
    isFilterOpen: boolean;
    appliedFilters: Record<string, unknown>;
    onPageChange: (event: unknown, newPage: number) => void;
    onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onExport: () => void;
    onImport: () => void;
    onNewBillingAddress: () => void;
    onEdit: (id: string) => void;
    updateFilterVisibility: (visible?: boolean) => void;
    onResetFilters: () => void;
    onApplyFilters: () => void;
}

const BillingAddressSection: React.FC<BillingAddressSectionProps> = ({
    billingAddresses,
    page,
    rowsPerPage,
    isFilterOpen,
    appliedFilters,
    onPageChange,
    onRowsPerPageChange,
    onExport,
    onImport,
    onNewBillingAddress,
    onEdit,
    updateFilterVisibility,
    onResetFilters,
    onApplyFilters,
}) => {
    const columns: Column<BillingAddress>[] = [
        {
            id: 'name',
            label: 'Name',
            minWidth: 300,
        },
        {
            id: 'address',
            label: 'Address',
            minWidth: 300,
        },
        {
            id: 'actions',
            label: 'Actions',
            minWidth: 100,
            align: 'center',
            renderCell: (row) => (
                <Button
                    size="small"
                    variant="outlined"
                    startIcon={<EditIcon />}
                    onClick={() => onEdit(row.id)}
                    sx={{ textTransform: 'none' }}
                >
                    Edit
                </Button>
            ),
        },
    ];

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
            {/* Fixed Header */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    p: 3,
                    bgcolor: '#f0efeb',
                    borderBottom: '1px solid #bec2b9',
                    position: 'sticky',
                    top: 0,
                    zIndex: 10,
                }}
            >
                <Typography variant="h5" sx={{ fontWeight: 600, color: '#1e285f' }}>
                    Billing Address
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Button
                        variant="outlined"
                        color="primary"
                        size="large"
                        className="bg-white"
                        startIcon={<FileDownloadIcon />}
                        onClick={onExport}
                    >
                        EXPORT
                    </Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        size="large"
                        className="bg-white"
                        startIcon={<FileUploadIcon />}
                        onClick={onImport}
                    >
                        IMPORT
                    </Button>
                    <FilterComponent
                        popOverComponent={<Box sx={{ p: 2 }}>Filter options will go here</Box>}
                        updatePopOverVisibility={updateFilterVisibility}
                        isFiltersOpen={isFilterOpen}
                        filtersData={appliedFilters}
                        onResetFilters={onResetFilters}
                        onApplyFilters={onApplyFilters}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        startIcon={<AddIcon />}
                        onClick={onNewBillingAddress}
                    >
                        NEW BILLING ADDRESS
                    </Button>
                </Box>
            </Box>

            {/* Scrollable Table Area */}
            <Box sx={{ flex: 1, overflow: 'auto' }}>
                <CustomTable
                    columns={columns}
                    rows={billingAddresses}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    onPageChange={onPageChange}
                    onRowsPerPageChange={onRowsPerPageChange}
                    rowsPerPageOptions={[10, 25, 50, 100]}
                    stickyHeader
                    maxHeight="calc(100vh - 320px)"
                    emptyMessage="No billing addresses found"
                />
            </Box>
        </Box>
    );
};

export default BillingAddressSection;

