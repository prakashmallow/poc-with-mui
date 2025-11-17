import Loading from "@/components/Loading";
import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Dals - Landing Page",
  description: "Dals - Landing Page",
}

const LandingPage = dynamic(() => import("@/components/LandingPage"), {
  loading: () => <Loading />,
});

export default function Home() {
  return (
    <LandingPage />
  );
}
