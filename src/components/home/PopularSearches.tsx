'use client';

import React from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';

export const PopularSearches: React.FC = () => {
  const searches = [
    'Lightstick',
    'Haerin',
    'Photocard',
    'Bunny Hoodie',
    'Photoshoot Tee',
    'New Merchandise',
    'OT5',
    'Concert Merchandise',
    'Minji',
    'Hanni',
    'Danielle',
    'Hyein',
    'Varsity Jacket',
    'Keyring',
    'Tumbler'
  ];

  return (
    <section className="py-8 md:py-10 bg-white dark:bg-black transition-colors border-b border-[#E5E5E5] dark:border-[#292929]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <Search size={14} className="text-[#777777] dark:text-[#888888]" />
            <span className="text-xs uppercase font-medium tracking-editorial text-black dark:text-white">
              POPULAR SEARCHES:
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
            {searches.map((term, idx) => (
              <React.Fragment key={term}>
                <Link
                  href={`/shop?search=${encodeURIComponent(term)}`}
                  className="text-[#555555] dark:text-[#B5B5B5] hover:text-black dark:hover:text-white hover:underline transition-colors"
                >
                  {term}
                </Link>
                {idx < searches.length - 1 && (
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
