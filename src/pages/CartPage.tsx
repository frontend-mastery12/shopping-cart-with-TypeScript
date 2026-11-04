import { useContext, useState } from "react";
import { Link } from "react-router";
import { CartContext } from "../context/CartContext";

const CartPage = () => {
  const context = useContext(CartContext);
  const [checkoutMessage, setCheckoutMessage] = useState(false);

  if (!context) {
    throw new Error("CartPage must be used within a CartProvider");
  }

  const { state, dispatch } = context;
  const { items } = state;

  const subtotal = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const shipping = 0;
  const finalTotal = subtotal + shipping;

  const handleCheckout = () => {
    setCheckoutMessage(true);
    setTimeout(() => setCheckoutMessage(false), 5000); 
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-baseline justify-between mb-8 pb-4 border-b border-neutral-200">
          <h1 className="text-3xl font-black text-neutral-900 uppercase tracking-tight">
            Shopping Cart
          </h1>
          <span className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
            {items.reduce((acc, item) => acc + item.quantity, 0)} Items
          </span>
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-neutral-200 shadow-sm max-w-md mx-auto">
            <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4 text-neutral-400">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-neutral-900 mb-2">Your cart is empty</h2>
            <p className="text-neutral-500 text-sm mb-6">Explore our collections and add items to your bag.</p>
            <Link
              to="/"
              className="inline-block bg-black hover:bg-neutral-800 text-white font-semibold text-xs uppercase tracking-widest px-8 py-3.5 rounded-full transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden p-6">
              <div className="divide-y divide-neutral-100">
                {items.map((item) => {
                  const itemSubtotal = item.product.price * item.quantity;
                  return (
                    <div key={item.product.id} className="py-6 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center space-x-4">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-20 h-24 object-cover rounded-xl bg-neutral-100 border border-neutral-200/50 flex-shrink-0"
                        />
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Essential</span>
                          <h3 className="text-base font-bold text-neutral-900">
                            {item.product.name}
                          </h3>
                          <p className="text-xs text-neutral-500 mt-1">
                            ${item.product.price.toFixed(2)} each
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-6 w-full sm:w-auto justify-between sm:justify-end">
                        <div className="flex items-center border border-neutral-200 rounded-full bg-neutral-50 p-1">
                          <button
                            onClick={() =>
                              dispatch({ type: "DECREMENT_QUANTITY", payload: item.product.id })
                            }
                            className="w-7 h-7 bg-white hover:bg-neutral-200 rounded-full text-neutral-800 font-bold transition-colors cursor-pointer flex items-center justify-center text-xs shadow-xs"
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="px-3 text-xs font-bold text-neutral-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              dispatch({ type: "INCREMENT_QUANTITY", payload: item.product.id })
                            }
                            className="w-7 h-7 bg-white hover:bg-neutral-200 rounded-full text-neutral-800 font-bold transition-colors cursor-pointer flex items-center justify-center text-xs shadow-xs"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        <div className="text-right min-w-[70px]">
                          <p className="text-base font-bold text-neutral-900">
                            ${itemSubtotal.toFixed(2)}
                          </p>
                        </div>

                        <button
                          onClick={() =>
                            dispatch({ type: "REMOVE_FROM_CART", payload: item.product.id })
                          }
                          className="text-neutral-400 hover:text-red-600 transition-colors cursor-pointer p-1"
                          aria-label="Remove item"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm sticky top-24">
                <h2 className="text-base font-bold uppercase tracking-wider text-neutral-900 mb-6 pb-3 border-b border-neutral-100">
                  Summary
                </h2>

                <div className="space-y-3.5 text-xs mb-6">
                  <div className="flex justify-between text-neutral-600">
                    <span>Subtotal</span>
                    <span className="font-semibold text-neutral-900">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-neutral-600">
                    <span>Estimated Shipping</span>
                    <span className="font-bold text-neutral-900 uppercase">Free</span>
                  </div>
                  <div className="border-t border-neutral-100 pt-3.5 flex justify-between text-base font-bold text-neutral-900">
                    <span>Total Payment</span>
                    <span>${finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-black hover:bg-neutral-800 text-white font-semibold text-xs uppercase tracking-widest py-4 rounded-full transition-all cursor-pointer shadow-md active:scale-95"
                >
                  Proceed to Checkout
                </button>

                {checkoutMessage && (
                  <div className="mt-4 p-3.5 bg-neutral-900 text-white text-xs rounded-xl text-center font-medium shadow-md">
                    Order placed successfully!
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;