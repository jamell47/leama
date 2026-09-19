import { Leaf, Star } from 'lucide-react'
import { cn } from '../../utils'

/** Tiny glass badges for organic / featured / in-season tags. */
export default function ProductBadge({ type, className = '' }) {
  const config = {
    organic: { icon: Leaf, label: 'Organic', cls: 'badge-organic' },
    featured: { icon: Star, label: 'Featured', cls: 'badge-featured' },
    season: { icon: null, label: 'In Season', cls: 'badge-season' },
  }[type]

  if (!config) return null
  const Icon = config.icon
  return (
    <span className={cn('product-badge', config.cls, className)} title={config.label}>
      {Icon && <Icon size={10} className="badge-icon" aria-hidden="true" />}
      {config.label}
    </span>
  )
}
