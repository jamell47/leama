import { Trash2 } from 'lucide-react'
import { formatCurrency } from '../utils'
import QuantitySelector from './QuantitySelector'

/** One line in the cart drawer. */
export default function CartItem({ item, onChange, onRemove }) {
  const { product, quantity } = item
  return (
    <div className="cart-item glass-base" style={{ '--glass-blur': '16px' }}>
      <img
        src={product.image}
        alt={product.name}
        className="cart-item-img"
        loading="lazy"
        decoding="async"
        draggable="false"
      />
      <div className="cart-item-body">
        <div className="cart-item-name">{product.name}</div>
        <div className="cart-item-meta">
          <span className="cart-item-unit-price">{formatCurrency(product.price)} / {product.unit}</span>
          <span className="cart-item-qty">
            <QuantitySelector
              value={quantity}
              max={product.stock || 20}
              onChange={(next) => onChange?.(product.id, next)}
            />
          </span>
        </div>
        <div className="cart-item-subtotal">
          {formatCurrency(product.price * quantity)}
        </div>
      </div>
      <button
        type="button"
        className="cart-item-remove glass-micro"
        onClick={() => onRemove?.(product.id)}
        aria-label={`Remove ${product.name}`}
      >
        <Trash2 size={14} />
      </button>
    </div>
  )
}
