'use client';

import React, { useSyncExternalStore } from 'react';
import { History } from 'lucide-react';
import { useRecentlyViewedStore } from '@/store/recentlyViewedStore';
import { ProductCard } from '../products/ProductCard';

const emptySubscribe = () => () => {};

export const RecentlyViewedSection: React.FC = () => {
  const items = useRecentlyViewedStore((state) => state.items);
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  if (!isClient || items.length === 0) return null;

  return (
    <section className="py-14 bg-slate-50/60 dark:bg-[#0A0E18] border-t border-slate-200/80 dark:border-[#1E293B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-slate-200 dark:border-[#273244]">
          <div className="flex items-center gap-2">
            <History size={18} className="text-[#0148C3] dark:text-[#93C5FD]" />
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Recently Viewed
            </h3>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {items.length} {items.length === 1 ? 'item' : 'items'}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
          {items.slice(0, 6).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
