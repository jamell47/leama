import { productService as api } from './api.js'

function asNumber(value, fallback = 0) {
  const number = Number(value)
  return Number.isFinite(number) ? number : fallback
}

export function normalizeProduct(product) {
  if (!product) return null
  const category = typeof product.category === 'object' ? product.category : null
  const image = product.image || product.imageUrl || ''
  const galleryValue = product.gallery || []
  const gallery = Array.isArray(galleryValue) && galleryValue.length ? galleryValue : image ? [image] : []
  return {
    ...product,
    id: product.id || product.productId,
    name: product.name || 'Untitled product',
    description: product.description || '',
    price: asNumber(product.price),
    unit: product.unit || 'piece',
    image,
    gallery,
    stock: asNumber(product.stock ?? product.availableStock),
    isAvailable: product.isAvailable !== false,
    categoryId: product.categoryId || category?.id || '',
    category: category?.name || product.categoryName || product.category || 'Farm produce',
    subcategory: product.subcategory || '',
    featured: Boolean(product.featured),
    organic: Boolean(product.organic),
    delivery: product.delivery !== false,
    rating: asNumber(product.rating, 0),
    reviewCount: asNumber(product.reviewCount),
    farmerId: product.farmerId || null,
    farmerName: product.farmerName || product.farmer?.name || '',
    location: product.location || product.farmer?.location || '',
    country: product.country || product.farmer?.country || '',
    tags: Array.isArray(product.tags) ? product.tags : [],
  }
}

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
  const q = query.trim().toLowerCase()
  return products.filter((product) => {
    if (categoryId !== 'all' && product.categoryId !== categoryId && product.category !== categoryId) return false
    if (q) {
      const hay = [product.name, product.description, product.category, product.subcategory, ...(product.tags || [])].join(' ').toLowerCase()
      if (!hay.includes(q)) return false
    }
    if (minPrice !== '' && minPrice != null && product.price < Number(minPrice)) return false
    if (maxPrice !== '' && maxPrice != null && product.price > Number(maxPrice)) return false
    if (location && product.location && !product.location.toLowerCase().includes(location.toLowerCase())) return false
    if (country && product.country !== country) return false
    if (organic && !product.organic) return false
    if (delivery && !product.delivery) return false
    if (minRating && product.rating < Number(minRating)) return false
    return true
  })
}

export async function fetchProducts(filters = {}) {
  const response = await api.fetchProducts(filters)
  const products = response?.products || response?.items || response || []
  return {
    products: products.map(normalizeProduct),
    pagination: response?.pagination || { page: 1, limit: products.length, total: products.length, totalPages: 1 },
  }
}

export async function fetchProduct(id) {
  const response = await api.fetchProduct(id)
  return normalizeProduct(response)
}

export async function fetchCategories() {
  return api.fetchCategories()
}

export async function fetchFeatured(limit = 6) {
  const response = await fetchProducts({ limit: 50, available: true })
  const featured = response.products.filter((product) => product.featured)
  return (featured.length ? featured : response.products).slice(0, limit)
}

export async function fetchPopular(limit = 8) {
  const response = await fetchProducts({ limit: 50, available: true })
  return [...response.products].sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0)).slice(0, limit)
}

export async function fetchNew(limit = 8) {
  const response = await fetchProducts({ limit: 50, available: true })
  return response.products.slice(0, limit)
}

export default {
  fetchProducts,
  fetchProduct,
  fetchCategories,
  fetchFeatured,
  fetchPopular,
  fetchNew,
  normalizeProduct,
}
