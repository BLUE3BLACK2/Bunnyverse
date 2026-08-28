'use client';

import React from 'react';
import { HomeHero } from '@/components/home/HomeHero';
import { ServiceBenefits } from '@/components/home/ServiceBenefits';
import { NewArrivals } from '@/components/home/NewArrivals';
import { BestSellers } from '@/components/home/BestSellers';
import { ShopByCategory } from '@/components/home/ShopByCategory';
import { FlashSaleBanner } from '@/components/home/FlashSaleBanner';
import { RecentlyViewedSection } from '@/components/home/RecentlyViewedSection';
import { PopularCategories } from '@/components/home/PopularCategories';
import { PopularSearches } from '@/components/home/PopularSearches';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black transition-colors">
      {/* 1. Fashion Editorial Hero (Reference 1) */}
      <HomeHero />

      {/* 2. Service / Store Benefits Strip */}
      <ServiceBenefits />

      {/* 3. New Arrivals Drop */}
      <NewArrivals />

      {/* 4. Best Sellers */}
      <BestSellers />

      {/* 5. Shop by Category */}
      <ShopByCategory />

      {/* 6. Promotional Campaign Carousel (More Ways to Save) */}
      <FlashSaleBanner />

      {/* 7. Recently Viewed Products */}
      <RecentlyViewedSection />

      {/* 8. Popular Categories Discovery Strip */}
      <PopularCategories />

      {/* 9. Popular Searches Discovery Strip */}
      <PopularSearches />
    </div>
  );
}
