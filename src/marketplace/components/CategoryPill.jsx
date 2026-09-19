import { cn } from '../../utils'

/** Small icon+label pillow used by the category rail and filter tags. */
export default function CategoryPill({ category, active = false, onClick, className = '' }) {
  const Icon = (category && category.icon) || null
  return (
    <button
      type="button"
      className={cn('category-pill glass-micro', active && 'active', className)}
      onClick={onClick}
      aria-pressed={active}
    >
      {Icon && <span className="category-pill-icon" aria-hidden="true"><Icon size={15} /></span>}
      <span className="category-pill-label">{category.name}</span>
    </button>
  )
}
