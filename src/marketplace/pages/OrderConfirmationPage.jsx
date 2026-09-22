import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CheckCircle2, Clock3, LoaderCircle, RefreshCw, Smartphone, XCircle } from 'lucide-react'
import { getOrderByNumber, getOrder, ORDER_STATUS, STATUS_LABEL } from '../services/orderService'
import { formatCurrency } from '../utils'
import OrderProgress from '../components/OrderProgress'

const POLL_INTERVAL = 3000
const POLL_TIMEOUT = 10 * 60 * 1000

function paymentStatus(payment, order) {
  const status = String(payment?.status || order?.payment?.status || order?.status || '').toUpperCase()
  if (status === 'SUCCESS' || status === 'PAID') return 'success'
  if (status === 'FAILED') return 'failed'
  if (status === 'CANCELLED' || status === 'CANCELED') return 'cancelled'
  return 'processing'
}

export default function OrderConfirmationPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [order, setOrder] = useState(null)
  const [payment, setPayment] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const startedAt = useRef(Date.now())

  const loadOrder = async () => {
    try {
      let nextOrder = await getOrderByNumber(id).catch(() => null)
      if (!nextOrder) nextOrder = await getOrder(id)
      setOrder(nextOrder)
      setPayment(nextOrder?.payment || null)
      setError('')
      return nextOrder
    } catch (requestError) {
      setError(requestError?.message || 'Unable to load this order.')
      return null
    }
  }

  useEffect(() => {
    let active = true
    setLoading(true)
    loadOrder().finally(() => {
      if (active) setLoading(false)
    })
    return () => {
      active = false
    }
  }, [id])

  useEffect(() => {
    if (!order || Date.now() - startedAt.current >= POLL_TIMEOUT) return undefined
    const timer = window.setTimeout(async () => {
      const nextOrder = await loadOrder()
      if (nextOrder?.status === ORDER_STATUS.PAYMENT_PENDING) startedAt.current = Date.now()
    }, POLL_INTERVAL)
    return () => window.clearTimeout(timer)
  }, [order])

  const state = paymentStatus(payment, order)
  const orderNumber = order?.orderNumber || id
  const amount = Number(order?.totalAmount || 0)
  const isFinal = state === 'success' || state === 'failed' || state === 'cancelled'

  if (loading && !order) {
    return (
      <div className="container checkout-empty">
        <div className="glass-panel checkout-empty-card">
          <p className="eyebrow">Order status</p>
          <h2>Loading your order...</h2>
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="container checkout-empty">
        <div className="glass-panel checkout-empty-card">
          <p className="eyebrow">Order status</p>
          <h2>No order found.</h2>
          <button type="button" className="btn btn-primary" onClick={() => navigate('/marketplace')}>
            Return to marketplace
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="order-confirmation-page">
      <div className="container confirmation-shell">
        <div className={`glass-panel confirmation-card confirmation-card--${state}`}>
          {state === 'success' && <div className="confirmation-success-icon"><CheckCircle2 size={34} /></div>}
          {state === 'processing' && <div className="confirmation-processing-icon"><Clock3 size={30} /></div>}
          {state !== 'success' && state !== 'processing' && <div className="confirmation-failure-icon"><XCircle size={32} /></div>}
          <p className="eyebrow">{state === 'success' ? 'Payment confirmed' : state === 'processing' ? 'Payment in progress' : 'Payment update'}</p>
          <h1>{state === 'success' ? 'Payment Successful' : state === 'failed' ? 'Payment Failed' : state === 'cancelled' ? 'Payment Cancelled' : 'Waiting for M-Pesa confirmation...'}</h1>
          <p className="confirmation-sub">
            {state === 'success'
              ? 'Thank you for shopping with Leema Tech Solutions.'
              : state === 'failed'
                ? 'The M-Pesa transaction could not be completed. Please try again.'
                : state === 'cancelled'
                  ? 'The M-Pesa prompt was cancelled. You can try the payment again.'
                  : 'Check your phone and enter your M-Pesa PIN to authorise this order.'}
          </p>

          <div className="confirmation-order-number">Order Number: <strong>{orderNumber}</strong></div>

          <div className="confirmation-grid">
            <div><label>Customer</label><strong>{order.customerName || 'Customer'}</strong></div>
            <div><label>Payment status</label><strong>{STATUS_LABEL[order.status] || STATUS_LABEL[payment?.status] || order.status}</strong></div>
            <div><label>Payment method</label><strong>M-Pesa</strong></div>
            <div><label>Amount</label><strong>{formatCurrency(amount, 'KSh')}</strong></div>
          </div>

          {state === 'success' ? (
            <div className="confirmation-success-panel">
              <CheckCircle2 size={18} />
              <span><b>Daraja has confirmed this payment.</b><small>The order is now marked as paid and the farm team has been notified.</small></span>
            </div>
          ) : state === 'processing' ? (
            <div className="confirmation-waiting-panel">
              <Smartphone size={18} />
              <span><b>M-Pesa prompt sent</b><small>Please enter your M-Pesa PIN on your phone. Do not close this page until confirmation arrives.</small></span>
              <LoaderCircle className="button-spinner" size={18} />
            </div>
          ) : (
            <div className="confirmation-retry-panel">
              <RefreshCw size={18} />
              <span><b>{state === 'cancelled' ? 'No payment was collected.' : 'No payment was collected.'}</b><small>Return to the marketplace and place the order again when ready.</small></span>
            </div>
          )}

          <OrderProgress order={order} />

          <div className="confirmation-items">
            {(order.items || []).map((item) => (
              <div key={item.id || item.productId} className="confirmation-item">
                <span>{item.productName || item.name || 'Product'} × {item.quantity}</span>
                <strong>{formatCurrency(Number(item.subtotal ?? (item.unitPrice || 0) * (item.quantity || 0)), 'KSh')}</strong>
              </div>
            ))}
          </div>

          <div className="confirmation-actions">
            <button type="button" className="btn btn-primary" onClick={() => navigate('/marketplace')}>Continue Shopping</button>
            {!isFinal && <button type="button" className="btn btn-glass" onClick={() => window.location.reload()}>Refresh Status</button>}
          </div>
          {error && <p className="confirmation-error" role="alert">{error}</p>}
        </div>
      </div>
    </div>
  )
}
