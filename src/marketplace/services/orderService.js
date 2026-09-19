/**
 * Order service.
 *
 * Orders carry an explicit lifecycle so the UI can render a real progress
 * tracker. Until a verified Daraja callback lands, orders rest in
 * `pending_payment`; a fake "paid" is never inferred client-side.
 */
const ORDERS_KEY = 'leema_marketplace_orders'

export const ORDER_STATUS = {
  PENDING_PAYMENT: 'pending_payment', // just placed, awaiting payment
  PAYMENT_INITIATED: 'payment_initiated',
  PAID: 'paid',
  PROCESSING: 'processing',
  PREPARING: 'preparing',
  OUT_FOR_DELIVERY: 'out_for_delivery',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
}

const ORDER_STEP_ORDER = [
  { key: 'received', label: 'Order Received', status: ORDER_STATUS.PENDING_PAYMENT },
  { key: 'payment', label: 'Payment', status: ORDER_STATUS.PAID },
  { key: 'processing', label: 'Processing', status: ORDER_STATUS.PROCESSING },
  { key: 'preparing', label: 'Preparing', status: ORDER_STATUS.PREPARING },
  { key: 'delivery', label: 'Out for Delivery', status: ORDER_STATUS.OUT_FOR_DELIVERY },
  { key: 'delivered', label: 'Delivered', status: ORDER_STATUS.DELIVERED },
]

export function orderSteps() {
  return ORDER_STEP_ORDER
}

/** Step completion: done / active / pending, driven by status progression. */
export function orderProgress(order) {
  const status = order.status
  const reachedIndex = ORDER_STEP_ORDER.findIndex((s) => s.status === status)
  // pending_payment => 0 reached; paid => 1 reached; etc.
  const reached = Math.max(0, reachedIndex)
  return ORDER_STEP_ORDER.map((step, index) => {
    if (index < reached) return { ...step, state: 'done' }
    if (index === reached) return { ...step, state: 'active' }
    return { ...step, state: 'pending' }
  })
}

export const STATUS_LABEL = {
  [ORDER_STATUS.PENDING_PAYMENT]: 'Pending Payment',
  [ORDER_STATUS.PAYMENT_INITIATED]: 'Payment Initiated',
  [ORDER_STATUS.PAID]: 'Paid',
  [ORDER_STATUS.PROCESSING]: 'Processing',
  [ORDER_STATUS.PREPARING]: 'Preparing',
  [ORDER_STATUS.OUT_FOR_DELIVERY]: 'Out for Delivery',
  [ORDER_STATUS.DELIVERED]: 'Delivered',
  [ORDER_STATUS.CANCELLED]: 'Cancelled',
}

function generateId() {
  return `ORD-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`
}

export function buildOrder({ customer, items, subtotal, deliveryFee, currency, payment }) {
  const amount = subtotal + deliveryFee
  return {
    id: generateId(),
    number: `LM-${Date.now().toString().slice(-6)}`,
    customer,
    items: items.map((item) => ({
      productId: item.product.id,
      name: item.product.name,
      image: item.product.image,
      unitPrice: item.product.price,
      quantity: item.quantity,
      currency: item.product.currency,
    })),
    subtotal,
    deliveryFee,
    total: amount,
    currency,
    payment: payment || { method: 'mpesa', status: ORDER_STATUS.PENDING_PAYMENT },
    status: ORDER_STATUS.PENDING_PAYMENT,
    createdAt: new Date().toISOString(),
    statusHistory: [{ status: ORDER_STATUS.PENDING_PAYMENT, at: new Date().toISOString(), note: 'Order received pending payment.' }],
  }
}

function readAll() {
  try {
    return JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]')
  } catch {
    return []
  }
}

function writeAll(orders) {
  try {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders))
  } catch {}
}

export function saveOrder(order) {
  const orders = readAll()
  orders.unshift(order)
  writeAll(orders)
  return order
}

export function getOrder(id) {
  return readAll().find((o) => o.id === id) || null
}

export function getOrders() {
  return readAll()
}

export function updateOrderStatus(id, status, note = '') {
  const orders = readAll()
  const order = orders.find((o) => o.id === id)
  if (!order) return null
  order.status = status
  order.statusHistory.push({ status, at: new Date().toISOString(), note })
  writeAll(orders)
  return order
}

export default {
  ORDER_STATUS,
  buildOrder,
  saveOrder,
  getOrder,
  getOrders,
  updateOrderStatus,
  orderSteps,
  orderProgress,
  STATUS_LABEL,
}
