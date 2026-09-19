/**
 * Cart persistence helpers.
 * Keeps the cart in sync with localStorage so it survives refreshes and
 * works even if the React tree remounts. Keyed under the Leema namespace.
 */
const CART_KEY = 'leema_marketplace_cart'

export function loadCart() {
  try {
    const raw = localStorage.getItem(CART_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveCart(items) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(items))
  } catch {
    // storage full / disabled — keep the in-memory cart working
  }
}

export function clearCartStorage() {
  localStorage.removeItem(CART_KEY)
}
