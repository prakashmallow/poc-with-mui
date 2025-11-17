"use client";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import Image from "next/image";
import "./LandingPage.scss";
import { Button, Card, CardContent, Typography } from "@mui/material";

const LandingPage = () => {
  const projectDetails = useSelector((state: RootState) => state.tenant.projectDetails);
  return (
    <div 
    className="landing-page"
    style={{
      backgroundImage: `url(${projectDetails?.secondary_bg_img_url || ''})`
      }}
    >
      <div className="logo">
        <Image src={projectDetails?.reverse_logo_url || projectDetails?.logo_url} alt={`${projectDetails?.name || ''}logo`} width={160} height={60} />
      </div>
      <Typography variant="h1" gutterBottom className="text-[32px] text-white mb-0">Access our Services</Typography>
      <div className="text-white text-[14px] font-bold">Sign In or Sign Up to Get Started</div>
      <div className="flex justify-center items-center w-full gap-[20px] mt-[20px]">
            <Card className="h-[270px] w-[400px] p-0">
                <CardContent className="flex flex-col items-center justify-center h-full">
                    <Typography variant="h4" gutterBottom className="text-[32px] mx-[16px]">
                        Linguist Portal
                    </Typography>
                    <Typography variant="body1" gutterBottom className="text-[14px] mb-[16px]">
                        Sign in here if you are a Linguist registered with Dals
                    </Typography>
                    <div className="flex gap-2">
                        <Button variant="outlined" size="large">Sign UP</Button>
                        <Button variant="contained" color="primary" size="large">Sign IN</Button>
                    </div>
                </CardContent>
            </Card>
            <Card className="h-[270px] w-[400px] p-0">
                <CardContent className="flex flex-col items-center justify-center h-full">
                    <Typography variant="h4" gutterBottom className="text-[32px] mx-[16px]">
                        Staff Portal
                    </Typography>
                    <Typography variant="body1" gutterBottom className="text-[14px] mb-[16px]">
                        Sign in here if you work directly for Dals
                    </Typography>
                    <div className="flex gap-2">
                        <Button variant="contained" color="primary" size="large">Single Sign On</Button>
                    </div>
                </CardContent>
            </Card>
      </div>
    </div>  
  );
}

export default LandingPage;