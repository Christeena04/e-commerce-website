import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import ProductCard from './components/ProductCard'
import ProductDetails from './components/ProductDetails'
import ProductForm from './components/ProductForm'
import './App.css'

function App() {
const [products, setProducts] = useState([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState('')
function handleAddProduct(newProduct) {
  const productWithId = {
    ...newProduct,
    id: Date.now(),
  }

  setProducts((previousProducts) => [
    productWithId,
    ...previousProducts,
  ])
}
useEffect(() => {
const fetchProducts = async () => {
try {
const response = await fetch(
'https://fakestoreapi.com/products'
)


    if (!response.ok) {
      throw new Error('Failed to fetch products')
    }

    const data = await response.json()
    setProducts(data)
  } catch (err) {
    setError(err.message)
  } finally {
    setLoading(false)
  }
}

fetchProducts()


}, [])

if (loading) {
return <h2>Loading products...</h2>
}

if (error) {
return <p>{error}</p>
}

return ( <Routes>
<Route
path="/"
element={ <div className="store-container"> <h1 className="store-title">
My E-Commerce Store </h1>

        <ProductForm onAddProduct={handleAddProduct} />
        <div className="product-list">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </div>
    }
  />

  <Route
    path="/product/:id"
    element={<ProductDetails />}
  />
</Routes>


)
}

export default App
