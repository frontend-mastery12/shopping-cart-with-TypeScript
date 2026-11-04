import { products } from "../data/products";
import ProductCard from "./ProductCard";

const ProductList = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-200">
        <div>
          <h2 className="text-xl font-bold text-neutral-900 tracking-tight">Product Catalog</h2>
          <p className="text-xs text-neutral-500 mt-0.5">Showing all curated apparel</p>
        </div>
        <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
          {products.length} Items
        </span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;