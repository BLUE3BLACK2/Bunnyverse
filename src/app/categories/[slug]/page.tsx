'use client';

import React, { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { CATEGORIES } from '@/data/categories';
import { PRODUCTS } from '@/data/products';
import { MEMBERS } from '@/data/members';
import { ProductCard } from '@/components/products/ProductCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';
import { SortOption, MemberId } from '@/types';

export default function CategoryDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const category = CATEGORIES.find((c) => c.slug === slug);
  const [selectedMember, setSelectedMember] = useState<string>('all');
  const [selectedSort, setSelectedSort] = useState<SortOption>('featured');

  const categoryProducts = useMemo(() => {
    if (!category) return [];

    return PRODUCTS.filter((product) => {
      // Must match category
      if (product.category !== category.slug) return false;

      // Member filter
      if (selectedMember !== 'all') {
        if (!product.members.includes(selectedMember as MemberId)) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (selectedSort === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (selectedSort === 'best_selling') {
        return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
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
  }, [category, selectedMember, selectedSort]);

  if (!category) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-medium tracking-tight text-black dark:text-white uppercase mb-2">
          CATEGORY NOT FOUND
        </h1>
        <p className="text-xs text-[#777777] dark:text-[#888888] mb-6">
          The category you are looking for does not exist.
        </p>
        <Link href="/categories">
          <Button variant="primary">VIEW ALL CATEGORIES</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-black min-h-screen py-8 md:py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Breadcrumb Bar */}
        <nav className="flex items-center gap-2 text-xs text-[#777777] dark:text-[#888888]">
          <Link href="/" className="hover:text-black dark:hover:text-white transition-colors">
            HOME
          </Link>
          <ChevronRight size={12} />
          <Link href="/categories" className="hover:text-black dark:hover:text-white transition-colors">
            CATEGORIES
          </Link>
          <ChevronRight size={12} />
          <span className="text-black dark:text-white uppercase">{category.name}</span>
        </nav>

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-4 border-b border-[#E5E5E5] dark:border-[#292929]">
          <div>
            <span className="text-[10px] uppercase font-medium tracking-editorial text-[#777777] dark:text-[#888888] block">
              CATEGORY ARCHIVE
            </span>
            <h1 className="text-2xl sm:text-3xl font-medium tracking-tight uppercase text-black dark:text-white mt-0.5">
              {category.name}
            </h1>
            <p className="text-xs text-[#777777] dark:text-[#888888] mt-1">
              {category.description} · Showing {categoryProducts.length} items
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
              <option value="featured">Featured</option>
              <option value="newest">Newest First</option>
              <option value="best_selling">Best Selling</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating">Highest Rating</option>
            </select>
          </div>
        </div>

        {/* Member Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs">
          <span className="text-[10px] uppercase font-medium tracking-editorial text-[#777777] shrink-0">
            FILTER MEMBER:
          </span>
          <button
            onClick={() => setSelectedMember('all')}
            className={`px-3 py-1.5 rounded-[2px] text-xs font-medium uppercase tracking-editorial transition-colors cursor-pointer shrink-0 ${
              selectedMember === 'all'
                ? 'bg-black text-white dark:bg-white dark:text-black'
                : 'bg-[#F7F7F7] dark:bg-[#111111] text-black dark:text-white border border-[#E5E5E5] dark:border-[#292929] hover:border-black'
            }`}
          >
            All Members
          </button>
          {MEMBERS.map((m) => (
            <button
              key={m.id}
              onClick={() => setSelectedMember(m.slug)}
              className={`px-3 py-1.5 rounded-[2px] text-xs font-medium uppercase tracking-editorial transition-colors cursor-pointer shrink-0 ${
                selectedMember === m.slug
                  ? 'bg-black text-white dark:bg-white dark:text-black'
                  : 'bg-[#F7F7F7] dark:bg-[#111111] text-black dark:text-white border border-[#E5E5E5] dark:border-[#292929] hover:border-black'
              }`}
            >
              {m.name}
            </button>
          ))}
          <button
            onClick={() => setSelectedMember('group')}
            className={`px-3 py-1.5 rounded-[2px] text-xs font-medium uppercase tracking-editorial transition-colors cursor-pointer shrink-0 ${
              selectedMember === 'group'
                ? 'bg-black text-white dark:bg-white dark:text-black'
                : 'bg-[#F7F7F7] dark:bg-[#111111] text-black dark:text-white border border-[#E5E5E5] dark:border-[#292929] hover:border-black'
            }`}
          >
            OT5 / Group
          </button>
        </div>

        {/* Product Grid */}
        {categoryProducts.length === 0 ? (
          <EmptyState
            type="search"
            title="No Products Found in this Category"
            description="Try changing member filters or explore all merchandise in our shop."
            actionText="VIEW ALL CATEGORIES"
            actionHref="/categories"
          />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 pt-2">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Back Link */}
        <div className="pt-6 border-t border-[#E5E5E5] dark:border-[#292929]">
          <Link
            href="/categories"
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-editorial text-[#555555] dark:text-[#B5B5B5] hover:text-black dark:hover:text-white transition-colors"
          >
            <ArrowLeft size={13} />
            <span>BACK TO ALL CATEGORIES</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
