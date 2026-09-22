/**
 * Admin dashboard.
 *
 * Pulls a snapshot of products, orders, payments and users in a single
 * parallel call, then renders glass stat cards plus a short list of
 * recent orders. Every state — loading, error, empty, success — is
 * handled explicitly so the UI never renders undefined data.
 */

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BarChart3, Box, Package, Receipt, ShoppingBag, Users } from 'lucide-react'
import { adminService } from '../services/adminApi'
import { formatCurrency } from '../../utils'
import StatCard from '../components/StatCard'
import { STATUS_LABEL } from '../../marketplace/services/orderService'

const STATUS_TONE = {
  PENDING: 'amber',
  PAID: 'green',
  PROCESSING: 'cyan',
  READY: 'green',
  COMPLETED: 'green',
  CANCELLED: 'red',
}

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await adminService.fetchDashboardStats()
      setStats(data)
    } catch (err) {
      setError(err?.message || 'Unable to load dashboard data. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  if (loading) {
    return (
      <div className="admin-page">
        <AdminSkeleton />
      </div>
    )
  }

  if (error || !stats) {
    return (
      <div className="admin-page">
        <div className="admin-empty">
          <div className="admin-empty-card glass-base glass-strong">
            <p className="admin-empty-title">Unable to load dashboard</p>
            <p className="admin-empty-caption">{error || 'No data available.'}</p>
            <button type="button" className="btn btn-glass" onClick={load}>
              Retry
            </button>
          </div>
        </div>
      </div>
    )
  }

  const recentOrders = stats.recentOrders || []

  return (
    <div className="admin-page">
      <header className="admin-page-head">
        <div>
          <p className="admin-page-eyebrow">Overview</p>
          <h1 className="admin-page-title">Dashboard</h1>
        </div>
        <button type="button" className="btn btn-glass" onClick={load} disabled={loading}>
          Refresh
        </button>
      </header>

      <section className="admin-stat-grid">
        <StatCard
          label="Total products"
          value={stats.products.total}
          icon={Package}
          tone="green"
          subtitle={`${stats.products.available} available · ${stats.products.outOfStock} out of stock`}
        />
        <StatCard
          label="Orders"
          value={stats.orders.total}
          icon={Receipt}
          tone="cyan"
          subtitle={`${stats.orders.pending} pending · ${stats.orders.processing} processing`}
        />
        <StatCard
          label="Revenue"
          value={formatCurrency(stats.orders.revenue)}
          icon={BarChart3}
          tone="green"
          subtitle="Total value of all orders"
        />
        <StatCard
          label="Payments"
          value={stats.payments.total}
          icon={ShoppingBag}
          tone="amber"
          subtitle={`${stats.payments.paid} paid · ${stats.payments.pending} pending · ${stats.payments.failed} failed`}
        />
        <StatCard
          label="Users"
          value={stats.users.total}
          icon={Users}
          tone="green"
          subtitle={`${stats.users.admins} admins · ${stats.users.customers} customers`}
        />
        <StatCard
          label="Featured products"
          value={stats.products.featured}
          icon={Box}
          tone="cyan"
          subtitle="Promoted on the marketplace"
        />
      </section>

      <section className="admin-panel">
        <div className="admin-panel-head">
          <h2>Recent orders</h2>
          <Link to="/admin/orders" className="admin-link">View all</Link>
        </div>
        {recentOrders.length === 0 ? (
          <div className="admin-empty-inline">
            <p>No orders yet.</p>
          </div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th>Updated</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => {
                  const paymentStatus = order.paymentStatus || order.payment?.status
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
                        <span className={cn('admin-pill', paymentStatus === 'SUCCESS' || paymentStatus === 'PAID' ? 'is-success' : paymentStatus === 'FAILED' ? 'is-error' : 'is-pending')}>
                          {paymentStatus || '—'}
                        </span>
                      </td>
                      <td>
                        <span className={cn('admin-pill', `is-${(order.status || '').toLowerCase()}`, STATUS_TONE[order.status])}>
                          {STATUS_LABEL[order.status] || order.status || 'Pending'}
                        </span>
                      </td>
                      <td>{formatDate(order.updatedAt || order.createdAt)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  )
}

function formatDate(value) {
  if (!value) return '—'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '—'
  return date.toLocaleDateString('en-KE', { day: '2-digit', month: 'short', year: 'numeric' })
}

function AdminSkeleton() {
  return (
    <div className="admin-skeleton-grid" aria-busy="true">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="admin-skeleton-card glass-base" />
      ))}
    </div>
  )
}

function cn(...inputs) {
  return inputs.filter(Boolean).join(' ')
}