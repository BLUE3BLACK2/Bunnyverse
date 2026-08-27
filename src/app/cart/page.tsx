'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Trash2, ArrowLeft } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { CartItem } from '@/components/cart/CartItem';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';

export default function CartPage() {
  const {
    items,
    getSubtotal,
    getDiscount,
    getShippingCost,
    getTotal,
    clearCart,
    appliedCoupon,
    couponCodeInput,
    setCouponInput,
    applyCoupon,
    removeCoupon,
    couponError
  } = useCartStore();

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const shipping = getShippingCost();
  const total = getTotal();

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCodeInput.trim()) {
      applyCoupon(couponCodeInput);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <EmptyState type="cart" />
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-black min-h-screen py-8 md:py-14 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E5E5E5] dark:border-[#292929]">
          <div>
            <span className="text-[10px] uppercase font-medium tracking-editorial text-[#777777] dark:text-[#888888] block">
              CHECKOUT PREVIEW
            </span>
            <h1 className="text-2xl sm:text-3xl font-medium tracking-tight uppercase text-black dark:text-white">
              Shopping Bag
            </h1>
          </div>

          <button
            onClick={clearCart}
            className="text-xs uppercase tracking-editorial text-[#777777] hover:text-black dark:hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Trash2 size={13} />
            <span>Empty Bag</span>
          </button>
        </div>

        {/* Grid: Cart Items (Left) + Order Summary (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Items List */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white dark:bg-[#0A0A0A] border border-[#E5E5E5] dark:border-[#292929] rounded-[4px] p-5 divide-y divide-[#E5E5E5] dark:divide-[#292929]">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            <div className="flex items-center justify-between pt-2 text-xs">
              <Link
                href="/shop"
                className="inline-flex items-center gap-1 text-[#555555] dark:text-[#B5B5B5] hover:text-black dark:hover:text-white uppercase tracking-editorial font-medium transition-colors"
              >
                <ArrowLeft size={13} />
                <span>CONTINUE SHOPPING</span>
              </Link>
              <span className="text-[#777777] dark:text-[#888888]">
                Prices in IDR · Taxes included
              </span>
            </div>
          </div>

          {/* Right Column: Order Summary & Checkout Box */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#F7F7F7] dark:bg-[#0A0A0A] border border-[#E5E5E5] dark:border-[#292929] rounded-[4px] p-5 space-y-4 sticky top-24">
              <h3 className="text-xs font-medium uppercase tracking-editorial text-black dark:text-white pb-3 border-b border-[#E5E5E5] dark:border-[#292929]">
                ORDER SUMMARY
              </h3>

              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  value={couponCodeInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  placeholder="Promo Code (e.g. BUNNY10)"
                  className="flex-1 px-3 py-2 bg-white dark:bg-black border border-[#E5E5E5] dark:border-[#292929] rounded-[2px] text-xs text-black dark:text-white placeholder-[#777777]"
                />
                <Button type="submit" variant="secondary" size="sm" className="shrink-0 text-[10px]">
                  APPLY
                </Button>
              </form>

              {couponError && <p className="text-[10px] text-rose-500">{couponError}</p>}
              {appliedCoupon && (
                <div className="flex items-center justify-between text-xs text-emerald-600 dark:text-emerald-400">
                  <span>Applied: {appliedCoupon.code}</span>
                  <button onClick={removeCoupon} className="underline text-[10px]">Remove</button>
                </div>
              )}

              {/* Calculations */}
              <div className="space-y-1.5 text-xs pt-2 border-t border-[#E5E5E5] dark:border-[#292929]">
                <div className="flex justify-between text-[#555555] dark:text-[#B5B5B5]">
                  <span>Subtotal</span>
                  <span>Rp{subtotal.toLocaleString('id-ID')}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#555555] dark:text-[#B5B5B5]">
                    <span>Discount</span>
                    <span>-Rp{discount.toLocaleString('id-ID')}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#555555] dark:text-[#B5B5B5]">
                  <span>Shipping Cost</span>
                  <span>{shipping === 0 ? 'FREE' : `Rp${shipping.toLocaleString('id-ID')}`}</span>
                </div>
                <div className="flex justify-between text-sm font-medium text-black dark:text-white pt-2 border-t border-[#E5E5E5] dark:border-[#292929]">
                  <span>Total Amount</span>
                  <span>Rp{total.toLocaleString('id-ID')}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <div className="pt-2">
                <Link href="/checkout" className="block">
                  <Button variant="primary" size="lg" className="w-full text-xs">
                    <span>PROCEED TO CHECKOUT</span>
                    <ArrowRight size={14} />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
