'use client';

import React, { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { ChevronRight, Percent } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { CATEGORIES } from '@/data/categories';
import { ProductCard } from '@/components/products/ProductCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { SortOption } from '@/types';

function DiscountContent() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSort, setSelectedSort] = useState<SortOption>('featured');

  // Filter for discounted products
  const discountProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Must have discount or originalPrice
      if (!product.discount || product.discount <= 0) {
        if (!product.originalPrice || product.originalPrice <= product.price) {
          return false;
        }
      }

      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (selectedSort === 'featured') {
        return (b.discount || 0) - (a.discount || 0);
      }
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
          <span className="text-black dark:text-white uppercase">DISCOUNT</span>
        </nav>

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-4 border-b border-[#E5E5E5] dark:border-[#292929]">
          <div>
            <div className="flex items-center gap-1.5">
              <Percent size={13} className="text-black dark:text-white" />
              <span className="text-[10px] uppercase font-medium tracking-editorial text-[#777777] dark:text-[#888888]">
                LIMITED TIME MARKDOWNS
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-medium tracking-tight uppercase text-black dark:text-white mt-0.5">
              Special Discounts
            </h1>
            <p className="text-xs text-[#777777] dark:text-[#888888] mt-1">
              Showing {discountProducts.length} discounted merchandise items
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
              <option value="featured">Biggest Discount</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating">Highest Rating</option>
              <option value="newest">Newest First</option>
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
        {discountProducts.length === 0 ? (
          <EmptyState
            type="search"
            title="No Discounted Products in this Category"
            description="Try selecting another category or check back during promotional events."
            actionText="VIEW ALL DISCOUNTS"
            onActionClick={() => setSelectedCategory('all')}
          />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 pt-2">
            {discountProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function DiscountPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white dark:bg-black p-12 text-center text-xs">Loading Discounts...</div>}>
      <DiscountContent />
    </Suspense>
  );
}
