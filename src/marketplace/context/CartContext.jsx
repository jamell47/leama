/**
 * Cart context + provider.
 *
 * Wraps the entire app (see main.jsx) so the cart — and its glass drawer — is
 * available from any page. State is persisted to localStorage so refreshes
 * never lose what the farmer (and buyer) added.
 */
import { createContext, useContext, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { loadCart, saveCart } from '../services/cartService'
import { CURRENCY } from '../data/products'
import CartDrawer from '../components/CartDrawer'

const CartContext = createContext(null)

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart used outside CartProvider')
  return ctx
}

export default function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart)
  const [open, setOpen] = useState(false)

  // Persist whenever the line items change.
  useEffect(() => {
    saveCart(items)
  }, [items])

  const addItem = (product, quantity = 1) => {
    setItems((current) => {
      const existing = current.find((i) => i.product.id === product.id)
      if (existing) {
        return current.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
        )
      }
      return [...current, { product, quantity }]
    })
  }

  const removeItem = (productId) => {
    setItems((current) => current.filter((i) => i.product.id !== productId))
  }

  const updateQuantity = (productId, quantity) => {
    const qty = Math.max(0, Math.floor(quantity))
    if (!qty) return removeItem(productId)
    setItems((current) =>
      current.map((i) => (i.product.id === productId ? { ...i, quantity: qty } : i))
    )
  }

  const clearCart = () => setItems([])
  const openCart = () => setOpen(true)
  const closeCart = () => setOpen(false)
  const toggleCart = () => setOpen((v) => !v)

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  )
  // Placeholder delivery model: free above an order threshold, flat otherwise.
  const deliveryFee = subtotal > 0 && subtotal < 2000 ? 150 : 0
  const total = subtotal + deliveryFee

  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    subtotal,
    deliveryFee,
    total,
    currency: CURRENCY,
    open,
    openCart,
    closeCart,
    toggleCart,
  }

  return (
    <CartContext.Provider value={value}>
      {children}
      {open &&
        createPortal(
          <CartDrawer onClose={closeCart} />,
          typeof document !== 'undefined' ? document.body : null
        )}
    </CartContext.Provider>
  )
}
