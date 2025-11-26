"use client";

import CustomTable, { Column } from '@/components/shared/CustomTable';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonIcon from '@mui/icons-material/Person';
import { Box, Button, Checkbox, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { linguistsData, Linguist } from '@/utils/linguistData';

const Linguists = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedLinguistId, setSelectedLinguistId] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | undefined>(undefined);
    const [scSortDirection, setScSortDirection] = useState<'asc' | 'desc' | undefined>(undefined);
    const [qualSortDirection, setQualSortDirection] = useState<'asc' | 'desc' | undefined>(undefined);
    const router = useRouter();

    // Sample data - replace with actual data from API/state
    const [linguists] = useState<Linguist[]>(linguistsData);

    const handlePageChange = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const allIds = new Set(linguists.map(l => l.id));
            setSelectedRows(allIds);
        } else {
            setSelectedRows(new Set());
        }
    };

    const handleSelectRow = (linguistId: string) => {
        const newSelected = new Set(selectedRows);
        if (newSelected.has(linguistId)) {
            newSelected.delete(linguistId);
        } else {
            newSelected.add(linguistId);
        }
        setSelectedRows(newSelected);
    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, linguistId: string) => {
        setAnchorEl(event.currentTarget);
        setSelectedLinguistId(linguistId);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedLinguistId(null);
    };

    const handleEdit = (linguistId?: string) => {
        const idToUse = linguistId || selectedLinguistId;
        if (idToUse) {
            router.push(`/staff/linguists/${idToUse}`);
        }
        handleMenuClose();
    };


    const handleSort = () => {
        setSortDirection(prev => {
            if (prev === 'asc') return 'desc';
            if (prev === 'desc') return undefined;
            return 'asc';
        });
    };

    const handleScSort = () => {
        debugger;
        setScSortDirection(prev => {
            if (prev === 'asc') return 'desc';
            if (prev === 'desc') return undefined;
            return 'asc';
        });
    };

    const handleQualSort = () => {
        setQualSortDirection(prev => {
            if (prev === 'asc') return 'desc';
            if (prev === 'desc') return undefined;
            return 'asc';
        });
    };

    const renderServiceTypeIcon = (icon?: string) => {
        switch (icon) {
            case 'check':
                return <CheckCircleIcon sx={{ fontSize: '14px' }} />;
            case 'person':
                return <PersonIcon sx={{ fontSize: '14px' }} />;
            default:
                return undefined;
        }
    };

    const columns: Column<Linguist>[] = [
        {
            id: 'name',
            label: 'Name',
            minWidth: 250,
            pinned: 'left',
            renderHeader: () => (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Checkbox
                        checked={selectedRows.size === linguists.length && linguists.length > 0}
                        indeterminate={selectedRows.size > 0 && selectedRows.size < linguists.length}
                        onChange={handleSelectAll}
                        size="small"
                    />
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>Name</Typography>
                </Box>
            ),
            renderCell: (row: Linguist) => (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Checkbox
                        checked={selectedRows.has(row.id)}
                        onChange={() => handleSelectRow(row.id)}
                        size="small"
                        onClick={(e) => e.stopPropagation()}
                    />
                    <Typography variant="body2">{row.name}</Typography>
                </Box>
            ),
        },
        {
            id: 'contact',
            label: 'Contact',
            minWidth: 250,
            renderCell: (row: Linguist) => (
                <Box>
                    <Typography variant="body2">{row.contact.email}</Typography>
                    <Typography variant="body2" color="text.secondary">{row.contact.phone}</Typography>
                </Box>
            ),
        },
        {
            id: 'address',
            label: 'Address',
            minWidth: 300,
            renderCell: (row: Linguist) => (
                <Typography variant="body2">{row.address || '-'}</Typography>
            ),
        },
        {
            id: 'highestLevelSC',
            label: 'Highest level of SC',
            minWidth: 180,
            sortable: true,
            sortDirection: scSortDirection,
            onSort: handleScSort,
            renderCell: (row: Linguist) => (
                <Typography variant="body2">{row.highestLevelSC || '-'}</Typography>
            ),
        },
        {
            id: 'highestLevelQual',
            label: 'Highest level of Qual',
            minWidth: 180,
            sortable: true,
            sortDirection: qualSortDirection,
            onSort: handleQualSort,
            renderCell: (row: Linguist) => (
                <Typography variant="body2">{row.highestLevelQual || '-'}</Typography>
            ),
        },
        {
            id: 'dateOfLastJob',
            label: 'Date of their last job',
            minWidth: 180,
            renderCell: (row: Linguist) => (
                <Typography variant="body2">{row.dateOfLastJob || '-'}</Typography>
            ),
        },
        {
            id: 'profileLastActive',
            label: 'Profile last active',
            minWidth: 180,
            renderCell: (row: Linguist) => (
                <Typography variant="body2">{row.profileLastActive || '-'}</Typography>
            ),
        },
        {
            id: 'action',
            label: 'Action',
            minWidth: 150,
            align: 'center',
            pinned: 'right',
            renderCell: (row: Linguist) => (
                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                    <Button
                        size="small"
                        variant="outlined"
                        startIcon={<EditIcon />}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(row.id);
                        }}
                    >
                        Edit
                    </Button>
                    <IconButton
                        size="small"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleMenuOpen(e, row.id);
                        }}
                        aria-label="more actions"
                    >
                        <MoreVertIcon />
                    </IconButton>
                </Box>
            ),
        },
    ];

    return (
        <Box sx={{ width: '100%' }}>
            <CustomTable
                columns={columns}
                rows={linguists}
                page={page}
                rowsPerPage={rowsPerPage}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                stickyHeader
                maxHeight="calc(100vh - 225px)"
                rowsPerPageOptions={[10, 10, 50, 100]}
            />
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={() => handleEdit(selectedLinguistId || undefined)}>View Details</MenuItem>
                <MenuItem onClick={() => handleEdit(selectedLinguistId || undefined)}>Delete</MenuItem>
            </Menu>
        </Box>
    );
};

export default Linguists;
