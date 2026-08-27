'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, Truck, Lock, Heart, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

export const BunniesBrandSection: React.FC = () => {
  const trustPoints = [
    {
      icon: Sparkles,
      title: 'Premium Quality',
      description: 'Made with the finest materials'
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Quick and reliable shipping'
    },
    {
      icon: Lock,
      title: 'Secure Checkout',
      description: 'Your data is protected'
    },
    {
      icon: Heart,
      title: 'Customer Satisfaction',
      description: '100% satisfaction guarantee'
    }
  ];

  return (
    <section className="py-12 md:py-16 bg-white dark:bg-[#080B12] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Brand Editorial Card */}
        <div className="relative rounded-3xl bg-[#0A0E18] text-white border border-slate-800 p-8 sm:p-12 overflow-hidden shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#3B82F6]">
                The BUNNYVERSE Standard
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                Designed for Bunnies, <br />
                <span className="text-slate-200">Crafted for Everyday Style.</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 max-w-xl leading-relaxed">
                Every piece in our capsule collection is officially designed with high-density fabric, authentic holographic security seals, and custom packaging for fans worldwide.
              </p>
              <div className="pt-2">
                <Link href="/about">
                  <Button variant="primary" size="sm" className="gap-1.5 font-extrabold text-xs">
                    <span>Read Brand Story</span>
                    <ArrowRight size={14} />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56">
                <Image
                  src="/brand/bunnies.png"
                  alt="Bunnies Mascot"
                  fill
                  className="object-contain drop-shadow-md"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Trust Strip (From Reference Screenshot) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4 border-t border-slate-200 dark:border-[#1E293B]">
          {trustPoints.map((tp) => {
            const Icon = tp.icon;
            return (
              <div key={tp.title} className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 flex items-center justify-center shrink-0 border border-slate-200/60 dark:border-slate-700">
                  <Icon size={18} />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    {tp.title}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
                    {tp.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
