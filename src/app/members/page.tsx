'use client';

import React, { useState, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { MEMBERS } from '@/data/members';
import { PRODUCTS } from '@/data/products';
import { CATEGORIES } from '@/data/categories';
import { ProductCard } from '@/components/products/ProductCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { SortOption, MemberId } from '@/types';

function MembersContent() {
  const [selectedMember, setSelectedMember] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSort, setSelectedSort] = useState<SortOption>('featured');

  const currentMemberObj = MEMBERS.find((m) => m.slug === selectedMember);

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb Bar */}
        <nav className="flex items-center gap-2 text-xs text-[#777777] dark:text-[#888888]">
          <Link href="/" className="hover:text-black dark:hover:text-white transition-colors">
            HOME
          </Link>
          <ChevronRight size={12} />
          <span className="text-black dark:text-white uppercase">MEMBERS</span>
        </nav>

        {/* Page Header */}
        <div className="pb-4 border-b border-[#E5E5E5] dark:border-[#292929]">
          <span className="text-[10px] uppercase font-medium tracking-editorial text-[#777777] dark:text-[#888888] block">
            INDIVIDUAL CAPSULES
          </span>
          <h1 className="text-2xl sm:text-3xl font-medium tracking-tight uppercase text-black dark:text-white mt-0.5">
            Member Curations
          </h1>
          <p className="text-xs text-[#777777] dark:text-[#888888] mt-1">
            Explore dedicated capsule collections and merchandise curated for each member
          </p>
        </div>

        {/* 5 Member + OT5 Cards Showcase */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          <button
            onClick={() => setSelectedMember('all')}
            className={`group text-left p-3 rounded-[4px] border transition-colors cursor-pointer ${
              selectedMember === 'all'
                ? 'border-black bg-white dark:bg-black dark:border-white shadow-xs'
                : 'border-[#E5E5E5] dark:border-[#292929] bg-[#F7F7F7] dark:bg-[#0A0A0A] hover:border-black dark:hover:border-white'
            }`}
          >
            <div className="relative w-full aspect-square rounded-[2px] overflow-hidden bg-neutral-100 dark:bg-neutral-900 mb-2.5 flex items-center justify-center">
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
                onClick={() => setSelectedMember(m.slug)}
                className={`group text-left p-3 rounded-[4px] border transition-colors cursor-pointer ${
                  isSelected
                    ? 'border-black bg-white dark:bg-black dark:border-white shadow-xs'
                    : 'border-[#E5E5E5] dark:border-[#292929] bg-[#F7F7F7] dark:bg-[#0A0A0A] hover:border-black dark:hover:border-white'
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

        {/* Selected Member Hero Card Banner (if a specific member is chosen) */}
        {currentMemberObj && (
          <div className="bg-[#F7F7F7] dark:bg-[#0A0A0A] border border-[#E5E5E5] dark:border-[#292929] rounded-[4px] p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-4 relative aspect-square max-w-[260px] mx-auto md:mx-0 rounded-[2px] overflow-hidden border border-[#E5E5E5] dark:border-[#292929] bg-white dark:bg-black">
              <Image
                src={currentMemberObj.image}
                alt={currentMemberObj.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="md:col-span-8 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-[#777777] dark:text-[#888888]">
                  0{currentMemberObj.order} · MEMBER CAPSULE
                </span>
                <span className="text-[10px] text-[#777777]">·</span>
                <span className="text-[10px] uppercase tracking-editorial text-[#555555] dark:text-[#B5B5B5]">
                  {currentMemberObj.role}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-medium tracking-tight uppercase text-black dark:text-white">
                {currentMemberObj.name} Signature Collection
              </h2>

              <p className="text-xs text-[#555555] dark:text-[#B5B5B5] leading-relaxed">
                {currentMemberObj.description}
              </p>

              <blockquote className="text-xs italic text-[#777777] dark:text-[#888888] border-l border-black dark:border-white pl-3 py-0.5">
                &ldquo;{currentMemberObj.quote}&rdquo;
              </blockquote>

              <div className="pt-2">
                <Link
                  href={`/members/${currentMemberObj.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-editorial text-black dark:text-white hover:underline"
                >
                  <span>VIEW DEDICATED {currentMemberObj.name.toUpperCase()} PAGE</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Filter & Sort Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 pb-2 border-b border-[#E5E5E5] dark:border-[#292929]">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <button
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
              Showing {memberProducts.length} items {currentMemberObj ? `for ${currentMemberObj.name}` : 'across all member capsules'}
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
  );
}

export default function MembersPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white dark:bg-black p-12 text-center text-xs">Loading Members...</div>}>
      <MembersContent />
    </Suspense>
  );
}
