"use client";
import store from "@/redux/store";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { Provider, useSelector } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material";
import { useMemo } from "react";
import { RootState } from "@/redux/store";

const ThemeWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const projectDetails = useSelector((state: RootState) => state.tenant.projectDetails);
  const primaryColor = projectDetails?.theme?.custom_css_variables?.primary_color;
  const secondaryColor = projectDetails?.theme?.custom_css_variables?.secondary_color;
  const secondaryLightColor = projectDetails?.theme?.custom_css_variables?.secondary_light_color;
  const neutralMediumColor = projectDetails?.theme?.custom_css_variables?.neutral_medium_color;
  const neutralLightColor = projectDetails?.theme?.custom_css_variables?.neutral_light_color;

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: "light",
          primary: {
            main: primaryColor || "#14A073",
          },
          secondary: {
            main: secondaryColor || "#1e285f",
          },
          text: {
            primary: secondaryColor || "#1e285f",
          },
        },
        shape: {
          borderRadius: 0,
        },
        typography: {
          fontFamily: "'Public Sans', sans-serif, -apple-system",
          fontSize: 14,
          h1: {
            fontFamily: "'Bressay Display', sans-serif, -apple-system",
          },
          h2: {
            fontFamily: "'Bressay Display', sans-serif, -apple-system",
          },
          h3: {
            fontFamily: "'Bressay Display', sans-serif, -apple-system",
          },
          h4: {
            fontFamily: "'Bressay Display', sans-serif, -apple-system",
          },
          h5: {
            fontFamily: "'Bressay Display', sans-serif, -apple-system",
          },
          h6: {
            fontFamily: "'Bressay Display', sans-serif, -apple-system",
          },
        },
        components: {
          MuiButton: {
            defaultProps: {
              disableRipple: true,
            },
            styleOverrides: {
              root: {
                borderRadius: 0,
                textTransform: "uppercase",
                boxShadow: "none",
                "&:hover": {
                  boxShadow: "none",
                },
                "&:active": {
                  boxShadow: "none",
                },
                "&:focus": {
                  boxShadow: "none",
                },
              },
              textPrimary: {
                color: secondaryColor || "#1e285f",
                border: "1px solid transparent",
                textTransform: "uppercase",
                fontSize: "14px",
                fontWeight: 500,
                padding: "8px 16px",
                minWidth: "auto",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                  color: primaryColor || "#14A073",
                  textDecoration: "underline",
                },
                "&.header-navbar-menu-button-selected": {
                  color: primaryColor || "#14A073",
                  fontWeight: 600,
                  textDecoration: "underline",
                },
                "&.header-navbar-menu-button-open": {
                  color: primaryColor || "#14A073",
                  textDecoration: "underline",
                },
              },
              containedPrimary: {
                backgroundColor: secondaryColor || "#1e285f",
                border: "1px solid transparent",
                "&:hover": {
                  backgroundColor: secondaryLightColor || "#e6fafa",
                  color: secondaryColor || "#1e285f",
                  border: `1px solid ${secondaryColor || "#1e285f"}`,
                },
              },
              outlinedPrimary: {
                borderColor: secondaryColor || "#1e285f",
                color: secondaryColor || "#1e285f",
                "&:hover": {
                  backgroundColor: secondaryLightColor || "#e6fafa",
                  borderColor: secondaryColor || "#1e285f",
                  color: secondaryColor || "#1e285f",
                  border: `1px solid ${secondaryColor || "#1e285f"}`,
                },
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                color: secondaryColor || "#1e285f",
              },
            },
          },
          MuiAppBar: {
            styleOverrides: {
              root: {
                height: 50,
                backgroundColor: "#ffffff",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
              },
            },
          },
          MuiToolbar: {
            styleOverrides: {
              root: {
                minHeight: "50px !important",
                height: "50px !important",
                padding: "0 16px !important",
              },
            },
          },
          MuiAvatar: {
            styleOverrides: {
              root: {
                "&.header-navbar-avatar-icon": {
                  width: 36,
                  height: 36,
                  backgroundColor: primaryColor || "#14A073",
                  color: "#ffffff",
                  fontSize: "14px",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                  },
                },
                "&.header-navbar-avatar-menu-avatar": {
                  width: 40,
                  height: 40,
                  backgroundColor: primaryColor || "#14A073",
                  color: "#ffffff",
                  fontSize: "16px",
                  fontWeight: 600,
                },
              },
            },
          },
          MuiMenu: {
            defaultProps: {
              disableAutoFocusItem: true,
              MenuListProps: {
                autoFocus: false,
              },
            },
            styleOverrides: {
              paper: {
                marginTop: "4px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                minWidth: "200px",
                pointerEvents: "auto",
              },
            },
          },
          MuiDivider: {
            styleOverrides: {
              root: {
                display: "none",
              },
            },
          },
          MuiListSubheader: {
            styleOverrides: {
              root: {
                "&.header-navbar-group-header": {
                  fontSize: "12px",
                  fontWeight: 500,
                  letterSpacing: "0.5px",
                  color: neutralMediumColor || "#bec2b9",
                  paddingTop: "8px",
                  paddingBottom: "4px",
                  paddingLeft: "16px",
                  paddingRight: "16px",
                  lineHeight: 1.5,
                  backgroundColor: "transparent",
                  borderBottom: `1px solid ${neutralLightColor || "#f0efeb"}`,
                },
              },
            },
          },
          MuiMenuItem: {
            styleOverrides: {
              root: {
                fontSize: "14px",
                padding: "10px 16px",
                minHeight: "40px",
                color: secondaryColor || "#1e285f",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                },
                "&.header-navbar-submenu-item": {
                  borderBottom: `1px solid ${neutralLightColor || "#f0efeb"}`,
                  "&:last-child": {
                    borderBottom: "none",
                  },
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                    color: primaryColor || "#14A073",
                  },
                },
                "&.header-navbar-submenu-item-selected": {
                  color: primaryColor || "#14A073",
                  fontWeight: 600,
                  backgroundColor: primaryColor ? `${primaryColor}14` : "rgba(20, 160, 115, 0.08)",
                  borderBottom: `1px solid ${neutralLightColor || "#f0efeb"}`,
                },
                "&.header-navbar-avatar-menu-item": {
                  borderBottom: `1px solid ${neutralLightColor || "#f0efeb"}`,
                  "&:last-child": {
                    borderBottom: "none",
                  },
                },
              },
            },
          },
        },
      }),
    [primaryColor, secondaryColor, secondaryLightColor, neutralMediumColor, neutralLightColor]
  );

  const bgImageUrl = projectDetails?.bg_img_url;

  return (
    <ThemeProvider theme={theme}>
      <div 
        className="h-screen"
        style={{
          backgroundImage: bgImageUrl ? `url(${bgImageUrl})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
        tabIndex={-1}
      >
        {children}
      </div>
    </ThemeProvider>
  );
};

const AppConfig: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Provider store={store}>
      <AppRouterCacheProvider options={{ enableCssLayer: true }}>
        <ThemeWrapper>
          {children}
        </ThemeWrapper>
      </AppRouterCacheProvider>
    </Provider>
  );
};

export default AppConfig;