'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
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
  MessageSquarePlus
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
  const router = useRouter();
  const slug = params?.slug as string;

  const product = PRODUCTS.find((p) => p.slug === slug);
  const { addItem } = useCartStore();
  const { isInWishlist, toggleWishlist } = useWishlistStore();
  const { addProduct: addRecentlyViewed } = useRecentlyViewedStore();
  const { showToast } = useToastStore();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(product?.sizes?.[0]);
  const selectedVariant = product?.variants?.[0]?.name;
  const selectedMember = product?.members?.[0] !== 'group' ? product?.members?.[0] : undefined;
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'shipping' | 'reviews'>('desc');
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewsList, setReviewsList] = useState<Review[]>(() => {
    return product ? getReviewsByProductId(product.id) : [];
  });

  // Track product in recently viewed
  React.useEffect(() => {
    if (product) {
      addRecentlyViewed(product);
    }
  }, [product, addRecentlyViewed]);

  // Form State for new review modal
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const reviewMemberBadge = 'Haerin';

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

  const handleAddToCart = () => {
    addItem(product, quantity, selectedSize, selectedVariant, selectedMember);
    showToast(`Added ${quantity}x "${product.name}" to your bag.`);
  };

  const handleBuyNow = () => {
    addItem(product, quantity, selectedSize, selectedVariant, selectedMember);
    router.push('/checkout');
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
      memberBadge: `${reviewMemberBadge} Bias`
    };

    setReviewsList([newRev, ...reviewsList]);
    setIsReviewModalOpen(false);
    setReviewAuthor('');
    setReviewComment('');
    showToast('Thank you! Your verified fan review has been submitted.');
  };

  return (
    <div className="bg-white dark:bg-black min-h-screen py-6 md:py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-[#777777] dark:text-[#888888]">
          <Link href="/" className="hover:text-black dark:hover:text-white transition-colors">
            HOME
          </Link>
          <ChevronRight size={12} />
          <Link href="/shop" className="hover:text-black dark:hover:text-white transition-colors">
            SHOP
          </Link>
          <ChevronRight size={12} />
          <Link
            href={`/shop?category=${product.category}`}
            className="hover:text-black dark:hover:text-white uppercase transition-colors"
          >
            {product.categoryName}
          </Link>
          <ChevronRight size={12} />
          <span className="text-black dark:text-white truncate max-w-[200px]">
            {product.name}
          </span>
        </nav>

        {/* Top Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-6 space-y-3">
            {/* Main Featured Image */}
            <div className="relative w-full aspect-square rounded-[4px] overflow-hidden bg-[#F7F7F7] dark:bg-[#111111] border border-[#E5E5E5] dark:border-[#292929]">
              <Image
                src={imageGallery[selectedImage] || product.image}
                alt={product.name}
                fill
                priority
                className="object-cover"
              />

              {/* Wishlist Heart */}
              <button
                onClick={() => toggleWishlist(product)}
                aria-label="Save to wishlist"
                className="absolute top-3 right-3 p-2 bg-white/90 dark:bg-black/90 rounded-[2px] text-black dark:text-white hover:opacity-75 transition-opacity z-10"
              >
                <Heart
                  size={18}
                  strokeWidth={1.5}
                  className={inWishlist ? 'fill-black text-black dark:fill-white dark:text-white' : ''}
                />
              </button>
            </div>

            {/* Thumbnail Row */}
            {imageGallery.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {imageGallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative w-16 h-16 rounded-[2px] overflow-hidden border transition-all shrink-0 ${
                      selectedImage === idx
                        ? 'border-black dark:border-white'
                        : 'border-[#E5E5E5] dark:border-[#292929] opacity-60 hover:opacity-100'
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Title, Pricing, Member association, Variants, CTA */}
          <div className="lg:col-span-6 space-y-5">
            <div className="space-y-1.5 pb-4 border-b border-[#E5E5E5] dark:border-[#292929]">
              {/* Member Tag */}
              <div className="flex items-center gap-2">
                {memberDetails.map((m) => (
                  <Link
                    key={m.id}
                    href={`/shop?member=${m.slug}`}
                    className="text-[11px] font-medium tracking-editorial uppercase text-[#777777] dark:text-[#888888] hover:text-black dark:hover:text-white"
                  >
                    {m.name} Edit
                  </Link>
                ))}
                <span className="text-[11px] text-[#777777]">/</span>
                <span className="text-[11px] font-medium tracking-editorial uppercase text-[#777777] dark:text-[#888888]">
                  {product.categoryName}
                </span>
              </div>

              {/* Product Name */}
              <h1 className="text-xl sm:text-2xl font-medium tracking-tight uppercase text-black dark:text-white">
                {product.name}
              </h1>

              {/* Price Row */}
              <div className="flex items-baseline gap-3 pt-2">
                <span className="text-xl sm:text-2xl font-medium text-black dark:text-white">
                  Rp{product.price.toLocaleString('id-ID')}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-[#777777] line-through">
                    Rp{product.originalPrice.toLocaleString('id-ID')}
                  </span>
                )}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 pt-1 text-xs text-[#777777] dark:text-[#888888]">
                <div className="flex text-neutral-800 dark:text-neutral-200">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      size={12}
                      strokeWidth={1}
                      className={s <= Math.round(product.rating) ? 'fill-current text-current' : 'text-neutral-300 dark:text-neutral-700'}
                    />
                  ))}
                </div>
                <span>({reviewsList.length} Customer Reviews)</span>
              </div>
            </div>

            {/* Short Description */}
            <p className="text-xs text-[#555555] dark:text-[#B5B5B5] leading-relaxed font-normal">
              {product.shortDescription}
            </p>

            {/* Size Selector for Fashion */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-2 pt-2">
                <label className="text-[11px] font-medium uppercase tracking-editorial text-black dark:text-white block">
                  SELECT SIZE: {selectedSize}
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`min-w-[44px] h-9 px-3 rounded-[2px] text-xs font-medium uppercase transition-colors cursor-pointer ${
                        selectedSize === s
                          ? 'bg-black text-white dark:bg-white dark:text-black border border-black dark:border-white'
                          : 'bg-white dark:bg-black text-black dark:text-white border border-[#E5E5E5] dark:border-[#292929] hover:border-black'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector & Action Buttons */}
            <div className="space-y-3 pt-3">
              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-[#E5E5E5] dark:border-[#292929] rounded-[2px] bg-white dark:bg-black">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-2.5 text-black dark:text-white hover:bg-[#F7F7F7] dark:hover:bg-[#111111]"
                  >
                    <Minus size={13} />
                  </button>
                  <span className="w-10 text-center text-xs font-mono text-black dark:text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    disabled={quantity >= product.stock}
                    className="p-2.5 text-black dark:text-white hover:bg-[#F7F7F7] dark:hover:bg-[#111111] disabled:opacity-30"
                  >
                    <Plus size={13} />
                  </button>
                </div>

                {/* Add to Bag */}
                <Button
                  onClick={handleAddToCart}
                  variant="primary"
                  size="lg"
                  className="flex-1 text-xs"
                >
                  <ShoppingBag size={14} />
                  <span>ADD TO BAG</span>
                </Button>
              </div>

              {/* Buy Now Button */}
              <Button
                onClick={handleBuyNow}
                variant="outline"
                size="lg"
                className="w-full text-xs"
              >
                BUY NOW (INSTANT CHECKOUT)
              </Button>
            </div>

            {/* Core Guarantees */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#E5E5E5] dark:border-[#292929] text-[11px] text-[#777777] dark:text-[#888888]">
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} strokeWidth={1.5} className="text-black dark:text-white" />
                <span>100% Authentic</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck size={16} strokeWidth={1.5} className="text-black dark:text-white" />
                <span>2-4 Days Dispatch</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw size={16} strokeWidth={1.5} className="text-black dark:text-white" />
                <span>30-Day Returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Info & Reviews Accordion */}
        <div id="product-tabs" className="border-t border-[#E5E5E5] dark:border-[#292929] pt-8 space-y-6">
          <div className="flex items-center gap-6 border-b border-[#E5E5E5] dark:border-[#292929] pb-3">
            {[
              { id: 'desc', label: 'DESCRIPTION' },
              { id: 'specs', label: 'SPECIFICATIONS' },
              { id: 'shipping', label: 'SHIPPING & PACKAGING' },
              { id: 'reviews', label: `REVIEWS (${reviewsList.length})` }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'desc' | 'specs' | 'shipping' | 'reviews')}
                className={`text-xs tracking-editorial uppercase transition-colors pb-1 cursor-pointer ${
                  activeTab === tab.id
                    ? 'font-semibold text-black dark:text-white border-b-2 border-black dark:border-white'
                    : 'text-[#777777] dark:text-[#888888] hover:text-black dark:hover:text-white font-normal'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Contents */}
          {activeTab === 'desc' && (
            <div className="max-w-2xl text-xs text-[#555555] dark:text-[#B5B5B5] leading-relaxed space-y-3">
              <p>{product.description}</p>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="max-w-xl space-y-2 text-xs">
              <div className="flex justify-between py-1.5 border-b border-[#E5E5E5] dark:border-[#292929]">
                <span className="text-[#777777]">Category</span>
                <span className="text-black dark:text-white">{product.categoryName}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#E5E5E5] dark:border-[#292929]">
                <span className="text-[#777777]">Member Association</span>
                <span className="text-black dark:text-white uppercase">{product.members.join(', ')}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#E5E5E5] dark:border-[#292929]">
                <span className="text-[#777777]">Stock Availability</span>
                <span className="text-black dark:text-white">{product.stock} Units</span>
              </div>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="max-w-2xl text-xs text-[#555555] dark:text-[#B5B5B5] leading-relaxed space-y-2">
              <p>• Free worldwide standard shipping on orders over Rp750.000.</p>
              <p>• All photocards and collectible albums are shipped in rigid protective toploaders with bubble wrap protection.</p>
              <p>• Express courier service available at checkout (1-2 business days delivery).</p>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium uppercase tracking-editorial text-black dark:text-white">
                  CUSTOMER REVIEWS
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
                    <div className="flex text-neutral-800 dark:text-neutral-200">
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
        </div>

        {/* Related Products Grid */}
        {relatedProducts.length > 0 && (
          <div className="pt-10 border-t border-[#E5E5E5] dark:border-[#292929] space-y-6">
            <h2 className="text-base sm:text-lg font-medium tracking-tight uppercase text-black dark:text-white">
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
    </div>
  );
}
