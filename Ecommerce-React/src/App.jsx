import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import products from "./data/products";

function App() {
  const [cartCount, setCartCount] = useState(0);
  const addToCart = () => {
  setCartCount(cartCount + 1);
};
  return (
    <div className="app">
      <Navbar cartCount={cartCount} />

      <h1>E-Commerce Product Page</h1>

      <p>Built with React, CSS and JavaScript</p>
      
<div className="products">
  {products.map((product) => (
    <ProductCard
      key={product.id}
      name={product.name}
      price={product.price}
      rating={product.rating}
      image={product.image}
      addToCart={addToCart}
    />
  ))}

</div>
    </div>
  );
}

export default App;
