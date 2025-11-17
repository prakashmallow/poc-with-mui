import Loading from "@/components/Loading";
import dynamic from "next/dynamic";

const LandingPage = dynamic(() => import("@/components/LandingPage"), {
  loading: () => <Loading />,
});

export default function Home() {
  return (
    <LandingPage />
  );
}
