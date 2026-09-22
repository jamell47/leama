/**
 * Admin products list.
 *
 * Renders the full catalogue of products in a glass table with inline
 * search, per-row edit/delete actions and a "new product" entry point that
 * opens the create form. Deletion is confirmed; the row is optimistically
 * removed on success.
 */

import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Edit, Plus, Search, Trash2 } from 'lucide-react'
import { cn, formatCurrency } from '../../utils'
import { adminService } from '../services/adminApi'
import { normalizeProduct } from '../../marketplace/services/productService'

const fieldClass =
  'w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/45 outline-none transition focus:border-[var(--green-light)] focus:bg-white/10 focus:ring-2 focus:ring-[var(--green-primary)]/30'

export default function AdminProducts() {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await adminService.fetchAdminProducts()
      const list = Array.isArray(data) ? data : data?.products || []
      setProducts(list.map(normalizeProduct).filter(Boolean))
    } catch (err) {
      setError(err?.message || 'Unable to load products.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const handleDelete = async (product) => {
    const confirmed = window.confirm(`Delete "${product.name}"? This cannot be undone.`)
    if (!confirmed) return
    try {
      await adminService.deleteAdminProduct(product.id)
      setProducts((prev) => prev.filter((p) => p.id !== product.id))
    } catch (err) {
      setError(err?.message || 'Unable to delete product.')
    }
  }

  const filtered = query
    ? products.filter((p) => {
        const term = query.toLowerCase()
        return (
          (p.name || '').toLowerCase().includes(term) ||
          String(p.id || '').toLowerCase().includes(term) ||
          (p.category || '').toLowerCase().includes(term)
        )
      })
    : products

  return (
    <div className="admin-page">
      <header className="admin-page-head">
        <div>
          <p className="admin-page-eyebrow">Catalogue</p>
          <h1 className="admin-page-title">Products</h1>
        </div>
        <div className="admin-topbar-actions">
          <button type="button" className="btn btn-glass" onClick={load} disabled={loading}>
            Refresh
          </button>
          <Link to="/admin/products/new" className="btn btn-primary">
            <Plus size={16} aria-hidden="true" />
            <span>New product</span>
          </Link>
        </div>
      </header>

      <div className="admin-toolbar">
        <div className="admin-search">
          <span className="admin-search-icon" aria-hidden="true">
            <Search size={16} />
          </span>
          <input
            type="search"
            placeholder="Search products…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={fieldClass}
          />
        </div>
      </div>

      {error && (
        <div className="admin-alert admin-alert-error" role="alert">
          <span className="admin-alert-dot" aria-hidden="true" />
          <p>{error}</p>
        </div>
      )}

      {loading ? (
        <div className="admin-skeleton-grid" aria-busy="true">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="admin-skeleton-row glass-base" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="admin-empty">
          <div className="admin-empty-card glass-base glass-strong">
            <p className="admin-empty-title">No products</p>
            <p className="admin-empty-caption">Get started by creating your first product.</p>
            <Link to="/admin/products/new" className="btn btn-primary">
              <Plus size={16} aria-hidden="true" />
              <span>Create product</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th className="admin-th-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => (
                <tr key={product.id}>
                  <td>
                    <div className="admin-product-cell">
                      {product.image ? (
                        <img src={product.image} alt={product.name} className="admin-product-img" />
                      ) : (
                        <div
                          className="admin-product-img admin-product-img-placeholder"
                          aria-label="No image"
                        />
                      )}
                      <div>
                        <p className="admin-product-name">{product.name}</p>
                        <p className="admin-product-meta">
                          {product.farmerName || product.location || ''}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>{product.category || '—'}</td>
                  <td>{formatCurrency(product.price)}</td>
                  <td>{product.stock}</td>
                  <td>
                    <span className={cn('admin-pill', product.isAvailable !== false ? 'is-success' : 'is-error')}>
                      {product.isAvailable !== false ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="admin-th-right">
                    <div className="admin-actions">
                      <button
                        type="button"
                        className="btn btn-glass btn-sm"
                        title="Edit"
                        onClick={() => navigate(`/admin/products/${product.id}/edit`)}
                      >
                        <Edit size={14} aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        className="btn btn-glass btn-sm"
                        title="Delete"
                        onClick={() => handleDelete(product)}
                      >
                        <Trash2 size={14} aria-hidden="true" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <footer className="admin-page-foot">
        <Link to="/admin/products/new" className="btn btn-primary">
          <Plus size={16} aria-hidden="true" />
          <span>New product</span>
        </Link>
      </footer>
    </div>
  )
}
