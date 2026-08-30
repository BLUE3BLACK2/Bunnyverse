'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from 'lucide-react';
import { HERO_SLIDES, isDarkColor } from '@/data/heroSlides';

export const HomeHero: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef<number | null>(null);
  const isDraggingRef = useRef(false);

  const totalSlides = HERO_SLIDES.length;
  const currentSlide = HERO_SLIDES[currentIndex];
  const isDark = isDarkColor(currentSlide.backgroundColor);

  // ==========================================
  // SLIDE NAVIGATION
  // ==========================================

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // ==========================================
  // AUTOPLAY
  // ==========================================

  const startTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      handleNext();
    }, 5000);
  }, [handleNext]);

  const resetTimer = useCallback(() => {
    startTimer();
  }, [startTimer]);

  const handleSelectSlide = (index: number) => {
    if (index === currentIndex) return;

    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    resetTimer();
  };

  // ==========================================
  // AUTOPLAY LIFECYCLE
  // ==========================================

  useEffect(() => {
    startTimer();

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
      } else {
        startTimer();
      }
    };

    document.addEventListener(
      'visibilitychange',
      handleVisibilityChange
    );

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }

      document.removeEventListener(
        'visibilitychange',
        handleVisibilityChange
      );
    };
  }, [startTimer]);

  // ==========================================
  // TOUCH / SWIPE
  // ==========================================

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;

    const diff =
      touchStartX.current - e.changedTouches[0].clientX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }

      resetTimer();
    }

    touchStartX.current = null;
  };

  // ==========================================
  // MOUSE DRAG
  // ==========================================

  const handleMouseDown = (e: React.MouseEvent) => {
    touchStartX.current = e.clientX;
    isDraggingRef.current = true;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (
      !isDraggingRef.current ||
      touchStartX.current === null
    ) {
      return;
    }

    const diff =
      touchStartX.current - e.clientX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }

      resetTimer();
    }

    touchStartX.current = null;
    isDraggingRef.current = false;
  };

  // ==========================================
  // COLORS
  // ==========================================

  const textColorClass = isDark
    ? 'text-white'
    : 'text-black';

  const subtitleColorClass = isDark
    ? 'text-white/80'
    : 'text-black/80';

  const mutedColorClass = isDark
    ? 'text-white/60'
    : 'text-black/60';

  const badgeBgClass = isDark
    ? 'bg-white/15 text-white border-white/20'
    : 'bg-black/10 text-black border-black/20';

  const primaryBtnClass = isDark
    ? 'bg-white text-black hover:bg-neutral-200'
    : 'bg-black text-white hover:bg-neutral-800';

  const secondaryBtnClass = isDark
    ? 'border-white/40 text-white hover:bg-white/10 hover:border-white'
    : 'border-black/40 text-black hover:bg-black/10 hover:border-black';

  const arrowBtnClass = isDark
    ? 'border-white/30 text-white hover:bg-white hover:text-black'
    : 'border-black/30 text-black hover:bg-black hover:text-white';

  // ==========================================
  // HERO
  // ==========================================

  return (
    <section
      style={{
        backgroundColor: currentSlide.backgroundColor,
        transition: 'background-color 0.6s ease-in-out',
      }}
      className="relative w-full overflow-hidden select-none transition-colors border-b border-black/10 dark:border-white/10"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseEnter={() => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
      }}
      onMouseLeave={() => {
        startTimer();
      }}
    >

      {/* Background Decorative Ambient Watermark */}
      <div
        className={`absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden opacity-5 font-black uppercase text-[18vw] leading-none tracking-tighter whitespace-nowrap ${textColorClass}`}
      >
        BUNNYVERSE
      </div>

      {/* ==========================================
          HERO CONTENT WRAPPER

          IMPORTANT:
          Reduced top spacing to remove excessive
          gap between navbar and hero.
      ========================================== */}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-0 pb-0">

        {/* ==========================================
            MAIN HERO GRID

            items-center keeps left content vertically
            aligned with the right image.
        ========================================== */}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[460px] sm:min-h-[520px] lg:min-h-[580px]">

          {/* ==========================================
              LEFT COLUMN
          ========================================== */}

          <div className="lg:col-span-6 space-y-6 text-center lg:text-left order-2 lg:order-1 z-10">

            <AnimatePresence mode="wait">

              <motion.div
                key={`text-${currentSlide.id}`}
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -15,
                }}
                transition={{
                  duration: 0.4,
                  ease: 'easeOut',
                }}
                className="space-y-4 sm:space-y-5"
              >

                {/* Category & Campaign Eyebrow */}
                <div className="flex items-center justify-center lg:justify-start gap-2.5">

                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-[2px] text-[10px] font-mono font-medium tracking-editorial uppercase border ${badgeBgClass}`}
                  >
                    <Sparkles size={11} />

                    <span>
                      {currentSlide.tag}
                    </span>
                  </span>

                  <span
                    className={`text-[11px] font-mono uppercase tracking-editorial font-medium ${mutedColorClass}`}
                  >
                    {currentSlide.category}
                  </span>

                </div>

                {/* Main Campaign Headline */}
                <div className="space-y-1">

                  <h1
                    className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight uppercase leading-[1.05] drop-shadow-xs ${textColorClass}`}
                  >
                    {currentSlide.title}
                  </h1>

                  {currentSlide.subtitle && (
                    <span
                      className={`block text-xs sm:text-sm font-medium tracking-editorial uppercase pt-1 ${subtitleColorClass}`}
                    >
                      {currentSlide.subtitle}
                    </span>
                  )}

                </div>

                {/* Description */}
                <p
                  className={`text-xs sm:text-sm max-w-lg mx-auto lg:mx-0 leading-relaxed font-normal ${subtitleColorClass}`}
                >
                  {currentSlide.description}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2 w-full sm:w-auto">

                  <Link
                    href={currentSlide.ctaHref}
                    className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-xs font-bold tracking-editorial uppercase rounded-[2px] transition-all shadow-xs ${primaryBtnClass}`}
                  >
                    <span>
                      {currentSlide.ctaText}
                    </span>

                    <ArrowRight size={14} />
                  </Link>

                  {currentSlide.secondaryCtaText &&
                    currentSlide.secondaryCtaHref && (
                      <Link
                        href={currentSlide.secondaryCtaHref}
                        className={`w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 border text-xs font-medium tracking-editorial uppercase rounded-[2px] transition-colors ${secondaryBtnClass}`}
                      >
                        <span>
                          {currentSlide.secondaryCtaText}
                        </span>
                      </Link>
                    )}

                </div>

                {/* Pagination Indicators */}
                <div className="flex items-center justify-center lg:justify-start gap-1.5 sm:gap-2 pt-3 sm:pt-4">

                  {HERO_SLIDES.map((slide, idx) => {

                    const isActive =
                      idx === currentIndex;

                    return (
                      <button
                        key={slide.id}
                        type="button"
                        onClick={() =>
                          handleSelectSlide(idx)
                        }
                        aria-label={`Go to slide ${idx + 1}`}
                        className={`h-1.5 rounded-full transition-all cursor-pointer ${
                          isActive
                            ? isDark
                              ? 'w-7 bg-white'
                              : 'w-7 bg-black'
                            : isDark
                            ? 'w-2 bg-white/35 hover:bg-white/70'
                            : 'w-2 bg-black/35 hover:bg-black/70'
                        }`}
                      />
                    );

                  })}

                </div>

              </motion.div>

            </AnimatePresence>

          </div>

          {/* ==========================================
              RIGHT COLUMN — HERO IMAGE
          ========================================== */}

          <div className="lg:col-span-6 relative flex items-end justify-center order-1 lg:order-2 z-10 self-end min-h-[360px] sm:min-h-[460px] md:min-h-[540px] lg:min-h-[600px]">

            {/* Left Arrow */}

            <button
              type="button"
              onClick={() => {
                handlePrev();
                resetTimer();
              }}
              aria-label="Previous Slide"
              className={`absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 rounded-full border backdrop-blur-xs transition-all cursor-pointer ${arrowBtnClass}`}
            >
              <ChevronLeft
                size={20}
                strokeWidth={1.75}
              />
            </button>

            {/* Main Hero Image */}

            <div className="relative w-full h-[380px] sm:h-[480px] md:h-[560px] lg:h-[620px] xl:h-[680px] flex items-end justify-center overflow-hidden">

              <AnimatePresence mode="wait">

                <motion.div
                  key={`image-${currentSlide.id}`}
                  initial={{
                    opacity: 0,
                    x: direction > 0 ? 90 : -90,
                    scale: 0.96,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    x: direction > 0 ? -90 : 90,
                    scale: 0.96,
                  }}
                  transition={{
                    duration: 0.45,
                    ease: [0.25, 1, 0.5, 1],
                  }}
                  className="relative w-full h-full flex items-end justify-center"
                >

                  <Image
                    src={currentSlide.image}
                    alt={currentSlide.title}
                    fill
                    priority
                    unoptimized
                    onError={(e) => {
                      const target =
                        e.target as HTMLImageElement;

                      if (
                        !target.src.includes(
                          'hero1.png'
                        )
                      ) {
                        target.src =
                          '/hero/hero1.png';
                      }
                    }}
                    className="object-contain object-bottom drop-shadow-2xl hover:scale-102 transition-transform duration-500"
                  />

                </motion.div>

              </AnimatePresence>

            </div>

            {/* Right Arrow */}

            <button
              type="button"
              onClick={() => {
                handleNext();
                resetTimer();
              }}
              aria-label="Next Slide"
              className={`absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 rounded-full border backdrop-blur-xs transition-all cursor-pointer ${arrowBtnClass}`}
            >
              <ChevronRight
                size={20}
                strokeWidth={1.75}
              />
            </button>

          </div>

        </div>

      </div>

    </section>
  );
};