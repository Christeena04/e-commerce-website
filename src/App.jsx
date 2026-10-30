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

// Fetch products from Fake Store API
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
    setError('Unable to load products. Please try again.')
  } finally {
    setLoading(false)
  }
}

fetchProducts()


}, [])

// Add a new product to client-side state
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
// Update an existing product
function handleUpdateProduct(updatedProduct) {
  setProducts((previousProducts) =>
    previousProducts.map((product) =>
      product.id === updatedProduct.id
        ? updatedProduct
        : product
    )
  )
}

// Delete a product
function handleDeleteProduct(productId) {
  setProducts((previousProducts) =>
    previousProducts.filter(
      (product) => product.id !== productId
    )
  )
}
// Find a product by ID and open its edit form
function handleEditProduct(productId) {
  const productToEdit = products.find(
    (product) => String(product.id) === String(productId)
  )

  return productToEdit
}
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

```
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
    element={<ProductDetails products={products} 
    onUpdateProduct={handleUpdateProduct}
      onDeleteProduct={handleDeleteProduct}/>}
  />
  <Route
  path="/edit-product/:id"
  element={
    <ProductForm
      products={products}
      onUpdateProduct={handleUpdateProduct}
      onAddProduct={handleAddProduct}
      productToEdit={products.find(
        (product) =>
          String(product.id) ===
          window.location.pathname.split('/').pop()
      )}
    />
  }
/>
</Routes>


)
}

export default App
