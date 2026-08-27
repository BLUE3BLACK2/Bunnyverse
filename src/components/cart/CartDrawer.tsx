'use client';

import React from 'react';
import Link from 'next/link';
import { X, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/store/cartStore';
import { CartItem } from './CartItem';
import { Button } from '../ui/Button';
import { EmptyState } from '../ui/EmptyState';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isDrawerOpen,
    closeDrawer,
    getSubtotal,
    getDiscount,
    getShippingCost,
    getTotal,
    getTotalItems,
    couponCodeInput,
    setCouponInput,
    applyCoupon,
    removeCoupon,
    appliedCoupon,
    couponError
  } = useCartStore();

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const shipping = getShippingCost();
  const total = getTotal();
  const totalCount = getTotalItems();

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCodeInput.trim()) {
      applyCoupon(couponCodeInput);
    }
  };

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
            className="fixed inset-0 bg-black/60"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="w-screen max-w-md bg-white dark:bg-black border-l border-[#E5E5E5] dark:border-[#292929] shadow-xl flex flex-col justify-between"
            >
              {/* Drawer Header */}
              <div className="p-4 border-b border-[#E5E5E5] dark:border-[#292929] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag size={18} strokeWidth={1.5} />
                  <h2 className="text-xs uppercase font-medium tracking-editorial text-black dark:text-white">
                    SHOPPING BAG ({totalCount})
                  </h2>
                </div>
                <button
                  onClick={closeDrawer}
                  className="p-1 text-[#777777] hover:text-black dark:hover:text-white transition-colors"
                >
                  <X size={18} strokeWidth={1.5} />
                </button>
              </div>

              {/* Drawer Body */}
              <div className="flex-1 overflow-y-auto p-4">
                {items.length === 0 ? (
                  <EmptyState
                    type="cart"
                    onActionClick={closeDrawer}
                  />
                ) : (
                  <div className="divide-y divide-[#E5E5E5] dark:divide-[#292929]">
                    {items.map((item) => (
                      <CartItem key={item.id} item={item} />
                    ))}
                  </div>
                )}
              </div>

              {/* Drawer Footer */}
              {items.length > 0 && (
                <div className="p-4 border-t border-[#E5E5E5] dark:border-[#292929] bg-[#F7F7F7] dark:bg-[#0A0A0A] space-y-3">
                  {/* Coupon input */}
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponCodeInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="Coupon: BUNNY10, FREESHIP"
                      className="flex-1 px-3 py-1.5 bg-white dark:bg-black border border-[#E5E5E5] dark:border-[#292929] rounded-[2px] text-xs text-black dark:text-white placeholder-[#777777]"
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

                  {/* Summary Rows */}
                  <div className="space-y-1 text-xs pt-1 border-t border-[#E5E5E5] dark:border-[#292929]">
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
                      <span>Shipping</span>
                      <span>{shipping === 0 ? 'FREE' : `Rp${shipping.toLocaleString('id-ID')}`}</span>
                    </div>
                    <div className="flex justify-between text-sm font-medium text-black dark:text-white pt-2 border-t border-[#E5E5E5] dark:border-[#292929]">
                      <span>Total</span>
                      <span>Rp{total.toLocaleString('id-ID')}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2 pt-2">
                    <Link href="/checkout" onClick={closeDrawer} className="block">
                      <Button variant="primary" size="lg" className="w-full text-xs">
                        <span>PROCEED TO CHECKOUT</span>
                        <ArrowRight size={14} />
                      </Button>
                    </Link>
                    <Link href="/cart" onClick={closeDrawer} className="block">
                      <Button variant="outline" size="md" className="w-full text-xs">
                        VIEW FULL BAG
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
