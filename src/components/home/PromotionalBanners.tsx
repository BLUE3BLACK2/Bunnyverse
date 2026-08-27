'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/Button';

export const PromotionalBanners: React.FC = () => {
  // Live countdown timer for Flash Sale
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 15,
    mins: 45,
    secs: 30
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.secs > 0) return { ...prev, secs: prev.secs - 1 };
        if (prev.mins > 0) return { ...prev, mins: 59, secs: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, mins: 59, secs: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, mins: 59, secs: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const format2Digits = (num: number) => num.toString().padStart(2, '0');

  return (
    <section className="py-12 md:py-16 bg-white dark:bg-[#080B12] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Banner 1: Flash Sale (Coral / Orange Warm Gradient with Countdown) */}
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#FF5252] to-[#FF7A00] text-white p-7 sm:p-8 flex flex-col justify-between min-h-[260px] shadow-md group">
            {/* Background Graphic Asset */}
            <div className="absolute right-0 bottom-0 top-0 w-1/2 opacity-35 sm:opacity-90 group-hover:scale-105 transition-transform duration-500 pointer-events-none">
              <Image
                src="/banners/flash-sale.png"
                alt="Flash Sale"
                fill
                className="object-cover object-right"
              />
            </div>

            <div className="space-y-3 relative z-10 max-w-[280px]">
              <span className="text-xs font-extrabold uppercase tracking-wider text-white/90">
                Flash Sale
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight">
                Up To 70% Off
              </h3>

              {/* Countdown Digits */}
              <div className="flex items-center gap-2 pt-1">
                {[
                  { label: 'Days', val: timeLeft.days },
                  { label: 'Hours', val: timeLeft.hours },
                  { label: 'Mins', val: timeLeft.mins },
                  { label: 'Secs', val: timeLeft.secs }
                ].map((t, idx) => (
                  <React.Fragment key={t.label}>
                    <div className="text-center">
                      <span className="text-sm sm:text-base font-mono font-extrabold block leading-tight">
                        {format2Digits(t.val)}
                      </span>
                      <span className="text-[9px] uppercase tracking-wider text-white/80">
                        {t.label}
                      </span>
                    </div>
                    {idx < 3 && <span className="font-mono font-bold text-xs pb-3">:</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="pt-4 relative z-10">
              <Link href="/shop?filter=sale">
                <Button
                  variant="secondary"
                  size="sm"
                  className="bg-white text-slate-900 hover:bg-slate-100 font-extrabold text-xs shadow-xs"
                >
                  Shop Sale Now
                </Button>
              </Link>
            </div>
          </div>

          {/* Banner 2: New Collection (Sleek Dark Luxe Minimalist) */}
          <div className="relative rounded-3xl overflow-hidden bg-[#0A0E18] text-white p-7 sm:p-8 flex flex-col justify-between min-h-[260px] shadow-md border border-slate-800 group">
            {/* Background Graphic Asset */}
            <div className="absolute right-0 bottom-0 top-0 w-1/2 opacity-35 sm:opacity-90 group-hover:scale-105 transition-transform duration-500 pointer-events-none">
              <Image
                src="/banners/new-drop.png"
                alt="New Collection"
                fill
                className="object-cover object-right"
              />
            </div>

            <div className="space-y-2 relative z-10 max-w-[280px]">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#3B82F6]">
                New Collection
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight">
                Summer 2026
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Discover the latest member capsule trends and fresh streetwear styles.
              </p>
            </div>

            <div className="pt-4 relative z-10">
              <Link href="/shop?filter=new">
                <Button
                  variant="secondary"
                  size="sm"
                  className="bg-white text-slate-900 hover:bg-slate-100 font-extrabold text-xs shadow-xs"
                >
                  Shop Collection
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
