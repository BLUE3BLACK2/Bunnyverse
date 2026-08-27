import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product } from '@/types';

interface WishlistStore {
  items: Product[];
  toggleWishlist: (product: Product) => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      toggleWishlist: (product) => {
        const exists = get().items.some(p => p.id === product.id);
        if (exists) {
          set({ items: get().items.filter(p => p.id !== product.id) });
        } else {
          set({ items: [...get().items, product] });
        }
      },

      addToWishlist: (product) => {
        if (!get().items.some(p => p.id === product.id)) {
          set({ items: [...get().items, product] });
        }
      },

      removeFromWishlist: (productId) => {
        set({ items: get().items.filter(p => p.id !== productId) });
      },

      isInWishlist: (productId) => {
        return get().items.some(p => p.id === productId);
      },

      clearWishlist: () => set({ items: [] })
    }),
    {
      name: 'bunnyverse-wishlist-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
);
