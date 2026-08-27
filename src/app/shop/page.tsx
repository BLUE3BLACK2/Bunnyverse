'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { X, SlidersHorizontal, ChevronRight } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { CATEGORIES } from '@/data/categories';
import { MEMBERS } from '@/data/members';
import { ProductCard } from '@/components/products/ProductCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { SortOption, MemberId } from '@/types';

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Read URL parameters
  const paramCategory = searchParams.get('category') || 'all';
  const paramMember = searchParams.get('member') || 'all';
  const paramSearch = searchParams.get('search') || '';
  const paramFilter = searchParams.get('filter') || 'all';
  const defaultSort: SortOption =
    paramFilter === 'new-arrivals' || paramFilter === 'new'
      ? 'newest'
      : paramFilter === 'best-sellers' || paramFilter === 'bestseller'
      ? 'best_selling'
      : 'featured';

  const [selectedCategory, setSelectedCategory] = useState<string>(paramCategory);
  const [selectedMember, setSelectedMember] = useState<string>(paramMember);
  const [searchQuery, setSearchQuery] = useState<string>(paramSearch);
  const [selectedPrice, setSelectedPrice] = useState<string>('all');
  const [selectedStock, setSelectedStock] = useState<string>('all');
  const [selectedSort, setSelectedSort] = useState<SortOption>(defaultSort);

  // Effective values combine searchParams & local selection
  const effectiveCategory = selectedCategory !== 'all' ? selectedCategory : paramCategory;
  const effectiveMember = selectedMember !== 'all' ? selectedMember : paramMember;
  const effectiveSearch = searchQuery.trim() ? searchQuery.trim() : paramSearch.trim();

  // Filtering logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (effectiveCategory !== 'all' && product.category !== effectiveCategory) {
        return false;
      }

      // Member filter
      if (effectiveMember !== 'all') {
        if (!product.members.includes(effectiveMember as MemberId)) {
          return false;
        }
      }

      // Price filter
      if (selectedPrice !== 'all') {
        if (selectedPrice === 'under100k' && product.price >= 100000) return false;
        if (selectedPrice === '100k-300k' && (product.price < 100000 || product.price > 300000)) return false;
        if (selectedPrice === '300k-500k' && (product.price < 300000 || product.price > 500000)) return false;
        if (selectedPrice === 'above500k' && product.price <= 500000) return false;
      }

      // Availability filter
      if (selectedStock === 'in-stock' && product.stock <= 0) return false;
      if (selectedStock === 'low-stock' && (product.stock <= 0 || product.stock > 10)) return false;

      // Special Filter: sale or discount
      if ((paramFilter === 'sale' || paramFilter === 'discount') && !product.discount) return false;

      // Search Query filter
      if (effectiveSearch) {
        const query = effectiveSearch.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesCategory = product.categoryName.toLowerCase().includes(query);
        const matchesMembers = product.members.some((m) => m.toLowerCase().includes(query));
        const matchesTags = product.tags.some((t) => t.toLowerCase().includes(query));
        if (!matchesName && !matchesCategory && !matchesMembers && !matchesTags) {
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
  }, [effectiveCategory, effectiveMember, selectedPrice, selectedStock, selectedSort, effectiveSearch, paramFilter]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedMember('all');
    setSelectedPrice('all');
    setSelectedStock('all');
    setSelectedSort('featured');
    router.push('/shop');
  };

  const activeFilterCount =
    (effectiveCategory !== 'all' ? 1 : 0) +
    (effectiveMember !== 'all' ? 1 : 0) +
    (selectedPrice !== 'all' ? 1 : 0) +
    (selectedStock !== 'all' ? 1 : 0) +
    (effectiveSearch ? 1 : 0);

  const currentMemberObj = MEMBERS.find((m) => m.slug === effectiveMember);
  const currentCategoryObj = CATEGORIES.find((c) => c.slug === effectiveCategory);

  return (
    <div className="bg-white dark:bg-black min-h-screen py-8 md:py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Breadcrumb Bar */}
        <nav className="flex items-center gap-2 text-xs text-[#777777] dark:text-[#888888]">
          <Link href="/" className="hover:text-black dark:hover:text-white transition-colors">
            HOME
          </Link>
          <ChevronRight size={12} />
          <Link href="/shop" className="hover:text-black dark:hover:text-white transition-colors">
            SHOP
          </Link>
          {currentMemberObj && (
            <>
              <ChevronRight size={12} />
              <span className="text-black dark:text-white uppercase">{currentMemberObj.name}</span>
            </>
          )}
          {currentCategoryObj && (
            <>
              <ChevronRight size={12} />
              <span className="text-black dark:text-white uppercase">{currentCategoryObj.name}</span>
            </>
          )}
        </nav>

        {/* Page Title & Item Count */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-4 border-b border-[#E5E5E5] dark:border-[#292929]">
          <div>
            <h1 className="text-2xl sm:text-3xl font-medium tracking-tight uppercase text-black dark:text-white">
              {currentMemberObj
                ? `${currentMemberObj.name} Edit`
                : currentCategoryObj
                ? currentCategoryObj.name
                : effectiveSearch
                ? `Search: "${effectiveSearch}"`
                : 'All Merchandise'}
            </h1>
            <p className="text-xs text-[#777777] dark:text-[#888888] mt-1">
              Showing {filteredProducts.length} results
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
              <option value="newest">Newest Arrivals</option>
              <option value="best_selling">Best Selling</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating">Highest Rating</option>
            </select>
          </div>
        </div>

        {/* Active Filter Tags Strip */}
        {activeFilterCount > 0 && (
          <div className="flex items-center gap-2 flex-wrap text-xs">
            <span className="text-[10px] uppercase font-medium tracking-editorial text-[#777777] dark:text-[#888888]">
              ACTIVE FILTERS:
            </span>
            {effectiveCategory !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#F7F7F7] dark:bg-[#111111] border border-[#E5E5E5] dark:border-[#292929] rounded-[2px] text-xs">
                Category: {effectiveCategory}
                <button onClick={() => setSelectedCategory('all')} className="hover:opacity-75">
                  <X size={12} />
                </button>
              </span>
            )}
            {effectiveMember !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#F7F7F7] dark:bg-[#111111] border border-[#E5E5E5] dark:border-[#292929] rounded-[2px] text-xs">
                Member: {effectiveMember}
                <button onClick={() => setSelectedMember('all')} className="hover:opacity-75">
                  <X size={12} />
                </button>
              </span>
            )}
            {selectedPrice !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#F7F7F7] dark:bg-[#111111] border border-[#E5E5E5] dark:border-[#292929] rounded-[2px] text-xs">
                Price Range
                <button onClick={() => setSelectedPrice('all')} className="hover:opacity-75">
                  <X size={12} />
                </button>
              </span>
            )}
            {effectiveSearch && (
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#F7F7F7] dark:bg-[#111111] border border-[#E5E5E5] dark:border-[#292929] rounded-[2px] text-xs">
                &ldquo;{effectiveSearch}&rdquo;
                <button onClick={() => setSearchQuery('')} className="hover:opacity-75">
                  <X size={12} />
                </button>
              </span>
            )}
            <button
              onClick={handleResetFilters}
              className="text-[11px] uppercase tracking-editorial text-black dark:text-white underline hover:opacity-75 ml-2 cursor-pointer"
            >
              CLEAR ALL
            </button>
          </div>
        )}

        {/* Main Catalog Layout (Sidebar Filters + Products Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-2">
          {/* Left Vertical Filter Sidebar */}
          <div className="lg:col-span-3 space-y-6">
            <div className="border border-[#E5E5E5] dark:border-[#292929] rounded-[4px] p-4 bg-white dark:bg-[#0A0A0A] space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#E5E5E5] dark:border-[#292929]">
                <h3 className="text-xs uppercase font-medium tracking-editorial text-black dark:text-white flex items-center gap-2">
                  <SlidersHorizontal size={14} />
                  <span>FILTER CATALOG</span>
                </h3>
                {activeFilterCount > 0 && (
                  <button
                    onClick={handleResetFilters}
                    className="text-[10px] uppercase tracking-editorial text-[#777777] hover:underline"
                  >
                    Reset
                  </button>
                )}
              </div>

              {/* 1. Category Filter */}
              <div className="space-y-2">
                <span className="text-[11px] font-medium tracking-editorial uppercase text-black dark:text-white block">
                  CATEGORY
                </span>
                <div className="space-y-1 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer text-[#555555] dark:text-[#B5B5B5] hover:text-black dark:hover:text-white">
                    <input
                      type="radio"
                      name="category"
                      checked={effectiveCategory === 'all'}
                      onChange={() => setSelectedCategory('all')}
                      className="accent-black dark:accent-white"
                    />
                    <span>All Categories</span>
                  </label>
                  {CATEGORIES.map((c) => (
                    <label
                      key={c.id}
                      className="flex items-center gap-2 cursor-pointer text-[#555555] dark:text-[#B5B5B5] hover:text-black dark:hover:text-white"
                    >
                      <input
                        type="radio"
                        name="category"
                        checked={effectiveCategory === c.slug}
                        onChange={() => setSelectedCategory(c.slug)}
                        className="accent-black dark:accent-white"
                      />
                      <span>{c.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 2. Member Filter */}
              <div className="space-y-2 pt-4 border-t border-[#E5E5E5] dark:border-[#292929]">
                <span className="text-[11px] font-medium tracking-editorial uppercase text-black dark:text-white block">
                  MEMBER
                </span>
                <div className="space-y-1 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer text-[#555555] dark:text-[#B5B5B5] hover:text-black dark:hover:text-white">
                    <input
                      type="radio"
                      name="member"
                      checked={effectiveMember === 'all'}
                      onChange={() => setSelectedMember('all')}
                      className="accent-black dark:accent-white"
                    />
                    <span>All Members</span>
                  </label>
                  {MEMBERS.map((m) => (
                    <label
                      key={m.id}
                      className="flex items-center gap-2 cursor-pointer text-[#555555] dark:text-[#B5B5B5] hover:text-black dark:hover:text-white"
                    >
                      <input
                        type="radio"
                        name="member"
                        checked={effectiveMember === m.slug}
                        onChange={() => setSelectedMember(m.slug)}
                        className="accent-black dark:accent-white"
                      />
                      <span>0{m.order} {m.name}</span>
                    </label>
                  ))}
                  <label className="flex items-center gap-2 cursor-pointer text-[#555555] dark:text-[#B5B5B5] hover:text-black dark:hover:text-white">
                    <input
                      type="radio"
                      name="member"
                      checked={effectiveMember === 'group'}
                      onChange={() => setSelectedMember('group')}
                      className="accent-black dark:accent-white"
                    />
                    <span>OT5 / Group</span>
                  </label>
                </div>
              </div>

              {/* 3. Price Filter */}
              <div className="space-y-2 pt-4 border-t border-[#E5E5E5] dark:border-[#292929]">
                <span className="text-[11px] font-medium tracking-editorial uppercase text-black dark:text-white block">
                  PRICE
                </span>
                <div className="space-y-1 text-xs">
                  {[
                    { id: 'all', label: 'All Prices' },
                    { id: 'under100k', label: 'Under Rp100.000' },
                    { id: '100k-300k', label: 'Rp100.000 – Rp300.000' },
                    { id: '300k-500k', label: 'Rp300.000 – Rp500.000' },
                    { id: 'above500k', label: 'Above Rp500.000' }
                  ].map((p) => (
                    <label
                      key={p.id}
                      className="flex items-center gap-2 cursor-pointer text-[#555555] dark:text-[#B5B5B5] hover:text-black dark:hover:text-white"
                    >
                      <input
                        type="radio"
                        name="price"
                        checked={selectedPrice === p.id}
                        onChange={() => setSelectedPrice(p.id)}
                        className="accent-black dark:accent-white"
                      />
                      <span>{p.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 4. Availability Filter */}
              <div className="space-y-2 pt-4 border-t border-[#E5E5E5] dark:border-[#292929]">
                <span className="text-[11px] font-medium tracking-editorial uppercase text-black dark:text-white block">
                  AVAILABILITY
                </span>
                <div className="space-y-1 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer text-[#555555] dark:text-[#B5B5B5] hover:text-black dark:hover:text-white">
                    <input
                      type="radio"
                      name="stock"
                      checked={selectedStock === 'all'}
                      onChange={() => setSelectedStock('all')}
                      className="accent-black dark:accent-white"
                    />
                    <span>All Availability</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-[#555555] dark:text-[#B5B5B5] hover:text-black dark:hover:text-white">
                    <input
                      type="radio"
                      name="stock"
                      checked={selectedStock === 'in-stock'}
                      onChange={() => setSelectedStock('in-stock')}
                      className="accent-black dark:accent-white"
                    />
                    <span>In Stock</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Right Product Grid (4 Columns Desktop) */}
          <div className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <EmptyState
                type="search"
                title="No Merchandise Found"
                description="We couldn't find any products matching your selected combination of filters."
                actionText="RESET FILTERS"
                onActionClick={handleResetFilters}
              />
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white dark:bg-black p-12 text-center text-xs">Loading Catalog...</div>}>
      <ShopContent />
    </Suspense>
  );
}
