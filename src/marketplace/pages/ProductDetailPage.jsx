import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star, ShoppingCart, ArrowLeft, MapPin, CheckCircle2 } from 'lucide-react'
import ProductGallery from '../components/ProductGallery'
import FarmerProfile from '../components/FarmerProfile'
import QuantitySelector from '../components/QuantitySelector'
import { useCart } from '../context/CartContext'
import { fetchProduct, fetchProducts } from '../services/productService'
import { formatCurrency, stockStatus } from '../utils'

export default function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addItem } = useCart()
  const [product, setProduct] = useState(null)
  const [related, setRelated] = useState([])
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    let active = true

    async function load() {
      const productData = await fetchProduct(id)
      if (!active) return
      setProduct(productData)

      if (productData) {
        const relatedData = await fetchProducts({ categoryId: productData.category })
        setRelated(relatedData.filter((item) => item.id !== productData.id).slice(0, 4))
      }
    }

    load()
    return () => {
      active = false
    }
  }, [id])

  const stock = useMemo(() => (product ? stockStatus(product) : { label: 'Available', ok: true }), [product])

  if (!product) {
    return (
      <div className="container product-detail-empty">
        <div className="glass-panel product-detail-empty-card">
          <p className="eyebrow">Product unavailable</p>
          <h2>We couldn’t find this product.</h2>
          <button type="button" className="btn btn-primary" onClick={() => navigate('/marketplace')}>
            Back to marketplace
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="product-detail-page">
      <div className="container product-detail-shell">
        <button type="button" className="btn btn-glass product-back" onClick={() => navigate('/marketplace')}>
          <ArrowLeft size={15} /> Back to marketplace
        </button>

        <div className="product-detail-layout">
          <ProductGallery product={product} />

          <motion.div
            className="product-detail-info glass-panel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="product-detail-header-row">
              <span className="product-detail-tag">{product.category}</span>
              {product.organic && <span className="product-detail-tag organic">Organic</span>}
            </div>

            <h1>{product.name}</h1>
            <p className="product-detail-description">{product.description}</p>

            <div className="product-detail-rating-row">
              <div className="product-rating-stars" aria-label={`Rated ${product.rating} out of 5`}>
                <Star size={15} fill="currentColor" />
                <span>{product.rating.toFixed(1)}</span>
              </div>
              <span>{product.reviewCount} reviews</span>
              <span className={`product-stock-badge ${stock.ok ? 'in-stock' : 'out-of-stock'}`}>{stock.label}</span>
            </div>

            <div className="product-detail-price-row">
              <div className="product-detail-price">{formatCurrency(product.price)}</div>
              <span className="product-detail-unit">/ {product.unit}</span>
            </div>

            <div className="product-detail-meta">
              <div className="product-detail-meta-item">
                <MapPin size={15} />
                <span>{product.location}</span>
              </div>
              <div className="product-detail-meta-item">
                <CheckCircle2 size={15} />
                <span>{product.delivery ? 'Delivery available' : 'Pickup only'}</span>
              </div>
            </div>

            <div className="product-detail-actions">
              <QuantitySelector value={quantity} max={Math.min(product.stock || 1, 20)} onChange={setQuantity} />
              <button type="button" className="btn btn-primary" onClick={() => addItem(product, quantity)}>
                <ShoppingCart size={14} /> Add to Cart
              </button>
              <button type="button" className="btn btn-glass" onClick={() => addItem(product, quantity)}>
                Buy Now
              </button>
            </div>

            <FarmerProfile farmerId={product.farmerId} compact={false} />
          </motion.div>
        </div>

        {related.length > 0 && (
          <section className="related-section">
            <div className="featured-head">
              <h2>Related products</h2>
            </div>
            <div className="related-grid">
              {related.map((item) => (
                <div key={item.id} className="related-product glass-panel" onClick={() => navigate(`/marketplace/product/${item.id}`)} role="button" tabIndex={0} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && navigate(`/marketplace/product/${item.id}`)}>
                  <img src={item.image} alt={item.name} loading="lazy" />
                  <div>
                    <h3>{item.name}</h3>
                    <p>{formatCurrency(item.price)} / {item.unit}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
