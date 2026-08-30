'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, ShoppingBag, Heart, Sparkles } from 'lucide-react';
import { Product } from '@/types';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useToastStore } from '../ui/Toast';

interface EditorialProductFlowProps {
  title: string;
  tag: string;
  description: string;
  products: Product[];
  ctaText: string;
  ctaHref: string;
  sectionId?: string;
  speed?: number; // pixels per second (e.g. 26px/s)
}

export const EditorialProductFlow: React.FC<EditorialProductFlowProps> = ({
  title,
  tag,
  description,
  products,
  ctaText,
  ctaHref,
  sectionId,
  speed = 26
}) => {
  const router = useRouter();
  const { addItem } = useCartStore();
  const { isInWishlist, toggleWishlist } = useWishlistStore();
  const { showToast } = useToastStore();

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // 13 products triplicated for seamless infinite circulation
  const flowItems = React.useMemo(() => {
    const list = products.slice(0, 13);
    return [...list, ...list, ...list];
  }, [products]);

  const originalCount = Math.min(products.length, 13);

  // Responsive state for JSX layout styles
  const [itemWidth, setItemWidth] = useState<number>(320);
  const [itemGap, setItemGap] = useState<number>(24);

  // Core Persistent State Refs (stable across all renders, immune to lifecycle destruction)
  const currentXRef = useRef(0);
  const speedRef = useRef(speed);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  // Responsive dimension refs for rAF loop
  const containerWidthRef = useRef(1200);
  const itemWidthRef = useRef(320);
  const itemGapRef = useRef(24);
  const singleSetWidthRef = useRef(0);

  // Interaction State Refs
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartOffsetRef = useRef(0);
  const lastDragXRef = useRef(0);
  const dragVelocityRef = useRef(0);
  const hasMovedSignificantlyRef = useRef(false);

  // Card Click Animation State (time-based ease-out interpolation)
  const isCenteringRef = useRef(false);
  const centerStartXRef = useRef(0);
  const centerTargetXRef = useRef(0);
  const centerStartTimeRef = useRef(0);
  const centerDurationRef = useRef(500); // 500ms smooth ease-out

  // Measure and update dimensions without triggering animation loop rebuilds
  const calculateDimensions = useCallback(() => {
    if (containerRef.current) {
      const cw = containerRef.current.clientWidth || 1200;
      containerWidthRef.current = cw;

      let iw = 320;
      let ig = 24;
      if (cw < 480) {
        iw = 220;
        ig = 14;
      } else if (cw < 768) {
        iw = 260;
        ig = 18;
      } else if (cw < 1024) {
        iw = 290;
        ig = 20;
      } else {
        iw = 320;
        ig = 24;
      }

      setItemWidth(iw);
      setItemGap(ig);
      itemWidthRef.current = iw;
      itemGapRef.current = ig;
      const ssw = originalCount * (iw + ig);
      singleSetWidthRef.current = ssw;

      if (currentXRef.current === 0 && ssw > 0) {
        currentXRef.current = ssw;
      }
    }
  }, [originalCount]);

  // Dimension setup & ResizeObserver
  useEffect(() => {
    calculateDimensions();

    const containerEl = containerRef.current;
    if (!containerEl) return;

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        calculateDimensions();
      });
      resizeObserver.observe(containerEl);
    } else {
      window.addEventListener('resize', calculateDimensions);
    }

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      } else {
        window.removeEventListener('resize', calculateDimensions);
      }
    };
  }, [calculateDimensions]);

  // Time-based smooth click-to-center animation trigger
  const animateToCard = useCallback((index: number) => {
    const ssw = singleSetWidthRef.current;
    const cw = containerWidthRef.current;
    const iw = itemWidthRef.current;
    const ig = itemGapRef.current;
    if (ssw === 0 || cw === 0) return;

    const itemLeft = index * (iw + ig);
    const targetOffset = itemLeft + iw / 2 - cw / 2;

    centerStartXRef.current = currentXRef.current;
    centerTargetXRef.current = targetOffset;
    centerStartTimeRef.current = performance.now();
    centerDurationRef.current = 500;
    isCenteringRef.current = true;
  }, []);

  // Single Deterministic, Self-Sustaining 60fps/120fps Animation Engine
  useEffect(() => {
    let animationFrameId: number;
    let lastTimestamp: number | null = null;

    let checkReducedMotion = false;
    if (typeof window !== 'undefined' && window.matchMedia) {
      checkReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    const loop = (timestamp: number) => {
      if (lastTimestamp === null) {
        lastTimestamp = timestamp;
      }
      const deltaTime = Math.min((timestamp - lastTimestamp) / 1000, 0.1);
      lastTimestamp = timestamp;

      const ssw = singleSetWidthRef.current;
      const cw = containerWidthRef.current;
      const iw = itemWidthRef.current;
      const ig = itemGapRef.current;

      if (ssw > 0 && cw > 0) {
        // 1. If currently animating a clicked card to center
        if (isCenteringRef.current) {
          const elapsed = timestamp - centerStartTimeRef.current;
          const progress = Math.min(elapsed / centerDurationRef.current, 1);
          // Smooth ease-out cubic
          const easeOut = 1 - Math.pow(1 - progress, 3);
          currentXRef.current =
            centerStartXRef.current + (centerTargetXRef.current - centerStartXRef.current) * easeOut;

          if (progress >= 1) {
            isCenteringRef.current = false;
          }
        }
        // 2. If user is actively dragging with pointer/finger
        else if (isDraggingRef.current) {
          // Position is directly driven by pointer events
        }
        // 3. If dragging just released with residual velocity
        else if (Math.abs(dragVelocityRef.current) > 0.05) {
          currentXRef.current += dragVelocityRef.current;
          dragVelocityRef.current *= 0.92;
        }
        // 4. Normal deterministic, continuous auto-flow
        else if (!checkReducedMotion && !document.hidden) {
          currentXRef.current += speedRef.current * deltaTime;
        }

        // Infinite Seamless Wrap-around (modulo clamping with 0 jump)
        if (currentXRef.current >= ssw * 2) {
          currentXRef.current -= ssw;
          if (isCenteringRef.current) {
            centerStartXRef.current -= ssw;
            centerTargetXRef.current -= ssw;
          }
        } else if (currentXRef.current < ssw * 0.5) {
          currentXRef.current += ssw;
          if (isCenteringRef.current) {
            centerStartXRef.current += ssw;
            centerTargetXRef.current += ssw;
          }
        }

        // Apply hardware-accelerated transform to track
        if (trackRef.current) {
          trackRef.current.style.transform = `translate3d(-${currentXRef.current.toFixed(2)}px, 0, 0)`;
        }

        // 3D Perspective Arc calculation for each visible card
        const viewportCenter = cw / 2;
        const maxDist = cw / 2;
        const isMobile = cw < 768;
        const minScale = isMobile ? 0.74 : 0.62;
        const maxScale = isMobile ? 1.0 : 1.06;
        const maxDip = isMobile ? 18 : 32;

        const totalItems = originalCount * 3;
        for (let idx = 0; idx < totalItems; idx++) {
          const cardEl = cardRefs.current[idx];
          if (cardEl) {
            const cardLeftInTrack = idx * (iw + ig);
            const cardCenterInViewport = cardLeftInTrack + iw / 2 - currentXRef.current;
            const distFromCenter = Math.abs(cardCenterInViewport - viewportCenter);
            const normalizedDist = Math.min(distFromCenter / maxDist, 1.0);

            // Perspective Arc: Outer cards large, center cards recede
            const scale = minScale + (maxScale - minScale) * Math.pow(normalizedDist, 1.25);
            // Parabolic curve: center cards dip slightly along the arc
            const translateY = (1 - Math.pow(normalizedDist, 1.4)) * maxDip;
            const opacity = 0.72 + 0.28 * normalizedDist;
            const zIndex = Math.round(normalizedDist * 20) + 1;

            cardEl.style.transform = `translate3d(0, ${translateY.toFixed(1)}px, 0) scale(${scale.toFixed(3)})`;
            cardEl.style.opacity = opacity.toFixed(2);
            cardEl.style.zIndex = zIndex.toString();
          }
        }
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    // Tab visibility handling (resets delta time so returning to tab resumes cleanly without giant skips)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        lastTimestamp = performance.now();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [originalCount]);

  // Window-Safe Pointer Drag Handlers (Attaches to window so releasing mouse anywhere cleanly ends drag)
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only primary button
    if (e.button !== 0) return;

    isDraggingRef.current = true;
    isCenteringRef.current = false;
    dragStartXRef.current = e.clientX;
    dragStartOffsetRef.current = currentXRef.current;
    lastDragXRef.current = e.clientX;
    dragVelocityRef.current = 0;
    hasMovedSignificantlyRef.current = false;

    const handleWindowPointerMove = (moveEvent: PointerEvent) => {
      if (!isDraggingRef.current) return;
      const deltaX = moveEvent.clientX - dragStartXRef.current;
      if (Math.abs(deltaX) > 5) {
        hasMovedSignificantlyRef.current = true;
      }
      const stepMovement = lastDragXRef.current - moveEvent.clientX;
      dragVelocityRef.current = stepMovement;
      lastDragXRef.current = moveEvent.clientX;

      currentXRef.current = dragStartOffsetRef.current - deltaX;
    };

    const handleWindowPointerUp = () => {
      isDraggingRef.current = false;
      window.removeEventListener('pointermove', handleWindowPointerMove);
      window.removeEventListener('pointerup', handleWindowPointerUp);
      window.removeEventListener('pointercancel', handleWindowPointerUp);
    };

    window.addEventListener('pointermove', handleWindowPointerMove, { passive: true });
    window.addEventListener('pointerup', handleWindowPointerUp);
    window.removeEventListener('pointercancel', handleWindowPointerUp);
  };

  // Strict Card-Only Click: Clicks directly on a card trigger center animation
  const handleCardClick = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasMovedSignificantlyRef.current) {
      return;
    }
    animateToCard(index);
  };

  return (
    <section
      id={sectionId}
      className="py-14 sm:py-18 md:py-24 bg-white dark:bg-black transition-colors border-b border-[#E5E5E5] dark:border-[#292929] overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Section Header with Minimalist Editorial Typography */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E5E5E5] dark:border-[#292929] pb-6">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[2px] bg-black text-white dark:bg-white dark:text-black text-[9px] font-mono font-medium tracking-editorial uppercase">
                <Sparkles size={10} />
                <span>{tag}</span>
              </span>
              <span className="text-[11px] font-mono uppercase tracking-editorial text-[#777777] dark:text-[#888888]">
                EDITORIAL PERSPECTIVE FLOW
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight uppercase text-black dark:text-white">
              {title}
            </h2>

            <p className="text-xs sm:text-sm text-[#555555] dark:text-[#B5B5B5] leading-relaxed font-normal pt-1">
              {description}
            </p>
          </div>

          {/* Top CTA Link */}
          <Link
            href={ctaHref}
            className="group inline-flex items-center gap-1.5 text-xs font-mono tracking-editorial uppercase text-[#555555] dark:text-[#B5B5B5] hover:text-black dark:hover:text-white transition-colors shrink-0"
          >
            <span>{ctaText}</span>
            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>

      {/* Perspective Arc Carousel Viewport (Pointer events for drag; empty clicks do NOTHING) */}
      <div
        ref={containerRef}
        onPointerDown={onPointerDown}
        style={{ touchAction: 'pan-y' }}
        className="relative w-full overflow-hidden mt-8 pt-8 pb-12 cursor-grab active:cursor-grabbing"
      >
        {/* Subtle Ambient Edge Fade Masks */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-white dark:from-black to-transparent z-30" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-white dark:from-black to-transparent z-30" />

        {/* Continuous Transform Track */}
        <div
          ref={trackRef}
          style={{ willChange: 'transform' }}
          className="flex items-center"
        >
          {flowItems.map((product, idx) => {
            const inWish = isInWishlist(product.id);

            return (
              <div
                key={`${product.id}-${idx}`}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                style={{
                  width: `${itemWidth}px`,
                  marginRight: `${itemGap}px`,
                  flexShrink: 0,
                  willChange: 'transform, opacity'
                }}
                className="transform-gpu transition-all"
              >
                {/* Product Card Container (Card-Only Click Handler) */}
                <div
                  onClick={(e) => handleCardClick(idx, e)}
                  className="group relative rounded-[4px] overflow-hidden border border-[#E5E5E5] dark:border-[#222222] bg-white dark:bg-[#0A0A0A] hover:border-black dark:hover:border-white shadow-md hover:shadow-xl transition-all duration-300 ease-out cursor-pointer flex flex-col justify-between"
                >
                  {/* Product Image Frame */}
                  <div className="relative w-full aspect-4/5 overflow-hidden bg-[#F7F7F7] dark:bg-[#111111] flex items-center justify-center">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 240px, 340px"
                      className="object-cover group-hover:scale-104 transition-transform duration-500"
                    />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
                      {product.discount ? (
                        <span className="px-2 py-0.5 rounded-[2px] bg-[#0148C3] text-white text-[9px] font-mono font-bold tracking-editorial uppercase">
                          -{product.discount}%
                        </span>
                      ) : product.isNew ? (
                        <span className="px-2 py-0.5 rounded-[2px] bg-black text-white dark:bg-white dark:text-black text-[9px] font-mono font-bold tracking-editorial uppercase">
                          NEW
                        </span>
                      ) : null}
                    </div>

                    {/* Top Right Wishlist Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(product);
                        showToast(inWish ? 'Removed from wishlist' : 'Saved to wishlist!');
                      }}
                      aria-label="Toggle Wishlist"
                      className="absolute top-3 right-3 p-1.5 rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-xs text-black dark:text-white hover:scale-110 transition-transform z-20 cursor-pointer shadow-xs"
                    >
                      <Heart
                        size={15}
                        strokeWidth={1.75}
                        className={inWish ? 'fill-black text-black dark:fill-white dark:text-white' : ''}
                      />
                    </button>
                  </div>

                  {/* Card Metadata Footer */}
                  <div className="p-4 space-y-2 border-t border-[#E5E5E5] dark:border-[#222222]">
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-mono font-semibold uppercase tracking-editorial text-[#777777] dark:text-[#888888] block">
                        {product.members?.[0] ? product.members[0].toUpperCase() : 'BUNNYVERSE'}
                      </span>
                      <h3 className="text-xs sm:text-sm font-medium text-black dark:text-white line-clamp-1 group-hover:underline">
                        {product.name}
                      </h3>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-baseline gap-2">
                        <span className="text-xs sm:text-sm font-bold text-black dark:text-white font-mono">
                          Rp{product.price.toLocaleString('id-ID')}
                        </span>
                        {product.originalPrice && product.originalPrice > product.price && (
                          <span className="text-[11px] text-[#777777] dark:text-[#888888] line-through font-mono">
                            Rp{product.originalPrice.toLocaleString('id-ID')}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            addItem(product, 1);
                            showToast(`Added "${product.name}" to bag!`);
                          }}
                          aria-label="Add to Bag"
                          className="p-1.5 rounded-[2px] bg-black text-white dark:bg-white dark:text-black hover:opacity-85 transition-opacity cursor-pointer"
                        >
                          <ShoppingBag size={13} strokeWidth={1.75} />
                        </button>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/products/${product.slug}`);
                          }}
                          aria-label="View Product"
                          className="p-1.5 rounded-[2px] border border-[#E5E5E5] dark:border-[#292929] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors cursor-pointer"
                        >
                          <ArrowRight size={13} strokeWidth={1.75} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Action Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 flex items-center justify-center">
        {/* Prominent Bottom CTA Button */}
        <Link
          href={ctaHref}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-black text-white dark:bg-white dark:text-black text-xs font-bold tracking-editorial uppercase rounded-[2px] hover:opacity-85 transition-opacity shadow-xs"
        >
          <span>{ctaText}</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
};
