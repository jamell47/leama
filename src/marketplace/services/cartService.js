import { cartService as api } from './api.js'

export const loadCart = () => api.getCart()
export const saveCart = () => api.getCart()
export const clearCartStorage = () => api.clearCart()

export const cartApi = api
