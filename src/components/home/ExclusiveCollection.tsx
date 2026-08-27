'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { ProductCard } from '../products/ProductCard';

export const ExclusiveCollection: React.FC = () => {
  const exclusiveProducts = PRODUCTS.filter((p) => p.isBestSeller || p.category === 'bundles').slice(0, 4);

  return (
    <section className="py-10 md:py-14 bg-[#F7F7F7] dark:bg-[#0A0A0A] transition-colors border-b border-[#E5E5E5] dark:border-[#292929]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-medium tracking-editorial text-[#777777] dark:text-[#888888] block">
              LIMITED RUNS
            </span>
            <h2 className="text-xl sm:text-2xl font-medium tracking-tight uppercase text-black dark:text-white">
              BUNNYVERSE Exclusive
            </h2>
          </div>

          <Link
            href="/shop?filter=exclusive"
            className="flex items-center gap-1 text-xs tracking-editorial uppercase text-[#555555] dark:text-[#B5B5B5] hover:text-black dark:hover:text-white transition-colors"
          >
            <span>Explore Exclusives</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        {/* 4 Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {exclusiveProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
