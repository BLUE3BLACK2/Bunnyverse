'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Shirt, Layers, Tag, Sparkles, Package, ShoppingBag, ArrowRight } from 'lucide-react';
import { HOME_CATEGORIES, HomeCategoryCard } from '@/data/homeCategories';

const ICON_MAP: Record<HomeCategoryCard['iconName'], React.ElementType> = {
  Shirt,
  Layers,
  Tag,
  Sparkles,
  Package,
  ShoppingBag
};

export const ShopByCategory: React.FC = () => {
  const [activeMobileId, setActiveMobileId] = useState<string | null>(null);

  const handleMobileToggle = (id: string) => {
    if (activeMobileId !== id) {
      setActiveMobileId(id);
    }
  };

  return (
    <section id="categories" className="py-12 sm:py-16 md:py-20 bg-white dark:bg-black transition-colors border-b border-[#E5E5E5] dark:border-[#292929]">
      <div className="section-container space-y-8">
        <div className="flex items-end justify-between border-b border-[#E5E5E5] dark:border-[#292929] pb-4">
          <div>
            <span className="text-[10px] uppercase font-mono font-medium tracking-editorial text-[#777777] dark:text-[#888888] block">
              CATALOG DISCOVERY
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-medium tracking-tight uppercase text-black dark:text-white mt-1">
              Shop by Category
            </h2>
          </div>

          <Link
            href="/categories"
            className="group flex items-center gap-1.5 text-xs font-mono tracking-editorial uppercase text-[#555555] dark:text-[#B5B5B5] hover:text-black dark:hover:text-white transition-colors"
          >
            <span>View All Categories</span>
            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4.5">
          {HOME_CATEGORIES.map((cat) => {
            const IconComponent = ICON_MAP[cat.iconName] || Tag;
            const isMobileActive = activeMobileId === cat.id;

            return (
              <Link
                key={cat.id}
                href={cat.href}
                onClick={() => handleMobileToggle(cat.id)}
                className={`group relative flex flex-col justify-between p-5 sm:p-6 rounded-card min-h-[190px] sm:min-h-[220px] transition-all duration-300 ease-out border cursor-pointer select-none shadow-bunnyverse ${
                  isMobileActive
                    ? 'bg-[#0148C3] text-white border-[#0148C3] -translate-y-1'
                    : 'bg-white dark:bg-[#0A0A0A] border-[#E5E5E5] dark:border-[#292929] text-black dark:text-white hover:bg-[#0148C3] dark:hover:bg-[#0148C3] hover:border-[#0148C3] dark:hover:border-[#0148C3] hover:-translate-y-1'
                }`}
              >
                <div className="flex items-start justify-between w-full">
                  <div
                    className={`p-3 rounded-action transition-colors duration-300 ${
                      isMobileActive
                        ? 'bg-white/15 text-white'
                        : 'bg-[#F7F7F7] dark:bg-[#1A1A1A] text-black dark:text-white group-hover:bg-white/15 group-hover:text-white dark:group-hover:bg-white/15 dark:group-hover:text-white'
                    }`}
                  >
                    <IconComponent size={24} strokeWidth={1.75} />
                  </div>

                  <ArrowRight
                    size={14}
                    className={`transition-all duration-300 ${
                      isMobileActive
                        ? 'text-white opacity-100 translate-x-0'
                        : 'text-white/60 group-hover:text-white opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0'
                    }`}
                  />
                </div>

                <div className="space-y-1.5 pt-6">
                  <h3
                    className={`text-xs sm:text-sm font-bold tracking-editorial uppercase leading-tight transition-colors duration-300 ${
                      isMobileActive
                        ? 'text-white'
                        : 'text-black dark:text-white group-hover:text-white dark:group-hover:text-white'
                    }`}
                  >
                    {cat.name}
                  </h3>

                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] sm:text-[11px] font-mono tracking-wider uppercase transition-colors duration-300 ${
                        isMobileActive
                          ? 'text-white/80 font-medium'
                          : 'text-[#777777] dark:text-[#888888] group-hover:text-white/80 dark:group-hover:text-white/80'
                      }`}
                    >
                      {cat.itemCount} Items
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
