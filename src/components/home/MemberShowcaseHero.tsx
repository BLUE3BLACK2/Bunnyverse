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

  const touchStartX = useRef<number | null>(null);
  const mouseStartX = useRef<number | null>(null);
  const isDraggingRef = useRef(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentMember = MEMBERS[currentIndex];

  // 3 compact related merchandise items for the active member
  const memberProducts = PRODUCTS.filter(
    (p) =>
      p.members.includes(currentMember.id as MemberId) ||
      currentMember.featuredProductIds.includes(p.id)
  ).slice(0, 3);

  // Next Member handler
  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % MEMBERS.length);
  }, []);

  // Prev Member handler
  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + MEMBERS.length) % MEMBERS.length);
  }, []);

  // Start / Restart 3000ms timer
  const startTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      handleNext();
    }, 3000);
  }, [handleNext]);

  // Reset timer on any manual interaction
  const resetTimer = useCallback(() => {
    startTimer();
  }, [startTimer]);

  // Direct select member via top tabs
  const handleSelectMember = (index: number) => {
    if (index === currentIndex) return;
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    resetTimer();
  };

  // Autoplay lifecycle (3 seconds)
  useEffect(() => {
    startTimer();

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
      } else {
        // Tab visible again: restart 3-second countdown
        startTimer();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [startTimer]);

  // Arrow click handlers with timer reset
  const onPrevClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    handlePrev();
    resetTimer();
  };

  const onNextClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleNext();
    resetTimer();
  };

  // Touch Swipe handlers (Mobile)
  const handleTouchStart = (e: React.TouchEvent) => {
    isDraggingRef.current = true;
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    isDraggingRef.current = false;
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) handleNext();
      else handlePrev();
      resetTimer();
    }
    touchStartX.current = null;
  };

  // Mouse Drag handlers (Desktop)
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    mouseStartX.current = e.clientX;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    isDraggingRef.current = false;
    if (mouseStartX.current === null) return;
    const diff = mouseStartX.current - e.clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) handleNext();
      else handlePrev();
      resetTimer();
    }
    mouseStartX.current = null;
  };

  return (
    <section
      className="relative w-full bg-white dark:bg-black text-black dark:text-white py-8 md:py-14 border-b border-[#E5E5E5] dark:border-[#292929] select-none transition-colors"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseEnter={() => {
        if (timerRef.current) clearInterval(timerRef.current);
      }}
      onMouseLeave={() => {
        startTimer();
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Minimalist Member Navigation Indicator (01 MINJI · 02 HANNI · 03 DANIELLE · 04 HAERIN · 05 HYEIN) */}
        <div className="flex items-center justify-between pb-6 border-b border-[#E5E5E5] dark:border-[#292929] mb-8">
          <div className="flex items-center gap-4 sm:gap-8 overflow-x-auto no-scrollbar">
            {MEMBERS.map((m, idx) => (
              <button
                key={m.id}
                type="button"
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

          {/* Member Counter */}
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-xs font-mono text-[#777777] dark:text-[#888888]">
              0{currentIndex + 1} / 0{MEMBERS.length}
            </span>
          </div>
        </div>

        {/* Main Editorial Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Editorial Headline & Subtitle & CTA */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <span className="text-[11px] font-medium tracking-editorial uppercase text-[#777777] dark:text-[#888888] block">
                EDITORIAL CAPSULE · 0{currentMember.order}
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
                href={`/members/${currentMember.slug}`}
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

          {/* Right Column: Large Square Member Image with Arrows Directly Beside Image ([ ← ] [ IMAGE ] [ → ]) */}
          <div className="lg:col-span-6 flex items-center justify-center lg:justify-end gap-2 sm:gap-3.5">
            {/* Left Member Arrow */}
            <button
              type="button"
              onClick={onPrevClick}
              aria-label="Previous Member"
              className="p-2 sm:p-2.5 rounded-[2px] border border-[#E5E5E5] dark:border-[#292929] text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors cursor-pointer shrink-0"
            >
              <ChevronLeft size={18} strokeWidth={1.5} />
            </button>

            {/* Square 1:1 Member Container */}
            <div className="relative flex-1 max-w-[440px] sm:max-w-[480px] aspect-square rounded-[4px] overflow-hidden border border-[#E5E5E5] dark:border-[#292929] bg-[#F7F7F7] dark:bg-[#111111]">
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

            {/* Right Member Arrow */}
            <button
              type="button"
              onClick={onNextClick}
              aria-label="Next Member"
              className="p-2 sm:p-2.5 rounded-[2px] border border-[#E5E5E5] dark:border-[#292929] text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors cursor-pointer shrink-0"
            >
              <ChevronRight size={18} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
