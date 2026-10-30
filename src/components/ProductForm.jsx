
import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

function ProductForm({ onAddProduct, onUpdateProduct, products = [] }) {
  const { id } = useParams()
  const navigate = useNavigate()

  const isEditing = Boolean(id)

  // Find the product when editing
  const productToEdit = products.find(
    (product) => String(product.id) === id
  )

  // Store the form input values
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    image: '',
  })

  // Store validation errors
  const [errors, setErrors] = useState({})

  // Fill the form with existing product information
  useEffect(() => {
    if (isEditing && productToEdit) {
      setFormData({
        title: productToEdit.title || '',
        price: String(productToEdit.price ?? ''),
        description: productToEdit.description || '',
        category: productToEdit.category || '',
        image: productToEdit.image || '',
      })
    }
  }, [id, isEditing, productToEdit])

  // Update form values when the user types
  function handleChange(event) {
    const { name, value } = event.target

    setFormData({
      ...formData,
      [name]: value,
    })

    setErrors({
      ...errors,
      [name]: '',
    })
  }

  // Check whether the form values are valid
  function validateForm() {
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Product title is required.'
    }

    if (formData.price.trim() === '') {
      newErrors.price = 'Product price is required.'
    } else if (
      !Number.isFinite(Number(formData.price)) ||
      Number(formData.price) <= 0
    ) {
      newErrors.price = 'Price must be greater than 0.'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Product description is required.'
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category.'
    }

    if (!formData.image.trim()) {
      newErrors.image = 'Product image URL is required.'
    } else {
      try {
        const imageUrl = new URL(formData.image.trim())

        if (
          imageUrl.protocol !== 'https:' &&
          imageUrl.protocol !== 'http:'
        ) {
          newErrors.image = 'Enter a valid HTTP or HTTPS image URL.'
        }
      } catch {
        newErrors.image = 'Please enter a valid image URL.'
      }
    }

    return newErrors
  }

  // Add a new product or save changes to an existing product
  function handleSubmit(event) {
    event.preventDefault()

    const validationErrors = validateForm()
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      return
    }

    const productData = {
      ...formData,
      price: Number(formData.price),
    }

    if (isEditing) {
      if (!productToEdit) {
        setErrors({
          form: 'Product not found. Please return to the homepage.',
        })
        return
      }

      onUpdateProduct({
        ...productData,
        id: productToEdit.id,
      })

      navigate(`/product/${productToEdit.id}`)
    } else {
      onAddProduct(productData)
      navigate('/')
    }
  }

  // Show a message if the product being edited cannot be found
  if (isEditing && !productToEdit) {
    return (
      <section className="product-form-container">
        <h2>Product not found</h2>
        <Link to="/">Back to Products</Link>
      </section>
    )
  }

  return (
    <section className="product-form-container">
      <Link to="/" className="back-link">
        ← Back to Products
      </Link>

      <h2>{isEditing ? 'Edit Product' : 'Create New Product'}</h2>

      <form onSubmit={handleSubmit} noValidate>
        {/* Product title */}
        <div className="form-group">
          <label htmlFor="title">Product Title</label>

          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter product title"
          />

          {errors.title && (
            <p className="field-error">{errors.title}</p>
          )}
        </div>

        {/* Product price */}
        <div className="form-group">
          <label htmlFor="price">Price (USD)</label>

          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter product price"
            min="0"
            step="any"
          />

          {errors.price && (
            <p className="field-error">{errors.price}</p>
          )}
        </div>

        {/* Product description */}
        <div className="form-group">
          <label htmlFor="description">Description</label>

          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the product"
            rows="4"
          />

          {errors.description && (
            <p className="field-error">{errors.description}</p>
          )}
        </div>

        {/* Product category */}
        <div className="form-group">
          <label htmlFor="category">Category</label>

          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select a category</option>
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewelry</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>
          </select>

          {errors.category && (
            <p className="field-error">{errors.category}</p>
          )}
        </div>

        {/* Product image URL */}
        <div className="form-group">
          <label htmlFor="image">Image URL</label>

          <input
            type="url"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
          />

          {errors.image && (
            <p className="field-error">{errors.image}</p>
          )}
        </div>

        {errors.form && (
          <p className="field-error" role="alert">
            {errors.form}
          </p>
        )}

        <button type="submit" className="submit-button">
          {isEditing ? 'Save Changes' : 'Create Product'}
        </button>
      </form>
    </section>
  )
}

export default ProductForm

