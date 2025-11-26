"use client";

import React from 'react';
import { Box } from '@mui/material';
import ContentHeader from './ContentHeader';

interface ContentLayoutProps {
  title: string;
  onSave?: () => void;
  onCancel?: () => void;
  showActions?: boolean;
  children: React.ReactNode;
}

const ContentLayout: React.FC<ContentLayoutProps> = ({ 
  title, 
  onSave, 
  onCancel,
  showActions = true,
  children 
}) => {
  return (
    <>
      {/* Fixed Header */}
      <Box sx={{ flexShrink: 0, p: 4, pb: 2 }}>
        <ContentHeader 
          title={title} 
          onSave={onSave} 
          onCancel={onCancel}
          showActions={showActions}
        />
      </Box>

      {/* Scrollable Content */}
      <Box 
        sx={{ 
          flex: 1, 
          overflowY: 'auto', 
          px: 4, 
          pb: 4,
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#f0efeb',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#ccc',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#999',
          },
        }}
      >
        {children}
      </Box>
    </>
  );
};

export default ContentLayout;
