export interface HeroSlide {
  id: string;
  image: string;
  backgroundColor: string;
  tag: string;
  title: string;
  subtitle?: string;
  description: string;
  category: string;
  ctaText: string;
  ctaHref: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'hero-1',
    image: '/hero/hero1.png',
    backgroundColor: '#0148C3', // BUNNYVERSE Signature Royal Blue
    tag: 'NEW SEASON 2026',
    title: 'MINJI BLUE HOUR EDIT',
    subtitle: 'Official Concept Drop',
    description: 'Explore the signature denim jacket, oversized knitwear, and exclusive photocards curated for Minji.',
    category: 'Fashion & Denim',
    ctaText: 'SHOP COLLECTION',
    ctaHref: '/shop?category=fashion',
    secondaryCtaText: 'EXPLORE EDIT',
    secondaryCtaHref: '/members/minji'
  },
  {
    id: 'hero-2',
    image: '/hero/hero2.png',
    backgroundColor: '#2E5A44', // Forest Sage
    tag: 'LIMITED RUN DROP',
    title: 'HANNI RETRO OVERSIZED',
    subtitle: 'Streetwear Capsule',
    description: 'Heavyweight vintage washed fleece, cropped windbreakers, and signature beanie accessories.',
    category: 'Streetwear',
    ctaText: 'SHOP NOW',
    ctaHref: '/shop?category=fashion',
    secondaryCtaText: 'HANNI CAPSULE',
    secondaryCtaHref: '/members/hanni'
  },
  {
    id: 'hero-3',
    image: '/hero/hero3.png',
    backgroundColor: '#3D405B', // Slate Charcoal Indigo
    tag: 'CAMPUS CAPSULE',
    title: 'DANIELLE VARSITY SPECIAL',
    subtitle: 'Varsity & Knitwear',
    description: 'Classic wool-blend varsity jackets with chenille embroidery, collectible pins, and tote essentials.',
    category: 'Varsity & Outerwear',
    ctaText: 'DISCOVER DROP',
    ctaHref: '/shop?category=fashion',
    secondaryCtaText: 'DANIELLE CAPSULE',
    secondaryCtaHref: '/members/danielle'
  },
  {
    id: 'hero-4',
    image: '/hero/hero4.png',
    backgroundColor: '#C84B31', // Crimson Terracotta
    tag: 'CONCEPT CAPSULE',
    title: 'HAERIN CAT-EYE SIGNATURE',
    subtitle: 'Graphic Streetline',
    description: 'Oversized graphic hoodies, cat-ear knit beanies, and limited metallic holographic photocards.',
    category: 'Apparel & Collectibles',
    ctaText: 'SHOP COLLECTION',
    ctaHref: '/shop?category=fashion',
    secondaryCtaText: 'HAERIN CAPSULE',
    secondaryCtaHref: '/members/haerin'
  },
  {
    id: 'hero-5',
    image: '/hero/hero5.png',
    backgroundColor: '#4A5568', // Modern Cool Slate
    tag: 'HIGH FASHION EDIT',
    title: 'HYEIN AVANT-GARDE LINE',
    subtitle: 'Editorial Runway Capsule',
    description: 'Sculptural silhouettes, layered trench coats, and statement accessories curated by the youngest icon.',
    category: 'Runway Streetwear',
    ctaText: 'EXPLORE DROP',
    ctaHref: '/shop?category=fashion',
    secondaryCtaText: 'HYEIN CAPSULE',
    secondaryCtaHref: '/members/hyein'
  },
  {
    id: 'hero-6',
    image: '/hero/hero6.png',
    backgroundColor: '#1E2A38', // Deep Fandom Navy
    tag: 'WORLD TOUR 2026',
    title: 'OT5 CONCERT ARENA MERCH',
    subtitle: 'Official Stadium Goods',
    description: 'Stage-worn replica tour tees, sync-ready lightsticks, commemorative varsity caps, and arena bundles.',
    category: 'Tour Merchandise',
    ctaText: 'SHOP ARENA GEAR',
    ctaHref: '/shop?category=lightsticks',
    secondaryCtaText: 'VIEW ALL GOODS',
    secondaryCtaHref: '/shop'
  },
  {
    id: 'hero-7',
    image: '/hero/hero7.png',
    backgroundColor: '#6B4E71', // Mulberry Plum
    tag: 'LIMITED BUNDLE',
    title: 'BINKY BONG SPECIAL EDITION',
    subtitle: 'Interactive Lightstick Kit',
    description: 'Bluetooth 5.3 synchronized concert lightstick with custom member emblems and silicone protector case.',
    category: 'Lightsticks & Goods',
    ctaText: 'GET LIGHTSTICK',
    ctaHref: '/shop?category=lightsticks',
    secondaryCtaText: 'VIEW BUNDLES',
    secondaryCtaHref: '/shop?category=bundles'
  },
  {
    id: 'hero-8',
    image: '/hero/hero8.png',
    backgroundColor: '#355C7D', // Twilight Steel Blue
    tag: 'SUMMER ARCHIVE',
    title: 'SUMMER FESTIVAL VINTAGE',
    subtitle: 'Acid-Wash Graphic Series',
    description: 'Pre-shrunk 280GSM cotton tees with distressed concert typography and numbered authenticity tags.',
    category: 'Vintage Apparel',
    ctaText: 'SHOP TEES',
    ctaHref: '/shop?category=fashion',
    secondaryCtaText: 'DISCOVER MORE',
    secondaryCtaHref: '/shop'
  },
  {
    id: 'hero-9',
    image: '/hero/hero9.png',
    backgroundColor: '#5C3D2E', // Roasted Cocoa Amber
    tag: 'COLLECTORS VAULT',
    title: 'HOLOGRAPHIC PHOTOCARD SET',
    subtitle: 'Limited Vault Box',
    description: 'Full OT5 rare holo binder cards, protective acrylic magnetic frames, and serialized certificate.',
    category: 'Collectibles & Cards',
    ctaText: 'SHOP CARDS',
    ctaHref: '/shop?category=collectibles',
    secondaryCtaText: 'MEMORABILIA',
    secondaryCtaHref: '/shop?category=collectibles'
  },
  {
    id: 'hero-10',
    image: '/hero/hero10.png',
    backgroundColor: '#0F4C5C', // Deep Teal Petrol
    tag: 'SEASON LOOKBOOK',
    title: 'BUNNYVERSE ESSENTIALS 2026',
    subtitle: 'Daily Lifestyle Series',
    description: 'Minimalist tote bags, stainless steel thermal flasks, embroidered socks, and desk stationeries.',
    category: 'Lifestyle & Goods',
    ctaText: 'EXPLORE CATALOG',
    ctaHref: '/shop',
    secondaryCtaText: 'NEW ARRIVALS',
    secondaryCtaHref: '/new-arrivals'
  }
];

/**
 * Helper to determine whether a given hex background color is dark or light
 * based on standard perceived luminance formula.
 */
export function isDarkColor(hexColor: string): boolean {
  const hex = hexColor.replace('#', '');
  if (hex.length !== 6) return true; // default dark
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const luminance = (r * 299 + g * 587 + b * 114) / 1000;
  return luminance < 160;
}
