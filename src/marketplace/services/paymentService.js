/**
 * M-Pesa / Daraja payment service.
 *
 * This is a clean, backend-ready abstraction. The real Daraja STK Push
 * request is made server-side (never from the browser with a secret) — this
 * module prepares and validates the payload so the moment the backend is live,
 * one line flips on:
 *
 *     return fetch(DARAJA_STK_URL, { method: 'POST', body: JSON.stringify(payload) })
 *
 * Until then the service resolves with a clearly "pending" result and NEVER
 * fabricates a successful payment. Orders only ever move to "paid" from a
 * verified Daraja callback / webhook.
 */

const MPESA_PHONE_REGEX = /^(?:\+254|0?7|0?1)\d{8}$/

/** Normalise any Kenyan mobile input to the 07xx.. form. */
export function normaliseMpesaPhone(value) {
  const digits = String(value || '').replace(/\D/g, '')
  if (digits.startsWith('254')) return `0${digits.slice(3)}`
  if (digits.startsWith('7') && digits.length === 9) return `0${digits}`
  return digits
}

export function validateMpesaPhone(value) {
  const normalised = normaliseMpesaPhone(value)
  const valid = MPESA_PHONE_REGEX.test(normalised)
  return {
    valid,
    normalised: valid ? normalised : '',
    error: valid ? null : 'Enter a valid M-Pesa number, e.g. 07XX XXX XXX',
  }
}

/** Build the exact STK Push body Daraja expects. */
export function buildStkPayload(order, phoneNumber) {
  const { valid, normalised } = validateMpesaPhone(phoneNumber)
  if (!valid) throw new Error('Invalid M-Pesa phone number')

  return {
    // Business (Paybill/Till) credentials — filled by the backend.
    BusinessShortCode: process.env.DARAJA_BUSINESS_SHORTCODE || '__BACKEND__',
    // The backend signs this; never expose the passkey in the browser.
    Password: '__BACKEND_GENERATED__',
    Timestamp: new Date().toISOString().replace(/[-:T.]/g, '').slice(0, 12),
    // STK callback URL — configured server-side.
    CallbackURL: process.env.DARAJA_CALLBACK_URL || 'https://leema.tech/api/mpesa/callback',
    // Payer
    PartyA: normalised,
    // Amount in the smallest currency unit (KSh cents) — here KSh.
    Amount: order.amount,
    // A readable account reference so the farmer recognises the payer.
    AccountReference: order.id,
    // Transaction type for a CustomerPayBill (STK Push).
    TransactionType: 'CustomerPayBill',
    Remark: `Leema marketplace order ${order.id}`,
  }
}

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  INITIATED: 'initiated',
  PAID: 'paid',
  FAILED: 'failed',
}

/**
 * Initiate an STK Push for an order.
 *
 * Returns a PaymentResult:
 *   { status, orderId, payload, reference, message }
 *
 * Until the backend Daraja call is wired this resolves with
 * `status: 'pending'` + a developer-facing note. It does NOT resolve as paid.
 */
export async function initiateSTKPush(order, phoneNumber) {
  const { valid, error, normalised } = validateMpesaPhone(phoneNumber)
  if (!valid) {
    return { status: PAYMENT_STATUS.FAILED, error, orderId: order.id, message: error }
  }

  const payload = buildStkPayload(order, normalised)

  // --- Plug-in point: real Daraja STK Push goes here ---
  // const res = await fetch(DARAJA_STK_URL, { method: 'POST', body: JSON.stringify(payload) })
  // if (!res.ok) throw new Error('STK push failed')
  // return { status: PAYMENT_STATUS.INITIATED, orderId: order.id, reference: ..., payload }
  // ---

  // No backend yet: report an honest, non-success state.
  return {
    status: PAYMENT_STATUS.PENDING,
    orderId: order.id,
    payload,
    reference: order.id,
    message:
      'M-Pesa STK push is not yet configured. Your order has been saved and will be moved to "Paid" once the payment gateway is connected.',
  }
}

export default {
  validateMpesaPhone,
  buildStkPayload,
  initiateSTKPush,
  PAYMENT_STATUS,
}
