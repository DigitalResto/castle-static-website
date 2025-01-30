'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { checkAdminAuth } from '../../util/auth';

export default function AdminProtected({ children }) {
  const router = useRouter();

  useEffect(() => {
    if (!checkAdminAuth()) {
      router.push('/admin/login');
    }
  }, [router]);

  return <>{children}</>;
}