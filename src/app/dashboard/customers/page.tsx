'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Search, Sparkles } from 'lucide-react';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { useDashboardStore } from '@/store/dashboardStore';

export default function DashboardCustomersPage() {
  const { customers } = useDashboardStore();
  const [search, setSearch] = useState('');

  const filteredCustomers = customers.filter((c) => {
    if (search.trim()) {
      const q = search.toLowerCase();
      return c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader
        title="Customer Directory & VIP Club"
        subtitle="Manage registered Bunnies club members, loyalty tiers, and purchase history."
      />

      <main className="p-6 space-y-6 flex-1">
        {/* Search */}
        <div className="bg-white dark:bg-[#151B26] border border-slate-200/80 dark:border-[#273244] rounded-3xl p-4 sm:p-5 flex items-center justify-between">
          <div className="relative flex-1 max-w-sm">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search customers by name or email..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#0148C3]"
            />
          </div>
          <span className="text-xs font-semibold text-slate-400">
            Total {customers.length} registered customers
          </span>
        </div>

        {/* Customers Table */}
        <div className="bg-white dark:bg-[#151B26] border border-slate-200/80 dark:border-[#273244] rounded-3xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200 dark:border-[#273244] text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="py-3.5 px-6">Customer</th>
                  <th className="py-3.5 px-4">Status / Tier</th>
                  <th className="py-3.5 px-4">Joined</th>
                  <th className="py-3.5 px-4">Completed Orders</th>
                  <th className="py-3.5 px-6 text-right">Lifetime Spend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-[#273244]">
                {filteredCustomers.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-6">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden shrink-0 border border-[#0148C3]/40">
                          <Image src={c.avatar} alt={c.name} fill className="object-cover" />
                        </div>
                        <div>
                          <span className="font-bold text-slate-900 dark:text-white block">
                            {c.name}
                          </span>
                          <span className="text-[11px] text-slate-400">{c.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      {c.status === 'vip' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-[#0148C3] text-white">
                          <Sparkles size={10} /> VIP Gold
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                          Active Member
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">{c.joinedDate}</td>
                    <td className="py-3.5 px-4 font-semibold text-slate-700 dark:text-slate-300">
                      {c.orderCount} orders
                    </td>
                    <td className="py-3.5 px-6 text-right font-mono font-extrabold text-slate-900 dark:text-white">
                      Rp{c.totalSpent.toLocaleString('id-ID')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
