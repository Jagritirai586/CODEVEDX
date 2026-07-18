import { Link } from "react-router-dom";

function Navbar(props) {
  return (
    <nav className="navbar">
      <h2 className="logo">🛒 ShopEase</h2>

      <ul className="nav-links">
        <li>Home</li>
        <li>Products</li>
        <li>About</li>
        <li>Contact</li>
      </ul>

      <Link to="/cart">
        <button className="cart-btn">
          🛒 Cart ({props.cartCount})
        </button>
      </Link>
    </nav>
  );
}

export default Navbar;