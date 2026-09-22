import { useEffect, useMemo, useState } from 'react'
import ProductCategories from '../components/ProductCategories'
import Filters from '../components/Filters'
import ProductGrid from '../components/ProductGrid'
import FeaturedSection from '../components/FeaturedSection'
import CartButton from '../components/CartButton'
import MarketplaceHero from '../components/MarketplaceHero'
import { fetchCategories, fetchProducts } from '../services/productService'

const DEFAULT_FILTERS = {
  categoryId: 'all',
  query: '',
  location: '',
  country: '',
  organic: false,
  delivery: false,
  minRating: 0,
  minPrice: '',
  maxPrice: '',
}

export default function MarketplacePage() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    const load = async () => {
      setLoading(true)
      setError('')
      try {
        const [catalog, categoryList] = await Promise.all([
          fetchProducts(filters),
          fetchCategories(),
        ])
        if (!active) return
        const catalogProducts = catalog?.products || catalog || []
        setProducts(catalogProducts)
        setCategories(Array.isArray(categoryList) ? categoryList : categoryList?.categories || [])
      } catch (requestError) {
        if (!active) return
        setError(requestError?.message || 'Unable to load the marketplace. Please try again.')
      } finally {
        if (active) setLoading(false)
      }
    }
    load()
    return () => {
      active = false
    }
  }, [filters])

  const filteredProducts = useMemo(() => products, [products])
  const featured = useMemo(() => products.filter((product) => product.featured).slice(0, 4), [products])
  const popular = useMemo(() => [...products].sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0)).slice(0, 4), [products])
  const newArrivals = useMemo(() => products.slice(0, 4), [products])

  const updateFilter = (next) => setFilters((current) => ({ ...current, ...next }))

  return (
    <div className="marketplace-page">
      <MarketplaceHero
        query={filters.query}
        activeCategory={filters.categoryId}
        onSearch={(query) => updateFilter({ query })}
        onCategoryChange={(categoryId) => updateFilter({ categoryId })}
      />

      <section className="marketplace-catalogue container">
        <div className="marketplace-toolbar-row">
          <ProductCategories
            active={filters.categoryId}
            categories={categories}
            onChange={(categoryId) => updateFilter({ categoryId })}
          />
        </div>

        <div className="marketplace-layout">
          <aside className="marketplace-sidebar">
            <Filters
              compact
              value={filters}
              categories={categories}
              onChange={updateFilter}
              onReset={() => setFilters(DEFAULT_FILTERS)}
            />
          </aside>

          <div className="marketplace-catalogue-main">
            <div className="market-results-head">
              <div>
                <p className="eyebrow">Fresh produce</p>
                <h2>{loading ? 'Loading harvests...' : error ? 'Marketplace unavailable' : `${filteredProducts.length} products available`}</h2>
              </div>
              <button type="button" className="btn btn-glass btn-sm" onClick={() => setFilters(DEFAULT_FILTERS)}>Reset filters</button>
            </div>

            <ProductGrid
              products={filteredProducts}
              layout="catalogue"
              loading={loading}
              error={error}
              emptyTitle="No farm produce found"
              emptyCaption="Try searching for another product or category."
            />
          </div>
        </div>
      </section>

      {!error && (
        <>
          <FeaturedSection id="fresh-from-farm" title="Fresh From the Farm" subtitle="Premium produce chosen for quality and traceability." products={featured} />
          <FeaturedSection id="popular-this-week" title="Popular This Week" subtitle="The most-loved choices from our community of growers." products={popular} />
          <FeaturedSection id="new-from-farmers" title="New From Farmers" subtitle="Fresh arrivals from farmer partners across the region." products={newArrivals} />
        </>
      )}

      <CartButton />
    </div>
  )
}
