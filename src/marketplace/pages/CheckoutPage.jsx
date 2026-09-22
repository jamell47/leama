import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle2, LoaderCircle, Smartphone } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { formatCurrency } from '../utils'
import { createOrder } from '../services/orderService'
import { validateMpesaPhone } from '../services/paymentService'

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { items, subtotal, deliveryFee, total, currency, clearCart, pending } = useCart()
  const [form, setForm] = useState({ fullName: '', phone: '', email: '' })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const totalItems = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items])

  const setField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
    setError('')
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    if (!form.fullName.trim()) {
      setError('Enter your full name.')
      return
    }
    const phone = validateMpesaPhone(form.phone)
    if (!phone.valid) {
      setError(phone.error)
      return
    }
    setSubmitting(true)
    setError('')
    try {
      const result = await createOrder({
        customerName: form.fullName.trim(),
        phone: phone.normalised,
        email: form.email.trim() || undefined,
        items: items.map((item) => ({ productId: item.productId, quantity: item.quantity })),
      })
      const order = result.order || result
      const payment = result.payment || result.paymentData || null
      await clearCart()
      navigate(`/marketplace/order/${encodeURIComponent(order.orderNumber || order.id)}`, {
        state: { paymentId: payment?.id, checkoutRequestId: payment?.checkoutRequestId },
      })
    } catch (requestError) {
      setError(requestError?.message || 'Checkout failed. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (items.length === 0 && !pending) {
    return (
      <div className="container checkout-empty">
        <div className="glass-panel checkout-empty-card">
          <p className="eyebrow">Checkout</p>
          <h2>Your cart is empty.</h2>
          <button type="button" className="btn btn-primary" onClick={() => navigate('/marketplace')}>Continue shopping</button>
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
              <p className="eyebrow">Secure checkout</p>
              <h1>Complete your order</h1>
              <p className="checkout-intro">Enter your details and confirm the M-Pesa prompt on your phone. Your order is only paid after Safaricom confirms it.</p>
            </div>

            <div className="checkout-form-grid">
              <label className="checkout-full-span">
                <span>Full name</span>
                <input value={form.fullName} onChange={(event) => setField('fullName', event.target.value)} placeholder="Customer Name" autoComplete="name" required />
              </label>
              <label>
                <span>Phone number</span>
                <input value={form.phone} onChange={(event) => setField('phone', event.target.value)} placeholder="0712 345 678" autoComplete="tel" inputMode="tel" required />
              </label>
              <label>
                <span>Email (optional)</span>
                <input type="email" value={form.email} onChange={(event) => setField('email', event.target.value)} placeholder="customer@example.com" autoComplete="email" />
              </label>
            </div>

            <div className="mpesa-panel glass-base">
              <div className="mpesa-panel-icon"><Smartphone size={20} /></div>
              <div>
                <p className="eyebrow">Pay with M-Pesa</p>
                <p className="mpesa-panel-copy">A PayBill STK prompt will be sent to your phone. Enter your M-Pesa PIN to authorise the exact order total.</p>
              </div>
              <button type="submit" className="btn btn-primary checkout-submit" disabled={submitting || pending || items.length === 0}>
                {submitting ? <><LoaderCircle className="button-spinner" size={16} /> Sending prompt...</> : <>Pay with M-Pesa</>}
              </button>
              {error && <p className="checkout-error" role="alert">{error}</p>}
            </div>
          </form>

          <aside className="glass-panel checkout-summary">
            <div className="checkout-summary-head">
              <p className="eyebrow">Order summary</p>
              <h2>{totalItems} item{totalItems === 1 ? '' : 's'}</h2>
            </div>
            <div className="checkout-items">
              {items.map((item) => (
                <div key={item.id || item.productId} className="checkout-item">
                  {item.product.image ? <img src={item.product.image} alt={item.product.name} loading="lazy" /> : <div className="checkout-item-image-fallback">{item.product.name.charAt(0)}</div>}
                  <div>
                    <strong>{item.product.name}</strong>
                    <span>{item.quantity} × {formatCurrency(item.price || item.product.price)} / {item.product.unit}</span>
                  </div>
                  <span>{formatCurrency((item.price || item.product.price) * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="checkout-totals">
              <div><span>Subtotal</span><strong>{formatCurrency(subtotal, currency)}</strong></div>
              <div><span>Delivery fee</span><strong>{deliveryFee ? formatCurrency(deliveryFee, currency) : 'Free'}</strong></div>
              <div className="checkout-grand-total"><span>Total</span><strong>{formatCurrency(total, currency)}</strong></div>
              <p className="checkout-trust-note"><CheckCircle2 size={14} /> Final total is calculated and verified by the Leema Tech backend.</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
