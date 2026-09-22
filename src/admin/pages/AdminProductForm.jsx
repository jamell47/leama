/**
 * Admin product create / edit form.
 *
 * Supports a primary image upload and a multi-image gallery upload with live
 * previews. Uses a FormData body so binary files are sent alongside the JSON
 * fields; the existing `apiFetch` helper leaves the multipart boundary alone
 * for FormData payloads. On success the user is returned to the products list.
 */

import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Plus, Save, Trash2, Upload, X } from 'lucide-react'
import { cn } from '../../utils'
import { CATEGORIES } from '../../marketplace/data/categories'
import { adminService } from '../services/adminApi'
import { fetchProduct } from '../../marketplace/services/productService'

const fieldClass =
  'w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/45 outline-none transition focus:border-[var(--green-light)] focus:bg-white/10 focus:ring-2 focus:ring-[var(--green-primary)]/30'

const initialState = {
  name: '',
  description: '',
  price: '',
  unit: 'kg',
  stock: '',
  categoryId: '',
  subcategory: '',
  featured: false,
  organic: false,
  delivery: true,
  tags: '',
}

function toNumber(value, fallback = '') {
  if (value === '' || value === null || value === undefined) return fallback
  const number = Number(value)
  return Number.isFinite(number) ? number : fallback
}

export default function AdminProductForm() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()

  const [categories, setCategories] = useState([])
  const [form, setForm] = useState(initialState)
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const [galleryFiles, setGalleryFiles] = useState([])
  const [galleryPreviews, setGalleryPreviews] = useState([])
  const [loading, setLoading] = useState(isEdit)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const imageInputRef = useRef(null)
  const galleryInputRef = useRef(null)

  const categoryOptions =
    categories.length > 0 ? categories : CATEGORIES.filter((c) => c.id !== 'all')

  useEffect(() => {
    let active = true
    const loadCategories = async () => {
      try {
        const data = await adminService.fetchAdminCategories()
        const list = Array.isArray(data) ? data : data?.categories || []
        if (active) setCategories(list)
      } catch {
        if (active) setCategories([])
      }
    }
    loadCategories()

    if (isEdit) {
      const loadProduct = async () => {
        try {
          const product = await fetchProduct(id)
          if (!active || !product) return
          setForm({
            name: product.name || '',
            description: product.description || '',
            price: product.price != null ? String(product.price) : '',
            unit: product.unit || 'kg',
            stock: product.stock != null ? String(product.stock) : '',
            categoryId: product.categoryId || '',
            subcategory: product.subcategory || '',
            featured: Boolean(product.featured),
            organic: Boolean(product.organic),
            delivery: product.delivery !== false,
            tags: Array.isArray(product.tags) ? product.tags.join(', ') : '',
          })
          if (product.image) setImagePreview(product.image)
          if (Array.isArray(product.gallery) && product.gallery.length) {
            setGalleryPreviews([...product.gallery])
          }
        } catch (err) {
          if (active) setError(err?.message || 'Unable to load product.')
        } finally {
          if (active) setLoading(false)
        }
      }
      loadProduct()
    } else {
      setLoading(false)
    }

    return () => {
      active = false
    }
  }, [id, isEdit])

  useEffect(() => {
    return () => {
      if (imagePreview && imageFile) URL.revokeObjectURL(imagePreview)
      galleryPreviews.forEach((preview) => {
        if (preview && galleryFiles.findIndex((f) => f.preview === preview) === -1) {
          URL.revokeObjectURL(preview)
        }
      })
    }
  }, [])

  const updateField = (name, value) =>
    setForm((prev) => ({ ...prev, [name]: value }))

  const handleImageChange = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    if (imagePreview && imageFile) URL.revokeObjectURL(imagePreview)
    const preview = URL.createObjectURL(file)
    setImageFile(file)
    setImagePreview(preview)
  }

  const handleGalleryChange = (event) => {
    const files = Array.from(event.target.files || [])
    if (!files.length) return
    const withPreviews = files.map((file) => ({ file, preview: URL.createObjectURL(file) }))
    setGalleryFiles((prev) => [...prev, ...withPreviews])
    setGalleryPreviews((prev) => [...prev, ...withPreviews.map((f) => f.preview)])
  }

  const removeImage = () => {
    if (imagePreview && imageFile) URL.revokeObjectURL(imagePreview)
    setImageFile(null)
    setImagePreview('')
  }

  const removeGallery = (preview) => {
    setGalleryFiles((prev) => prev.filter((f) => f.preview !== preview))
    setGalleryPreviews((prev) => prev.filter((p) => p !== preview))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    if (!form.name.trim() || !form.price) {
      setError('Name and price are required.')
      return
    }

    setSubmitting(true)
    try {
      const fd = new FormData()
      fd.append('name', form.name.trim())
      fd.append('description', form.description.trim())
      fd.append('price', String(toNumber(form.price, 0) || 0))
      fd.append('unit', form.unit)
      fd.append('stock', String(toNumber(form.stock, 0) || 0))
      fd.append('categoryId', form.categoryId)
      if (form.subcategory) fd.append('subcategory', form.subcategory)
      fd.append('featured', form.featured)
      fd.append('organic', form.organic)
      fd.append('delivery', form.delivery)
      if (form.tags) fd.append('tags', form.tags)
      if (imageFile) fd.append('image', imageFile)
      galleryFiles.forEach((entry) => fd.append('gallery', entry.file))

      if (isEdit) {
        await adminService.updateAdminProduct(id, fd)
      } else {
        await adminService.createAdminProduct(fd)
      }
      navigate('/admin/products')
    } catch (err) {
      setError(err?.message || 'Unable to save product.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="admin-page">
        <div className="admin-skeleton-grid" aria-busy="true">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="admin-skeleton-card glass-base" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="admin-page">
      <header className="admin-page-head">
        <div>
          <p className="admin-page-eyebrow">{isEdit ? 'Edit product' : 'New product'}</p>
          <h1 className="admin-page-title">{isEdit ? 'Edit product' : 'Create product'}</h1>
        </div>
        <div className="admin-topbar-actions">
          <Link to="/admin/products" className="btn btn-glass">
            <X size={16} aria-hidden="true" />
            <span>Cancel</span>
          </Link>
          <button type="submit" className="btn btn-primary" form="admin-product-form" disabled={submitting}>
            {submitting ? (
              <>
                <span className="admin-spinner" aria-hidden="true" />
                Saving…
              </>
            ) : (
              <>
                <Save size={16} aria-hidden="true" />
                <span>{isEdit ? 'Update' : 'Create'}</span>
              </>
            )}
          </button>
        </div>
      </header>

      {error && (
        <div className="admin-alert admin-alert-error" role="alert">
          <span className="admin-alert-dot" aria-hidden="true" />
          <p>{error}</p>
        </div>
      )}

      <form id="admin-product-form" className="admin-form" onSubmit={handleSubmit} noValidate>
        <div className="admin-grid">
          <div className="admin-field-group">
            <label className="admin-field">
              <span className="admin-field-label">Product name</span>
              <input
                className={fieldClass}
                type="text"
                value={form.name}
                onChange={(e) => updateField('name', e.target.value)}
                placeholder="Hass Avocados"
                disabled={submitting}
              />
            </label>

            <label className="admin-field">
              <span className="admin-field-label">Description</span>
              <textarea
                className={fieldClass}
                value={form.description}
                onChange={(e) => updateField('description', e.target.value)}
                placeholder="A short, mouth-watering description…"
                rows={4}
                disabled={submitting}
              />
            </label>

            <div className="admin-row">
              <label className="admin-field">
                <span className="admin-field-label">Price</span>
                <input
                  className={fieldClass}
                  type="number"
                  min="0"
                  step="any"
                  value={form.price}
                  onChange={(e) => updateField('price', e.target.value)}
                  placeholder="0.00"
                  disabled={submitting}
                />
              </label>
              <label className="admin-field">
                <span className="admin-field-label">Unit</span>
                <input
                  className={fieldClass}
                  type="text"
                  value={form.unit}
                  onChange={(e) => updateField('unit', e.target.value)}
                  placeholder="kg"
                  disabled={submitting}
                />
              </label>
              <label className="admin-field">
                <span className="admin-field-label">Stock</span>
                <input
                  className={fieldClass}
                  type="number"
                  min="0"
                  value={form.stock}
                  onChange={(e) => updateField('stock', e.target.value)}
                  placeholder="0"
                  disabled={submitting}
                />
              </label>
            </div>

            <div className="admin-row">
              <label className="admin-field">
                <span className="admin-field-label">Category</span>
                <select
                  className={fieldClass}
                  value={form.categoryId}
                  onChange={(e) => updateField('categoryId', e.target.value)}
                  disabled={submitting}
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {categoryOptions.map((category) => {
                    const value = category.id || category._id || ''
                    return (
                      <option key={value || 'none'} value={value}>
                        {category.name || category.slug || value}
                      </option>
                    )
                  })}
                </select>
              </label>
              <label className="admin-field">
                <span className="admin-field-label">Subcategory</span>
                <input
                  className={fieldClass}
                  type="text"
                  value={form.subcategory}
                  onChange={(e) => updateField('subcategory', e.target.value)}
                  placeholder="e.g. Tropical"
                  disabled={submitting}
                />
              </label>
            </div>

            <label className="admin-field">
              <span className="admin-field-label">Tags</span>
              <input
                className={fieldClass}
                type="text"
                value={form.tags}
                onChange={(e) => updateField('tags', e.target.value)}
                placeholder="organic, seasonal, superfood (comma separated)"
                disabled={submitting}
              />
            </label>

            <div className="admin-toggles">
              <ToggleSwitch
                label="Featured"
                checked={form.featured}
                onChange={(value) => updateField('featured', value)}
                disabled={submitting}
              />
              <ToggleSwitch
                label="Organic"
                checked={form.organic}
                onChange={(value) => updateField('organic', value)}
                disabled={submitting}
              />
              <ToggleSwitch
                label="Delivery available"
                checked={form.delivery}
                onChange={(value) => updateField('delivery', value)}
                disabled={submitting}
              />
            </div>
          </div>

          <div className="admin-field-group">
            <label className="admin-field">
              <span className="admin-field-label">Primary image</span>
              <div className="admin-upload">
                <input
                  type="file"
                  accept="image/*"
                  ref={imageInputRef}
                  onChange={handleImageChange}
                  disabled={submitting}
                />
                <button
                  type="button"
                  className="btn btn-glass"
                  onClick={() => imageInputRef.current?.click()}
                  disabled={submitting}
                >
                  <Upload size={16} aria-hidden="true" />
                  <span>{imagePreview || imageFile ? 'Change image' : 'Upload image'}</span>
                </button>
              </div>
              {imagePreview ? (
                <div className="admin-upload-preview">
                  <img src={imagePreview} alt="Primary preview" />
                  <button
                    type="button"
                    className="admin-upload-remove"
                    onClick={removeImage}
                    aria-label="Remove image"
                    disabled={submitting}
                  >
                    <X size={14} aria-hidden="true" />
                  </button>
                </div>
              ) : (
                <div className="admin-upload-placeholder" aria-label="No image selected" />
              )}
            </label>

            <label className="admin-field">
              <span className="admin-field-label">Gallery images</span>
              <div className="admin-upload">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  ref={galleryInputRef}
                  onChange={handleGalleryChange}
                  disabled={submitting}
                />
                <button
                  type="button"
                  className="btn btn-glass"
                  onClick={() => galleryInputRef.current?.click()}
                  disabled={submitting}
                >
                  <Upload size={16} aria-hidden="true" />
                  <span>Add gallery images</span>
                </button>
              </div>
              {galleryPreviews.length > 0 ? (
                <div className="admin-gallery-previews">
                  {galleryPreviews.map((preview) => (
                    <div key={preview} className="admin-gallery-thumb">
                      <img src={preview} alt="Gallery preview" />
                      <button
                        type="button"
                        className="admin-upload-remove"
                        onClick={() => removeGallery(preview)}
                        aria-label="Remove image"
                        disabled={submitting}
                      >
                        <Trash2 size={12} aria-hidden="true" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="admin-upload-placeholder" aria-label="No gallery images" />
              )}
            </label>
          </div>
        </div>
      </form>
    </div>
  )
}

function ToggleSwitch({ label, checked, onChange, disabled }) {
  return (
    <label className="admin-toggle">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        aria-label={label}
      />
      <span className="admin-toggle-track">
        <span className="admin-toggle-thumb" />
      </span>
      <span className="admin-toggle-label">{label}</span>
    </label>
  )
}
