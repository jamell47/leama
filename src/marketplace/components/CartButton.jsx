import { ShoppingCart } from 'lucide-react'
import { formatCurrency } from '../utils'
import { useCart } from '../context/CartContext'

/** Floating glass action button that opens the cart drawer. */
export default function CartButton() {
  const { items, totalItems, total, currency, openCart } = useCart()

  return (
    <button
      type="button"
      className="cart-fab glass-base"
      style={{ '--glass-blur': '20px' }}
      onClick={openCart}
      aria-label={`Open cart — ${totalItems} items, ${formatCurrency(total, currency)}`}
    >
      <span className="cart-fab-icon">
        <ShoppingCart size={18} />
      </span>
      <span className="cart-fab-text">
        <span className="cart-fab-count">{totalItems}</span>
        <span className="cart-fab-total">{formatCurrency(total, currency)}</span>
      </span>
    </button>
  )
}
