
import { useState } from 'react'
function ProductForm({ onAddProduct }) {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    image: '',
  })

  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')

  // Update the form data whenever an input changes
  function handleChange(event) {
    const { name, value } = event.target

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }))

    // Clear the error for the field being edited
    setErrors((previousErrors) => ({
      ...previousErrors,
      [name]: '',
    }))

    setSuccessMessage('')
  }

  // Validate the form fields
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
      newErrors.price = 'Price must be a valid number greater than 0.'
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
          imageUrl.protocol !== 'http:' &&
          imageUrl.protocol !== 'https:'
        ) {
          newErrors.image = 'Image URL must start with http:// or https://.'
        }
      } catch {
        newErrors.image = 'Please enter a valid image URL.'
      }
    }

    return newErrors
  }

  // Handle form submission
  function handleSubmit(event) {
  event.preventDefault()

  setSuccessMessage('')

  const validationErrors = validateForm()
  setErrors(validationErrors)

  if (Object.keys(validationErrors).length > 0) {
    return
  }

  const newProduct = {
    ...formData,
    price: Number(formData.price),
    id: Date.now(),
  }

  onAddProduct(newProduct)

  setSuccessMessage('Product created successfully!')

  setFormData({
    title: '',
    price: '',
    description: '',
    category: '',
    image: '',
  })
}
  return (
    <section className="product-form-container">
      <h2>Create New Product</h2>

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="title">Product Title</label>

          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter product title"
            aria-invalid={Boolean(errors.title)}
            aria-describedby={errors.title ? 'title-error' : undefined}
          />

          {errors.title && (
            <p className="field-error" id="title-error">
              {errors.title}
            </p>
          )}
        </div>

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
            aria-invalid={Boolean(errors.price)}
            aria-describedby={errors.price ? 'price-error' : undefined}
          />

          {errors.price && (
            <p className="field-error" id="price-error">
              {errors.price}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>

          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the product"
            rows="4"
            aria-invalid={Boolean(errors.description)}
            aria-describedby={
              errors.description ? 'description-error' : undefined
            }
          />

          {errors.description && (
            <p className="field-error" id="description-error">
              {errors.description}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>

          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            aria-invalid={Boolean(errors.category)}
            aria-describedby={
              errors.category ? 'category-error' : undefined
            }
          >
            <option value="">Select a category</option>
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewelry</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>
          </select>

          {errors.category && (
            <p className="field-error" id="category-error">
              {errors.category}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="image">Image URL</label>

          <input
            type="url"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            aria-invalid={Boolean(errors.image)}
            aria-describedby={errors.image ? 'image-error' : undefined}
          />

          {errors.image && (
            <p className="field-error" id="image-error">
              {errors.image}
            </p>
          )}
        </div>

        <button type="submit" className="submit-button">
          Create Product
        </button>

        {successMessage && (
          <p className="success-message" role="status">
            {successMessage}
          </p>
        )}
      </form>
    </section>
  )
}

export default ProductForm

