import { create } from 'zustand';
import { CartItem, Product } from '@/types';

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, quantity: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: typeof window !== 'undefined' 
    ? JSON.parse(localStorage.getItem('cart') || '[]') 
    : [],

  addItem: (product: Product, quantity: number) =>
    set((state) => {
      const existingItem = state.items.find((item) => item.id === product.id);
      let updatedItems: CartItem[];

      if (existingItem) {
        updatedItems = state.items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        updatedItems = [...state.items, { ...product, quantity }];
      }

      if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(updatedItems));
      }

      return { items: updatedItems };
    }),

  removeItem: (productId: string) =>
    set((state) => {
      const updatedItems = state.items.filter((item) => item.id !== productId);
      if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(updatedItems));
      }
      return { items: updatedItems };
    }),

  updateQuantity: (productId: string, quantity: number) =>
    set((state) => {
      const updatedItems = state.items.map((item) =>
        item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
      );
      if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(updatedItems));
      }
      return { items: updatedItems };
    }),

  clearCart: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cart');
    }
    set({ items: [] });
  },

  getTotalPrice: () =>
    get().items.reduce((total, item) => total + item.price * item.quantity, 0),

  getTotalItems: () => get().items.reduce((total, item) => total + item.quantity, 0),
}));
