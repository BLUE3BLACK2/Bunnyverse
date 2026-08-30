'use client';

import React from 'react';
import { getNewArrivals } from '@/data/products';
import { EditorialProductFlow } from './EditorialProductFlow';

export const NewArrivals: React.FC = () => {
  const newArrivals = getNewArrivals(13);

  return (
    <EditorialProductFlow
      sectionId="new-arrivals"
      title="New Arrivals"
      tag="JUST DROPPED"
      description="The latest BUNNYVERSE season merchandise, exclusive member capsule collections, and newly crafted concert accessories."
      products={newArrivals}
      ctaText="VIEW ALL NEW ARRIVALS"
      ctaHref="/new-arrivals"
      speed={28}
    />
  );
};
