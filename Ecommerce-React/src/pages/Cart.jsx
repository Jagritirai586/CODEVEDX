function Cart({ cart }) {
  const total = cart.reduce(
    (sum, product) => sum + Number(product.price.replace(/[₹,]/g, "")),
    0
  );

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((product, index) => (
            <div key={index}>
              <h3>{product.name}</h3>
              <p>{product.price}</p>
            </div>
          ))}

          <hr />

          <h2>Total: ₹{total.toLocaleString()}</h2>
        </>
      )}
    </div>
  );
}

export default Cart;