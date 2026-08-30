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
    // If mobile user taps an inactive card, reveal its info first
    if (activeMobileId !== id) {
      setActiveMobileId(id);
    }
  };

  return (
    <section id="categories" className="py-12 sm:py-16 md:py-20 bg-white dark:bg-black transition-colors border-b border-[#E5E5E5] dark:border-[#292929]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
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

        {/* Interactive Category Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4.5">
          {HOME_CATEGORIES.map((cat) => {
            const IconComponent = ICON_MAP[cat.iconName] || Tag;
            const isMobileActive = activeMobileId === cat.id;

            return (
              <Link
                key={cat.id}
                href={cat.href}
                onClick={() => handleMobileToggle(cat.id)}
                className={`group relative flex flex-col justify-between p-5 sm:p-6 rounded-[4px] min-h-[190px] sm:min-h-[220px] transition-all duration-300 ease-out border cursor-pointer select-none ${
                  isMobileActive
                    ? 'bg-white text-black border-black/20 shadow-md -translate-y-1'
                    : 'bg-[#0148C3] hover:bg-white text-white hover:text-black border-[#013AA0] hover:border-black/20 hover:shadow-md hover:-translate-y-1'
                }`}
              >
                {/* Top: Icon (White in default state, Blue in hover state) */}
                <div className="flex items-start justify-between w-full">
                  <div
                    className={`p-3 rounded-[2px] transition-colors duration-300 ${
                      isMobileActive
                        ? 'bg-[#0148C3]/10 text-[#0148C3]'
                        : 'bg-white/15 text-white group-hover:bg-[#0148C3]/10 group-hover:text-[#0148C3]'
                    }`}
                  >
                    <IconComponent size={24} strokeWidth={1.75} />
                  </div>

                  {/* Corner Arrow indicator fading in on hover */}
                  <ArrowRight
                    size={14}
                    className={`transition-all duration-300 ${
                      isMobileActive
                        ? 'text-[#0148C3] opacity-100 translate-x-0'
                        : 'text-white/50 group-hover:text-[#0148C3] opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0'
                    }`}
                  />
                </div>

                {/* Bottom Content: Title & Item Count */}
                <div className="space-y-1.5 pt-6">
                  {/* Category Name */}
                  <h3
                    className={`text-xs sm:text-sm font-bold tracking-editorial uppercase leading-tight transition-colors duration-300 ${
                      isMobileActive
                        ? 'text-black'
                        : 'text-white group-hover:text-black'
                    }`}
                  >
                    {cat.name}
                  </h3>

                  {/* Item Count & Subtitle (Smoothly transitions on hover) */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] sm:text-[11px] font-mono tracking-wider uppercase transition-colors duration-300 ${
                        isMobileActive
                          ? 'text-[#0148C3] font-semibold'
                          : 'text-white/70 group-hover:text-[#0148C3] group-hover:font-semibold'
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
