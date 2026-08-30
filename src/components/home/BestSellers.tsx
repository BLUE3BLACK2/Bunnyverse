'use client';

import React from 'react';
import { getBestSellers } from '@/data/products';
import { EditorialProductFlow } from './EditorialProductFlow';

export const BestSellers: React.FC = () => {
  const bestSellers = getBestSellers(13);

  return (
    <EditorialProductFlow
      sectionId="best-sellers"
      title="Best Sellers"
      tag="TOP DEMAND"
      description="The most coveted BUNNYVERSE streetwear, iconic official lightsticks, collectible sets, and all-time fan favorite merchandise."
      products={bestSellers}
      ctaText="VIEW ALL BEST SELLERS"
      ctaHref="/best-sellers"
      speed={28}
    />
  );
};
