import { create } from "zustand";

export type dataType = {
  title: string;
  thumbnail: string;
  id: number;
  price: number;
  category: string;
};

type CartItem = {
  product: dataType;
  quantity: number;
};

type Store = {
  count: number;
  inc: () => void;
  getData: () => Promise<void>;
  data: dataType[];
  cart: CartItem[];
  addToCart: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  getCartItem: (id: number) => CartItem | undefined;
  removeFromCart: (id: number) => void;
  loading: boolean;
};

export const useStore = create<Store>((set, get) => ({
  count: 1,
  data: [],
  cart: JSON.parse(localStorage.getItem("cart") || "[]"), // Load cart from local storage
  loading: false,
  inc: () => set((state) => ({ count: state.count + 1 })),
  getData: async () => {
    set({ loading: true });
    try {
      const response = await fetch("https://dummyjson.com/products/category/groceries");
      const resData = await response.json();
      set({ data: resData.products });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      set({ loading: false });
    }
  },
  addToCart: (id: number) =>
    set((state) => {
      const product = state.data.find((item) => item.id === id);
      if (product) {
        const existingItem = state.cart.find((item) => item.product.id === id);
        if (existingItem) {
          const updatedCart = state.cart.map((item) =>
            item.product.id === id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
          localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save cart to local storage
          return { cart: updatedCart };
        } else {
          const updatedCart = [...state.cart, { product, quantity: 1 }];
          localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save cart to local storage
          return { cart: updatedCart };
        }
      }
      return state;
    }),
  increaseQuantity: (id: number) =>
    set((state) => {
      const updatedCart = state.cart.map((item) =>
        item.product.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save cart to local storage
      return { cart: updatedCart };
    }),
  decreaseQuantity: (id: number) =>
    set((state) => {
      const updatedCart = state.cart
        .map((item) =>
          item.product.id === id
            ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
            : item
        )
        .filter((item) => item.quantity > 0);
      localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save cart to local storage
      return { cart: updatedCart };
    }),
  getCartItem: (id: number) => {
    const state = get();
    return state.cart.find((item) => item.product.id === id);
  },
  removeFromCart: (id: number) =>
    set((state) => {
      const updatedCart = state.cart.filter((item) => item.product.id !== id);
      localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save cart to local storage
      return { cart: updatedCart };
    }),
}));
