import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Heart, ShoppingCart } from 'lucide-react'
import { cn, formatCurrency, stockStatus } from '../utils'
import { useCart } from '../context/CartContext'
import { farmerLabel } from '../data/products'
import { isFavorited, toggleFavorite, loadFavorites } from '../services/favoritesService'
import RatingStars from './RatingStars'
import ProductBadge from './ProductBadge'
import QuantitySelector from './QuantitySelector'

/**
 * Premium glassmorphism product card.
 *
 * Image zoom + 3D lift on hover, favourite toggle, organic/featured badges,
 * farmer attribution, rating, price, stock, inline quantity and add-to-cart.
 * Clicking the card body navigates to the product detail page.
 */
export default function ProductCard({ product }) {
  const navigate = useNavigate()
  const { addItem } = useCart()
  const [qty, setQty] = useState(1)
  const [faves, setFaves] = useState(loadFavorites())

  useEffect(() => {
    const handler = () => setFaves(loadFavorites())
    window.addEventListener('leema:fave:change', handler)
    return () => window.removeEventListener('leema:fave:change', handler)
  }, [])

  const fav = isFavorited(faves, product.id)
  const onFave = (e) => {
    e.stopPropagation()
    setFaves(toggleFavorite(product.id))
    window.dispatchEvent(new Event('leema:fave:change'))
  }
  const onAdd = (e) => {
    e.stopPropagation()
    if (product.stock <= 0) return
    addItem(product, qty)
  }
  const farmer = product.farmerId ? farmerLabel(product.farmerId) : null
  const stock = stockStatus(product)
  const canAdd = product.stock > 0

  return (
    <article
      className="product-card glass-base"
      style={{ '--glass-blur': '24px' }}
      onClick={() => navigate(`/marketplace/product/${product.id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && navigate(`/marketplace/product/${product.id}`)}
      aria-label={`View ${product.name}`}
    >
      <div className="product-card-media">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          decoding="async"
          draggable="false"
          className="product-card-img"
        />
        <div className="product-card-media-overlay" aria-hidden="true" />
        <div className="product-card-badges">
          {product.organic && <ProductBadge type="organic" />}
          {product.featured && <ProductBadge type="featured" />}
        </div>
        <button
          type="button"
          className={cn('product-card-fave', fav && 'active')}
          onClick={onFave}
          aria-label={fav ? 'Remove from favourites' : 'Add to favourites'}
        >
          <Heart size={16} fill={fav ? 'currentColor' : 'none'} aria-hidden="true" />
        </button>
      </div>

      <div className="product-card-body">
        <h3 className="product-card-name">{product.name}</h3>
        <p className="product-card-desc">{product.description}</p>

        {farmer && (
          <div className="product-card-farmer">
            <img src={farmer.avatar} alt="" className="farmer-avatar" loading="lazy" decoding="async" />
            <span>
              From <b>{farmer.name}</b> · {farmer.location}
            </span>
          </div>
        )}

        <div className="product-card-meta">
          <RatingStars rating={product.rating} reviews={product.reviewCount} />
          <span className={cn('product-stock', stock.ok ? 'in-stock' : 'out-of-stock')}>
            {stock.label}
          </span>
        </div>

        <div className="product-price">
          <span className="product-price-amount">{formatCurrency(product.price)}</span>
          <small className="product-price-unit">/ {product.unit}</small>
        </div>

        <div className="product-card-actions">
          <QuantitySelector value={qty} max={Math.min(product.stock || 1, 20)} onChange={setQty} />
          <button
            type="button"
            className="btn btn-primary btn-sm product-add-btn"
            onClick={onAdd}
            disabled={!canAdd}
          >
            <ShoppingCart size={14} /> Add to Cart
          </button>
        </div>
      </div>
    </article>
  )
}
