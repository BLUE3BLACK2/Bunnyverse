'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES } from '@/data/categories';

export const ShopByCategory: React.FC = () => {
  return (
    <section id="categories" className="py-10 md:py-14 bg-white dark:bg-black transition-colors border-b border-[#E5E5E5] dark:border-[#292929]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Section Header */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-medium tracking-editorial text-[#777777] dark:text-[#888888] block">
              CATALOG SELECTION
            </span>
            <h2 className="text-xl sm:text-2xl font-medium tracking-tight uppercase text-black dark:text-white">
              Shop by Category
            </h2>
          </div>

          <Link
            href="/categories"
            className="flex items-center gap-1 text-xs tracking-editorial uppercase text-[#555555] dark:text-[#B5B5B5] hover:text-black dark:hover:text-white transition-colors"
          >
            <span>View All Categories</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        {/* 6 Category Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className="group block bg-[#F7F7F7] dark:bg-[#0A0A0A] border border-[#E5E5E5] dark:border-[#292929] rounded-[4px] p-2.5 hover:border-black dark:hover:border-white transition-colors"
            >
              <div className="relative w-full aspect-square rounded-[2px] overflow-hidden bg-white dark:bg-black mb-2.5">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-medium tracking-nav uppercase text-black dark:text-white truncate">
                    {cat.name.split('&')[0].trim()}
                  </h3>
                  <span className="text-[10px] text-[#777777] dark:text-[#888888]">
                    {cat.itemCount} Items
                  </span>
                </div>
                <ArrowRight size={12} className="text-[#777777] group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
