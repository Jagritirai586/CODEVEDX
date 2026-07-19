import { Link } from "react-router-dom";


function ProductCard(props) {
  return (
    <div className="product-card">
     <Link to={`/product/${props.id}`}>
  <img src={props.image} alt={props.name} />
</Link>

     <Link to={`/product/${props.id}`}>
  <h2>{props.name}</h2>
</Link>

{props.bestSeller && <p>🔥 Best Seller</p>}

<p className="price">{props.price}</p>

<p>{props.rating}</p>

<p>🚚 Free Delivery Available</p>

<p>🔥 20% OFF Today</p>

<button onClick={props.addToCart}>
  Add to Cart
</button>
    </div>
  );
}

export default ProductCard;