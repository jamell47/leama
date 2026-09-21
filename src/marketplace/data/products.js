/**
 * Shop product data model + sample catalog.
 *
 * ARCHITECTURE NOTE
 * -----------------
 * The canonical product shape lives here so the whole shop can be re-pointed
 * at a real backend with one swap. `productService` (services/productService.js)
 * exposes async accessors that currently resolve from this local sample but are
 * structured to call `/api/products` when an API is available.
 *
 * Images reference the project's own authentic farm & livestock photography
 * (src/assets/shop). In production these become signed CDN URLs returned by the
 * backend; the card components never assume a local import.
 */
import { shop } from '../../assets/shop'
import { CATEGORIES } from './categories'
import { getFarmer } from './farmers'

/**
 * @typedef {Object} Product
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {string} category        category.id
 * @property {string} subcategory
 * @property {string} image           primary product image
 * @property {string[]} gallery       additional images
 * @property {number} price
 * @property {string} currency         e.g. "KSh"
 * @property {string} unit             e.g. "kg", "tray", "bunch", "litre"
 * @property {string} farmerId
 * @property {string} location
 * @property {string} country
 * @property {number} stock            available units
 * @property {number} rating           0–5
 * @property {number} reviewCount
 * @property {boolean} featured
 * @property {boolean} organic
 * @property {boolean} delivery
 * @property {string[]} tags
 */

export const PRODUCTS = [
  /* ----------------------------------------------------------------
     Dairy & eggs
     ---------------------------------------------------------------- */
  {
    id: 'p_eggs_table',
    name: 'Farm Fresh Table Eggs',
    description: 'Golden-yolk eggs collected daily from healthy layer flocks and packed the same morning.',
    category: 'dairy-eggs',
    subcategory: 'Eggs',
    image: shop.eggs,
    gallery: [shop.eggs, shop.nestBoxes, shop.layerHouse],
    price: 220,
    currency: 'KSh',
    unit: 'tray (30 pcs)',
    farmerId: 'mariam',
    location: 'Kajiado, Kenya',
    country: 'Kenya',
    stock: 540,
    rating: 4.7,
    reviewCount: 167,
    featured: true,
    organic: false,
    delivery: true,
    tags: ['protein', 'fresh'],
  },
  {
    id: 'p_eggs_free_range',
    name: 'Free-Range Organic Eggs',
    description: 'Rich, deep-orange yolks from hens that roam open pasture every day.',
    category: 'dairy-eggs',
    subcategory: 'Eggs',
    image: shop.freeRangeFlock,
    gallery: [shop.freeRangeFlock, shop.chickenTractor, shop.nestBoxes],
    price: 320,
    currency: 'KSh',
    unit: 'tray (30 pcs)',
    farmerId: 'mariam',
    location: 'Kajiado, Kenya',
    country: 'Kenya',
    stock: 210,
    rating: 4.9,
    reviewCount: 121,
    featured: true,
    organic: true,
    delivery: true,
    tags: ['organic', 'free-range'],
  },
  {
    id: 'p_milk_fresh',
    name: 'Fresh Whole Milk',
    description: 'Creamy, pasteurised whole milk from grass-fed dairy cows.',
    category: 'dairy-eggs',
    subcategory: 'Milk',
    image: shop.dairyCow,
    gallery: [shop.dairyCow, shop.dairyHerd],
    price: 110,
    currency: 'KSh',
    unit: 'litre',
    farmerId: 'mariam',
    location: 'Kajiado, Kenya',
    country: 'Kenya',
    stock: 380,
    rating: 4.4,
    reviewCount: 91,
    featured: false,
    organic: false,
    delivery: true,
    tags: ['calcium', 'fresh'],
  },
  {
    id: 'p_milk_bulk',
    name: 'Bulk Farm Milk',
    description: 'Chilled, farm-gate milk supplied in food-grade 20-litre cans.',
    category: 'dairy-eggs',
    subcategory: 'Milk',
    image: shop.dairyHerd,
    gallery: [shop.dairyHerd, shop.dairyCow],
    price: 1850,
    currency: 'KSh',
    unit: '20L can',
    farmerId: 'mariam',
    location: 'Kajiado, Kenya',
    country: 'Kenya',
    stock: 90,
    rating: 4.5,
    reviewCount: 46,
    featured: false,
    organic: false,
    delivery: true,
    tags: ['bulk', 'dairy'],
  },

  /* ----------------------------------------------------------------
     Meat & poultry
     ---------------------------------------------------------------- */
  {
    id: 'p_chicken_broiler',
    name: 'Broiler Chicken',
    description: 'Tender, quick-growing broilers raised in clean, well-ventilated houses.',
    category: 'meat',
    subcategory: 'Poultry',
    image: shop.broilers,
    gallery: [shop.broilers, shop.broilerHouse, shop.poultryHousing],
    price: 560,
    currency: 'KSh',
    unit: 'kg',
    farmerId: 'amina',
    location: 'Kakamega, Kenya',
    country: 'Kenya',
    stock: 240,
    rating: 4.6,
    reviewCount: 132,
    featured: true,
    organic: false,
    delivery: true,
    tags: ['poultry', 'protein'],
  },
  {
    id: 'p_chicken_free_range',
    name: 'Free-Range Chicken',
    description: 'Flavourful free-range chicken reared slowly on open ground.',
    category: 'meat',
    subcategory: 'Poultry',
    image: shop.freeRangeFlock,
    gallery: [shop.freeRangeFlock, shop.chickenTractor, shop.chickenCoop],
    price: 680,
    currency: 'KSh',
    unit: 'kg',
    farmerId: 'amina',
    location: 'Kakamega, Kenya',
    country: 'Kenya',
    stock: 130,
    rating: 4.8,
    reviewCount: 109,
    featured: true,
    organic: true,
    delivery: true,
    tags: ['organic', 'free-range', 'poultry'],
  },
  {
    id: 'p_chicken_whole',
    name: 'Whole Farm Chicken',
    description: 'Whole dressed chicken, farm-slaughtered and delivered fresh.',
    category: 'meat',
    subcategory: 'Poultry',
    image: shop.chickenTractor,
    gallery: [shop.chickenTractor, shop.chickenHouse, shop.chickenCoop],
    price: 620,
    currency: 'KSh',
    unit: 'piece',
    farmerId: 'amina',
    location: 'Kakamega, Kenya',
    country: 'Kenya',
    stock: 175,
    rating: 4.5,
    reviewCount: 88,
    featured: false,
    organic: true,
    delivery: true,
    tags: ['fresh', 'poultry'],
  },
  {
    id: 'p_pork_farm',
    name: 'Farm-Raised Pork',
    description: 'Lean, succulent pork from pigs raised in spacious, hygienic pens.',
    category: 'meat',
    subcategory: 'Pork',
    image: shop.piggery,
    gallery: [shop.piggery, shop.piglets],
    price: 520,
    currency: 'KSh',
    unit: 'kg',
    farmerId: 'kofi',
    location: 'Nakuru, Kenya',
    country: 'Kenya',
    stock: 160,
    rating: 4.4,
    reviewCount: 72,
    featured: false,
    organic: false,
    delivery: true,
    tags: ['pork', 'protein'],
  },
  {
    id: 'p_rabbit_meat',
    name: 'Rabbit Meat',
    description: 'Lean, mild rabbit meat — high in protein and low in fat.',
    category: 'meat',
    subcategory: 'Rabbit',
    image: shop.rabbitsHutch,
    gallery: [shop.rabbitsHutch, shop.rabbitsCaged, shop.rabbitHutches],
    price: 750,
    currency: 'KSh',
    unit: 'kg',
    farmerId: 'kofi',
    location: 'Nakuru, Kenya',
    country: 'Kenya',
    stock: 70,
    rating: 4.6,
    reviewCount: 39,
    featured: true,
    organic: true,
    delivery: true,
    tags: ['organic', 'high-protein'],
  },
  {
    id: 'p_meat_box_mixed',
    name: 'Mixed Farm Meat Box',
    description: 'A curated box of chicken, pork and other farm meats in a single order.',
    category: 'meat',
    subcategory: 'Processed',
    image: shop.livestockCollage,
    gallery: [shop.livestockCollage, shop.broilers, shop.piggery],
    price: 2400,
    currency: 'KSh',
    unit: 'box (5kg)',
    farmerId: 'kofi',
    location: 'Nakuru, Kenya',
    country: 'Kenya',
    stock: 55,
    rating: 4.5,
    reviewCount: 34,
    featured: false,
    organic: false,
    delivery: true,
    tags: ['bundle', 'grill'],
  },

  /* ----------------------------------------------------------------
     Livestock & poultry (live)
     ---------------------------------------------------------------- */
  {
    id: 'p_layers_point_of_lay',
    name: 'Point-of-Lay Hens',
    description: 'Vaccinated, point-of-lay pullets ready to start producing eggs.',
    category: 'livestock',
    subcategory: 'Poultry',
    image: shop.layerHouse,
    gallery: [shop.layerHouse, shop.layerCages, shop.layerEquipment],
    price: 580,
    currency: 'KSh',
    unit: 'bird',
    farmerId: 'mariam',
    location: 'Kajiado, Kenya',
    country: 'Kenya',
    stock: 900,
    rating: 4.8,
    reviewCount: 142,
    featured: true,
    organic: false,
    delivery: true,
    tags: ['poultry', 'layers'],
  },
  {
    id: 'p_weaner_piglets',
    name: 'Weaner Piglets',
    description: 'Healthy, fast-growing weaner piglets ready for grow-out.',
    category: 'livestock',
    subcategory: 'Pigs',
    image: shop.piglets,
    gallery: [shop.piglets, shop.piggery],
    price: 4200,
    currency: 'KSh',
    unit: 'piglet',
    farmerId: 'kofi',
    location: 'Nakuru, Kenya',
    country: 'Kenya',
    stock: 60,
    rating: 4.5,
    reviewCount: 28,
    featured: false,
    organic: false,
    delivery: true,
    tags: ['pigs', 'breeding'],
  },
  {
    id: 'p_breeding_rabbits',
    name: 'Breeding Rabbits',
    description: 'Productive breeding does and bucks from strong, healthy lines.',
    category: 'livestock',
    subcategory: 'Rabbits',
    image: shop.rabbitsCaged,
    gallery: [shop.rabbitsCaged, shop.rabbitHutches],
    price: 1800,
    currency: 'KSh',
    unit: 'pair',
    farmerId: 'kofi',
    location: 'Nakuru, Kenya',
    country: 'Kenya',
    stock: 45,
    rating: 4.7,
    reviewCount: 22,
    featured: false,
    organic: true,
    delivery: true,
    tags: ['rabbits', 'breeding'],
  },

  /* ----------------------------------------------------------------
     Fruits
     ---------------------------------------------------------------- */
  {
    id: 'p_watermelon',
    name: 'Crimson Watermelon',
    description: 'Deep-red, ultra-sweet watermelons harvested at full maturity.',
    category: 'fruits',
    subcategory: 'Melons',
    image: shop.watermelons,
    gallery: [shop.watermelons, shop.watermelonsCrates],
    price: 60,
    currency: 'KSh',
    unit: 'piece',
    farmerId: 'amina',
    location: 'Marsabit, Kenya',
    country: 'Kenya',
    stock: 410,
    rating: 4.7,
    reviewCount: 120,
    featured: true,
    organic: true,
    delivery: false,
    tags: ['summer', 'organic'],
  },

  /* ----------------------------------------------------------------
     Vegetables
     ---------------------------------------------------------------- */
  {
    id: 'p_potatoes',
    name: 'Fresh Potatoes',
    description: 'Firm, smooth-skinned potatoes ideal for frying and stewing.',
    category: 'vegetables',
    subcategory: 'Root',
    image: shop.potatoes,
    gallery: [shop.potatoes, shop.cabbage],
    price: 70,
    currency: 'KSh',
    unit: 'kg',
    farmerId: 'james',
    location: 'Kericho, Kenya',
    country: 'Kenya',
    stock: 820,
    rating: 4.3,
    reviewCount: 178,
    featured: false,
    organic: false,
    delivery: true,
    tags: ['carbs', 'farm-fresh'],
  },
  {
    id: 'p_onions',
    name: 'Red Onions',
    description: 'Sharp, purple-red onions with a clean bite.',
    category: 'vegetables',
    subcategory: 'Allium',
    image: shop.onions,
    gallery: [shop.onions, shop.cabbage],
    price: 120,
    currency: 'KSh',
    unit: 'kg',
    farmerId: 'amina',
    location: 'Nakuru, Kenya',
    country: 'Kenya',
    stock: 510,
    rating: 4.5,
    reviewCount: 134,
    featured: false,
    organic: true,
    delivery: true,
    tags: ['organic'],
  },
  {
    id: 'p_cabbage',
    name: 'Green Cabbage',
    description: 'Crisp, tightly-packed cabbage heads grown in open fields.',
    category: 'vegetables',
    subcategory: 'Brassica',
    image: shop.cabbage,
    gallery: [shop.cabbage, shop.potatoes],
    price: 50,
    currency: 'KSh',
    unit: 'head',
    farmerId: 'james',
    location: 'Kericho, Kenya',
    country: 'Kenya',
    stock: 640,
    rating: 4.4,
    reviewCount: 96,
    featured: false,
    organic: true,
    delivery: true,
    tags: ['leafy', 'organic'],
  },
  {
    id: 'p_tomatoes_greenhouse',
    name: 'Greenhouse Tomatoes',
    description: 'Vine-ripened tomatoes grown under protected, climate-smart greenhouses.',
    category: 'vegetables',
    subcategory: 'Nightshade',
    image: shop.greenhouseTomatoes,
    gallery: [shop.greenhouseTomatoes],
    price: 95,
    currency: 'KSh',
    unit: 'kg',
    farmerId: 'amina',
    location: 'Kakamega, Kenya',
    country: 'Kenya',
    stock: 640,
    rating: 4.6,
    reviewCount: 210,
    featured: true,
    organic: true,
    delivery: true,
    tags: ['organic', 'lycopene', 'greenhouse'],
  },
]

export const CURRENCY = 'KSh'
export const COUNTRIES = ['Kenya']

/** Resolve a farmer handle to a friendly "From Farmer James" label. */
export function farmerLabel(farmerId) {
  const farmer = getFarmer(farmerId || '')
  if (!farmer) return { name: 'Local Farmer', location: 'Kenya', avatar: null }
  return {
    name: farmer.name,
    location: farmer.location,
    country: farmer.country,
    avatar: farmer.avatar,
    rating: farmer.rating,
    verified: farmer.verified,
    bio: farmer.bio,
  }
}

export function featuredProducts() {
  return PRODUCTS.filter((p) => p.featured)
}

export function newProducts() {
  // Newest arrivals = last third of the catalogue (deterministic).
  const start = Math.max(0, PRODUCTS.length - 16)
  return PRODUCTS.slice(start)
}

export function popularProducts() {
  // Popular = highest review count.
  return [...PRODUCTS].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 12)
}

export const marketplaceStats = {
  products: '10,000+',
  farmers: '1,000+',
  regions: '50+',
  countries: '12',
}

export { CATEGORIES }

export default PRODUCTS