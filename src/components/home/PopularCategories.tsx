'use client';

import React from 'react';
import Link from 'next/link';
import { Tag } from 'lucide-react';

export const PopularCategories: React.FC = () => {
  const categories = [
    { label: 'Official Lightsticks', href: '/shop?category=lightsticks' },
    { label: 'Hoodies & Sweatshirts', href: '/shop?category=fashion' },
    { label: 'Graphic T-Shirts', href: '/shop?category=fashion' },
    { label: 'Collector Photocards', href: '/shop?category=collectibles' },
    { label: 'Varsity & Denim Jackets', href: '/shop?category=fashion' },
    { label: 'Tote Bags & Hats', href: '/shop?category=accessories' },
    { label: 'Audio & Lifestyle', href: '/shop?category=lifestyle' },
    { label: 'OT5 Collector Bundles', href: '/shop?category=bundles' }
  ];

  return (
    <section className="py-8 md:py-10 bg-[#F7F7F7] dark:bg-[#0A0A0A] transition-colors border-b border-[#E5E5E5] dark:border-[#292929]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <Tag size={14} className="text-[#777777] dark:text-[#888888]" />
            <span className="text-xs uppercase font-medium tracking-editorial text-black dark:text-white">
              POPULAR CATEGORIES:
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
            {categories.map((c, idx) => (
              <React.Fragment key={c.label}>
                <Link
                  href={c.href}
                  className="text-[#555555] dark:text-[#B5B5B5] hover:text-black dark:hover:text-white hover:underline transition-colors"
                >
                  {c.label}
                </Link>
                {idx < categories.length - 1 && (
                  <span className="text-[#E5E5E5] dark:text-[#292929] select-none">•</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
