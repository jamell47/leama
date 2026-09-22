import { COUNTRIES } from '../data/products'

export default function FilterControls({ value, onChange, onReset, categories = [] }) {
  const update = (field, next) => onChange?.({ ...value, [field]: next })
  const activeCount = Object.values(value || {}).filter((item) => item !== '' && item !== false && item !== 0).length

  return (
    <>
      <div className="filter-panel-head">
        <h3 className="filter-title">Filter</h3>
        <button type="button" className="filter-reset glass-micro" onClick={onReset} disabled={activeCount === 0}>Reset</button>
      </div>
      <div className="filter-body">
        <div className="filter-row">
          <label className="filter-label">Min price (KSh)</label>
          <input type="number" className="filter-input" placeholder="0" value={value?.minPrice ?? ''} onChange={(event) => update('minPrice', event.target.value)} min={0} />
        </div>
        <div className="filter-row">
          <label className="filter-label">Max price (KSh)</label>
          <input type="number" className="filter-input" placeholder="Any" value={value?.maxPrice ?? ''} onChange={(event) => update('maxPrice', event.target.value)} min={0} />
        </div>
        <div className="filter-row">
          <label className="filter-label">Location</label>
          <input type="text" className="filter-input" placeholder="e.g. Nairobi" value={value?.location ?? ''} onChange={(event) => update('location', event.target.value)} />
        </div>
        <div className="filter-row">
          <label className="filter-label">Country</label>
          <select className="filter-select" value={value?.country ?? ''} onChange={(event) => update('country', event.target.value)}>
            <option value="">All countries</option>
            {COUNTRIES.map((country) => <option key={country} value={country}>{country}</option>)}
          </select>
        </div>
        <div className="filter-row filter-checkboxes">
          <label className="filter-checkbox"><input type="checkbox" checked={!!value?.organic} onChange={(event) => update('organic', event.target.checked)} /><span>Organic only</span></label>
          <label className="filter-checkbox"><input type="checkbox" checked={!!value?.delivery} onChange={(event) => update('delivery', event.target.checked)} /><span>Delivery available</span></label>
        </div>
        <div className="filter-row">
          <label className="filter-label">Minimum rating</label>
          <select className="filter-select" value={value?.minRating ?? 0} onChange={(event) => update('minRating', Number(event.target.value))}>
            <option value={0}>Any rating</option>
            <option value={4}>4+ stars</option>
            <option value={4.5}>4.5+ stars</option>
            <option value={4.8}>4.8+ stars</option>
          </select>
        </div>
        <div className="filter-row">
          <label className="filter-label">Category</label>
          <select className="filter-select" value={value?.categoryId ?? 'all'} onChange={(event) => update('categoryId', event.target.value)}>
            <option value="all">All categories</option>
            {categories.filter((category) => category.id !== 'all').map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
          </select>
        </div>
      </div>
    </>
  )
}
