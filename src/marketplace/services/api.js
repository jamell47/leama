import { API_BASE } from '../../env.js'

const TOKEN_KEY = 'leema_token'
const USER_KEY = 'leema_user'
const SESSION_KEY = 'leema_session_id'

export class ApiError extends Error {
  constructor(message, status = 0, code = 'NETWORK_ERROR', details = null) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.code = code
    this.details = details
  }
}

function getAuthToken() {
  if (typeof window === 'undefined') return null
  return window.localStorage.getItem(TOKEN_KEY)
}

export function getStoredUser() {
  if (typeof window === 'undefined') return null
  try {
    return JSON.parse(window.localStorage.getItem(USER_KEY) || 'null')
  } catch {
    return null
  }
}

export function setAuthSession(token, user = null) {
  if (typeof window === 'undefined') return
  if (token) window.localStorage.setItem(TOKEN_KEY, token)
  else window.localStorage.removeItem(TOKEN_KEY)
  if (user) window.localStorage.setItem(USER_KEY, JSON.stringify(user))
  else window.localStorage.removeItem(USER_KEY)
}

export function clearAuthSession() {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(TOKEN_KEY)
  window.localStorage.removeItem(USER_KEY)
}

function getSessionId() {
  if (typeof window === 'undefined') return null
  let sessionId = window.localStorage.getItem(SESSION_KEY)
  if (!sessionId) {
    sessionId = `guest_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`
    window.localStorage.setItem(SESSION_KEY, sessionId)
  }
  return sessionId
}

export async function apiFetch(endpoint, options = {}) {
  const headers = new Headers(options.headers || {})
  const token = getAuthToken()
  const sessionId = getSessionId()
  if (token) headers.set('Authorization', `Bearer ${token}`)
  if (sessionId) headers.set('x-session-id', sessionId)
  if (!(options.body instanceof FormData) && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  let response
  try {
    response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers,
    })
  } catch (error) {
    throw new ApiError('Unable to reach the Leema Tech Solutions API. Please check your connection and try again.', 0, 'NETWORK_ERROR')
  }

  let payload = null
  const text = await response.text()
  if (text) {
    try {
      payload = JSON.parse(text)
    } catch {
      payload = { message: text }
    }
  }

  if (!response.ok) {
    const message = payload?.message || payload?.error || 'The request could not be completed.'
    throw new ApiError(message, response.status, payload?.code || 'REQUEST_FAILED', payload?.errors || payload?.data)
  }
  return payload
}

export const authService = {
  login(credentials) {
    return apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }).then((response) => {
      const data = response.data || response
      setAuthSession(data.token, data.user)
      return data
    })
  },
  register(payload) {
    return apiFetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    }).then((response) => {
      const data = response.data || response
      setAuthSession(data.token, data.user)
      return data
    })
  },
  logout() {
    clearAuthSession()
  },
  profile() {
    return apiFetch('/auth/profile').then((response) => response.data?.user || response.data || response)
  },
}

export const productService = {
  fetchProducts(filters = {}) {
    const params = new URLSearchParams()
    if (filters.category && filters.category !== 'all') params.set('category', filters.category)
    if (filters.categoryId && filters.categoryId !== 'all') params.set('category', filters.categoryId)
    if (filters.query) params.set('search', filters.query)
    if (filters.available !== undefined) params.set('available', String(filters.available))
    if (filters.page) params.set('page', String(filters.page))
    if (filters.limit) params.set('limit', String(filters.limit))
    return apiFetch(`/products${params.toString() ? `?${params.toString()}` : ''}`).then((response) => response.data || response)
  },
  fetchProduct(id) {
    return apiFetch(`/products/${encodeURIComponent(id)}`).then((response) => response.data || response)
  },
  fetchCategories() {
    return apiFetch('/categories').then((response) => (response.data?.categories || response.data || []))
  },
  createProduct(payload) {
    return apiFetch('/products', { method: 'POST', body: payload }).then((response) => response.data || response)
  },
  updateProduct(id, payload) {
    return apiFetch(`/products/${encodeURIComponent(id)}`, { method: 'PUT', body: payload }).then((response) => response.data || response)
  },
  deleteProduct(id) {
    return apiFetch(`/products/${encodeURIComponent(id)}`, { method: 'DELETE' }).then((response) => response.data || response)
  },
  stats() {
    return apiFetch('/products/stats').then((response) => response.data || response)
  },
}

export const categoryService = {
  list() {
    return productService.fetchCategories()
  },
  create(payload) {
    return apiFetch('/categories', { method: 'POST', body: JSON.stringify(payload) }).then((response) => response.data || response)
  },
  update(id, payload) {
    return apiFetch(`/categories/${encodeURIComponent(id)}`, { method: 'PUT', body: JSON.stringify(payload) }).then((response) => response.data || response)
  },
  delete(id) {
    return apiFetch(`/categories/${encodeURIComponent(id)}`, { method: 'DELETE' }).then((response) => response.data || response)
  },
}

export const cartService = {
  getCart() {
    return apiFetch('/cart').then((response) => response.data || response)
  },
  addToCart(productId, quantity = 1) {
    return apiFetch('/cart/items', {
      method: 'POST',
      body: JSON.stringify({ productId, quantity }),
    }).then((response) => response.data || response)
  },
  updateCartItem(itemId, quantity) {
    return apiFetch(`/cart/items/${encodeURIComponent(itemId)}`, {
      method: 'PUT',
      body: JSON.stringify({ quantity }),
    }).then((response) => response.data || response)
  },
  removeCartItem(itemId) {
    return apiFetch(`/cart/items/${encodeURIComponent(itemId)}`, { method: 'DELETE' }).then((response) => response.data || response)
  },
  clearCart() {
    return apiFetch('/cart', { method: 'DELETE' }).then((response) => response.data || response)
  },
}

export const orderService = {
  createOrder(payload) {
    return apiFetch('/orders/checkout', {
      method: 'POST',
      body: JSON.stringify(payload),
    }).then((response) => response.data || response)
  },
  getOrder(id) {
    return apiFetch(`/orders/${encodeURIComponent(id)}`).then((response) => response.data || response)
  },
  getOrderByNumber(orderNumber) {
    return apiFetch(`/orders/number/${encodeURIComponent(orderNumber)}`).then((response) => response.data || response)
  },
  getOrders(page = 1, limit = 20) {
    return apiFetch(`/orders?page=${page}&limit=${limit}`).then((response) => response.data || response)
  },
  updateOrderStatus(id, status) {
    return apiFetch(`/orders/${encodeURIComponent(id)}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    }).then((response) => response.data || response)
  },
}

export const paymentService = {
  initiatePayment(orderId) {
    return apiFetch('/payments/mpesa/stk-push', {
      method: 'POST',
      body: JSON.stringify({ orderId }),
    }).then((response) => response.data || response)
  },
  getPayment(id) {
    return apiFetch(`/payments/${encodeURIComponent(id)}`).then((response) => response.data || response)
  },
  getPaymentByOrderId(orderId) {
    return apiFetch(`/payments/order/${encodeURIComponent(orderId)}`).then((response) => response.data || response)
  },
}

export const contactService = {
  submit(payload) {
    return apiFetch('/contact/submit', {
      method: 'POST',
      body: JSON.stringify(payload),
    }).then((response) => response.data || response)
  },
}

export const marketplaceApi = {
  auth: authService,
  products: productService,
  categories: categoryService,
  cart: cartService,
  orders: orderService,
  payments: paymentService,
  contact: contactService,
}
