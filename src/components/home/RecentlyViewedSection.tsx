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
    <section className="py-10 md:py-14 bg-white dark:bg-black transition-colors border-t border-[#E5E5E5] dark:border-[#292929]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Section Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#E5E5E5] dark:border-[#292929]">
          <div>
            <span className="text-[10px] uppercase font-medium tracking-editorial text-[#777777] dark:text-[#888888] block">
              BROWSING HISTORY
            </span>
            <div className="flex items-center gap-2 mt-0.5">
              <History size={16} className="text-black dark:text-white" strokeWidth={1.5} />
              <h2 className="text-xl sm:text-2xl font-medium tracking-tight uppercase text-black dark:text-white">
                Recently Viewed
              </h2>
            </div>
          </div>
          <span className="text-xs text-[#777777] dark:text-[#888888] font-mono">
            {items.length} {items.length === 1 ? 'item' : 'items'}
          </span>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {items.slice(0, 6).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
