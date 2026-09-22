import { motion } from 'framer-motion'
import { formatCurrency } from '../utils'
import { useCart } from '../context/CartContext'
import SearchBar from './SearchBar'
import LocationSelector from './LocationSelector'
import MarketplaceStats from './MarketplaceStats'

const EASE = [0.22, 1, 0.36, 1]

/**
 * Marketplace hero — floats over the farm world in layered glass.
 */
export default function MarketplaceHero({ query, onSearch, location, onLocationChange }) {
    const { items, total, currency, openCart } = useCart()

  return (
    <section className="marketplace-hero" aria-labelledby="mp-hero-title">
      <div className="hero-atmosphere mp-hero-atmosphere" aria-hidden="true" />
      <div className="container mp-hero-container">
        <motion.span
          className="eyebrow mp-hero-eyebrow"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="eyebrow-dot" aria-hidden="true" />
          Farm-fresh · Global markets · Leema Tech
        </motion.span>

        <motion.h1
          id="mp-hero-title"
          className="mp-hero-title"
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.18, ease: EASE }}
        >
          <span>From the Farm</span>
          <span>to Your Door</span>
        </motion.h1>

        <motion.p
          className="mp-hero-copy"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.36 }}
        >
          Discover fresh produce from farmers and farms around the world.
        </motion.p>

        <motion.div
          className="mp-hero-controls"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <SearchBar
            value={query}
            onSearch={onSearch}
            className="market-search--lg"
            placeholder="Search fruits, vegetables, grains, dairy..."
          />
          <LocationSelector value={location} onChange={onLocationChange} />
          <button
            type="button"
            className="mp-hero-cart glass-base"
            style={{ '--glass-blur': '18px' }}
            onClick={openCart}
            aria-label={`Open cart — ${items.length} items, ${formatCurrency(total, currency)}`}
          >
            <span>Cart · {items.length} items · {formatCurrency(total, currency)}</span>
          </button>
        </motion.div>

        <motion.div
          className="mp-hero-stats"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.66 }}
        >
          <MarketplaceStats />
        </motion.div>
      </div>
    </section>
  )
}
