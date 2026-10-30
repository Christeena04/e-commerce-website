import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import ProductCard from './components/ProductCard'
import ProductDetails from './components/ProductDetails'
import ProductForm from './components/ProductForm'
import './App.css'

// Friendly names for the API's category values
const CATEGORY_LABELS = {
  electronics: 'Electronics',
  jewelery: 'Jewelry',
  "men's clothing": "Men's Clothing",
  "women's clothing": "Women's Clothing",
}

function App() {
const [products, setProducts] = useState([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState('')
const [selectedCategory, setSelectedCategory] = useState('all')

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
// Unique categories from the data, and the products to show
const categories = [...new Set(products.map((product) => product.category))]

const visibleProducts =
  selectedCategory === 'all'
    ? products
    : products.filter((product) => product.category === selectedCategory)

if (loading) {
return (
    <div className="status-box">
      <div className="spinner"></div>
      <p>Loading products...</p>
    </div>
  )
}

if (error) {
return (
    <div className="status-box error">
      <p>{error}</p>
    </div>
  )
}

return ( <Routes>
{/* Home page */}
<Route
path="/"
element={ <div className="store-container"> <header className="store-header"> <Link to="/" className="store-logo">
          MyStore<span>.</span>
        </Link>


        <nav className="store-nav">
          <Link to="/" className="nav-link">
            Home
          </Link>

          <Link to="/add-product" className="add-product-button">
            + Add Product
          </Link>
        </nav>
      </header>

      <section className="store-hero">
        <div className="hero-text">
          <p className="hero-label">NEW COLLECTION</p>
          <h1>Everyday things, well chosen.</h1>
          <p className="hero-description">
            Clothing, jewelry and electronics from our catalogue.
          </p>

          {/* Anchor link scrolls down to the products section */}
          <a href="#products" className="hero-button">
            Browse products
          </a>
        </div>

        {/* One combined hero image (file lives in the public folder) */}
        <div className="hero-media">
          <img
            src="/hero.svg"
            alt="Clothing, accessories and electronics"
          />
        </div>
      </section>


      <div className="products-heading" id="products">
        <h2>Our Products</h2>
        <p>{visibleProducts.length} products</p>
      </div>

      {/* Filter buttons */}
      <div className="filter-bar">
        <button
          type="button"
          className={selectedCategory === 'all' ? 'filter-pill active' : 'filter-pill'}
          onClick={() => setSelectedCategory('all')}
        >
          All
        </button>

        {categories.map((category) => (
          <button
            type="button"
            key={category}
            className={selectedCategory === category ? 'filter-pill active' : 'filter-pill'}
            onClick={() => setSelectedCategory(category)}
          >
            {CATEGORY_LABELS[category] || category}
          </button>
        ))}
      </div>

      <div className="product-list">
        {visibleProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>

      <footer className="store-footer">
        © 2026 MyStore. Built with React.
      </footer>
    </div>
  }
/>

{/* Create product page */}
<Route
  path="/add-product"
  element={
    <ProductForm
      onAddProduct={handleAddProduct}
      products={products}
      onUpdateProduct={handleUpdateProduct}
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
      onAddProduct={handleAddProduct}
    />
  }
/>


  </Routes>
)
}

export default App