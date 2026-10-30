import { Link } from 'react-router-dom'

function ProductCard({ product }) {
return (
<Link
to={`/product/${product.id}`}
className="product-card-link"
> <div className="product-card"> <img
       src={product.image}
       alt={product.title}
       className="product-image"
     />


    <h2>{product.title}</h2>
    <p>${product.price}</p>
  </div>
</Link>


)
}

export default ProductCard
