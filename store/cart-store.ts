// store/cart-store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  watchId: string;
  name: string;
  image: string;
  price: number;
  brandName: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (watchId: string) => void;
  updateQuantity: (watchId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item, quantity = 1) => {
        set((state) => {
          const existing = state.items.find((i) => i.watchId === item.watchId);

          if (existing) {
            return {
              items: state.items.map((i) =>
                i.watchId === item.watchId
                  ? { ...i, quantity: Math.min(10, i.quantity + quantity) }
                  : i
              ),
            };
          }

          return {
            items: [...state.items, { ...item, quantity: Math.min(10, quantity) }],
          };
        });
      },

      removeItem: (watchId) => {
        set((state) => ({
          items: state.items.filter((i) => i.watchId !== watchId),
        }));
      },

      updateQuantity: (watchId, quantity) => {
        if (quantity < 1) {
          get().removeItem(watchId);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.watchId === watchId ? { ...i, quantity: Math.min(10, quantity) } : i
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      totalPrice: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    {
      name: "aurum-cart", // localStorage key
    }
  )
);