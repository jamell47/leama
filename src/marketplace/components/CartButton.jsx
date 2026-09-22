import { LoaderCircle, ShoppingCart } from 'lucide-react'
import { formatCurrency } from '../utils'
import { useCart } from '../context/CartContext'

export default function CartButton() {
  const { items, totalItems, total, currency, openCart, loading } = useCart()
  return (
    <button type="button" className="cart-fab glass-base" style={{ '--glass-blur': '20px' }} onClick={openCart} aria-label={`Open cart — ${totalItems} items, ${formatCurrency(total, currency)}`} disabled={loading}>
      <span className="cart-fab-icon">{loading ? <LoaderCircle className="button-spinner" size={18} /> : <ShoppingCart size={18} />}</span>
      <span className="cart-fab-text"><span className="cart-fab-count">{totalItems}</span><span className="cart-fab-total">{formatCurrency(total, currency)}</span></span>
    </button>
  )
}
