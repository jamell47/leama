/**
 * Admin order detail.
 *
 * Shows the full breakdown of a single order — customer, items, totals,
 * a visual progress tracker and a status update form. Reuses the existing
 * marketplace OrderProgress component so the design stays consistent.
 */

import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Save, ShoppingBag } from 'lucide-react'
import { cn, formatCurrency } from '../../utils'
import { adminService } from '../services/adminApi'
import {
  ORDER_STATUS,
  STATUS_LABEL,
  normalizeOrder,
} from '../../marketplace/services/orderService'
import OrderProgress from '../../marketplace/components/OrderProgress'

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
  return date.toLocaleString('en-KE', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

export default function AdminOrderDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const load = async () => {
    if (!id) return
    setLoading(true)
    setError('')
    try {
      const data = await adminService.fetchAdminOrder(id)
      setOrder(normalizeOrder(data) || null)
    } catch (err) {
      setError(err?.message || 'Unable to load order.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [id])

  const handleStatusChange = async (nextStatus) => {
    if (!order) return
    setSubmitting(true)
    setError('')
    try {
      const data = await adminService.updateAdminOrderStatus(order.id, nextStatus)
      const updated = normalizeOrder(data) || {}
      setOrder((prev) => ({ ...prev, ...updated, status: nextStatus, updatedAt: new Date().toISOString() }))
    } catch (err) {
      setError(err?.message || 'Unable to update order status.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="admin-page">
        <div className="admin-skeleton-grid" aria-busy="true">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="admin-skeleton-card glass-base" />
          ))}
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="admin-page">
        <div className="admin-empty">
          <div className="admin-empty-card glass-base glass-strong">
            <p className="admin-empty-title">Order not found</p>
            <p className="admin-empty-caption">{error || 'This order does not exist or could not be loaded.'}</p>
            <button type="button" className="btn btn-glass" onClick={() => navigate('/admin/orders')}>
              Back to orders
            </button>
          </div>
        </div>
      </div>
    )
  }

  const items = Array.isArray(order.items) ? order.items : []
  const subtotal = items.reduce(
    (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 1),
    0,
  )
  const total = order.totalAmount ?? order.total ?? 0
  const deliveryFee = order.deliveryFee ?? 0

  return (
    <div className="admin-page">
      <header className="admin-page-head">
        <div>
          <p className="admin-page-eyebrow">Order detail</p>
          <h1 className="admin-page-title">{order.orderNumber || order.id}</h1>
        </div>
        <div className="admin-topbar-actions">
          <Link to="/admin/orders" className="btn btn-glass">
            <ArrowLeft size={16} aria-hidden="true" />
            <span>Back to orders</span>
          </Link>
        </div>
      </header>

      {error && (
        <div className="admin-alert admin-alert-error" role="alert">
          <span className="admin-alert-dot" aria-hidden="true" />
          <p>{error}</p>
        </div>
      )}

      <div className="admin-grid admin-grid-tight">
        <div className="admin-card glass-base">
          <h2 className="admin-card-title">Customer</h2>
          <div className="admin-detail-grid">
            <div>
              <p className="admin-detail-label">Name</p>
              <p className="admin-detail-value">{order.customerName || order.customer?.name || '—'}</p>
            </div>
            <div>
              <p className="admin-detail-label">Phone</p>
              <p className="admin-detail-value">{order.phone || order.customer?.phone || '—'}</p>
            </div>
            <div>
              <p className="admin-detail-label">Email</p>
              <p className="admin-detail-value">{order.email || order.customer?.email || '—'}</p>
            </div>
            <div>
              <p className="admin-detail-label">Order date</p>
              <p className="admin-detail-value">{formatDate(order.createdAt)}</p>
            </div>
          </div>
        </div>

        <div className="admin-card glass-base">
          <h2 className="admin-card-title">Status</h2>
          <div className="admin-detail-grid">
            <div>
              <p className="admin-detail-label">Current status</p>
              <p className="admin-detail-value">
                <span
                  className={cn(
                    'admin-pill',
                    STATUS_TONE[order.status] && `is-${STATUS_TONE[order.status]}`,
                  )}
                >
                  {STATUS_LABEL[order.status] || order.status || 'Pending'}
                </span>
              </p>
            </div>
            <div>
              <p className="admin-detail-label">Payment status</p>
              <p className="admin-detail-value">
                <span
                  className={cn(
                    'admin-pill',
                    order.payment?.status === 'SUCCESS' || order.payment?.status === 'PAID'
                      ? 'is-success'
                      : order.payment?.status === 'FAILED'
                        ? 'is-error'
                        : 'is-pending',
                  )}
                >
                  {order.payment?.status || 'Unpaid'}
                </span>
              </p>
            </div>
          </div>

          <form
            className="admin-status-form"
            onSubmit={(event) => {
              event.preventDefault()
              const nextStatus = event.target.status.value
              handleStatusChange(nextStatus)
            }}
          >
            <label className="admin-field">
              <span className="admin-field-label">Update status</span>
              <select className="admin-status-select" name="status" defaultValue={order.status || ORDER_STATUS.PENDING} disabled={submitting}>
                {STATUS_OPTIONS.map((status) => (
                  <option key={status} value={status}>
                    {STATUS_LABEL[status] || status}
                  </option>
                ))}
              </select>
            </label>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? (
                <>
                  <span className="admin-spinner" aria-hidden="true" />
                  Updating…
                </>
              ) : (
                <>
                  <Save size={16} aria-hidden="true" />
                  <span>Update status</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      <section className="admin-panel">
        <h2 className="admin-panel-title">Progress</h2>
        <OrderProgress order={order} />
      </section>

      <section className="admin-panel">
        <h2 className="admin-panel-title">Items ({items.length})</h2>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Qty</th>
                <th>Unit price</th>
                <th className="admin-th-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item.id || `${order.id}-${index}`}>
                  <td>{item.name || item.productName || item.product?.name || '—'}</td>
                  <td>{item.quantity || 1}</td>
                  <td>{formatCurrency(item.price || 0)}</td>
                  <td className="admin-th-right">{formatCurrency(Number(item.price || 0) * Number(item.quantity || 1))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="admin-panel">
        <h2 className="admin-panel-title">Totals</h2>
        <div className="admin-totals">
          <div className="admin-totals-row">
            <span>Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div className="admin-totals-row">
            <span>Delivery fee</span>
            <span>{formatCurrency(deliveryFee)}</span>
          </div>
          <div className="admin-totals-row admin-totals-row--total">
            <span>Grand total</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </div>
      </section>
    </div>
  )
}
