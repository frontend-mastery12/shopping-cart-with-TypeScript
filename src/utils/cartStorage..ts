import type { CartItem, Product } from "../types/models";

const CART_STORAGE_KEY = "shopping_cart_items";

const isValidProduct = (product: unknown): product is Product => {
  if (!product || typeof product !== "object") return false;
  const p = product as Record<string, unknown>;

  return (
    typeof p.id === "number" &&
    typeof p.name === "string" &&
    typeof p.price === "number" &&
    typeof p.image === "string" &&
    typeof p.description === "string"
  );
};

const isValidCartItem = (item: unknown): item is CartItem => {
  if (!item || typeof item !== "object") return false;
  const ci = item as Record<string, unknown>;

  return (
    typeof ci.quantity === "number" &&
    ci.quantity >= 1 &&
    isValidProduct(ci.product)
  );
};

export const saveCartToStorage = (items: CartItem[]): void => {
  try {
    const serializedData = JSON.stringify(items);
    localStorage.setItem(CART_STORAGE_KEY, serializedData);
  } catch (error) {
    console.error("Failed to save cart to Local Storage:", error);
  }
};

export const loadCartFromStorage = (): CartItem[] => {
  try {
    const serializedData = localStorage.getItem(CART_STORAGE_KEY);

    if (!serializedData) {
      return [];
    }

    const parsedData = JSON.parse(serializedData);

    if (!Array.isArray(parsedData)) {
      return [];
    }

    for (const item of parsedData) {
      if (!isValidCartItem(item)) {
        return [];
      }
    }

    return parsedData as CartItem[];
  } catch (error) {
    console.error("Failed to load or parse cart from Local Storage:", error);
    return [];
  }
};
