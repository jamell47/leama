/**
 * Marketplace category registry.
 * Icons are pulled live from lucide-react so the registry stays
 * serialisable-friendly and easy to extend from a backend later.
 */
import {
  Apple,
  Beef,
  Carrot,
  Coffee,
  Egg,
  Fish,
  Flower2,
  Grape,
  Leaf,
  Milk,
  Sprout,
  Tractor,
  Wheat,
} from 'lucide-react'

/** @typedef {{ id: string, name: string, slug: string, icon: any, color: string }} Category */

export const CATEGORIES = [
  { id: 'all', name: 'All Products', slug: 'all', icon: Leaf, color: 'var(--green-light)' },
  { id: 'fruits', name: 'Fruits', slug: 'fruits', icon: Apple, color: 'var(--green-light)' },
  { id: 'vegetables', name: 'Vegetables', slug: 'vegetables', icon: Carrot, color: 'var(--green-light)' },
  { id: 'grains', name: 'Grains & Cereals', slug: 'grains', icon: Wheat, color: 'var(--green-light)' },
  { id: 'dairy-eggs', name: 'Dairy & Eggs', slug: 'dairy-eggs', icon: Egg, color: 'var(--green-light)' },
  { id: 'meat', name: 'Meat', slug: 'meat', icon: Beef, color: 'var(--green-light)' },
  { id: 'seafood', name: 'Fish & Seafood', slug: 'seafood', icon: Fish, color: 'var(--green-light)' },
  { id: 'herbs', name: 'Herbs & Spices', slug: 'herbs', icon: Leaf, color: 'var(--green-light)' },
  { id: 'nuts', name: 'Nuts', slug: 'nuts', icon: Grape, color: 'var(--green-light)' },
  { id: 'seeds', name: 'Seeds', slug: 'seeds', icon: Sprout, color: 'var(--green-light)' },
  { id: 'flowers', name: 'Flowers', slug: 'flowers', icon: Flower2, color: 'var(--green-light)' },
  { id: 'coffee-tea', name: 'Coffee & Tea', slug: 'coffee-tea', icon: Coffee, color: 'var(--green-light)' },
  { id: 'honey', name: 'Honey', slug: 'honey', icon: Milk, color: 'var(--green-light)' },
  { id: 'farm-products', name: 'Farm Products', slug: 'farm-products', icon: Tractor, color: 'var(--green-light)' },
  { id: 'animal-feed', name: 'Animal Feed', slug: 'animal-feed', icon: Leaf, color: 'var(--green-light)' },
  { id: 'seedlings', name: 'Seedlings & Plants', slug: 'seedlings', icon: Sprout, color: 'var(--green-light)' },
]

export const SUBCATEGORIES = {
  fruits: ['Tropical', 'Citrus', 'Stone Fruit', 'Berries', 'Melons'],
  vegetables: ['Leafy', 'Root', 'Brassica', 'Allium', 'Nightshade'],
  grains: ['Cereals', 'Legumes', 'Oil Seeds'],
  'dairy-eggs': ['Milk', 'Cheese', 'Yogurt', 'Eggs', 'Butter'],
  meat: ['Beef', 'Pork', 'Goat', 'Poultry', 'Processed'],
  seafood: ['Fish', 'Shellfish', 'Seaweed'],
  herbs: ['Medicinal', 'Culinary', 'Aromatic'],
  nuts: ['Tree Nuts', 'Pulses'],
  seeds: ['Vegetable Seeds', 'Oil Seeds', 'Grass Seeds'],
  flowers: ['Cut Flowers', 'Potted', 'Ornamental'],
  'coffee-tea': ['Coffee Beans', 'Tea Leaves', 'Herbal Infusions'],
  honey: ['Raw Honey', 'Beeswax', 'Propolis'],
  'farm-products': ['Fertilizer', 'Tools', 'Preserves'],
  'animal-feed': ['Poultry Feed', 'Cattle Feed', 'Aquafeed'],
  seedlings: ['Vegetable Seedlings', 'Fruit Seedlings', 'Nursery'],
}

export function getCategory(id) {
  return CATEGORIES.find((category) => category.id === id) || CATEGORIES[0]
}

export function getCategoryColor(id) {
  return getCategory(id).color
}

export default CATEGORIES
