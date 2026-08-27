import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product, Order, Category, CategoryId, OrderStatus } from '@/types';
import { PRODUCTS } from '@/data/products';
import { INITIAL_ORDERS } from '@/data/orders';
import { CATEGORIES } from '@/data/categories';

export interface CustomerMetric {
  id: string;
  name: string;
  email: string;
  avatar: string;
  orderCount: number;
  totalSpent: number;
  status: 'active' | 'vip' | 'inactive';
  joinedDate: string;
}

interface DashboardStore {
  products: Product[];
  orders: Order[];
  categories: Category[];
  customers: CustomerMetric[];
  
  // Product actions
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  
  // Order actions
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  
  // Category actions
  addCategory: (category: Omit<Category, 'id' | 'itemCount'>) => void;
  updateCategory: (id: string, updates: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  
  // Reset
  resetToDefaults: () => void;
}

const INITIAL_CUSTOMERS: CustomerMetric[] = [
  {
    id: 'cust-1',
    name: 'Alya Rahma',
    email: 'alya.rahma@example.com',
    avatar: '/members/minji.jpg',
    orderCount: 5,
    totalSpent: 3840000,
    status: 'vip',
    joinedDate: 'Jan 2026'
  },
  {
    id: 'cust-2',
    name: 'Bima Santoso',
    email: 'bima.s@example.com',
    avatar: '/members/hanni.jpg',
    orderCount: 2,
    totalSpent: 1250000,
    status: 'active',
    joinedDate: 'Feb 2026'
  },
  {
    id: 'cust-3',
    name: 'Clarissa Wijaya',
    email: 'clarissa.w@example.com',
    avatar: '/members/danielle.jpg',
    orderCount: 7,
    totalSpent: 5920000,
    status: 'vip',
    joinedDate: 'Dec 2025'
  },
  {
    id: 'cust-4',
    name: 'Dion Pratama',
    email: 'dion.p@example.com',
    avatar: '/members/haerin.jpg',
    orderCount: 1,
    totalSpent: 650000,
    status: 'active',
    joinedDate: 'Mar 2026'
  },
  {
    id: 'cust-5',
    name: 'Eva Nurhaliza',
    email: 'eva.nur@example.com',
    avatar: '/members/hyein.jpg',
    orderCount: 3,
    totalSpent: 2190000,
    status: 'active',
    joinedDate: 'Feb 2026'
  }
];

export const useDashboardStore = create<DashboardStore>()(
  persist(
    (set, get) => ({
      products: PRODUCTS,
      orders: INITIAL_ORDERS,
      categories: CATEGORIES,
      customers: INITIAL_CUSTOMERS,

      addProduct: (productData) => {
        const newProduct: Product = {
          ...productData,
          id: `custom-prod-${Date.now()}`,
          createdAt: new Date().toISOString().split('T')[0]
        };
        set({ products: [newProduct, ...get().products] });
      },

      updateProduct: (id, updates) => {
        set({
          products: get().products.map(p => p.id === id ? { ...p, ...updates } : p)
        });
      },

      deleteProduct: (id) => {
        set({
          products: get().products.filter(p => p.id !== id)
        });
      },

      addOrder: (order) => {
        set({ orders: [order, ...get().orders] });
      },

      updateOrderStatus: (orderId, status) => {
        set({
          orders: get().orders.map(o => {
            if (o.id === orderId) {
              const updatedSteps = [...o.trackingSteps];
              if (status === 'shipped') {
                updatedSteps[2] = { ...updatedSteps[2], completed: true, current: true };
              } else if (status === 'completed') {
                updatedSteps.forEach(s => { s.completed = true; s.current = false; });
                updatedSteps[3].current = true;
              }
              return { ...o, status, trackingSteps: updatedSteps };
            }
            return o;
          })
        });
      },

      addCategory: (catData) => {
        const id = catData.name.toLowerCase().replace(/\s+/g, '-') as CategoryId;
        const newCat: Category = {
          ...catData,
          id,
          slug: id,
          itemCount: 0
        };
        set({ categories: [...get().categories, newCat] });
      },

      updateCategory: (id, updates) => {
        set({
          categories: get().categories.map(c => c.id === id ? { ...c, ...updates } : c)
        });
      },

      deleteCategory: (id) => {
        set({
          categories: get().categories.filter(c => c.id !== id)
        });
      },

      resetToDefaults: () => {
        set({
          products: PRODUCTS,
          orders: INITIAL_ORDERS,
          categories: CATEGORIES,
          customers: INITIAL_CUSTOMERS
        });
      }
    }),
    {
      name: 'bunnyverse-dashboard-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
);
