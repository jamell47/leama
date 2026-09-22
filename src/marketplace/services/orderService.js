import { orderService as api } from './api.js'

export const ORDER_STATUS = {
  PENDING: 'PENDING',
  PAYMENT_PENDING: 'PAYMENT_PENDING',
  PAID: 'PAID',
  PROCESSING: 'PROCESSING',
  READY: 'READY',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
}

export const STATUS_LABEL = {
  [ORDER_STATUS.PENDING]: 'Pending',
  [ORDER_STATUS.PAYMENT_PENDING]: 'Waiting for M-Pesa',
  [ORDER_STATUS.PAID]: 'Payment Successful',
  [ORDER_STATUS.PROCESSING]: 'Processing',
  [ORDER_STATUS.READY]: 'Ready',
  [ORDER_STATUS.COMPLETED]: 'Completed',
  [ORDER_STATUS.CANCELLED]: 'Cancelled',
}

const ORDER_STEP_ORDER = [
  { key: 'received', label: 'Order Received', status: ORDER_STATUS.PENDING },
  { key: 'payment', label: 'Payment', status: ORDER_STATUS.PAID },
  { key: 'processing', label: 'Processing', status: ORDER_STATUS.PROCESSING },
  { key: 'ready', label: 'Ready', status: ORDER_STATUS.READY },
  { key: 'completed', label: 'Completed', status: ORDER_STATUS.COMPLETED },
]

export function normalizeOrder(order) {
  if (!order) return null
  return {
    ...order,
    id: order.id || order.orderId,
    orderNumber: order.orderNumber || order.number || order.id,
    customerName: order.customerName || order.customer?.name || '',
    phone: order.phone || order.customer?.phone || '',
    email: order.email || order.customer?.email || '',
    totalAmount: Number(order.totalAmount ?? order.total ?? 0),
    deliveryFee: Number(order.deliveryFee ?? 0),
    status: order.status || ORDER_STATUS.PENDING,
    items: Array.isArray(order.items) ? order.items : [],
    payment: order.payment || null,
  }
}

export function orderSteps(order) {
  const normalized = normalizeOrder(order)
  const status = normalized?.status
  const reachedIndex = ORDER_STEP_ORDER.findIndex((step) => step.status === status)
  const reached = Math.max(0, reachedIndex)
  return ORDER_STEP_ORDER.map((step, index) => ({
    ...step,
    state: index < reached ? 'done' : index === reached ? 'active' : 'pending',
  }))
}

export function orderProgress(order) {
  return orderSteps(order)
}

export function createOrder(payload) {
  return api.createOrder(payload).then((data) => ({
    order: normalizeOrder(data.order),
    payment: data.payment || data.paymentData || null,
    message: data.message || '',
  }))
}

export function getOrder(id) {
  return api.getOrder(id).then(normalizeOrder)
}

export function getOrderByNumber(orderNumber) {
  return api.getOrderByNumber(orderNumber).then(normalizeOrder)
}

export function getOrders(page = 1, limit = 20) {
  return api.getOrders(page, limit).then((data) => ({
    orders: (data.orders || []).map(normalizeOrder),
    pagination: data.pagination || { page, limit, total: 0, totalPages: 0 },
  }))
}

export function updateOrderStatus(id, status) {
  return api.updateOrderStatus(id, status).then((data) => normalizeOrder(data.order || data) || data)
}

export default {
  ORDER_STATUS,
  STATUS_LABEL,
  normalizeOrder,
  orderSteps,
  orderProgress,
  createOrder,
  getOrder,
  getOrderByNumber,
  getOrders,
  updateOrderStatus,
}
