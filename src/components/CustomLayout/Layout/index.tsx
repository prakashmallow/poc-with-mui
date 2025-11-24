"use client";
import Loading from "@/components/Loading";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { tenantActions } from "@/redux/Tenant/TenantState";
// import { authActions } from "@/redux/Auth/AuthState";
import { useEffect, useState } from "react";
import HeaderNavBar from "@/components/Header/HeaderNavBar";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useDispatch();
    const loading = useSelector((state: RootState) => state.auth.loading);
    const projectDetailsLoader = useSelector((state: RootState) => state.tenant.projectDetailsLoader);
    const projectDetails = useSelector((state: RootState) => state.tenant.projectDetails);
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        console.log("getProjectDetails");
        dispatch(tenantActions.getProjectDetails({}));
        // dispatch(authActions.getAutherize({}));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const root = document.documentElement;
        
        // Update favicon
        if (projectDetails?.favicon_url) {
          // Update or create favicon link
          const faviconSelectors = ["link[rel='icon']", "link[rel='shortcut icon']"];
          let faviconLink = null;
          
          for (const selector of faviconSelectors) {
            const link = document.querySelector(selector) as HTMLLinkElement;
            if (link) {
              faviconLink = link;
              break;
            }
          }
          
          if (!faviconLink) {
            faviconLink = document.createElement('link');
            faviconLink.rel = 'icon';
            document.head.appendChild(faviconLink);
          }
          faviconLink.href = projectDetails.favicon_url;
        }
        
        if (projectDetails?.font_details) {
          const primaryFontLink = document.createElement('link');
          const headerFontLink = document.createElement('link');
          primaryFontLink.rel = 'stylesheet';
          headerFontLink.rel = 'stylesheet';
          primaryFontLink.href = projectDetails?.font_details?.primary_font_url;
          headerFontLink.href = projectDetails?.font_details?.header_font_url;
          document.head.appendChild(primaryFontLink);
          document.head.appendChild(headerFontLink);
          root.style.setProperty(
            '--primary-font-family',
            `${projectDetails?.font_details?.primary_font_family}, sans-serif, -apple-system`
          );
          root.style.setProperty(
            '--header-font-family',
            `${projectDetails?.font_details?.header_font_family}, sans-serif, -apple-system`
          );
        }
        if (projectDetails?.theme?.custom_css_variables) {
          const customCSSVariables = projectDetails.theme.custom_css_variables;
          root.style.setProperty(
            '--primary-color',
            customCSSVariables.primary_color
          );
          root.style.setProperty(
            '--secondary-color',
            customCSSVariables.secondary_color
          );
          root.style.setProperty(
            '--primary-medium-color',
            customCSSVariables.primary_medium_color
          );
          root.style.setProperty(
            '--primary-light-color',
            customCSSVariables.primary_light_color
          );
          root.style.setProperty(
            '--neutral-medium-color',
            customCSSVariables.neutral_medium_color
          );
          root.style.setProperty(
            '--neutral-light-color',
            customCSSVariables.neutral_light_color
          );
          root.style.setProperty(
            '--secondary-light-color',
            customCSSVariables.secondary_light_color
          );
          root.style.setProperty(
            '--background-color',
            customCSSVariables.background_color
          );
          root.style.setProperty('--info-color', customCSSVariables.info_color);
          root.style.setProperty(
            '--info-light-color',
            customCSSVariables.info_light_color
          );
          root.style.setProperty(
            '--success-color',
            customCSSVariables.success_color
          );
          root.style.setProperty(
            '--success-light-color',
            customCSSVariables.success_light_color
          );
          root.style.setProperty(
            '--warning-color',
            customCSSVariables.warning_color
          );
          root.style.setProperty(
            '--warning-light-color',
            customCSSVariables.warning_light_color
          );
          root.style.setProperty('--danger-color', customCSSVariables.danger_color);
          root.style.setProperty(
            '--danger-light-color',
            customCSSVariables.danger_light_color
          );
        }
      }, [
        projectDetails?.theme?.custom_css_variables,
        projectDetails?.font_details,
        projectDetails?.favicon_url
      ]);

    // Prevent hydration mismatch by only showing loading state after mount
    if (!mounted || loading || projectDetailsLoader) {
        return <main><Loading /></main>;
    }

    if (isAuthenticated) {
        return (
            <main>
                <HeaderNavBar />
                {children}
            </main>
        )
    }
    
    return <main>{children}</main>;
};

export default Layout;