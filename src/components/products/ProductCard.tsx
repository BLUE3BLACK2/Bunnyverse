'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingBag, Check, Star } from 'lucide-react';
import { Product } from '@/types';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useToastStore } from '../ui/Toast';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, priority = false }) => {
  const { addItem } = useCartStore();
  const { isInWishlist, toggleWishlist } = useWishlistStore();
  const { showToast } = useToastStore();
  const [isAdded, setIsAdded] = useState(false);
  const selectedSize = product.sizes && product.sizes.length > 0 ? product.sizes[0] : undefined;

  const inWishlist = isInWishlist(product.id);
  const memberLabel = product.members?.[0] ? product.members[0].toUpperCase() : 'BUNNYVERSE';

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1, selectedSize);
    setIsAdded(true);
    showToast(`Added "${product.name}" to bag!`);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    showToast(inWishlist ? 'Removed from wishlist' : 'Saved to wishlist!');
  };

  return (
    <div className="group bg-white dark:bg-[#0A0A0A] border border-[#E5E5E5] dark:border-[#292929] rounded-[4px] p-2.5 flex flex-col justify-between hover:border-black dark:hover:border-white transition-colors relative">
      <Link href={`/products/${product.slug}`} className="block">
        {/* Product Image Frame */}
        <div className="relative w-full aspect-[1/1] rounded-[2px] overflow-hidden bg-[#F7F7F7] dark:bg-[#111111] mb-2.5 flex items-center justify-center">
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority={priority}
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Top Badges */}
          <div className="absolute top-2 left-2 z-10">
            {product.discount ? (
              <span className="px-1.5 py-0.5 rounded-[2px] bg-black text-white dark:bg-white dark:text-black text-[9px] font-medium tracking-editorial uppercase">
                -{product.discount}%
              </span>
            ) : product.isNew ? (
              <span className="px-1.5 py-0.5 rounded-[2px] bg-[#555555] text-white text-[9px] font-medium tracking-editorial uppercase">
                NEW
              </span>
            ) : null}
          </div>

          {/* Top-Right Wishlist Heart Button */}
          <button
            onClick={handleWishlistToggle}
            aria-label="Save to wishlist"
            className="absolute top-2 right-2 p-1.5 text-black dark:text-white hover:opacity-75 transition-opacity z-10 cursor-pointer"
          >
            <Heart
              size={16}
              strokeWidth={1.5}
              className={inWishlist ? 'fill-black text-black dark:fill-white dark:text-white' : ''}
            />
          </button>
        </div>

        {/* Product Metadata */}
        <div className="space-y-1">
          {/* Member Association Tag */}
          <span className="text-[10px] uppercase font-medium tracking-editorial text-[#777777] dark:text-[#888888] block">
            {memberLabel}
          </span>

          {/* Product Name */}
          <h3 className="text-xs font-normal text-black dark:text-white line-clamp-1 group-hover:underline">
            {product.name}
          </h3>

          {/* Price & Optional Original Price */}
          <div className="flex items-center gap-2 pt-0.5">
            <span className="text-xs font-medium text-black dark:text-white">
              Rp{product.price.toLocaleString('id-ID')}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-[11px] text-[#777777] dark:text-[#888888] line-through">
                Rp{product.originalPrice.toLocaleString('id-ID')}
              </span>
            )}
          </div>

          {/* Star Rating & Review Count */}
          <div className="flex items-center gap-1 pt-0.5">
            <div className="flex text-neutral-800 dark:text-neutral-200">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  size={10}
                  strokeWidth={1}
                  className={s <= Math.round(product.rating) ? 'fill-current text-current' : 'text-neutral-300 dark:text-neutral-700'}
                />
              ))}
            </div>
            <span className="text-[10px] text-[#777777] dark:text-[#888888]">
              ({product.reviewCount})
            </span>
          </div>
        </div>
      </Link>

      {/* Desktop Quick Add Bar */}
      <div className="pt-2 mt-1 border-t border-[#E5E5E5] dark:border-[#292929]">
        <button
          onClick={handleAddToCart}
          className={`w-full py-1.5 px-3 rounded-[2px] text-[10px] font-medium tracking-editorial uppercase transition-all duration-150 flex items-center justify-center gap-1.5 cursor-pointer ${
            isAdded
              ? 'bg-black text-white dark:bg-white dark:text-black'
              : 'bg-[#F7F7F7] text-black hover:bg-black hover:text-white dark:bg-[#111111] dark:text-white dark:hover:bg-white dark:hover:text-black'
          }`}
        >
          {isAdded ? (
            <>
              <Check size={12} />
              <span>ADDED TO BAG</span>
            </>
          ) : (
            <>
              <ShoppingBag size={12} strokeWidth={1.5} />
              <span>ADD TO BAG</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
