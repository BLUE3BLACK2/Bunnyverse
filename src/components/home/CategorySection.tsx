'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { CATEGORIES } from '@/data/categories';

export const CategorySection: React.FC = () => {
  return (
    <section id="categories" className="py-12 md:py-16 bg-white dark:bg-[#080B12] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Shop by Categories
            </h2>
          </div>
          <Link
            href="/shop"
            className="flex items-center gap-1 text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-[#0148C3] dark:hover:text-[#60a5fa] transition-colors"
          >
            <span>View All Categories</span>
            <ChevronRight size={16} />
          </Link>
        </div>

        {/* 6 Category Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
          {CATEGORIES.map((category) => (
            <Link
              key={category.id}
              href={`/shop?category=${category.slug}`}
              className="group bg-white dark:bg-[#151B26] border border-slate-200 dark:border-[#273244] rounded-2xl p-2.5 flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-md transition-all duration-200"
            >
              {/* Category Image Container */}
              <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 mb-3">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Bottom Info Bar */}
              <div className="px-1.5 pb-1">
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-[#0148C3] dark:group-hover:text-[#93c5fd] transition-colors truncate">
                  {category.name.split('&')[0].trim()}
                </h3>
                <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors mt-0.5">
                  <span>Shop Now</span>
                  <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
