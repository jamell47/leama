import { CATEGORIES } from '../data/categories'
import { COUNTRIES } from '../data/products'

/** Presentational filter controls, shared by the desktop sidebar and the mobile sheet. */
export default function FilterControls({ value, onChange, onReset }) {
  const update = (field, next) => {
    onChange?.({ ...value, [field]: next })
  }

  const activeCount = Object.values(value || {}).filter(
    (v) => v !== '' && v !== false && v !== 0
  ).length

  return (
    <>
      <div className="filter-panel-head">
        <h3 className="filter-title">Filter</h3>
        <button
          type="button"
          className="filter-reset glass-micro"
          onClick={onReset}
          disabled={activeCount === 0}
        >
          Reset
        </button>
      </div>
      <div className="filter-body">
        <div className="filter-row">
          <label className="filter-label">Min price (KSh)</label>
          <input
            type="number"
            className="filter-input"
            placeholder="0"
            value={value?.minPrice ?? ''}
            onChange={(e) => update('minPrice', e.target.value)}
            min={0}
          />
        </div>
        <div className="filter-row">
          <label className="filter-label">Max price (KSh)</label>
          <input
            type="number"
            className="filter-input"
            placeholder="Any"
            value={value?.maxPrice ?? ''}
            onChange={(e) => update('maxPrice', e.target.value)}
            min={0}
          />
        </div>
        <div className="filter-row">
          <label className="filter-label">Location</label>
          <input
            type="text"
            className="filter-input"
            placeholder="e.g. Nairobi"
            value={value?.location ?? ''}
            onChange={(e) => update('location', e.target.value)}
          />
        </div>
        <div className="filter-row">
          <label className="filter-label">Country</label>
          <select
            className="filter-select"
            value={value?.country ?? ''}
            onChange={(e) => update('country', e.target.value)}
          >
            <option value="">All countries</option>
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="filter-row filter-checkboxes">
          <label className="filter-checkbox">
            <input
              type="checkbox"
              checked={!!value?.organic}
              onChange={(e) => update('organic', e.target.checked)}
            />
            <span>Organic only</span>
          </label>
          <label className="filter-checkbox">
            <input
              type="checkbox"
              checked={!!value?.delivery}
              onChange={(e) => update('delivery', e.target.checked)}
            />
            <span>Delivery available</span>
          </label>
        </div>
        <div className="filter-row">
          <label className="filter-label">Minimum rating</label>
          <select
            className="filter-select"
            value={value?.minRating ?? 0}
            onChange={(e) => update('minRating', Number(e.target.value))}
          >
            <option value={0}>Any rating</option>
            <option value={4}>4+ stars</option>
            <option value={4.5}>4.5+ stars</option>
            <option value={4.8}>4.8+ stars</option>
          </select>
        </div>
        <div className="filter-row">
          <label className="filter-label">Category</label>
          <select
            className="filter-select"
            value={value?.categoryId ?? 'all'}
            onChange={(e) => update('categoryId', e.target.value)}
          >
            <option value="all">All categories</option>
            {CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>
    </>
  )
}
