import { useState } from 'react'
import { Search } from 'lucide-react'

/**
 * Marketplace search field.
 * Controlled via `value`/`onSearch`. The parent debounces however it likes;
 * this bar just reports intent cleanly.
 */
export default function SearchBar({ value = '', onSearch, placeholder = 'Search fruits, vegetables, grains, dairy...' }) {
  const [local, setLocal] = useState(value)

  const onChange = (event) => {
    const next = event.target.value
    setLocal(next)
    onSearch?.(next)
  }

  return (
    <form className="market-search" role="search" onSubmit={(e) => e.preventDefault()}>
      <input
        type="search"
        className="market-search-input"
        placeholder={placeholder}
        value={local}
        onChange={onChange}
        aria-label="Search farm produce"
      />
      <label className="market-search-icon" aria-hidden="true">
        <Search size={18} />
      </label>
    </form>
  )
}
