import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { formatCurrency } from '../utils'
import QuantitySelector from './QuantitySelector'

export default function CartItem({ item, onChange, onRemove, busy = false }) {
  const [localError, setLocalError] = useState('')
  const { product, quantity } = item
  const change = async (next) => {
    setLocalError('')
    try {
      await onChange?.(product.id, next)
    } catch (requestError) {
      setLocalError(requestError?.message || 'Unable to update quantity.')
    }
  }
  const remove = async () => {
    setLocalError('')
    try {
      await onRemove?.(product.id)
    } catch (requestError) {
      setLocalError(requestError?.message || 'Unable to remove this item.')
    }
  }
  return (
    <div className="cart-item glass-base" style={{ '--glass-blur': '16px' }}>
      {product.image ? <img src={product.image} alt={product.name} className="cart-item-img" loading="lazy" decoding="async" draggable="false" /> : <div className="cart-item-image-fallback">{product.name.charAt(0)}</div>}
      <div className="cart-item-body">
        <div className="cart-item-name">{product.name}</div>
        <div className="cart-item-meta">
          <span className="cart-item-unit-price">{formatCurrency(product.price)} / {product.unit}</span>
          <span className="cart-item-qty">
            <QuantitySelector value={quantity} max={product.stock || 20} onChange={change} />
          </span>
        </div>
        <div className="cart-item-subtotal">{formatCurrency(product.price * quantity)}</div>
        {localError && <p className="cart-item-error" role="alert">{localError}</p>}
      </div>
      <button type="button" className="cart-item-remove glass-micro" onClick={remove} disabled={busy} aria-label={`Remove ${product.name}`}><Trash2 size={14} /></button>
    </div>
  )
}
