"use client";

import React, { useState } from 'react';
import { Box, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CustomTable, { Column } from '@/components/shared/CustomTable';

interface Client {
  id: string;
  name: string;
  prefixAccountRef: string;
  type: string;
  services: string[];
}

const Clients = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);

  // Sample data - replace with actual data from API/state
  const [clients] = useState<Client[]>([
    {
      id: '1',
      name: 'Acme Corporation',
      prefixAccountRef: 'ACME-001',
      type: 'Client',
      services: ['Translation', 'Interpretation'],
    },
    {
      id: '2',
      name: 'Tech Solutions Inc',
      prefixAccountRef: 'TECH-002',
      type: 'Prospect',
      services: ['Localization'],
    },
    {
      id: '3',
      name: 'Global Services Ltd',
      prefixAccountRef: 'GLOB-003',
      type: 'Client',
      services: ['Translation', 'Localization'],
    },
    {
      id: '4',
      name: 'Healthcare Partners',
      prefixAccountRef: 'HLTH-004',
      type: 'Client',
      services: ['Translation', 'Interpretation', 'Localization'],
    },
    {
      id: '5',
      name: 'Financial Group International',
      prefixAccountRef: 'FING-005',
      type: 'Client',
      services: ['Translation'],
    },
    {
      id: '6',
      name: 'Education Network',
      prefixAccountRef: 'EDUC-006',
      type: 'Prospect',
      services: ['Localization', 'Translation'],
    },
    {
      id: '7',
      name: 'Legal Associates Worldwide',
      prefixAccountRef: 'LEGL-007',
      type: 'Client',
      services: ['Interpretation', 'Translation'],
    },
    {
      id: '8',
      name: 'Manufacturing Corp',
      prefixAccountRef: 'MFG-008',
      type: 'Client',
      services: ['Localization'],
    },
    {
      id: '9',
      name: 'Retail Solutions',
      prefixAccountRef: 'RETL-009',
      type: 'Prospect',
      services: ['Translation', 'Localization'],
    },
    {
      id: '10',
      name: 'Government Services',
      prefixAccountRef: 'GOVT-010',
      type: 'Client',
      services: ['Translation', 'Interpretation'],
    },
    {
      id: '11',
      name: 'Media & Entertainment Co',
      prefixAccountRef: 'MEDA-011',
      type: 'Client',
      services: ['Localization', 'Translation'],
    },
    {
      id: '12',
      name: 'Technology Innovations',
      prefixAccountRef: 'TECH-012',
      type: 'Prospect',
      services: ['Translation'],
    },
    {
      id: '13',
      name: 'Consulting Services Group',
      prefixAccountRef: 'CONS-013',
      type: 'Client',
      services: ['Interpretation'],
    },
    {
      id: '14',
      name: 'Real Estate Holdings',
      prefixAccountRef: 'REAL-014',
      type: 'Client',
      services: ['Translation', 'Localization'],
    },
    {
      id: '15',
      name: 'Energy Solutions Ltd',
      prefixAccountRef: 'ENRG-015',
      type: 'Prospect',
      services: ['Translation'],
    },
  ]);

  const handlePageChange = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, clientId: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedClientId(clientId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedClientId(null);
  };

  const handleEdit = () => {
    console.log('Edit client:', selectedClientId);
    handleMenuClose();
  };

  const handleDelete = () => {
    console.log('Delete client:', selectedClientId);
    handleMenuClose();
  };

  const handleView = () => {
    console.log('View client:', selectedClientId);
    handleMenuClose();
  };

  const columns: Column<Client>[] = [
    {
      id: 'name',
      label: 'Name',
      minWidth: 200,
    },
    {
      id: 'prefixAccountRef',
      label: 'Prefix / Account Ref',
      minWidth: 150,
    },
    {
      id: 'type',
      label: 'Type',
      minWidth: 100,
    },
    {
      id: 'services',
      label: 'Services',
      minWidth: 200,
      format: (value: string[]) => {
        if (!value || value.length === 0) return '-';
        return value.join(', ');
      },
    },
    {
      id: 'actions',
      label: 'Actions',
      minWidth: 100,
      align: 'center',
      renderCell: (row: Client) => (
        <IconButton
          size="small"
          onClick={(e) => handleMenuOpen(e, row.id)}
          aria-label="more actions"
        >
          <MoreVertIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <Box sx={{ width: '100%' }}>
      <CustomTable
        columns={columns}
        rows={clients}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        stickyHeader
        maxHeight="calc(100vh - 225px)"
      />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleView}>View</MenuItem>
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </Box>
  );
};

export default Clients;