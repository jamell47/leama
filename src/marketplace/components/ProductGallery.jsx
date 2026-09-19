import { useState } from 'react'
import { cn } from '../utils'

/**
 * Product detail gallery: large preview + scrollable thumbnail strip.
 * Uses the product's `gallery` array, falling back to the primary image.
 */
export default function ProductGallery({ product }) {
  const images = product.gallery?.length ? product.gallery : [product.image]
  const [active, setActive] = useState(0)

  return (
    <div className="product-gallery glass-base" style={{ '--glass-blur': '22px' }}>
      <div className="product-gallery-main">
        <div className="product-gallery-frame">
          <img
            src={images[active]}
            alt={`${product.name} view ${active + 1}`}
            className="product-gallery-img"
            loading="eager"
            decoding="async"
            draggable="false"
          />
        </div>
      </div>
      <div className="product-gallery-thumbs" role="tablist" aria-orientation="horizontal">
        {images.map((src, index) => (
          <button
            key={`${src}-${index}`}
            type="button"
            className={cn('product-gallery-thumb', index === active && 'active')}
            onClick={() => setActive(index)}
            aria-selected={index === active}
            aria-label={`View image ${index + 1}`}
          >
            <img
              src={src}
              alt={`${product.name} thumbnail ${index + 1}`}
              loading="lazy"
              decoding="async"
              draggable="false"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
