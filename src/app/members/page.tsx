'use client';

import React, { useState, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { MEMBERS } from '@/data/members';
import { PRODUCTS } from '@/data/products';
import { CATEGORIES } from '@/data/categories';
import { ProductCard } from '@/components/products/ProductCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { MemberCurationShowcase } from '@/components/members/MemberCurationShowcase';
import { SortOption, MemberId } from '@/types';

function MembersContent() {
  const [selectedMember, setSelectedMember] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSort, setSelectedSort] = useState<SortOption>('featured');

  const currentMemberObj = MEMBERS.find((m) => m.slug === selectedMember);

  const handleMemberShowcaseChange = () => {
    // Member showcase sync hook
  };

  const memberProducts = PRODUCTS.filter((product) => {
    // Member filter
    if (selectedMember !== 'all') {
      if (!product.members.includes(selectedMember as MemberId)) {
        return false;
      }
    }

    // Category filter
    if (selectedCategory !== 'all' && product.category !== selectedCategory) {
      return false;
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

  return (
    <div className="bg-white dark:bg-black min-h-screen py-8 md:py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb Bar */}
        <nav className="flex items-center gap-2 text-xs text-[#777777] dark:text-[#888888]">
          <Link href="/" className="hover:text-black dark:hover:text-white transition-colors">
            HOME
          </Link>
          <ChevronRight size={12} />
          <span className="text-black dark:text-white uppercase">MEMBERS</span>
        </nav>

        {/* 1. Dedicated Member Editorial Carousel Experience */}
        <div className="space-y-6">
          <div className="pb-4 border-b border-[#E5E5E5] dark:border-[#292929]">
            <span className="text-[10px] uppercase font-medium tracking-editorial text-[#777777] dark:text-[#888888] block">
              OFFICIAL FANDOM CAPSULES
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight uppercase text-black dark:text-white mt-0.5">
              Member Curations
            </h1>
            <p className="text-xs text-[#777777] dark:text-[#888888] mt-1">
              Explore dedicated capsule collections, exclusive photoshoot apparel, and signature memorabilia curated for each member.
            </p>
          </div>

          {/* Interactive Member Curation Showcase */}
          <MemberCurationShowcase onMemberChange={handleMemberShowcaseChange} />
        </div>

        {/* 2. Full Member Catalog Browser */}
        <div className="space-y-6 pt-6 border-t border-[#E5E5E5] dark:border-[#292929]">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-medium tracking-editorial text-[#777777] dark:text-[#888888] block">
                FILTER BY BIAS
              </span>
              <h2 className="text-xl font-medium tracking-tight uppercase text-black dark:text-white mt-0.5">
                Browse Member Catalog
              </h2>
            </div>
            <span className="text-xs text-[#777777] dark:text-[#888888] font-mono">
              {memberProducts.length} items
            </span>
          </div>

          {/* 5 Member + All Quick Selector Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => setSelectedMember('all')}
              className={`group text-left p-3 rounded-[2px] border transition-colors cursor-pointer ${
                selectedMember === 'all'
                  ? 'border-black bg-white dark:bg-black dark:border-white shadow-xs'
                  : 'border-[#E5E5E5] dark:border-[#292929] bg-[#F7F7F7] dark:bg-[#111111] hover:border-black dark:hover:border-white'
              }`}
            >
              <div className="relative w-full aspect-square rounded-[2px] overflow-hidden bg-neutral-100 dark:bg-neutral-800 mb-2.5 flex items-center justify-center">
                <span className="text-xs font-mono font-medium text-black dark:text-white uppercase tracking-editorial">
                  ALL
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#777777] block">00</span>
              <h3 className="text-xs font-medium uppercase tracking-nav text-black dark:text-white truncate">
                All Members
              </h3>
            </button>

            {MEMBERS.map((m) => {
              const isSelected = selectedMember === m.slug;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setSelectedMember(m.slug)}
                  className={`group text-left p-3 rounded-[2px] border transition-colors cursor-pointer ${
                    isSelected
                      ? 'border-black bg-white dark:bg-black dark:border-white shadow-xs'
                      : 'border-[#E5E5E5] dark:border-[#292929] bg-[#F7F7F7] dark:bg-[#111111] hover:border-black dark:hover:border-white'
                  }`}
                >
                  <div className="relative w-full aspect-square rounded-[2px] overflow-hidden bg-white dark:bg-black mb-2.5">
                    <Image
                      src={m.image}
                      alt={m.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <span className="text-[10px] font-mono text-[#777777] block">0{m.order}</span>
                  <h3 className="text-xs font-medium uppercase tracking-nav text-black dark:text-white truncate">
                    {m.name}
                  </h3>
                </button>
              );
            })}
          </div>

          {/* Filter & Sort Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 pb-2 border-b border-[#E5E5E5] dark:border-[#292929]">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1 rounded-[2px] text-xs font-medium uppercase tracking-editorial transition-colors cursor-pointer shrink-0 ${
                  selectedCategory === 'all'
                    ? 'bg-black text-white dark:bg-white dark:text-black'
                    : 'bg-[#F7F7F7] dark:bg-[#111111] text-black dark:text-white border border-[#E5E5E5] dark:border-[#292929] hover:border-black'
                }`}
              >
                All Types
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`px-3 py-1 rounded-[2px] text-xs font-medium uppercase tracking-editorial transition-colors cursor-pointer shrink-0 ${
                    selectedCategory === cat.slug
                      ? 'bg-black text-white dark:bg-white dark:text-black'
                      : 'bg-[#F7F7F7] dark:bg-[#111111] text-black dark:text-white border border-[#E5E5E5] dark:border-[#292929] hover:border-black'
                  }`}
                >
                  {cat.name.split('&')[0].trim()}
                </button>
              ))}
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[11px] font-medium tracking-editorial uppercase text-[#777777] dark:text-[#888888]">
                SORT BY:
              </span>
              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value as SortOption)}
                className="px-3 py-1.5 bg-white dark:bg-black border border-[#E5E5E5] dark:border-[#292929] rounded-[2px] text-xs text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white"
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

          {/* Products Grid */}
          {memberProducts.length === 0 ? (
            <EmptyState
              type="search"
              title="No Merchandise Found for this Selection"
              description="Try selecting another category or view all member capsules."
              actionText="VIEW ALL MEMBERS"
              onActionClick={() => {
                setSelectedMember('all');
                setSelectedCategory('all');
              }}
            />
          ) : (
            <div className="space-y-4">
              <span className="text-xs text-[#777777] dark:text-[#888888] block">
                Showing {memberProducts.length} items {currentMemberObj ? `for ${currentMemberObj.name}` : 'across all member curations'}
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {memberProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function MembersPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white dark:bg-black p-12 text-center text-xs">Loading Member Curations...</div>}>
      <MembersContent />
    </Suspense>
  );
}
