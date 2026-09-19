import { cn } from '../utils'
import ProductCard from './ProductCard'
import EmptyState from './EmptyState'

/**
 * Responsive product grid.
 * `layout` toggles the dense 5-col desktop grid (homepage market) vs the
 * standard 4-col catalogue grid used on the marketplace page.
 */
export default function ProductGrid({ products, layout = 'catalogue', className = '', emptyTitle, emptyCaption }) {
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
