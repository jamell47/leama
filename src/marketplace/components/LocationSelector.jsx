import { useState, useRef, useEffect } from 'react'
import { MapPin, ChevronDown } from 'lucide-react'

const LOCATIONS = [
  'All locations',
  'Kajiado, Kenya',
  'Kakamega, Kenya',
  'Kericho, Kenya',
  'Nakuru, Kenya',
  'Marsabit, Kenya',
]

/** Glass location picker pillow with a small pop-up list. */
export default function LocationSelector({ value = 'Nairobi, Kenya', onChange }) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef(null)
  /* Fully controlled: the pill mirrors the parent's filter state, falling
     back to "All locations" when no location filter is active (e.g. after a reset). */
  const current = value || 'All locations'

  useEffect(() => {
    const onOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('pointerdown', onOutside)
    return () => document.removeEventListener('pointerdown', onOutside)
  }, [])

  const select = (next) => {
    setOpen(false)
    /* "All locations" clears the filter; a specific city applies it. */
    onChange?.(next === 'All locations' ? '' : next)
  }

  return (
    <div className="market-location" ref={containerRef}>
      <button
        type="button"
        className="market-location-pill glass-micro"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <MapPin size={15} className="market-location-icon" />
        <span className="market-location-text">{current}</span>
        <ChevronDown size={13} className="market-location-chevron" />
      </button>
      {open && (
        <ul className="market-location-list glass-strong" role="listbox">
          {LOCATIONS.map((loc) => (
            <li key={loc}>
              <button
                type="button"
                className={`market-location-option ${loc === current ? 'active' : ''}`}
                onClick={() => select(loc)}
              >
                {loc}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
