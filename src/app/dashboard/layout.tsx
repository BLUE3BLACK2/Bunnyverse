import React from 'react';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';

export const metadata = {
  title: 'Merchant Dashboard — BUNNYVERSE',
  description: 'Merchant admin management console for BUNNYVERSE e-commerce store.'
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-[#080B12]">
      {/* Sidebar Navigation */}
      <DashboardSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        {children}
      </div>
    </div>
  );
}
