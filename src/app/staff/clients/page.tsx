import Loading from "@/components/Loading";
import { Metadata } from "next"
import dynamic from "next/dynamic"
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Clients",
  description: "Clients",
}

const Clients = dynamic(() => import("@/components/staff/clients"), {
  loading: () => <Loading />,
});

export default function ClientsPage() {
  return (
    <Suspense fallback={<Loading />}>
      <Clients />
    </Suspense>
  )
}