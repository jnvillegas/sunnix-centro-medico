"use client";

import React, { useState, Suspense } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";

interface DashboardLayoutProps {
  readonly children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col">
      {/* Sidebar: Desktop fixed + Mobile off-canvas drawer wrapped in Suspense for prerendering */}
      <Suspense fallback={<aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 z-40 bg-[#0D1927]" />}>
        <Sidebar
          isMobileOpen={mobileMenuOpen}
          onCloseMobile={() => setMobileMenuOpen(false)}
        />
      </Suspense>

      {/* Main Content Area */}
      <div className="lg:pl-64 flex flex-col flex-1 min-w-0 transition-all duration-200">
        {/* Sticky Topbar */}
        <Topbar onOpenMobileMenu={() => setMobileMenuOpen(true)} />

        {/* Viewport for Child Pages */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-h-[calc(100vh-4rem)]">
          <div className="max-w-7xl mx-auto w-full">{children}</div>
        </main>
      </div>
    </div>
  );
}
