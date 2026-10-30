
import { Link } from 'react-router-dom'

function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.id}`} className="product-card-link">
      <div className="product-card">
        <div className="product-image-wrap">
          <img
            src={product.image}
            alt={product.title}
            className="product-image"
          />
        </div>

        <span className="category-label">{product.category}</span>

        <h2>{product.title}</h2>

        <p>${Number(product.price).toFixed(2)}</p>
      </div>
    </Link>
  )
}

export default ProductCard

