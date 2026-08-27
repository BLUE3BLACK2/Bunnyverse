'use client';

import React, { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { CATEGORIES } from '@/data/categories';
import { ProductCard } from '@/components/products/ProductCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { SortOption } from '@/types';

function NewArrivalsContent() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSort, setSelectedSort] = useState<SortOption>('newest');

  // Filter for new arrivals
  const newArrivals = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Must be a new arrival
      if (!product.isNew) return false;

      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (selectedSort === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (selectedSort === 'price_asc') {
        return a.price - b.price;
      }
      if (selectedSort === 'price_desc') {
        return b.price - a.price;
      }
      if (selectedSort === 'rating') {
        return b.rating - a.rating;
      }
      return 0;
    });
  }, [selectedCategory, selectedSort]);

  return (
    <div className="bg-white dark:bg-black min-h-screen py-8 md:py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Breadcrumb Bar */}
        <nav className="flex items-center gap-2 text-xs text-[#777777] dark:text-[#888888]">
          <Link href="/" className="hover:text-black dark:hover:text-white transition-colors">
            HOME
          </Link>
          <ChevronRight size={12} />
          <span className="text-black dark:text-white uppercase">NEW ARRIVALS</span>
        </nav>

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-4 border-b border-[#E5E5E5] dark:border-[#292929]">
          <div>
            <span className="text-[10px] uppercase font-medium tracking-editorial text-[#777777] dark:text-[#888888] block">
              LATEST COLLECTION DROPS
            </span>
            <h1 className="text-2xl sm:text-3xl font-medium tracking-tight uppercase text-black dark:text-white mt-0.5">
              New Arrivals
            </h1>
            <p className="text-xs text-[#777777] dark:text-[#888888] mt-1">
              Showing {newArrivals.length} new releases
            </p>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-medium tracking-editorial uppercase text-[#777777] dark:text-[#888888]">
              SORT BY:
            </span>
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value as SortOption)}
              className="px-3 py-1.5 bg-white dark:bg-[#0A0A0A] border border-[#E5E5E5] dark:border-[#292929] rounded-[2px] text-xs text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white"
            >
              <option value="newest">Newest First</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating">Highest Rating</option>
            </select>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-[2px] text-xs font-medium uppercase tracking-editorial transition-colors cursor-pointer shrink-0 ${
              selectedCategory === 'all'
                ? 'bg-black text-white dark:bg-white dark:text-black'
                : 'bg-[#F7F7F7] dark:bg-[#111111] text-black dark:text-white border border-[#E5E5E5] dark:border-[#292929] hover:border-black'
            }`}
          >
            All Categories
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-3 py-1.5 rounded-[2px] text-xs font-medium uppercase tracking-editorial transition-colors cursor-pointer shrink-0 ${
                selectedCategory === cat.slug
                  ? 'bg-black text-white dark:bg-white dark:text-black'
                  : 'bg-[#F7F7F7] dark:bg-[#111111] text-black dark:text-white border border-[#E5E5E5] dark:border-[#292929] hover:border-black'
              }`}
            >
              {cat.name.split('&')[0].trim()}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {newArrivals.length === 0 ? (
          <EmptyState
            type="search"
            title="No New Arrivals in this Category"
            description="Try selecting another category or check back soon for upcoming drops."
            actionText="VIEW ALL NEW ARRIVALS"
            onActionClick={() => setSelectedCategory('all')}
          />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 pt-2">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function NewArrivalsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white dark:bg-black p-12 text-center text-xs">Loading New Arrivals...</div>}>
      <NewArrivalsContent />
    </Suspense>
  );
}
