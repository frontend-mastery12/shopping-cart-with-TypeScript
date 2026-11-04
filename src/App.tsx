import { Routes, Route } from "react-router";
import Header from "./components/Header";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";

function App() {
  return (
    <div className="min-h-screen bg-neutral-50 font-sans text-neutral-900 antialiased flex flex-col">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;