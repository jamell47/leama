import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { CATEGORIES } from '../data/categories'
import { cn } from '../../utils'
import CategoryPill from './CategoryPill'

/**
 * Horizontally scrollable category navigation.
 * Click a category to filter; the parent passes the active id + onChange.
 * Glass pills snap on scroll for a premium feel. Chevrons page the track.
 */
export default function ProductCategories({ active = 'all', onChange }) {
  const trackRef = useRef(null)

  const scrollBy = (dir) => {
    const node = trackRef.current
    if (!node) return
    const amount = Math.max(node.clientWidth * 0.6, 320)
    node.scrollBy({ left: dir * amount, behavior: 'smooth' })
  }

  return (
    <div className="categories-rail">
      <button
        type="button"
        className={cn('categories-nav categories-nav-prev', 'glass-micro')}
        onClick={() => scrollBy(-1)}
        aria-label="Scroll categories"
      >
        <ChevronLeft size={16} />
      </button>
      <div className="categories-track" ref={trackRef}>
        {CATEGORIES.map((category, index) => (
          <CategoryPill
            key={category.id}
            category={category}
            active={active === category.id}
            onClick={() => onChange?.(category.id)}
            style={{ animationDelay: `${index * 0.04}s` }}
          />
        ))}
        <div className="categories-spacer" aria-hidden="true" />
      </div>
      <button
        type="button"
        className={cn('categories-nav categories-nav-next', 'glass-micro')}
        onClick={() => scrollBy(1)}
        aria-label="Scroll categories"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  )
}

