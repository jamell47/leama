const MPESA_PHONE_REGEX = /^(?:\+254|0?7|0?1)\d{8}$/

export function normaliseMpesaPhone(value) {
  const digits = String(value || '').replace(/\D/g, '')
  if (digits.startsWith('254')) return `0${digits.slice(3)}`
  if (digits.startsWith('7') && digits.length === 9) return `0${digits}`
  if (digits.startsWith('1') && digits.length === 9) return `0${digits}`
  return digits
}

export function validateMpesaPhone(value) {
  const normalised = normaliseMpesaPhone(value)
  const valid = MPESA_PHONE_REGEX.test(normalised)
  return {
    valid,
    normalised: valid ? normalised : '',
    darajaPhone: valid ? `254${normalised.slice(1)}` : '',
    error: valid ? null : 'Enter a valid M-Pesa number, e.g. 07XX XXX XXX or 01XX XXX XXX',
  }
}

export const PAYMENT_STATUS = Object.freeze({
  PENDING: 'PENDING',
  PAYMENT_PENDING: 'PAYMENT_PENDING',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
  CANCELLED: 'CANCELLED',
})

export default {
  normaliseMpesaPhone,
  validateMpesaPhone,
  PAYMENT_STATUS,
}
