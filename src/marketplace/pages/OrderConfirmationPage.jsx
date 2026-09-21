import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { getOrder } from '../services/orderService'
import { formatCurrency } from '../utils'
import OrderProgress from '../components/OrderProgress'

export default function OrderConfirmationPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const [order, setOrder] = useState(() => getOrder(id) || null)

  useEffect(() => {
    if (!order && id) setOrder(getOrder(id))
  }, [id, location.key, order])

  if (!order) {
    return (
      <div className="container checkout-empty">
        <div className="glass-panel checkout-empty-card">
          <p className="eyebrow">Order status</p>
          <h2>No order found.</h2>
          <button type="button" className="btn btn-primary" onClick={() => navigate('/marketplace')}>
            Return to shop
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="order-confirmation-page">
      <div className="container confirmation-shell">
        <div className="glass-panel confirmation-card">
          <p className="eyebrow">Order confirmed</p>
          <h1>Your farm-fresh order has been received.</h1>
          <p className="confirmation-sub">Order number: {order.number}</p>

          <div className="confirmation-grid">
            <div>
              <label>Delivery location</label>
              <strong>{order.customer.location}</strong>
            </div>
            <div>
              <label>Payment status</label>
              <strong>{order.payment.status}</strong>
            </div>
            <div>
              <label>Estimated delivery</label>
              <strong>2–4 working days</strong>
            </div>
            <div>
              <label>Total</label>
              <strong>{formatCurrency(order.total, order.currency)}</strong>
            </div>
          </div>

          <OrderProgress order={order} />

          <div className="confirmation-items">
            {order.items.map((item) => (
              <div key={item.productId} className="confirmation-item">
                <span>{item.name} × {item.quantity}</span>
                <strong>{formatCurrency(item.unitPrice * item.quantity, item.currency)}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
