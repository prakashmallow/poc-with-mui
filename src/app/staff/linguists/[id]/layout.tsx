"use client";

import React from 'react';
import LinguistEditLayout from '@/components/staff/linguists/edit-section/LinguistEditLayout';

export default function LinguistEditLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LinguistEditLayout>{children}</LinguistEditLayout>;
}
