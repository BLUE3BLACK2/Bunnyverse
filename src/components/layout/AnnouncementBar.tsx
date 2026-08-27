'use client';

import React from 'react';
import Link from 'next/link';

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="bg-black text-white dark:bg-[#111111] dark:text-[#E5E5E5] text-[11px] font-normal tracking-editorial py-2 px-4 text-center border-b border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-6 flex-wrap uppercase">
        <Link href="/shop?filter=sale" className="hover:underline">
          FREE WORLDWIDE SHIPPING OVER RP750.000
        </Link>
        <span className="hidden sm:inline text-neutral-600">/</span>
        <Link href="/shop?filter=new-arrivals" className="hidden sm:inline hover:underline">
          NEW BUNNIES COLLECTION AVAILABLE NOW
        </Link>
        <span className="hidden lg:inline text-neutral-600">/</span>
        <Link href="/shop" className="hidden lg:inline hover:underline">
          LIMITED MERCH DROP — SHOP NOW
        </Link>
      </div>
    </div>
  );
};
