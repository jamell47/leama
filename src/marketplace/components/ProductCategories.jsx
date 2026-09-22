import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '../../utils'
import CategoryPill from './CategoryPill'

export default function ProductCategories({ active = 'all', categories = [], onChange }) {
  const trackRef = useRef(null)
  const scrollBy = (direction) => {
    const track = trackRef.current
    if (!track) return
    track.scrollBy({ left: direction * Math.max(track.clientWidth * 0.6, 320), behavior: 'smooth' })
  }
  const allCategories = [{ id: 'all', name: 'All produce', description: '' }, ...categories]

  return (
    <div className="categories-rail">
      <button type="button" className={cn('categories-nav categories-nav-prev', 'glass-micro')} onClick={() => scrollBy(-1)} aria-label="Scroll categories left">
        <ChevronLeft size={16} />
      </button>
      <div className="categories-track" ref={trackRef}>
        {allCategories.map((category, index) => (
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
      <button type="button" className={cn('categories-nav categories-nav-next', 'glass-micro')} onClick={() => scrollBy(1)} aria-label="Scroll categories right">
        <ChevronRight size={16} />
      </button>
    </div>
  )
}
