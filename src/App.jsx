
import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import ProductCard from './components/ProductCard'
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
    return (
      <div className="status-box">
        <p>Loading products...</p>
      </div>
    )
  }

  // Show an error if the API request fails
  if (error) {
    return (
      <div className="status-box error">
        <p>{error}</p>
      </div>
    )
  }

  return (
    <Routes>
      {/* Homepage */}
      <Route
        path="/"
        element={
          <div className="store-container">
            <header className="store-header">
              <Link to="/" className="store-logo">
                MyStore<span>.</span>
              </Link>

              <nav className="store-nav">
                <Link
                  to="/add-product"
                  className="add-product-button"
                >
                   Add Product 
                </Link>
              </nav>
            </header>

            <section className="store-hero">
              <div className="hero-text">
                <p className="hero-label">WELCOME TO MYSTORE</p>

                <h1>Everyday things, well chosen.</h1>

                <p className="hero-description">
                  Clothing, jewelry and electronics from our catalogue.
                </p>

                <a href="#products" className="hero-button">
                  Browse products
                </a>
              </div>

              <div className="hero-media">
                <img
                  src="/e-commerce-website/hero.svg"
                  alt="Clothing, accessories and electronics"
                />
              </div>
            </section>

            <section id="products">
              <div className="products-heading">
                <h2>Our Products</h2>
                <p>{products.length} products</p>
              </div>

              <div className="product-list">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))}
              </div>
            </section>

            <footer className="store-footer">
              © 2026 MyStore. Built with React.
            </footer>
          </div>
        }
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

