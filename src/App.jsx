import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProductDetails from './components/ProductDetails'
import ProductForm from './components/ProductForm'
import './App.css'

function App() {
const [products, setProducts] = useState([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState('')

// Fetch products from the API when the page loads
useEffect(() => {
async function fetchProducts() {
try {
const response = await fetch(
'https://fakestoreapi.com/products'
)


    if (!response.ok) {
      throw new Error('Failed to fetch products')
    }

    const data = await response.json()
    setProducts(data)
  } catch {
    setError('Unable to load products. Please try again.')
  } finally {
    setLoading(false)
  }
}

fetchProducts()


}, [])

// Add a new product
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

// Show a loading message while fetching products
if (loading) {
return ( <div className="status-box"> <p>Loading products...</p> </div>
)
}

// Show an error if the API request fails
if (error) {
return ( <div className="status-box error"> <p>{error}</p> </div>
)
}

return ( <Routes>
{/* Homepage */}
<Route
path="/"
element={<HomePage products={products} />}
/>


  {/* Add product page */}
  <Route
    path="/add-product"
    element={
      <ProductForm
        onAddProduct={handleAddProduct}
        products={products}
      />
    }
  />

  {/* Product details page */}
  <Route
    path="/product/:id"
    element={
      <ProductDetails
        products={products}
        onUpdateProduct={handleUpdateProduct}
        onDeleteProduct={handleDeleteProduct}
      />
    }
  />

  {/* Edit product page */}
  <Route
    path="/edit-product/:id"
    element={
      <ProductForm
        products={products}
        onUpdateProduct={handleUpdateProduct}
      />
    }
  />
</Routes>

)
}

export default App
