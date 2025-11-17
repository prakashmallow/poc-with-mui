"use client";
import store from "@/redux/store";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { Provider, useSelector } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material";
import { useMemo } from "react";
import { RootState } from "@/redux/store";

const ThemeWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const projectDetails = useSelector((state: RootState) => state.tenant.projectDetails);
  const secondaryColor = projectDetails?.theme?.custom_css_variables?.secondary_color;
  const secondaryLightColor = projectDetails?.theme?.custom_css_variables?.secondary_light_color;

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: "light",
          primary: {
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
              containedPrimary: {
                backgroundColor: secondaryColor || "#1e285f",
                "&:hover": {
                  backgroundColor: secondaryLightColor || "#e6fafa",
                  color: secondaryColor || "#1e285f",
                },
              },
              outlinedPrimary: {
                borderColor: secondaryColor || "#1e285f",
                color: secondaryColor || "#1e285f",
                "&:hover": {
                  backgroundColor: secondaryLightColor || "#e6fafa",
                  borderColor: secondaryColor || "#1e285f",
                  color: secondaryColor || "#1e285f",
                },
              },
              textPrimary: {
                color: secondaryColor || "#1e285f",
                "&:hover": {
                  backgroundColor: secondaryLightColor || "#e6fafa",
                  color: secondaryColor || "#1e285f",
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
        },
      }),
    [secondaryColor, secondaryLightColor]
  );

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

const AppConfig: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Provider store={store}>
      <AppRouterCacheProvider options={{ enableCssLayer: true }}>
        <ThemeWrapper>{children}</ThemeWrapper>
      </AppRouterCacheProvider>
    </Provider>
  );
};

export default AppConfig;