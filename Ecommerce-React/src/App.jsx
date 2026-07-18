import Cart from "./pages/Cart";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import products from "./data/products";
import ProductDetails from "./pages/ProductDetails";

function App() {
  const [cart, setCart] = useState([]);
const [searchTerm, setSearchTerm] = useState("");
const [category, setCategory] = useState("All");

 const addToCart = (product) => {
 console.log("Added:", product);
  setCart([...cart, product]);
};
 

return (
  <>
    <Navbar cartCount={cart.length} />

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

          <div className="category-buttons">
           <button onClick={() => setCategory("All")}>All</button>

           <button onClick={() => setCategory("Electronics")}>
             Electronics
           </button>

           <button onClick={() => setCategory("Accessories")}>
             Accessories
          </button>
        </div>

        <div className="products">
          {products
           .filter((product) => {
            const matchesSearch = product.name
             .toLowerCase()
             .includes(searchTerm.toLowerCase());

           const matchesCategory =
             category === "All" || product.category === category;

           return matchesSearch && matchesCategory;
         })
        .map((product) => (
         

            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              rating={product.rating}
              image={product.image}
              addToCart={() => addToCart(product)}
            />
          ))}

        </div>
      </div>
    }
  />

  <Route path="/product/:id" element={<ProductDetails />} />
  <Route path="/cart" element={<Cart cart={cart} />} />
</Routes>
  </>
);
}

export default App;
