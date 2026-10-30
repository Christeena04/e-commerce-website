
import { useNavigate, Link, useParams } from 'react-router-dom'

function ProductDetails({ products, onDeleteProduct }) {
  const { id } = useParams()
  const navigate = useNavigate()

  const product = products.find(
    (item) => String(item.id) === id
  )

  if (!product) {
    return (
      <div className="product-details">
        <Link to="/" className="back-link">
          ← Back to Products
        </Link>

        <h2>Product not found.</h2>
      </div>
    )
  }

  function handleDelete() {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this product?'
    )

    if (confirmDelete) {
      onDeleteProduct(product.id)
      navigate('/')
    }
  }

  return (
    <div className="product-details">
      <Link to="/" className="back-link">
        ← Back to Products
      </Link>

      <div className="details-layout">
        <div className="details-media">
          <img
            src={product.image}
            alt={product.title}
            className="details-image"
          />
        </div>

        <div className="details-info">
          <span className="category-label">
            {product.category}
          </span>

          <h1>{product.title}</h1>

          <h2>${Number(product.price).toFixed(2)}</h2>

          <p>{product.description}</p>

          <div className="product-actions">
            <button
              type="button"
              onClick={() => navigate(`/edit-product/${product.id}`)}
            >
              Edit Product
            </button>

            <button type="button" onClick={handleDelete}>
              Delete Product
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails

