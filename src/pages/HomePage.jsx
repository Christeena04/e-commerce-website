
import { Link } from 'react-router-dom'
import ProductList from '../components/ProductList'

function HomePage({ products }) {
  return (
    <div className="store-container">
      
      <section className="store-hero">
        <div className="hero-text">
          <p className="hero-label">WELCOME TO MYSTORE</p>

          <h1>Everyday things, well chosen.</h1>

          <p className="hero-description">
            Clothing, jewelry and electronics from our catalogue.
          </p>

        </div>

        <div className="hero-media">
          <img
            src={`${import.meta.env.BASE_URL}hero.svg`}
            alt="Clothing, accessories and electronics"
          />
        </div>
      </section>

      <section id="products">
        <div className="products-heading">
          <h2>Our Products</h2>
          <p>{products.length} products</p>
        </div>

        <ProductList products={products} />
      </section>

      <footer className="store-footer">
        © 2026 MyStore. All rights reserved.
      </footer>
    </div>
  )
}

export default HomePage

