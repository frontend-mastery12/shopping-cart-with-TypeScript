import type { CartState, CartAction } from "../types/models";

export const initialCartState: CartState = {
    items: [],
};

export const cartReducer = (state: CartState, action: CartAction): CartState => {
    switch (action.type) {
        case "ADD_TO_CART": {
            const existingIndex = state.items.findIndex(
                (item) => item.product.id === action.payload.id
            );

            if (existingIndex > -1) {
                const updatedItems = [...state.items];
                updatedItems[existingIndex] = {
                    ...updatedItems[existingIndex],
                    quantity: updatedItems[existingIndex].quantity + 1,
                };
                return { ...state, items: updatedItems };
            } else {
                return {
                    ...state,
                    items: [...state.items, { product: action.payload, quantity: 1 }],
                };
            }
        }

        case "INCREMENT_QUANTITY": {
            return {
                ...state,
                items: state.items.map((item) =>
                    item.product.id === action.payload
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                ),
            };
        }

        case "DECREMENT_QUANTITY": {
            return {
                ...state,
                items: state.items.map((item) =>
                    item.product.id === action.payload
                        ? { ...item, quantity: Math.max(1, item.quantity - 1) }
                        : item
                ),
            };
        }

        case "REMOVE_FROM_CART": {
            return {
                ...state,
                items: state.items.filter((item) => item.product.id !== action.payload),
            };
        }

        default:
            return state;
    }
};