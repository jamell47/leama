import { useState } from 'react'
import { cn } from '../utils'

export default function ProductGallery({ product }) {
  const images = (product?.gallery?.length ? product.gallery : product?.image ? [product.image] : []).filter(Boolean)
  const [active, setActive] = useState(0)
  const [failed, setFailed] = useState(false)

  if (!images.length) {
    return <div className="product-gallery product-gallery-empty glass-base"><div className="product-gallery-image-fallback">{product?.name?.charAt(0) || 'L'}</div></div>
  }
  const source = images[active]
  return (
    <div className="product-gallery glass-base" style={{ '--glass-blur': '22px' }}>
      <div className="product-gallery-main">
        <div className="product-gallery-frame">
          {!failed ? (
            <img src={source} alt={`${product.name} view ${active + 1}`} className="product-gallery-img" loading="eager" decoding="async" draggable="false" onError={() => setFailed(true)} />
          ) : (
            <div className="product-gallery-image-fallback" aria-label="Product image unavailable">{product.name.charAt(0)}</div>
          )}
        </div>
      </div>
      <div className="product-gallery-thumbs" role="tablist" aria-orientation="horizontal">
        {images.map((image, index) => (
          <button key={`${image}-${index}`} type="button" className={cn('product-gallery-thumb', index === active && 'active')} onClick={() => { setActive(index); setFailed(false) }} aria-selected={index === active} aria-label={`View image ${index + 1}`}>
            <img src={image} alt={`${product.name} thumbnail ${index + 1}`} loading="lazy" decoding="async" draggable="false" />
          </button>
        ))}
      </div>
    </div>
  )
}
