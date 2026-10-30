import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function ProductDetails() {
const { id } = useParams()

const [product, setProduct] = useState(null)
const [loading, setLoading] = useState(true)
const [error, setError] = useState('')

useEffect(() => {
const fetchProduct = async () => {
try {
setLoading(true)
setError('')


    const response = await fetch(
      `https://fakestoreapi.com/products/${id}`
    )

    if (!response.ok) {
      throw new Error('Failed to fetch product details')
    }

    const data = await response.json()
    setProduct(data)
  } catch (err) {
    setError(err.message)
  } finally {
    setLoading(false)
  }
}

fetchProduct()


}, [id])

if (loading) {
return <p>Loading product details...</p>
}

if (error) {
return <p>{error}</p>
}

if (!product || !product.id) {
return <p>Product not found.</p>
}

return ( <div className="product-details"> <Link to="/">← Back to Products</Link>


  <img
    src={product.image}
    alt={product.title}
    className="details-image"
  />

  <h1>{product.title}</h1>
  <h2>${product.price}</h2>
  <p>{product.description}</p>

  <p>
    <strong>Category:</strong> {product.category}
  </p>
</div>


)
}

export default ProductDetails
