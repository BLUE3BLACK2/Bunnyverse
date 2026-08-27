'use client';

import React from 'react';
import { Truck, ShieldCheck, RotateCcw, Headphones } from 'lucide-react';

export const ServiceBenefits: React.FC = () => {
  const benefits = [
    {
      icon: Truck,
      title: 'FREE WORLDWIDE SHIPPING',
      description: 'On all orders over Rp750.000'
    },
    {
      icon: ShieldCheck,
      title: '100% AUTHENTIC GUARANTEE',
      description: 'Official concept merchandise'
    },
    {
      icon: RotateCcw,
      title: '30-DAY EASY RETURNS',
      description: 'Hassle-free replacement policy'
    },
    {
      icon: Headphones,
      title: '24/7 CUSTOMER CARE',
      description: 'Dedicated Bunnies support team'
    }
  ];

  return (
    <section className="py-8 md:py-10 bg-white dark:bg-black transition-colors border-b border-[#E5E5E5] dark:border-[#292929]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <div key={b.title} className="flex items-start gap-3">
                <div className="p-2 border border-[#E5E5E5] dark:border-[#292929] rounded-[2px] text-black dark:text-white shrink-0 mt-0.5">
                  <Icon size={16} strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-[11px] font-medium tracking-editorial uppercase text-black dark:text-white">
                    {b.title}
                  </h4>
                  <p className="text-[11px] text-[#777777] dark:text-[#888888] mt-0.5">
                    {b.description}
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
