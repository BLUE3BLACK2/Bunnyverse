'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export const FlashSaleBanner: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    mins: 38,
    secs: 22
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
    <section className="py-10 md:py-14 bg-white dark:bg-black transition-colors border-b border-[#E5E5E5] dark:border-[#292929]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#111111] text-white border border-neutral-800 rounded-[4px] p-6 sm:p-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Left Content Area */}
            <div className="md:col-span-7 space-y-4">
              <span className="text-[10px] uppercase font-medium tracking-editorial text-[#888888] block">
                LIMITED TIME EVENT
              </span>

              <h3 className="text-2xl sm:text-4xl font-medium tracking-tight uppercase leading-tight">
                Flash Sale <br />
                <span className="text-[#888888]">Up To 70% Off</span>
              </h3>

              <p className="text-xs text-[#B5B5B5] max-w-md font-normal leading-relaxed">
                Special seasonal discount on select apparel, accessories, and collector photocards. While supplies last.
              </p>

              {/* Countdown Digits */}
              <div className="flex items-center gap-3 pt-2">
                {[
                  { label: 'Days', val: timeLeft.days },
                  { label: 'Hours', val: timeLeft.hours },
                  { label: 'Mins', val: timeLeft.mins },
                  { label: 'Secs', val: timeLeft.secs }
                ].map((t, idx) => (
                  <React.Fragment key={t.label}>
                    <div className="text-center bg-black/60 border border-neutral-700 px-3 py-2 rounded-[2px] min-w-[52px]">
                      <span className="text-sm font-mono font-medium block leading-none">
                        {format2Digits(t.val)}
                      </span>
                      <span className="text-[9px] uppercase tracking-editorial text-[#888888] block mt-1">
                        {t.label}
                      </span>
                    </div>
                    {idx < 3 && <span className="font-mono text-neutral-500">:</span>}
                  </React.Fragment>
                ))}
              </div>

              {/* Clean CTA Button */}
              <div className="pt-2">
                <Link
                  href="/discount"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black text-xs font-medium tracking-editorial uppercase rounded-[2px] hover:bg-neutral-200 transition-colors"
                >
                  <span>SHOP DISCOUNTS</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>

            {/* Right Product Graphic Preview */}
            <div className="md:col-span-5 flex justify-center md:justify-end">
              <div className="relative w-full max-w-[320px] aspect-square rounded-[2px] overflow-hidden border border-neutral-800 bg-neutral-900">
                <Image
                  src="/banners/flash-sale.png"
                  alt="Flash Sale Preview"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
