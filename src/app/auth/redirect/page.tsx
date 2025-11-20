import Loading from "@/components/Loading";
import { Metadata } from "next";
import dynamic from "next/dynamic"

export const metadata: Metadata = {
  title: "Redirecting",
  description: "Redirect to respective page",
}

const Redirect = dynamic(() => import("@/components/auth/Redirect"), {
  loading: () => <Loading />,
});

export default function RedirectPage() {
  return (
    <Redirect />
  )
}