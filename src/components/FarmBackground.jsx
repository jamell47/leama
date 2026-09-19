import { useEffect, useRef } from 'react'
import { farm, farmWebp } from '../assets'
import { useReducedMotion } from '../hooks/useAnimations'

/**
 * The single global environment for the whole website.
 * farm.png sits behind everything, fixed, and never changes
 * from section to section — content simply floats above it.
 */
export default function FarmBackground() {
  const reducedMotion = useReducedMotion()
  const layerRef = useRef(null)

  useEffect(() => {
    const layer = layerRef.current
    if (!layer || reducedMotion) return undefined

    let frame = 0
    const update = () => {
      frame = 0
      const scroll = window.scrollY || 0
      // Slow depth drift: the world moves far slower than the UI above it.
      const shift = Math.min(scroll * 0.045, 110)
      const settle = Math.min(scroll * 0.00004, 0.05)
      layer.style.transform = `translate3d(0, ${-shift}px, 0) scale(${1.06 + settle})`
    }
    const handleScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [reducedMotion])

  return (
    <div className="farm-background" aria-hidden="true">
      <div className="farm-background-image" ref={layerRef}>
        <picture>
          <source srcSet={farmWebp} type="image/webp" />
          <img src={farm} alt="" decoding="async" fetchPriority="high" draggable="false" />
        </picture>
      </div>
      <div className="farm-background-tint" />
      <div className="farm-background-glow" />
      <div className="farm-background-vignette" />
    </div>
  )
}