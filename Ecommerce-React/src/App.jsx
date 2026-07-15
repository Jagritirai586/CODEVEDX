import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import products from "./data/products";
import ProductDetails from "./pages/ProductDetails";

function App() {
  const [cartCount, setCartCount] = useState(0);
const [searchTerm, setSearchTerm] = useState("");
  const addToCart = () => {
  setCartCount(cartCount + 1);
};
 

return (
  <>
    <Navbar cartCount={cartCount} />

    <Routes>
  <Route
    path="/"
    element={
      <div className="app">
        <h1>E-Commerce Product Page</h1>

        <p>Built with React, CSS and JavaScript</p>
        <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-box"
          />

        <div className="products">
          {products
          .filter((product) =>
           product.name.toLowerCase().includes(searchTerm.toLowerCase())
         )
         .map((product) => (

            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              rating={product.rating}
              image={product.image}
              addToCart={addToCart}
            />
          ))}

        </div>
      </div>
    }
  />

  <Route path="/product/:id" element={<ProductDetails />} />
</Routes>
  </>
);
}

export default App;
