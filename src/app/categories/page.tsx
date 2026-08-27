'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { CATEGORIES } from '@/data/categories';
import { PRODUCTS } from '@/data/products';
import { ProductCard } from '@/components/products/ProductCard';

export default function CategoriesPage() {
  return (
    <div className="bg-white dark:bg-black min-h-screen py-8 md:py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumb Bar */}
        <nav className="flex items-center gap-2 text-xs text-[#777777] dark:text-[#888888]">
          <Link href="/" className="hover:text-black dark:hover:text-white transition-colors">
            HOME
          </Link>
          <ChevronRight size={12} />
          <span className="text-black dark:text-white uppercase">CATEGORIES</span>
        </nav>

        {/* Page Header */}
        <div className="pb-4 border-b border-[#E5E5E5] dark:border-[#292929]">
          <span className="text-[10px] uppercase font-medium tracking-editorial text-[#777777] dark:text-[#888888] block">
            OFFICIAL PRODUCT LINES
          </span>
          <h1 className="text-2xl sm:text-3xl font-medium tracking-tight uppercase text-black dark:text-white mt-0.5">
            Product Categories
          </h1>
          <p className="text-xs text-[#777777] dark:text-[#888888] mt-1">
            Browse official merchandise by department and collection
          </p>
        </div>

        {/* 6 Category Showcase Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => {
            const previewProducts = PRODUCTS.filter((p) => p.category === cat.slug).slice(0, 2);

            return (
              <div
                key={cat.id}
                className="bg-[#F7F7F7] dark:bg-[#0A0A0A] border border-[#E5E5E5] dark:border-[#292929] rounded-[4px] p-5 flex flex-col justify-between group hover:border-black dark:hover:border-white transition-colors"
              >
                <div className="space-y-4">
                  {/* Category Image */}
                  <Link href={`/categories/${cat.slug}`} className="block relative w-full aspect-[4/3] rounded-[2px] overflow-hidden bg-white dark:bg-black border border-[#E5E5E5] dark:border-[#292929]">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>

                  {/* Title & Count */}
                  <div>
                    <div className="flex items-center justify-between">
                      <h2 className="text-base font-medium tracking-tight uppercase text-black dark:text-white">
                        {cat.name}
                      </h2>
                      <span className="text-[11px] font-mono text-[#777777] dark:text-[#888888]">
                        {cat.itemCount} Items
                      </span>
                    </div>
                    <p className="text-xs text-[#555555] dark:text-[#B5B5B5] mt-1 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  {/* Mini Product Previews */}
                  {previewProducts.length > 0 && (
                    <div className="pt-3 border-t border-[#E5E5E5] dark:border-[#292929] space-y-1.5">
                      <span className="text-[9px] font-medium tracking-editorial uppercase text-[#777777] block">
                        Featured in this line:
                      </span>
                      <div className="space-y-1">
                        {previewProducts.map((p) => (
                          <Link
                            key={p.id}
                            href={`/products/${p.slug}`}
                            className="flex items-center justify-between text-xs text-[#555555] dark:text-[#B5B5B5] hover:text-black dark:hover:text-white"
                          >
                            <span className="truncate max-w-[200px]">{p.name}</span>
                            <span className="font-mono text-[11px] shrink-0">Rp{p.price.toLocaleString('id-ID')}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Explore Link */}
                <div className="pt-4 mt-4 border-t border-[#E5E5E5] dark:border-[#292929]">
                  <Link
                    href={`/categories/${cat.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-editorial text-black dark:text-white hover:underline"
                  >
                    <span>EXPLORE {cat.name.split('&')[0].trim()}</span>
                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* All Products Quick Access */}
        <div className="pt-8 border-t border-[#E5E5E5] dark:border-[#292929] space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-medium tracking-tight uppercase text-black dark:text-white">
              POPULAR MERCHANDISE ACROSS ALL CATEGORIES
            </h2>
            <Link
              href="/shop"
              className="flex items-center gap-1 text-xs tracking-editorial uppercase text-[#555555] dark:text-[#B5B5B5] hover:text-black dark:hover:text-white transition-colors"
            >
              <span>View Full Catalog</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {PRODUCTS.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
