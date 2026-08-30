export interface HomeCategoryCard {
  id: string;
  name: string;
  itemCount: number;
  slug: string;
  href: string;
  iconName: 'Shirt' | 'Layers' | 'Tag' | 'Sparkles' | 'Package' | 'ShoppingBag';
  description: string;
}

export const HOME_CATEGORIES: HomeCategoryCard[] = [
  {
    id: 't-shirts',
    name: 'T-SHIRTS',
    itemCount: 96,
    slug: 't-shirts',
    href: '/shop?category=fashion',
    iconName: 'Shirt',
    description: 'Heavyweight graphic & oversized vintage tees'
  },
  {
    id: 'hoodies',
    name: 'HOODIES',
    itemCount: 74,
    slug: 'hoodies',
    href: '/shop?category=fashion',
    iconName: 'Layers',
    description: 'Fleece pullovers, zip hoodies & crewnecks'
  },
  {
    id: 'jackets',
    name: 'JACKETS',
    itemCount: 56,
    slug: 'jackets',
    href: '/shop?category=fashion',
    iconName: 'Tag',
    description: 'Varsity outerwear, denim & windbreakers'
  },
  {
    id: 'lightsticks',
    name: 'LIGHTSTICKS',
    itemCount: 42,
    slug: 'lightsticks',
    href: '/shop?category=lightsticks',
    iconName: 'Sparkles',
    description: 'Official Binky Bong & concert sync kits'
  },
  {
    id: 'collectibles',
    name: 'COLLECTIBLES',
    itemCount: 88,
    slug: 'collectibles',
    href: '/shop?category=collectibles',
    iconName: 'Package',
    description: 'Photocards, acrylic stands & binders'
  },
  {
    id: 'accessories',
    name: 'ACCESSORIES',
    itemCount: 62,
    slug: 'accessories',
    href: '/shop?category=accessories',
    iconName: 'ShoppingBag',
    description: 'Caps, beanies, keyrings & canvas totes'
  }
];
