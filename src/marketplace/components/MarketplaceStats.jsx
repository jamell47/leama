import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Package, List, Truck, Smartphone } from 'lucide-react'
import { useCounter } from '../../hooks/useAnimations'
import { fetchCategories, fetchProducts } from '../services/productService'

function StatTile({ icon: Icon, label, value, suffix, delay, loading }) {
  const [ref, count] = useCounter(Number(value) || 0, 1200, delay * 1000)
  return (
    <motion.div ref={ref} className="market-stat-tile" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 + delay, ease: [0.22, 1, 0.36, 1] }}>
      <div className="market-stat-icon" aria-hidden="true"><Icon size={18} /></div>
      <div className="market-stat-value">{loading ? '...' : count}{suffix}</div>
      <div className="market-stat-label">{label}</div>
    </motion.div>
  )
}

export default function MarketplaceStats() {
  const [productCount, setProductCount] = useState(0)
  const [categoryCount, setCategoryCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    Promise.all([fetchProducts({ limit: 1 }), fetchCategories()])
      .then(([productResponse, categories]) => {
        if (!active) return
        setProductCount(productResponse?.pagination?.total || productResponse?.products?.length || 0)
        setCategoryCount(Array.isArray(categories) ? categories.length : 0)
      })
      .catch(() => {})
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  return (
    <div className="market-stats" aria-label="Marketplace statistics">
      <StatTile icon={Package} label="Products listed" value={productCount} delay={0} loading={loading} />
      <StatTile icon={List} label="Categories" value={categoryCount} delay={0.1} loading={loading} />
      <StatTile icon={Truck} label="Delivery options" value={productCount ? 1 : 0} suffix={productCount ? '' : ''} delay={0.2} loading={loading} />
      <StatTile icon={Smartphone} label="M-Pesa checkout" value={1} delay={0.3} loading={loading} />
    </div>
  )
}
