'use client';

import React from 'react';
import { ShoppingBag, Trash2 } from 'lucide-react';
import { useWishlistStore } from '@/store/wishlistStore';
import { useCartStore } from '@/store/cartStore';
import { useToastStore } from '@/components/ui/Toast';
import { ProductCard } from '@/components/products/ProductCard';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';

export default function WishlistPage() {
  const { items, clearWishlist } = useWishlistStore();
  const { addItem } = useCartStore();
  const { showToast } = useToastStore();

  const handleMoveAllToCart = () => {
    items.forEach((product) => {
      addItem(product, 1);
    });
    clearWishlist();
    showToast(`Moved ${items.length} items to your shopping bag.`);
  };

  return (
    <div className="bg-white dark:bg-black min-h-screen py-8 md:py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E5E5E5] dark:border-[#292929]">
          <div>
            <span className="text-[10px] uppercase font-medium tracking-editorial text-[#777777] dark:text-[#888888] block">
              SAVED ITEMS
            </span>
            <h1 className="text-2xl sm:text-3xl font-medium tracking-tight uppercase text-black dark:text-white">
              My Wishlist ({items.length})
            </h1>
          </div>

          {items.length > 0 && (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={clearWishlist}
                className="text-xs"
              >
                <Trash2 size={13} />
                <span>CLEAR ALL</span>
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleMoveAllToCart}
                className="text-xs"
              >
                <ShoppingBag size={13} />
                <span>MOVE ALL TO BAG</span>
              </Button>
            </div>
          )}
        </div>

        {/* Content */}
        {items.length === 0 ? (
          <EmptyState
            type="wishlist"
            title="Your wishlist is empty."
            description="Save items as you browse to easily purchase them later."
          />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
