import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { cartService } from '../services/api.js'
import CartDrawer from '../components/CartDrawer'

const CartContext = createContext(null)

function normalizeCart(cart) {
  const source = cart || {}
  const items = (source.items || []).map((item) => ({
    id: item.id,
    productId: item.productId,
    quantity: Number(item.quantity) || 0,
    price: Number(item.price ?? item.product?.price ?? 0),
    product: {
      ...(item.product || {}),
      id: item.product?.id || item.productId,
      name: item.product?.name || 'Product',
      image: item.product?.image || item.product?.imageUrl || '',
      unit: item.product?.unit || 'piece',
      stock: Number(item.product?.stock ?? 0),
      isAvailable: item.product?.isAvailable !== false,
    },
  }))
  const subtotal = Number(source.subtotal ?? items.reduce((sum, item) => sum + item.price * item.quantity, 0))
  const deliveryFee = Number(source.deliveryFee ?? (subtotal > 0 && subtotal < 2000 ? 150 : 0))
  return {
    cartId: source.cartId || null,
    sessionId: source.sessionId || null,
    items,
    subtotal,
    deliveryFee,
    total: Number(source.total ?? subtotal + deliveryFee),
    itemCount: Number(source.itemCount ?? items.reduce((sum, item) => sum + item.quantity, 0)),
  }
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used inside CartProvider')
  return context
}

export default function CartProvider({ children }) {
  const [cart, setCart] = useState(() => normalizeCart(null))
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')

  const refreshCart = async () => {
    try {
      const data = await cartService.getCart()
      setCart(normalizeCart(data))
      setError('')
      return data
    } catch (requestError) {
      setError(requestError?.message || 'Unable to load your cart.')
      throw requestError
    }
  }

  useEffect(() => {
    let active = true
    refreshCart()
      .catch(() => {})
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  const runCartAction = async (action) => {
    setPending(true)
    setError('')
    try {
      const result = await action()
      await refreshCart()
      return result
    } catch (requestError) {
      setError(requestError?.message || 'Cart update failed. Please try again.')
      throw requestError
    } finally {
      setPending(false)
    }
  }

  const addItem = (product, quantity = 1) => runCartAction(() => cartService.addToCart(product?.id || product?.productId, quantity))
  const updateQuantity = (productId, quantity) => runCartAction(async () => {
    const item = cart.items.find((entry) => entry.productId === productId)
    if (!item) return null
    if (quantity <= 0) return cartService.removeCartItem(item.id)
    return cartService.updateCartItem(item.id, quantity)
  })
  const removeItem = (productId) => runCartAction(async () => {
    const item = cart.items.find((entry) => entry.productId === productId)
    if (!item) return null
    return cartService.removeCartItem(item.id)
  })
  const clearCart = () => runCartAction(() => cartService.clearCart())
  const openCart = () => setOpen(true)
  const closeCart = () => setOpen(false)
  const toggleCart = () => setOpen((current) => !current)
  const dismissError = () => setError('')

  const value = useMemo(() => ({
    ...cart,
    items: cart.items,
    currency: 'KSh',
    loading,
    pending,
    error,
    dismissError,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    refreshCart,
    open,
    openCart,
    closeCart,
    toggleCart,
  }), [cart, loading, pending, error, open])

  return (
    <CartContext.Provider value={value}>
      {children}
      {open && createPortal(
        <CartDrawer onClose={closeCart} />,
        typeof document === 'undefined' ? null : document.body,
      )}
    </CartContext.Provider>
  )
}
