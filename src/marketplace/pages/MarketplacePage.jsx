import { useEffect, useMemo, useState } from 'react'
import ProductCategories from '../components/ProductCategories'
import Filters from '../components/Filters'
import ProductGrid from '../components/ProductGrid'
import FeaturedSection from '../components/FeaturedSection'
import CartButton from '../components/CartButton'
import MarketplaceHero from '../components/MarketplaceHero'
import { fetchFeatured, fetchNew, fetchPopular, fetchProducts } from '../services/productService'

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
  const [products, setProducts] = useState([])
  const [featured, setFeatured] = useState([])
  const [popular, setPopular] = useState([])
  const [newArrivals, setNewArrivals] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    const load = async () => {
      setLoading(true)
      const [catalog, featuredList, popularList, newList] = await Promise.all([
        fetchProducts(filters),
        fetchFeatured(),
        fetchPopular(),
        fetchNew(),
      ])
      if (!active) return
      setProducts(catalog)
      setFeatured(featuredList)
      setPopular(popularList)
      setNewArrivals(newList)
      setLoading(false)
    }

    load()
    return () => {
      active = false
    }
  }, [filters])

  const filteredProducts = useMemo(() => products, [products])

  return (
    <div className="marketplace-page">
      <MarketplaceHero
        query={filters.query}
        activeCategory={filters.categoryId}
        location={filters.location}
        onSearch={(query) => setFilters((current) => ({ ...current, query }))}
        onCategoryChange={(categoryId) => setFilters((current) => ({ ...current, categoryId }))}
        onLocationChange={(location) => setFilters((current) => ({ ...current, location }))}
      />

      <section className="marketplace-catalogue container">
        <div className="marketplace-toolbar-row">
          <ProductCategories
            active={filters.categoryId}
            onChange={(categoryId) => setFilters((current) => ({ ...current, categoryId }))}
          />
        </div>

        <div className="marketplace-layout">
          <aside className="marketplace-sidebar">
            <Filters
              compact
              value={filters}
              onChange={(next) => setFilters((current) => ({ ...current, ...next }))}
              onReset={() => setFilters(DEFAULT_FILTERS)}
            />
          </aside>

          <div className="marketplace-catalogue-main">
            <div className="market-results-head">
              <div>
                <p className="eyebrow">Fresh produce</p>
                <h2>{loading ? 'Loading harvests...' : `${filteredProducts.length} products available`}</h2>
              </div>
              <button
                type="button"
                className="btn btn-glass btn-sm"
                onClick={() => setFilters(DEFAULT_FILTERS)}
              >
                Reset filters
              </button>
            </div>

            <ProductGrid
              products={filteredProducts}
              layout="catalogue"
              emptyTitle="No farm produce found"
              emptyCaption="Try searching for another product or category."
            />
          </div>
        </div>
      </section>

      <FeaturedSection
        id="fresh-from-farm"
        title="Fresh From the Farm"
        subtitle="Premium produce chosen for quality and traceability."
        products={featured}
      />

      <FeaturedSection
        id="popular-this-week"
        title="Popular This Week"
        subtitle="The best-selling choices from our community of growers."
        products={popular}
      />

      <FeaturedSection
        id="new-from-farmers"
        title="New From Farmers"
        subtitle="Fresh arrivals from farmer partners across the region."
        products={newArrivals}
      />

      <CartButton />
    </div>
  )
}
