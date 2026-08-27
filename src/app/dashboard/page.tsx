'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  DollarSign,
  ShoppingBag,
  Package,
  Users,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { useDashboardStore } from '@/store/dashboardStore';

export default function DashboardOverviewPage() {
  const { products, orders } = useDashboardStore();

  const lowStockProducts = products.filter((p) => p.stock <= 15);

  const memberShare = [
    { name: 'Minji', percent: 22, color: '#1E40AF' },
    { name: 'Hanni', percent: 24, color: '#EC4899' },
    { name: 'Danielle', percent: 18, color: '#F59E0B' },
    { name: 'Haerin', percent: 20, color: '#10B981' },
    { name: 'Hyein', percent: 16, color: '#8B5CF6' }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader
        title="Store Overview"
        subtitle="Performance analytics, recent transactions, and inventory status."
      />

      <main className="p-6 space-y-6 flex-1">
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Total Sales */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#151B26] border border-slate-200/80 dark:border-[#273244] shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Total Revenue
              </span>
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
                <DollarSign size={18} />
              </div>
            </div>
            <div>
              <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
                Rp12.4M
              </span>
              <div className="flex items-center gap-1.5 text-xs text-emerald-500 font-semibold mt-1">
                <TrendingUp size={14} />
                <span>+18.4% vs last month</span>
              </div>
            </div>
          </div>

          {/* Card 2: Orders */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#151B26] border border-slate-200/80 dark:border-[#273244] shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Total Orders
              </span>
              <div className="p-2 rounded-xl bg-blue-500/10 text-[#0148C3] dark:text-[#93c5fd]">
                <ShoppingBag size={18} />
              </div>
            </div>
            <div>
              <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
                128
              </span>
              <div className="flex items-center gap-1.5 text-xs text-emerald-500 font-semibold mt-1">
                <TrendingUp size={14} />
                <span>+12 new this week</span>
              </div>
            </div>
          </div>

          {/* Card 3: Products */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#151B26] border border-slate-200/80 dark:border-[#273244] shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Active Products
              </span>
              <div className="p-2 rounded-xl bg-purple-500/10 text-purple-500">
                <Package size={18} />
              </div>
            </div>
            <div>
              <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
                {products.length}
              </span>
              <div className="text-xs text-slate-400 font-medium mt-1">
                6 categories active
              </div>
            </div>
          </div>

          {/* Card 4: Customers */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#151B26] border border-slate-200/80 dark:border-[#273244] shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Club Customers
              </span>
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
                <Users size={18} />
              </div>
            </div>
            <div>
              <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
                892
              </span>
              <div className="flex items-center gap-1.5 text-xs text-emerald-500 font-semibold mt-1">
                <TrendingUp size={14} />
                <span>+84 this month</span>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Grid: Monthly Revenue & Member Revenue Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sales Trends Chart (CSS / SVG) */}
          <div className="lg:col-span-8 p-6 rounded-3xl bg-white dark:bg-[#151B26] border border-slate-200/80 dark:border-[#273244] space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#273244]">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  Monthly Revenue Trend (2026)
                </h3>
                <p className="text-xs text-slate-400">Gross sales across all channels</p>
              </div>
              <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                Target Exceeded (118%)
              </span>
            </div>

            {/* Custom Bar Chart Visual */}
            <div className="h-48 flex items-end justify-between gap-3 pt-6 px-2">
              {[
                { month: 'Oct', amount: 'Rp7.2M', height: '55%' },
                { month: 'Nov', amount: 'Rp8.9M', height: '68%' },
                { month: 'Dec', amount: 'Rp11.5M', height: '88%' },
                { month: 'Jan', amount: 'Rp9.8M', height: '75%' },
                { month: 'Feb', amount: 'Rp10.4M', height: '80%' },
                { month: 'Mar', amount: 'Rp12.4M', height: '95%', active: true }
              ].map((bar) => (
                <div key={bar.month} className="flex-1 flex flex-col items-center gap-2 group">
                  <span className="text-[10px] font-mono font-bold text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                    {bar.amount}
                  </span>
                  <div className="w-full max-w-[48px] bg-slate-100 dark:bg-slate-800 rounded-t-xl overflow-hidden h-36 flex items-end">
                    <div
                      className={`w-full rounded-t-xl transition-all duration-500 ${
                        bar.active
                          ? 'bg-[#0148C3] shadow-md shadow-[#0148C3]/30'
                          : 'bg-slate-300 dark:bg-slate-700 group-hover:bg-[#0148C3]/70'
                      }`}
                      style={{ height: bar.height }}
                    />
                  </div>
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
                    {bar.month}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Member Revenue Share */}
          <div className="lg:col-span-4 p-6 rounded-3xl bg-white dark:bg-[#151B26] border border-slate-200/80 dark:border-[#273244] space-y-5">
            <div className="pb-3 border-b border-slate-100 dark:border-[#273244]">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                Member Merchandise Share
              </h3>
              <p className="text-xs text-slate-400">Revenue contribution per member</p>
            </div>

            <div className="space-y-3.5">
              {memberShare.map((m) => (
                <div key={m.name} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: m.color }} />
                      <span>{m.name} Collection</span>
                    </span>
                    <span className="font-mono text-slate-900 dark:text-white">{m.percent}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${m.percent}%`, backgroundColor: m.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Grid: Recent Orders (Left) & Low Stock Alerts (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Recent Orders Table */}
          <div className="lg:col-span-7 p-6 rounded-3xl bg-white dark:bg-[#151B26] border border-slate-200/80 dark:border-[#273244] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#273244]">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  Recent Orders
                </h3>
                <p className="text-xs text-slate-400">Latest customer transactions</p>
              </div>
              <Link
                href="/dashboard/orders"
                className="text-xs font-bold text-[#0148C3] dark:text-[#93c5fd] hover:underline"
              >
                View all orders →
              </Link>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-[#273244] text-xs">
              {orders.slice(0, 4).map((o) => (
                <div key={o.id} className="py-3 flex items-center justify-between gap-3">
                  <div>
                    <span className="font-mono font-bold text-slate-900 dark:text-white block">
                      #{o.id}
                    </span>
                    <span className="text-[11px] text-slate-400">{o.customerName}</span>
                  </div>
                  <span className="font-mono font-extrabold text-slate-900 dark:text-white">
                    Rp{o.total.toLocaleString('id-ID')}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      o.status === 'completed'
                        ? 'bg-emerald-500/10 text-emerald-500'
                        : o.status === 'shipped'
                        ? 'bg-blue-500/10 text-blue-500'
                        : 'bg-amber-500/10 text-amber-500'
                    }`}
                  >
                    {o.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Low Stock Alerts */}
          <div className="lg:col-span-5 p-6 rounded-3xl bg-white dark:bg-[#151B26] border border-slate-200/80 dark:border-[#273244] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#273244]">
              <div className="flex items-center gap-2">
                <AlertTriangle size={18} className="text-amber-500" />
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  Low Stock Inventory
                </h3>
              </div>
              <Link
                href="/dashboard/products"
                className="text-xs font-bold text-[#0148C3] dark:text-[#93c5fd] hover:underline"
              >
                Manage stock →
              </Link>
            </div>

            <div className="space-y-3">
              {lowStockProducts.slice(0, 4).map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-white dark:bg-slate-800">
                      <Image src={p.image} alt={p.name} fill className="object-cover" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white truncate max-w-[160px]">
                        {p.name}
                      </h4>
                      <span className="text-[10px] text-slate-400">{p.categoryName}</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-md font-mono font-bold text-xs bg-rose-500/10 text-rose-500">
                    {p.stock} left
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
