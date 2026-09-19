/**
 * Marketplace formatting / utility helpers.
 */
export function cn(...inputs) {
  return inputs.filter(Boolean).join(' ')
}

const KSH = new Intl.NumberFormat('en-KE', {
  style: 'currency',
  currency: 'KES',
  maximumFractionDigits: 0,
})

/** Render a monetary value as `KSh 1,850`. */
export function formatCurrency(amount, currency = 'KSh') {
  if (currency === 'KSh') {
    return `KSh ${KSH.format(amount).replace('KES', '').trim()}`
  }
  const f = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  })
  return f.format(amount)
}

/** Human-readable stock status with premium tone. */
export function stockStatus(product) {
  if (!product.delivery) return { label: 'Pickup only', ok: true }
  if (product.stock <= 0) return { label: 'Out of stock', ok: false }
  if (product.stock < 20) return { label: `Only ${product.stock} left`, ok: true }
  if (product.stock < 100) return { label: 'In stock', ok: true }
  return { label: 'In stock', ok: true }
}

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

/** Star rating → array of fill ratios for rendering. */
export function ratingStars(rating = 0) {
  const full = Math.floor(rating)
  const fraction = Number((rating - full).toFixed(1))
  const half = fraction > 0
  const empty = 5 - full - (half ? 1 : 0)
  return { full, half, empty }
}

export function slugify(text) {
  return String(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/** Keypad-friendly M-Pesa phone normalisation. */
export function normalisePhone(value) {
  const digits = String(value || '').replace(/\D/g, '')
  if (digits.startsWith('254')) return digits.slice(3)
  if (digits.startsWith('0')) return digits.slice(1)
  return digits
}
