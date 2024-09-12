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
  loading: boolean; // Add loading state
};

export const useStore = create<Store>((set, get) => ({
  count: 1,
  data: [],
  cart: [],
  loading: false, // Initialize loading state
  inc: () => set((state) => ({ count: state.count + 1 })),
  getData: async () => {
    set({ loading: true }); // Set loading to true before fetching data
    try {
      const response = await fetch("https://dummyjson.com/products/category/groceries");
      const resData = await response.json();
      set({ data: resData.products });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      set({ loading: false }); // Set loading to false after data is fetched or if an error occurs
    }
  },
  addToCart: (id: number) =>
    set((state) => {
      const product = state.data.find((item) => item.id === id);
      if (product) {
        const existingItem = state.cart.find((item) => item.product.id === id);
        if (existingItem) {
          return {
            cart: state.cart.map((item) =>
              item.product.id === id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          };
        } else {
          return { cart: [...state.cart, { product, quantity: 1 }] };
        }
      }
      return state; // If product not found, return the current state
    }),
  increaseQuantity: (id: number) =>
    set((state) => {
      return {
        cart: state.cart.map((item) =>
          item.product.id === id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    }),
  decreaseQuantity: (id: number) =>
    set((state) => {
      return {
        cart: state.cart
          .map((item) =>
            item.product.id === id
              ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
              : item
          )
          .filter((item) => item.quantity > 0),
      };
    }),
  getCartItem: (id: number) => {
    const state = get(); // Use the `get` function to access current state
    return state.cart.find((item) => item.product.id === id);
  },
  removeFromCart: (id: number) =>
    set((state) => {
      return {
        cart: state.cart.filter((item) => item.product.id !== id),
      };
    }),
}));
