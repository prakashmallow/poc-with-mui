"use client";

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function LinguistEditPage() {
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    // Redirect to basic-information by default
    if (params?.id) {
      router.replace(`/staff/linguists/${params.id}/basic-information`);
    }
  }, [params?.id, router]);

  return null;
}
