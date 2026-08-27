import { Category } from '@/types';

export const CATEGORIES: Category[] = [
  {
    id: 'lightsticks',
    name: 'Lightsticks & Goods',
    slug: 'lightsticks',
    description: 'Official concert lightsticks, protective cases, and sync accessories.',
    image: '/categories/lightsticks.png',
    itemCount: 4,
    tag: 'Concert Gear'
  },
  {
    id: 'fashion',
    name: 'Fashion & Apparel',
    slug: 'fashion',
    description: 'Premium hoodies, jackets, tees, and member-inspired streetwear.',
    image: '/categories/fashion.png',
    itemCount: 6,
    tag: 'Streetwear'
  },
  {
    id: 'accessories',
    name: 'Accessories',
    slug: 'accessories',
    description: 'Caps, totes, keychains, pins, and daily statement pieces.',
    image: '/categories/accessories.png',
    itemCount: 5,
    tag: 'Daily Wear'
  },
  {
    id: 'collectibles',
    name: 'Collectibles',
    slug: 'collectibles',
    description: 'Limited edition photocards, acrylic stands, binders, and poster sets.',
    image: '/categories/collectibles.png',
    itemCount: 6,
    tag: 'Photocards'
  },
  {
    id: 'lifestyle',
    name: 'Lifestyle & Stationeries',
    slug: 'lifestyle',
    description: 'Tech accessories, notebooks, phone cases, and desk essentials.',
    image: '/categories/lifestyle.png',
    itemCount: 4,
    tag: 'Living & Tech'
  },
  {
    id: 'bundles',
    name: 'Curated Bundles',
    slug: 'bundles',
    description: 'Special starter packs and collector bundles at exclusive value.',
    image: '/categories/bundles.png',
    itemCount: 3,
    tag: 'Special Value'
  }
];

export const getCategoryById = (id: string): Category | undefined => {
  return CATEGORIES.find(c => c.id === id || c.slug === id);
};
