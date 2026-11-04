import ProductList from "../components/ProductList";

const ProductsPage = () => {
  return (
    <div className="min-h-screen bg-neutral-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="inline-block w-12/12 text-center text-neutral-800 text-[28px] font-bold uppercase tracking-widest px-7 py-1 rounded-full mb-3">
          Spring / Summer Collection
        </h1>

        <ProductList />
      </div>
    </div>
  );
};

export default ProductsPage;
