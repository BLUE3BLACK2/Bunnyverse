export type MemberId = 'minji' | 'hanni' | 'danielle' | 'haerin' | 'hyein' | 'group';

export interface Member {
  id: MemberId;
  name: string;
  slug: string;
  role: string;
  order: number; // 1: Minji, 2: Hanni, 3: Danielle, 4: Haerin, 5: Hyein
  color: string;
  lightColor: string;
  image: string;
  heroImage: string;
  description: string;
  shortBio: string;
  quote: string;
  featuredProductIds: string[];
}

export type CategoryId = 'lightsticks' | 'fashion' | 'accessories' | 'collectibles' | 'lifestyle' | 'bundles';

export interface Category {
  id: CategoryId;
  name: string;
  slug: string;
  description: string;
  image: string;
  itemCount: number;
  tag: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  inStock: boolean;
  colorHex?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number; // in IDR
  originalPrice?: number;
  discount?: number; // e.g. 15 for 15%
  category: CategoryId;
  categoryName: string;
  members: MemberId[]; // 'minji' | 'hanni' | 'danielle' | 'haerin' | 'hyein' | 'group'
  image: string;
  images: string[];
  rating: number;
  reviewCount: number;
  stock: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  variants?: ProductVariant[];
  colors?: string[]; // e.g. ['#111111', '#F5F5F5', '#0148C3', '#F43F5E']
  sizes?: string[]; // e.g. ['S', 'M', 'L', 'XL', 'XXL']
  tags: string[];
  details?: string[];
  specs?: Record<string, string>;
  createdAt: string;
}

export interface CartItem {
  id: string; // unique item key: productId + variant + size
  product: Product;
  quantity: number;
  selectedVariant?: string;
  selectedSize?: string;
  selectedMember?: string;
}

export type OrderStatus = 'pending' | 'paid' | 'processing' | 'shipped' | 'completed' | 'cancelled';

export interface TrackingStep {
  title: string;
  description: string;
  timestamp: string;
  date?: string;
  completed: boolean;
  current?: boolean;
}

export interface Order {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  shippingMethod: 'regular' | 'express';
  shippingCost: number;
  courier?: string;
  estimatedDelivery?: string;
  paymentMethod: 'bank_transfer' | 'ewallet' | 'credit_card';
  paymentDetail?: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  discountCode?: string;
  total: number;
  status: OrderStatus;
  createdAt: string;
  trackingNumber: string;
  trackingSteps: TrackingStep[];
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
  memberBadge?: string;
}

export interface Coupon {
  code: string;
  discountPercent?: number;
  discountAmount?: number;
  freeShipping?: boolean;
  minSpend: number;
  description: string;
}

export type SortOption = 'featured' | 'newest' | 'best_selling' | 'price_asc' | 'price_desc' | 'rating';

export interface FilterState {
  search: string;
  category: string;
  member: string;
  priceRange: string; // 'all' | 'under100k' | '100k-300k' | '300k-500k' | 'above500k'
  sortBy: SortOption;
}
