import { apiFetch, getStoredUser, clearAuthSession } from '../../marketplace/services/api.js'
import { authService } from '../../marketplace/services/api.js'
import { productService, categoryService, orderService } from '../../marketplace/services/api.js'

const unwrap = (response) => response?.data ?? response

export async function fetchProductStats() {
  const response = await apiFetch('/products/stats')
  return unwrap(response)
}

export async function fetchUsers() {
  const response = await apiFetch('/auth/users')
  return unwrap(response)?.users ?? unwrap(response) ?? []
}

export async function deleteUser(userId) {
  return apiFetch(`/auth/users/${encodeURIComponent(userId)}`, { method: 'DELETE' })
}

export async function fetchAdminProducts() {
  const response = await apiFetch('/products?limit=1000')
  return unwrap(response)?.products ?? []
}

export async function createAdminProduct(payload) {
  return productService.createProduct(payload)
}

export async function updateAdminProduct(id, payload) {
  return productService.updateProduct(id, payload)
}

export async function deleteAdminProduct(id) {
  return productService.deleteProduct(id)
}

export async function fetchAdminCategories() {
  return categoryService.list()
}

export async function createAdminCategory(payload) {
  return categoryService.create(payload)
}

export async function updateAdminCategory(id, payload) {
  return categoryService.update(id, payload)
}

export async function deleteAdminCategory(id) {
  return categoryService.delete(id)
}

export async function fetchAdminOrders() {
  return orderService.getOrders(1, 1000)
}

export async function fetchAdminOrder(id) {
  return orderService.getOrder(id)
}

export async function updateAdminOrderStatus(id, status) {
  return orderService.updateOrderStatus(id, status)
}

export async function fetchAdminPayment(orderId) {
  const response = await apiFetch(`/payments/order/${encodeURIComponent(orderId)}`)
  return unwrap(response)?.data ?? unwrap(response)
}

export async function fetchDashboardStats() {
  const [products, users, ordersResponse] = await Promise.all([
    fetchAdminProducts(),
    fetchUsers().catch(() => []),
    apiFetch('/orders?page=1&limit=1000').then((response) => unwrap(response)).catch(() => null),
  ])
  const productStats = await fetchProductStats().catch(() => null)
  const orders = ordersResponse?.orders ?? []
  const payments = orders.map((order) => order.paymentStatus || order.payment?.status).filter(Boolean)

  return {
    products: {
      total: productStats?.totalProducts ?? products.length,
      available: productStats?.availableProducts ?? products.filter((product) => product.isAvailable !== false).length,
      outOfStock: productStats?.outOfStock ?? products.filter((product) => Number(product.stock || 0) <= 0).length,
      featured: productStats?.featuredProducts ?? products.filter((product) => product.featured === true).length,
    },
    orders: {
      total: ordersResponse?.pagination?.total ?? orders.length,
      pending: orders.filter((order) => order.status === 'PENDING').length,
      processing: orders.filter((order) => ['PAID', 'PROCESSING', 'READY', 'COMPLETED'].includes(order.status)).length,
      cancelled: orders.filter((order) => order.status === 'CANCELLED').length,
      revenue: orders.reduce((sum, order) => sum + Number(order.totalAmount ?? order.total ?? 0), 0),
    },
    payments: {
      total: payments.length,
      pending: payments.filter((status) => ['PENDING', 'INITIATED', 'PAYMENT_PENDING'].includes(status)).length,
      paid: payments.filter((status) => ['SUCCESS', 'PAID'].includes(status)).length,
      failed: payments.filter((status) => status === 'FAILED').length,
    },
    users: {
      total: Array.isArray(users) ? users.length : 0,
      admins: Array.isArray(users) ? users.filter((user) => user.role === 'ADMIN').length : 0,
      customers: Array.isArray(users) ? users.filter((user) => user.role !== 'ADMIN').length : 0,
    },
    recentOrders: orders.slice(0, 5),
  }
}

export const adminService = {
  fetchProductStats,
  fetchUsers,
  deleteUser,
  fetchAdminProducts,
  createAdminProduct,
  updateAdminProduct,
  deleteAdminProduct,
  fetchAdminCategories,
  createAdminCategory,
  updateAdminCategory,
  deleteAdminCategory,
  fetchAdminOrders,
  fetchAdminOrder,
  updateAdminOrderStatus,
  fetchAdminPayment,
  fetchDashboardStats,
}

export const authAdminService = authService

export function getCurrentUser() {
  return getStoredUser()
}

export function logout() {
  clearAuthSession()
}

export default {
  adminService,
  authAdminService,
  getCurrentUser,
  logout,
}
