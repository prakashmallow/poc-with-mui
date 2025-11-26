import Loading from "@/components/Loading";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Edit Client",
    description: "Edit Client",
}

const ClientEdit = dynamic(() => import("@/components/staff/clients/ClientEdit"), {
    loading: () => <Loading />,
});

export default function ClientEditPage() {
    return (
        <Suspense fallback={<Loading />}>
            <ClientEdit />
        </Suspense>
    )
}

