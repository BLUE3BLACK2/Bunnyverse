'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <>
      {/* 1. NEWSLETTER SECTION — Restored to Standard Monochrome Theme */}
      <section className="bg-white dark:bg-black text-black dark:text-white border-t border-[#E5E5E5] dark:border-[#292929] py-10 sm:py-12 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-6 space-y-1">
              <span className="text-[10px] uppercase font-medium tracking-editorial text-[#777777] dark:text-[#888888] block">
                NEWSLETTER
              </span>
              <h3 className="text-base sm:text-lg font-medium tracking-tight uppercase text-black dark:text-white">
                JOIN THE BUNNIES CLUB FOR EXCLUSIVE DROPS
              </h3>
              <p className="text-xs text-[#777777] dark:text-[#888888]">
                Be the first to receive secret pre-orders, lookbook releases, and member capsule updates.
              </p>
            </div>

            <div className="lg:col-span-6 flex justify-start lg:justify-end">
              {subscribed ? (
                <div className="flex items-center gap-2 p-2.5 bg-black text-white dark:bg-white dark:text-black rounded-[2px] text-xs font-medium tracking-editorial uppercase">
                  <Check size={14} />
                  <span>THANK YOU FOR SUBSCRIBING</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 w-full max-w-md">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="flex-1 px-3.5 py-2.5 bg-[#F7F7F7] dark:bg-[#111111] border border-[#E5E5E5] dark:border-[#292929] rounded-[2px] text-xs text-black dark:text-white placeholder-[#777777] dark:placeholder-[#888888] focus:outline-none focus:border-black dark:focus:border-white"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-black text-white dark:bg-white dark:text-black text-xs font-medium tracking-editorial uppercase rounded-[2px] hover:opacity-85 transition-opacity cursor-pointer shrink-0"
                  >
                    SUBSCRIBE
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2. FOOTER SECTION — Solid BUNNYVERSE Blue (#0148C3) in BOTH Light & Dark Themes */}
      <footer className="bg-[#0148C3] text-white pt-12 pb-10 border-t border-[#013AA0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Footer Top Strip: White Bunnyverse Logo */}
          <div className="pb-8 mb-10 border-b border-white/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="relative h-[58px] sm:h-[66px] w-[72px] sm:w-[84px]">
              <Image
                src="/logo/bunnyverse-white.png"
                alt="BUNNYVERSE"
                fill
                unoptimized
                className="object-contain object-left"
              />
            </div>
            <p className="text-xs text-white/80 max-w-md">
              Official-inspired fandom fashion, curated capsule drops & collectible merchandise crafted for Bunnies worldwide.
            </p>
          </div>

          {/* 4 Main Footer Columns */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-10 border-b border-white/20">
            {/* Col 1: Shop */}
            <div className="space-y-3">
              <h4 className="text-[11px] font-bold tracking-editorial uppercase text-white">
                SHOP
              </h4>
              <ul className="space-y-2 text-xs text-white/80">
                <li>
                  <Link href="/shop" className="hover:text-white hover:underline">
                    All Collections
                  </Link>
                </li>
                <li>
                  <Link href="/new-arrivals" className="hover:text-white hover:underline">
                    New Arrivals
                  </Link>
                </li>
                <li>
                  <Link href="/best-sellers" className="hover:text-white hover:underline">
                    Best Sellers
                  </Link>
                </li>
                <li>
                  <Link href="/shop?category=fashion" className="hover:text-white hover:underline">
                    Fashion & Streetwear
                  </Link>
                </li>
                <li>
                  <Link href="/discount" className="hover:text-white hover:underline">
                    Discount & Promotions
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 2: Members */}
            <div className="space-y-3">
              <h4 className="text-[11px] font-bold tracking-editorial uppercase text-white">
                MEMBERS
              </h4>
              <ul className="space-y-2 text-xs text-white/80">
                <li>
                  <Link href="/members/minji" className="hover:text-white hover:underline">
                    01 Minji Edit
                  </Link>
                </li>
                <li>
                  <Link href="/members/hanni" className="hover:text-white hover:underline">
                    02 Hanni Edit
                  </Link>
                </li>
                <li>
                  <Link href="/members/danielle" className="hover:text-white hover:underline">
                    03 Danielle Edit
                  </Link>
                </li>
                <li>
                  <Link href="/members/haerin" className="hover:text-white hover:underline">
                    04 Haerin Edit
                  </Link>
                </li>
                <li>
                  <Link href="/members/hyein" className="hover:text-white hover:underline">
                    05 Hyein Edit
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 3: Customer Care & Help */}
            <div className="space-y-3">
              <h4 className="text-[11px] font-bold tracking-editorial uppercase text-white">
                HELP & CARE
              </h4>
              <ul className="space-y-2 text-xs text-white/80">
                <li>
                  <Link href="/track-order" className="hover:text-white hover:underline flex items-center gap-1">
                    <span>Track Order</span>
                    <ArrowRight size={11} />
                  </Link>
                </li>
                <li>
                  <Link href="/account" className="hover:text-white hover:underline">
                    My Account & Orders
                  </Link>
                </li>
                <li>
                  <Link href="/wishlist" className="hover:text-white hover:underline">
                    Saved Wishlist
                  </Link>
                </li>
                <li>
                  <Link href="/about#shipping" className="hover:text-white hover:underline">
                    Shipping & Safe Delivery
                  </Link>
                </li>
                <li>
                  <Link href="/about#faq" className="hover:text-white hover:underline">
                    Frequently Asked Questions
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 4: About */}
            <div className="space-y-3">
              <h4 className="text-[11px] font-bold tracking-editorial uppercase text-white">
                ABOUT
              </h4>
              <ul className="space-y-2 text-xs text-white/80">
                <li>
                  <Link href="/about" className="hover:text-white hover:underline">
                    About BUNNYVERSE
                  </Link>
                </li>
                <li>
                  <Link href="/about#privacy" className="hover:text-white hover:underline">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/about#terms" className="hover:text-white hover:underline">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="hover:text-white hover:underline font-bold text-white">
                    Merchant Portal →
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-white/70">
            <span>&copy; 2026 BUNNYVERSE. All Rights Reserved. Clean Fashion Merchandise Store.</span>
            <div className="flex items-center gap-4">
              <Link href="/about" className="hover:text-white hover:underline">Project Overview</Link>
              <span>/</span>
              <Link href="/dashboard" className="hover:text-white hover:underline">Admin System</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
