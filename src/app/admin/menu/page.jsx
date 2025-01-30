"use client";

import AdminMenu from "@/components/admin/menu/AdminMenu";
import AdminProtected from "@/components/auth/AdminProtected";

export default function MenuPage() {
  return (
    <AdminProtected>
    <main className="min-h-screen bg-gray-50">
      <AdminMenu />
    </main>
    </AdminProtected>
  );
}
