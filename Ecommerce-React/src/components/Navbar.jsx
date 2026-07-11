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

      <button className="cart-btn">
       🛒 Cart ({props.cartCount})
      </button>
    </nav>
  );
}

export default Navbar;