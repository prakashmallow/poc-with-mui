"use client";

import CustomTable, { Column } from '@/components/shared/CustomTable';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonIcon from '@mui/icons-material/Person';
import { Box, Button, Checkbox, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import React, { useState } from 'react';

interface Linguist {
    id: string;
    name: string;
    ref: string;
    serviceTypes: Array<{ label: string; icon?: string }>;
    languages: string[];
    totalBookings: {
        faceToFace?: number;
        documents?: number;
        calendar?: number;
        lp?: number;
    };
    contact: {
        email: string;
        phone: string;
    };
    address: string;
    highestLevelSC: string;
    highestLevelQual: string;
    dateOfLastJob: string;
    profileLastActive?: string;
}

const Linguists = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedLinguistId, setSelectedLinguistId] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | undefined>(undefined);
    const [scSortDirection, setScSortDirection] = useState<'asc' | 'desc' | undefined>(undefined);
    const [qualSortDirection, setQualSortDirection] = useState<'asc' | 'desc' | undefined>(undefined);

    // Sample data - replace with actual data from API/state
    const [linguists] = useState<Linguist[]>([
        {
            id: '1',
            name: 'Mr Moniga A N',
            ref: 'L0000029',
            serviceTypes: [],
            languages: [],
            totalBookings: {},
            contact: {
                email: 'moniga+987@mallow-tech.com',
                phone: '+91 9876543212',
            },
            address: 'Manchster,, United Kingdom of Great Britain and Northern Ireland, M345HG',
            highestLevelSC: 'Level 1',
            highestLevelQual: 'Level 3',
            dateOfLastJob: '2022-11-30',
            profileLastActive: '2024-01-15',
        },
        {
            id: '2',
            name: 'Ms Moniga Sekar Team Bc',
            ref: 'L0000032',
            serviceTypes: [
                { label: 'Translation & Multimedia', icon: 'check' },
                { label: 'Face To Face Interpreting', icon: 'person' },
            ],
            languages: ['Hindi', 'English', 'Chinese'],
            totalBookings: {
                faceToFace: 68,
                documents: 11,
                calendar: 12,
                lp: 1,
            },
            contact: {
                email: 'moniga@mallow-tech.com',
                phone: '+91 9087654321',
            },
            address: 'Mallow Technologies, Sengunthapuram, India, 639002',
            highestLevelSC: 'Level 1',
            highestLevelQual: 'Level 4',
            dateOfLastJob: '2022-07-27',
            profileLastActive: '2024-02-20',
        },
        {
            id: '3',
            name: 'Ms Gayathri Muralitharan',
            ref: 'L0000033',
            serviceTypes: [
                { label: 'Translation & Multimedia', icon: 'check' },
                { label: 'Face To Face Interpreting', icon: 'person' },
            ],
            languages: [],
            totalBookings: {},
            contact: {
                email: 'gayathri.muralitharan+102@mallow-tech.com',
                phone: '+91 8870749991',
            },
            address: 'Mallow Technologies, Vivekananda street, India, 639001',
            highestLevelSC: 'Level 5',
            highestLevelQual: 'Level 4',
            dateOfLastJob: '2023-07-26',
            profileLastActive: '2024-03-10',
        },
        {
            id: '4',
            name: 'Mr Patrick Smith',
            ref: 'L0000034',
            serviceTypes: [
                { label: 'Translation & Multimedia', icon: 'check' },
                { label: 'Face To Face Interpreting', icon: 'person' },
            ],
            languages: [],
            totalBookings: {
                faceToFace: 37,
            },
            contact: {
                email: 'patrick.smith@dalanguages.co.uk',
                phone: '+93 ZAP',
            },
            address: 'ZAP, ZAP, Andorra, ZAP',
            highestLevelSC: '-',
            highestLevelQual: 'Level 1',
            dateOfLastJob: '-',
            profileLastActive: '2024-01-05',
        },
        {
            id: '5',
            name: 'Mr Gayathri Muralitharan',
            ref: 'L0000035',
            serviceTypes: [
                { label: 'Translation & Multimedia', icon: 'check' },
                { label: 'Face To Face Interpreting', icon: 'person' },
            ],
            languages: [],
            totalBookings: {
                faceToFace: 155,
                documents: 2,
                calendar: 5,
            },
            contact: {
                email: 'gayathri.muralitharan@mallow-tech.com',
                phone: '+91 7AP',
            },
            address: 'ZAP, ZAP, Andorra, ZAP',
            highestLevelSC: 'Level 5',
            highestLevelQual: '-',
            dateOfLastJob: '-',
            profileLastActive: '2024-02-28',
        },
        {
            id: '6',
            name: 'Ms Sarah Johnson',
            ref: 'L0000036',
            serviceTypes: [
                { label: 'Translation & Multimedia', icon: 'check' },
            ],
            languages: ['French', 'Spanish', 'English'],
            totalBookings: {
                faceToFace: 42,
                documents: 8,
            },
            contact: {
                email: 'sarah.johnson@example.com',
                phone: '+44 20 7946 0958',
            },
            address: '123 Oxford Street, London, United Kingdom, W1D 1BS',
            highestLevelSC: 'Level 2',
            highestLevelQual: 'Level 3',
            dateOfLastJob: '2023-12-15',
            profileLastActive: '2024-03-25',
        },
        {
            id: '7',
            name: 'Dr. Ahmed Hassan',
            ref: 'L0000037',
            serviceTypes: [
                { label: 'Face To Face Interpreting', icon: 'person' },
            ],
            languages: ['Arabic', 'English', 'Urdu'],
            totalBookings: {
                faceToFace: 95,
                calendar: 18,
                lp: 3,
            },
            contact: {
                email: 'ahmed.hassan@example.com',
                phone: '+971 4 123 4567',
            },
            address: 'Dubai Marina, Dubai, United Arab Emirates, 00000',
            highestLevelSC: 'Level 4',
            highestLevelQual: 'Level 5',
            dateOfLastJob: '2024-01-20',
            profileLastActive: '2024-04-01',
        },
        {
            id: '8',
            name: 'Ms Li Wei',
            ref: 'L0000038',
            serviceTypes: [
                { label: 'Translation & Multimedia', icon: 'check' },
                { label: 'Face To Face Interpreting', icon: 'person' },
            ],
            languages: ['Mandarin', 'Cantonese', 'English'],
            totalBookings: {
                faceToFace: 128,
                documents: 25,
                calendar: 32,
            },
            contact: {
                email: 'li.wei@example.com',
                phone: '+86 10 1234 5678',
            },
            address: 'Beijing CBD, Chaoyang District, China, 100020',
            highestLevelSC: 'Level 3',
            highestLevelQual: 'Level 4',
            dateOfLastJob: '2024-02-10',
            profileLastActive: '2024-03-30',
        },
        {
            id: '9',
            name: 'Mr Carlos Rodriguez',
            ref: 'L0000039',
            serviceTypes: [],
            languages: ['Spanish', 'Portuguese', 'English'],
            totalBookings: {},
            contact: {
                email: 'carlos.rodriguez@example.com',
                phone: '+34 91 123 4567',
            },
            address: 'Gran Via, Madrid, Spain, 28013',
            highestLevelSC: 'Level 1',
            highestLevelQual: 'Level 2',
            dateOfLastJob: '2023-08-22',
            profileLastActive: '2024-01-10',
        },
        {
            id: '10',
            name: 'Ms Yuki Tanaka',
            ref: 'L0000040',
            serviceTypes: [
                { label: 'Translation & Multimedia', icon: 'check' },
            ],
            languages: ['Japanese', 'English'],
            totalBookings: {
                documents: 56,
                calendar: 12,
            },
            contact: {
                email: 'yuki.tanaka@example.com',
                phone: '+81 3 1234 5678',
            },
            address: 'Shibuya, Tokyo, Japan, 150-0002',
            highestLevelSC: 'Level 2',
            highestLevelQual: 'Level 3',
            dateOfLastJob: '2024-03-05',
            profileLastActive: '2024-04-05',
        },
        {
            id: '11',
            name: 'Mr Jean-Pierre Dubois',
            ref: 'L0000041',
            serviceTypes: [
                { label: 'Face To Face Interpreting', icon: 'person' },
            ],
            languages: ['French', 'German', 'English'],
            totalBookings: {
                faceToFace: 73,
                lp: 5,
            },
            contact: {
                email: 'jean.dubois@example.com',
                phone: '+33 1 23 45 67 89',
            },
            address: 'Champs-Élysées, Paris, France, 75008',
            highestLevelSC: 'Level 3',
            highestLevelQual: 'Level 4',
            dateOfLastJob: '2024-01-18',
            profileLastActive: '2024-03-20',
        },
        {
            id: '12',
            name: 'Ms Priya Sharma',
            ref: 'L0000042',
            serviceTypes: [
                { label: 'Translation & Multimedia', icon: 'check' },
                { label: 'Face To Face Interpreting', icon: 'person' },
            ],
            languages: ['Hindi', 'Tamil', 'English', 'Telugu'],
            totalBookings: {
                faceToFace: 156,
                documents: 34,
                calendar: 28,
                lp: 7,
            },
            contact: {
                email: 'priya.sharma@example.com',
                phone: '+91 80 1234 5678',
            },
            address: 'MG Road, Bangalore, India, 560001',
            highestLevelSC: 'Level 4',
            highestLevelQual: 'Level 5',
            dateOfLastJob: '2024-03-12',
            profileLastActive: '2024-04-02',
        },
        {
            id: '13',
            name: 'Mr David Kim',
            ref: 'L0000043',
            serviceTypes: [],
            languages: ['Korean', 'English', 'Japanese'],
            totalBookings: {
                documents: 19,
            },
            contact: {
                email: 'david.kim@example.com',
                phone: '+82 2 1234 5678',
            },
            address: 'Gangnam, Seoul, South Korea, 06000',
            highestLevelSC: '-',
            highestLevelQual: 'Level 1',
            dateOfLastJob: '2023-11-08',
            profileLastActive: '2024-02-15',
        },
        {
            id: '14',
            name: 'Ms Elena Petrov',
            ref: 'L0000044',
            serviceTypes: [
                { label: 'Translation & Multimedia', icon: 'check' },
            ],
            languages: ['Russian', 'Ukrainian', 'English'],
            totalBookings: {
                faceToFace: 89,
                documents: 21,
                calendar: 15,
            },
            contact: {
                email: 'elena.petrov@example.com',
                phone: '+7 495 123 4567',
            },
            address: 'Red Square, Moscow, Russia, 109012',
            highestLevelSC: 'Level 3',
            highestLevelQual: 'Level 3',
            dateOfLastJob: '2024-02-28',
            profileLastActive: '2024-03-28',
        },
        {
            id: '15',
            name: 'Mr Roberto Silva',
            ref: 'L0000045',
            serviceTypes: [
                { label: 'Face To Face Interpreting', icon: 'person' },
            ],
            languages: ['Portuguese', 'Spanish', 'English'],
            totalBookings: {
                faceToFace: 112,
                calendar: 24,
            },
            contact: {
                email: 'roberto.silva@example.com',
                phone: '+55 11 1234 5678',
            },
            address: 'Avenida Paulista, São Paulo, Brazil, 01310-100',
            highestLevelSC: 'Level 2',
            highestLevelQual: 'Level 4',
            dateOfLastJob: '2024-01-30',
            profileLastActive: '2024-03-15',
        },
    ]);

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

    const handleEdit = () => {
        console.log('Edit linguist:', selectedLinguistId);
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
                        slotProps={{
                            input: {
                                'aria-label': 'Select all linguists',
                            },
                        }}
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
                        slotProps={{
                            input: {
                                'aria-label': `Select ${row.name}`,
                            },
                        }}
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
                            handleEdit();
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
                <MenuItem onClick={handleEdit}>View Details</MenuItem>
                <MenuItem onClick={handleEdit}>Delete</MenuItem>
            </Menu>
        </Box>
    );
};

export default Linguists;
