import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CartItem, Product, Coupon } from '@/types';
import { validateCoupon } from '@/data/coupons';

interface CartStore {
  items: CartItem[];
  isDrawerOpen: boolean;
  appliedCoupon: Coupon | null;
  couponCodeInput: string;
  couponError: string | null;
  
  // Actions
  addItem: (product: Product, quantity?: number, selectedSize?: string, selectedVariant?: string, selectedMember?: string) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  setCouponInput: (val: string) => void;
  
  // Computed values
  getTotalItems: () => number;
  getSubtotal: () => number;
  getDiscount: () => number;
  getShippingCost: (method?: 'regular' | 'express') => number;
  getTotal: (shippingMethod?: 'regular' | 'express') => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isDrawerOpen: false,
      appliedCoupon: null,
      couponCodeInput: '',
      couponError: null,

      addItem: (product, quantity = 1, selectedSize, selectedVariant, selectedMember) => {
        const uniqueId = `${product.id}-${selectedSize || 'default'}-${selectedVariant || 'default'}-${selectedMember || 'default'}`;
        const currentItems = get().items;
        const existingIndex = currentItems.findIndex(i => i.id === uniqueId);

        if (existingIndex > -1) {
          const updated = [...currentItems];
          const newQty = Math.min(updated[existingIndex].quantity + quantity, product.stock);
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: newQty
          };
          set({ items: updated, isDrawerOpen: true });
        } else {
          const newItem: CartItem = {
            id: uniqueId,
            product,
            quantity: Math.min(quantity, product.stock),
            selectedSize,
            selectedVariant,
            selectedMember
          };
          set({ items: [...currentItems, newItem], isDrawerOpen: true });
        }

        // Revalidate coupon if applied
        const coupon = get().appliedCoupon;
        if (coupon) {
          const newSubtotal = get().getSubtotal();
          if (newSubtotal < coupon.minSpend) {
            set({ appliedCoupon: null, couponError: `Coupon removed: subtotal below Rp${coupon.minSpend.toLocaleString('id-ID')}` });
          }
        }
      },

      removeItem: (itemId) => {
        const updated = get().items.filter(i => i.id !== itemId);
        set({ items: updated });

        const coupon = get().appliedCoupon;
        if (coupon) {
          const newSubtotal = updated.reduce((acc, i) => acc + i.product.price * i.quantity, 0);
          if (newSubtotal < coupon.minSpend) {
            set({ appliedCoupon: null, couponError: `Coupon removed: subtotal below Rp${coupon.minSpend.toLocaleString('id-ID')}` });
          }
        }
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }
        const updated = get().items.map(item => {
          if (item.id === itemId) {
            const validQty = Math.min(quantity, item.product.stock);
            return { ...item, quantity: validQty };
          }
          return item;
        });
        set({ items: updated });

        const coupon = get().appliedCoupon;
        if (coupon) {
          const newSubtotal = updated.reduce((acc, i) => acc + i.product.price * i.quantity, 0);
          if (newSubtotal < coupon.minSpend) {
            set({ appliedCoupon: null, couponError: `Coupon removed: subtotal below Rp${coupon.minSpend.toLocaleString('id-ID')}` });
          }
        }
      },

      clearCart: () => {
        set({ items: [], appliedCoupon: null, couponError: null });
      },

      openDrawer: () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),
      toggleDrawer: () => set(state => ({ isDrawerOpen: !state.isDrawerOpen })),

      applyCoupon: (code) => {
        const subtotal = get().getSubtotal();
        const res = validateCoupon(code, subtotal);
        if (res.valid && res.coupon) {
          set({ appliedCoupon: res.coupon, couponError: null, couponCodeInput: code.toUpperCase() });
          return true;
        } else {
          set({ couponError: res.error || 'Invalid coupon' });
          return false;
        }
      },

      removeCoupon: () => {
        set({ appliedCoupon: null, couponError: null, couponCodeInput: '' });
      },

      setCouponInput: (val) => set({ couponCodeInput: val, couponError: null }),

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
      },

      getDiscount: () => {
        const subtotal = get().getSubtotal();
        const coupon = get().appliedCoupon;
        if (!coupon) return 0;
        if (coupon.discountPercent) {
          return Math.round((subtotal * coupon.discountPercent) / 100);
        }
        if (coupon.discountAmount) {
          return Math.min(coupon.discountAmount, subtotal);
        }
        return 0;
      },

      getShippingCost: (method = 'regular') => {
        const subtotal = get().getSubtotal();
        if (subtotal === 0) return 0;
        const coupon = get().appliedCoupon;
        if (coupon?.freeShipping) return 0;
        if (subtotal >= 750000) return 0; // Free shipping threshold
        return method === 'express' ? 45000 : 20000;
      },

      getTotal: (shippingMethod = 'regular') => {
        const subtotal = get().getSubtotal();
        if (subtotal === 0) return 0;
        const discount = get().getDiscount();
        const shipping = get().getShippingCost(shippingMethod);
        return Math.max(0, subtotal - discount + shipping);
      }
    }),
    {
      name: 'bunnyverse-cart-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items, appliedCoupon: state.appliedCoupon })
    }
  )
);
