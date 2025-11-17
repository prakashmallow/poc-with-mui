"use client";
import Layout from "./Layout";
import AppConfig from "./AppConfig";

const CustomLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppConfig>
      <Layout>
        {children}
      </Layout>
    </AppConfig>
  );
};

export default CustomLayout;