/**
 * Admin categories manager.
 *
 * Inline list with inline editing — each row toggles into an editable state
 * and saves through the category API. A new category can be added from the
 * top, and existing categories can be deleted with confirmation.
 */

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, Edit3, Plus, Save, Trash2, X } from 'lucide-react'
import { cn } from '../../utils'
import { adminService } from '../services/adminApi'

const fieldClass =
  'w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/45 outline-none transition focus:border-[var(--green-light)] focus:bg-white/10 focus:ring-2 focus:ring-[var(--green-primary)]/30'

const emptyForm = { id: null, name: '', slug: '' }

export default function AdminCategories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [draft, setDraft] = useState(emptyForm)

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await adminService.fetchAdminCategories()
      const list = Array.isArray(data) ? data : data?.categories || []
      setCategories(list)
    } catch (err) {
      setError(err?.message || 'Unable to load categories.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const startAdd = () => {
    setDraft(emptyForm)
    setEditingId('new')
  }

  const startEdit = (category) => {
    const id = category.id || category._id
    setDraft({
      id,
      name: category.name || '',
      slug: category.slug || '',
    })
    setEditingId(id)
  }

  const cancelEdit = () => {
    setDraft(emptyForm)
    setEditingId(null)
  }

  const handleSave = async () => {
    const name = draft.name?.trim()
    const slug = draft.slug?.trim()
    if (!name || !slug) {
      setError('Name and slug are required.')
      return
    }
    setError('')
    try {
      if (editingId === 'new') {
        const created = await adminService.createAdminCategory({ name, slug })
        const category = created || { id: created?.id, name, slug }
        setCategories((prev) => [category, ...prev])
      } else {
        const updated = await adminService.updateAdminCategory(draft.id, { name, slug })
        setCategories((prev) =>
          prev.map((c) => (c.id === draft.id ? { id: draft.id, name, slug, ...(updated || {}) } : c)),
        )
      }
      cancelEdit()
    } catch (err) {
      setError(err?.message || 'Unable to save category.')
    }
  }

  const handleDelete = async (category) => {
    const id = category.id || category._id
    if (!window.confirm(`Delete "${category.name || id}"? This cannot be undone.`)) return
    try {
      await adminService.deleteAdminCategory(id)
      setCategories((prev) => prev.filter((c) => (c.id || c._id) !== id))
    } catch (err) {
      setError(err?.message || 'Unable to delete category.')
    }
  }

  const categoryId = (category) => category.id || category._id

  return (
    <div className="admin-page">
      <header className="admin-page-head">
        <div>
          <p className="admin-page-eyebrow">Catalogue</p>
          <h1 className="admin-page-title">Categories</h1>
        </div>
        <div className="admin-topbar-actions">
          <button type="button" className="btn btn-glass" onClick={load} disabled={loading}>
            Refresh
          </button>
          <button type="button" className="btn btn-primary" onClick={startAdd} disabled={editingId !== null}>
            <Plus size={16} aria-hidden="true" />
            <span>New category</span>
          </button>
        </div>
      </header>

      {error && (
        <div className="admin-alert admin-alert-error" role="alert">
          <span className="admin-alert-dot" aria-hidden="true" />
          <p>{error}</p>
        </div>
      )}

      {loading ? (
        <div className="admin-skeleton-grid" aria-busy="true">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="admin-skeleton-row glass-base" />
          ))}
        </div>
      ) : categories.length === 0 ? (
        <div className="admin-empty">
          <div className="admin-empty-card glass-base glass-strong">
            <p className="admin-empty-title">No categories</p>
            <p className="admin-empty-caption">Create your first category to group products.</p>
            <button type="button" className="btn btn-primary" onClick={startAdd}>
              <Plus size={16} aria-hidden="true" />
              <span>New category</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Slug</th>
                <th className="admin-th-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => {
                const id = categoryId(category)
                const isEditing = editingId === id
                return (
                  <tr key={id || 'row'}>
                    <td>
                      {isEditing ? (
                        <input
                          className={fieldClass}
                          value={draft.name}
                          onChange={(e) => setDraft((p) => ({ ...p, name: e.target.value }))}
                          placeholder="Category name"
                          disabled={false}
                        />
                      ) : (
                        <span className="admin-category-name">{category.name || '—'}</span>
                      )}
                    </td>
                    <td>
                      {isEditing ? (
                        <input
                          className={fieldClass}
                          value={draft.slug}
                          onChange={(e) => setDraft((p) => ({ ...p, slug: e.target.value }))}
                          placeholder="slug"
                          disabled={false}
                        />
                      ) : (
                        <span className="admin-category-slug">{category.slug || '—'}</span>
                      )}
                    </td>
                    <td className="admin-th-right">
                      {isEditing ? (
                        <div className="admin-actions">
                          <button type="button" className="btn btn-glass btn-sm" title="Save" onClick={handleSave}>
                            <Check size={14} aria-hidden="true" />
                          </button>
                          <button type="button" className="btn btn-glass btn-sm" title="Cancel" onClick={cancelEdit}>
                            <X size={14} aria-hidden="true" />
                          </button>
                        </div>
                      ) : (
                        <div className="admin-actions">
                          <button
                            type="button"
                            className="btn btn-glass btn-sm"
                            title="Edit"
                            onClick={() => startEdit(category)}
                          >
                            <Edit3 size={14} aria-hidden="true" />
                          </button>
                          <button
                            type="button"
                            className="btn btn-glass btn-sm"
                            title="Delete"
                            onClick={() => handleDelete(category)}
                          >
                            <Trash2 size={14} aria-hidden="true" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
