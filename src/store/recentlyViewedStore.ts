import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product } from '@/types';

interface RecentlyViewedStore {
  items: Product[];
  addProduct: (product: Product) => void;
  clearAll: () => void;
}

export const useRecentlyViewedStore = create<RecentlyViewedStore>()(
  persist(
    (set, get) => ({
      items: [],

      addProduct: (product: Product) => {
        const filtered = get().items.filter(p => p.id !== product.id);
        set({ items: [product, ...filtered].slice(0, 8) });
      },

      clearAll: () => set({ items: [] })
    }),
    {
      name: 'bunnyverse-recently-viewed',
      storage: createJSONStorage(() => localStorage)
    }
  )
);
