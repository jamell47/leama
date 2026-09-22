import { cn } from '../utils'
import ProductCard from './ProductCard'
import EmptyState from './EmptyState'

export default function ProductGrid({ products = [], layout = 'catalogue', className = '', emptyTitle, emptyCaption, loading = false, error = '' }) {
  if (loading) {
    return (
      <div className={cn('products-grid', `products-grid--${layout}`, className)}>
        <div className="market-empty-state">
          <div className="market-empty-illustration market-empty-illustration--loading" aria-hidden="true" />
          <h3 className="market-empty-title">Loading harvests...</h3>
          <p className="market-empty-caption">Fetching the latest products from Leema Tech Solutions.</p>
        </div>
      </div>
    )
  }
  if (error) {
    return (
      <div className={cn('products-grid', `products-grid--${layout}`, className)}>
        <div className="market-empty-state market-error-state">
          <div className="market-empty-illustration" aria-hidden="true" />
          <h3 className="market-empty-title">Products unavailable</h3>
          <p className="market-empty-caption">{error}</p>
        </div>
      </div>
    )
  }
  return (
    <div className={cn('products-grid', `products-grid--${layout}`, className)}>
      {products.length === 0 ? (
        <EmptyState title={emptyTitle} caption={emptyCaption} />
      ) : (
        products.map((product) => <ProductCard key={product.id} product={product} />)
      )}
    </div>
  )
}
