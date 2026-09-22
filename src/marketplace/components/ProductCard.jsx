import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Heart, ShoppingCart } from 'lucide-react'
import { cn, formatCurrency, stockStatus } from '../utils'
import { useCart } from '../context/CartContext'
import { isFavorited, toggleFavorite, loadFavorites } from '../services/favoritesService'
import RatingStars from './RatingStars'
import ProductBadge from './ProductBadge'
import QuantitySelector from './QuantitySelector'

export default function ProductCard({ product }) {
  const navigate = useNavigate()
  const { addItem, pending } = useCart()
  const [qty, setQty] = useState(1)
  const [faves, setFaves] = useState(loadFavorites)
  const [adding, setAdding] = useState(false)
  const [error, setError] = useState('')
  const [imageFailed, setImageFailed] = useState(false)

  useEffect(() => {
    const handler = () => setFaves(loadFavorites())
    window.addEventListener('leema:fave:change', handler)
    return () => window.removeEventListener('leema:fave:change', handler)
  }, [])

  const fav = isFavorited(faves, product.id)
  const onFave = (event) => {
    event.stopPropagation()
    setFaves(toggleFavorite(product.id))
    window.dispatchEvent(new Event('leema:fave:change'))
  }
  const onAdd = async (event) => {
    event.stopPropagation()
    if (adding || pending || product.stock <= 0) return
    setAdding(true)
    setError('')
    try {
      await addItem(product, qty)
    } catch (requestError) {
      setError(requestError?.message || 'Unable to add this product. Please try again.')
    } finally {
      setAdding(false)
    }
  }

  const stock = stockStatus(product)
  const canAdd = product.isAvailable !== false && product.stock > 0
  const maxQuantity = Math.max(1, Math.min(product.stock || 1, 20))
  const farmerName = product.farmerName || product.farmer?.name
  const farmerLocation = product.farmer?.location || product.location

  return (
    <article
      className="product-card glass-base"
      style={{ '--glass-blur': '24px' }}
      onClick={() => navigate(`/marketplace/product/${product.id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => (event.key === 'Enter' || event.key === ' ') && navigate(`/marketplace/product/${product.id}`)}
      aria-label={`View ${product.name}`}
    >
      <div className="product-card-media">
        {product.image && !imageFailed ? (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            decoding="async"
            draggable="false"
            className="product-card-img"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="product-card-image-fallback" aria-label={`${product.name} image unavailable`}>
            <span>{product.name.charAt(0)}</span>
          </div>
        )}
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

        {farmerName && (
          <div className="product-card-farmer">
            <span>
              From <b>{farmerName}</b>{farmerLocation ? ` · ${farmerLocation}` : ''}
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
          <QuantitySelector value={qty} max={maxQuantity} onChange={setQty} />
          <button
            type="button"
            className="btn btn-primary btn-sm product-add-btn"
            onClick={onAdd}
            disabled={!canAdd || adding || pending}
          >
            <ShoppingCart size={14} /> {adding ? 'Adding...' : 'Add to Cart'}
          </button>
        </div>
        {error && <p className="product-card-error" role="alert">{error}</p>}
      </div>
    </article>
  )
}
