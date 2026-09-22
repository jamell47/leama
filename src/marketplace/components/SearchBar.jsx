import { useEffect, useState } from 'react'
import { Search } from 'lucide-react'

export default function SearchBar({ value = '', onSearch, placeholder = 'Search fruits, vegetables, grains, dairy...' }) {
  const [local, setLocal] = useState(value)
  useEffect(() => setLocal(value), [value])
  return (
    <form className="market-search" role="search" onSubmit={(event) => event.preventDefault()}>
      <input type="search" className="market-search-input" placeholder={placeholder} value={local} onChange={(event) => { setLocal(event.target.value); onSearch?.(event.target.value) }} aria-label="Search farm produce" />
      <label className="market-search-icon" aria-hidden="true"><Search size={18} /></label>
    </form>
  )
}
