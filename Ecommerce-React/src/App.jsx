
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

 <div className="hero-section">

<h1>Welcome to ShopEase</h1>


<p>
Your One-Stop Tech Shopping Destination
</p>

<p>
Premium Gadgets • Best Deals • Fast Delivery
</p>

<button
  className="shop-now-btn"
  onClick={() =>
    document.getElementById("products").scrollIntoView({
      behavior: "smooth",
    })
  }
>
  Shop Now
</button>

</div>      

<div className="offer-box">

<div>
⭐ 20% OFF
</div>

<div>
🚚 FREE DELIVERY
</div>

<div>
🔒 SECURE PAYMENT
</div>

</div>
<h1>Explore Our Premium Collection</h1>

<p>
Latest Tech Products at Amazing Prices.
</p>

        <input
            type="text"
            placeholder="Search your favourite gadget..."
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


<h2>Today's Special Offers</h2>

<p>🔥 Flat 20% OFF on Electronics</p>

<p>🚚 Free Shipping Available</p>

<p>💳 Secure Payments</p>

<h1>🔥 Trending Products</h1>

        <div className="products" id="products">
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
              bestSeller={product.bestSeller}
              addToCart={() => addToCart(product)}
            />
          ))}  
        </div>
        <footer className="footer">
          <h2>ShopEase</h2>
          <p>Premium Tech Shopping Store</p>
          <p>support@shopease.com</p>
          <p>+91-9876543210</p>
          <p>© 2026 ShopEase. All Rights Reserved.</p>
       </footer>
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
