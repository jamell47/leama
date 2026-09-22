/**
 * Admin payments overview.
 *
 * Lists every order alongside its payment status. Each row can expand into
 * a payment detail view fetched from `/payments/order/:orderId`, so an admin
 * can see exactly how a given order was paid without leaving the page.
 */

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, ChevronUp, Search } from 'lucide-react'
import { cn, formatCurrency } from '../../utils'
import { adminService } from '../services/adminApi'
import { normalizeOrder } from '../../marketplace/services/orderService'
import { PAYMENT_STATUS } from '../../marketplace/services/paymentService'

const fieldClass =
  'w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/45 outline-none transition focus:border-[var(--green-light)] focus:bg-white/10 focus:ring-2 focus:ring-[var(--green-primary)]/30'

const PAYMENT_TONE = {
  [PAYMENT_STATUS.PENDING]: 'amber',
  [PAYMENT_STATUS.PAYMENT_PENDING]: 'amber',
  [PAYMENT_STATUS.SUCCESS]: 'green',
  [PAYMENT_STATUS.FAILED]: 'red',
  [PAYMENT_STATUS.CANCELLED]: 'red',
}

const PAYMENT_LABEL = {
  [PAYMENT_STATUS.PENDING]: 'Pending',
  [PAYMENT_STATUS.PAYMENT_PENDING]: 'Waiting for M-Pesa',
  [PAYMENT_STATUS.SUCCESS]: 'Paid',
  [PAYMENT_STATUS.FAILED]: 'Failed',
  [PAYMENT_STATUS.CANCELLED]: 'Cancelled',
}

function formatDate(value) {
  if (!value) return '—'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '—'
  return date.toLocaleString('en-KE', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

function paymentStatusOf(order) {
  return order.payment?.status || order.paymentStatus || PAYMENT_STATUS.PENDING
}

export default function AdminPayments() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [expandedId, setExpandedId] = useState(null)
  const [details, setDetails] = useState(null)
  const [detailsLoading, setDetailsLoading] = useState(false)
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

  const openDetails = async (order) => {
    if (expandedId === order.id) {
      setExpandedId(null)
      return
    }
    setExpandedId(order.id)
    setDetails(null)
    setDetailsLoading(true)
    try {
      const data = await adminService.fetchAdminPayment(order.id)
      setDetails(data || null)
    } catch (err) {
      setDetails({ error: err?.message || 'Unable to load payment details.' })
    } finally {
      setDetailsLoading(false)
    }
  }

  const filtered = query
    ? orders.filter((order) => {
        const term = query.toLowerCase()
        return (
          String(order.orderNumber || order.id || '').toLowerCase().includes(term) ||
          (order.customerName || '').toLowerCase().includes(term)
        )
      })
    : orders

  const paidCount = orders.filter(
    (order) =>
      paymentStatusOf(order) === PAYMENT_STATUS.SUCCESS ||
      paymentStatusOf(order) === PAYMENT_STATUS.PAID,
  ).length
  const pendingCount = orders.filter(
    (order) =>
      paymentStatusOf(order) === PAYMENT_STATUS.PENDING ||
      paymentStatusOf(order) === PAYMENT_STATUS.PAYMENT_PENDING,
  ).length
  const failedCount = orders.filter(
    (order) => paymentStatusOf(order) === PAYMENT_STATUS.FAILED,
  ).length

  return (
    <div className="admin-page">
      <header className="admin-page-head">
        <div>
          <p className="admin-page-eyebrow">Payments</p>
          <h1 className="admin-page-title">Payments</h1>
        </div>
        <button type="button" className="btn btn-glass" onClick={load} disabled={loading}>
          Refresh
        </button>
      </header>

      <section className="admin-stat-grid">
        <StatCard
          label="Paid"
          value={paidCount}
          icon={PaymentIcon}
          tone="green"
          subtitle="Successful payments"
        />
        <StatCard
          label="Pending"
          value={pendingCount}
          icon={PaymentIcon}
          tone="amber"
          subtitle="Awaiting payment"
        />
        <StatCard
          label="Failed"
          value={failedCount}
          icon={PaymentIcon}
          tone="red"
          subtitle="Payments that failed"
        />
      </section>

      <div className="admin-toolbar">
        <div className="admin-search">
          <span className="admin-search-icon" aria-hidden="true">
            <Search size={16} />
          </span>
          <input
            type="search"
            placeholder="Search orders…"
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
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="admin-skeleton-row glass-base" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="admin-empty">
          <div className="admin-empty-card glass-base glass-strong">
            <p className="admin-empty-title">No payments</p>
            <p className="admin-empty-caption">Payments tied to orders will appear here once orders are placed.</p>
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
                <th>Payment status</th>
                <th>Updated</th>
                <th className="admin-th-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((order) => {
                const status = paymentStatusOf(order)
                const tone = PAYMENT_TONE[status] || 'amber'
                const isOpen = expandedId === order.id
                return (
                  <tr key={order.id}>
                    <td>
                      <Link to={`/admin/orders/${order.id}`} className="admin-link">
                        {order.orderNumber || order.id}
                      </Link>
                    </td>
                    <td>{order.customerName || '—'}</td>
                    <td>{formatCurrency(order.totalAmount ?? order.total ?? 0)}</td>
                    <td>
                      <span className={cn('admin-pill', `is-${tone}`)}>
                        {PAYMENT_LABEL[status] || status || 'Pending'}
                      </span>
                    </td>
                    <td>{formatDate(order.updatedAt || order.createdAt)}</td>
                    <td className="admin-th-right">
                      <button
                        type="button"
                        className="btn btn-glass btn-sm"
                        title={isOpen ? 'Hide payment' : 'View payment'}
                        onClick={() => openDetails(order)}
                        disabled={detailsLoading && isOpen}
                      >
                        {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          {expandedId && details !== null && (
            <div className="admin-payment-detail glass-base">
              {detailsLoading ? (
                <p>Loading payment details…</p>
              ) : details?.error ? (
                <p className="admin-detail-value" role="alert">
                  {details.error}
                </p>
              ) : (
                <div className="admin-detail-grid">
                  <div>
                    <p className="admin-detail-label">Payment ID</p>
                    <p className="admin-detail-value">{details?.id || details?.paymentId || '—'}</p>
                  </div>
                  <div>
                    <p className="admin-detail-label">Status</p>
                    <p className="admin-detail-value">
                      {details?.status || paymentStatusOf(orders.find((o) => o.id === expandedId)) || '—'}
                    </p>
                  </div>
                  <div>
                    <p className="admin-detail-label">Amount</p>
                    <p className="admin-detail-value">{formatCurrency(details?.amount || 0)}</p>
                  </div>
                  <div>
                    <p className="admin-detail-label">Method</p>
                    <p className="admin-detail-value">{details?.method || details?.paymentMethod || 'M-Pesa'}</p>
                  </div>
                  <div>
                    <p className="admin-detail-label">Reference</p>
                    <p className="admin-detail-value">{details?.reference || details?.transactionId || details?.receiptNo || '—'}</p>
                  </div>
                  <div>
                    <p className="admin-detail-label">Created</p>
                    <p className="admin-detail-value">{formatDate(details?.createdAt || details?.updatedAt)}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function PaymentIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
      <line x1="2" y1="16" x2="17" y2="16" />
      <line x1="7" y1="16" x2="7.01" y2="16" />
    </svg>
  )
}

function StatCard({ label, value, icon: Icon, tone = 'green', subtitle }) {
  const toneClass =
    tone === 'green'
      ? 'admin-stat-green'
      : tone === 'amber'
        ? 'admin-stat-amber'
        : tone === 'red'
          ? 'admin-stat-red'
          : 'admin-stat-cyan'

  return (
    <div className={cn('admin-stat-card glass-base', toneClass)}>
      <div className="admin-stat-head">
        <span className={cn('admin-stat-icon', toneClass)} aria-hidden="true">
          {Icon ? <Icon size={18} /> : null}
        </span>
      </div>
      <p className="admin-stat-label">{label}</p>
      <p className="admin-stat-value">{value}</p>
      {subtitle && <p className="admin-stat-subtitle">{subtitle}</p>}
    </div>
  )
}
