/**
 * Admin orders list.
 *
 * Lists every order with inline status controls. Each row exposes an
 * editable status dropdown; changing it calls the status API and updates
 * the row optimistically. The customer column links to the order detail page.
 */

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import { cn, formatCurrency } from '../../utils'
import { adminService } from '../services/adminApi'
import { ORDER_STATUS, STATUS_LABEL, normalizeOrder } from '../../marketplace/services/orderService'

const fieldClass =
  'w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white outline-none transition focus:border-[var(--green-light)] focus:bg-white/10'

const STATUS_OPTIONS = [
  ORDER_STATUS.PENDING,
  ORDER_STATUS.PAYMENT_PENDING,
  ORDER_STATUS.PAID,
  ORDER_STATUS.PROCESSING,
  ORDER_STATUS.READY,
  ORDER_STATUS.COMPLETED,
  ORDER_STATUS.CANCELLED,
]

const STATUS_TONE = {
  PENDING: 'amber',
  PAYMENT_PENDING: 'amber',
  PAID: 'green',
  PROCESSING: 'cyan',
  READY: 'green',
  COMPLETED: 'green',
  CANCELLED: 'red',
}

function formatDate(value) {
  if (!value) return '—'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '—'
  return date.toLocaleDateString('en-KE', { day: '2-digit', month: 'short', year: 'numeric' })
}

export default function AdminOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [updatingId, setUpdatingId] = useState(null)
  const [query, setQuery] = useState('')

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await adminService.fetchAdminOrders()
      const list = Array.isArray(response?.orders) ? response.orders : response || []
      setOrders(list.map(normalizeOrder).filter(Boolean))
    } catch (err) {
      setError(err?.message || 'Unable to load orders.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const handleStatusChange = async (order, nextStatus) => {
    const previous = orders.find((o) => o.id === order.id)
    setUpdatingId(order.id)
    try {
      await adminService.updateAdminOrderStatus(order.id, nextStatus)
      setOrders((prev) =>
        prev.map((o) =>
          o.id === order.id
            ? { ...o, status: nextStatus, updatedAt: new Date().toISOString() }
            : o,
        ),
      )
    } catch (err) {
      setError(err?.message || 'Unable to update order status.')
      setOrders((prev) =>
        prev.map((o) => (o.id === order.id ? { ...previous } : o)),
      )
    } finally {
      setUpdatingId(null)
    }
  }

  const filtered = query
    ? orders.filter((order) => {
        const term = query.toLowerCase()
        const number = order.orderNumber || order.id || ''
        const customer = order.customerName || ''
        return (
          String(number).toLowerCase().includes(term) ||
          customer.toLowerCase().includes(term)
        )
      })
    : orders

  return (
    <div className="admin-page">
      <header className="admin-page-head">
        <div>
          <p className="admin-page-eyebrow">Orders</p>
          <h1 className="admin-page-title">Orders</h1>
        </div>
        <button type="button" className="btn btn-glass" onClick={load} disabled={loading}>
          Refresh
        </button>
      </header>

      <div className="admin-toolbar">
        <div className="admin-search">
          <span className="admin-search-icon" aria-hidden="true">
            <Search size={16} />
          </span>
          <input
            type="search"
            placeholder="Search by order number or customer…"
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
            <p className="admin-empty-title">No orders</p>
            <p className="admin-empty-caption">Orders placed on the marketplace will appear here.</p>
          </div>
        </div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Status</th>
                <th>Updated</th>
                <th className="admin-th-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((order) => (
                <tr key={order.id}>
                  <td>
                    <Link to={`/admin/orders/${order.id}`} className="admin-link">
                      {order.orderNumber || order.id}
                    </Link>
                  </td>
                  <td>{order.customerName || '—'}</td>
                  <td>{formatCurrency(order.totalAmount ?? order.total ?? 0)}</td>
                  <td>
                    <select
                      className={cn('admin-status-select', STATUS_TONE[order.status] && `is-${STATUS_TONE[order.status]}`)}
                      value={order.status || ORDER_STATUS.PENDING}
                      onChange={(e) => handleStatusChange(order, e.target.value)}
                      disabled={updatingId === order.id}
                    >
                      {STATUS_OPTIONS.map((status) => (
                        <option key={status} value={status}>
                          {STATUS_LABEL[status] || status}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>{formatDate(order.updatedAt || order.createdAt)}</td>
                  <td className="admin-th-right">
                    <div className="admin-actions">
                      <Link
                        to={`/admin/orders/${order.id}`}
                        className="btn btn-glass btn-sm"
                        title="View order"
                      >
                        <Search size={14} aria-hidden="true" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
