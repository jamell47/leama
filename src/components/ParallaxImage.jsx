import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '../hooks/useAnimations'
import { cn } from '../utils'

gsap.registerPlugin(ScrollTrigger)

const radii = {
  none: '0',
  sm: 'var(--radius-sm)',
  md: 'var(--radius-md)',
  lg: 'var(--radius-lg)',
  xl: 'var(--radius-xl)',
  full: '9999px',
}

/**
 * ParallaxImage — lazy, blur-to-sharp, parallaxed image frame.
 * The inner image drifts slowly inside the frame as the page scrolls,
 * which keeps large photography feeling alive without heavy motion.
 */
export default function ParallaxImage({
  src,
  alt,
  className = '',
  radius = 'lg',
  ratio,
  speed = 0.18,
  overlay = 'medium',
  hoverZoom = true,
  loading = 'lazy',
  label,
  caption,
  children,
  drift = true,
}) {
  const wrapRef = useRef(null)
  const mediaRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const element = wrapRef.current
    if (!element || !('IntersectionObserver' in window)) {
      setVisible(true)
      return undefined
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.08, rootMargin: '160px' },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const frame = wrapRef.current
    const media = mediaRef.current
    if (!frame || !media || reducedMotion || !drift) return undefined

    const ctx = gsap.context(() => {
      gsap.fromTo(
        media,
        { yPercent: -6 * (speed * 10) },
        {
          yPercent: 6 * (speed * 10),
          ease: 'none',
          scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
        },
      )
    }, frame)

    return () => ctx.revert()
  }, [reducedMotion, speed, drift])

  return (
    <div
      ref={wrapRef}
      className={cn('parallax-image', `overlay-${overlay}`, hoverZoom && 'zoomable', visible && 'is-visible', className)}
      style={{ borderRadius: radii[radius] || radii.lg, aspectRatio: ratio }}
    >
      <div className="parallax-media" ref={mediaRef}>
        <img
          src={src}
          alt={alt}
          loading={loading}
          decoding="async"
          fetchPriority={loading === 'eager' ? 'high' : 'auto'}
          draggable="false"
        />
      </div>
      <span className="parallax-overlay" aria-hidden="true" />
      {label && <span className="parallax-label">{label}</span>}
      {caption && <span className="parallax-caption">{caption}</span>}
      {children}
    </div>
  )
}