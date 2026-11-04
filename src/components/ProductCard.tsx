import { useContext } from "react";
import type { Product } from "../types/models";
import { CartContext } from "../context/CartContext";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("ProductCard must be used within a CartProvider");
  }

  const { dispatch } = context;

  const handleAddToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-neutral-100 hover:border-neutral-200 transition-all duration-300 flex flex-col justify-between">
      <div className="relative aspect-[3/4] bg-neutral-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-neutral-900 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full border border-neutral-200/50">
          New Arrival
        </span>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-base font-semibold text-neutral-900 mb-1 tracking-tight">
          {product.name}
        </h3>
        <p className="text-neutral-500 text-xs leading-relaxed mb-4 line-clamp-2 flex-grow">
          {product.description}
        </p>

        <div className="flex items-center justify-between pt-2 border-t border-neutral-100 mt-auto">
          <span className="text-base font-bold text-neutral-900">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={handleAddToCart}
            className="bg-black hover:bg-neutral-800 text-white text-xs uppercase font-semibold tracking-wider px-4 py-2.5 rounded-full transition-all cursor-pointer shadow-sm active:scale-95"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;