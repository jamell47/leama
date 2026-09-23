import { productService as api } from './api.js'
import { PRODUCTS } from '../data/products.js'
import { CATEGORIES } from '../data/categories.js'
import { shop } from '../../assets/shop'

function asNumber(value, fallback = 0) {
  const number = Number(value)
  return Number.isFinite(number) ? number : fallback
}

function localProductForName(name) {
  const normalizedName = String(name || '').toLowerCase()
  return PRODUCTS.find((product) => {
    const localName = product.name.toLowerCase()
    return normalizedName === localName || normalizedName.includes(localName) || localName.includes(normalizedName)
  })
}

// Every farm photo shipped in src/assets/shop (farm1 … farm26).
const allShopImages = [...new Set(Object.values(shop || {}).filter(Boolean))]

/**
 * Keyword → farm photo, so every card in the shop dashboard shows the
 * picture that actually matches the product (never an old/backend image).
 */
const SHOP_IMAGE_RULES = [
  [/egg/i, shop.eggs],
  [/milk|dairy|yoghurt|yogurt|cheese/i, shop.dairyCow],
  [/broil|chicken|poultry|layer|hen/i, shop.broilers],
  [/pig|pork|bacon/i, shop.piggery],
  [/rabbit/i, shop.rabbitsHutch],
  [/watermelon|melon/i, shop.watermelons],
  [/potato/i, shop.potatoes],
  [/onion/i, shop.onions],
  [/tomato/i, shop.greenhouseTomatoes],
  [/cabbage|sukuma|kale|spinach/i, shop.cabbage],
]

function hashIndex(key, modulo) {
  const text = String(key || '')
  let hash = 0
  for (let i = 0; i < text.length; i += 1) hash = (hash * 31 + text.charCodeAt(i)) >>> 0
  return modulo > 0 ? hash % modulo : 0
}

/** Farm photo for a product: keyword match → stable rotation through the
 *  shop set, so all 26 photos get used across the catalogue. */
function shopImageFor(product, localProduct) {
  if (localProduct?.image) return localProduct.image
  const haystack = [product?.name, product?.subcategory, product?.categoryName].filter(Boolean).join(' ')
  const matched = SHOP_IMAGE_RULES.find(([pattern]) => pattern.test(haystack))
  if (matched?.[1]) return matched[1]
  if (!allShopImages.length) return ''
  return allShopImages[hashIndex(product?.id || product?.name, allShopImages.length)]
}

/** Gallery built only from farm photos: the product's own image plus the
 *  nearest photos after it in the assets/shop set. */
function shopGalleryFor(image) {
  if (!allShopImages.length) return image ? [image] : []
  const start = Math.max(0, allShopImages.indexOf(image))
  return Array.from({ length: Math.min(4, allShopImages.length) }, (_, i) => allShopImages[(start + i) % allShopImages.length])
}

export function normalizeProduct(product) {
  if (!product) return null
  const category = typeof product.category === 'object' ? product.category : null
  const localProduct = localProductForName(product.name)
  // Always show the project's own farm photography (src/assets/shop) —
  // earlier/backend images are never used on the shop dashboard.
  const image = shopImageFor(product, localProduct) || shop?.default || ''
  const gallery = Array.isArray(localProduct?.gallery) && localProduct.gallery.length
    ? localProduct.gallery
    : shopGalleryFor(image)
  return {
    ...product,
    id: product.id || product.productId,
    name: product.name || 'Untitled product',
    description: product.description || '',
    price: asNumber(product.price),
    unit: product.unit || 'piece',
    image,
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
    gallery,
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
  try {
    const response = await api.fetchProducts(filters)
    const products = response?.products || response?.items || response || []
    return {
      products: products.map(normalizeProduct),
      pagination: response?.pagination || { page: 1, limit: products.length, total: products.length, totalPages: 1 },
    }
  } catch {
    const products = applyFilters(PRODUCTS.map(normalizeProduct), filters)
    return {
      products,
      pagination: { page: 1, limit: products.length, total: products.length, totalPages: 1 },
    }
  }
}

export async function fetchProduct(id) {
  const response = await api.fetchProduct(id)
  return normalizeProduct(response)
}

export async function fetchCategories() {
  try {
    return await api.fetchCategories()
  } catch {
    return CATEGORIES
  }
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
