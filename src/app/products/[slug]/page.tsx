'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  Heart,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
  ChevronRight,
  Star,
  Plus,
  Minus,
  MessageSquarePlus,
  Share2,
  HelpCircle,
  Check,
  Eye,
  Ruler
} from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { MEMBERS } from '@/data/members';
import { getReviewsByProductId } from '@/data/reviews';
import { Button } from '@/components/ui/Button';
import { ProductCard } from '@/components/products/ProductCard';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useRecentlyViewedStore } from '@/store/recentlyViewedStore';
import { useToastStore } from '@/components/ui/Toast';
import { Modal } from '@/components/ui/Modal';
import { Review, MemberId } from '@/types';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const product = PRODUCTS.find((p) => p.slug === slug);
  const { addItem, openDrawer } = useCartStore();
  const { isInWishlist, toggleWishlist } = useWishlistStore();
  const { addProduct: addRecentlyViewed } = useRecentlyViewedStore();
  const { showToast } = useToastStore();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(() => {
    return product?.colors && product.colors.length > 0 ? product.colors[0] : undefined;
  });
  const [selectedSize, setSelectedSize] = useState<string | undefined>(() => {
    return product?.sizes && product.sizes.length > 0 ? product.sizes[0] : undefined;
  });
  const [quantity, setQuantity] = useState(1);
  const [validationError, setValidationError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'reviews' | 'faq'>('desc');
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isAskQuestionModalOpen, setIsAskQuestionModalOpen] = useState(false);
  const [isSizeGuideModalOpen, setIsSizeGuideModalOpen] = useState(false);

  const [reviewsList, setReviewsList] = useState<Review[]>(() => {
    return product ? getReviewsByProductId(product.id) : [];
  });

  // Track product in recently viewed
  useEffect(() => {
    if (product) {
      addRecentlyViewed(product);
    }
  }, [product, addRecentlyViewed]);

  // Form State for new review modal
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  // Form State for Ask Question
  const [questionName, setQuestionName] = useState('');
  const [questionEmail, setQuestionEmail] = useState('');
  const [questionMessage, setQuestionMessage] = useState('');

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-medium tracking-tight text-black dark:text-white uppercase mb-2">
          PRODUCT NOT FOUND
        </h1>
        <p className="text-xs text-[#777777] dark:text-[#888888] mb-6">
          The merchandise you are looking for does not exist or has been archived.
        </p>
        <Link href="/shop">
          <Button variant="primary">RETURN TO SHOP</Button>
        </Link>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const memberDetails = MEMBERS.filter((m) => product.members.includes(m.id as MemberId));
  const imageGallery = product.images && product.images.length > 0 ? product.images : [product.image];

  // Calculate discount percentage if originalPrice exists
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  // Available colors for fashion/accessories
  const availableColors: string[] | undefined = product.colors && product.colors.length > 0
    ? product.colors
    : product.category === 'fashion'
    ? ['#111111', '#F5F5F5', '#0148C3', '#F43F5E']
    : undefined;

  const colorHexMap: Record<string, string> = {
    '#111111': 'Black',
    '#F5F5F5': 'White',
    '#0148C3': 'Royal Blue',
    '#F43F5E': 'Rose Coral',
    'black': '#111111',
    'white': '#FFFFFF',
    'blue': '#0148C3',
    'pink': '#F43F5E',
    'navy': '#1E293B'
  };

  const handleAddToCart = () => {
    // Validate size if product has sizes
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      setValidationError('Please select a size.');
      return;
    }

    setValidationError(null);
    addItem(product, quantity, selectedSize, selectedColor || product.variants?.[0]?.name, product.members?.[0]);
    showToast(`Added ${quantity}x "${product.name}" to your bag.`);
    openDrawer();
  };

  const handleShare = () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard!');
    }
  };

  const handleAddReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewAuthor || !reviewComment) return;

    const newRev: Review = {
      id: `rev-user-${Date.now()}`,
      productId: product.id,
      author: reviewAuthor,
      rating: reviewRating,
      date: new Date().toISOString().split('T')[0],
      comment: reviewComment,
      verifiedPurchase: true,
      memberBadge: 'Verified Bunny'
    };

    setReviewsList([newRev, ...reviewsList]);
    setIsReviewModalOpen(false);
    setReviewAuthor('');
    setReviewComment('');
    showToast('Thank you! Your verified fan review has been submitted.');
  };

  const handleAskQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionName || !questionMessage) return;
    setIsAskQuestionModalOpen(false);
    setQuestionName('');
    setQuestionEmail('');
    setQuestionMessage('');
    showToast('Your inquiry has been sent to our customer care team!');
  };

  return (
    <div className="bg-white dark:bg-black min-h-screen py-6 md:py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb Navigation (Reference 2) */}
        <nav className="flex items-center gap-2 text-xs text-[#777777] dark:text-[#888888] overflow-x-auto no-scrollbar py-1">
          <Link href="/" className="hover:text-black dark:hover:text-white transition-colors shrink-0">
            Home
          </Link>
          <ChevronRight size={12} className="shrink-0" />
          <Link href="/shop" className="hover:text-black dark:hover:text-white transition-colors shrink-0">
            Shop
          </Link>
          <ChevronRight size={12} className="shrink-0" />
          <Link
            href={`/shop?category=${product.category}`}
            className="hover:text-black dark:hover:text-white uppercase transition-colors shrink-0"
          >
            {product.categoryName}
          </Link>
          <ChevronRight size={12} className="shrink-0" />
          <span className="text-black dark:text-white font-medium truncate max-w-[240px]">
            {product.name}
          </span>
        </nav>

        {/* Main 2-Column Product Detail Layout (Reference 2) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
          {/* Left Column: Product Image & Gallery Thumbnails */}
          <div className="lg:col-span-6 space-y-4">
            {/* Featured Main Image */}
            <div className="relative w-full aspect-square rounded-[4px] overflow-hidden bg-[#F7F7F7] dark:bg-[#111111] border border-[#E5E5E5] dark:border-[#292929]">
              <Image
                src={imageGallery[selectedImage] || product.image}
                alt={product.name}
                fill
                priority
                className="object-cover"
              />

              {/* Discount Percentage Badge (Top-Left) */}
              {discountPercent && discountPercent > 0 && (
                <div className="absolute top-4 left-4 bg-emerald-600 text-white text-[11px] font-mono font-medium px-2.5 py-1 rounded-[2px] shadow-xs">
                  -{discountPercent}%
                </div>
              )}
            </div>

            {/* Thumbnail Row (4 Gallery Thumbnails with Active Border) */}
            <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
              {imageGallery.slice(0, 4).map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImage(idx)}
                  className={`relative aspect-square rounded-[2px] overflow-hidden border transition-all cursor-pointer ${
                    selectedImage === idx
                      ? 'border-black dark:border-white ring-1 ring-black dark:ring-white opacity-100'
                      : 'border-[#E5E5E5] dark:border-[#292929] opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Information, Pricing, Options, Quantity, Add to Bag (Reference 2) */}
          <div className="lg:col-span-6 space-y-5">
            {/* Category & Member Association */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[11px] uppercase tracking-editorial font-medium text-[#777777] dark:text-[#888888]">
                  {product.categoryName}
                </span>
                {memberDetails.length > 0 && (
                  <>
                    <span className="text-[11px] text-[#777777]">•</span>
                    <span className="text-[11px] uppercase tracking-editorial font-medium text-black dark:text-white">
                      {memberDetails.map((m) => m.name).join(', ')} Capsule
                    </span>
                  </>
                )}
              </div>

              {/* Product Title */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight uppercase text-black dark:text-white leading-tight">
                {product.name}
              </h1>
            </div>

            {/* Rating Stars & Customer Review Count */}
            <div className="flex items-center gap-2 text-xs text-[#777777] dark:text-[#888888]">
              <div className="flex text-black dark:text-white">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={13}
                    strokeWidth={1.5}
                    className={s <= Math.round(product.rating) ? 'fill-current text-current' : 'text-neutral-300 dark:text-neutral-700'}
                  />
                ))}
              </div>
              <span className="font-medium text-black dark:text-white">
                {reviewsList.length} Reviews
              </span>
            </div>

            {/* Price Row */}
            <div className="flex items-baseline gap-3 pt-1 pb-2 border-b border-[#E5E5E5] dark:border-[#292929]">
              <span className="text-2xl sm:text-3xl font-medium text-black dark:text-white">
                Rp{product.price.toLocaleString('id-ID')}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-[#777777] line-through font-mono">
                  Rp{product.originalPrice.toLocaleString('id-ID')}
                </span>
              )}
            </div>

            {/* Live Shopper Activity Badge (Reference 2) */}
            <div className="flex items-center gap-2 text-xs text-[#555555] dark:text-[#B5B5B5] bg-[#F7F7F7] dark:bg-[#111111] p-2.5 rounded-[2px] border border-[#E5E5E5] dark:border-[#292929]">
              <Eye size={14} className="text-black dark:text-white shrink-0" />
              <span>
                <strong>32 people</strong> are looking at this product right now
              </span>
            </div>

            {/* Product Description Brief */}
            <p className="text-xs text-[#555555] dark:text-[#B5B5B5] leading-relaxed font-normal">
              {product.shortDescription}
            </p>

            {/* Color Swatch Selector (Reference 2) */}
            {availableColors && availableColors.length > 0 && (
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium uppercase tracking-editorial text-black dark:text-white">
                    Color: <strong className="font-semibold">{selectedColor ? (colorHexMap[selectedColor] || selectedColor) : 'Select Color'}</strong>
                  </span>
                  {selectedColor && (
                    <button
                      type="button"
                      onClick={() => setSelectedColor(undefined)}
                      className="text-[11px] text-[#777777] hover:text-black dark:hover:text-white cursor-pointer"
                    >
                      ✕ Clear
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  {availableColors.map((color) => {
                    const isSelected = selectedColor === color;
                    return (
                      <button
                        key={color}
                        type="button"
                        onClick={() => {
                          setSelectedColor(color);
                          setValidationError(null);
                        }}
                        aria-label={`Select color ${color}`}
                        style={{ backgroundColor: color }}
                        className={`w-7 h-7 rounded-full border transition-transform cursor-pointer relative ${
                          isSelected
                            ? 'ring-2 ring-black dark:ring-white scale-110 border-white dark:border-black'
                            : 'border-neutral-300 dark:border-neutral-700 hover:scale-105'
                        }`}
                      >
                        {isSelected && (
                          <span className="absolute inset-0 flex items-center justify-center">
                            <Check size={11} className={color === '#F5F5F5' || color === 'white' ? 'text-black' : 'text-white'} strokeWidth={3} />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Size Box Selector (Reference 2) */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium uppercase tracking-editorial text-black dark:text-white">
                    Size: <strong className="font-semibold">{selectedSize || 'Select Size'}</strong>
                  </span>
                  <div className="flex items-center gap-3">
                    {selectedSize && (
                      <button
                        type="button"
                        onClick={() => setSelectedSize(undefined)}
                        className="text-[11px] text-[#777777] hover:text-black dark:hover:text-white cursor-pointer"
                      >
                        ✕ Clear
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => setIsSizeGuideModalOpen(true)}
                      className="inline-flex items-center gap-1 text-[11px] underline text-[#777777] hover:text-black dark:hover:text-white cursor-pointer"
                    >
                      <Ruler size={12} />
                      <span>Size Guide</span>
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => {
                        setSelectedSize(s);
                        setValidationError(null);
                      }}
                      className={`min-w-[48px] h-10 px-3.5 rounded-[2px] text-xs font-medium uppercase transition-colors cursor-pointer ${
                        selectedSize === s
                          ? 'bg-black text-white dark:bg-white dark:text-black border border-black dark:border-white'
                          : 'bg-white dark:bg-black text-black dark:text-white border border-[#E5E5E5] dark:border-[#292929] hover:border-black dark:hover:border-white'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>

                {/* Stock Status */}
                <div className="flex items-center gap-2 pt-1 text-[11px] text-emerald-600 dark:text-emerald-400">
                  <Check size={12} strokeWidth={2.5} />
                  <span>In Stock ({product.stock} units available)</span>
                </div>
              </div>
            )}

            {/* Validation Message (if size or required option missing) */}
            {validationError && (
              <div className="p-2.5 rounded-[2px] bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-xs text-red-600 dark:text-red-400 font-medium">
                {validationError}
              </div>
            )}

            {/* Quantity Stepper & Prominent Add to Bag Button (Reference 2) */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                {/* Quantity Controls: − 1 + */}
                <div className="flex items-center border border-[#E5E5E5] dark:border-[#292929] rounded-[2px] bg-white dark:bg-black shrink-0">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    className="p-3 text-black dark:text-white hover:bg-[#F7F7F7] dark:hover:bg-[#111111] cursor-pointer"
                  >
                    <Minus size={13} />
                  </button>
                  <span className="w-10 text-center text-xs font-mono font-medium text-black dark:text-white">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    disabled={quantity >= product.stock}
                    aria-label="Increase quantity"
                    className="p-3 text-black dark:text-white hover:bg-[#F7F7F7] dark:hover:bg-[#111111] disabled:opacity-30 cursor-pointer"
                  >
                    <Plus size={13} />
                  </button>
                </div>

                {/* Prominent ADD TO BAG Button */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 h-11 inline-flex items-center justify-center gap-2 px-6 bg-black text-white dark:bg-white dark:text-black text-xs font-medium tracking-editorial uppercase rounded-[2px] hover:opacity-85 transition-opacity cursor-pointer shadow-xs"
                >
                  <ShoppingBag size={15} />
                  <span>ADD TO BAG</span>
                </button>
              </div>

              {/* Secondary Action Row: Wishlist · Ask Question · Share (Reference 2) */}
              <div className="flex items-center justify-between pt-2 text-xs text-[#777777] dark:text-[#888888] border-b border-[#E5E5E5] dark:border-[#292929] pb-4">
                <button
                  type="button"
                  onClick={() => toggleWishlist(product)}
                  className="inline-flex items-center gap-1.5 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
                >
                  <Heart
                    size={14}
                    strokeWidth={1.5}
                    className={inWishlist ? 'fill-black text-black dark:fill-white dark:text-white' : ''}
                  />
                  <span>{inWishlist ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsAskQuestionModalOpen(true)}
                  className="inline-flex items-center gap-1.5 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
                >
                  <HelpCircle size={14} strokeWidth={1.5} />
                  <span>Ask Question</span>
                </button>

                <button
                  type="button"
                  onClick={handleShare}
                  className="inline-flex items-center gap-1.5 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
                >
                  <Share2 size={14} strokeWidth={1.5} />
                  <span>Share</span>
                </button>
              </div>
            </div>

            {/* Metadata Area: SKU, Category, Tags (Reference 2) */}
            <div className="space-y-1.5 text-xs text-[#777777] dark:text-[#888888] pt-1">
              <div className="flex gap-2">
                <span className="font-medium text-black dark:text-white uppercase tracking-editorial text-[10px] w-20">
                  SKU:
                </span>
                <span className="font-mono">BNY-{product.id.toUpperCase()}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-medium text-black dark:text-white uppercase tracking-editorial text-[10px] w-20">
                  CATEGORY:
                </span>
                <span>{product.categoryName}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-medium text-black dark:text-white uppercase tracking-editorial text-[10px] w-20">
                  TAGS:
                </span>
                <span>Official Merch, Streetwear, Limited Drop, NewJeans</span>
              </div>
            </div>

            {/* Core Trust Badges */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#E5E5E5] dark:border-[#292929] text-[11px] text-[#777777] dark:text-[#888888]">
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} strokeWidth={1.5} className="text-black dark:text-white shrink-0" />
                <span>100% Authentic</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck size={16} strokeWidth={1.5} className="text-black dark:text-white shrink-0" />
                <span>Free Worldwide Ship</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw size={16} strokeWidth={1.5} className="text-black dark:text-white shrink-0" />
                <span>30-Day Returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Info & Reviews Accordion (Reference 2) */}
        <div id="product-tabs" className="border-t border-[#E5E5E5] dark:border-[#292929] pt-10 space-y-6">
          <div className="flex items-center gap-6 sm:gap-8 border-b border-[#E5E5E5] dark:border-[#292929] pb-3 overflow-x-auto no-scrollbar">
            {[
              { id: 'desc', label: 'DESCRIPTION' },
              { id: 'specs', label: 'ADDITIONAL INFO' },
              { id: 'reviews', label: `REVIEWS (${reviewsList.length})` },
              { id: 'faq', label: 'QUESTIONS / FAQ' }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as 'desc' | 'specs' | 'reviews' | 'faq')}
                className={`text-xs tracking-editorial uppercase transition-colors pb-1 cursor-pointer whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'font-semibold text-black dark:text-white border-b-2 border-black dark:border-white'
                    : 'text-[#777777] dark:text-[#888888] hover:text-black dark:hover:text-white font-normal'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Description Content */}
          {activeTab === 'desc' && (
            <div className="max-w-3xl text-xs text-[#555555] dark:text-[#B5B5B5] leading-relaxed space-y-4">
              <p>{product.description}</p>
              <div className="space-y-2 pt-2">
                <h4 className="text-xs uppercase font-medium text-black dark:text-white tracking-editorial">
                  Highlights & Features
                </h4>
                <ul className="list-disc list-inside space-y-1 text-[#555555] dark:text-[#B5B5B5]">
                  <li>Official concept fan merchandise inspired by NewJeans aesthetic.</li>
                  <li>Premium heavy-duty materials tailored for comfort and durability.</li>
                  <li>Includes exclusive serial authenticity tags & packaging.</li>
                </ul>
              </div>
            </div>
          )}

          {/* Specifications Content */}
          {activeTab === 'specs' && (
            <div className="max-w-2xl space-y-2 text-xs">
              <div className="flex justify-between py-2 border-b border-[#E5E5E5] dark:border-[#292929]">
                <span className="text-[#777777]">Category</span>
                <span className="text-black dark:text-white">{product.categoryName}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#E5E5E5] dark:border-[#292929]">
                <span className="text-[#777777]">Member Association</span>
                <span className="text-black dark:text-white uppercase">{product.members.join(', ')}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#E5E5E5] dark:border-[#292929]">
                <span className="text-[#777777]">Fabric / Material</span>
                <span className="text-black dark:text-white">Premium Cotton & Structured Synthetic</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#E5E5E5] dark:border-[#292929]">
                <span className="text-[#777777]">Stock Availability</span>
                <span className="text-black dark:text-white">{product.stock} Units in Warehouse</span>
              </div>
            </div>
          )}

          {/* Reviews Content */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium uppercase tracking-editorial text-black dark:text-white">
                  VERIFIED FAN REVIEWS
                </span>
                <Button
                  onClick={() => setIsReviewModalOpen(true)}
                  variant="primary"
                  size="sm"
                  className="gap-1 text-[11px]"
                >
                  <MessageSquarePlus size={13} />
                  <span>WRITE A REVIEW</span>
                </Button>
              </div>

              <div className="divide-y divide-[#E5E5E5] dark:divide-[#292929]">
                {reviewsList.map((rev) => (
                  <div key={rev.id} className="py-4 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-black dark:text-white">{rev.author}</span>
                      <span className="text-[#777777] text-[11px]">{rev.date}</span>
                    </div>
                    <div className="flex text-black dark:text-white">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          size={11}
                          strokeWidth={1}
                          className={s <= rev.rating ? 'fill-current text-current' : 'text-neutral-300 dark:text-neutral-700'}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-[#555555] dark:text-[#B5B5B5] leading-relaxed">
                      {rev.comment}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FAQ Content */}
          {activeTab === 'faq' && (
            <div className="max-w-3xl space-y-4 text-xs">
              <div className="p-4 rounded-[2px] bg-[#F7F7F7] dark:bg-[#111111] border border-[#E5E5E5] dark:border-[#292929] space-y-1">
                <h4 className="font-medium text-black dark:text-white">How long does international dispatch take?</h4>
                <p className="text-[#555555] dark:text-[#B5B5B5] leading-relaxed">
                  Orders are dispatched within 2-4 business days. Delivery tracking numbers are sent via email immediately upon shipping.
                </p>
              </div>
              <div className="p-4 rounded-[2px] bg-[#F7F7F7] dark:bg-[#111111] border border-[#E5E5E5] dark:border-[#292929] space-y-1">
                <h4 className="font-medium text-black dark:text-white">Are all collectible photocards protected during transit?</h4>
                <p className="text-[#555555] dark:text-[#B5B5B5] leading-relaxed">
                  Yes, all cards and albums are shipped in rigid acrylic toploaders with multilayer bubble cushion protection.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Related Products Grid: "YOU MAY ALSO LIKE" (Reference 2) */}
        {relatedProducts.length > 0 && (
          <div className="pt-12 border-t border-[#E5E5E5] dark:border-[#292929] space-y-6">
            <h2 className="text-lg sm:text-xl font-medium tracking-tight uppercase text-black dark:text-white">
              YOU MAY ALSO LIKE
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Review Modal */}
      <Modal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        title="Write a Customer Review"
      >
        <form onSubmit={handleAddReviewSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-medium uppercase tracking-editorial text-black dark:text-white mb-1">
              Your Name
            </label>
            <input
              type="text"
              required
              value={reviewAuthor}
              onChange={(e) => setReviewAuthor(e.target.value)}
              placeholder="e.g. Minji Bunny"
              className="w-full px-3 py-2 bg-[#F7F7F7] dark:bg-[#111111] border border-[#E5E5E5] dark:border-[#292929] rounded-[2px] text-xs text-black dark:text-white"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium uppercase tracking-editorial text-black dark:text-white mb-1">
              Rating
            </label>
            <select
              value={reviewRating}
              onChange={(e) => setReviewRating(Number(e.target.value))}
              className="w-full px-3 py-2 bg-[#F7F7F7] dark:bg-[#111111] border border-[#E5E5E5] dark:border-[#292929] rounded-[2px] text-xs text-black dark:text-white"
            >
              <option value={5}>5 Stars — Excellent Quality</option>
              <option value={4}>4 Stars — Very Good</option>
              <option value={3}>3 Stars — Average</option>
              <option value={2}>2 Stars — Fair</option>
              <option value={1}>1 Star — Poor</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-medium uppercase tracking-editorial text-black dark:text-white mb-1">
              Your Review
            </label>
            <textarea
              required
              rows={4}
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              placeholder="Share your thoughts on the fit, material, and packaging..."
              className="w-full px-3 py-2 bg-[#F7F7F7] dark:bg-[#111111] border border-[#E5E5E5] dark:border-[#292929] rounded-[2px] text-xs text-black dark:text-white"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsReviewModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Submit Review
            </Button>
          </div>
        </form>
      </Modal>

      {/* Ask Question Modal */}
      <Modal
        isOpen={isAskQuestionModalOpen}
        onClose={() => setIsAskQuestionModalOpen(false)}
        title="Ask a Question About this Item"
      >
        <form onSubmit={handleAskQuestionSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-medium uppercase tracking-editorial text-black dark:text-white mb-1">
              Your Name
            </label>
            <input
              type="text"
              required
              value={questionName}
              onChange={(e) => setQuestionName(e.target.value)}
              placeholder="Your name"
              className="w-full px-3 py-2 bg-[#F7F7F7] dark:bg-[#111111] border border-[#E5E5E5] dark:border-[#292929] rounded-[2px] text-xs text-black dark:text-white"
            />
          </div>
          <div>
            <label className="block text-[11px] font-medium uppercase tracking-editorial text-black dark:text-white mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={questionEmail}
              onChange={(e) => setQuestionEmail(e.target.value)}
              placeholder="your.email@example.com"
              className="w-full px-3 py-2 bg-[#F7F7F7] dark:bg-[#111111] border border-[#E5E5E5] dark:border-[#292929] rounded-[2px] text-xs text-black dark:text-white"
            />
          </div>
          <div>
            <label className="block text-[11px] font-medium uppercase tracking-editorial text-black dark:text-white mb-1">
              Your Question
            </label>
            <textarea
              required
              rows={4}
              value={questionMessage}
              onChange={(e) => setQuestionMessage(e.target.value)}
              placeholder="Inquire about sizing, restocks, or shipping details..."
              className="w-full px-3 py-2 bg-[#F7F7F7] dark:bg-[#111111] border border-[#E5E5E5] dark:border-[#292929] rounded-[2px] text-xs text-black dark:text-white"
            />
          </div>
          <div className="pt-2 flex justify-end gap-2">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsAskQuestionModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Send Inquiry
            </Button>
          </div>
        </form>
      </Modal>

      {/* Size Guide Modal */}
      <Modal
        isOpen={isSizeGuideModalOpen}
        onClose={() => setIsSizeGuideModalOpen(false)}
        title="Apparel Size Guide"
      >
        <div className="space-y-4 text-xs">
          <p className="text-[#555555] dark:text-[#B5B5B5]">
            All apparel items follow Asian streetwear sizing with a relaxed unisex fit. Measurements in cm:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-[#E5E5E5] dark:border-[#292929]">
              <thead>
                <tr className="bg-[#F7F7F7] dark:bg-[#111111] text-black dark:text-white font-mono text-[11px]">
                  <th className="p-2 border border-[#E5E5E5] dark:border-[#292929]">SIZE</th>
                  <th className="p-2 border border-[#E5E5E5] dark:border-[#292929]">CHEST (CM)</th>
                  <th className="p-2 border border-[#E5E5E5] dark:border-[#292929]">LENGTH (CM)</th>
                  <th className="p-2 border border-[#E5E5E5] dark:border-[#292929]">SHOULDER (CM)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E5E5] dark:divide-[#292929] text-[#555555] dark:text-[#B5B5B5]">
                <tr><td className="p-2 font-bold text-black dark:text-white">S</td><td className="p-2">106</td><td className="p-2">68</td><td className="p-2">52</td></tr>
                <tr><td className="p-2 font-bold text-black dark:text-white">M</td><td className="p-2">112</td><td className="p-2">71</td><td className="p-2">55</td></tr>
                <tr><td className="p-2 font-bold text-black dark:text-white">L</td><td className="p-2">118</td><td className="p-2">74</td><td className="p-2">58</td></tr>
                <tr><td className="p-2 font-bold text-black dark:text-white">XL</td><td className="p-2">124</td><td className="p-2">77</td><td className="p-2">61</td></tr>
                <tr><td className="p-2 font-bold text-black dark:text-white">2XL</td><td className="p-2">130</td><td className="p-2">80</td><td className="p-2">64</td></tr>
              </tbody>
            </table>
          </div>
          <div className="pt-2 flex justify-end">
            <Button type="button" variant="primary" size="sm" onClick={() => setIsSizeGuideModalOpen(false)}>
              Got It
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
