'use client';

import React from 'react';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { ThemeToggle } from '@/components/layout/ThemeToggle';

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title, subtitle }) => {
  return (
    <header className="bg-white dark:bg-[#0E131F] border-b border-slate-200 dark:border-[#273244] px-6 py-4 flex items-center justify-between">
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{subtitle}</p>
        )}
      </div>

      <div className="flex items-center gap-3">
        {/* Customer Store Link */}
        <Link
          href="/shop"
          target="_blank"
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          <span>Live Store</span>
          <ExternalLink size={12} />
        </Link>

        {/* Theme Switcher */}
        <ThemeToggle />

        {/* Admin Profile Chip */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
          <div className="w-8 h-8 rounded-full bg-[#0148C3] text-white flex items-center justify-center font-bold text-xs">
            AD
          </div>
          <div className="hidden md:block text-left">
            <span className="text-xs font-bold text-slate-900 dark:text-white block leading-none">
              Store Manager
            </span>
            <span className="text-[10px] text-slate-400">admin@bunnyverse.com</span>
          </div>
        </div>
      </div>
    </header>
  );
};
