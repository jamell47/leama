/**
 * Wishlist / favourites persistence.
 * Stored as a Set of product ids in localStorage. Tied to the product id so it
 * survives refreshes and works for any product source.
 */
const FAVES_KEY = 'leema_marketplace_faves'

export function loadFavorites() {
  try {
    return new Set(JSON.parse(localStorage.getItem(FAVES_KEY) || '[]'))
  } catch {
    return new Set()
  }
}

export function saveFavorites(ids) {
  try {
    localStorage.setItem(FAVES_KEY, JSON.stringify([...ids]))
  } catch {}
}

export function isFavorited(ids, productId) {
  return ids.has(productId)
}

export function toggleFavorite(productId) {
  const ids = loadFavorites()
  if (ids.has(productId)) ids.delete(productId)
  else ids.add(productId)
  saveFavorites(ids)
  return ids
}
