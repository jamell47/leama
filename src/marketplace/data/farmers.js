/**
 * Farmer profiles — the human face behind every product.
 * In production these come from /api/farmers; the sample set here keeps
 * the marketplace feeling real without hard-coding everything around it.
 */
import { farmer, community, seedlings, poultry } from '../../assets'

const farmerPortrait1 = farmer
const farmerPortrait2 = community
const farmerPortrait3 = seedlings
const farmerPortrait4 = poultry

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
    location: 'Kiambu, Kenya',
    country: 'Kenya',
    region: 'Central',
    avatar: farmerPortrait1,
    bio: 'Third-generation horticulturist growing premium Hass avocados and specialty citrus.',
    specialities: ['Avocados', 'Citrus', 'Mangoes'],
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
    avatar: farmerPortrait2,
    bio: 'Organic vegetable farmer supplying leafy greens and root crops to Nairobi markets.',
    specialities: ['Spinach', 'Kale', 'Carrots', 'Tomatoes'],
    verified: true,
    rating: 4.8,
    farmSize: 8,
  },
  roberto: {
    id: 'farmer_roberto',
    name: 'Roberto Mwangi',
    location: 'Limpopo, South Africa',
    country: 'South Africa',
    region: 'Limpopo',
    avatar: farmerPortrait3,
    bio: 'Specialty coffee and macadamia grower at the foot of the Drakensberg range.',
    specialities: ['Coffee', 'Macadamia', 'Avocados'],
    verified: true,
    rating: 4.95,
    farmSize: 45,
  },
  mariam: {
    id: 'farmer_mariam',
    name: 'Mariam Ali',
    location: 'Marsabit, Kenya',
    country: 'Kenya',
    region: 'Northern',
    avatar: farmerPortrait4,
    bio: 'Dairy and free-range egg producer focused on regenerative pasture rotation.',
    specialities: ['Milk', 'Eggs', 'Goat Meat'],
    verified: true,
    rating: 4.7,
    farmSize: 20,
  },
  kofi: {
    id: 'farmer_kofi',
    name: 'Kofi Boateng',
    location: 'Ashanti Region, Ghana',
    country: 'Ghana',
    region: 'Ashanti',
    avatar: farmerPortrait1,
    bio: 'Cassava, plantain and cocoa farmer working with local cooperatives.',
    specialities: ['Cocoa', 'Plantains', 'Cassava'],
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
