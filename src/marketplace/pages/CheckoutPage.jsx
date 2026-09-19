import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatCurrency } from '../utils'
import { buildOrder, saveOrder } from '../services/orderService'
import { validateMpesaPhone } from '../services/paymentService'

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { items, subtotal, deliveryFee, total, currency, clearCart } = useCart()
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    location: 'Nairobi, Kenya',
    address: '',
    mpesa: '',
  })
  const [error, setError] = useState('')

  const totalItems = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items])

  const setField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
    setError('')
  }

  const onSubmit = (event) => {
    event.preventDefault()

    const { valid, error: phoneError } = validateMpesaPhone(form.mpesa || form.phone)
    if (!valid) {
      setError(phoneError || 'Enter a valid M-Pesa number.')
      return
    }

    const order = buildOrder({
      customer: {
        name: form.fullName,
        phone: form.phone,
        email: form.email,
        location: form.location,
        address: form.address,
      },
      items,
      subtotal,
      deliveryFee,
      currency,
      payment: { method: 'mpesa', status: 'pending' },
    })

    const saved = saveOrder(order)
    clearCart()
    navigate(`/marketplace/order/${saved.id}`)
  }

  if (items.length === 0) {
    return (
      <div className="container checkout-empty">
        <div className="glass-panel checkout-empty-card">
          <p className="eyebrow">Checkout</p>
          <h2>Your cart is empty.</h2>
          <button type="button" className="btn btn-primary" onClick={() => navigate('/marketplace')}>
            Continue shopping
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="marketplace-checkout-page">
      <div className="container checkout-shell">
        <div className="checkout-layout">
          <form className="glass-panel checkout-form" onSubmit={onSubmit}>
            <div className="checkout-section-head">
              <p className="eyebrow">Order summary</p>
              <h1>Secure checkout</h1>
            </div>

            <div className="checkout-form-grid">
              <label>
                <span>Full name</span>
                <input value={form.fullName} onChange={(e) => setField('fullName', e.target.value)} required />
              </label>
              <label>
                <span>Phone number</span>
                <input value={form.phone} onChange={(e) => setField('phone', e.target.value)} placeholder="0712 345 678" required />
              </label>
              <label>
                <span>Email</span>
                <input type="email" value={form.email} onChange={(e) => setField('email', e.target.value)} required />
              </label>
              <label>
                <span>Delivery location</span>
                <input value={form.location} onChange={(e) => setField('location', e.target.value)} required />
              </label>
              <label className="checkout-full-span">
                <span>Delivery address</span>
                <textarea value={form.address} onChange={(e) => setField('address', e.target.value)} rows={4} required />
              </label>
            </div>

            <div className="mpesa-panel glass-base">
              <p className="eyebrow">Pay securely with M-Pesa</p>
              <label>
                <span>M-Pesa phone number</span>
                <input
                  value={form.mpesa}
                  onChange={(e) => setField('mpesa', e.target.value)}
                  placeholder="07XX XXX XXX"
                  required
                />
              </label>
              <button type="submit" className="btn btn-primary checkout-submit">Continue to Payment</button>
              {error && <p className="checkout-error">{error}</p>}
            </div>
          </form>

          <aside className="glass-panel checkout-summary">
            <div className="checkout-summary-head">
              <p className="eyebrow">Order summary</p>
              <h2>{totalItems} item{totalItems === 1 ? '' : 's'}</h2>
            </div>

            <div className="checkout-items">
              {items.map((item) => (
                <div key={item.product.id} className="checkout-item">
                  <img src={item.product.image} alt={item.product.name} loading="lazy" />
                  <div>
                    <strong>{item.product.name}</strong>
                    <span>{item.quantity} × {formatCurrency(item.product.price)} </span>
                  </div>
                  <span>{formatCurrency(item.product.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="checkout-totals">
              <div><span>Subtotal</span><strong>{formatCurrency(subtotal, currency)}</strong></div>
              <div><span>Delivery fee</span><strong>{deliveryFee ? formatCurrency(deliveryFee, currency) : 'Free'}</strong></div>
              <div className="checkout-grand-total"><span>Total</span><strong>{formatCurrency(total, currency)}</strong></div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
