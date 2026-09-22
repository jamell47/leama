/**
 * Farmer profiles — the human face behind every product.
 * In production these come from /api/farmers; the sample set here keeps
 * the shop feeling real without hard-coding everything around it.
 */
import { shop } from '../../assets/shop'

const farmerPortrait1 = shop.potatoes
const farmerPortrait2 = shop.freeRangeFlock
const farmerPortrait3 = shop.greenhouseTomatoes
const farmerPortrait4 = shop.dairyHerd
const farmerPortrait5 = shop.piggery

/**
 * @typedef {Object} Farmer
 * @property {string} id
 * @property {string} name
 * @property {string} location      e.g. "Kiambu, Kenya"
 * @property {string} country       e.g. "Kenya"
 * @property {string} region        e.g. "Central"
 * @property {string} avatar
 * @property {string} bio
 * @property {string[]} specialities
 * @property {boolean} verified
 * @property {number} rating
 * @property {number} farmSize
 */

const FARMERS = {
  james: {
    id: 'farmer_james',
    name: 'James Njoroge',
    location: 'Kericho, Kenya',
    country: 'Kenya',
    region: 'Rift Valley',
    avatar: farmerPortrait1,
    bio: 'Third-generation vegetable grower supplying potatoes, cabbage and root crops to local markets.',
    specialities: ['Potatoes', 'Cabbage', 'Root Crops'],
    verified: true,
    rating: 4.9,
    farmSize: 12,
  },
  amina: {
    id: 'farmer_amina',
    name: 'Amina Hassan',
    location: 'Kakamega, Kenya',
    country: 'Kenya',
    region: 'Western',
    avatar: farmerPortrait3,
    bio: 'Poultry and greenhouse producer raising broilers, layers and vine-ripened tomatoes.',
    specialities: ['Chicken', 'Eggs', 'Tomatoes'],
    verified: true,
    rating: 4.8,
    farmSize: 8,
  },
  roberto: {
    id: 'farmer_roberto',
    name: 'Roberto Mwangi',
    location: 'Nakuru, Kenya',
    country: 'Kenya',
    region: 'Rift Valley',
    avatar: farmerPortrait5,
    bio: 'Livestock farmer running a modern piggery and rabbit unit alongside field crops.',
    specialities: ['Pork', 'Rabbit', 'Piglets'],
    verified: true,
    rating: 4.95,
    farmSize: 45,
  },
  mariam: {
    id: 'farmer_mariam',
    name: 'Mariam Ali',
    location: 'Kajiado, Kenya',
    country: 'Kenya',
    region: 'Rift Valley',
    avatar: farmerPortrait4,
    bio: 'Dairy and free-range egg producer focused on regenerative pasture rotation.',
    specialities: ['Milk', 'Eggs', 'Layers'],
    verified: true,
    rating: 4.7,
    farmSize: 20,
  },
  kofi: {
    id: 'farmer_kofi',
    name: 'Kofi Boateng',
    location: 'Nakuru, Kenya',
    country: 'Kenya',
    region: 'Rift Valley',
    avatar: farmerPortrait2,
    bio: 'Mixed livestock farmer supplying pork, rabbit and farm-fresh chicken to the shop.',
    specialities: ['Pork', 'Rabbit', 'Chicken'],
    verified: true,
    rating: 4.85,
    farmSize: 30,
  },
}

export function getFarmer(id) {
  return FARMERS[id]
}

export function getAllFarmers() {
  return Object.values(FARMERS)
}

export default FARMERS