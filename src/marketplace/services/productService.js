/**
 * Product data service.
 *
 * All accessors are async (return Promises) so they can be swapped 1:1 for a
 * real backend without touching the components. The sample data in
 * `data/products.js` simulates the network with a short, deterministic delay.
 */
import PRODUCTS, {
  featuredProducts,
  newProducts,
  popularProducts,
} from '../data/products'

const NETWORK_DELAY = 160

function simulate(data) {
  return new Promise((resolve) => setTimeout(() => resolve(data), NETWORK_DELAY))
}

/** Filter + search state shared between search bar, category rail and filters. */
export function applyFilters(products, filters = {}) {
  const {
    categoryId = 'all',
    query = '',
    minPrice,
    maxPrice,
    location,
    country,
    organic,
    delivery,
    minRating,
  } = filters

  return products.filter((product) => {
    if (categoryId !== 'all' && product.category !== categoryId) return false

    const q = query.trim().toLowerCase()
    if (q) {
      const hay = `${product.name} ${product.description} ${product.tags?.join(' ') || ''} ${product.category} ${product.subcategory}`
      if (!hay.toLowerCase().includes(q)) return false
    }

    if (minPrice != null && product.price < minPrice) return false
    if (maxPrice != null && product.price > maxPrice) return false
    if (location && !product.location.toLowerCase().includes(location.toLowerCase())) return false
    if (country && product.country !== country) return false
    if (organic != null && product.organic !== organic) return false
    if (delivery != null && product.delivery !== delivery) return false
    if (minRating != null && product.rating < minRating) return false
    return true
  })
}

export async function fetchProducts(filters = {}) {
  return simulate(applyFilters(PRODUCTS, filters))
}

export async function fetchProduct(id) {
  return simulate(PRODUCTS.find((product) => product.id === id) || null)
}

export async function fetchFeatured() {
  return simulate(featuredProducts())
}

export async function fetchPopular() {
  return simulate(popularProducts())
}

export async function fetchNew() {
  return simulate(newProducts())
}

export default {
  fetchProducts,
  fetchProduct,
  fetchFeatured,
  fetchPopular,
  fetchNew,
}
