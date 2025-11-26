"use client";

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from '@mui/material';
import {
  Badge as BadgeIcon,
  Handshake as HandshakeIcon,
  Security as SecurityIcon,
  Description as DescriptionIcon,
  AccountBalance as AccountBalanceIcon,
  School as SchoolIcon,
  Settings as SettingsIcon,
  Newspaper as NewspaperIcon,
  People as PeopleIcon,
  Phone as PhoneIcon,
  Videocam as VideocamIcon,
  Translate as TranslateIcon,
} from '@mui/icons-material';

interface SidebarItem {
  icon: React.ReactNode;
  label: string;
  route: string;
}

const SidebarNavigation: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  const sidebarItems: SidebarItem[] = [
    { icon: <BadgeIcon sx={{ fontSize: 20 }} />, label: 'Basic Information', route: 'basic-information' },
    { icon: <HandshakeIcon sx={{ fontSize: 20 }} />, label: 'Services', route: 'services' },
    { icon: <SecurityIcon sx={{ fontSize: 20 }} />, label: 'Security Clearance', route: 'security-clearance' },
    { icon: <DescriptionIcon sx={{ fontSize: 20 }} />, label: 'Documentation', route: 'documentation' },
    { icon: <AccountBalanceIcon sx={{ fontSize: 20 }} />, label: 'Bank Details', route: 'bank-details' },
    { icon: <SchoolIcon sx={{ fontSize: 20 }} />, label: 'Training & Memberships', route: 'training-memberships' },
    { icon: <SettingsIcon sx={{ fontSize: 20 }} />, label: 'Preferences', route: 'preferences' },
    { icon: <NewspaperIcon sx={{ fontSize: 20 }} />, label: 'Agreement', route: 'agreement' },
  ];

  const bookingItems: SidebarItem[] = [
    { icon: <PeopleIcon sx={{ fontSize: 20 }} />, label: 'Face to Face Interpretin...', route: 'face-to-face' },
    { icon: <PhoneIcon sx={{ fontSize: 20 }} />, label: 'Telephone Interpretings', route: 'telephone' },
    { icon: <VideocamIcon sx={{ fontSize: 20 }} />, label: 'Video Remote Interpreti...', route: 'video-remote' },
    { icon: <TranslateIcon sx={{ fontSize: 20 }} />, label: 'Translations / Transcripti...', route: 'translations' },
  ];

  const handleItemClick = (route: string) => {
    const currentPath = pathname.split('/');
    const basePath = currentPath.slice(0, -1).join('/'); // Get path up to [id]
    router.push(`${basePath}/${route}`);
  };

  const isActive = (route: string) => {
    return pathname.endsWith(`/${route}`);
  };

  return (
    <Box
      sx={{
        width: 290,
        bgcolor: 'white',
        borderRight: '1px solid #e0e0e0',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ p: 1, borderBottom: '1px solid #e0e0e0', backgroundColor: '#f0efeb', flexShrink: 0 }}>
        <Typography variant="caption" sx={{ color: '#9e9e9e', fontWeight: 500 }}>
          Linguist Info
        </Typography>
      </Box>

      <Box sx={{ flex: 1, overflowY: 'auto', backgroundColor: '#f0efeb' }}>
        <List sx={{ px: 1, py: 2 }}>
          {sidebarItems.map((item, idx) => {
            const active = isActive(item.route);
            return (
              <ListItem key={idx} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  selected={active}
                  onClick={() => handleItemClick(item.route)}
                  sx={{
                    borderRadius: 1,
                    py: 1.5,
                    px: 2,
                    '&.Mui-selected': {
                      bgcolor: '#bec2b9',
                      '&:hover': {
                        bgcolor: '#bec2b9',
                      },
                    },
                    '&:hover': {
                      bgcolor: '#bec2b9',
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      variant: 'body2',
                      fontWeight: active ? 600 : 400,
                      fontSize: '0.875rem',
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}

          <Box sx={{ mt: 3, mb: 1, px: 2 }}>
            <Typography variant="caption" sx={{ color: '#9e9e9e', fontWeight: 500 }}>
              Bookings
            </Typography>
          </Box>

          {bookingItems.map((item, idx) => (
            <ListItem key={idx} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => handleItemClick(item.route)}
                sx={{
                  borderRadius: 1,
                  py: 1.5,
                  px: 2,
                  '&:hover': {
                    bgcolor: '#f5f5f5',
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 36, color: '#616161' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    variant: 'body2',
                    fontSize: '0.875rem',
                    color: '#424242',
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default SidebarNavigation;

