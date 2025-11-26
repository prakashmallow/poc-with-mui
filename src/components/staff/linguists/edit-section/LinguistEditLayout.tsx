"use client";

import React from 'react';
import { Box } from '@mui/material';
import SidebarNavigation from './SidebarNavigation';

interface LinguistEditLayoutProps {
  children: React.ReactNode;
}

const LinguistEditLayout: React.FC<LinguistEditLayoutProps> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#f5f5f5', overflow: 'hidden' }}>
      {/* Sidebar with individual scroll */}
      <SidebarNavigation />

      {/* Main Content Area with individual scroll */}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          backgroundColor: '#f0efeb' 
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default LinguistEditLayout;

