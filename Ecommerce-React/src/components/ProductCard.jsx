function ProductCard(props) {
  return (
    <div className="product-card">
      <img
        src={props.image}
        alt={props.name}
      />

      <h2>{props.name}</h2>

      <p className="price">{props.price}</p>

      <p>{props.rating}</p>

      <button onClick={props.addToCart}>
    <button onClick={props.addToCart}>
    Add to Cart
</button>
</button>
    </div>
  );
}

export default ProductCard;