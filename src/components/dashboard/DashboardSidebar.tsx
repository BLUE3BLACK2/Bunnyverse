'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Layers,
  BarChart3,
  ArrowLeft,
  Shield
} from 'lucide-react';

export const DashboardSidebar: React.FC = () => {
  const pathname = usePathname();

  const links = [
    { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Products', href: '/dashboard/products', icon: Package },
    { label: 'Orders', href: '/dashboard/orders', icon: ShoppingBag },
    { label: 'Customers', href: '/dashboard/customers', icon: Users },
    { label: 'Categories', href: '/dashboard/categories', icon: Layers },
    { label: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 }
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white dark:bg-[#0A0E18] border-r border-slate-800 dark:border-[#273244] flex flex-col justify-between p-5 shrink-0 min-h-screen">
      <div className="space-y-6">
        {/* Brand */}
        <div className="flex items-center gap-2 px-2">
          <div className="w-8 h-8 rounded-lg bg-[#0148C3] flex items-center justify-center font-extrabold text-sm">
            BV
          </div>
          <div>
            <span className="font-extrabold text-lg tracking-tight block text-white">
              BUNNY<span className="text-[#3B82F6]">VERSE</span>
            </span>
            <span className="text-[10px] uppercase tracking-widest text-slate-400 block font-bold">
              Merchant Admin
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1.5 pt-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-3 block mb-2">
            Store Management
          </span>
          {links.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-[#0148C3] text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/80 dark:hover:bg-slate-800'
                }`}
              >
                <Icon size={16} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer / Back to Shop */}
      <div className="pt-6 border-t border-slate-800 space-y-3">
        <Link
          href="/"
          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Exit to Customer Store</span>
        </Link>

        <div className="p-3 rounded-xl bg-slate-800/60 dark:bg-slate-800/40 text-[11px] text-slate-400 flex items-center gap-2">
          <Shield size={14} className="text-[#3B82F6] shrink-0" />
          <span>Academic Portal v1.0</span>
        </div>
      </div>
    </aside>
  );
};
