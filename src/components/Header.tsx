import { useContext } from "react";
import { Link } from "react-router";
import { CartContext } from "../context/CartContext";

const Header = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("Header must be used within a CartProvider");
  }

  const { state } = context;

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-white border-b border-neutral-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-black tracking-widest text-neutral-900 uppercase hover:opacity-80 transition-opacity"
        >
          VELORA
        </Link>

        <nav className="hidden md:flex items-center space-x-8 text-xs font-semibold tracking-widest text-neutral-700">
          <Link to="/" className="hover:text-black transition-colors">
            HOME
          </Link>
          <Link to="/" className="hover:text-black transition-colors">
            SHOP
          </Link>
          <Link to="/" className="hover:text-black transition-colors">
            NEW ARRIVALS
          </Link>
          <Link to="/" className="hover:text-black transition-colors">
            COLLECTIONS
          </Link>
          <Link to="/" className="hover:text-black transition-colors">
            SALE
          </Link>
        </nav>

        <div className="flex items-center space-x-5 text-neutral-900">
          <button
            aria-label="Search"
            className="p-1 hover:text-neutral-600 transition-colors cursor-pointer"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          <button
            aria-label="Account"
            className="p-1 hover:text-neutral-600 transition-colors cursor-pointer"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </button>

          <Link
            to="/cart"
            aria-label="Cart"
            className="relative p-1 hover:text-neutral-600 transition-colors flex items-center"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1.5 bg-black text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
