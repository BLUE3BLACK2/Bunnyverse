'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { MEMBERS } from '@/data/members';
import { PRODUCTS } from '@/data/products';
import { MemberId } from '@/types';

export const MemberShowcaseHero: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<number>(1);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const mouseStartX = useRef<number | null>(null);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const currentMember = MEMBERS[currentIndex];

  // 3 compact related merchandise items for the active member
  const memberProducts = PRODUCTS.filter(
    (p) =>
      p.members.includes(currentMember.id as MemberId) ||
      currentMember.featuredProductIds.includes(p.id)
  ).slice(0, 3);

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % MEMBERS.length);
  }, []);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + MEMBERS.length) % MEMBERS.length);
  }, []);

  const handleSelectMember = (index: number) => {
    if (index === currentIndex) return;
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // 6-second autoplay with pause on hover/interaction
  useEffect(() => {
    if (isPaused) {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
      return;
    }
    autoplayTimerRef.current = setInterval(() => {
      handleNext();
    }, 6000);
    return () => {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
    };
  }, [isPaused, handleNext]);

  // Touch Swipe handlers (Mobile)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
    touchStartX.current = null;
  };

  // Mouse Drag handlers (Desktop)
  const handleMouseDown = (e: React.MouseEvent) => {
    mouseStartX.current = e.clientX;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (mouseStartX.current === null) return;
    const diff = mouseStartX.current - e.clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
    mouseStartX.current = null;
  };

  return (
    <section
      className="relative w-full bg-white dark:bg-black text-black dark:text-white py-8 md:py-14 border-b border-[#E5E5E5] dark:border-[#292929] select-none transition-colors"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Minimalist Member Navigation Indicator (01 MINJI · 02 HANNI · 03 DANIELLE · 04 HAERIN · 05 HYEIN) */}
        <div className="flex items-center justify-between pb-6 border-b border-[#E5E5E5] dark:border-[#292929] mb-8">
          <div className="flex items-center gap-4 sm:gap-8 overflow-x-auto no-scrollbar">
            {MEMBERS.map((m, idx) => (
              <button
                key={m.id}
                onClick={() => handleSelectMember(idx)}
                className={`text-xs tracking-editorial transition-colors cursor-pointer whitespace-nowrap pb-1 ${
                  idx === currentIndex
                    ? 'font-semibold text-black dark:text-white border-b-2 border-black dark:border-white'
                    : 'text-[#777777] dark:text-[#888888] hover:text-black dark:hover:text-white font-normal'
                }`}
              >
                0{m.order} {m.name.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <span className="text-xs font-mono text-[#777777] dark:text-[#888888]">
              0{currentIndex + 1} / 0{MEMBERS.length}
            </span>
            <button
              onClick={handlePrev}
              aria-label="Previous Member"
              className="p-1 text-[#555555] dark:text-[#B5B5B5] hover:text-black dark:hover:text-white transition-colors"
            >
              <ChevronLeft size={18} strokeWidth={1.5} />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next Member"
              className="p-1 text-[#555555] dark:text-[#B5B5B5] hover:text-black dark:hover:text-white transition-colors"
            >
              <ChevronRight size={18} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Main Editorial Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Editorial Headline & Subtitle & CTA */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <span className="text-[11px] font-medium tracking-editorial uppercase text-[#777777] dark:text-[#888888] block">
                EDITORIAL CAPSULE // 0{currentMember.order}
              </span>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight uppercase leading-[1.1]">
                {currentMember.name} <br />
                <span className="text-[#555555] dark:text-[#B5B5B5]">Collection</span>
              </h1>

              <p className="text-xs sm:text-sm text-[#555555] dark:text-[#B5B5B5] max-w-md leading-relaxed font-normal">
                Discover official streetwear, accessories, and collectible memorabilia inspired by {currentMember.name}.
              </p>
            </div>

            {/* CTA Button */}
            <div className="pt-1">
              <Link
                href={`/shop?member=${currentMember.slug}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white dark:bg-white dark:text-black text-xs font-medium tracking-editorial uppercase rounded-[4px] hover:opacity-90 transition-opacity"
              >
                <span>SHOP {currentMember.name.toUpperCase()} COLLECTION</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* Staggered Related Merchandise Previews */}
            <div className="pt-6 border-t border-[#E5E5E5] dark:border-[#292929]">
              <span className="text-[10px] uppercase tracking-editorial text-[#777777] dark:text-[#888888] block mb-3">
                Featured {currentMember.name} Merchandise
              </span>

              <div className="grid grid-cols-3 gap-3">
                {memberProducts.map((product, idx) => (
                  <motion.div
                    key={`${currentMember.id}-${product.id}`}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.35, delay: idx * 0.08 }}
                  >
                    <Link
                      href={`/products/${product.slug}`}
                      className="group block bg-[#F7F7F7] dark:bg-[#111111] border border-[#E5E5E5] dark:border-[#292929] rounded-[4px] p-2 hover:border-black dark:hover:border-white transition-colors"
                    >
                      <div className="relative w-full aspect-square rounded-[2px] overflow-hidden bg-white dark:bg-black mb-2">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                      </div>
                      <h4 className="text-[11px] font-normal text-black dark:text-white truncate">
                        {product.name}
                      </h4>
                      <span className="text-[11px] font-medium text-[#555555] dark:text-[#B5B5B5] block">
                        Rp{product.price.toLocaleString('id-ID')}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Square 1:1 Member Container with Video/Image Architecture */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[480px] aspect-square rounded-[4px] overflow-hidden border border-[#E5E5E5] dark:border-[#292929] bg-[#F7F7F7] dark:bg-[#111111]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentMember.id}
                  initial={{ x: direction > 0 ? 60 : -60, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: direction > 0 ? -60 : 60, opacity: 0 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="relative w-full h-full"
                >
                  {/* Video Player Support with Poster Fallback */}
                  <video
                    src={`/hero/hero-${currentMember.slug}.mp4`}
                    poster={currentMember.heroImage}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover hidden"
                  />

                  {/* High Quality Square Image fallback */}
                  <Image
                    src={currentMember.heroImage}
                    alt={currentMember.name}
                    fill
                    priority
                    className="object-cover"
                  />

                  {/* Clean Bottom Label */}
                  <div className="absolute bottom-3 left-3 bg-black/80 dark:bg-white/90 text-white dark:text-black text-[10px] uppercase tracking-editorial px-2.5 py-1 rounded-[2px]">
                    0{currentMember.order} · {currentMember.name}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
