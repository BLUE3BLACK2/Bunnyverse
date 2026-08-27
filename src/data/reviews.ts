import { Review } from '@/types';

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    productId: 'lightstick',
    author: 'Sarah K.',
    rating: 5,
    date: '2026-03-10',
    comment: 'The packaging was really good and the product arrived safely. Synced with the concert app instantly and the light modes look stunning in real life!',
    verifiedPurchase: true,
    memberBadge: 'OT5 Supporter'
  },
  {
    id: 'rev-2',
    productId: 'bunny-hoodie',
    author: 'Alex T.',
    rating: 5,
    date: '2026-03-08',
    comment: 'The French terry cotton is so thick and luxurious. Fits perfectly oversized, exactly like Hanni wore it during the dance practice. Definitely worth every penny.',
    verifiedPurchase: true,
    memberBadge: 'Hanni Bias'
  },
  {
    id: 'rev-3',
    productId: 'photoshoot-tee',
    author: 'Rina M.',
    rating: 5,
    date: '2026-03-05',
    comment: 'Vintage wash texture is gorgeous and soft. The Haerin graphic print has ultra crisp details. Wore it to school and got so many compliments!',
    verifiedPurchase: true,
    memberBadge: 'Haerin Bias'
  },
  {
    id: 'rev-4',
    productId: 'denim-jacket',
    author: 'Daniel W.',
    rating: 5,
    date: '2026-03-02',
    comment: 'Minji\'s denim jacket is unbelievable quality. The selvedge cotton has great structure and the custom cobalt blue buttons are such a clean subtle detail.',
    verifiedPurchase: true,
    memberBadge: 'Minji Bias'
  },
  {
    id: 'rev-5',
    productId: 'photocard-set',
    author: 'Chloe L.',
    rating: 5,
    date: '2026-02-28',
    comment: 'The holographic foil effect in person is insane! Arrived in hard sleeve protectors without a single bent corner. 100/10 must have for all Bunnies!',
    verifiedPurchase: true,
    memberBadge: 'Collector'
  },
  {
    id: 'rev-6',
    productId: 'concert-ready-bundle',
    author: 'Kevin P.',
    rating: 5,
    date: '2026-02-24',
    comment: 'Best value ever. Got the lightstick, pouch, strap, and the complete photocard set in one gorgeous luxury gift box. Fast 2-day delivery too!',
    verifiedPurchase: true,
    memberBadge: 'VIP Bunny'
  }
];

export const getReviewsByProductId = (productId: string): Review[] => {
  const specific = REVIEWS.filter(r => r.productId === productId);
  if (specific.length > 0) return specific;
  // Return generic high-rated reviews as fallback
  return REVIEWS.slice(0, 3);
};
