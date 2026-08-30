'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight, Tag, Copy, Check } from 'lucide-react';
import { PROMOTIONS, Promotion } from '@/data/promotions';

export const FlashSaleBanner: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<number>(1);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const touchStartX = useRef<number | null>(null);
  const mouseStartX = useRef<number | null>(null);
  const isDraggingRef = useRef(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentPromo: Promotion = PROMOTIONS[currentIndex];

  // Advance to next slide
  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % PROMOTIONS.length);
  }, []);

  // Back to previous slide
  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + PROMOTIONS.length) % PROMOTIONS.length);
  }, []);

  // Direct select slide
  const handleSelectPromo = (index: number) => {
    if (index === currentIndex) return;
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    resetTimer();
  };

  // Timer helper: starts/restarts the 5000ms autoplay
  const startTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      handleNext();
    }, 5000);
  }, [handleNext]);

  // Reset timer on any manual user interaction
  const resetTimer = useCallback(() => {
    startTimer();
  }, [startTimer]);

  // Autoplay lifecycle (5 seconds)
  useEffect(() => {
    startTimer();

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
      } else {
        // Tab visible: restart 5-second countdown smoothly
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

  // Copy voucher code
  const handleCopyCode = (code: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
    }
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
    <section className="py-10 md:py-14 bg-white dark:bg-black transition-colors border-b border-[#E5E5E5] dark:border-[#292929] select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Section Header */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-medium tracking-editorial text-[#777777] dark:text-[#888888] block">
              EXCLUSIVE OFFERS & CAMPAIGNS
            </span>
            <h2 className="text-xl sm:text-2xl font-medium tracking-tight uppercase text-black dark:text-white mt-0.5">
              More Ways to Save
            </h2>
          </div>
        </div>

        {/* Main Promotional Banner Structure with Arrows on Left & Right ([ ← ] [ CARD ] [ → ]) */}
        <div className="flex items-center gap-1.5 sm:gap-3.5">
          {/* Left Arrow Beside Card */}
          <button
            type="button"
            onClick={onPrevClick}
            aria-label="Previous Promotion"
            className="p-1.5 sm:p-2.5 rounded-[2px] border border-[#E5E5E5] dark:border-[#292929] text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors cursor-pointer shrink-0"
          >
            <ChevronLeft size={18} strokeWidth={1.5} />
          </button>

          {/* Promotion Card Wrapper */}
          <div
            className="relative flex-1 overflow-hidden rounded-[4px] min-h-[340px] sm:min-h-[300px]"
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
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPromo.id}
                initial={{ x: direction > 0 ? 80 : -80, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: direction > 0 ? -80 : 80, opacity: 0 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                style={{
                  backgroundColor: currentPromo.theme.bg,
                  borderColor: currentPromo.theme.border
                }}
                className="border rounded-[4px] p-4 sm:p-8 lg:p-10 transition-colors shadow-sm"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-center">
                  {/* Left Column: Promotion Details */}
                  <div className="md:col-span-7 space-y-4">
                    {/* Campaign Tag Badge */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        style={{
                          backgroundColor: currentPromo.theme.badgeBg,
                          color: currentPromo.theme.badgeText
                        }}
                        className="text-[10px] uppercase font-bold tracking-editorial px-2.5 py-1 rounded-[2px] inline-flex items-center gap-1 shadow-xs"
                      >
                        <Tag size={11} strokeWidth={2.5} />
                        <span>{currentPromo.tag}</span>
                      </span>

                      <span
                        style={{ color: currentPromo.theme.partnerColor }}
                        className="text-[10px] font-mono uppercase tracking-editorial font-medium"
                      >
                        {currentPromo.partner}
                      </span>
                    </div>

                    {/* Headline in BOLD SERIF Fashion Typography */}
                    <div className="space-y-1">
                      <h3
                        style={{ color: currentPromo.theme.headlineColor }}
                        className="font-editorial-serif font-bold text-3xl sm:text-4xl lg:text-5xl uppercase leading-[1.05] drop-shadow-xs"
                      >
                        {currentPromo.headline}
                      </h3>
                      <p
                        style={{ color: currentPromo.theme.subheadlineColor }}
                        className="text-[11px] uppercase tracking-editorial font-medium"
                      >
                        {currentPromo.subheadline}
                      </p>
                    </div>

                    {/* Supporting Description */}
                    <p
                      style={{ color: currentPromo.theme.descriptionColor }}
                      className="text-xs max-w-lg leading-relaxed font-normal"
                    >
                      {currentPromo.description}
                    </p>

                    {/* Voucher Code & Action Buttons */}
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      {currentPromo.code && (
                        <button
                          type="button"
                          onClick={(e) => handleCopyCode(currentPromo.code!, e)}
                          style={{
                            backgroundColor: currentPromo.theme.codeBg,
                            borderColor: currentPromo.theme.codeBorder,
                            color: currentPromo.theme.codeText
                          }}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 border text-xs font-mono rounded-[2px] hover:opacity-90 transition-opacity cursor-pointer shadow-xs"
                          title="Click to copy promo code"
                        >
                          {copiedCode === currentPromo.code ? (
                            <>
                              <Check size={13} className="text-emerald-400" />
                              <span className="text-emerald-400 font-bold">COPIED!</span>
                            </>
                          ) : (
                            <>
                              <Copy size={13} />
                              <span>CODE: <strong>{currentPromo.code}</strong></span>
                            </>
                          )}
                        </button>
                      )}

                      <Link
                        href={currentPromo.ctaHref}
                        style={{
                          backgroundColor: currentPromo.theme.btnBg,
                          color: currentPromo.theme.btnText
                        }}
                        className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold tracking-editorial uppercase rounded-[2px] hover:opacity-90 transition-opacity shadow-xs"
                      >
                        <span>{currentPromo.ctaText}</span>
                        <ArrowRight size={13} strokeWidth={2.5} />
                      </Link>
                    </div>
                  </div>

                  {/* Right Column: Visual Preview Area */}
                  <div className="md:col-span-5 flex justify-center md:justify-end">
                    <div
                      style={{
                        backgroundColor: currentPromo.theme.imageBg,
                        borderColor: currentPromo.theme.border
                      }}
                      className="relative w-full max-w-[220px] sm:max-w-[320px] aspect-square rounded-[2px] overflow-hidden border p-2 sm:p-3 flex items-center justify-center shadow-inner"
                    >
                      <div className="relative w-full h-full rounded-[2px] overflow-hidden">
                        <Image
                          src={currentPromo.image}
                          alt={currentPromo.headline}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Discount Badge Overlay */}
                      <div
                        style={{
                          backgroundColor: currentPromo.theme.discountBadgeBg,
                          color: currentPromo.theme.discountBadgeText
                        }}
                        className="absolute top-3 right-3 text-[10px] uppercase font-mono font-bold px-2.5 py-1 rounded-[2px] shadow-sm"
                      >
                        {currentPromo.discount}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Arrow Beside Card */}
          <button
            type="button"
            onClick={onNextClick}
            aria-label="Next Promotion"
            className="p-2 sm:p-2.5 rounded-[2px] border border-[#E5E5E5] dark:border-[#292929] text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors cursor-pointer shrink-0"
          >
            <ChevronRight size={18} strokeWidth={1.5} />
          </button>
        </div>

        {/* Minimalist Carousel Dot Indicators (● ○ ○ ○ ○ ○) */}
        <div className="flex items-center justify-center gap-2 pt-2">
          {PROMOTIONS.map((promo, idx) => (
            <button
              key={promo.id}
              type="button"
              onClick={() => handleSelectPromo(idx)}
              aria-label={`Go to promotion slide ${idx + 1}`}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                idx === currentIndex
                  ? 'w-6 h-1.5 bg-black dark:bg-white'
                  : 'w-1.5 h-1.5 bg-[#CCCCCC] dark:bg-[#444444] hover:bg-[#888888]'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
