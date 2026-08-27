'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getBestSellers } from '@/data/products';
import { ProductCard } from '../products/ProductCard';

export const BestSellers: React.FC = () => {
  const products = getBestSellers().slice(0, 5);

  return (
    <section className="py-10 md:py-14 bg-white dark:bg-black transition-colors border-b border-[#E5E5E5] dark:border-[#292929]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-medium tracking-editorial text-[#777777] dark:text-[#888888] block">
              TOP DEMAND
            </span>
            <h2 className="text-xl sm:text-2xl font-medium tracking-tight uppercase text-black dark:text-white">
              Best Sellers
            </h2>
          </div>

          <Link
            href="/best-sellers"
            className="flex items-center gap-1 text-xs tracking-editorial uppercase text-[#555555] dark:text-[#B5B5B5] hover:text-black dark:hover:text-white transition-colors"
          >
            <span>View All Best Sellers</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        {/* 5-Product Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
