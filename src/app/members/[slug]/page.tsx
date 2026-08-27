'use client';

import React, { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { MEMBERS } from '@/data/members';
import { PRODUCTS } from '@/data/products';
import { CATEGORIES } from '@/data/categories';
import { ProductCard } from '@/components/products/ProductCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';
import { SortOption, MemberId } from '@/types';

export default function MemberDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const member = MEMBERS.find((m) => m.slug === slug);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSort, setSelectedSort] = useState<SortOption>('featured');

  const memberProducts = useMemo(() => {
    if (!member) return [];

    return PRODUCTS.filter((product) => {
      // Must match member
      if (!product.members.includes(member.slug as MemberId)) {
        return false;
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
  }, [member, selectedCategory, selectedSort]);

  if (!member) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-medium tracking-tight text-black dark:text-white uppercase mb-2">
          MEMBER NOT FOUND
        </h1>
        <p className="text-xs text-[#777777] dark:text-[#888888] mb-6">
          The member capsule you are looking for does not exist.
        </p>
        <Link href="/members">
          <Button variant="primary">VIEW ALL MEMBERS</Button>
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
          <Link href="/members" className="hover:text-black dark:hover:text-white transition-colors">
            MEMBERS
          </Link>
          <ChevronRight size={12} />
          <span className="text-black dark:text-white uppercase">{member.name}</span>
        </nav>

        {/* Member Profile Hero Banner */}
        <div className="bg-[#F7F7F7] dark:bg-[#0A0A0A] border border-[#E5E5E5] dark:border-[#292929] rounded-[4px] p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-4 relative aspect-square max-w-[280px] mx-auto md:mx-0 rounded-[2px] overflow-hidden border border-[#E5E5E5] dark:border-[#292929] bg-white dark:bg-black">
            <Image
              src={member.image}
              alt={member.name}
              fill
              priority
              className="object-cover"
            />
          </div>
          <div className="md:col-span-8 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-[#777777] dark:text-[#888888]">
                0{member.order} · SIGNATURE CAPSULE
              </span>
              <span className="text-[10px] text-[#777777]">·</span>
              <span className="text-[10px] uppercase tracking-editorial text-[#555555] dark:text-[#B5B5B5]">
                {member.role}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-medium tracking-tight uppercase text-black dark:text-white">
              {member.name} Edit
            </h1>

            <p className="text-xs text-[#555555] dark:text-[#B5B5B5] leading-relaxed max-w-xl">
              {member.description}
            </p>

            <blockquote className="text-xs italic text-[#777777] dark:text-[#888888] border-l border-black dark:border-white pl-3 py-0.5 max-w-lg">
              &ldquo;{member.quote}&rdquo;
            </blockquote>

            <p className="text-[11px] text-[#777777] dark:text-[#888888] pt-1">
              {member.shortBio}
            </p>
          </div>
        </div>

        {/* Filter & Sort Bar */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-2 border-b border-[#E5E5E5] dark:border-[#292929]">
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

        {/* Product Grid */}
        {memberProducts.length === 0 ? (
          <EmptyState
            type="search"
            title={`No Products in ${member.name}'s Collection matching this filter`}
            description="Try selecting all categories or explore other members."
            actionText="VIEW ALL MEMBERS"
            actionHref="/members"
          />
        ) : (
          <div className="space-y-4">
            <span className="text-xs text-[#777777] dark:text-[#888888] block">
              Showing {memberProducts.length} items for {member.name}
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {memberProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}

        {/* Back Link */}
        <div className="pt-6 border-t border-[#E5E5E5] dark:border-[#292929]">
          <Link
            href="/members"
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-editorial text-[#555555] dark:text-[#B5B5B5] hover:text-black dark:hover:text-white transition-colors"
          >
            <ArrowLeft size={13} />
            <span>BACK TO ALL MEMBERS</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
