export function cn(...inputs) {
  return inputs.filter(Boolean).join(' ')
}

const KSH = new Intl.NumberFormat('en-KE', {
  style: 'currency',
  currency: 'KES',
  maximumFractionDigits: 0,
})

export function formatCurrency(amount, currency = 'KSh') {
  if (currency === 'KSh') {
    return `KSh ${KSH.format(amount).replace('KES', '').trim()}`
  }

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  })

  return formatter.format(amount)
}