"use client";
import { useState } from "react";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { RootState } from "@/redux/store";
import Image from "next/image";
import { getBaseUrl } from "@/utils";
import {
  AppBar,
  Toolbar,
  Menu,
  MenuItem,
  Avatar,
  Box,
  Button,
  Typography,
  Divider,
  ListSubheader,
} from "@mui/material";
import {
  KeyboardArrowDown,
} from "@mui/icons-material";

interface MenuItemType {
    key: string;
  label: string;
  path?: string;
  webLinkUrl?: string;
  submenu?: MenuItemType[];
  group?: string; // Group identifier for grouping submenu items
}

const HeaderNavBar = () => {
  const projectDetails = useSelector((state: RootState) => state.tenant.projectDetails);
  const userDetails = useSelector((state: RootState) => state.auth.userDetails);
  const pathname = usePathname();
  
  const [anchorEls, setAnchorEls] = useState<Record<string, HTMLElement | null>>({});
  const [avatarAnchorEl, setAvatarAnchorEl] = useState<HTMLElement | null>(null);

  // Sample menu items - you can customize these
  const menuItems: MenuItemType[] = [
    {
    key: 'services',
      label: "Services",
      submenu: [
        { key: 'calls_vri', label: "Video (VRI)", path: "/interpreter-view", group: "calls" },
        { key: 'calls_ti', label: "Telephone (TI)", path: "/ti", group: "calls" },
        { key: 'interpretings', label: "Interpretings", group: "bookings", webLinkUrl: 'account/all_bookings/interpretings' },
        { key: 'translations', label: "Translations / Transcriptions", group: "bookings", webLinkUrl: 'account/all_bookings/translations' },
        { key: 'bookings_vri', label: "Video (VRI)", group: "bookings", webLinkUrl: 'account/all_bookings/web_interpretings' },
        { key: 'bookings_ti', label: "Telephone (TI)", group: "bookings", webLinkUrl: 'account/all_bookings/telephone_interpretings' }
      ],
    },
    {
      key: 'clients',
        label: "Clients",
        path: "/staff/clients",
      },
      {
        key: 'linguists',
        label: "Linguists",
        path: "/staff/linguists",
      },
    {
      key: 'finance',
      label: "Finance",
      submenu: [
        { key: 'remittances_pending', label: "Pending Remittance", webLinkUrl: 'account/all_remittances'},
        { key: 'remittances_issued', label: "Issued Remittance", webLinkUrl: 'account/all_remittances/issued' },
        { key: 'standard_rate', label: "Standard Rate", webLinkUrl: 'account/global_costs' },
        { key: 'remittances_global', label: "Global Remittance Rates", webLinkUrl: 'account/remittance_rates' },
        { key: 'invoicing', label: "Invoicing", webLinkUrl: 'account/all_invoices'},
        { key: 'invoicing_clients', label: "Clients for Invoicing", webLinkUrl: 'account/clients/for_invoicing' },
      ],
    },
    {
      key: 'admin',
      label: "Admin",
      submenu: [
        { key: 'admin_clients', label: "Configuration - Clients", path: "/staff/clients/configurations" },
        { key: 'admin_linguists', label: "Configuration - Linguists", path: "/staff/linguists/configurations" },
      ]
    },
  ];

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, menuKey: string) => {
    setAnchorEls((prev) => ({
      ...prev,
      [menuKey]: event.currentTarget,
    }));
  };

  const handleMenuClose = (menuKey: string) => {
    setAnchorEls((prev) => ({
      ...prev,
      [menuKey]: null,
    }));
  };

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAvatarAnchorEl(event.currentTarget);
  };

  const handleAvatarClose = () => {
    setAvatarAnchorEl(null);
  };

  const getUserInitials = () => {
    if (userDetails?.first_name && userDetails?.last_name) {
      return `${userDetails.first_name[0]}${userDetails.last_name[0]}`.toUpperCase();
    }
    if (userDetails?.name) {
      return userDetails.name.substring(0, 2).toUpperCase();
    }
    if (userDetails?.email) {
      return userDetails.email.substring(0, 2).toUpperCase();
    }
    return "U";
  };

  const getUserName = () => {
    if (userDetails?.first_name && userDetails?.last_name) {
      return `${userDetails.first_name} ${userDetails.last_name}`;
    }
    if (userDetails?.name) {
      return userDetails.name;
    }
    if (userDetails?.email) {
      return userDetails.email;
    }
    return "User";
  };

  const isMenuItemSelected = (item: MenuItemType): boolean => {
    if (item.path && pathname === item.path) {
      return true;
    }
    if (item.submenu) {
      return item.submenu.some(subItem => subItem.path === pathname);
    }
    return false;
  };

  const formatGroupName = (groupName: string): string => {
    // Convert group name to display format (e.g., "core" -> "Core", "premium" -> "Premium")
    return groupName.charAt(0).toUpperCase() + groupName.slice(1);
  };

  const handleWebLinkNavigation = (webLinkUrl: string) => {
    const webAppUrl = getBaseUrl({ isWebApp: true });
    const fullUrl = `${webAppUrl}/${webLinkUrl}`;
    window.location.href = fullUrl;
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Logo on the left */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            height: "100%",
            paddingRight: 3,
          }}
        >
          {projectDetails?.logo_url && (
            <Image
              src={projectDetails.logo_url}
              alt={`${projectDetails?.name || ""} logo`}
              width={120}
              height={40}
              priority
              style={{
                height: "auto",
                maxHeight: "40px",
                width: "auto",
                objectFit: "contain",
              }}
            />
          )}
        </Box>

        {/* Spacer to push menu to the right */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Menu items */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            height: "100%",
          }}
        >
          {menuItems.map((item, index) => {
            const menuKey = `menu-${index}`;
            const hasSubmenu = item.submenu && item.submenu.length > 0;
            const anchorEl = anchorEls[menuKey];
            const isSelected = isMenuItemSelected(item);

            return (
              <Box
                key={menuKey}
                sx={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {item.path && !hasSubmenu ? (
                  <Button
                    color="primary"
                    variant="text"
                    component={Link}
                    href={item.path}
                    className={`${isSelected ? "header-navbar-menu-button-selected" : ""}`}
                    sx={{
                      height: "100%",
                      "& .MuiButton-endIcon": {
                        marginLeft: "4px",
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                ) : item.webLinkUrl && !hasSubmenu ? (
                  <Button
                    color="primary"
                    variant="text"
                    onClick={() => handleWebLinkNavigation(item.webLinkUrl!)}
                    className={`${isSelected ? "header-navbar-menu-button-selected" : ""}`}
                    sx={{
                      height: "100%",
                      "& .MuiButton-endIcon": {
                        marginLeft: "4px",
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                ) : (
                  <Button
                    color="primary"
                    variant="text"
                    className={`${isSelected ? "header-navbar-menu-button-selected" : ""} ${anchorEl ? "header-navbar-menu-button-open" : ""}`}
                    onClick={(e) => hasSubmenu && handleMenuClick(e, menuKey)}
                    endIcon={hasSubmenu ? <KeyboardArrowDown /> : null}
                    sx={{
                      height: "100%",
                      "& .MuiButton-endIcon": {
                        marginLeft: "4px",
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                )}
                {hasSubmenu && (
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={() => handleMenuClose(menuKey)}
                  >
                    {(() => {
                      // Group submenu items by group property
                      const groupedItems: Record<string, MenuItemType[]> = {};
                      const ungroupedItems: MenuItemType[] = [];
                      
                      item.submenu?.forEach((subItem) => {
                        if (subItem.group) {
                          if (!groupedItems[subItem.group]) {
                            groupedItems[subItem.group] = [];
                          }
                          groupedItems[subItem.group].push(subItem);
                        } else {
                          ungroupedItems.push(subItem);
                        }
                      });

                      const menuElements: React.ReactNode[] = [];
                      let itemIndex = 0;

                      // Render grouped items
                      Object.entries(groupedItems).forEach(([groupName, groupItems], groupIndex) => {
                        // Add divider before group (except for the very first group)
                        if (groupIndex > 0) {
                          menuElements.push(
                            <Divider key={`${menuKey}-divider-${groupIndex}`} />
                          );
                        }

                        // Add group header at the top of the group
                        menuElements.push(
                          <ListSubheader
                            key={`${menuKey}-group-header-${groupName}`}
                            className="header-navbar-group-header"
                            sx={{
                              paddingTop: groupIndex === 0 ? "8px" : "4px",
                            }}
                          >
                            {formatGroupName(groupName)}
                          </ListSubheader>
                        );

                        // Render items in this group
                        groupItems.forEach((subItem) => {
                          const isSubItemSelected = subItem.path === pathname;
                          if (subItem.path) {
                            menuElements.push(
                              <MenuItem
                                key={`${menuKey}-sub-${itemIndex}`}
                                component={Link}
                                href={subItem.path}
                                onClick={() => handleMenuClose(menuKey)}
                                className={`header-navbar-submenu-item ${isSubItemSelected ? "header-navbar-submenu-item-selected" : ""}`}
                              >
                                {subItem.label}
                              </MenuItem>
                            );
                          } else if (subItem.webLinkUrl) {
                            menuElements.push(
                              <MenuItem
                                key={`${menuKey}-sub-${itemIndex}`}
                                onClick={() => {
                                  handleMenuClose(menuKey);
                                  handleWebLinkNavigation(subItem.webLinkUrl!);
                                }}
                                className="header-navbar-submenu-item"
                              >
                                {subItem.label}
                              </MenuItem>
                            );
                          } else {
                            menuElements.push(
                              <MenuItem
                                key={`${menuKey}-sub-${itemIndex}`}
                                onClick={() => handleMenuClose(menuKey)}
                                className="header-navbar-submenu-item"
                              >
                                {subItem.label}
                              </MenuItem>
                            );
                          }
                          itemIndex++;
                        });
                      });

                      // Add divider before ungrouped items if there are groups
                      if (Object.keys(groupedItems).length > 0 && ungroupedItems.length > 0) {
                        menuElements.push(
                          <Divider key={`${menuKey}-divider-ungrouped`} />
                        );
                      }

                      // Render ungrouped items
                      ungroupedItems.forEach((subItem) => {
                        const isSubItemSelected = subItem.path === pathname;
                        if (subItem.path) {
                          menuElements.push(
                            <MenuItem
                              key={`${menuKey}-sub-${itemIndex}`}
                              component={Link}
                              href={subItem.path}
                              onClick={() => handleMenuClose(menuKey)}
                              className={`header-navbar-submenu-item ${isSubItemSelected ? "header-navbar-submenu-item-selected" : ""}`}
                            >
                              {subItem.label}
                            </MenuItem>
                          );
                        } else if (subItem.webLinkUrl) {
                          menuElements.push(
                            <MenuItem
                              key={`${menuKey}-sub-${itemIndex}`}
                              onClick={() => {
                                handleMenuClose(menuKey);
                                handleWebLinkNavigation(subItem.webLinkUrl!);
                              }}
                              className="header-navbar-submenu-item"
                            >
                              {subItem.label}
                            </MenuItem>
                          );
                        } else {
                          menuElements.push(
                            <MenuItem
                              key={`${menuKey}-sub-${itemIndex}`}
                              onClick={() => handleMenuClose(menuKey)}
                              className="header-navbar-submenu-item"
                            >
                              {subItem.label}
                            </MenuItem>
                          );
                        }
                        itemIndex++;
                      });

                      return menuElements;
                    })()}
                  </Menu>
                )}
              </Box>
            );
          })}
        </Box>

        {/* Avatar with dropdown */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginLeft: 2,
          }}
        >
          <Avatar
            className="header-navbar-avatar-icon"
            onClick={handleAvatarClick}
          >
            {getUserInitials()}
          </Avatar>
          <Menu
            anchorEl={avatarAnchorEl}
            open={Boolean(avatarAnchorEl)}
            onClose={handleAvatarClose}
            slotProps={{
              paper: {
                sx: {
                  minWidth: 200,
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                  borderRadius: "8px",
                  marginTop: 1,
                },
              },
            }}
          >
            <MenuItem
              onClick={handleAvatarClose}
              sx={{
                borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
                padding: "12px 16px",
                cursor: "default",
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  width: "100%",
                }}
              >
                <Avatar className="header-navbar-avatar-menu-avatar">
                  {getUserInitials()}
                </Avatar>
                <Box>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      fontSize: "14px",
                      color: "primary.main",
                      marginBottom: 0.25,
                    }}
                  >
                    {getUserName()}
                  </Typography>
                  {userDetails?.email && (
                    <Typography
                      variant="caption"
                      sx={{
                        fontSize: "12px",
                        color: "text.secondary",
                      }}
                    >
                      {userDetails.email}
                    </Typography>
                  )}
                </Box>
              </Box>
            </MenuItem>
            <MenuItem onClick={handleAvatarClose} className="header-navbar-avatar-menu-item">Profile</MenuItem>
            <MenuItem onClick={handleAvatarClose} className="header-navbar-avatar-menu-item">Settings</MenuItem>
            <MenuItem onClick={handleAvatarClose} className="header-navbar-avatar-menu-item">Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderNavBar;
