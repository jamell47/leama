import { useState, useEffect, useRef } from 'react'
import { Filter } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import FilterControls from './FilterControls'

const EASE = [0.22, 1, 0.36, 1]

export default function Filters({ value, onChange, onReset, compact = false }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const panelRef = useRef(null)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setMobileOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (!mobileOpen) return undefined
    const onOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) setMobileOpen(false)
    }
    document.addEventListener('pointerdown', onOutside)
    return () => document.removeEventListener('pointerdown', onOutside)
  }, [mobileOpen])

  const activeCount = Object.values(value || {}).filter(
    (v) => v !== '' && v !== false && v !== 0
  ).length

  if (compact) {
    // Desktop persistent sidebar.
    return (
      <aside className="market-filters-desktop glass-panel">
        <FilterControls value={value} onChange={onChange} onReset={onReset} />
      </aside>
    )
  }

  return (
    <>
      <button
        type="button"
        className="filter-toggle glass-micro"
        onClick={() => setMobileOpen(true)}
        aria-haspopup
        aria-expanded={mobileOpen}
      >
        <Filter size={15} />
        <span>Filters</span>
        {activeCount > 0 && <span className="filter-dot">{activeCount}</span>}
      </button>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="filter-sheet-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="filter-sheet"
            ref={panelRef}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <div className="filter-sheet-handle" aria-hidden="true" />
            <FilterControls value={value} onChange={onChange} onReset={onReset} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
