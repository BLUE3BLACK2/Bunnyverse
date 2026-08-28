'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export const HomeHero: React.FC = () => {
  return (
    <section className="relative w-full bg-[#FBFBFB] dark:bg-black transition-colors border-b border-[#E5E5E5] dark:border-[#292929] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Large Editorial Merchandise Visual (Inspired by Reference 1) */}
          <div className="lg:col-span-6 flex justify-center order-2 lg:order-1">
            <div className="relative w-full max-w-[480px] sm:max-w-[520px] aspect-4/5 sm:aspect-square rounded-[4px] overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-[#E5E5E5] dark:border-[#292929] p-4 sm:p-6 flex items-center justify-center shadow-xs">
              {/* Main Lifestyle / Editorial Product Image */}
              <div className="relative w-full h-full rounded-[2px] overflow-hidden bg-white dark:bg-black/60 flex items-center justify-center">
                <Image
                  src="/products/bunny-starter-pack.png"
                  alt="BUNNYVERSE Essentials Collection"
                  fill
                  priority
                  className="object-cover hover:scale-103 transition-transform duration-500"
                />
              </div>

              {/* Editorial Tag Overlay */}
              <div className="absolute top-3.5 left-3.5 sm:top-6 sm:left-6 bg-white/95 dark:bg-black/90 backdrop-blur-xs border border-[#E5E5E5] dark:border-[#292929] px-3 py-1.5 rounded-[2px] shadow-xs flex items-center gap-1.5">
                <Sparkles size={12} className="text-black dark:text-white" />
                <span className="text-[10px] font-mono font-medium uppercase tracking-editorial text-black dark:text-white">
                  NEW SEASON 2026
                </span>
              </div>

              {/* Floating Product Highlight Pill */}
              <div className="absolute bottom-3.5 right-3.5 sm:bottom-6 sm:right-6 bg-white/95 dark:bg-black/90 backdrop-blur-xs border border-[#E5E5E5] dark:border-[#292929] p-2.5 sm:p-3 rounded-[2px] shadow-sm flex items-center gap-2.5 sm:gap-3">
                <div className="relative w-10 h-10 rounded-[2px] overflow-hidden bg-neutral-100 dark:bg-neutral-800 shrink-0">
                  <Image
                    src="/products/binky-bong-special.png"
                    alt="Official Lightstick"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-left">
                  <span className="text-[11px] font-medium text-black dark:text-white block leading-tight">
                    Binky Bong Special
                  </span>
                  <span className="text-[10px] font-mono text-[#777777] dark:text-[#888888]">
                    Rp680.000
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Typography & Clean CTAs (Inspired by Reference 1) */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left order-1 lg:order-2">
            {/* Top Minimalist Line Heading */}
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <span className="w-8 h-px bg-black/40 dark:bg-white/40 hidden sm:inline-block" />
              <span className="text-xs uppercase font-medium tracking-[0.2em] pl-[0.2em] text-[#777777] dark:text-[#888888]">
                BUNNYVERSE ESSENTIALS
              </span>
              <span className="w-8 h-px bg-black/40 dark:bg-white/40 hidden sm:inline-block" />
            </div>

            {/* Main Editorial Headline */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight uppercase text-black dark:text-white leading-[1.08]">
                Discover Products <br className="hidden sm:inline" />
                <span className="font-normal text-[#555555] dark:text-[#B5B5B5]">You&apos;ll Love</span>
              </h1>

              <p className="text-xs sm:text-sm text-[#555555] dark:text-[#B5B5B5] max-w-lg mx-auto lg:mx-0 leading-relaxed font-normal">
                Shop official-inspired merchandise, collectible streetwear, accessories, and limited edition items crafted for Bunnies worldwide.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2 w-full sm:w-auto">
              <Link
                href="/shop"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-black text-white dark:bg-white dark:text-black text-xs font-medium tracking-editorial uppercase rounded-[2px] hover:opacity-85 transition-opacity shadow-xs"
              >
                <span>SHOP NOW</span>
                <ArrowRight size={14} />
              </Link>

              <Link
                href="/new-arrivals"
                className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 bg-white dark:bg-black text-black dark:text-white border border-[#E5E5E5] dark:border-[#292929] text-xs font-medium tracking-editorial uppercase rounded-[2px] hover:border-black dark:hover:border-white transition-colors"
              >
                <span>EXPLORE COLLECTION</span>
              </Link>
            </div>

            {/* Customer Trust Proof */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-3 text-xs text-[#777777] dark:text-[#888888]">
              <div className="flex -space-x-1.5 overflow-hidden">
                <div className="relative inline-block w-6 h-6 rounded-full ring-2 ring-white dark:ring-black overflow-hidden bg-neutral-200">
                  <Image src="/members/minji.jpg" alt="Fan" fill className="object-cover" />
                </div>
                <div className="relative inline-block w-6 h-6 rounded-full ring-2 ring-white dark:ring-black overflow-hidden bg-neutral-200">
                  <Image src="/members/hanni.jpg" alt="Fan" fill className="object-cover" />
                </div>
                <div className="relative inline-block w-6 h-6 rounded-full ring-2 ring-white dark:ring-black overflow-hidden bg-neutral-200">
                  <Image src="/members/haerin.jpg" alt="Fan" fill className="object-cover" />
                </div>
              </div>
              <span className="text-[11px] font-normal">
                Loved by <strong>50,000+</strong> Bunnies worldwide
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
