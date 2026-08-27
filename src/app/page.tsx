'use client';

import React from 'react';
import { MemberShowcaseHero } from '@/components/home/MemberShowcaseHero';
import { ShopByMember } from '@/components/home/ShopByMember';
import { ShopByCategory } from '@/components/home/ShopByCategory';
import { NewArrivals } from '@/components/home/NewArrivals';
import { BestSellers } from '@/components/home/BestSellers';
import { ExclusiveCollection } from '@/components/home/ExclusiveCollection';
import { FlashSaleBanner } from '@/components/home/FlashSaleBanner';
import { PopularSearches } from '@/components/home/PopularSearches';
import { PopularCategories } from '@/components/home/PopularCategories';
import { ServiceBenefits } from '@/components/home/ServiceBenefits';
import { RecentlyViewedSection } from '@/components/home/RecentlyViewedSection';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black transition-colors">
      {/* 1. Interactive Square Member Hero */}
      <MemberShowcaseHero />

      {/* 2. Shop by Member */}
      <ShopByMember />

      {/* 3. Shop by Category */}
      <ShopByCategory />

      {/* 4. New Arrivals Drop */}
      <NewArrivals />

      {/* 5. Best Sellers */}
      <BestSellers />

      {/* 6. Exclusive Collection */}
      <ExclusiveCollection />

      {/* 7. Flash Sale Promotional Banner */}
      <FlashSaleBanner />

      {/* 8. Popular Searches Discovery Strip */}
      <PopularSearches />

      {/* 9. Popular Categories Discovery Strip */}
      <PopularCategories />

      {/* 10. Service / Trust Information */}
      <ServiceBenefits />

      {/* 11. Recently Viewed (if available) */}
      <RecentlyViewedSection />
    </div>
  );
}
