'use client';

import React from 'react';
import Image from 'next/image';
import {
  TrendingUp,
  Award,
  Sparkles
} from 'lucide-react';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { useDashboardStore } from '@/store/dashboardStore';

export default function DashboardAnalyticsPage() {
  const { products } = useDashboardStore();

  const memberAnalytics = [
    { name: 'Minji', revenue: 'Rp2.73M', units: 34, growth: '+14%', color: '#1E40AF', biasCount: '194 Fans' },
    { name: 'Hanni', revenue: 'Rp2.98M', units: 42, growth: '+22%', color: '#EC4899', biasCount: '215 Fans' },
    { name: 'Danielle', revenue: 'Rp2.23M', units: 28, growth: '+12%', color: '#F59E0B', biasCount: '162 Fans' },
    { name: 'Haerin', revenue: 'Rp2.48M', units: 38, growth: '+19%', color: '#10B981', biasCount: '188 Fans' },
    { name: 'Hyein', revenue: 'Rp1.98M', units: 26, growth: '+10%', color: '#8B5CF6', biasCount: '133 Fans' }
  ];

  const categoryPerformance = [
    { name: 'Fashion & Apparel', percent: 38, amount: 'Rp4.71M' },
    { name: 'Collectibles & Photocards', percent: 26, amount: 'Rp3.22M' },
    { name: 'Lightsticks & Concert Gear', percent: 20, amount: 'Rp2.48M' },
    { name: 'Accessories', percent: 10, amount: 'Rp1.24M' },
    { name: 'Lifestyle & Stationeries', percent: 6, amount: 'Rp744K' }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader
        title="Business Intelligence & Fan Analytics"
        subtitle="In-depth analysis on member capsule demand, category velocity, and customer loyalty."
      />

      <main className="p-6 space-y-6 flex-1">
        {/* Top Summary Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-3xl bg-white dark:bg-[#151B26] border border-slate-200/80 dark:border-[#273244] space-y-2">
            <span className="text-xs font-bold uppercase text-slate-400">Average Order Value (AOV)</span>
            <div className="text-2xl font-mono font-extrabold text-slate-900 dark:text-white">
              Rp486.200
            </div>
            <span className="text-xs text-emerald-500 font-semibold flex items-center gap-1">
              <TrendingUp size={14} /> +8.2% vs last month
            </span>
          </div>

          <div className="p-5 rounded-3xl bg-white dark:bg-[#151B26] border border-slate-200/80 dark:border-[#273244] space-y-2">
            <span className="text-xs font-bold uppercase text-slate-400">Conversion Rate</span>
            <div className="text-2xl font-mono font-extrabold text-slate-900 dark:text-white">
              4.85%
            </div>
            <span className="text-xs text-emerald-500 font-semibold flex items-center gap-1">
              <TrendingUp size={14} /> Top 10% in K-pop eCommerce
            </span>
          </div>

          <div className="p-5 rounded-3xl bg-white dark:bg-[#151B26] border border-slate-200/80 dark:border-[#273244] space-y-2">
            <span className="text-xs font-bold uppercase text-slate-400">Repeat Customer Rate</span>
            <div className="text-2xl font-mono font-extrabold text-slate-900 dark:text-white">
              38.2%
            </div>
            <span className="text-xs text-slate-400">High loyalty among Bunnies club</span>
          </div>
        </div>

        {/* Member Merchandise Performance Matrix */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#151B26] border border-slate-200/80 dark:border-[#273244] space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-[#273244]">
            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles size={18} className="text-[#0148C3]" />
                <span>Member Capsule Sales Performance (Oldest to Youngest)</span>
              </h3>
              <p className="text-xs text-slate-400">
                Direct correlation between member showcase interaction and cart checkouts.
              </p>
            </div>
            <span className="text-xs font-bold uppercase text-[#0148C3] bg-[#0148C3]/10 px-3 py-1 rounded-full">
              Full OT5 Tracked
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {memberAnalytics.map((m, idx) => (
              <div
                key={m.name}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-slate-400">0{idx + 1}</span>
                  <span className="text-[10px] font-bold text-emerald-500">{m.growth}</span>
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: m.color }} />
                    <h4 className="font-extrabold text-sm text-slate-900 dark:text-white uppercase">
                      {m.name}
                    </h4>
                  </div>
                  <span className="text-[11px] text-slate-400">{m.biasCount}</span>
                </div>

                <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                  <span className="text-xs text-slate-400 block">Total Revenue</span>
                  <span className="text-base font-mono font-extrabold text-[#0148C3] dark:text-[#93c5fd]">
                    {m.revenue}
                  </span>
                  <span className="block text-[11px] text-slate-500 font-semibold mt-0.5">
                    {m.units} items sold
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Breakdown & Top Performing Products */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Category Share */}
          <div className="lg:col-span-6 p-6 rounded-3xl bg-white dark:bg-[#151B26] border border-slate-200/80 dark:border-[#273244] space-y-5">
            <div className="pb-3 border-b border-slate-100 dark:border-[#273244]">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                Category Sales Velocity
              </h3>
              <p className="text-xs text-slate-400">Revenue split across merchandise classes</p>
            </div>

            <div className="space-y-4">
              {categoryPerformance.map((c) => (
                <div key={c.name} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-800 dark:text-slate-200">{c.name}</span>
                    <span className="font-mono text-slate-900 dark:text-white">{c.amount} ({c.percent}%)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#0148C3] dark:bg-[#3B82F6]"
                      style={{ width: `${c.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top 5 Products Leaderboard */}
          <div className="lg:col-span-6 p-6 rounded-3xl bg-white dark:bg-[#151B26] border border-slate-200/80 dark:border-[#273244] space-y-5">
            <div className="pb-3 border-b border-slate-100 dark:border-[#273244]">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <Award size={18} className="text-amber-500" />
                <span>Top Revenue Products</span>
              </h3>
              <p className="text-xs text-slate-400">All-time bestselling merchandise</p>
            </div>

            <div className="space-y-3">
              {products.slice(0, 4).map((p, idx) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#0148C3]/10 text-[#0148C3] font-bold flex items-center justify-center text-xs shrink-0">
                      {idx + 1}
                    </span>
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-white dark:bg-slate-800">
                      <Image src={p.image} alt={p.name} fill className="object-cover" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white truncate max-w-[180px]">
                        {p.name}
                      </h4>
                      <span className="text-[11px] text-slate-400">
                        {p.reviewCount} verified reviews
                      </span>
                    </div>
                  </div>

                  <span className="font-mono font-extrabold text-slate-900 dark:text-white">
                    Rp{p.price.toLocaleString('id-ID')}
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
