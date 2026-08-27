import { Member } from '@/types';

export const MEMBERS: Member[] = [
  {
    id: 'minji',
    name: 'Minji',
    slug: 'minji',
    role: 'Leader & Visual',
    order: 1,
    color: '#1E40AF',
    lightColor: '#93C5FD',
    image: '/members/minji.jpg',
    heroImage: '/members/minji.jpg',
    description: 'Discover merchandise inspired by Minji\'s classic chic style and effortless leadership aesthetic.',
    shortBio: 'Known for her sharp, classic, timeless visuals and composed charisma.',
    quote: 'Stay true to what makes you effortlessly confident.',
    featuredProductIds: ['denim-jacket', 'photocard-set', 'bunny-cap']
  },
  {
    id: 'hanni',
    name: 'Hanni',
    slug: 'hanni',
    role: 'Vocal & Dance',
    order: 2,
    color: '#EC4899',
    lightColor: '#FBCFE8',
    image: '/members/hanni.jpg',
    heroImage: '/members/hanni.jpg',
    description: 'Explore trendy, warm, and playful streetwear curated with Hanni\'s radiant charm.',
    shortBio: 'Brings infectious energy, sweetest vocals, and vibrant retro fashion sense.',
    quote: 'Spread sweetness and love in everything you create and wear.',
    featuredProductIds: ['bunny-hoodie', 'bunny-keychain', 'phone-case']
  },
  {
    id: 'danielle',
    name: 'Danielle',
    slug: 'danielle',
    role: 'Vocal & Sunshine',
    order: 3,
    color: '#F59E0B',
    lightColor: '#FDE68A',
    image: '/members/danielle.jpg',
    heroImage: '/members/danielle.jpg',
    description: 'Brighten your everyday life with Danielle\'s sunshine-inspired apparel and accessories.',
    shortBio: 'The radiant sunshine of the group with high-fashion versatility and boundless optimism.',
    quote: 'Let your inner sunshine illuminate everyone around you today.',
    featuredProductIds: ['varsity-jacket', 'bunny-tote', 'poster-set']
  },
  {
    id: 'haerin',
    name: 'Haerin',
    slug: 'haerin',
    role: 'Dance & Cat Charm',
    order: 4,
    color: '#10B981',
    lightColor: '#A7F3D0',
    image: '/members/haerin.jpg',
    heroImage: '/members/haerin.jpg',
    description: 'Unleash sleek minimalism and cool mystery with Haerin\'s cat-inspired signature picks.',
    shortBio: 'Fascinating cat-like elegance, precision choreography, and effortlessly cool street vibe.',
    quote: 'Subtle elegance speaks louder than unnecessary noise.',
    featuredProductIds: ['photoshoot-tee', 'acrylic-stand', 'laptop-sleeve']
  },
  {
    id: 'hyein',
    name: 'Hyein',
    slug: 'hyein',
    role: 'Vocal & Chic Maknae',
    order: 5,
    color: '#8B5CF6',
    lightColor: '#DDD6FE',
    image: '/members/hyein.jpg',
    heroImage: '/members/hyein.jpg',
    description: 'High-fashion modern aesthetic and bold statements curated by Hyein.',
    shortBio: 'Golden maknae with runway model proportions and soulful vocal brilliance.',
    quote: 'Dream boldly and walk with fearless grace.',
    featuredProductIds: ['bunny-tshirt', 'photocard-binder', 'bunny-notebook']
  }
];

export const getMemberById = (id: string): Member | undefined => {
  return MEMBERS.find(m => m.id === id || m.slug === id);
};
