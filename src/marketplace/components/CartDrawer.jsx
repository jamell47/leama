import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { formatCurrency } from '../utils'
import { useCart } from '../context/CartContext'
import CartItem from './CartItem'

const EASE = [0.22, 1, 0.36, 1]

/** Glass cart drawer — slides in from the right, persists across pages. */
export default function CartDrawer({ onClose }) {
  const navigate = useNavigate()
  const { items, updateQuantity, removeItem, subtotal, deliveryFee, total, currency, closeCart } = useCart()

  const proceed = () => {
    closeCart()
    navigate('/marketplace/checkout')
  }

  return (
    <>
      <motion.div
        className="cart-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.aside
        className="cart-drawer glass-strong"
        style={{ '--glass-blur': '26px' }}
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.4, ease: EASE }}
      >
        <div className="cart-drawer-head">
          <h2>Your Cart</h2>
          <button
            type="button"
            className="cart-drawer-close glass-micro"
            onClick={onClose}
            aria-label="Close cart"
          >
            <X size={16} />
          </button>
        </div>

        <div className="cart-drawer-body">
          {items.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon" aria-hidden="true" />
              <p>Your cart is empty. Browse produce to get started.</p>
            </div>
          ) : (
            <ul className="cart-list">
              {items.map((item) => (
                <li key={item.product.id}>
                  <CartItem
                    item={item}
                    onChange={updateQuantity}
                    onRemove={removeItem}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <>
            <div className="cart-drawer-foot">
              <div className="cart-totals glass-base" style={{ '--glass-blur': '14px' }}>
                <div className="cart-total-row">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal, currency)}</span>
                </div>
                <div className="cart-total-row">
                  <span>Delivery fee</span>
                  <span>{deliveryFee ? formatCurrency(deliveryFee, currency) : 'Free'}</span>
                </div>
                <div className="cart-total-row cart-total-grand">
                  <span>Total</span>
                  <span>{formatCurrency(total, currency)}</span>
                </div>
              </div>
              <motion.button
                className="btn btn-primary cart-checkout"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={proceed}
              >
                Proceed to Checkout
              </motion.button>
            </div>
          </>
        )}
      </motion.aside>
    </>
  )
}
