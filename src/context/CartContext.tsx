import {
  createContext,
  useReducer,
  useEffect,
  type ReactNode,
  type Dispatch,
} from "react";
import type { CartState, CartAction } from "../types/models";
import { cartReducer } from "./cartReducer";
import { loadCartFromStorage, saveCartToStorage } from "../utils/cartStorage.";

export interface CartContextType {
  state: CartState;
  dispatch: Dispatch<CartAction>;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: loadCartFromStorage(),
  });

  useEffect(() => {
    saveCartToStorage(state.items);
  }, [state.items]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
