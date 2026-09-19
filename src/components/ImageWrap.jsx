import { useEffect, useRef, useState } from 'react'
import { cn } from '../utils'

/**
 * ImageWrap — compatibility image frame.
 * Forwards to the same `.image-wrap` styling used across the design
 * system, with lazy loading and a blur-to-sharp reveal.
 */
export default function ImageWrap({
  src,
  alt = '',
  className = '',
  radius = 'lg',
  aspectRatio,
  hoverZoom = false,
  loading = 'lazy',
  caption,
  children,
}) {
  const ref = useRef(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element || !('IntersectionObserver' in window)) {
      setLoaded(true)
      return undefined
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoaded(true)
          observer.disconnect()
        }
      },
      { threshold: 0.08, rootMargin: '140px' },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={cn('image-wrap', hoverZoom && 'zoomable', loaded && 'loaded', className)}
      style={{ borderRadius: radius === 'full' ? '9999px' : `var(--radius-${radius})`, aspectRatio }}
    >
      <img src={src} alt={alt} loading={loading} decoding="async" draggable="false" />
      {caption && <span className="image-caption">{caption}</span>}
      {children}
    </div>
  )
}
