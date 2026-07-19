import { useParams } from "react-router-dom";
import products from "../data/products";

function ProductDetails() {
  const { id } = useParams();

  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    return <h2>Product not found!</h2>;
  }

  return (
    <div className="product-details">
      <h1>Product Details</h1>

      <h2>{product.name}</h2>

      <img
        src={product.image}
        alt={product.name}
        width="300"
      />

     <h3>Price: {product.price}</h3>

<p>Rating: {product.rating}</p>

<p><strong>Description:</strong></p>

<p>{product.description}</p>

<button>Add to Cart</button>
    </div>
  );
}

export default ProductDetails;