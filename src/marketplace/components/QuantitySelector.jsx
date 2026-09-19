import { Minus, Plus } from 'lucide-react'

/** Inline plus/minus quantity selector styled as glass micro. */
export default function QuantitySelector({ value = 1, min = 1, max = 99, onChange }) {
  const current = Math.max(min, Math.min(max, Math.floor(value)))
  const set = (next) => onChange?.(Math.max(min, Math.min(max, next)))

  return (
    <div className="qty-selector" aria-label="Select quantity">
      <button
        type="button"
        className="qty-btn"
        onClick={() => set(current - 1)}
        disabled={current <= min}
        aria-label="Decrease quantity"
      >
        <Minus size={14} aria-hidden="true" />
      </button>
      <span className="qty-value">{current}</span>
      <button
        type="button"
        className="qty-btn"
        onClick={() => set(current + 1)}
        disabled={current >= max}
        aria-label="Increase quantity"
      >
        <Plus size={14} aria-hidden="true" />
      </button>
    </div>
  )
}
