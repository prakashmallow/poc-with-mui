import Loading from "@/components/Loading";
import { Metadata } from "next"
import dynamic from "next/dynamic"
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Linguists",
  description: "Linguists",
}

const Linguists = dynamic(() => import("@/components/staff/linguists"), {
  loading: () => <Loading />,
});

export default function LinguistsPage() {
  return (
    <Suspense fallback={<Loading />}>
      <Linguists />
    </Suspense>
  )
}